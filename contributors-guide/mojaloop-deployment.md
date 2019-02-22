# Mojaloop Deployment

## Deployment and Setup Introduction

This document will provide guidelines to deploy and configure the Mojaloop applications on a local environment, utilizing Kubernetes within Docker.

* [Software List](mojaloop-deployment.md#1-software-list)
  * [Deployment Recommendations](mojaloop-deployment.md#11-deployment-recommendations)
  * [Local Deployment and Testing Tools](mojaloop-deployment.md#12-local-deployment-and-testing-tools)
* [Deployment](mojaloop-deployment.md#2-deployment)
  * [Kubernetes](mojaloop-deployment.md#21-kubernetes)
    * [Kubernetes Installation with Docker](mojaloop-deployment.md#211-kubernetes-installation-with-docker)
    * [Kubernetes environment setup](mojaloop-deployment.md#212-kubernetes-environment-setup)
  * [Helm](mojaloop-deployment.md#22-helm)
    * [Helm Chart Installation](mojaloop-deployment.md#221-helm-chart-installation)
  * [Postman](mojaloop-deployment.md#23-postman)
    * [Installing Postman](mojaloop-deployment.md#231-installing-postman)
    * [Setup Postman](mojaloop-deployment.md#231-setup-postman)
* [Errors During Setup](mojaloop-deployment.md#24-errors-on-setup)

## 1 Software List

Before proceeding, please have a look at [Deployment Recommendations](mojaloop-deployment.md#11-deployment-recommendations) to insure the minimum resource requirements are available.

### 1.1 Deployment Recommendations

This provides environment resource recommendations with a view of the infrastructure architecture.

**Resources Requirements:**

* Control Plane \(i.e. Master Node\)

  \`\`\`http request

  [https://kubernetes.io/docs/setup/cluster-large/\#size-of-master-and-master-components](https://kubernetes.io/docs/setup/cluster-large/#size-of-master-and-master-components)

  \`\`\`

  * 3x Master Nodes for future node scaling and HA \(High Availability\)

* ETCd Plane:

  \`\`\`http request

  [https://coreos.com/etcd/docs/latest/op-guide/hardware.html](https://coreos.com/etcd/docs/latest/op-guide/hardware.html)

  \`\`\`

  * 3x ETCd nodes for HA \(High Availability\)

* Compute Plane \(i.e. Worker Node\):

  TBC once load testing has been concluded. However the current general \*recommended size:

  * 3x Worker nodes, each being:
    * 4x vCPUs, 16GB of RAM, and 40gb storage

  \*Note that this would also depend on your underlying infrastructure, and it does NOT include requirements for persistent volumes/storage.

![Mojaloop Deployment Recommendations - Infrastructure Architecture](../.gitbook/assets/kubeinfrastructurearch%20%281%29.png)

[Mojaloop Deployment Recommendations - Infrastructure Architecture](https://github.com/mojaloop/documentation/tree/d1718f81b0f12a4ae17be49f59c17f072956dea5/Diagrams/Deployment/KubeInfrastructureArch.png)

#### 1.2 Local Deployment and Testing Tools

### 1.2 Local Deployment and Testing Tools

The tool set to be deployed as part of the deployment process.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Tool</th>
      <th style="text-align:left">Required/Optional</th>
      <th style="text-align:left">Description</th>
      <th style="text-align:left">Install Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Docker</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left">
        <p>Docker Engine and CLI Client</p>
        <p>Local Kubernetes single node cluster</p>
      </td>
      <td style="text-align:left">[https://docs.docker.com/install](https://docs.docker.com/install)</td>
    </tr>
    <tr>
      <td style="text-align:left">Kubectl</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left">
        <p>Kubernetes CLI for Kubernetes Management</p>
        <p>Note Docker installs this part of Kubernetes install</p>
      </td>
      <td style="text-align:left">
        <p>[https://kubernetes.io/doc/tasks/tools/install-kuberctl](https://kubernetes.io/docs/tasks/tools/install-kubectl)</p>
        <p>Docker Kubernetes Install (as per this guide)</p>
        <p><b>Mac:</b> `brew install kubernetes-cli`</p>
        <p><b>Ubuntu:</b> `sudo snap install kubectl --classic`</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Kubectx</td>
      <td style="text-align:left">Optional(useful tool)</td>
      <td style="text-align:left">
        <p>Kubernetes CLI for Kubernetes Context Management Helper</p>
        <p>Note Docker installs this as part of Kubernetes install</p>
      </td>
      <td style="text-align:left">
        <p>[https://github.com/ahmetb/kubectx](https://github.com/ahmetb/kubectx)</p>
        <p><b>Mac:</b> `brew install kubectx`</p>
        <p><b>Ubuntu:</b> `sudo apt install kubectx`</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Kubetail</td>
      <td style="text-align:left">Optional(useful tool)</td>
      <td style="text-align:left">
        <p>Bash script that enables you to aggregate (tail/follow) logs from multiple
          pods into one stream. This is the same as running `kubectl logs -f` but
          for multiple pods.</p>
        <p>Example usage `kubetail moja.* -n demo`</p>
      </td>
      <td style="text-align:left">https://github.com/johanhaleby/kubetail</td>
    </tr>
    <tr>
      <td style="text-align:left">Helm</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left">
        <p>Helm helps you manage Kubernetes applications</p>
        <p>Helm charts help you define, install and upgrade even the most complex
          Kubernetes application</p>
      </td>
      <td style="text-align:left">
        <p>[https://docs.helm.sh/using_helm/#installing-helm](https://docs.helm.sh/using_helm/#installing-helm)</p>
        <p><b>Mac:</b> `brew install kubernetes-helm`</p>
        <p><b>Ubuntu:</b> `sudo snap install helm --classic`</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Postman</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left">Postman is a Google Chrome application for the interacting with HTTP API's.
        It presents you with a friendly GUI for the construction requests and reading
        responces.</td>
      <td style="text-align:left">[https://www.getpostman.com/apps](https://www.getpostman.com/apps)</td>
    </tr>
  </tbody>
</table>## 2 Deployment

This section will guide the reader through the deployment process to setup Kubernetes within Docker.

### 2.1 Kubernetes

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

#### 2.1.1 Kubernetes Installation with Docker

**Ubuntu**

Note - Kubernetes with Docker is currently **not** available on Linux\(Ubuntu\) - please refer to; [https://forums.docker.com/](https://forums.docker.com/t/is-there-a-built-in-kubernetes-in-docker-ce-for-linux/54374)

We recommend installing a minikube local environment by follow the steps below;

With reference to [https://kubernetes.io/docs/tasks/tools/install-minikube/](https://kubernetes.io/docs/tasks/tools/install-minikube/)

* VT-x or AMD-v virtualization must be enabled in your computer’s BIOS. To check this on Linux run the following and verify the output is **non-empty**:

  ```bash
  egrep --color 'vmx|svm' /proc/cpuinfo
  ```

* Install a Hypervisor:

  * [KVM](http://www.linux-kvm.org/) - Recommended Linux driver

  or

  * [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

* **kubectl** should already be installed. To verify, check the version;

  ```bash
  kubectl version
  ```

  If an error is returned, please refer to [Local Deployment and Testing Tools](mojaloop-deployment.md#12-local-deployment-and-testing-tools).

* **minikube** installation

  ```bash
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube
  ```

* Start a cluster by running:

  **Note** - if you have install KVM as the Hypervisor, you might need to include `--vm-driver=KVM` in the startup command. The default is to startup with VirtualBox.

  ```bash
  minikube start
  ```

  Once successfully started, you can interact with your cluster using kubectl, just like any other Kubernetes cluster.

* Lunching the Minikube Dashboard

  The minikube dashboard can be opened and access via your default browser.

  ```bash
  minikube dashboard
  ```

  Continue from the **Config Helm CLI and install Helm Tiller...** section below.

**Mac**

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

#### 2.1.2 Kubernetes environment setup:

The following are all command line executables specifically for **Mac**. 1. List the current Kubernetes context;

```bash
   kubectl config get-contexts
```

or

```bash
   kubectx
```

1. Change your Contexts;

   ```bash
   kubectl config use-contexts
   ```

   or

   ```bash
   kubectx docker-for-desktop
   ```

2. Install Kubernetes Dashboard roles, services & deployment. \(Alternative install for Dashboard using Helm: [kubernetes-dashboard](https://github.com/helm/charts/tree/master/stable/kubernetes-dashboard)\)

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

![kubernetes-dashboard](../.gitbook/assets/kubernetesdashboard.png)

[kubernetes-dashboard](https://github.com/mojaloop/documentation/tree/d1718f81b0f12a4ae17be49f59c17f072956dea5/Diagrams/Deployment/kubernetesDashboard.png)

**Ubuntu** continue from here

1. Config Helm CLI and install Helm Tiller on K8s cluster

   ```bash
   helm init
   ```

2. Validate Helm Tiller is up and running

   ```bash
   kubectl -n kube-system get po | grep tiller
   ```

3. Add mojaloop repo to your Helm config \(optional\)

   ```bash
   helm repo add mojaloop http://mojaloop.io/helm/repo/
   ```

4. Add the incubator. This is needed to resolve Helm Chart dependencies required by Mojaloop charts

   ```bash
   helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
   ```

5. Update helm repositories

   ```bash
   helm repro update
   ```

6. Install nginx-ingress for load balancing & external access

   ```bash
   helm --namespace kube-public install stable/nginx-ingress
   ```

7. Add the following to your /ect/hosts

   ```text
   127.0.0.1       interop-switch.local central-kms.local forensic-logging-sidecar.local central-ledger.local central-end-user-registry.local central-directory.local central-hub.local central-settlements.local ml-api-adapter.local
   ```

8. Test system health in your browser after installation

   ml-api-adapter health test

   \`\`\`http request

   [http://ml-api-adapter/health](http://ml-api-adapter/health)

   ```text
   ___
   central-ledger health test
   ```http request
   http://central-ledger/health
   ```

### 2.2 Helm

Please review [Mojaloop Helm Chart](../repositories/helm.md) to understand the relationships between the deployed Mojaloop helm charts.

**2.2.1 Helm Chart Installation**

This section will provide guidelines to delete, list, install and upgrade of the helm charts. For a comprehensive deployment documentation, please see [Helm Chart Deployment](https://github.com/mojaloop/helm/blob/master/README.md)

1. Lets start by **listing** the current helm charts deployed

   ```bash
   helm list
   ```

2. If you would like to **delete** a deployed helm chart

   ```bash
   helm del --purge moja
   ```

   **Note:** for demo purposes we are using **moja** as the chart **name**. Please verify and use the correct chart name from the listing above.

3. To **install** Mojaloop chart\(s\)

   **Ubuntu** - It might be required to execute `helm install` and `helm upgrade` under `sudo`.

   To install the full mojaloop project

   ```bash
   helm install --namespace=demo --name=moja mojaloop/mojaloop
   ```

   Alternative directly from the repository:

   ```bash
   helm install --namespace=demo --name=moja --repo=http://mojaloop.io/helm/repo mojaloop
   ```

   **or** install a specific mojaloop chart eg. Central-ledger

   ```bash
   helm install --namespace=demo --name=moja mojaloop/centralledger
   ```

   Alternative directly from the repository:

   ```bash
   helm install --namespace=demo --name=moja --repo=http://mojaloop.io/helm/repo centralledger
   ```

4. To upgrade Mojaloop chart\(s\)

   Note: 'v5.1.1' is an example value.

   ```bash
   helm upgrade moja --set central.centralledger.centralledger-services.containers.api.image.tag=v5.1.1-snapshot mojaloop
   ```

5. To upgrade a specific chart eg. Central-ledger

   ```bash
   helm upgrade moja --set centralledger-services.containers.api.image.tag=v5.1.1-snapshot mojaloop/centralledger
   ```

### 2.3 Postman

Postman is used to send requests and receive responses.

**2.3.1 Installing Postman**

Please, follow these instructions: [Get Postman](https://www.getpostman.com/postman)

Alternatively on **Ubuntu** you may run:

```bash
wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz
sudo tar -xzf postman.tar.gz -C /opt
rm postman.tar.gz
sudo ln -s /opt/Postman/Postman /usr/bin/postman
```

#### 2.3.1 Setup Postman

* Download this file [https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman\_collection.json](https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman_collection.json)
* Open **Postman**
* Click **Import** and then **Import File**
* Select the _Mojaloop.postman\_collection.json_ file you downloaded
* You'll now need to import environment variables. For local testing, download this file [https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman\_environment.json](https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman_environment.json)
* Click **Import** and then **Import File**
* Select the _MojaloopLocal.postman\_environment.json_ file you downloaded
* In the imported collection, navigate to the _central\_ledger_ directory  

### 2.4 Errors On Setup

* \`central-ledger’s server IP address could not be found.

  ERR\_NAME\_NOT\_RESOLVED\`

  Resolved by:

  * Verify that a helm chart\(s\) was installed by executing

    ```bash
    helm list
    ```

    If the helm charts are not listed, see the [Helm Chart Installation](mojaloop-deployment.md#221-helm-chart-installation) section to install a chart.

