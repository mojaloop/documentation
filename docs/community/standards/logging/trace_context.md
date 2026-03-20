# Trace Context Propagation

This document describes how distributed tracing context is propagated through logs to enable correlation across microservices.


## Manual Otel Context Usage

When using **OpenTelemetry auto-instrumentation** for `winston` logging library, `trace_id` and `span_id` are injected in all logs automatically, so we need to add Otel span attributes only.

OpenTelemetry API Span is WRITE-ONLY - no getAttribute() method exists. The API is for instrumentation (writing), not reading.
To read span attributes, we'll need SDK's ReadableSpan.  But in this case we can’t use auto-instrumentation approach (no code changes, just pass needed env vars).
Because of that the proposed solution is to implement OTel logging inside common wrappers: for outgoing http requests, Hapi logging plugin (for incoming requests), ML Kafka stream lib and DB lib (Knex wrapper), and reuse those wrappers across all services.

```javascript
const otel = require('@opentelemetry/semantic-conventions')

/** @returns OTelAttributes */
const outgoingRequestAttributesDto = ({
  method, url, durationSec, statusCode, errorType, peerService
}) => ({
  attributes: {
    [otel.ATTR_HTTP_REQUEST_METHOD]: method,
    [otel.ATTR_URL_FULL]: url,
    [otel.METRIC_HTTP_CLIENT_REQUEST_DURATION]: durationSec,
    ...(statusCode && { [otel.ATTR_HTTP_RESPONSE_STATUS_CODE]: statusCode }),
    ...(errorType && { [otel.ATTR_ERROR_TYPE]: errorType }),
    ...(peerService && { [otel.ATTR_SERVICE_PEER_NAME]: peerService })
    // peerService - logical service name, must be explicitly provided by caller (not derived from URL hostname)
    //               think if we should extract it for internal http://... calls from url hostname
  }
})

// Usage in http wrapper for outgoing requests:
const axios = require('axios')
const { outgoingRequestAttributesDto } = require('./otelDto')
// ...
const sendBaseRequest = async (reqOptions) => {
  const { method, url } = reqOptions
  const methodUrl = `${method?.toUpperCase()} ${url}`
  const startTime = Date.now()

  let statusCode
  let errorType

  try {
    // ...
    const response = await axios(reqOptions)
    statusCode = response?.status
    
    return response
  } catch (error) {
    statusCode = error.response?.status
    errorType = error.code
    // ...
  } finally {
    const durationSec = (Date.now() - startTime) / 1000
    log.info(`[<-- ${statusCode || errorType || ''}] ${methodUrl}  [${durationSec} s]:`, outgoingRequestAttributesDto({
      method,
      url,
      statusCode,
      durationSec,
      errorType,
      peerService
    }))
  }
}
```

## Benefits of Trace Context in Logs

1. **Cross-service correlation**: Find all logs related to a single request across multiple services
2. **Trace-to-log navigation**: Jump from trace spans to related logs in observability tools
3. **Root cause analysis**: See exact sequence of events leading to errors
4. **Performance debugging**: Correlate slow traces with detailed logs
