# HTTP Request Logging Standard

## Overview
This standard defines the required fields and practices for logging HTTP requests (both incoming and outgoing). Adhering to this standard ensures consistent observability of API traffic and service interactions.

Attribute requirement levels follow the [OTel Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/http/http-spans/) structure: Required, Conditionally Required, Recommended, and Opt-In.

> **Duration as log attribute:** `http.server.request.duration` and `http.client.request.duration` are OTel histogram metric names, not span attributes. We borrow these names as structured log attributes (in seconds) as a Mojaloop convention, to align with OTel tooling and dashboards.

> **Method normalization:** Non-standard HTTP methods should be mapped to `_OTHER` in `http.request.method`, with the original value preserved in `http.request.method_original`.

> **URL redaction:** Sensitive query parameters (e.g., tokens, signatures) in `url.full` and `url.query` must be redacted before logging.

## Incoming Requests (Server Side)

All incoming HTTP requests must be logged at the completion of the request.

### Required Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `http.request.method` | string | HTTP request method (canonical form) | "POST", "GET", "_OTHER" |
| `url.path` | string | The target path | "/transfers" |
| `url.scheme` | string | The URI scheme component identifying the used protocol | "https" |
| `request.id` | string | Unique request identifier (Trace ID). **ML-specific, not an OTel attribute.** | "req-123xyz" |
| `http.server.request.duration` | number | Duration of the request in seconds. **ML convention** (see Overview). | 0.150 |

### Conditionally Required Attributes

| Field Name | Type | Condition | Description | Example |
|------------|------|-----------|-------------|---------|
| `http.response.status_code` | int | If response was sent | HTTP response status code | 200, 400, 500 |
| `http.route` | string | If available | The matched route path (low cardinality) | "/transfers/:id" |
| `error.type` | string | If request ended with error | Error identifier (see [error.type values](#errortype-values)) | "500", "timeout" |
| `server.port` | int | If available and `server.address` is set | Server port number | 443 |
| `url.query` | string | If present in the request | URL query string (redact sensitive params) | "type=MSISDN&id=123" |
| `http.request.method_original` | string | If differs from `http.request.method` | Original HTTP method before normalization | "PATCH" |
| `network.protocol.name` | string | If not `http` and `network.protocol.version` is set | Application layer protocol | "http", "spdy" |

### Recommended Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `server.address` | string | The server address (Host) | "api.mojaloop.io" |
| `user_agent.original` | string | User agent string | "Mozilla/5.0..." |
| `client.address` | string | IP address of the client | "192.168.1.1" |
| `url.full` | string | Full request URL. **ML extension** (OTel does not define this for server spans). | "https://api.mojaloop.io/transfers" |
| `network.protocol.version` | string | HTTP protocol version | "1.1", "2" |
| `network.peer.address` | string | Peer address (actual TCP peer, may differ from `client.address` behind proxies) | "10.0.0.5" |
| `network.peer.port` | int | Peer port number | 54321 |

### Opt-In Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `http.request.body.size` | int | Size of the request body in bytes | 1024 |
| `http.response.body.size` | int | Size of the response body in bytes | 2048 |

### FSPIOP Headers
For Mojaloop-specific API calls, the following FSPIOP headers must be logged as attributes if present.

| Header | Attribute Key | Description | Handling |
|--------|---------------|-------------|----------|
| `FSPIOP-Source` | `fspiop.source` | Sender FSP ID | Log value. |
| `FSPIOP-Destination` | `fspiop.destination` | Recipient FSP ID | Log value. |
| `FSPIOP-Signature` | `fspiop.signature` | Request Integrity Signature | **Hash** the value (do not log full JWS). |
| `FSPIOP-URI` | `fspiop.uri` | Service URI used for signature | Log value. |
| `FSPIOP-HTTP-Method` | `fspiop.method` | Service Method used for signature | Log value. |
| `FSPIOP-Encryption` | `fspiop.encryption` | Encryption header | Log metadata/algorithm only. |

### Example

```json
{
  "level": "INFO",
  "message": "Incoming request POST /transfers",
  "attributes": {
    "http.request.method": "POST",
    "url.path": "/transfers",
    "url.scheme": "https",
    "http.route": "/transfers",
    "http.response.status_code": 201,
    "http.server.request.duration": 0.045,
    "request.id": "abc-123-def",
    "server.address": "api.mojaloop.io"
  }
}
```

### Example (Error)

```json
{
  "level": "ERROR",
  "message": "Incoming request POST /transfers",
  "attributes": {
    "http.request.method": "POST",
    "url.path": "/transfers",
    "url.scheme": "https",
    "http.route": "/transfers",
    "http.response.status_code": 500,
    "error.type": "500",
    "http.server.request.duration": 0.120,
    "request.id": "abc-456-ghi"
  }
}
```

### Logs example:
```bash
2026-03-09T16:59:40.334Z - info: [==> req] POST /fxQuotes  [10008] -    {"attributes":{"client.address":"172.19.0.1","http.request.method":"POST","http.route":"/{p*}","request.id":"1773075580333:37c01683ce70:30:mmjfbo4w:10008__undefined","server.address":"localhost","server.port":3002,"url.full":"http://localhost:13002/fxQuotes","url.path":"/fxQuotes","url.scheme":"http","user_agent.original":"axios/1.13.6"},"context":"QS","headers":{"accept":"application/vnd.interoperability.iso20022.fxQuotes+json;version=2.0","accept-encoding":"gzip, compress, deflate, br","connection":"keep-alive","content-length":"816","content-type":"application/vnd.interoperability.iso20022.fxQuotes+json;version=2.0","date":"Mon, 09 Mar 2026 16:59:40 GMT","fspiop-destination":"greenbank","fspiop-source":"pinkbank","host":"localhost:13002","user-agent":"axios/1.13.6"},"requestId":"1773075580333:37c01683ce70:30:mmjfbo4w:10008__undefined"}
...
2026-03-09T16:59:40.336Z - info: [<== 202] POST /fxQuotes  [10008] 0.003s -     {"attributes":{"client.address":"172.19.0.1","http.request.method":"POST","http.response.status_code":202,"http.route":"/fxQuotes","http.server.request.duration":0.003,"request.id":"1773075580333:37c01683ce70:30:mmjfbo4w:10008__undefined","server.address":"localhost","server.port":3002,"url.full":"http://localhost:13002/fxQuotes","url.path":"/fxQuotes","url.scheme":"http","user_agent.original":"axios/1.13.6"},"context":"QS","headers":{}}

```

## Outgoing Requests (Client Side)

All outgoing HTTP requests made by the service must be logged.

### Required Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `http.request.method` | string | HTTP request method (canonical form) | "GET", "POST", "_OTHER" |
| `url.full` | string | Full request URL (redact sensitive query params) | "https://external-service.com/api" |
| `server.address` | string | Target host | "als.mojaloop.io" |
| `server.port` | int | Target port | 80, 443 |
| `http.client.request.duration` | number | Duration of the call in seconds. **ML convention** (see Overview). | 0.230 |

### Conditionally Required Attributes

| Field Name | Type | Condition | Description | Example |
|------------|------|-----------|-------------|---------|
| `http.response.status_code` | int | If response was received | HTTP response status code | 200, 500 |
| `error.type` | string | If request ended with error | Error identifier (see [error.type values](#errortype-values)) | "500", "ECONNREFUSED" |
| `http.request.method_original` | string | If differs from `http.request.method` | Original HTTP method before normalization | "PATCH" |
| `network.protocol.name` | string | If not `http` and `network.protocol.version` is set | Application layer protocol | "http" |

### Recommended Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `service.peer.name` | string | Logical name of the remote service being called. **ML-required convention** (see note below). | "account-lookup-service" |
| `network.protocol.version` | string | HTTP protocol version | "1.1", "2" |
| `network.peer.address` | string | Peer address | "10.0.0.5" |
| `network.peer.port` | int | Peer port number | 8080 |
| `http.request.resend_count` | int | Ordinal number of request resend attempt | 2 |

> **Note on `service.peer.name`:** This attribute has experimental (Development) status in OTel and is elevated to a Mojaloop convention because identifying the logical target service is essential for Mojaloop observability. It replaces the deprecated `peer.service` attribute, but its OTel status may change in future releases.

### Example (Success)
```json
{
  "level": "INFO",
  "message": "Outgoing request to Account Lookup",
  "attributes": {
    "http.request.method": "GET",
    "url.full": "http://als.mojaloop.io/participants/123",
    "server.address": "als.mojaloop.io",
    "server.port": 80,
    "http.response.status_code": 200,
    "service.peer.name": "account-lookup",
    "http.client.request.duration": 0.120
  }
}
```

### Example (Error)
```json
{
  "level": "ERROR",
  "message": "Outgoing request to Account Lookup failed",
  "attributes": {
    "http.request.method": "GET",
    "url.full": "http://als.mojaloop.io/participants/123",
    "server.address": "als.mojaloop.io",
    "server.port": 80,
    "error.type": "ECONNREFUSED",
    "service.peer.name": "account-lookup",
    "http.client.request.duration": 5.001
  }
}
```


### Logs example:
```bash
2026-03-09T16:59:40.352Z - info: [<-- 200] POST http://mock-hub:7777/greenbank/fxQuotes  [0.001 s]: -   {"attributes":{"http.client.request.duration":0.001,"http.request.method":"POST","http.response.status_code":200,"server.address":"mock-hub","server.port":7777,"url.full":"http://mock-hub:7777/greenbank/fxQuotes"},"component":"sendBaseRequest","context":"CSSh"}
```

## error.type Values

The `error.type` attribute identifies what caused a request to fail. Use this resolution order:

1. **HTTP status code as string** — for HTTP-level errors (e.g., `"500"`, `"503"`)
2. **Exception/error class name** — for connection or runtime errors (e.g., `"ECONNREFUSED"`, `"TimeoutError"`)
3. **Stable low-cardinality identifier** — descriptive code (e.g., `"timeout"`, `"circuit_open"`)
4. **`"UnknownError"`** — fallback when no specific type can be determined

> **Note:** OTel uses `_OTHER` as the fallback value. Mojaloop uses `"UnknownError"` instead, consistent with the [Error Handling Standard](./error_handling.md). This is an intentional divergence.
