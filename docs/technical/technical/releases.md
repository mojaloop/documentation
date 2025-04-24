# Mojaloop Release Process

The Mojaloop Release process follows a community led approach, specifically technical work-stream led, in collaboration and consultation with the Product Council and the Design Authority (DA).

The DA frames the policies, guidelines and technical criteria for the releases (such as quality metrics) while Product defines the feature and product requirements where such aspects are involved. This is executed by the relevant workstream(s).

## 1. Mojaloop Release process
![YM8f9iPhGU1jAfr-dQUk4e34QMGPG1ZWnbmC4ERGpsqp70GJH2he2Nje4poq_dii642B82j-Cj-2-HuYTkEF4poIBg8rJSfWYagBVOMyt6PQs5_P2YRE9magU_jE](https://github.com/mojaloop/design-authority-project/assets/10507686/075e528c-d4b2-4100-a2b9-6d06d77155d0)

Community event (PI level planning), workstreams, features, release quality, testing, checklist, release candidate, example epic, Release

The Mojaloop Release process follows a
- community led approach
- specifically technical work-stream led
- in collaboration and consultation with the Product Council and
- the Design Authority (DA)

Criteria, guidelines:
The DA frames policies, guidelines and technical criteria for the releases while Product defines the feature and product requirements
Example releases notes, criteria for v17.0.0, [v17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

Testing continues after the release is made as well and daily cron jobs run to test, until the next release is made, to ensure stability.

**Current tasks and acceptance criteria for Mojaloop (helm) releases**:

Example story: [3122](https://github.com/mojaloop/project/issues/3122) , [3847](https://github.com/mojaloop/project/issues/3847)

The decisions on what features to include, which ones will be ready and included are not included as they happen during planning stages (and based on deliverables)

- [x] Ensure all core services and services included in release follow standards for
  - [x] Dependabot alerts
  - [x] License files
  - [x] License headers in source files
  - [x] Snyk alerts
  - [x] codeowners files
  - [x] Branch protection rules on main branches verified
  - [x] Review open issues
  - [x] Review open pull requests
  - [x] Review audit exceptions provided and clear / minimize the list
- [x] Update manifests for "release Pull Request (PR)" GH actions WF
- [x] Validate the PR released and the process
- [x] Deploy default values with RC on AWS moja* environment 
  - [x] Validate GP collection works with 100%
  - [x] Validate FX, inter-scheme tests works with 100%
- [x] Deploy, validate RC on a second environment
  - [x] Validate GP collection works with 100%
  - [x] Validate FX, inter-scheme tests works with 100%
- [x] Identify issues with QA Scripts if any - fix them and retest 
- [x] QA for bugs, regressions, log them 
- [x] Fix bugs logged if critical 
- [x] Validate with TTK GP collection 
- [x] Test on-us configuration option (deploy time change) and verify on-us tests pass
- [x] TTK test-cases repo Release is published 
- [x] Release notes for helm RC is drafted
  - [x] Guidance for migration from Release (may have to be a separate story if sufficiently big / complex)
- [x] Update release notes with Upgrade Strategy Guide link
- [x] Helm Release is published 
- [x] Deployment of released Helm on a dev envirnoment
  - [x] Helm release is deployed on dev successfully
  - [x] Regression testing on dev using TTK collections 
    - [x] GP collection
    - [x] Core Bulk collection
    - [x] Third-party collection
    - [x] SDK Bulk collection
    - [x] SDK R2P collection
    - [x] ISO 20022 mode tests
    - [x] FX collection (or tests)
    - [x] Interscheme test collection
  - [x] Validation using CGS Golden path regression tests 
  - [x] Test upgradability from previous release (v16.0.4 / v16.0.0)
- [x] Deployment of released Helm on a QA environment
  - [x] Helm release is deployed on QA successfully
  - [x] Validation using Golden path regression tests on QA
    - [x] GP collection
    - [x] Core Bulk collection
    - [x] Third-party collection
    - [x] SDK Bulk collection
    - [x]  SDK R2P collection
    - [x] FX collection (or tests)
    - [x] ISO 20022 mode tests
    - [x] Interscheme test collection
- [x] Validate daily cronJobs on dev/qa for GP runs well and Cleanup scripts 
- Validate that we can upgrade from the previous stable release, and this is also to pick up any "gotchas" that may need to be addressed as part of the release, or perhaps release notes need to be updated assuming that it would be up to the upgrader to deal with.


## 2. Mojaloop Release process - proposed updates:

Propose release schedule and timelines

1. Example: Feature freeze for a (major) release before six weeks prior to the next PI kick-off (or community event)
1. Freeze bug fixes (non critical) to be included four weeks prior to release date
1. RC to be validated by at least one downstream implementer such Mini-loop or IaC or Core-test-harness or another implementer
1. Release to move ahead on time if there are no high or medium priority bugs open in RC and validated on a dev environment and one downstream team / implementer
1. Streamline release numbers between various components of the Mojaloop platform, such as the Finance Portal
1. Include performance numbers with details on the setup on which the baselining was performed
1. Resource usage: capture resource footprint for a base release
1. Document support mechanisms for Mojaloop releases

## 3. Mojaloop helm release contents

Mojaloop services that support core functionality for the platform and other key services supporting them, along with tools needed for testing such as simulators

Core Functionality with Configurability
1. Account Lookup
    - Account Lookup Admin
    - Oracles
    - ALS (Account Lookup Service)
2. Quoting
    - Support for persistent/pass-through modes (configurable)
3. Transfers (Clearing)
    - Support for on-us transfers (configurable)
4. Settlement
    - Support for various types, granularity, and frequency
5. Transaction Requests (Request-to-pay functionality)
6. 3PPI Services (Third-Party Provider Interface)
7. API Layer - For parties, quotes, transfers, and transaction requests
8. Notifications
    - ML-API-Adapter
9. Currency Conversion
10. Extended Functionality
    - Central Event Processor
    - Email Notifier (prior to version 15)
    - Traceability and Monitoring Support
    - Instrumentation
11. Auditing
    - Comprehensive auditing capabilities
12. Supporting Services & Tools for Testing
    - ML TTK (Testing Toolkit)
    - ML Simulator
    - SDK-Scheme-Adapters
    - Payment Manager Instances
13. Third-Party Scheme Adapters
    - Integration with third-party schemes
14. Participant Life-Cycle Management
    - Participant Creation
    - Participant Updates
15. Participant Support
    - Simple, Easily Usable Tools for Adopters (Example: [SDK-Scheme-Adapter](https://github.com/mojaloop/sdk-scheme-adapter), [Integration Toolkit](https://github.com/mojaloop/integration-toolkit/tree/main) )
    - Onboarding Functionality and Support

## 4. Mojaloop Platform
1. Primary mojaloop (helm) release and config that supports
    - Core clearing engine including support for Bulk
    - Quoting
    - Account lookup and supporting components
    - Settlement engine
    - API layer
    - Support for request-to-pay (transaction requests)
    - Participant life-cycle management
    - Ref: Mojaloop helm release (example: v15.1.0)
2. PISP / 3PPI functionality
3. API Gateway(s)
    - Provide a secure API layer 
    - Provide Ingress, Egress, IP filtering, firewalls
    - Support security mechanisms: JWS, mTLS
    - Reference: WSO2
4. Security components:
    - HSM where relevant / used
    - Identity & access management
    - Cert management
    - Connection management
5. Finance Portal, Reporting
    - Portals for Hub Operations, Business Operations teams
    - Portals, capabilities for Technical Operations teams
    - Ref: FP v3 based on Business Operations Framework
6. Monitoring Support:
    - Operational support and tracing (example: EFK, Prometheus, Grafana, Loki)
    - IaC uses Grafana, Prometheus and Loki
7. Use IaC as reference, example: https://github.com/mojaloop/iac-modules/releases/tag/v5.7.0 



## Current Releases

> *Note: The versions below are the latest published version for each distinct release artifact provided for reference. Consult the release notes for the respective Helm release to see which versions are included in the [Helm Charts Packaged Release](#helm-charts-packaged-releases) version.*

* Helm: [![Git Releases](https://img.shields.io/github/release/mojaloop/helm.svg?style=flat)](https://github.com/mojaloop/helm/releases)
* Central-Ledger: [![Git Releases](https://img.shields.io/github/release/mojaloop/central-ledger.svg?style=flat)](https://github.com/mojaloop/central-ledger/releases)
* Ml-API-Adapter: [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-api-adapter.svg?style=flat)](https://github.com/mojaloop/ml-api-adapter/releases)
* Account-Lookup-Service: [![Git Releases](https://img.shields.io/github/release/mojaloop/account-lookup-service.svg?style=flat)](https://github.com/mojaloop/account-lookup-service/releases)
* Quoting-Service: [![Git Releases](https://img.shields.io/github/release/mojaloop/quoting-service.svg?style=flat)](https://github.com/mojaloop/quoting-service/releases)
* Transaction-Request-Service: [![Git Releases](https://img.shields.io/github/release/mojaloop/transaction-requests-service.svg?style=flat)](https://github.com/mojaloop/transaction-requests-service/releases)
* Bulk-API-Adapter: [![Git Releases](https://img.shields.io/github/release/mojaloop/bulk-api-adapter.svg?style=flat)](https://github.com/mojaloop/bulk-api-adapter/releases)
* Central-Settlement: [![Git Releases](https://img.shields.io/github/release/mojaloop/central-settlement.svg?style=flat)](https://github.com/mojaloop/central-settlement/releases)
* Central-Event-Processor: [![Git Releases](https://img.shields.io/github/release/mojaloop/central-event-processor.svg?style=flat)](https://github.com/mojaloop/central-event-processor/releases)
* Email-Notifier: [![Git Releases](https://img.shields.io/github/release/mojaloop/email-notifier.svg?style=flat)](https://github.com/mojaloop/email-notifier/releases)
* SDK-Scheme-Adapter: [![Git Releases](https://img.shields.io/github/release/mojaloop/sdk-scheme-adapter.svg?style=flat)](https://github.com/mojaloop/sdk-scheme-adapter/releases)
* Thirdparty-SDK: [![Git Releases](https://img.shields.io/github/release/mojaloop/thirdparty-sdk.svg?style=flat)](https://github.com/mojaloop/thirdparty-sdk/releases)
* Thirdparty-Api-Svc: [![Git Releases](https://img.shields.io/github/release/mojaloop/thirdparty-api-svc.svg?style=flat)](https://github.com/mojaloop/thirdparty-api-svc/releases)
* Auth-Svc: [![Git Releases](https://img.shields.io/github/release/mojaloop/auth-service.svg?style=flat)](https://github.com/mojaloop/auth-service/releases)
* ML-Testing-Toolkit: [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-testing-toolkit.svg?style=flat)](https://github.com/mojaloop/ml-testing-toolkit/releases)
* ML-Testing-Toolkit-Ui: [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-testing-toolkit-ui.svg?style=flat)](https://github.com/mojaloop/ml-testing-toolkit-ui/releases)


## Helm Charts Packaged Releases

 Below are some of the Helm releases made and timelines. Please note that this is not an exhaustive list. For an exhaustive list, please visit the [Helm release page](https://github.com/mojaloop/helm/releases).

| Version | Release Date | Tested | Notes |
| --- | :---: | :---: | --- |
| [15.0.0](https://github.com/mojaloop/helm/releases/tag/v15.0.0) | 2023/03/23 | &check; | PI release |
| [14.1.1](https://github.com/mojaloop/helm/releases/tag/v14.1.1) | 2023/02/20 | &check; | Sprint release |
| [14.1.0](https://github.com/mojaloop/helm/releases/tag/v14.1.0) | 2022/11/23 | &check; | Sprint release |
| [14.0.0](https://github.com/mojaloop/helm/releases/tag/v14.0.0) | 2022/09/12 | &check; | Sprint release |
| [13.1.1](https://github.com/mojaloop/helm/releases/tag/v13.1.1) | 2022/03/30 | &check; | Sprint release |
| [13.1.0](https://github.com/mojaloop/helm/releases/tag/v13.1.0) | 2022/03/14 | &check; | Sprint release |
| [13.0.2](https://github.com/mojaloop/helm/releases/tag/v13.0.2) | 2021/09/17 | &check; | Sprint release |
| [13.0.1](https://github.com/mojaloop/helm/releases/tag/v13.0.1) | 2021/08/05 | &check; | Sprint release |
| [13.0.0](https://github.com/mojaloop/helm/releases/tag/v13.0.0) | 2021/07/02 | &check; | Sprint release |
| [12.0.0](https://github.com/mojaloop/helm/releases/tag/v12.0.0) | 2021/02/26 | &check; | Sprint release |
| [11.0.0](https://github.com/mojaloop/helm/releases/tag/v11.0.0) | 2021/01/07 | &check; | Sprint release |
| [10.4.0](https://github.com/mojaloop/helm/releases/tag/v10.4.0) | 2020/07/03 | &check; | Sprint release |
| [10.1.0](https://github.com/mojaloop/helm/releases/tag/v10.1.0) | 2020/05/15 | &check; | Sprint release |
| [9.2.0](https://github.com/mojaloop/helm/releases/tag/v9.2.0) | 2019/03/04 | &check; | Sprint release |
| [8.8.0](https://github.com/mojaloop/helm/releases/tag/v8.8.0) | 2020/02/12 | &check; | Sprint release |
| [8.7.0](https://github.com/mojaloop/helm/releases/tag/v8.7.0) | 2019/12/12 | &check; | Sprint release |
| [8.4.0](https://github.com/mojaloop/helm/releases/tag/v8.4.0) | 2019/11/12 | &check; | Sprint release |
| [8.1.0](https://github.com/mojaloop/helm/releases/tag/v8.1.0) | 2019/10/08 | &check; | Sprint release |
| [7.4.3](https://github.com/mojaloop/helm/releases/tag/v7.4.3) | 2019/08/30 | &check; | Sprint release |
| [7.4.1](https://github.com/mojaloop/helm/releases/tag/v7.4.1) | 2019/08/23 | &check; | Sprint release |
| [6.3.1](https://github.com/mojaloop/helm/releases/tag/v6.3.1) | 2019/05/31 | &check; | Sprint release |
| [5.5.0](https://github.com/mojaloop/helm/releases/tag/v5.5.0) | 2019/04/02 | - | Sprint release |
| [5.4.2](https://github.com/mojaloop/helm/releases/tag/v5.4.2) | 2019/03/29 | &check; | Sprint release |
| [5.4.1](https://github.com/mojaloop/helm/releases/tag/v5.4.1) | 2019/03/21 | &check; | Sprint release |
| [5.4.0](https://github.com/mojaloop/helm/releases/tag/v5.4.0) | 2019/03/19 | &check; | Sprint release |
| [5.2.0](https://github.com/mojaloop/helm/releases/tag/v5.2.0) | 2019/02/20 | &check; | Sprint release |
| [5.1.3](https://github.com/mojaloop/helm/releases/tag/v5.1.3) | 2019/02/14 | &check; | Sprint release |
| [5.1.2](https://github.com/mojaloop/helm/releases/tag/v5.1.2) | 2019/02/11 | &check; | Sprint release |
| [5.1.1](https://github.com/mojaloop/helm/releases/tag/v5.1.1) | 2019/02/08 | &check; | Sprint release |
| [5.1.0](https://github.com/mojaloop/helm/releases/tag/v5.1.0) | 2019/02/06 | &check; | Sprint release |
| [4.4.1](https://github.com/mojaloop/helm/releases/tag/v4.4.1) | 2019/01/31 | &check; | Released at PI4 Convening in Jan 2019 |
