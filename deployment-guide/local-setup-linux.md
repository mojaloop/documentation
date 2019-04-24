# Mojaloop Setup for Linux (Ubuntu)

Local setup on a Laptop or Desktop to run the Mojaloop project.

## Setup Introduction

This document will provide guidelines to a technical capable resources to setup, deploy and configure the Mojaloop applications on a local environment, utilizing Docker, Kubernetes and HELM charts.

At this point the reader/implementer should be familiar with [Mojaloop's deployment guide](./README.md). Imported information is contained in that document and as such a prerequisite to this document.

* [Environment recommendations](#1-environment-recommendations)
  * [Kubernetes](#2-kubernetes)
    * [MicroK8S](#21-microk8s)
  * [Docker](#12-docker)
* [Useful Tips](#2-useful-tips)

## 1. Environment recommendations

This environment setup was validated on:
  * 64-bit version of Ubuntu Bionic 18.04(LTS).
  * This guide is based on Ubuntu 18.04.2 (bionic) on a x86_64 desktop with 8 CPU's and 16GB RAM.

## 2. Kubernetes

Kubernetes installation for a local environment.

#### 2.1. MicroK8S

We recommend install directly from the snap store.

Don't have the snap command? [Install snapd first](https://snapcraft.io/docs/core/install).

1. Installing MicroK8s from snap.
   ```bash
   snap install microk8s --classic
   ```

2. Verify MicroK8s is installed and available.
   ```bash
   microk8s.status
   ```

3. During installation you can use the --wait-ready flag to wait for the kubernetes services to initialise.
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

   Reverting it at any time;
   ```bash
   snap unalias kubectl
   ```

   We will stick with the standard command of prefixing with **microk8s.** for this guide.

6. If you already have **kubectl** installed and would like to use it to access the **MicroK8s** deployment.
   ```bash
   microk8s.kubectl config view --raw > $HOME/.kube/config
   ```

7. View the current context.
   ```bash
   microk8s.kubectl config get-contexts
   ```

9. Make sure the current context is **microk8s**. If not, set it as the current context.
   ```bash
   microk8s.kubectl config use-context microk8s
   ```

### 1.2. Docker

Docker is deployed as part of the MicroK8s installation. The docker daemon used by MicroK8s is listening on unix:///var/snap/microk8s/current/docker.sock. You can access it with the **microk8s.docker** command.

1. If you require **microk8s.docker** to function as a standard **docker** command, you set an alias.
   ```bash
   sudo snap alias microk8s.docker docker
   ```

   Undo the alias;
   ```bash
   sudo snap unalias docker
   ```

2. We will apply the native microK8s commands by prefix commands **microk8s.**
   ```bash
   microk8s.docker ps
   ```

3. Continue setup and configuration from the Kubernetes Dashboard section in the [Mojaloop's deployment guide](./README.md#31-kubernetes-dashboard) document.

## 2. Useful Tips

1. Resolve problems with VSCode and kafka on ubuntu 18.04. To make the code work with VSCode debugger, added the following into the launch.json
    ```json
    "env": {
            "LD_LIBRARY_PATH": "${workspaceFolder}/node_modules/node-rdkafka/build/deps",
            "WITH_SASL": 0
          }
    ```
