# Mojaloop Setup for Ubuntu
The document is intended for an audience with a stable technical knowledge and would like to setup an environment for development, testing and contributing to the Mojaloop project.

## Setup Introduction

This document will provide guidelines to a technical capable resources to setup, deploy and configure the Mojaloop applications on a local environment, utilizing Docker, Kubernetes and HELM charts.

* [Environment Setup](environment-setup-linux.md#1-environment-setup)
  * [Docker](environment-setup-linux.md#1-docker)
  * [Kubernetes](environment-setup-linux.md#2-kubernetes)
    * [MicroK8S](environment-setup-linux.md#21-microk8s)
    * [Kubernetes Dashboard](environment-setup-linux.md#22-kubernetes-dashboard)
  * [Helm](environment-setup-linux.md#3-helm)
    * [Helm CLI and Tiller](environment-setup-linux.md#31-helm-cli-and-tiller)
    *[Incubator](environment-setup-linux.md#32-incubator)
    *[Nginx-ingress](environment-setup-linux.md#33-nginx-ingress)
    *[Helm Configuration](environment-setup-linux.md#34-helm-configuration)
    *[Helm Chart Installation](environment-setup-linux.md#35-helm-chart-installation)
  * [Postman](environment-setup-linux.md#4-postman)
    * [Installing Postman](environment-setup-linux.md#41-installing-postman)
    * [Setup Postman](environment-setup-linux.md#42-setup-postman)
* [Errors During Setup](environment-setup-linux.md#5-errors-on-setup)

The tool set to be deployed as part of the deployment process. The below table is just a point of reference. 

|Tool|Required/Optional|Description|Install Info|Tutorials|
|---|---|---|---|---|
|Docker|Required|<p>Docker Engine and CLI Client.</p><p>Local Kubernetes single node cluster.</p>|[https://docs.docker.com/install](https://docs.docker.com/install)|[Getting Started with Docker](https://docs.docker.com/get-started/)|
|Kubectl|Required|<p>Kubernetes CLI for Kubernetes Management.</p><p>Note Docker installs this part of Kubernetes install.</p>|[https://kubernetes.io/doc/tasks/tools/install-kuberctl](https://kubernetes.io/docs/tasks/tools/install-kubectl)<p>Docker Kubernetes Install (as per this guide)</p><p>`sudo snap install kubectl --classic`</p>|[kubernetes tutorials](https://kubernetes.io/docs/tutorials/)|
|MicroK8s|Required|<p>Kubernetes for workstations and appliances.</p><p>A single package of k8s that installs on Linux.</p>|[https://microk8s.io/docs/](https://microk8s.io/docs/)<p>`snap install microk8s --classic`</p>|Apart from the Kubernetes tutorial, https://microk8s.io/ contains a short video clip under the <b>Working with MicroK8s</b> section that is worth looking at.|
|Kubectx|Optional(useful tool)|<p>Kubernetes CLI for Kubernetes Context Management Helper.</p><p>Note Docker installs this as part of Kubernetes install.</p>|[https://github.com/ahmetb/kubectx](https://github.com/ahmetb/kubectx)</p><p>`sudo apt install kubectx`</p>|https://github.com/ahmetb/kubectx|
|Kubetail|Optional(useful tool)|<p>Bash script that enables you to aggregate (tail/follow) logs from multiple pods into one stream. This is the same as running `kubectl logs -f` but for multiple pods.</p><p>Example usage `kubetail moja.* -n demo`</p>|https://github.com/johanhaleby/kubetail</td>||
|Helm|Required|<p>Helm helps you manage Kubernetes applications.</p><p>Helm charts help you define, install and upgrade even the most complex Kubernetes application<./p>|[https://docs.helm.sh/using_helm/#installing-helm](https://docs.helm.sh/using_helm/#installing-helm)</p><p>`sudo snap install helm --classic`</p>|[Helm Documents](https://helm.sh/docs/)|
|Postman|Required|Postman is a Google Chrome application for the interacting with HTTP API&apos;s. It presents you with a friendly GUI for the construction requests and reading responces.|[https://www.getpostman.com/apps](https://www.getpostman.com/apps)</td>|[Postman Learning Centre](https://learning.getpostman.com/?_ga=2.190121065.394495230.1553087789-183318539.1552904892)|


## 1 Environment Setup

This environment setup was validated on:
  * 64-bit version of Ubuntu Bionic 18.04(LTS).
  * This guide is based on Ubuntu 18.04.2 (bionic) on a x86_64 desktop with 8 CPU's and 16GB RAM.

### 1 Docker

Dockerd is deployed as part of the MicroK8s installation. The docker daemon used by MicroK8s is listening on unix:///var/snap/microk8s/current/docker.sock. You can access it with the **microk8s.docker** command. 

### 2 Kubernetes

This section will guide the reader through the deployment process to setup Kubernetes.

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

#### 2.1 MicroK8S
The quickest way to get started is to install directly from the snap store.

Don't have the snap command? [Install snapd first](https://snapcraft.io/docs/core/install).

1. Installing MicroK8s from snap:
   ```bash
   snap install microk8s --classic
   ```

2. Verify MicroK8s is installed and available:
   ```bash
   microk8s.status
   ```

3. During installation you can use the --wait-ready flag to wait for the kubernetes services to initialise:
   ```bash
   microk8s.status --wait -ready
   ```

4. To avoid colliding with a **kubectl** already installed and to avoid overwriting any existing Kubernetes configuration file, MicroK8s adds a **microk8s.kubectl** command, configured to exclusively access the new **MicroK8s** install.
   ```bash
   microk8s.kubectl get services
   ```

5. If you do not have a **kubectl** installed, you can alias **microk8s.kubectl** to **kubectl**:
   ```bash
   snap alias microk8s.kubectl kubectl
   ```

   Reverting it at any time:
   ```bash
   snap unalias kubectl
   ```

   We will stick with the standard command of prefixing with **microk8s.** for this guide.

6. If you already have **kubectl** installed and would like to use it to access the **MicroK8s** deployment:
   ```bash
   microk8s.kubectl config view --raw > $HOME/.kube/config
   ```

7. MicroK8s is a barebones upstream installation of Kubernetes. Additional services that are required will need to be enabled. We need the kube-dns and the dashboard:
   ```bash
   microk8s.enable dns dashboard
   ```

8. As with **kubectl** if you don't have docker you can set an alias;
   ```bash
   sudo snap alias microk8s.docker docker
   ```

   Undo the alias;
   ```bash
   sudo snap unalias docker
   ```

9. We will apply the native microK8s commands by prefix commands **microk8s.**:
   ```bash
   microk8s.docker ps
   ```

10. View the current context:
   ```bash
   microk8s.kubectl config get-contexts
   ```

11. Make sure the current context is **microk8s**. If not, set it as the current context:
   ```bash
   kubectl config use-context microk8s
   ```

#### 2.2 Kubernetes Dashboard

1. Deploy the Kubernetes dashboard:
   ```bash
   microk8s.kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
   ```

2. Verify Kubernetes Dashboard is active:
   ```bash
   microk8s.kubectl get pod -—namespace=kube-system | grep dashboard
   ```

3. Start proxy for local UI in new terminal:
   ```bash
   microk8s.kubectl proxy ui
   ```

4. Obtaining the dashboard-token name:
   ```bash
   microk8s.kubectl -n kube-system get secrets | grep dashboard-token
   ```

5. Retrieve the service-account-token: 
   ```bash
   microk8s..kubectl -n tube-system describe secrets/kubernetes-dashboard-token-XXXXXX
   ```

6. Select **Token**. Generate a token to use there by:

   In a new terminal
   ```bash
   microk8s.kubectl -n kube-system get secrets | grep dashboard-token
   ```

7. The token to use is shown on the last line of the output of that command.
   ```bash
   microk8s.kubectl -n kube-system describe secrets/kubernetes-dashboard-token-btbwf
   ```

8. The **{kubernetes-dashboard-token-btbwf}** is retrieved from the output in the previous step. For more information on generating the token, follow the **Authentication** link in the window.

![kubernetes-dashboard](../assets/Diagrams/Kubernetes/kubernetesdashboard.png)

### 3 Helm

Please review [Mojaloop Helm Chart](../repositories/helm.md) to understand the relationships between the deployed Mojaloop helm charts.

#### 3.1 Helm CLI and Tiller

1. Config Helm CLI and install Helm Tiller on K8s cluster:
   ```bash
   helm init
   ```

2. Validate Helm Tiller is up and running:
   ```bash
   microk8s.kubectl -n tube-system get po | grep tiller
   ```

#### 3.2 Incubator

1. Add the incubator. This is required to resolve Helm Chart dependencies required by Mojaloop charts:
   ```bash
   sudo helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
   ```

#### 3.3 Nginx-ingress

1. Install nginx-ingress for load balancing & external access
   ```bash
   sudo helm —-namespace kube-public install stable/nginx-ingress
   ```

#### 3.4 Helm Configuration

1. Add mojaloop repo to your Helm config \(optional\):
   ```bash
   sudo helm repo add Mojaloop http://mojaloop.io/helm/repo/
   ```

2. Update helm repositories
   ```bash
   sudo helm repo update
   ```

3. Add the following to your /ect/hosts
   ```text
   127.0.0.1       interop-switch.local central-kms.local forensic-logging-sidecar.local central-ledger.local central-end-user-registry.local central-directory.local central-hub.local central-settlements.local ml-api-adapter.local
   ```

#### 3.5 Helm Chart Installation

Please review [Mojaloop Helm Chart](../repositories/helm.md) to understand the relationships between the deployed Mojaloop helm charts.

This section will provide guidelines to delete, list, install and upgrade of the helm charts. For a comprehensive deployment documentation, please see [Helm Chart Deployment](https://github.com/mojaloop/helm/blob/master/README.md)

1. Lets start by **listing** the current helm charts deployed
   ```bash
   helm list
   ```

2. If you would like to **delete** a deployed helm chart
   ```bash
   sudo helm del --purge moja
   ```

   \*Note: for demo purposes we are using **moja** as the chart **name**. Please verify and use the correct chart name from the listing above.

3. To **install** Mojaloop chart\(s\)

   It might be required to execute `helm install` and `helm upgrade` under `sudo`.

4. To install the **full Mojaloop** project
   ```bash
   sudo helm install --namespace=demo --name=moja mojaloop/mojaloop
   ```

   Alternative directly from the repository:
   ```bash
   sudo helm install --namespace=demo --name=moja --repo=http://mojaloop.io/helm/repo mojaloop
   ```

5. **or** install a **specific Mojaloop** chart eg. Central-ledger
   ```bash
   sudo helm install --namespace=demo --name=moja mojaloop/centralledger
   ```

   Alternative directly from the repository:
   ```bash
   sudo helm install --namespace=demo --name=moja --repo=http://mojaloop.io/helm/repo centralledger
   ```

6. To upgrade Mojaloop chart\(s\)

   /* Note: 'v5.1.1' is an example value.
   ```bash
   sudo helm upgrade moja --set central.centralledger.centralledger-services.containers.api.image.tag=v5.1.1-snapshot mojaloop
   ```

7. To upgrade a specific chart eg. Central-ledger
   ```bash
   sudo helm upgrade moja --set centralledger-services.containers.api.image.tag=v5.1.1-snapshot mojaloop/centralledger
   ```

8. Test system health in your browser after installation

   ml-api-adapter health test
   ```http request
   http://ml-api-adapter/health
   ```

   central-ledger health test
   ```http request
   http://central-ledger/health
   ```

### 4 Postman

Postman is used to send requests and receive responses.

#### 4.1 Installing Postman

Please, follow these instructions: [Get Postman](https://www.getpostman.com/postman)
```bash
wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz
sudo tar -xzf postman.tar.gz -C /opt
rm postman.tar.gz
sudo ln -s /opt/Postman/Postman /usr/bin/postman
```

#### 4.2 Setup Postman

1. Download this file [https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman\_collection.json](https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman_collection.json)
2. Open **Postman**
3. Click **Import** and then **Import File**
4. Select the _Mojaloop.postman\_collection.json_ file you downloaded
5. You'll now need to import environment variables. For local testing, download this file [https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman\_environment.json](https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman_environment.json)
6. Click **Import** and then **Import File**
7. Select the _MojaloopLocal.postman\_environment.json_ file you downloaded
8. In the imported collection, navigate to the _central\_ledger_ directory  

### 5 Errors On Setup
Errors encountered and the solutions to be documented within this section.