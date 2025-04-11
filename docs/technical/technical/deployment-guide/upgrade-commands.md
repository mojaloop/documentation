# Upgrade Commands

This document provides commands to upgrade existing Mojaloop installations. It assumes that Mojaloop is already installed using Helm.

## Table of Contents

- [Upgrade Commands](#upgrade-commands)
  - [Table of Contents](#table-of-contents)
  - [Upgrade to v17.0.0](#upgrade-to-v17.0.0)
    - [Testing the upgrade scenario from v16.0.0 to v17.0.0](#testing-the-upgrade-scenario-from-v16.0.0-to-v17.0.0)


       
## Upgrade to v17.0.0

1. Upgrade the backend dependencies
```bash
helm upgrade backend mojaloop/example-mojaloop-backend --namespace ${NAMESPACE} --version v17.0.0 -f ${VALUES_FILE}
```
2. Install the mojaloop services
```bash
helm install moja mojaloop/mojaloop --namespace ${NAMESPACE} --version v17.0.0 -f ${VALUES_FILE}
```

### Testing the upgrade scenario from v16.0.0 to v17.0.0

1. Install backend dependencies v16.0.0 with persistence enabled (need to create databases manually since the initDb scripts will not run)
```bash
helm --namespace ${NAMESPACE} install ${RELEASE} mojaloop/example-mojaloop-backend --version 16.0.0  -f ${VALUES_FILE}
```
2. Install the mojaloop services v16.0.0 and run tests to create data in databases
```bash
helm --namespace ${NAMESPACE} install ${RELEASE} mojaloop/mojaloop --version 16.0.0  -f ${VALUES_FILE}
```
3. Uninstall the mojaloop services
```bash
helm delete ${RELEASE} --namespace ${NAMESPACE}
```
4. Upgrade the backend dependencies to v17.0.0 (This will upgrade mysql/Kafka/MongoDB versions)
```bash
helm --namespace ${NAMESPACE} upgrade ${RELEASE} mojaloop/example-mojaloop-backend --version 17.0.0  -f ${VALUES_FILE}
```
5. Install the mojaloop services v17.0.0 (This will run the knex migrations to upgrade the database schemas)
```bash
helm --namespace ${NAMESPACE} install ${RELEASE} mojaloop/mojaloop --version 17.0.0  -f ${VALUES_FILE}
```
6. Run the GP Tests
```bash
helm test ${RELEASE} --namespace=${NAMESPACE} --logs
```

