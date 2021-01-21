# Reference Implementation

> Reference implementations are standard, and guidelines as applied on the Mojaloop standard API. The target audience is architects, DevOps teams, security engineering, QA teams and Developers.


## 1. Architectural Implementations
- 1. [Signature Standard](https://docs.mojaloop.io/mojaloop-specification/documents/Signature.html)
- 2. [Encryption Standard](https://docs.mojaloop.io/mojaloop-specification/documents/Encryption.html)
- 3. [Interledger Cryptographic interlock](https://docs.mojaloop.io/mojaloop-specification/documents/API%20Definition%20v1.0.html#4-interledger-protocol)
- 4. [Secure PISP Account Linking](https://github.com/mojaloop/pisp/tree/master/docs/linking)
- 5. [Certificate Management (MCM)](https://github.com/modusbox/connection-manager-api)

## 2. Code level security measures 
- 1. Open Source Vulnerability Management
    - i. [`npm`](https://github.com/modusbox/connection-manager-api) + `npm-audit-resolver`
    - ii. [GitHub/Dependabot](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/)
- 2. Open Source License Management - NPM Audit, [license-scanner](https://github.com/mojaloop/license-scanner)
- 3. Static Code Analysis – SonarQube _in progress, details coming soon_
- 4. Container Security
    - i. [Anchore-cli](https://github.com/mojaloop/ci-config#container-scanning)
    <!-- - ii.	AppArmor -->
<!-- - e) Kubernetes Security - in progress -->