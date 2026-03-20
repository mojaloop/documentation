# Data Model

This document defines the structure and field conventions for Mojaloop logs, ensuring alignment with OpenTelemetry standards.

## OpenTelemetry Alignment

This standard aligns with the following OpenTelemetry specifications:
*   [Logs Data Model](https://opentelemetry.io/docs/specs/otel/logs/data-model/)
*   [Semantic Conventions (Attributes)](https://opentelemetry.io/docs/specs/semconv/)

This alignment ensures:
- Logs can be correlated with traces and metrics
- Compatibility with OpenTelemetry collectors and backends
- Standardized severity levels and structured format
- Automatic context propagation in distributed systems

## Standard Field Mapping

| Mojaloop Concept | OTel Field Name | Description |
|------------------|-----------------|-------------|
| Log Level        | `SeverityNumber`| Numerical value of the severity (1-24) |
| Level Name       | `SeverityText`  | The text string representation (e.g., "INFO") |
| Message          | `Body`          | The human-readable message content |
| Context          | `Attributes`    | Structured key-value pairs (event specific) |
| Service Info     | `Resource`      | Source description (Service Name, Version, Env) |
| Scope            | `InstrumentationScope` | The library/module emitting the log |

## Structured Logging Format

### Log Message Best Practices

**The message (Body) should be human-readable and self-explanatory:**
- Include specific values inline (IDs, amounts, states)
- Describe what happened, not just the operation name
- Be detailed enough to understand the issue without looking at attributes
- Use complete sentences with context

**Examples of good messages:**
- ✅ `"Transfer abc-123 validation failed during balance check. Account balance is 100.00 USD but transfer amount is 150.00 USD"`
- ✅ `"Payment xyz-789 processing completed successfully from PayerFSP to PayeeFSP in 250ms"`
- ✅ `"Database connection to mysql://prod-db:3306 failed after 3 retry attempts: Connection timeout"`

**Examples of poor messages:**
- ❌ `"Validation failed"` (too generic, no context)
- ❌ `"Processing transfer"` (not clear what happened)
- ❌ `"Error occurred"` (provides no information)

**The attributes provide structured data for querying:**
- Use attributes for filtering, grouping, and aggregation
- Attributes enable queries like "all transfers > $1000" or "errors from service X"
- Attributes support correlation (traceId, spanId, transferId)

### OpenTelemetry Log Record Structure

Following OpenTelemetry conventions, logs should include:

**Core Fields (automatic):**
- **Timestamp**: Time when event occurred (ISO 8601 format)
- **SeverityText**: Human-readable level (ERROR, WARN, INFO, DEBUG, TRACE)
- **SeverityNumber**: Numeric severity (17=ERROR, 13=WARN, 9=INFO, 5=DEBUG, 1=TRACE)
- **Body**: Human-readable message describing the event

**Trace Context Fields (for distributed tracing):**
- **TraceId**: W3C Trace Context trace ID (**automatic** when using OTel-instrumented logging)
- **SpanId**: Current span ID (**automatic** when using OTel-instrumented logging)
- **TraceFlags**: W3C trace flags (**automatic**, typically set by tracing SDK)

**Important:** You should **NOT** manually add traceId/spanId to log calls. These are automatically injected by the logging library when properly configured with OpenTelemetry instrumentation.

**Resource Fields (describes the source):**
- `service.name`: Service name (e.g., 'central-ledger')
- `service.version`: Service version (e.g., '1.2.3')
- `deployment.environment`: Environment (e.g., 'production', 'staging')
- `host.name`: Hostname or container ID
- `process.pid`: Process ID

**Attributes (business context):**
- `operation`: Function or operation name
- `duration.ms`: For completed operations (milliseconds)
- `transferId`, `userId`, `accountId`: Business entity IDs
- `error.type`: Error class name (for errors)
- `error.message`: Error message (for errors)
- `error.stack`: Stack trace (for errors)
- `eventName`: For business events (e.g., 'TransferCompleted', 'PaymentFailed')

### Distinction: Resource vs Attributes

- **Resource**: Describes WHERE the log came from (service, host, environment) - static per service instance
- **Attributes**: Describes WHAT happened (operation, IDs, business data) - varies per log entry

**Example with OpenTelemetry Structure:**
```javascript
// Resource (set once at service startup)
const resource = {
  'service.name': 'central-ledger',
  'service.version': '1.2.3',
  'deployment.environment': 'production',
  'host.name': 'pod-xyz-123'
};

// Log entry with descriptive message, trace context, and attributes
logger.error(
  `Transfer ${transfer.id} processing failed during ${operation} operation from ${transfer.payerFsp} to ${transfer.payeeFsp}: ${error.message}`,
  {
    // Trace context (automatic if using OTel SDK)
    traceId: '4bf92f3577b34da6a3ce929d0e0e4736',
    spanId: '00f067aa0ba902b7',
    
    // Attributes (business context)
    operation: 'processTransfer',
    eventName: 'TransferFailed',
    transferId: transfer.id,
    'payer.fspId': transfer.payerFsp,
    'payee.fspId': transfer.payeeFsp,
    'transfer.amount': transfer.amount.amount,
    'transfer.currency': transfer.amount.currency,
    'error.type': 'ValidationError',
    'exception.message': error.message,
    'exception.stacktrace': error.stack,
    'duration.ms': 250
  }
);
```
