# Best Practices and Guidelines

This document provides guidelines on implementation, performance optimization, and common anti-patterns to avoid.

## Production Logging Guidelines

### Performance Considerations
- **Avoid expensive operations at DEBUG/TRACE** - These should be cheap since they may be enabled temporarily
- **Use `loggerFactory` from contextLogger** - It checks `is<Level>Enabled` internally before calling Winston, so log arguments are only serialized when the level is active
- **Use `isDebugEnabled()` only for expensive computation** - Guard with `isDebugEnabled()` only when the arguments themselves require expensive work that exists solely for debugging
- **Structured logging** - Log objects, not concatenated strings
- **Avoid JSON.stringify** - Let the logging library handle serialization

### Examples of Performance-Aware Logging

**Bad:**
```javascript
// Always executes stringify even if DEBUG is disabled
logger.debug(`Processing: ${JSON.stringify(largeObject)}`);
```

**Good:**
```javascript
// contextLogger handles level checks internally — just log
logger.debug('Processing transfer', { transfer });

// Use isDebugEnabled() ONLY when guarding expensive computation
if (logger.isDebugEnabled()) {
  logger.debug('Detailed state', { computedState: computeExpensiveState() });
}
```

### Metrics vs. Logs
  
Do **NOT** use logs for counting volume or calculating success rates. Use **Metrics** (Counters, Histograms) for throughput, latency, and error rate tracking.
Use **Logs** for high-cardinality details that cannot be captured in metrics (e.g., specific transaction IDs, error reasons).


## Infrastructure and Observability

### Correlation IDs and Trace Context

Winston's OTel auto-instrumentation (`@opentelemetry/instrumentation-winston`) automatically injects `trace_id`, `span_id`, and `trace_flags` into every log entry. Do **not** add them manually — duplicate or stale IDs cause correlation errors.

Use child loggers for **business-level** correlation IDs only (request ID, transfer ID, batch ID):

```javascript
// trace_id and span_id are injected automatically by OTel instrumentation
// Only add business identifiers via child loggers
const log = logger.child({ requestId: req.id, transferId: req.params.id })
log.info('Processing request')
```

### Log to Stdout

Write all logs to stdout. Do **not** use `console.log` or write to files directly. Delegate collection, rotation, and shipping to external tools (Fluentd, Vector, OTel Collector). In containerized environments, a sidecar or daemonset picks up stdout, enriches it with pod/host metadata, and ships it to a centralized store.

### OpenTelemetry Semantic Conventions

Use OTel's standard attribute names so logs, traces, and metrics correlate without per-service mapping:

| Domain | Attributes |
|--------|-----------|
| HTTP | `http.request.method`, `url.path`, `http.response.status_code` |
| Database | `db.system`, `db.statement`, `db.operation.name` |
| Errors | `error.type`, `error.message`, `error.stack_trace` |
| Messaging | `messaging.system`, `messaging.destination.name` |

When OTel renames or deprecates an attribute, update logging code to match.

### Canonical Log Lines

Emit one wide log entry per request at the HTTP boundary. Include method, route, status code, duration, and key business identifiers. This single entry supports latency analysis, error rate calculation, and audit without aggregation.

```javascript
logger.info(`${req.method} ${req.path} ${res.statusCode}`, {
  'http.request.method': req.method,
  'url.path': req.path,
  'http.response.status_code': res.statusCode,
  'http.server.request.duration': duration,
  transferId
})
```

### Redaction at Logger Level

Apply redaction at the logger configuration — not at each call site — so new fields cannot leak by accident. Declare paths to mask (e.g., `authorization`, `password`, `token` fields). Log user IDs and entity references instead of full user objects. Dump sanitized configuration at startup: mark sensitive fields so they display as asterisks.

### Per-Component Log Levels

Use `setLevel()` on a child logger to change its verbosity without affecting the parent or siblings. This lets you debug one subsystem without raising the noise floor for everything else.

```javascript
// Only database logs go to debug; parent and siblings stay at their original level
const dbLog = logger.child({ component: 'database' })
dbLog.setLevel('debug')
```

### Dedicated `LOG_LEVEL_{DOMAIN}` Env Vars

When a shared library creates its own internal logger, control its level via a `LOG_LEVEL_{DOMAIN}` env var with a default of `'info'`. This lets operators tune library verbosity without changing the service's log level.

```javascript
const { LOG_LEVEL_KAFKA = 'info' } = require('node:process').env
const logger = loggerFactory('ml-kafka')
logger.setLevel(LOG_LEVEL_KAFKA)

// Usage: LOG_LEVEL_KAFKA=debug npm start
// Service stays at 'info', Kafka internals log at 'debug'
```

## Anti-Patterns to Avoid

### 1. Using console.log
```javascript
// ❌ BAD 
console.log('Some message')

// ✅ GOOD
logger.info('Some message')
```

### 2. Logging Everything at INFO
```javascript
// ❌ BAD - Internal details at INFO, generic messages
logger.info('Entering validateTransfer function');
logger.info('Retrieved account from database');
logger.info('Balance check passed');

// ✅ GOOD - Only significant events at INFO with context
logger.info(`Transfer ${transferId} validated successfully for ${amount} ${currency}`, {
  operation: 'validateTransfer',
  eventName: 'TransferValidated',
  transferId: transferId,
  'transfer.amount': amount,
  'transfer.currency': currency
});
```

### 3. Missing Context in Message
```javascript
// ❌ BAD - Message doesn't explain what happened
logger.error('Validation failed');

// ✅ GOOD - Descriptive message with inline context plus structured attributes
// Trace context is automatic, don't add manually!
logger.error(`Transfer ${transfer.id} validation failed at step '${step}': ${validationErrors.join(', ')}`, {
  operation: 'validateTransfer',
  eventName: 'ValidationFailed',
  transferId: transfer.id,
  validationStep: step,
  validationErrors: validationErrors
});
```

### 4. Missing Error Stack
**Requirement:** "Verify that Errors are logged with Error Code, Error Stack defined".

```javascript
// ❌ BAD - Losing the stack trace
logger.error(`Failed: ${error.message}`);

// ✅ GOOD - Passing the error object ensures stack is captured
logger.error(`Transfer failed: `, error) // Logger serializer should handle 'exception.stacktrace' and 'exception.type'
```

### 5. Sensitive Data Exposure
```javascript
// ❌ BAD
logger.debug('User authentication', { password: user.password });

// ✅ GOOD
logger.debug('User authentication', { 
  userId: user.id,
  method: 'password'
});
```

### 6. Over-Logging
```javascript
// ❌ BAD - Logging inside tight loops with repeated generic messages
for (const transfer of transfers) {
  logger.info('Processing transfer', transfer); // Could be thousands
}

// ✅ GOOD - Aggregate with descriptive summary
logger.info(`Processing batch of ${transfers.length} transfers for batch ${batch.id}`, { 
  operation: 'processBatch',
  eventName: 'BatchProcessingStarted',
  'batch.id': batch.id,
  'batch.transferCount': transfers.length,
  'batch.totalAmount': transfers.reduce((sum, t) => sum + t.amount, 0)
});
```

## Where to Log (Avoiding Duplication)

**Goal:** Avoid "Errors captured in more than one place (often three times)".

### The "Catch and Log" Anti-Pattern
Do **NOT** catch an error just to log it and throw it again, unless you are adding significant context that cannot be added anywhere else.

```javascript
// ❌ BAD - Duplicates logs up the stack
try {
  await performAction();
} catch (error) {
  logger.error(error); // Log 1
  throw error;
}

// ... caller ...
try {
  await service.action();
} catch (error) {
  logger.error(error); // Log 2 (Duplicate)
  throw error;
}
```

### The "Catch, Context, and Bubble" Pattern
If you catch an error to add context, wrap it or attach properties, but do NOT log it until the "Edge" of the application.

```javascript
// ✅ GOOD - Add context, don't log yet
try {
  await db.query();
} catch (error) {
  throw new DatabaseError('Failed to query', { cause: error });
}

// ... Global Error Handler (The Edge) ...
// Log ONLY here
logger.error(finalError); 
```

### Exceptions
- **Background Jobs**: Log errors inside the job as they have no caller to bubble to.
- **Async Event Handlers**: Log errors inside consumers/handlers if they don't have a standardized global error handler.

