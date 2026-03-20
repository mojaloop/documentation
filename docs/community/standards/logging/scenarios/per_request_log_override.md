# Per-Request Log Override — Overview

## What It Is

Per-request log level override. A single flagged request gets verbose logging across every service it touches, while everything else stays at the production level. The current spec (`log_levels.md` lines 321-328) describes the goal but not the mechanism.

---

## How the Signal Propagates

### W3C Baggage (OTel-native)

The W3C `baggage` header carries arbitrary key-value pairs. The OTel SDK propagates it automatically across HTTP (and Kafka, when configured).

**Example:** `baggage: mojaloop.debug=true`

**Pros:** Automatic propagation — no manual forwarding.
**Cons:** Baggage travels in plaintext. Security must be enforced at the gateway (see [Security](#security)).

**Reading baggage in Node.js:**
```javascript
const { propagation } = require('@opentelemetry/api')
const debugFlag = propagation.getActiveBaggage()?.getEntry('mojaloop.debug')?.value
```

> The codebase already uses `getActiveBaggage()` in the `errorExpect` format (`createMlLogger.js` line 53).

### What About the `traceparent` Sampled Flag?

The sampled flag controls *span sampling*, not log verbosity. Overloading it conflates two concerns and has side effects on trace backends.

### Comparison

| Aspect | OTel Baggage | Sampled Flag |
|--------|--------------|-------------|
| Propagation | Automatic (OTel SDK) | Automatic (OTel SDK) |
| Kafka support | Requires baggage propagator config | Automatic |
| Security | Plaintext (gateway must validate) | Not designed for this |
| Semantic fit | Good fit | Wrong purpose |

### Recommendation

Use **OTel Baggage** with a dedicated key (e.g., `mojaloop.debug`). For authentication, embed a signed token (JWT) as the baggage value.

---

## How to Filter Logs Per-Request in Node.js

Three approaches, ordered from most feasible to least. Approach 1 is recommended for `central-services-logger`.

### Existing Infrastructure in `central-services-logger`

- **`AsyncLocalStorage`** — `contextLogger.js` exports an `asyncStorage` instance (line 35). `formatLog()` reads `asyncStorage.getStore()` and spreads it into metadata: `{ ...store, ...this.context, ...metaData }`. Control keys (like `_logLevelOverride`) must be destructured out to prevent leaking into output (see Approach 1).
- **`errorExpect` format** — `createMlLogger.js` (lines 51-69) reads OTel baggage at format evaluation time and reclassifies log levels. Reading propagated context inside a Winston format is an established pattern.
- **`ContextLogger.setLevel()`** — creates a new Winston logger and replaces `this.mlLogger`. Provides per-component isolation but mutates the instance for all calls — not per-request.
- **Static `isXxxEnabled` flags** — cached booleans (`isDebugEnabled`, etc.) that short-circuit log calls before Winston processing:
  ```javascript
  debug(message, meta) {
    this.isDebugEnabled && this.mlLogger.debug(...)
  }
  ```
- **Custom log levels** — `allLevels` in `constants.js`: `{ error: 0, warn: 1, audit: 2, trace: 3, info: 4, perf: 5, verbose: 6, debug: 7, silly: 8 }`. Lower number = higher priority. Any level comparison must use `allLevels`.

### Approach 1: ContextLogger-Native Filtering with Dual Logger (Recommended)

Extend `ContextLogger`'s level guards to be context-aware. Use a second Winston logger at `silly` level to accept override entries, preserving the fast path for normal traffic.

#### The Winston-level problem

If `mlLogger.level` is `info` (priority 4) and a debug call (priority 7) passes the override check, Winston's transport-level filtering compares `4 >= 7` → `false` and silently drops the entry. Two naive fixes fail:
- Setting `mlLogger` to `silly` globally disables the fast path for every request (collapses into Approach 2).
- Winston `child()` cannot change the level threshold (see "What Does Not Work").

#### Solution: shared override logger

Keep `mlLogger` at its configured level. Create a process-wide singleton `overrideLogger` at `silly` level. Override calls route there instead. The process runs two sets of transports (production + override), but the singleton limits this to one extra set.

```javascript
// Module-level singleton — created once, shared by all ContextLogger instances.
// createMlLogger() takes no arguments; set level after creation (same pattern as setLevel()).
let _overrideLogger
function getOverrideLogger () {
  if (!_overrideLogger) {
    _overrideLogger = createMlLogger()
    _overrideLogger.level = 'silly'
    // Remove exception/rejection handlers to prevent duplicate logging — the production mlLogger already handles these.
    _overrideLogger.exceptions?.unhandle()
    _overrideLogger.rejections?.unhandle()
  }
  return _overrideLogger
}

debug (message, meta) {
  if (this.isDebugEnabled) {
    this.mlLogger.debug(...this.formatLog(message, meta))
  } else if (this._hasOverride('debug')) {
    getOverrideLogger().log('debug', ...this.formatLog(message, meta))
  }
}

_hasOverride (level) {
  const store = asyncStorage.getStore()
  const override = store?._logLevelOverride
  if (!override) return false
  return allLevels[level] <= allLevels[override]
}
```

All 9 log methods need the same `_hasOverride` check. In practice, only methods below the production level invoke it.

> The override branch uses `.log('debug', ...)` rather than `.debug(...)` — see the `customLevels` caveat below.

#### `customLevels` caveat

`createMlLogger()` replaces excluded level methods with no-ops (`createMlLogger.js` line 102):

```javascript
ignoredLevels.forEach(level => { Logger[level] = () => {} })
```

If production configures `customLevels=error,warn,info`, then `overrideLogger.debug` is `() => {}`. Three options:

- **(a) Use `.log(level, ...)`** — `ignoredLevels` replaces `.debug()` etc. but not `.log()`. No changes to `createMlLogger` needed. This is the approach shown above.
- **(b) Modify `createMlLogger()`** to accept an option that skips the replacement. Breaking change to a shared library.
- **(c) `delete _overrideLogger.debug`** to restore the prototype method. Fragile — depends on Winston internals.

#### `isXxxEnabled` flags on the override logger

`createMlLogger()` sets these flags based on the initial config level, not `silly`. Setting `.level = 'silly'` after creation does not update them. These flags are never consulted — `ContextLogger` reads its own flags, and the override logger is only used via `.log()`.

#### Modified `formatLog()`

`_logLevelOverride` lives in the store, which `formatLog()` spreads into metadata. Without exclusion, the key leaks into output:

```javascript
formatLog (message, meta) {
  const store = asyncStorage.getStore()
  if (!meta && !this.context && !store) return [message]

  const { _logLevelOverride, ...storeData } = store || {}
  const metaData = meta instanceof Error
    ? ContextLogger.formatError(meta)
    : typeof meta === 'object' ? meta : { meta }

  return [message, { ...storeData, ...this.context, ...metaData }]
}
```

#### Performance analysis

**No override (common case):** `_hasOverride()` calls `getStore()`, finds no `_logLevelOverride`, returns `false`. One `getStore()` call per below-threshold log invocation. `AsyncLocalStorage.getStore()` is O(1) V8 context slot access (~20-50ns). No Winston processing occurs.

**Override active:** two `getStore()` calls per entry (one in `_hasOverride`, one in `formatLog()`). Both sub-microsecond. Override entries get the same context, metadata, and error formatting as normal logs.

#### Identifying override logs in output

The override logger writes to the same transports as the production logger. To distinguish override-triggered entries (needed for the [separate log pipeline](#mojaloop-specific-mitigations) recommendation), add a metadata marker in the override branch:

```javascript
} else if (this._hasOverride('debug')) {
  const [msg, metadata] = this.formatLog(message, meta)
  getOverrideLogger().log('debug', msg, { ...metadata, 'debug.override': true })
}
```

This avoids adding a third parameter to `formatLog()`. Log routers (OTel Collector, Fluentd) can filter on `debug.override` to route these entries to an access-controlled index.

#### Interaction with `setLevel()`

- `setLevel('debug')` → `isDebugEnabled` is `true` → normal path fires, override never reached.
- `setLevel('warn')` → `isInfoEnabled` is `false` → override activates for info/verbose/debug/silly. Uses process-level transports, not the per-component logger.

#### Format chain on the override logger

Inherits `format.combine(format.timestamp(), errorExpect())` from `createMlLogger()`. Override entries get timestamps and `errorExpect` reclassification.

**Pros:** Preserves fast-path for non-flagged requests. Integrates with existing `asyncStorage` and `formatLog()`. No global logger level change.
**Cons:** Modifies `ContextLogger` and `formatLog()`. Adds one `getStore()` call per below-threshold log invocation. Adds one extra set of transports to the process.

### Approach 2: Application-Level Filtering (Format or Wrapper)

Two variants of the same idea: set the Winston logger to `silly` globally, and filter log entries before they reach the transports.

**Variant A — Custom Winston format.** A format function reads `AsyncLocalStorage` and returns `false` to drop entries below the request's effective level. Returning `false` from a format drops the entry (verified in `logform/combine.js` lines 19-24).

```javascript
const { allLevels } = require('./lib/constants')

const perRequestLevelFilter = winston.format((info) => {
  const store = asyncStorage.getStore()
  const effectiveLevel = store?._logLevelOverride || 'info'
  if (allLevels[info.level] > allLevels[effectiveLevel]) {
    return false
  }
  return info
})
```

**Variant B — Wrapper logger.** A thin wrapper checks the async context before delegating to Winston.

```javascript
function log (level, message, meta) {
  const store = asyncStorage.getStore()
  const effectiveLevel = store?._logLevelOverride || configuredLevel
  if (allLevels[level] <= allLevels[effectiveLevel]) {
    winstonLogger.log(level, message, meta)
  }
}
```

Both variants require the Winston logger to run at `silly` level globally, which makes all `isXxxEnabled` flags `true` — disabling the fast path for every request, not just flagged ones. Without global `silly`, Winston's transports silently drop entries below the configured level (same problem as Approach 1).

**Pros:** Single logger instance.
**Cons:** Disables fast-path for all traffic. Variant A has a circular dependency: importing `asyncStorage` from `contextLogger` into `createMlLogger.js` creates a cycle (fix: extract `asyncStorage` to a shared module or use OTel baggage as `errorExpect` does).

### Approach 3: Collector-Level Filter

The application emits all logs. The OTel Collector's `filterprocessor` drops debug logs for non-flagged requests based on attributes.

```yaml
# Pseudocode — severity_number values: INFO=9, DEBUG=5
processors:
  filter/drop-debug-untraced:
    logs:
      log_record:
        - 'severity_number < 9 and attributes["debug.override"] == nil'
```

**Pros:** Centralized policy, no application code changes.
**Cons:** Same fast-path problem as Approach 2. Ships verbose logs from every request over the network, then discards most at the Collector. Better suited as a supplementary safety net than a primary filter.

### What Does Not Work

**Winston `child()`** adds metadata but inherits the parent's level. Cannot change verbosity per-request.

**`ContextLogger.setLevel()`** mutates the instance for all calls — not per async context. Would affect all concurrent requests and create a new Winston logger each time.

**OTel Logs SDK `LoggerConfigurator`** — `minimum_severity` and `trace_based` are configured at startup, not per-request.

---

## Security

An unsecured debug header is a DoS vector — external callers can force verbose logging across the mesh, inflating storage and exposing PII.

### Real-World Security Patterns

| Pattern | Used by | Mechanism | Strength |
|---------|---------|-----------|----------|
| **JWT-signed header** | SAP `cf-nodejs-logging-support` | Caller signs a JWT containing the desired level + expiry. Service verifies with public key. Only private-key holders can trigger override. | Strongest |
| **Pre-shared secret** | Magento 2 (`X-Verbose-Log`) | Header value must match a configured secret. | Moderate (static secret, manual rotation) |
| **Gateway stripping** | General pattern | API gateway strips debug headers from external requests. Internal operators inject via admin tooling. | Baseline (no per-request auth) |

### Mojaloop-Specific Mitigations

1. **Gateway enforcement.** Strip `baggage` debug keys from external DFSP requests. Only internal operators initiate debug sessions.
2. **Signed tokens.** Embed a JWT as the baggage value. Each service verifies before honoring the override.
3. **Session limits.** Cap concurrent overrides (e.g., max 5 system-wide). Include TTL in JWT claims (5-15 minutes).
4. **Separate log pipeline.** Route `debug.override: true` entries to an access-controlled index — DEBUG logs often contain account numbers and request bodies.
5. **Audit trail.** Log override activation: who, when, which trace ID.

### OTel Baggage Security Warning

The OTel spec warns: *"Avoid putting sensitive information in baggage, as it might be logged or sent to untrusted downstream services."*

---

## Interaction with OTel Trace Sampling

Head-based and tail-based sampling are **trace-only** concepts in the OTel spec. `ParentBasedSampler` controls span creation — it does not affect log emission. The force-logging mechanism described in this document (Baggage + `AsyncLocalStorage` + dual logger) operates independently of trace sampling.

The one connection point is the **`trace_based` LoggerConfig parameter**: when `true`, the Logs SDK drops log records from unsampled traces (those where `TraceFlags` indicates not sampled). It reads the already-decided sampled flag — it does not invoke any Sampler.

### Potential conflict with force-logging

If `trace_based: true` is configured and a force-logged request happens to be on an **unsampled trace**, the Logs SDK will drop the override logs before they reach any transport — even though the debug baggage flag is set. Two mitigations:

- **Set `trace_based: false`** (the default). Force-logging then works regardless of trace sampling state.
- **Ensure force-logged requests are also trace-sampled.** The admin tool can set both the debug baggage and the `traceparent` sampled flag. Downstream services using `ParentBasedSampler` will honor the sampled flag for spans, and the debug baggage for logs — but these are independent decisions on independent signals.

### `minimum_severity` (LoggerConfig)

Sets the lowest severity the Logger processes. Configured at startup; cannot change per-request. Not relevant to force-logging, which operates at the application layer before the OTel Logs SDK.

---

## Implementation Sketch

Combines three recommendations: OTel Baggage for propagation, JWT signing for security (Security section), and the dual-logger pattern for filtering (Approach 1).

### End-to-end flow

```
┌──────────────┐     baggage: mojaloop.debug=<signed-token>
│  Admin Tool  │──────┐
└──────────────┘      │
                      ▼
┌──────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ External │───>│ API Gateway │───>│  Service A  │───>│  Service B  │
│   DFSP   │    │ (strips     │    │             │    │             │
│          │    │  external   │    │             │    │             │
└──────────┘    │  debug keys,│    └─────────────┘    └─────────────┘
                │  passes     │
                │  internal)  │    Each service: reads baggage,
                └─────────────┘    verifies JWT, seeds asyncStorage,
                                   ContextLogger routes override
                                   entries to overrideLogger
```

### Prerequisites

- **`asyncStorage.run()` must be called by the consuming service.** `contextLogger.js` creates and exports `asyncStorage` but never calls `asyncStorage.run()`. Each service must wrap request handlers in `asyncStorage.run(store, handler)` to establish the per-request store. Whether Mojaloop services already do this determines the scope of the change.
- **JWT verification is new infrastructure.** The codebase has no JWT code — requires a library, public key distribution, and rotation strategy.
- **Cleanup is automatic.** The store is garbage-collected when the async context exits.

### Steps

1. **Admin tool** creates a signed JWT with `{ level: 'debug', exp: <15min> }` and sends an HTTP request to the target service with `baggage: mojaloop.debug=<jwt>`.

2. **API gateway** strips the `mojaloop.debug` baggage key (and any `X-Debug-*` headers) from external DFSP requests. Passes them through from internal sources.

3. **Hapi `onPreHandler` extension** (new code in each service) bridges the propagated signal to the per-request async context:

   ```javascript
   const { propagation } = require('@opentelemetry/api')
   const { asyncStorage } = require('@mojaloop/central-services-logger').ContextLogger

   server.ext('onPreHandler', (request, h) => {
     const token = propagation.getActiveBaggage()?.getEntry('mojaloop.debug')?.value
     if (!token) return h.continue

     let payload
     try {
       payload = verifyJwt(token) // { level: 'debug', exp: ... }
     } catch (err) {
       request.log(['warn'], `Debug override JWT rejected: ${err.message}`)
       return h.continue  // fail-open for request, fail-closed for debug
     }

     const store = asyncStorage.getStore() || {}
     store._logLevelOverride = payload.level
     if (!asyncStorage.getStore()) asyncStorage.enterWith(store)

     return h.continue
   })
   ```

   The modified `formatLog()` (see Approach 1) destructures `_logLevelOverride` out of the store spread.

4. **`ContextLogger` level guards** (Approach 1) check `asyncStorage.getStore()` when the static `isXxxEnabled` flag is `false`:

   - **4a.** If `isXxxEnabled` is `true` (level at or above production threshold), the normal path fires. Override logic is not involved.
   - **4b.** If `isXxxEnabled` is `false`, `_hasOverride(level)` reads `asyncStorage.getStore()._logLevelOverride`. If the override permits the level (entry priority `<=` override priority per `allLevels`, where lower number = higher priority), the call routes to the shared `overrideLogger` via `.log(level, ...)`. The `.log()` method bypasses both the production logger's transport-level filtering and the `customLevels` no-op methods (see Approach 1, `customLevels` caveat).
   - Override entries carry `debug.override: true` metadata for log pipeline routing (see "Identifying override logs in output").

5. **OTel SDK** propagates baggage automatically to downstream HTTP calls. For Kafka, `central-services-stream` already injects/extracts all three W3C headers (`traceparent`, `tracestate`, `baggage`) via `OTEL_HEADERS` (`src/constants.js:20`). The consumer's `executeInsideSpanContext` restores OTel context via `context.with()`, so `propagation.getActiveBaggage()` works inside the handler. However, `context.with()` does not call `asyncStorage.run()` — the consumer handler needs its own bridge:

   ```javascript
   // Inside the Kafka consumer handler (workDoneCb)
   const token = propagation.getActiveBaggage()?.getEntry('mojaloop.debug')?.value
   if (token && verifyJwt(token)) {
     asyncStorage.enterWith({ ...asyncStorage.getStore(), _logLevelOverride: 'debug' })
   }
   ```

---
