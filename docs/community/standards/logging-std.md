# Mojaloop Logging Standard

**Version:** 1.0.0

## Purpose

This document defines the logging standard for Mojaloop projects to ensure:
- **Consistent log levels** across all services
- **OpenTelemetry compatibility** for unified observability
- **Distributed tracing integration** via trace context propagation
- **Actionable logs** in production environments
- **Efficient debugging** without log noise
- **Performance optimization** through appropriate log levels
- **Security** by preventing sensitive data exposure

## Standard Components

The standard is broken down into the following sections:

*   [Log Levels](./logging/log_levels.md) - Definitions, OTel mapping, and decision trees.
*   [Data Model](./logging/data_model.md) - JSON structure, required fields, and naming conventions.
*   [Trace Context](./logging/trace_context.md) - Propagation and correlation rules.
*   [Security](./logging/security.md) - PII and sensitive data handling.
*   [Best Practices](./logging/best_practices.md) - Performance, anti-patterns, and implementation guidelines.

## Quick Reference Summary

| Level | OTel Severity | Production | Use Case | Example |
|-------|---------------|-----------|----------|---------|
| FATAL | 21-24 | ✅ Always | Service outage | DB unreachable, panic |
| ERROR | 17-20 | ✅ Always | Operation failures | Transaction failed |
| WARN  | 13-16 | ✅ Always | Recoverable issues | Validation failure, retry |
| INFO  | 9-12  | ✅ Always | Business events | Transfer completed |
| VERBOSE | 7-8   | ⚠️ Sampled| Operational noise | Health check, keep-alive |
| DEBUG | 5-6   | ⚠️ Temporarily | Troubleshooting | Function calls, logic |
| TRACE | 1-4   | ❌ Rarely | Deep diagnosis | Variable state, loop dump |


**Default production setting: INFO level (SeverityNumber >= 9)**
- Captures all important business events
- Minimizes performance impact
- Reduces log noise
- Can be changed to DEBUG temporarily for troubleshooting
- Compatible with OpenTelemetry severity filtering

## Extended Scenarios

Specific standards for common scenarios are available in the specific standards documents:

*   [HTTP Requests](./logging/scenarios/http_requests.md) - Standard for incoming and outgoing HTTP logging.
*   [Error Handling](./logging/scenarios/error_handling.md) - Rules for logging exceptions and propagating errors.
*   [Database Queries](./logging/scenarios/sql_queries.md) - Guidelines for logging SQL and DB interactions.
*   [Kafka Messaging](./logging/scenarios/kafka_messaging.md) - Guidelines for producing and consuming Kafka messages.
