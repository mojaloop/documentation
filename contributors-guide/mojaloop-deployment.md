# Mojaloop Deployment
The document is intended for an audience with a stable technical knowledge and would like to setup an environment for development, testing and contributing to the Mojaloop project.

## Deployment and Setup Introduction

This document will provide guidelines to deploy and configure the Mojaloop applications on a local environment, utilizing Kubernetes within Docker.

  * [Software List](mojaloop-deployment.md#1-software-list)
    * [Deployment Recommendations](mojaloop-deployment.md#11-deployment-recommendations)
  * [Local Deployment and Testing Tools](mojaloop-deployment.md#2-local-deployment-and-testing-tools)
    * [MAC environment](mojaloop-deployment.md#21-mac-environment)
    * [LINUX environment](mojaloop-deployment.md#21-linux-environment)
  * [Errors On Setup](mojaloop-deployment.md#3-errors-on-setup)
  
## 1 Software List

Before proceeding, please have a look at [Deployment Recommendations](mojaloop-deployment.md#11-deployment-recommendations) to insure the minimum resource requirements are available.


### 1.1 Deployment Recommendations

This provides environment resource recommendations with a view of the infrastructure architecture.

**Resources Requirements:**

* Control Plane \(i.e. Master Node\)
  ```https request
  [https://kubernetes.io/docs/setup/cluster-large/\#size-of-master-and-master-components](https://kubernetes.io/docs/setup/cluster-large/#size-of-master-and-master-components)
  ```

  * 3x Master Nodes for future node scaling and HA \(High Availability\)

* ETCd Plane:
  ```https request
  [https://coreos.com/etcd/docs/latest/op-guide/hardware.html](https://coreos.com/etcd/docs/latest/op-guide/hardware.html)
  ```

  * 3x ETCd nodes for HA \(High Availability\)

* Compute Plane \(i.e. Worker Node\):

  TBC once load testing has been concluded. However the current general \*recommended size:

  * 3x Worker nodes, each being:
    * 4x vCPUs, 16GB of RAM, and 40gb storage

  \*Note that this would also depend on your underlying infrastructure, and it does NOT include requirements for persistent volumes/storage.

![Mojaloop Deployment Recommendations - Infrastructure Architecture](../assets/Diagrams/Kubernetes/KubeInfrastructureArch.svg)

### 2 Local Deployment and Testing Tools

##### 2.1. MAC environment
  For Mac, please follow the [Environment Setup Mac](environment-setup-mac.md) document.

##### 2.1. LINUX environment
  For Linux, please follow the [Environment Setup Linux](environment-setup-linux.md) document.

### 3 Errors On Setup

* \`central-ledger’s server IP address could not be found.

  ERR\_NAME\_NOT\_RESOLVED\`

  Resolved by:

  * Verify that a helm chart\(s\) was installed by executing

    ```bash
    helm list
    ```

    If the helm charts are not listed, see the [Helm Chart Installation](mojaloop-deployment.md#221-helm-chart-installation) section to install a chart.
