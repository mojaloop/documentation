# Upgrade Commands

This document provides commands to upgrade existing Mojaloop installations. It assumes that Mojaloop is already installed using Helm.

## Table of Contents

- [Upgrade Commands](#upgrade-commands)
  - [Table of Contents](#table-of-contents)
  - [Upgrade to v17.0.0](#upgrade-to-v17.0.0)
  - [Upgrade to v18.0.0](#upgrade-to-v18.0.0)

       
## Upgrade to v17.0.0

1. Upgrade the backend dependencies
```bash
helm upgrade backend mojaloop/example-mojaloop-backend --namespace ${NAMESPACE} --version v17.0.0 -f ${VALUES_FILE}
```
2. Install the mojaloop services
```bash
helm install moja mojaloop/mojaloop --namespace ${NAMESPACE} --version v17.0.0 -f ${VALUES_FILE}
```

## Upgrade to v18.0.0
