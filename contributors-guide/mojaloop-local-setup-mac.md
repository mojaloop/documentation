# Mojaloop local environment setup for Mac
The document is intended for an audience with a stable technical knowledge and would like to setup an environment for development, testing and contributing to the Mojaloop project.

Before proceeding, please insure you have reviewed [mojaloop-deployment](mojaloop-local-deployment.md).

## Setup Introduction

This document will provide guidelines to deploy and configure the Mojaloop applications on a local environment, utilizing Kubernetes within Docker.

* [Local Deployment](mojaloop-local-setup-mac.md#local-deployment)
  * [Kubernetes](mojaloop-local-setup-mac.md#1-kubernetes)
    * [Kubernetes Installation with Docker](mojaloop-local-setup-mac.md#11-kubernetes-installation-with-docker)
    * [Kubernetes environment setup](mojaloop-local-setup-mac.md#12-kubernetes-environment-setup)
* [Errors During Setup](mojaloop-local-setup-mac.md#2-errors-on-setup)


## Local Deployment

The tool set to be deployed as part of the deployment process.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Tool</th>
      <th style="text-align:left">Required/Optional</th>
      <th style="text-align:left">Description</th>
      <th style="text-align:left">Installation Reference(s)</th>
      <th style="text-align:left">Tutorial Reference(s)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Docker</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left"><p>Docker Engine and CLI Client.</p><p>Local Kubernetes single node cluster.</p></td>
      <td style="text-align:left"><a href="https://docs.docker.com/install">https://docs.docker.com/install</a></td>
      <td style="text-align:left"><a href="https://docs.docker.com/get-started/">https://docs.docker.com/get-started/</a></td>
    </tr>
    <tr>
      <td style="text-align:left">Kubectl</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left"><p>Kubernetes CLI for Kubernetes Management.</p><p>Note Docker installs this part of Kubernetes install.</p></td>
      <td style="text-align:left"><a href="https://kubernetes.io/docs/tasks/tools/install-kubectl">https://kubernetes.io/docs/tasks/tools/install-kubectl</a><p>Docker Kubernetes Install (as per this guide)</p><p><i><b>$ brew install kubernetes-cli</b></i></p></td>
      <td style="text-align:left"><a href="https://kubernetes.io/docs/tutorials/">https://kubernetes.io/docs/tutorials/</a></td>
    </tr>
    <tr>
      <td style="text-align:left">Kubectx</td>
      <td style="text-align:left">Optional<p>(useful tool)</p></td>
      <td style="text-align:left"><p>Kubernetes CLI for Kubernetes Context Management Helper.</p><p>Note Docker installs this as part of Kubernetes install.</p></td>
      <td style="text-align:left"><p><a href="https://github.com/ahmetb/kubectx">https://github.com/ahmetb/kubectx</a></p><p><i><b>$ brew install kubectx</b></i></p></td>
      <td style="text-align:left"><p>Please refer to the github repositary for more information.</p><p><a href="https://github.com/ahmetb/kubectx">https://github.com/ahmetb/kubectx</a></p></td>
    </tr>
    <tr>
      <td style="text-align:left">Kubetail</td>
      <td style="text-align:left">Optional<p>(useful tool)</p></td>
      <td style="text-align:left"><p>Bash script that enables you to aggregate (tail/follow) logs from multiple pods into one stream. This is the same as running</p> <p><i><b>$ kubectl logs -f</b></i></p> <p>but for multiple pods.</p><p>Example usage</p><p><b><i>$ kubetail moja.* -n demo</b></i></p></td>
      <td style="text-align:left"><a href="https://github.com/johanhaleby/kubetail">https://github.com/johanhaleby/kubetail</a></td>
      <td style="text-align:left"><p>Please refer to the github repositary for more information.</p><p><a href="https://github.com/johanhaleby/kubetail">https://github.com/johanhaleby/kubetail</a></p></td>      
    </tr>
    <tr>
      <td style="text-align:left">Helm</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left"><p>Helm helps you manage Kubernetes applications.</p><p>Helm charts help you define, install and upgrade even the most complex Kubernetes application.</p></td>
      <td style="text-align:left"><p><a href="https://docs.helm.sh/using_helm/#installing-helm">https://docs.helm.sh/using_helm/#installing-helm</a></p><p><i><b>$ brew install kubernetes-helm</b></i></p></td>
      <td style="text-align:left"><a href="https://helm.sh/docs/">https://helm.sh/docs/</a></td>
    </tr>
    <tr>
      <td style="text-align:left">Postman</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left">Postman is a Google Chrome application for the interacting with HTTP API&apos;s. It presents you with a friendly GUI for the construction requests and reading responces.</td>
      <td style="text-align:left"><a href="https://www.getpostman.com/apps">https://www.getpostman.com/apps</a></td>
      <td style="text-align:left"><a href="https://learning.getpostman.com/?_ga=2.190121065.394495230.1553087789-183318539.1552904892">Postman Learning Centre</a></td>
    </tr>
  </tbody>
</table>

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

![Kubernetes Install with Docker 1](../assets/Diagrams/Kubernetes/kubernetesInstallWithDocker-1.png)

* Go to **Kubernetes**
  * Select **Enable Kubernetes** tick box
  * Make sure **Kubernetes** is selected
  * Click **Apply**
  * Click **Install** on the confirmation tab. 
  * The option is available to wait for completion or run as a background task.

![Kubernetes Install with Docker 2](../assets/Diagrams/Kubernetes/kubernetesInstallWithDocker-2.png)

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

### 2 Errors On Setup
Errors encountered and the solutions to be documented within this section.
