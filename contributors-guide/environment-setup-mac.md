# Mojaloop local environment setup for Mac
The document is intended for an audience with a stable technical knowledge and would like to setup an environment for development, testing and contributing to the Mojaloop project.

## Deployment and Setup Introduction

This document will provide guidelines to deploy and configure the Mojaloop applications on a local environment, utilizing Kubernetes within Docker.

* [Local Deployment](environment-setup-mac.md#local-deployment)
  * [Kubernetes](environment-setup-mac.md#1-kubernetes)
    * [Kubernetes Installation with Docker](environment-setup-mac.md#11-kubernetes-installation-with-docker)
    * [Kubernetes environment setup](environment-setup-mac.md#12-kubernetes-environment-setup)
    * [Kubernetes Dashboard](environment-setup-mac.md#12-kubernetes-dashboard)
  * [Helm](environment-setup-mac.md#2-helm)
    * [Helm configuration](environment-setup-mac.md#21-helm-configuration)
  * [Postman](environment-setup-mac.md#3-postman)
    * [Installing Postman](environment-setup-mac.md#31-installing-postman)
    * [Setup Postman](environment-setup-mac.md#32-setup-postman)
* [Errors During Setup](environment-setup-mac.md#4-errors-on-setup)


## Local Deployment

The tool set to be deployed as part of the deployment process.

|Tool|Required/Optional|Description|Install Info|Tutorials|
|---|---|---|---|---|
|Docker|Required|<p>Docker Engine and CLI Client.</p><p>Local Kubernetes single node cluster.</p>|[https://docs.docker.com/install](https://docs.docker.com/install)|[Getting Started with Docker](https://docs.docker.com/get-started/)|
|Kubectl|Required|<p>Kubernetes CLI for Kubernetes Management.</p><p>Note Docker installs this part of Kubernetes install.</p>|[https://kubernetes.io/doc/tasks/tools/install-kuberctl](https://kubernetes.io/docs/tasks/tools/install-kubectl) <p>Docker Kubernetes Install (as per this guide)</p><p>`brew install kubernetes-cli`</p>|[kubernetes tutorials](https://kubernetes.io/docs/tutorials/)|
|Kubectx|Optional(useful tool)|<p>Kubernetes CLI for Kubernetes Context Management Helper.</p><p>Note Docker installs this as part of Kubernetes install.</p>|[https://github.com/ahmetb/kubectx](https://github.com/ahmetb/kubectx)</p><p>`brew install kubectx`</p>|https://github.com/ahmetb/kubectx|
|Kubetail|Optional(useful tool)|<p>Bash script that enables you to aggregate (tail/follow) logs from multiple pods into one stream. This is the same as running `kubectl logs -f` but for multiple pods.</p><p>Example usage `kubetail moja.* -n demo`</p>|https://github.com/johanhaleby/kubetail</td>||
|Helm|Required|<p>Helm helps you manage Kubernetes applications.</p><p>Helm charts help you define, install and upgrade even the most complex Kubernetes application<./p>|[https://docs.helm.sh/using_helm/#installing-helm](https://docs.helm.sh/using_helm/#installing-helm)</p><p>`brew install kubernetes-helm`</p>|[Helm Documents](https://helm.sh/docs/)|
|Postman|Required|Postman is a Google Chrome application for the interacting with HTTP API&apos;s. It presents you with a friendly GUI for the construction requests and reading responces.|[https://www.getpostman.com/apps](https://www.getpostman.com/apps)</td>|[Postman Learning Centre](https://learning.getpostman.com/?_ga=2.190121065.394495230.1553087789-183318539.1552904892)|

This section will guide the reader through the deployment process to setup Kubernetes within Docker.

### 1 Kubernetes

If you are new to Kubernetes it is strongly recommended to familiarize yourself with Kubernetes. [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/) is a good place to start and will provide an overview.

The following are Kubernetes concepts used within the project. An understanding of these concepts is imperative before attempting the deployment;

* Deployment
* Pod
* ReplicaSets
* Service
* Ingress
* StatefulSet
* DaemonSet
* Ingress Controller
* ConfigMap
* Secret

#### 1.1 Kubernetes Installation with Docker

* **kubectl** Complete set of installation instruction are available [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 

  ```bash
  brew install kubernetes-cli
  ```
  To verify if the installation was successful, check the version;

  ```bash
  kubectl version
  ```

To install Kubernetes with Docker, follow the steps below;

* Click on the Docker icon on the status barr
  * Select **Preferences**
  * Go to **Advanced**
    * Increase the CPU allocation to at least 4
    * Increase the Memory allocation to at least 8.0 GiB

![Kubernetes Install with Docker 1](../.gitbook/assets/kubernetesinstallwithdocker-1.png)

[Kubernetes Install with Docker 1](https://github.com/mojaloop/documentation/blob/master/Diagrams/Deployment/KubernetesInstallWithDocker-1.png)

* Go to **Kubernetes**
  * Select **Enable Kubernetes** tick box
  * Make sure **Kubernetes** is selected
  * Click **Apply**
  * Click **Install** on the confirmation tab. 
  * The option is available to wait for completion or run as a background task.

![Kubernetes Install with Docker 2](../.gitbook/assets/kubernetesinstallwithdocker-2.png)

[Kubernetes Install with Docker 2](https://github.com/mojaloop/documentation/tree/d1718f81b0f12a4ae17be49f59c17f072956dea5/Diagrams/Deployment/KubernetesInstallWithDocker-2.png)

#### 1.2 Kubernetes environment setup:

1. List the current Kubernetes context;
   ```bash
   kubectl config get-contexts
   ```
   
   **or**
   ```bash
   kubectx
   ```
2. Change your Contexts;
   ```bash
   kubectl config use-context docker-for-desktop
   ```

   **or**
   ```bash
   kubectx docker-for-desktop
   ```

#### 1.2 Kubernetes Dashboard:

1. Install Kubernetes Dashboard roles, services & deployment. \(Alternative install for Dashboard using Helm: [kubernetes-dashboard](https://github.com/helm/charts/tree/master/stable/kubernetes-dashboard)\)

   **IMPORTANT:** Always verify current [kubernetes-dashboard](https://github.com/kubernetes/dashboard) yaml file for the below create command.
   ```bash
   kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
   ```

2. Verify Kubernetes Dashboard;
   ```bash
   kubectl get pod --namespace=kube-system |grep dashboard
   ```

3. Start proxy for local UI in new terminal;
   ```bash
   kubectl proxy ui
   ```

4. Open URI in default browser
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

![kubernetes-dashboard](.//kubernetesdashboard.svg)

[kubernetes-dashboard](https://github.com/mojaloop/documentation/tree/d1718f81b0f12a4ae17be49f59c17f072956dea5/Diagrams/Deployment/kubernetesDashboard.svg)

### 2 Helm 

#### 2.1 Helm configuration

1. Config Helm CLI and install Helm Tiller on K8s cluster;
   ```bash
   helm init
   ```

2. Validate Helm Tiller is up and running;
   ```bash
   kubectl -n kube-system get po | grep tiller
   ```

3. Add mojaloop repo to your Helm config \(optional\);
   ```bash
   helm repo add mojaloop http://mojaloop.io/helm/repo/
   ```

4. Add the incubator. This is needed to resolve Helm Chart dependencies required by Mojaloop charts;
   ```bash
   helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
   ```

5. Update helm repositories;
   ```bash
   helm repro update
   ```

6. Install nginx-ingress for load balancing & external access;
   ```bash
   helm --namespace kube-public install stable/nginx-ingress
   ```

7. Add the following to your /ect/hosts;
   ```text
   127.0.0.1       interop-switch.local central-kms.local forensic-logging-sidecar.local central-ledger.local central-end-user-registry.local central-directory.local central-hub.local central-settlements.local ml-api-adapter.local
   ```

8. Test system health in your browser after installation. This will only work if you have an active helm chart deployment running.
   ml-api-adapter health test
   ```https request
   [http://ml-api-adapter/health](http://ml-api-adapter/health)
   ```

   central-ledger health test
   ```http request
   http://central-ledger/health
   ```

### 3 Postman

Postman is used to send requests and receive responses.

#### 3.1 Installing Postman

Please, follow these instructions: [Get Postman](https://www.getpostman.com/postman)

#### 3.2 Setup Postman

1. Download this file [https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman_collection.json](https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman_collection.json)
2. Open **Postman**
3. Click **Import** and then **Import File**
4. Select the _Mojaloop.postman\_collection.json_ file you downloaded
5. You'll now need to import environment variables. For local testing, download this file [https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman_environment.json](https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman_environment.json)
6. Click **Import** and then **Import File**
7. Select the _MojaloopLocal.postman\_environment.json_ file you downloaded
8. In the imported collection, navigate to the _central_ledger_ directory  

### 4 Errors On Setup
Errors encountered and the solutions to be documented within this section.