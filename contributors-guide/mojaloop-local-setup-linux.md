# Mojaloop Setup for Ubuntu
The document is intended for an audience with a stable technical knowledge and would like to setup an environment for development, testing and contributing to the Mojaloop project.

Before proceeding, please insure you have reviewed [mojaloop-deployment](mojaloop-local-deployment.md).

## Setup Introduction
This document will provide guidelines to a technical capable resources to setup, deploy and configure the Mojaloop applications on a local environment, utilizing Docker, Kubernetes and HELM charts.

* [Environment Setup](mojaloop-local-setup-linux.md#1-environment-setup)
  * [Docker](mojaloop-local-setup-linux.md#1-docker)
  * [Kubernetes](mojaloop-local-setup-linux.md#2-kubernetes)
    * [MicroK8S](mojaloop-local-setup-linux.md#21-microk8s)
* [Errors During Setup](mojaloop-local-setup-linux.md#3-errors-on-setup)
* [Useful Tips](mojaloop-local-setup-linux.md#4-useful-tips)

The tool set to be deployed as part of the deployment process. The below table is just a point of reference. 

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
      <td style="text-align:left"><a href="https://docs.docker.com/get-started/">Getting started with Docker</a></td>
    </tr>
    <tr>
      <td style="text-align:left">Kubectl</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left"><p>Kubernetes CLI for Kubernetes Management.</p><p>Note Docker installs this part of Kubernetes install.</p></td>
      <td style="text-align:left"><a href="https://kubernetes.io/docs/tasks/tools/install-kubectl">https://kubernetes.io/docs/tasks/tools/install-kubectl</a><p>Docker Kubernetes Install (as per this guide)</p><p><i><b>$ sudo snap install kubectl --classic</b></i></p></td>
      <td style="text-align:left"><a href="https://kubernetes.io/docs/tutorials/">Kubernetes Tutorials/</a></td>
    </tr>
    <tr>
      <td style="text-align:left">MicroK8s</td>
      <td style="text-align:left">Required</td>
      <td style="text-align:left"><p>Kubernetes for workstations and appliances.</p><p>A single package of k8s that installs on Linux.</p></td>
      <td style="text-align:left"><p><a href="https://microk8s.io/docs/">https://microk8s.io/docs/</a><p><i><b>$ snap install microk8s --classic</b></i></p></td>
      <td style="text-align:left">The <a href="https://kubernetes.io/docs/tutorials/">Kubernetes tutorial</a>, the <a href="https://microk8s.io/">MicroK8s</a> website contains a short video clip under the <b>Working with MicroK8s</b> section that is worth looking at.</td>
    </tr>
    <tr>
      <td style="text-align:left">Kubectx</td>
      <td style="text-align:left">Optional<p>(useful tool)</p></td>
      <td style="text-align:left"><p>Kubernetes CLI for Kubernetes Context Management Helper.</p><p>Note Docker installs this as part of Kubernetes install.</p></td>
      <td style="text-align:left"><p><a href="https://github.com/ahmetb/kubectx">https://github.com/ahmetb/kubectx</a></p><p><i><b>$ sudo apt install kubectx</b></i></p></td>
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
      <td style="text-align:left"><p><a href="https://docs.helm.sh/using_helm/#installing-helm">https://docs.helm.sh/using_helm/#installing-helm</a></p><p><i><b>$ sudo snap install helm --classic</b></i></p></td>
      <td style="text-align:left"><a href="https://helm.sh/docs/">Helm Documents</a></td>
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

5. This step is only necessary if you require **microk8s.kubectl** to function as a standard **kubectl** command. This **DOES NOT** mean that you can then use **kubectl** to access **OTHER** k8s clusters.
   An example of why you would use this: You have a bash script or 3rd party tool that expects **kubectl** to be available. E.g. If you want to use Helm, it will not work against **microk8s.kubectl**, thus one **MUST** setup the alias for Helm to function correctly. 
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

7. This step is only necessary if you require **microk8s.docker** to function as a standard **docker** command. ;
   ```bash
   sudo snap alias microk8s.docker docker
   ```

   Undo the alias;
   ```bash
   sudo snap unalias docker
   ```

8. We will apply the native microK8s commands by prefix commands **microk8s.**:
   ```bash
   microk8s.docker ps
   ```

9. View the current context:
   ```bash
   microk8s.kubectl config get-contexts
   ```

10. Make sure the current context is **microk8s**. If not, set it as the current context:
   ```bash
   microk8s.kubectl config use-context microk8s
   ```

### 3 Errors On Setup
Errors encountered and the solutions to be documented within this section.

### 4 Useful Tips
1. Resolve problems with VSCode and kafka on ubuntu 18.04. To make the code work with VSCode debugger, added the following into the launch.json
    ```json
    "env": {
            "LD_LIBRARY_PATH": "${workspaceFolder}/node_modules/node-rdkafka/build/deps",
            "WITH_SASL": 0
          }
    ```
    