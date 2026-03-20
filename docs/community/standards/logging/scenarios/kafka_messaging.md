# Kafka Messaging Logging Standard

## Overview
This standard defines the required span attributes and logging practices for Kafka producer and consumer operations. It aligns with [OpenTelemetry Messaging Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/messaging/) and covers trace context propagation, batch vs single-message attribute differences, and error handling.

## Producer Operations

When a service produces a message to a Kafka topic, a `PRODUCER` span must be created with the attributes below.

### Span Naming

Span name format: `SEND:{topicName}`

Example: `SEND:topic-transfer-prepare`

### Required Span Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `server.address` | string | Kafka broker address (host or IP, without port)  | `"kafka"` |
| `server.port` | int | Kafka broker port | `9092` |
| `messaging.system` | string | Messaging system identifier | `"kafka"` |
| `messaging.destination.name` | string | Kafka topic name | `"topic-transfer-prepare"` |
| `messaging.operation.name` | string | Operation type | `"send"` |
| `messaging.client.id` | string | Kafka client identifier | `"ml-api-adapter"` |

### Conditionally Required Attributes

Include these when the value is available (non-null):

| Field Name | Type | Condition | Example |
|------------|------|-----------|---------|
| `messaging.destination.partition.id` | string | When partition is explicitly specified | `"0"` |
| `messaging.kafka.message.key` | string | When message key is provided | `"transferId-abc-123"` |

### Error Attributes

When the produce operation fails, these attributes must be set on the span:

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `error.type` | string | Error code, name, or `"UnknownError"` | `"ERR_BROKER_NOT_AVAILABLE"` |

Additionally:
- Span status must be set to `ERROR`
- The exception must be recorded on the span via `span.recordException(err)`

### Trace Context Injection

The producer must inject W3C Trace Context headers into the Kafka message headers before sending. The following headers are injected:

| Header | Purpose |
|--------|---------|
| `traceparent` | W3C Trace Context trace-parent header |
| `tracestate` | W3C Trace Context trace-state header |
| `baggage` | W3C Baggage header |

These headers enable the consumer to continue the distributed trace started by the producer. See [Trace Context](../trace_context.md) for general propagation rules.

### Example (Success)

```json
{
  "span.name": "SEND:topic-transfer-prepare",
  "span.kind": "PRODUCER",
  "span.status": "OK",
  "server.address": "kafka:9092", 
  "messaging.system": "kafka",
  "messaging.destination.name": "topic-transfer-prepare",
  "messaging.operation.name": "send",
  "messaging.client.id": "ml-api-adapter",
  "messaging.destination.partition.id": "0",
  "messaging.kafka.message.key": "transferId-abc-123"
}
```

### Example (Error)

```json
{
  "span.name": "SEND:topic-transfer-prepare",
  "span.kind": "PRODUCER",
  "span.status": "ERROR",
  "server.address": "kafka:9092",   
  "messaging.system": "kafka",
  "messaging.destination.name": "topic-transfer-prepare",
  "messaging.operation.name": "send",
  "messaging.client.id": "ml-api-adapter",
  "error.type": "ERR_BROKER_NOT_AVAILABLE"
}
```

### Logs Example
```bash
2026-03-06T11:15:21.623Z - verbose: [msg =>>] producing is done:  - {"attributes":{"messaging.client.id":"default-client","messaging.destination.name":"test","messaging.kafka.message.key":"1234","messaging.operation.name":"send","messaging.system":"kafka","server.address":"localhost:9092"},"context":"ml-kafka","offset":1,"topicConf":{"key":"[REDACTED]","topicName":"test"}}
```    

---

## Consumer Operations

When a service consumes messages from a Kafka topic, a `CONSUMER` span must be created with the attributes below.

### Span Naming

Span name format: `RECEIVE:{topicName}`

Example: `RECEIVE:topic-transfer-prepare`

### Required Span Attributes

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `server.address` | string | Kafka broker address | `"kafka:9092"` |
| `messaging.system` | string | Messaging system identifier | `"kafka"` |
| `messaging.destination.name` | string | Kafka topic name | `"topic-transfer-prepare"` |
| `messaging.operation.name` | string | Operation type | `"receive"` |
| `messaging.client.id` | string | Kafka client identifier | `"ml-api-adapter"` |
| `messaging.consumer.group.name` | string | Consumer group name | `"ml-api-adapter-group"` |

### Conditionally Required Attributes

These attributes differ based on whether a single message or a batch is being processed. See [Batch vs Single Message Attributes](#batch-vs-single-message-attributes) below.

### Error Attributes

Same as producer -- see [Producer Error Attributes](#error-attributes) above.

### Trace Context Extraction

The consumer must extract W3C Trace Context headers from the first message in the payload to establish the parent span context:

| Header | Purpose |
|--------|---------|
| `traceparent` | Establishes parent-child relationship with the producer span |
| `tracestate` | Preserves vendor-specific trace data |
| `baggage` | Propagates application-defined key-value pairs |

**Multi-message batches:** Only the first message's `traceparent` establishes the parent context. Additional messages with distinct `traceparent` values are added as **span links**, preserving the association without creating a parent-child relationship. See [Trace Context](../trace_context.md) for general propagation rules.

### Example (Single Message)

```json
{
  "span.name": "RECEIVE:topic-transfer-prepare",
  "span.kind": "CONSUMER",
  "span.status": "OK",
  "server.address": "kafka:9092",   
  "messaging.system": "kafka",
  "messaging.destination.name": "topic-transfer-prepare",
  "messaging.operation.name": "receive",
  "messaging.client.id": "ml-api-adapter",
  "messaging.consumer.group.name": "ml-api-adapter-group",
  "messaging.destination.partition.id": "0",
  "messaging.kafka.offset": 42,
  "messaging.kafka.message.key": "transferId-abc-123"
}
```

### Example (Batch)

```json
{
  "span.name": "RECEIVE:topic-transfer-prepare",
  "span.kind": "CONSUMER",
  "span.status": "OK",
  "server.address": "kafka:9092",  
  "messaging.system": "kafka",
  "messaging.destination.name": "topic-transfer-prepare",
  "messaging.operation.name": "receive",
  "messaging.client.id": "ml-api-adapter",
  "messaging.consumer.group.name": "ml-api-adapter-group",
  "messaging.batch.message_count": 5
}
```

### Example (Error)

```json
{
  "span.name": "RECEIVE:topic-transfer-prepare",
  "span.kind": "CONSUMER",
  "span.status": "ERROR",
  "server.address": "kafka:9092",  
  "messaging.system": "kafka",
  "messaging.destination.name": "topic-transfer-prepare",
  "messaging.operation.name": "receive",
  "messaging.client.id": "ml-api-adapter",
  "messaging.consumer.group.name": "ml-api-adapter-group",
  "messaging.destination.partition.id": "0",
  "messaging.kafka.offset": 42,
  "error.type": "ValidationError"
}
```

### Logs Example
```bash
2026-03-06T09:33:05.717Z - info: [<#> msg] message processing end  [durationSec: 1.003,  batchId: p0.42-p0.42] -        {"context":"ml-kafka"}
2026-03-06T09:33:07.535Z - verbose: kafka span attributes:  -   {"attributes":{"messaging.client.id":"quotes-handler-post_c","messaging.consumer.group.name":"group-quotes-handler-post","messaging.destination.name":"topic-quotes-post","messaging.destination.partition.id":"0","messaging.kafka.offset":43,"messaging.operation.name":"receive","messaging.system":"kafka","server.address":"kafka:29092"},"context":"ml-kafka"}
2026-03-06T09:33:07.535Z - info: [=>> msg] message processing start  [batchSize: 1,  batchId: p0.43-p0.43]... - {"context":"ml-kafka"}
```

## Batch vs Single Message Attributes

The consumer span attributes differ depending on whether a single message or a batch of messages is being processed.

### Single Message (payload length = 1)

When exactly one message is consumed, include per-message attributes:

| Field Name | Type | Condition | Example |
|------------|------|-----------|---------|
| `messaging.destination.partition.id` | string | When partition is available | `"0"` |
| `messaging.kafka.offset` | number | When offset is available | `42` |
| `messaging.kafka.message.key` | string | When message key is available | `"transferId-abc-123"` |

### Batch (payload length > 1)

When multiple messages are consumed, include the batch count instead:

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `messaging.batch.message_count` | number | Number of messages in the batch | `5` |

> **Rationale:** Per-message attributes (partition, offset, key) are not meaningful when multiple messages are processed as a unit. The batch count provides the relevant cardinality information. Individual messages with distinct trace contexts are linked via span links rather than attributes.

## Log Level Guidelines

For detailed definitions of log levels, refer to the [Log Levels Standard](../log_levels.md).

### Kafka-Specific Log Level Mapping

| Level | When to Use | Example |
|-------|-------------|---------|
| **ERROR** | Consumer or producer failures; unrecoverable Kafka errors | `"Producer failed to send message to topic-transfer-prepare: ERR_BROKER_NOT_AVAILABLE"` |
| **WARN** | Broker disconnection, consumer group rebalancing, retry-able failures | `"Kafka broker disconnected, attempting reconnect"` |
| **INFO** | Consumer group joined, producer connected, major lifecycle events | `"Consumer group ml-api-adapter-group joined, assigned 4 partitions"` |
| **VERBOSE** | Span attributes diagnostic logging; routine health checks | `"kafka span attributes: { messaging.system: 'kafka', ... }"` |
| **DEBUG** | Individual message processing details; message content inspection | `"Processing message from topic-transfer-prepare partition 0 offset 42"` |

### Examples

```javascript
// ERROR - Producer failure
logger.error('Producer failed to send message to topic-transfer-prepare: ERR_BROKER_NOT_AVAILABLE', {
  attributes: {
    'messaging.system': 'kafka',
    'messaging.destination.name': 'topic-transfer-prepare',
    'error.type': 'ERR_BROKER_NOT_AVAILABLE'
  }
});

// WARN - Broker disconnection
logger.warn('Kafka broker disconnected, attempting reconnect', {
  attributes: {
    'server.address': 'kafka:9092',
    'messaging.client.id': 'ml-api-adapter'
  }
});

// INFO - Consumer group joined
logger.info('Consumer group ml-api-adapter-group joined, assigned 4 partitions', {
  attributes: {
    'messaging.consumer.group.name': 'ml-api-adapter-group',
    'messaging.system': 'kafka',
    partitionCount: 4
  }
});

// VERBOSE - Span attributes diagnostic (as implemented in central-services-stream)
logger.verbose('kafka span attributes: ', { attributes: spanAttrs });

// DEBUG - Individual message processing
logger.debug('Processing message from topic-transfer-prepare partition 0 offset 42', {
  attributes: {
    'messaging.destination.name': 'topic-transfer-prepare',
    'messaging.destination.partition.id': '0',
    'messaging.kafka.offset': 42
  }
});
```

## Error Handling in Spans

When a Kafka operation (produce or consume) fails, the span must capture the error with the following steps:

1. **Set span status** to `ERROR`:
   ```javascript
   span.setStatus({ code: SpanStatusCode.ERROR })
   ```
2. **Record the exception** on the span:
   ```javascript
   span.recordException(err)
   ```
3. **Set `error.type` attribute** with the error classification:
   ```javascript
   span.setAttribute('error.type', err?.code || err?.name || 'UnknownError')
   ```

The error type resolution order (`err.code` -> `err.name` -> `'UnknownError'`) ensures that:
- Node.js system errors use their code (e.g., `ECONNREFUSED`, `ERR_BROKER_NOT_AVAILABLE`)
- Application errors use their class name (e.g., `ValidationError`, `TimeoutError`)
- Unknown errors get a fallback classification

See [Error Handling Standard](./error_handling.md) for general error logging rules.

## Mojaloop-Specific Considerations

### Automatic Span Creation in `central-services-stream`

The `@mojaloop/central-services-stream` library (Mojaloop's Kafka wrapper) handles OTel span creation automatically for both producers and consumers. Services using this library do **not** need to manually:

- Create producer/consumer spans
- Inject or extract trace context headers
- Set span attributes from the tables above
- Handle span status on success/error

The library's `startProducerTracingSpan()` and `startConsumerTracingSpan()` functions manage all of this.

**When to add custom attributes:** If service-specific context is needed beyond the standard messaging attributes (e.g., `transferId`, `payerFsp`), add them to the active span manually:

```javascript
const { trace } = require('@opentelemetry/api')

// Inside a consumer handler (span is already active)
const activeSpan = trace.getActiveSpan()
if (activeSpan) {
  activeSpan.setAttribute('transfer.id', transferId)
  activeSpan.setAttribute('payer.fspId', payerFsp)
}
```

### Disabling Automatic Spans

If a service needs to manage spans manually, set `disableOtelSpanAutoCreation: true` in the consumer/producer configuration. When disabled, the service is responsible for implementing all the attributes and error handling described in this document.

### `otelSpanPerMessage` Mode

When `otelSpanPerMessage: true` is set on a consumer, the library creates a separate span for each message in a batch (instead of one span for the entire batch). This changes the callback signature to receive a single message and enables fail-fast behavior -- if any message handler throws, remaining messages in the batch are skipped.

### Diagnostic Logging

The library logs span attributes at `VERBOSE` level for diagnostic purposes:
```javascript
logger.verbose('kafka span attributes: ', { attributes: spanAttrs })
```

### `LOG_LEVEL_KAFKA`

The `central-services-stream` library runs its own logger (`ml-kafka` context), separate from the service's application logger. The `LOG_LEVEL_KAFKA` environment variable controls this logger's level independently. It defaults to `info`. Set it to `verbose` or `debug` in staging to trace span attributes and message flow without changing the service's log level. Valid values: `error`, `warn`, `info`, `verbose`, `debug`, `silly`.

## Review Checklist

- Are all required span attributes (`messaging.system`, `messaging.destination.name`, `messaging.operation.name`) set on every Kafka span?
- Is `messaging.consumer.group.name` included on all consumer spans?
- Is `error.type` set on spans when operations fail, with the resolution order `err.code` -> `err.name` -> `"UnknownError"`?
- Are W3C Trace Context headers (`traceparent`, `tracestate`, `baggage`) being injected into producer message headers?
- Are W3C Trace Context headers being extracted from consumer message headers to establish parent context?
- For batches with multiple distinct `traceparent` values, are additional trace contexts added as span links (not parent contexts)?
- Are batch spans using `messaging.batch.message_count` instead of per-message attributes?
- Are single-message spans including `messaging.destination.partition.id`, `messaging.kafka.offset`, and `messaging.kafka.message.key` when available?
- Is `disableOtelSpanAutoCreation` documented if the service manages spans manually?
