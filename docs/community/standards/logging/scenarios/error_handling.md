# Error Handling and Propagation Standard

## Overview
This standard defines how to log and propagate errors to ensure that the root cause is preserved and that logs remain actionable without being redundant.

## Logging Exceptions

When an exception occurs that cannot be handled immediately (or is being handled by a final error handler), it must be logged with specific context. Trace context (`trace_id`, `span_id`) is automatically injected by the OTel SDK — do not set these manually.

### Exception Log Attributes

These attributes follow [OTel Exception Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/).

> **Automatic via contextLogger:** When you pass an Error object as the second argument (e.g., `logger.error('msg', err)`), contextLogger's `formatError` automatically sets all `exception.*` and `error.type` attributes via `otelDto.exceptionDto`. It also recursively formats the `cause` chain. Do not set these attributes manually when passing the Error object directly.

| Field Name             | Requirement Level | Type | Description | Example |
|------------------------|-------------------|------|-------------|---------|
| `exception.type`       | Conditionally Required [1] | string | The error class name or slug | "ValidationError", "TypeError" |
| `exception.message`    | Conditionally Required [1] | string | The technical error message | "Account not found" |
| `exception.stacktrace` | Required | string | The full stack trace (incl. causes) | "Error: ... at verify (file.js:10)..." |

[1] At least one of `exception.type` or `exception.message` MUST be set. Both SHOULD be set when available.

> **Sensitive data:** `exception.message` may contain PII (user IDs, account numbers, input values). Review messages before logging and redact where necessary.

### Operational Error Classifier

For operational logs (HTTP responses, DB operations), use `error.type` as a **low-cardinality** classifier separate from the `exception.*` attributes. Do not set both `exception.type` and `error.type` on the same log record unless they carry genuinely different values.

| Field Name             | Requirement Level | Type | Description | Example |
|------------------------|-------------------|------|-------------|---------|
| `error.type`           | Conditionally Required | string | Error classification: `err.code` -> `err.name` -> `"UnknownError"` | "ECONNREFUSED", "ValidationError" |

See [HTTP Requests](http_requests.md) and [SQL Queries](sql_queries.md) for `error.type` usage in operational logs.

### Project-Specific Attributes

| Field Name             | Requirement Level | Type | Description | Example |
|------------------------|-------------------|------|-------------|---------|
| `error.user_message`   | Recommended | string | User-facing notification (not an OTel attribute) | "Operation failed, contact provider" |

### Log Level Guidelines
For detailed definitions of log levels, refer to the [Log Levels Standard](../log_levels.md).

*   **FATAL**: The process will likely exit immediately.
*   **ERROR**: The request failed, but the process continues.
*   **WARN**: The error was handled/recovered, or is a validation issue.

## Propagating Errors

Do **NOT** simply log and re-throw the same error without context.
Do **NOT** swallow the stack trace when wrapping errors.

### Correct Pattern
Wrap the error, preserving the original cause.
```javascript
try {
  await db.query();
} catch (originalError) {
  // Wrap and throw, do NOT log here if a higher level handler will log it.
  throw new DatabaseError("Failed to query user", { cause: originalError });
}
```

### Top-Level Error Handler
Only the top-level handler (e.g., API middleware, worker loop) should log the final error with the full stack trace.

```javascript
// ✅ GOOD — pass the Error object directly; contextLogger adds all OTel attributes automatically
logger.error('Request failed: ', err)

// Also valid — manual attributes when you need extra context beyond the error
logger.error(`Request failed: ${err.message}`, {
  'exception.type': err.name,
  'exception.message': err.message,
  'exception.stacktrace': err.stack,
  'error.user_message': err.notice // project-specific, if available
})
```

## Review Checklist
*   Are **FATAL** errors causing a process exit?
*   Are **stack traces** strictly excluded from API responses in Production?
*   Are **wrapped errors** preserving the `cause` chain?
*   Does `exception.message` avoid leaking PII?
*   Are `exception.*` and `error.type` used in the correct contexts (exception logs vs operational logs)?
