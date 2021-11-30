# Mojaloop Roadmap

### Functional Epics

* API Gateway: Provide role, policy-based access, security, abstraction, throttling & control, identity management
* Settlements V2: Complete settlements process to handle failures and reconciliation positions
* PISP: Payment Initiation Service Provider enhancements
* LPS Adapter Enhancements and future Use Cases (ATM, POS)
* Event Logging Framework: Support operational reporting and auditing of processing
* Error Handling Framework: Consistent reporting in line with specification and support operational auditing
* Endpoints for P2P, Merchant: Provide endpoints to support P2P and Merchant payments
* Fraud & Risk Management System: Provide support for a fraud and risk management system
* Forensic Logging: Support forensic logging to support auditing and reporting
* Reporting API: Provide an API for reporting


### Operational Epics

* Versioning Standards
* Operational Moniitoring and Event Dashboards
* Mojaloop Sandbox and Toolkits
* DevOps: Provide flexibility, dynamism in deployments, improve monitoring and reliability mechanisms
* Rules Engine: Provide a framework to enforce, implement Business, Scheme rules

### Non-Functional Epics

* Security & Threat Modeling: Address security vulnerabilities, issues and provide a report on status of the System's security so that they can be addressed
* Documentation: Update documentation to support adoption by community, for labs, deployment by various partners
* API-Led Design: Refactor central services so that schema validation, paths can be addressed thoroughly \(automatically\) and decrease maintenance, development effort \(for those services don't already follow this\)
* API-led connectivity is a methodical way to connect data to applications through reusable and purposeful APIs.

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

### CI/CD & Testing

* Implement auto deployment to test environment
* Automatically run acceptance tests in test environment as part of build/deploy
* Automate bulk import tests
* Forensic log test
* Account management test
