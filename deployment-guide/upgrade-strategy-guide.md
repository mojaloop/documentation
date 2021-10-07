# Upgrade Strategy Guide

This document provides instructions on how to upgrade existing Mojaloop installations. It assumes that Mojaloop is currently installed using Helm, but these strategies can be applied in general.

## Table of Contents

- [Upgrade Strategy Guide](#upgrade-strategy-guide)
  - [Table of Contents](#table-of-contents)
  - [Helm Upgrades](#helm-upgrades)
    - [Non-breaking Releases](#non-breaking-releases)
    - [Breaking Releases](#breaking-releases)
      - [Mojaloop installed without backend dependencies](#mojaloop-installed-without-backend-dependencies)
      - [Mojaloop installed with backend dependencies](#mojaloop-installed-with-backend-dependencies)

## Helm Upgrades

Recommendations:

1. all upgrades should be tested and verified in a pre-production environment
2. always consult the release notes as there may be some known issues, or useful notes that are applicable when upgrading
3. the [migrate:list command](https://knexjs.org/#Migrations) can be used to list pending datastore changes in the following repositories:
    - <https://github.com/mojaloop/central-ledger>
    - <https://github.com/mojaloop/account-lookup-service>

### Non-breaking Releases

Non-breaking changes will require no additional or special actions (unless otherwise stated in the release notes) to be taken other than running a standard [Helm upgrade](https://helm.sh/docs/helm/helm_upgrade) command.

Be aware of the following optional parameter flag(s) that will be useful when upgrading:

```text
   --reuse-values                 when upgrading, reuse the last release's values and merge in any overrides from the command line via --set and -f. If '--reset-values' is specified, this is ignored
```

It is possible to rollback using the [Helm rollback](https://helm.sh/docs/helm/helm_rollback/) command if desired.

### Breaking Releases

There are several strategies that can be employed when upgrading between breaking releases depending on the following deployment topologies:

1. Mojaloop installed without backend dependencies (e.g. Kafka, MySQL, MongoDB, etc), with backend dependencies managed separately. This is preferred and will provide the most flexibility in upgrading, especially when there are breaking changes

2. Mojaloop installed with backend dependencies, with backend dependencies tightly coupled to the Helm installation

#### Mojaloop installed without backend dependencies

This is the preferred deployment topology as it will provide the most flexibility when upgrading. By separating out the backend dependencies, it will enable one to deploy the target version of Mojaloop as a new deployment.

This new deployment can either point to the existing backend dependencies or will require new backend dependencies depending on the following:

1. Target version has no datastore breaking changes

   In this scenario, we can utilise a Canary style deployment strategy by configuring the new deployment to the existing backend dependencies. The new deployment will by default upgrade the datastore schemas as required by running the `migration` (see [Central-ledger](https://github.com/mojaloop/central-ledger/tree/master/migrations), [Account-lookup-service](https://github.com/mojaloop/account-lookup-service/tree/master/migrations)) scripts. Alternatively, the migration scripts can be disabled (e.g. [central-ledger](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml#L147), with Account-lookup-service similarly being configured) if required, and a manual upgrade SQL script can be prepared (see [migrate:list command](https://knexjs.org/#Migrations) to list pending changes) if preferred.

   There should be no disruption to the current Mojaloop deployment.

   As the backend dependencies are shared between the current and target deployments, it will also be possible to move a sub-set of users to the target Mojaloop deployment allowing for one to validate the new deployment with minimal impact, and also provide the ability for users to easily switch back to the current deployment.

2. Target version has datastore breaking changes

   See [Mojaloop installed with backend dependencies](#mojaloop-installed-with-backend-dependencies).

#### Mojaloop installed with backend dependencies

In this scenario, we can utilise a Blue-green style deployment strategy by deploying new backend dependencies, and deploying the target Mojaloop release separately (with the additional benefit of aligning your deployment to the recommending deployment topology).

Manual data migrating from the existing datastores to the new target backend dependencies will be required. It will also be necessary to keep the current and new datastores in sync as long as live transactions are being processed through the existing Mojaloop deployment. A maintenance window need to be scheduled to stop "live" transaction on the current deployment to ensure data consistency, and allow for the switch-over to occur safely. This will cause a disruption, but can be somewhat mitigated by ensuring that the maintenance window is scheduled during the least busiest time.
