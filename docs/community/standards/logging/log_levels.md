# Log Levels

This document details the standard log levels, their mapping to OpenTelemetry, and decision guidelines for when to use each.

## OpenTelemetry Severity Mapping

Mojaloop log levels map to OpenTelemetry SeverityNumber ranges for compatibility:

| Mojaloop Level | ML numeric value | OTel SeverityNumber | OTel Range | Numeric Value |
|----------------|------------------|---------------------|------------|---------------|
| FATAL          | -                | FATAL               | 21-24      | 21            |
| ERROR          | 0                | ERROR               | 17-20      | 17            |
| WARN           | 1                | WARN                | 13-16      | 13            |
| AUDIT          | 2                | ???                 |            |               |
| TRACE          | 3                | ??? (see TRACE)     |            |               |
| INFO           | 4                | INFO                | 9-12       | 9             |
| PERF           | 5                | ???                 |            |               |
| VERBOSE        | 6                | INFO (Low-priority) | 7-8        | 7             |
| DEBUG          | 7                | DEBUG               | 5-6        | 5             |
| SILLY          | 8                | TRACE               | 1-4        | 1             |

When emitting logs via OpenTelemetry SDK, use the corresponding SeverityNumber. Most logging libraries will handle this mapping automatically.

## Level Definitions

### FATAL - Uncoverable System Failures

**When to use:**
- System cannot continue to function
- Critical dependency failure preventing startup
- Security breach detected requiring shutdown
- Unrecoverable data corruption

**What to include:**
- Cause of fatal error
- Shut down status
- Immediate action required

**Examples:**
```javascript
logger.fatal(`Central Ledger service shutting down: Database unreachable at startup after ${maxRetries} attempts`, {
  eventName: 'ServiceShutdown',
  reason: 'DatabaseUnreachable',
  'db.host': dbHost,
  'exception.message': error.message
});
```

### ERROR - Critical Issues Requiring Immediate Attention

**When to use:**
- Unhandled exceptions or errors
- Database connection failures
- External service failures (payment processor down)
- Data corruption or integrity issues
- Authentication/authorization failures
- Critical business rule violations
- Any condition that prevents normal operation

**What to include:**
- Error message and stack trace
- Operation context (function name, operation type)
- Request/transaction IDs for tracing
- User/account IDs (if applicable)
- Timestamp

**Examples:**
```javascript
// Trace context is AUTOMATIC - don't add manually!
logger.error(`Transfer ${transfer.id} processing failed in processTransfer operation: ${error.message}`, {
  // Attributes only - trace context added automatically by OTel
  operation: 'processTransfer',
  eventName: 'TransferFailed',
  transferId: transfer.id,
  'exception.type': error.name,
  'exception.message': error.message,
  'exception.stacktrace': error.stack
});

logger.error(`Database connection to ${dbConfig.host}:${dbConfig.port} failed after ${retryCount} retry attempts: ${error.message}`, {
  operation: 'connectDatabase',
  eventName: 'DatabaseConnectionFailed',
  'db.host': dbConfig.host,
  'db.port': dbConfig.port,
  'db.name': dbConfig.database,
  retryCount: retryCount,
  'exception.type': error.name,
  'exception.message': error.message
});
```

**Do NOT use for:**
- Expected validation failures (use WARN)
- Retry-able operations that succeed on retry
- User input errors (use WARN)

### WARN - Recoverable Issues or Degraded Operation

**When to use:**
- Expected validation failures
- Retry attempts (before final failure)
- Deprecated API usage
- Configuration issues with fallback values
- Business rule violations that can be handled
- Rate limiting triggered
- Temporary service unavailability with fallback
- Performance degradation warnings

**What to include:**
- Warning description
- Context of what triggered the warning
- Action taken (fallback, retry, skip)
- Request/transaction IDs

**Examples:**
```javascript
logger.warn(`Transfer ${transfer.id} validation failed during balance check. Account balance is ${account.balance} ${account.currency} but transfer amount is ${transfer.amount} ${transfer.currency}`, {
  operation: 'validateTransfer',
  eventName: 'TransferRejected',
  transferId: transfer.id,
  accountId: account.id,
  'account.balance': account.balance,
  'account.currency': account.currency,
  'transfer.amount': transfer.amount,
  'transfer.currency': transfer.currency,
  validationErrors: errors,
  reason: 'InsufficientFunds'
});

logger.warn(`API rate limit of ${limit} requests per ${period} reached for endpoint ${endpoint}. Throttling subsequent requests`, {
  operation: 'rateLimit',
  eventName: 'RateLimitTriggered',
  endpoint: endpoint,
  limit: limit,
  period: period,
  currentCount: requestCount
});
```

**Do NOT use for:**
- Normal business operations
- Successful validation
- Debug information

### INFO - Significant Business Events

**When to use:**
- Service startup/shutdown (Major lifecycle events)
- Successful completion of major operations (Transfers)
- State transitions (transfer approved, settlement completed)
- API request/response (Significant entry points only)
- Authentication success

**What to include:**
- Event description
- Key identifiers (IDs, names)
- Relevant business data (amounts, status changes)
- Duration for completed operations

**Examples:**
```javascript
logger.info(`Transfer ${transfer.id} completed successfully from ${transfer.payerFsp} to ${transfer.payeeFsp} for ${transfer.amount.amount} ${transfer.amount.currency} in ${duration}ms`, {
  operation: 'processTransfer',
  eventName: 'TransferCompleted',
  transferId: transfer.id,
  'payer.fspId': transfer.payerFsp,
  'payee.fspId': transfer.payeeFsp,
  'transfer.amount': transfer.amount.amount,
  'transfer.currency': transfer.amount.currency,
  'duration.ms': duration
});

logger.info(`Service ${serviceName} v${version} started successfully on port ${port} in ${env} environment`, {
  eventName: 'ServiceStarted',
  'service.name': serviceName,
  'service.version': version,
  'deployment.environment': env,
  'server.port': port
});
```

**Do NOT use for:**
- High frequency operational noise (use VERBOSE)
- Internal function calls (use DEBUG)

### VERBOSE - Operational High-Volume Events

**When to use:**
- Health checks and keep-alives (often sampled)
- Minor configuration updates
- Periodic background tasks that are routine
- High-frequency API calls that are not "Significant Business Events"

**What to include:**
- Minimal context to verify activity
- Status of routine check

**Examples:**
```javascript
logger.verbose('Health check passed', {
  operation: 'healthCheck',
  uptime: process.uptime(),
  memoryUsage: process.memoryUsage().heapUsed
});
```

### DEBUG - Detailed Operational Information

**When to use (in non-production or when debugging):**
- Function entry/exit with parameters
- Intermediate calculation results
- State changes during operation
- Conditional branch taken
- Loop iterations (sparingly)
- Cache hits/misses
- Validation steps

**What to include:**
- Detailed context
- Variable values
- Flow indicators
- Internal state

**Examples:**
```javascript
logger.debug(`Processing transfer ${transfer.id} validation at step ${step}. Account balance is ${balance} and transfer amount is ${amount}`, {
  operation: 'validateTransfer',
  transferId: transfer.id,
  step: 'checkBalance',
  'account.balance': balance,
  'transfer.amount': amount,
  accountId: account.id
});

logger.debug(`Cache miss for key ${cacheKey}. Fetching participant ${participantId} from database`, {
  operation: 'getParticipant',
  cacheKey: cacheKey,
  participantId: participantId,
  entity: 'participant'
});
```

**Do NOT use for:**
- Sensitive data (passwords, tokens, full card numbers)
- Excessive logging in tight loops
- Information available elsewhere

### TRACE - Very Detailed Diagnostic Information

**When to use (only when explicitly needed for troubleshooting):**
- Every function entry/exit
- All variable mutations
- Detailed execution flow
- Performance profiling
- Protocol-level details

**What to include:**
- Maximum detail for diagnosis
- Full context including all parameters
- Execution timestamps

**Examples:**
```javascript
logger.trace(`Entering validateTransfer function with transfer ${transfer.id}, applying ${rules.length} validation rules in context ${context.requestId}`, {
  operation: 'validateTransfer',
  transferId: transfer.id,
  'validation.rulesCount': rules.length,
  requestId: context.requestId,
  args: { transfer, rules, context },
  timestamp: Date.now()
});
```

**Do NOT use:**
- In production by default (too verbose)
- For sensitive data

## Log Level Decision Tree

```
Is the application unable to continue? 
  YES → FATAL

Can the application continue with degraded functionality?
  YES → WARN

Is this a significant business event (Transfer Completed)?
  YES → INFO

Is this a routine operational event (Health Check)?
  YES → VERBOSE

Is this needed for troubleshooting but not in production?
  YES → DEBUG

Is this only needed for deep diagnostic analysis?
  YES → TRACE
```

## Verbosity and Sampling Rules

### Per-Level Configuration
The complexity and structure of logs depend on their level.

*   **WARN / ERROR / FATAL**: Always logged, regardless of configuration.
    *   **Must** include full stack traces for exceptions.
    *   **Must** include relevant context (IDs) to make the error actionable.
*   **INFO**: Standard operational level. Logged by default in Production.
    *   Should describe *what* happened (business events).
    *   Should *not* describe *how* (internal implementation details).
*   **VERBOSE**: Optional in Production.
    *   Captures high-frequency noise like health checks.
    *   Often sampled or disabled to save storage.
*   **DEBUG**: Disabled by default in Production.
    *   Contains detailed state changes, full payload (body content), and logic flow.
    *   Intended for developers debugging non-production environments.
*   **TRACE**: Disabled by default.
    *   Loop iterations, and variable values.
    *   Should only be enabled explicitly for deep diagnostics.

### Dynamic Tracing Override (Force-Logging)
To support debugging specific transactions in production without increasing the global log verbosity:

*   If an incoming request indicates tracing is enabled (e.g., via `X-Trace-Enabled` header or sampled flag in OTel context):
    *   **WARN / ERROR / FATAL**: Automatically logged for that request context.
    *   **INFO / VERBOSE / DEBUG**: Automatically promoted to be logged even if the service default is set to `WARN` or `INFO`.
    *   *Goal:* Allow end-to-end tracing of a specific request through the entire system at high fidelity while keeping the rest of the system quiet.

> **See also:** [Per-Request Log Override](./scenarios/per_request_log_override.md) for implementation details.


## Dynamic Log Level Configuration

Services should support changing log levels without restart:
- Via environment variables: `LOG_LEVEL=debug`
- Per-component configuration: `LOG_LEVEL_MYSQL=debug`
- Via configuration endpoint: `PUT /admin/log-level`
