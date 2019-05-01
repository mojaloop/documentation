# Mojaloop Roadmap

## Mojaloop Roadmap

### Functional Epics

* Event Logging Framework: Support operational reporting and auditing of processing
* Error Handling Framework: Consistent reporting in line with specification and support operational auditing
* API Gateway: Provide role, policy-based access, security, abstraction, throttling & control, identity management
* Endpoints for P2P, Merchant: Provide endpoints to support P2P and Merchant payments
* Settlements: Complete settlements process to handle failures and reconciliation positions
* Central directory/Account lookup service: Provide native implementation for ALS to confirm the API specification to provide user lookup
* Fraud & Risk Management System: Provide support for a fraud and risk management system
* Forensic Logging: Support forensic logging to support auditing and reporting
* Reporting API: Provide an API for reporting

### Operational Epics

* Testing Framework: Provide a framework for automated regression, functional and other testing to ensure quality 
* Performance Improvements: Provide a framework for automated regression, functional and other testing to ensure quality 
* ELK framework & logging: Provide framework or dashboards for Operational support, Debugging and Resolving issues 
* DevOps: Provide flexibility, dynamism in deployments, improve monitoring and reliability mechanisms
* Rules Engine: Provide a framework to enforce, implement Business, Scheme rules

### Non-Functional Epics

* Deprecate Postgres: Avoid usage of multiple databases to improve supportability and maintenance and move to MySQL
* Security & Threat Modeling: Address security vulnerabilities, issues and provide a report on status of the System's security so that they can be addressed
* Documentation: Update documentation to support adoption by community, for labs, deployment by various partners
* API-Led Design: Refactor central services so that schema validation, paths can be addressed thoroughly \(automatically\) and decrease maintenance, development effort \(for those services don't already follow this\)
* API-led connectivity is a methodical way to connect data to applications through reusable and purposeful APIs.

### Detailed Roadmap Items - \(Exported from StoriesOnBoard\)

| Activity | Task | Subtask | Subtask description | Status | Estimation | Release | Personas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| High Level Topics - Blue,   Epics - Yellow, Releases - Orange. Stories - Green. | Designs/Whitepapers - Pink . Workshops - purple. Not in Scope   / needs clarity - Gray | ? A third release with focus on Security, Auditing,   Operational readiness | Includes features/functionality   missing from PI5 and PI6 | Todo |  |  | Useful Resources |
| High Level Topics - Blue,   Epics - Yellow, Releases - Orange. Stories - Green. | Designs/Whitepapers - Pink . Workshops - purple. Not in Scope   / needs clarity - Gray | Release 5.0.0 - First version after the MVP with critical bug   fixes and key features | First version after the MVP with   critical bug fixes and features focusing on functionality needed with inputs   from early adopters | Todo |  | PI-5 | Useful Resources |
| High Level Topics - Blue,   Epics - Yellow, Releases - Orange. Stories - Green. | Designs/Whitepapers - Pink . Workshops - purple. Not in Scope   / needs clarity - Gray | Release 6.0.0 - A second release after the MVP with key   features, streamlined deployment, on-boarding and monitoring capabilities |  | Todo |  | PI-6 | Useful Resources |
| NFR: DFSP Handler   Provisioning | The Switch system scales when    on-boarding FSPs | Design provisioning & management of FSP onboarding | Description:          End state: | Ready |  | PI-5 | Hub Tech Ops     Hub Operator     DFSP System Integrators     DFSP |
| NFR: DFSP Handler   Provisioning | The Switch system scales when    on-boarding FSPs | Identify Approaches & Technologies for Management &   Balancing of FSPs PoC |  | Ready |  | PI-5 | Hub Tech Ops     Hub Operator     DFSP System Integrators     DFSP |
| NFR: DFSP Handler   Provisioning | The Switch system scales when    on-boarding FSPs | PoC for Management & Balancing of FSPs on Test Handlers to   determine the best approach |  | Ready |  | PI-5 | Hub Tech Ops     Hub Operator     DFSP System Integrators     DFSP |
| NFR: DFSP Handler   Provisioning | The Switch system scales when    on-boarding FSPs | Assess Performance capabilities, impact of the PoC |  | Todo |  | PI-5 | Hub Tech Ops     Hub Operator     DFSP System Integrators     DFSP |
| NFR: DFSP Handler   Provisioning | The Switch system scales when    on-boarding FSPs | Management & Balancing of FSPs for High-Availability and   On-boarding for non-FSP Specific    Handlers |  | Ready |  | PI-6 | Hub Tech Ops     Hub Operator     DFSP System Integrators     DFSP |
| NFR: DFSP Handler   Provisioning | The Switch system scales when    on-boarding FSPs | Management & Balancing of FSPs for High-Availability and   On-boarding for FSP Specific Handlers |  | Ready |  | PI-6 | Hub Tech Ops     Hub Operator     DFSP System Integrators     DFSP |
| NFR: DFSP Handler   Provisioning | The Switch system scales when    on-boarding FSPs | QA, testing - validation |  | Ready |  | PI-6 | Hub Tech Ops     Hub Operator     DFSP System Integrators     DFSP |
| NFR: API Gateway | Gateway, Developer Portal | Access control policies |  | Todo |  |  | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | Apply validation controls at the API Gateway level |  | Todo |  |  | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | Confirm the technology for API Gateway, Developer Portal | Confirm that WSO2 is the way to   go or if there's a better alternative \(better suited for Open Source\) | Todo |  | PI-5 | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | Design solution with WSO2 API Gateway | **Security**:     1. Inbound rules     1. Outbound rules     1. Headers validation     1. Throttling | Todo |  | PI-5 | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | Setup API Gateway using WSO2 - Infrastructure |  | Ready |  | PI-5 | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | Integration with Switch services \(ml-api-adapter\) |  | Ready |  | PI-5 | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | Provide Authentication |  | Todo |  | PI-6 | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | Developer Portal \(FSPs, Hub Operator\) |  | Ready |  | PI-6 | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | Developer on-boarding |  | Todo |  | PI-6 | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: API Gateway | Gateway, Developer Portal | QA, Testing |  | Todo |  | PI-6 | Switch     DFSP     DFSP System Integrators     Hub Customer Care     Hub Operator     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: DevOps, CI/CD | Deployment automation and Lab work | Making existing helm charts more maintainable & manageable |  | Ready |  | PI-5 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | Deployment automation and Lab work | Automate Lab Setup - chooses services \(things like Gateway,   etc\) | Possibly using something like   Terraform, Vagrant | Todo |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | Deployment automation and Lab work | Validate Lab envt setup using a test framework |  | Todo |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | API Gateway is incorporated into the CI/CD pipeline &   deployments are automated | Incorporating the API Gateway into the deployment process |  | Todo |  | PI-5 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | API Gateway is incorporated into the CI/CD pipeline &   deployments are automated | Incorporating the API Gateway into the CI/CD pipeline |  | Todo |  | PI-5 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | API Gateway is incorporated into the CI/CD pipeline &   deployments are automated | Automate deployment of artifacts as part of CI/CD pipeline | Currently the artifacts are   published to dockerhub/npm repos based on the outcome of the testing phases   but the deployment fails as quite a bit of automation is needed.          This involves updating helm charts dynamically, values files and other such   resources. This would tremendously reduce the amount of time involved in   getting out a deployment after a release. Currently we do the deployment   manually \(which is not that bad\) but this can be eliminated. | Ready |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | API Gateway is incorporated into the CI/CD pipeline &   deployments are automated | Integrate Contract, Interface and Functional Tests in CI/CD   Pipeline |  | Ready |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | Monitoring, Management of resources | Enable health checks to report holistically |  | Ready |  | PI-5 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | Monitoring, Management of resources | Support for Zipkin |  | Todo |  | PI-5 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | Monitoring, Management of resources | ELK: Support for Alerts, Notifications |  | Ready |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | Monitoring, Management of resources | Integrating ELK with Event Logging Framework, etc |  | Ready |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: DevOps, CI/CD | Monitoring, Management of resources | ELK Dashboards for KPIs, etc |  | Ready |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care |
| NFR: Quality Assurance,   Testing | Testing, QA | Standardized simulator \(mock FSPs\) to support automated   testing | 1. Simulators that dynamically   generate conditions, fulfilments etc as part of the end-to-end proccess     1. Include error end-points \(addressed in another item\)     1. Perform validations     1. Rework the simulator to generate the end-points based on the Swagger \(to   easily validate\): API first approach | Ready |  | PI-5 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Testing, QA | Automated Functional Tests - document coverage |  | Ready |  | PI-5 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Testing, QA | Periodic comprehensive functional testing on deployments |  | Todo |  | PI-5 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Testing, QA | Automated Integration Tests |  | Ready |  | PI-6 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Testing, QA | Automated Contract Tests | Contract - meaning the API   Specification itself.          Automated tests to ensure the Switch adheres to the API/Swagger   specification, example, headers, schema, etc          This ensures the users of the System that the implementation conforms to   the API Specification. | Ready |  | PI-6 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Testing, QA | Update Automated Contract, Integration, Functional Tests |  | Ready |  | PI-6 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | QA, Bug Fixes | QA, Bug Fixes |  | Ready |  |  | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | QA, Bug Fixes | Bug Fixes, QA |  | Ready |  | PI-5 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | QA, Bug Fixes | QA, Bug Fixes |  | Ready |  | PI-6 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Performance Testing, Baselining | Performance testing & Improvements |  | Ready |  |  | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Performance Testing, Baselining | Performance testing baselining after addition of new features,   frameworks | Towards the end of the PI/Sprint | Ready |  | PI-5 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Performance Testing, Baselining | Automated Performance Tests |  | Ready |  | PI-6 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| NFR: Quality Assurance,   Testing | Performance Testing, Baselining | Regular Performance testing as part of CI/CD |  | Ready |  | PI-6 | Switch     BMGF     Hub Tech Ops     Hub Security, Risk and Compliance Team |
| FR: Settlement Management | Settlements Management | Enhance Alerts and Notifications |  | Ready |  | PI-5 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Settlements Management | Follow-up items to be confirmed after the OSS Settlements API   is drafted |  | Todo |  | PI-5 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Settlements Management | Handle failed acknowledgements for Settlements |  | Ready | 8.00 | PI-6 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Settlements Management | Settlement Reconciliation Reports |  | Ready |  | PI-6 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Reporting API for FSP Consumption | Identification of Framework for reporting |  | Todo |  | PI-5 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Reporting API for FSP Consumption | Identify data sets that can be queried - Transactions |  | Ready |  | PI-5 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Reporting API for FSP Consumption | Settlements reporting format decisions |  | Todo |  | PI-5 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Reporting API for FSP Consumption | Identify data sets that can be queried - Transfers |  | Ready |  | PI-6 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Reporting API for FSP Consumption | Standardize query API |  | Ready |  | PI-6 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Reporting API for FSP Consumption | Implementation of reporting functionality |  | Todo |  | PI-6 | DFSP     Switch     Hub Operator     Hub Finance Team |
| FR: Settlement Management | Reporting API for FSP Consumption | QA, testing |  | Todo |  | PI-6 | DFSP     Switch     Hub Operator     Hub Finance Team |
| NFR: Implementation Topology   Guidelines | Deployment Topology Guidelines | Scaling guidelines for deployment |  | Todo |  |  | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Deployment Topology Guidelines | Guidelines for optimal performance |  | Todo |  |  | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Deployment Topology Guidelines | HA guidelines for deployment |  | Todo |  |  | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Deployment Topology Guidelines | Recommended deployment topologies |  | Todo |  | PI-5 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Deployment Topology Guidelines | Security guidelines for implementation, deployment |  | Todo |  | PI-5 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Deployment Topology Guidelines | Documentation - clarity, remove ambiguity. Review |  | Todo |  | PI-5 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Deployment Topology Guidelines | Guidelines for cloud/on-prem providers |  | Todo |  | PI-6 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Workshops | Workshops for Hub Operators |  | Todo |  | PI-5 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Workshops | Workshops for OSS contributors |  | Todo |  | PI-5 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Workshops | Workshops for FSP and System Integrators |  | Todo |  | PI-6 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Workshops | Workshops for OSS contributors    - 2 |  | Todo |  | PI-6 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Implementation Topology   Guidelines | Workshops | Workshops for Hub Operators - 2 |  | Todo |  | PI-6 | Switch     DFSP System Integrators     Hub Tech Ops |
| NFR: Event Logging | Event Logging Framework | Central processing of events and raising alerts/alarms/errors | Extend existing   functionality          **Interesting Events that need to be produced/captured**:     1. Up/down events for services,      1. Threshold on number of occurrences     1. Dashboards - Thresholds - CPU utilization, Disk space, configurable     1. Error events in services     1. Infrastructure events \(Up/Down\).     1. Connectivity events \(Connect/Disconnect\)     1. General service events \(started, halted, etc\)     1. Mojaloop errors based on the specification          **Business**:     1. Thresholds     1. Limits \(NDC\)     1. Position events     1. Settlement events \(settling, window closure, etc\)          **Things to take care of**:     1. Mode of notifications     1. Separation of Technical and Commercial/Financial/Business related   information - access to logs to be restricted From Ops     1. Duration of persistence of logs, etc \(especially commercial/business   data\) - comply with guidelines/ standards.     1. HA events and assess reliability - How do we measure the uptime of the   system and availability | Todo |  |  | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Event Logging Framework | Recommended usage of the      alerting system |  | Todo |  |  | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Event Logging Framework | Design event logging Framework | Framework for producing &   capturing Event logs that can be used for monitoring           **Interesting Events that need to be produced/captured**:     - Up/down events for services,      - Threshold on number of occurrences     - Dashboards - Thresholds - CPU utilization, Disk space, configurable     - Error events in services     - Infrastructure events \(Up/Down\).     - Connectivity events \(Connect/Disconnect\)     - General service events \(started, halted, etc\)     - Mojaloop errors based on the specification          **Business**:     - Thresholds     - Limits \(NDC\)     - Position events     - Settlement events \(settling, window closure, etc\)          **Things to take care of**:     - Mode of notifications     - Separation of Technical and Commercial/Financial/Business related   information - access to logs to be restricted From Ops     - Duration of persistence of logs, etc \(especially commercial/business   data\) - comply with guidelines/ standards.     - HA events and assess reliability - How do we measure the uptime of the   system and availability | Todo |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Event Logging Framework | Implement Common Library for events |  | Ready | 15.00 | PI-6 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Event Logging Framework | Implementation for producing & capturing Event logs that   can be used for monitoring | Framework for producing &   capturing Event logs that can be used for monitoring           **Interesting Events that need to be produced/captured**:     1. Up/down events for services,      1. Threshold on number of occurrences     1. Dashboards - Thresholds - CPU utilization, Disk space,   configurable     1. Error events in services     1. Infrastructure events \(Up/Down\).     1. Connectivity events \(Connect/Disconnect\)     1. General service events \(started, halted, etc\)     1. Mojaloop errors based on the specification          **Business**:     1. Thresholds     1. Limits \(NDC\)     1. Position events     1. Settlement events \(settling, window closure, etc\)          **Things to take care of**:     1. Mode of notifications     1. Separation of Technical and Commercial/Financial/Business related   information - access to logs to be restricted From Ops     1. Duration of persistence of logs, etc \(especially commercial/business   data\) - comply with guidelines/ standards.     1. HA events and assess reliability - How do we measure the uptime of the   system and availability | Ready | 8.00 | PI-6 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Event Logging Framework | Testing the common library, framework for producing, capturing   events |  | Todo |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Dashboards for Monitoring | Logging standards, implement & standardize |  | Ready |  | PI-5 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Dashboards for Monitoring | Changes to logging to enhance traceability |  | Ready |  | PI-5 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Dashboards for Monitoring | Design and identify dashboards needed for monitoring |  | Todo |  | PI-5 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Dashboards for Monitoring | Operational Dashboards for monitoring specific events   end-to-end |  | Todo |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Dashboards for Monitoring | Operational Dashboards for monitoring alerts/alarms/errors |  | Todo |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Event Logging | Dashboards for Monitoring | Testing various dashboards |  | Todo |  | PI-6 | Switch     Hub Tech Ops     Hub Customer Care     Hub Security, Risk and Compliance Team     Hub Operator |
| NFR: Error Handling | Implementing error endpoints | Design solution for supporting error endpoints for transfers |  | Todo |  | PI-5 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Implementing error endpoints | Implement support for error endpoints for transfers |  | Todo |  | PI-5 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Implementing error endpoints | Updating simulators to support error endpoints |  | Todo |  | PI-5 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Implementing error endpoints | Support for endpoints for other resources |  | Todo |  | PI-5 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Implementing error endpoints | Enhance notification mechanism to handle notification issues,   perform retries | Retries according to   configuration that can be set | Todo |  | PI-6 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Error Handling Framework | Publish an event to be consumed by the event framework |  | Ready |  |  | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Error Handling Framework | Design an error handling framework for a standardized way of   returning results of execution |  | Todo |  | PI-5 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Error Handling Framework | Design error mapping for the error handling framework |  | Todo |  | PI-6 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Error Handling Framework | Common library for error framework |  | Ready |  | PI-6 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| NFR: Error Handling | Error Handling Framework | Implement the error handling framework |  | Ready |  | PI-6 | Hub Tech Ops     Switch     DFSP     DFSP System Integrators     Hub Customer Care |
| FR: Bulk Payments | Bulk Payments Design | Design for Bulk Payments: version - 1, based on the ML Spec |  | Ready |  | PI-5 | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Bulk Payments | Bulk Payments Design | Design for Bulk Payments: version - 2 |  | Ready |  | PI-5 | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Bulk Payments | Bulk Payments Design | Finalize design for Bulk Payments |  | Todo |  | PI-6 | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Bulk Payments | Bulk Payments Implementation | Implementing resources: bulkTransfers |  | Todo |  |  | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Bulk Payments | Bulk Payments Implementation | Bulk payments error handling |  | Todo |  |  | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Bulk Payments | Bulk Payments Implementation | Testing Bulk Payments |  | Todo |  |  | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Bulk Payments | Bulk Payments Implementation | Implementing resources for bulk look-up, etc |  | Todo |  | PI-5 | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Bulk Payments | Bulk Payments Implementation | Implementing resources: bulkQuotes |  | Todo |  | PI-6 | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Bulk Payments | Bulk Payments Implementation | Implementing resources: bulkTransfers - PoC |  | Ready |  | PI-6 | DFSP     Switch     DFSP System Integrators     Identity Oracles |
| FR: Forensic Logging | Forensic Logging | Migrate central-kms from scala to node and associated DB to   the selected type |  | Ready |  |  | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Forensic Logging | Forensic Logging | Revisit/review Forensic Logging Architecture |  | Ready |  | PI-5 | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Forensic Logging | Forensic Logging | Migrate from postgres to selected persistent store   \(mysql/kafka\) |  | Ready |  | PI-5 | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Forensic Logging | Forensic Logging | Sidecars to periodically validate the connected services |  | Todo |  | PI-6 | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Forensic Logging | Forensic Logging | Ensure algorithm and encryption functionality work as expected |  | Ready |  | PI-6 | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Forensic Logging | Auditing | Define/gather auditing requirements |  | Todo |  | PI-5 | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Forensic Logging | Auditing | Implement auditing events or logging capabilities in   components |  | Todo |  | PI-6 | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Forensic Logging | Auditing | Use for auditing \(test by generating reports\) |  | Ready |  | PI-6 | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Forensic Logging | Auditing | Integration with Event Handling / ELK ? |  | Ready |  | PI-6 | DFSP     Hub Security, Risk and Compliance Team     Hub Tech Ops |
| FR: Central Directory   \(account lookup\) | central directory alignment to ML Spec with existing   capabilities | Design solution for integration with current services |  | Ready |  | PI-5 | DFSP     DFSP System Integrators     Switch     Identity Oracles |
| FR: Central Directory   \(account lookup\) | central directory alignment to ML Spec with existing   capabilities | Migrate code from Mowali and replace the existing legacy code |  | Ready |  | PI-5 | DFSP     DFSP System Integrators     Switch     Identity Oracles |
| FR: Central Directory   \(account lookup\) | central directory alignment to ML Spec with existing   capabilities | QA, testing for lookup, integration with overall use cases |  | Todo |  | PI-5 | DFSP     DFSP System Integrators     Switch     Identity Oracles |
| FR: Central Directory   \(account lookup\) | Extend Central directory capabilities to support Merchant   registries, multiple identifiers | Support for multiple identifiers? |  | Todo |  |  | DFSP     DFSP System Integrators     Switch     Identity Oracles |
| FR: Central Directory   \(account lookup\) | Extend Central directory capabilities to support Merchant   registries, multiple identifiers | Design solution for Merchant registries | - As an FSP, I want to know the   FSP that a Merchant belongs to     - As an FSP, I want to register a new Merchant and assign a unique TILL   number     - As a Merchant, I want to be able to request a DFSP to assign me a   Merchant number \(design\)     - As a Switch, I should maintain a record of mapping between FSPs and   Merchant IDs | Todo |  | PI-6 | DFSP     DFSP System Integrators     Switch     Identity Oracles |
| FR: Central Directory   \(account lookup\) | Extend Central directory capabilities to support Merchant   registries, multiple identifiers | Implementing solution for Merchant payments |  | Todo |  | PI-6 | DFSP     DFSP System Integrators     Switch     Identity Oracles |
| FR: Central Directory   \(account lookup\) | Extend Central directory capabilities to support Merchant   registries, multiple identifiers | QA, testing for lookup, integration with overall merchant use   cases |  | Todo |  | PI-6 | DFSP     DFSP System Integrators     Switch     Identity Oracles |
| FR: Merchant "Request to   Pay" | Supporting 'Merchant request to pay' | Design solution and identify pre-requisites for Merchant   payments |  | Todo |  | PI-5 | DFSP     Switch     DFSP System Integrators |
| FR: Merchant "Request to   Pay" | Supporting 'Merchant request to pay' | Implement Resources: transactionRequests, authorizations |  | Ready |  | PI-5 | DFSP     Switch     DFSP System Integrators |
| FR: Merchant "Request to   Pay" | Supporting 'Merchant request to pay' | Implement error endpoints and related functionality |  | Todo |  | PI-5 | DFSP     Switch     DFSP System Integrators |
| FR: Merchant "Request to   Pay" | Supporting 'Merchant request to pay' | 'Merchant request to pay' is supported, released |  | Todo |  | PI-5 | DFSP     Switch     DFSP System Integrators |
| FR: Merchant "Request to   Pay" | Supporting 'Merchant request to pay' | QA, testing on the feature |  | Todo |  | PI-6 | DFSP     Switch     DFSP System Integrators |
| NFR \(new\): Community Support | Supporting community regarding deployment, Mojaloop   Specification | Update documentation to support community |  | Todo |  | PI-5 | BMGF     DFSP     Useful Resources     Hub Operator     Hub Customer Care     DFSP System Integrators |
| NFR \(new\): Community Support | Supporting community regarding deployment, Mojaloop   Specification | Provide support to community requests on deployment |  | Todo |  | PI-5 | BMGF     DFSP     Useful Resources     Hub Operator     Hub Customer Care     DFSP System Integrators |
| NFR \(new\): Community Support | Supporting community regarding deployment, Mojaloop   Specification | Provide support to community requests regarding the Spec |  | Todo |  | PI-5 | BMGF     DFSP     Useful Resources     Hub Operator     Hub Customer Care     DFSP System Integrators |
| NFR \(new\): Community Support | Supporting community regarding deployment, Mojaloop   Specification | Provide an FAQ/Wiki section for deployment and Spec questions |  | Todo |  | PI-6 | BMGF     DFSP     Useful Resources     Hub Operator     Hub Customer Care     DFSP System Integrators |
| Others \(not covered\) /   Hardening \(Cleanup, Refactoring, etc\) | Formalizing the Operations/Admin API | Formalize the Admin/operations API |  | Ready |  | PI-5 |  |
| Others \(not covered\) /   Hardening \(Cleanup, Refactoring, etc\) | Formalizing the Operations/Admin API | Provide features to manage FSPs |  | Ready |  | PI-6 |  |
| Others \(not covered\) /   Hardening \(Cleanup, Refactoring, etc\) | Formalizing the Operations/Admin API | central hub with UI ? |  | Ready |  | PI-6 |  |
| Others \(not covered\) /   Hardening \(Cleanup, Refactoring, etc\) | FRMS | Investigate capabilities & features needed |  | Ready |  | PI-6 |  |
| Others \(not covered\) /   Hardening \(Cleanup, Refactoring, etc\) | FRMS | Prioritizing Rules/Policies to implement |  | Ready |  | PI-6 |  |
| Others \(not covered\) /   Hardening \(Cleanup, Refactoring, etc\) | Refactoring: API Led Design, Implementation for central   services | Designing all central services to support API Led Design |  | Ready |  | PI-5 |  |
| Others \(not covered\) /   Hardening \(Cleanup, Refactoring, etc\) | Refactoring: API Led Design, Implementation for central   services | Refactoring for ml-api-adapter |  | Ready |  | PI-6 |  |
| Others \(not covered\) /   Hardening \(Cleanup, Refactoring, etc\) | Refactoring: API Led Design, Implementation for central   services | Refactoring for central services |  | Ready |  | PI-6 |  |
| Security |  |  |  |  |  |  | Hub Security, Risk and Compliance   Team     DFSP     Switch |
| Cross currency | Account Lookup Service | Change in Currency | ALS naming convention for   routing - if moving from MSISDN only     Identify currency and impact to Standard Transfers | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Cross currency | Quotation | Regulatory Data | KYC Data     Need to clarify - including understanding Multi Currency     What data needs to be passed - via DFSPs and through CCP     How is that data passed and validated? Impact on timeouts     Rules and Design | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Cross currency | Quotation | FX Rate Management |  | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Cross currency | Quotation | Fees consolidation | How are fees passed along the   chain?     Not already in the quote          Is there a need for transparency? If not how and where are all the fees   calculated and brought to common currency? | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Cross currency | Transfer | Limit Management | Velocity Rules for sender and   receiver     Regulatory data required to confirm | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Cross currency | Transfer | Sequencing of Position management and fund movement | As now 4 \(+\) positions affected   control financial risk | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Cross currency | Transfer | Rollback | How does it work - design | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Cross currency | Transfer | Timeout |  | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Cross currency | Settlement | Reporting of Transfer | Managing the trail of the hops   for the CCP and regulatory for Send and Receive | Todo |  | PI-5 | DFSP     Identity Oracles     Hub Finance Team |
| Documentation |  |  |  |  |  |  | BMGF     DFSP     Useful Resources |
| FRMS |  |  |  |  |  |  | Hub Security, Risk and Compliance   Team     DFSP |
| Lab for FSPs, deployment tools |  |  |  |  |  |  | BMGF |
| Cross-network payments |  |  |  |  |  |  |  |
| Payment Hub |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |

## Beyond Phase 3

Below is a list of larger initiatives and epics by area that will help to further develop the Mojaloop project. Some of these have been entered as epics or stories, but most are still in the "concept" phase.

### Functional Epics

* Native Implementation P2P: Implementation of resources to support Payee initiated and other Use Cases from the Specification, along with supporting P2P Use case completely
* Native Implementation Payee: Implementation of resources to support Payee initiated transactions and ones that involve OTPs
* Bulk Payments: Design & Implementation of resources to support Bulk Payments

### Central Services

* Directory Interoperability
* Multi-currency and schemes
* Enforcing Currency configurations
* Fees: UI for configuring fees
* Increase performance 
* Fraud Scores and Reasons
* Role management
* DSP Management
* Stopping/Pausing a DFSP
* boarding protocol

### DFSP/Account Management

* Agent Network
* NFCC identity merchant
* Persistent merchant ID
* Onboarding protocol
* Change password
* Password requirements
* Hold/Restart account

### Security

* Central certificate service
* Implement fee quote transfer service in the center
* Prevent user guessing from rogue DFSPs
* Preferred authorizations

### Market Deployment

* Integration with major mobile money vendors in Africa \(PDP initiative\)

### CI/CD & Testing

* Implement auto deployment to test environment
* Automatically run acceptance tests in test environment as part of build/deploy
* Automate bulk import tests
* Forensic log test
* Account management test
