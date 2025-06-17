# Mojaloop Repository Update Sequence

This document provides guidance on the order in which Mojaloop NodeJS repositories should be updated when releasing new features and/or maintaining Mojaloop. This is important to ensure that each of the services part of a Mojaloop Release use the correct Mojaloop repository dependency. This is the update as of Mojaloop RC v17; as Mojaloop evolves, this needs to be updated with new components (and clean up components that are removed).

## Table of Contents

- [NodeJS Repository Update Sequence](#nodejs-repository-update-sequence)
  - [Table of Contents](#table-of-contents)
  - [Repository Categories](#repository-categories)
  - [Update Process](#update-process)
  - [Testing Requirements](#testing-requirements)
  - [Mojaloop Repo Sequence](#mojaloop-repo-sequence)

## Repository Categories

The following are the categories of Mojaloop NodeJS repositories:

1. **Central Services libraries**
   - `central-services-shared`
   - `central-services-error-handling`
   - `central-services-database`
   - `central-services-stream`
   - `central-services-metrics`
   - `central-services-error`
   - `central-services-logger`
   - `sdk-standard-components`

2. **Core Services**
   - `account-lookup-service`
   - `quoting-service`
   - `central-ledger`
   - `central-settlement`
   - `central-bulk-transfers`
   - `transaction-requests-service`
   - `ml-api-adapter`

3. **Event Components**
   - `central-event-processor`
   - `event-framework`
   - `event-stream-processor`
   - `elastic-apm-node`
   - `elastic-apm-node-opentracing`
   - `email-notifier`
   - `event-sidecar`

4. **Adapters, SDK and API**
   - `sdk-scheme-adapter`
   - `event-sdk`
   - `thirdparty-sdk`
   - `bulk-api-adapter`
   - `thirdparty-api-svc`
   - `als-consent-oracle`
   - `als-oracle-pathfinder`

5. **Testing**
   - `ml-testing-toolkit`
   - `ml-testing-toolkit-client-lib`
   - `ml-testing-toolkit-ui`
   - `ml-testing-toolkit-shared-lib`
   - `mojaloop-simulator`
   - `simulator`

6. **Other libraries**
   - `api-snippets`
   - `auth-service`
   - `ml-number`
   - `object-store-lib`
   - `inter-scheme-proxy-cache-lib`
   - `database-lib`

## Update Process

1. **Identify Dependencies**
   - Use `npm audit` to identify vulnerabilities
   - Review `package.json` files for outdated dependencies
   - Check for breaking changes in major version updates

2. **Create Update Plan**
   - Document all repositories that need updates
   - Identify potential breaking changes
   - Plan testing strategy for each component

3. **Execute Updates**
   - Start with core libraries
   - Update one repository at a time
   - Run tests after each update
   - Document any issues or workarounds

4. **Integration Testing**
   - Test updated components together
   - Verify end-to-end functionality
   - Check for performance impacts (roadmap, post v17)

## Testing Requirements

For each repository, follow the testing instructions at README and run:

1. **Unit Tests**
   - Run existing test suite
   - Add new tests for updated functionality
   - Verify test coverage

2. **Integration Tests**
   - Test with dependent services
   - Verify API compatibility
   - Check event handling

3. **End-to-End Tests**
   - Run through Mojaloop testing toolkit
   - Verify transaction flows
   - Test error scenarios


## Mojaloop Repo Sequence

The following table provides a detailed view of Mojaloop repositories and their dependencies. This information is crucial for understanding the correct order of updates when addressing dependency changes or vulnerabilities.

| Sequence | Repo | Dependencies |
|---|---|---|
| 1 | api-snippets |  |
| 2 | ml-number |  |
| 3 | database-lib |  |
| 4 | central-services-logger |  |
| 5 | central-services-metrics |  |
| 6 | central-services-error-handling |  |
| 7 | ml-testing-toolkit-shared-lib |  |
| 8 | logging-bc-public-types-lib |  |
| 9 | platform-shared-lib-messaging-types-lib |  |
| 10 | elastic-apm-node |  |
| 11 | elastic-apm-node-opentracing |  |
| 12 | object-store-libp | central-services-logger |
| 13 | central-services-stream |  |
| 14 | central-services-health | central-services-error-handling, central-services-logger |
| 15 | event-sdk | central-services-stream, central-services-logger, central-services-stream |
| 16 | inter-scheme-proxy-cache-lib | central-services-logger, central-services-shared, inter-scheme-proxy-cache-lib, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 17 | ml-schema-transformer-lib | central-services-error-handling, central-services-logger, central-services-shared, sdk-standard-components, ml-schema-transformer-lib |
| 18 | sdk-standard-components |  |
| 19 | central-services-shared |  |
| 20 | platform-shared-lib-nodejs-kafka-client-lib |  |
| 21 | logging-bc-client-lib |  |
| 22 | **account-lookup-service** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, database-lib, event-sdk, inter-scheme-proxy-cache-lib, sdk-standard-components, sdk-standard-components, central-services-logger, central-services-shared, central-services-stream |
| 23 | **als-consent-oracle** | api-snippets, central-services-health, central-services-shared, sdk-standard-components, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 24 | **als-oracle-pathfinder** | central-services-logger, central-services-shared |
| 25 | **auth-service** | api-snippets, central-services-health, central-services-shared, event-sdk, sdk-standard-components, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 26 | **bulk-api-adapter** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk, object-store-lib |
| 27 | **central-event-processor** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk |
| 28 | **central-ledger** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, database-lib, event-sdk, inter-scheme-proxy-cache-lib, ml-number, object-store-lib |
| 29 | **central-settlement** | central-ledger, central-services-database, central-services-error-handling, central-services-health, central-services-logger, central-services-shared, central-services-stream, event-sdk, ml-number |
| 30 | **email-notifier** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk |
| 31 | **event-sidecar** | central-services-logger, central-services-metrics, central-services-stream, event-sdk |
| 32 | **event-stream-processor** | central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, elastic-apm-node, elastic-apm-node-opentracing, event-sdk |
| 33 | **mojaloop-simulator** | central-services-logger |
| 34 | **ml-api-adapter** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk, sdk-standard-components, database-lib, inter-scheme-proxy-cache-lib |
| 35 | **ml-testing-toolkit** | central-services-logger, central-services-metrics, ml-schema-transformer-lib, ml-testing-toolkit-shared-lib, sdk-standard-components |
| 36 | **ml-testing-toolkit-client-lib** | central-services-logger, ml-testing-toolkit-shared-lib, sdk-standard-components |
| 37 | **ml-testing-toolkit-ui** | ml-testing-toolkit-shared-lib |
| 38 | **quoting-service** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk, inter-scheme-proxy-cache-lib, ml-number, sdk-standard-components |
| 39 | **simulator** (legacy, ALS oracle) | central-services-error-handling, central-services-logger, central-services-metrics, central-services-shared, event-sdk, sdk-standard-components |
| 40 | **sdk-scheme-adapter** | api-snippets, central-services-error-handling, central-services-logger, central-services-metrics, central-services-shared, event-sdk, sdk-standard-components |
| 41 | **thirdparty-api-svc** | api-snippets, central-services-shared, central-services-stream, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 42 | **thirdparty-sdk** | api-snippets, central-services-error-handling, central-services-metrics, central-services-shared, sdk-scheme-adapter, sdk-standard-components |
| 43 | **transaction-requests-service** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, event-sdk, ml-testing-toolkit-shared-lib |

### Update Sequence Visualization

The following diagram illustrates the recommended update sequence for Mojaloop repositories, taking into account their dependencies and relationships:

![Repository Update Sequence](./assets/diagrams/repositoryUpdate/repository-update-sequence.svg)

This diagram provides a visual representation of the update sequence, showing:
1. The logical grouping of repositories
2. Dependencies between different groups
3. Special cases like circular dependencies
4. Parallel update possibilities
5. Different types of dependencies to consider 