# SQL and Database Logging Standard

## Overview

This standard defines how to log database interactions. It aligns with [OpenTelemetry Database Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/database/) and [MySQL-specific conventions](https://opentelemetry.io/docs/specs/semconv/db/mysql/).

Full query logging is reserved for DEBUG level or specific audit requirements to avoid leaking sensitive data (PII).

## Query Logging

### Log Level

*   **DEBUG**: Log all queries for development/debugging.
*   **WARN**: Log slow queries (exceeding a defined threshold) / expected errors.
*   **ERROR**: Log failed queries.

### Required Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `db.system.name` | string | The DBMS product identifier | `"mysql"`, `"postgresql"` |

### Conditionally Required Attributes

Include these when the stated condition is met.

| Field Name | Type | Condition | Description | Example |
|------------|------|-----------|-------------|---------|
| `db.namespace` | string | If available | Database name | `"central_ledger"` |
| `db.collection.name` | string | If readily available and single-table operation | Table name | `"transfers"` |
| `error.type` | string | If operation failed | Error classification | `"ER_DUP_ENTRY"`, `"TimeoutError"` |
| `db.response.status_code` | string | If operation failed and code available | Database vendor error code (MySQL error number) | `"1062"`, `"1045"` |
| `server.port` | integer | If non-default and `server.address` is set | Server port number | `3307` |

### Recommended Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `db.operation.name` | string | SQL command being executed (uppercase) | `"SELECT"`, `"INSERT"` |
| `db.query.text` | string | Sanitized/parameterized SQL statement | `"SELECT * FROM transfers WHERE id = ?"` |
| `db.query.summary` | string | Low-cardinality query summary (max 255 chars) | `"SELECT transfers"`, `"GetTransferById"` |
| `server.address` | string | Database host | `"mysql-primary"` |
| `db.client.operation.duration` | number | Execution time in **seconds** | `0.023` |

> **Note:** We use `db.client.operation.duration` (in seconds) instead of a custom `duration.ms` attribute because OTel semantic conventions define duration as the measured value of a histogram metric, not an attribute. This matches the convention used in [HTTP Request Logging](./http_requests.md).

> **Note:** When using knex, the `db.query.summary` can be provided by the `.comment()` method

### Opt-In Attributes (DEBUG/TRACE only)

These attributes are expensive or sensitive. Log them only at DEBUG/TRACE level or when tracing is explicitly enabled.

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `db.query.parameter.<key>` | string | Individual query parameter, keyed by name or zero-based index. Must be masked for PII. | `db.query.parameter.0`: `"abc-123"` |
| `db.response.returned_rows` | integer | Count of rows returned (read operations) | `42` |
| `db.response.rows_affected` | integer | Count of rows affected (write operations) — project extension, not in OTel | `1` |

### Security Warning

*   **Never** log `db.query.parameter.*` or result data by default in Production.
*   **Never** include raw values in `db.query.text`. Use placeholders (`?`, `$1`).
*   **Masking**: Even at TRACE, redact sensitive fields (passwords, PINs) from parameters and results.

### Example (Success)

```json
{
  "level": "DEBUG",
  "message": "GetTransferById completed in 23ms on central_ledger.transfers",
  "attributes": {
    "db.system.name": "mysql",
    "db.namespace": "central_ledger",
    "db.operation.name": "SELECT",
    "db.collection.name": "transfers",
    "db.query.text": "SELECT * FROM transfers WHERE id = ?",
    "db.query.summary": "SELECT transfers",
    "server.address": "mysql-primary",
    "server.port": 3306,
    "db.client.operation.duration": 0.023,
    "db.response.returned_rows": 1
  }
}
```

### Example (Error)

```json
{
  "level": "ERROR",
  "message": "InsertTransfer failed: Duplicate entry 'abc-123' for key 'PRIMARY'",
  "attributes": {
    "db.system.name": "mysql",
    "db.namespace": "central_ledger",
    "db.operation.name": "INSERT",
    "db.collection.name": "transfers",
    "db.query.text": "INSERT INTO transfers (id, amount) VALUES (?, ?)",
    "db.query.summary": "INSERT transfers",
    "server.address": "mysql-primary",
    "server.port": 3306,
    "db.client.operation.duration": 0.005,
    "error.type": "ER_DUP_ENTRY",
    "db.response.status_code": "1062"
  }
}
```

### Log examples

```bash
2026-03-09T11:23:16.917Z - debug: knex query response:  - {"attributes":{"db.client.operation.duration":0.570,"db.collection.name":"quote","db.namespace":"central_ledger","db.operation.name":"INSERT","db.query.summary":"INSERT quote","db.query.text":"insert into `quote` (`amount`, `amountTypeId`, `balanceOfPaymentsId`, `currencyId`, `expirationDate`, `note`, `quoteId`, `transactionInitiatorId`, `transactionInitiatorTypeId`, `transactionReferenceId`, `transactionRequestId`, `transactionScenarioId`, `transactionSubScenarioId`) values (?, ?, ?, ?, ?, DEFAULT, ?, ?, ?, ?, ?, ?, DEFAULT)","db.response.returned_rows":1,"db.system.name":"mysql","server.address":"mysql","server.port":3306},"context":"CachedDatabase","knexTxId":"trx2"}

2026-03-09T11:23:55.415Z - error: knex query error:  -    {"attributes":{"db.client.operation.duration":0.007,"db.collection.name":"quoteError","db.namespace":"central_ledger","db.operation.name":"INSERT","db.query.summary":"INSERT quoteError","db.query.text":"insert into `quoteError` (`errorCode`, `errorDescription`, `quoteId`) values (?, ?, ?)","db.response.status_code":"1452","db.system.name":"mysql","error.type":"ER_NO_REFERENCED_ROW_2","server.address":"mysql","server.port":3306},"context":"CachedDatabase","knexTxId":"__knexUid12"}
```


## Error Handling

When a database operation fails, capture the error with these steps:

1. **Set span status** to `ERROR`:
   ```javascript
   span.setStatus({ code: SpanStatusCode.ERROR })
   ```
2. **Record the exception** on the span:
   ```javascript
   span.recordException(err)
   ```
3. **Set `error.type`** with the error classification:
   ```javascript
   span.setAttribute('error.type', err?.code || err?.name || 'UnknownError')
   ```
4. **Set `db.response.status_code`** with the database error code (when available):
   ```javascript
   span.setAttribute('db.response.status_code', String(err?.errno))
   ```

The error type resolution order (`err.code` → `err.name` → `'UnknownError'`) ensures that:
- MySQL errors use their error code (e.g., `ER_DUP_ENTRY`, `ER_ACCESS_DENIED_ERROR`)
- Node.js system errors use their code (e.g., `ECONNREFUSED`, `ETIMEDOUT`)
- Application errors use their class name (e.g., `ValidationError`, `TimeoutError`)
- Unknown errors get a fallback classification

See [Error Handling Standard](./error_handling.md) for general error logging rules.

## Review Checklist

*   Does every database log include `db.system.name`?
*   Is `db.query.text` sanitized (placeholders only, no raw values)?
*   Is `db.client.operation.duration` in seconds (not milliseconds)?
*   Is `error.type` set when queries fail, with resolution order `err.code` → `err.name` → `"UnknownError"`?
*   Is `db.response.status_code` set with the MySQL error number on failure?
*   Are `db.query.parameter.*` fields excluded from production logs unless explicitly enabled?
*   Are sensitive values (passwords, PINs) redacted even at TRACE level?
