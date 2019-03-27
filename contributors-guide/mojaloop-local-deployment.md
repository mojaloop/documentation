# Mojaloop Deployment
The document is intended for an audience with a stable technical knowledge and would like to setup an environment for development, testing and contributing to the Mojaloop project.

## Deployment and Setup Introduction

This document will provide guidelines to deploy and configure the Mojaloop applications on a local environment, utilizing Kubernetes within Docker.

  * [Software List](mojaloop-local-deployment.md#1-software-list)
    * [Deployment Recommendations](mojaloop-local-deployment.md#11-deployment-recommendations)
  * [Local Deployment and Testing Tools](mojaloop-local-deployment.md#2-local-deployment-and-testing-tools)
    * [MAC environment](mojaloop-local-deployment.md#21-mac-environment)
    * [LINUX environment](mojaloop-local-deployment.md#21-linux-environment)
  * [Kubernetes Dashboard](mojaloop-local-deployment.md#3-kubernetes-dashboard)
  * [Helm](mojaloop-local-deployment.md#4-helm)
    * [Helm configuration](mojaloop-local-deployment.md#41-helm-configuration)
  * [Postman](mojaloop-local-deployment.md#5-postman)
    * [Installing Postman](mojaloop-local-deployment.md#51-installing-postman)
    * [Setup Postman](mojaloop-local-deployment.md#52-setup-postman)
  * [Errors On Setup](mojaloop-local-deployment.md#6-errors-on-setup)
  
## 1 Software List

Before proceeding, please have a look at [Deployment Recommendations](mojaloop-local-deployment.md#11-deployment-recommendations) to insure the minimum resource requirements are available.


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
  For Mac, please follow the [Mojaloop Local Setup Mac](mojaloop-local-setup-mac.md) document.

##### 2.1. LINUX environment
  For Linux, please follow the [Mojaloop Local Setup Linux](mojaloop-local-setup-linux.md) document.

#### 3 Kubernetes Dashboard:

1  Install Kubernetes Dashboard roles, services & deployment.

   **Note** Linux only - If you have installed MicroK8s, you only need to enable the dashboard before starting the proxy.
   ```bash
   microk8s.enable dashboard
   ```
   Remember to prefix all **kubectl** commands with **microk8s** if you opted not to create an alias.

2. Alternative (not required if you have already enabled the dashboard) install for Dashboard using Helm: [kubernetes-dashboard](https://github.com/helm/charts/tree/master/stable/kubernetes-dashboard)\)

   **IMPORTANT:** Always verify current [kubernetes-dashboard](https://github.com/kubernetes/dashboard) yaml file for the below create command.
   ```bash
   kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
   ```

3. Verify Kubernetes Dashboard;
   ```bash
   kubectl get pod --namespace=kube-system |grep dashboard
   ```

4. Start proxy for local UI in new terminal;
   ```bash
   kubectl proxy ui
   ```

5. Open URI in default browser
   ```bash
   http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/
   ```

   Select **Token**. Generate a token to use there by:
   ```bash
   kubectl -n kube-system get secrets | grep dashboard-token
   ```

   The token to use is shown on the last line of the output of that command.
   ```bash
   kubectl -n kube-system describe secrets/kubernetes-dashboard-token-btbwf
   ```

   The **{kubernetes-dashboard-token-btbwf}** is retrieved from the output in the previous step. For more information on generating the token, follow the **Authentication** link in the window.

![kubernetes-dashboard](../assets/Diagrams/Kubernetes/kubernetesdashboard.png)

### 4 Helm 

Please review [Mojaloop Helm Chart](../repositories/helm.md) to understand the relationships between the deployed Mojaloop helm charts.

#### 4.1 Helm configuration

1. Config Helm CLI and install Helm Tiller on K8s cluster;
   ```bash
   helm init
   ```

2. Validate Helm Tiller is up and running;
   ```bash
   kubectl -n kube-system get po | grep tiller
   ```

3. Add mojaloop repo to your Helm config \(optional\). Linux use with sudo;
   ```bash
   helm repo add mojaloop http://mojaloop.io/helm/repo/
   ```

4. Add the incubator. This is needed to resolve Helm Chart dependencies required by Mojaloop charts. Linux use with sudo;;
   ```bash
   helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
   ```

5. Update helm repositories. Linux use with sudo;
   ```bash
   helm repo update
   ```

6. Install nginx-ingress for load balancing & external access. Linux use with sudo;
   ```bash
   helm --namespace kube-public install stable/nginx-ingress
   ```

7. Update your /ect/hosts;
   ```bash
   nano /etc/hosts
   ```
   
   add to below config;
   ```text
   127.0.0.1       interop-switch.local central-kms.local forensic-logging-sidecar.local central-ledger.local central-end-user-registry.local central-directory.local central-hub.local central-settlements.local ml-api-adapter.local
   ```

8. Test system health in your browser after installation. This will only work if you have an active helm chart deployment running.
   ml-api-adapter health test
   ```https request
   http://test-ml-api-adapter.mojaloop.live/health
   ```

   central-ledger health test
   ```http request
   http://test-central-ledger.mojaloop.live/health
   ```

### 5 Postman

Postman is used to send requests and receive responses.

#### 5.1 Installing Postman

Please, follow these instructions: [Get Postman](https://www.getpostman.com/postman)

#### 5.2 Setup Postman

1. Download this file [https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman_collection.json](https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman_collection.json)
2. Open **Postman**
3. Click **Import** and then **Import File**
4. Select the _Mojaloop.postman\_collection.json_ file you downloaded
5. You'll now need to import environment variables. For local testing, download this file [https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman_environment.json](https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman_environment.json)
6. Click **Import** and then **Import File**
7. Select the _MojaloopLocal.postman\_environment.json_ file you downloaded
8. In the imported collection, navigate to the _central_ledger_ directory  


### 6 Errors On Setup

* \`central-ledger’s server IP address could not be found.

  ERR\_NAME\_NOT\_RESOLVED\`

  Resolved by:

  * Verify that a helm chart\(s\) was installed by executing

    ```bash
    helm list
    ```

    If the helm charts are not listed, see the [Helm Chart Installation](mojaloop-local-deployment.md#221-helm-chart-installation) section to install a chart.
