# Mojaloop local environment setup for Mac

Local setup on a Laptop or Desktop to run the Mojaloop project.

## Setup Introduction

This document will provide guidelines to a technical capable resources to setup, deploy and configure the Mojaloop applications on a local environment, utilizing Docker, Kubernetes and HELM charts.

At this point the reader/implementer should be familiar with [Mojaloop's deployment guide](./README.md). Imported information is contained in that document and as such a prerequisite to this document.

- [Mojaloop local environment setup for Mac](#mojaloop-local-environment-setup-for-mac)
  - [Setup Introduction](#setup-introduction)
  - [1. Kubernetes](#1-kubernetes)
    - [1.1. Kubernetes Installation with Docker](#11-kubernetes-installation-with-docker)
  - [2. Continue with Deployment](#2-continue-with-deployment)
  
## 1. Kubernetes

This section will guide the reader through the deployment process to setup Kubernetes within Docker.

### 1.1. Kubernetes Installation with Docker

1. Kubectl

  Complete set of **kubectl** installation instruction are available [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

  ```bash
  brew install kubernetes-cli
  ```

  To verify if the installation was successful, check the version;

  ```bash
  kubectl version
    ```

2. To install Kubernetes with Docker, follow the steps below;

  * Click on the Docker icon on the status barr
    * Select **Preferences**
    * Go to **Advanced**
      * Increase the CPU allocation to at least 4
      * Increase the Memory allocation to at least 8.0 GiB

  ![Kubernetes Install with Docker 1](./assets/diagrams/deployment/KubernetesInstallWithDocker-1.png)

  * Go to **Kubernetes**
    * Select **Enable Kubernetes** tick box
    * Make sure **Kubernetes** is selected
    * Click **Apply**
    * Click **Install** on the confirmation tab.
    * The option is available to wait for completion or run as a background task.

  ![Kubernetes Install with Docker 2](./assets/diagrams/deployment/KubernetesInstallWithDocker-2.png)

### 1.2. Kubernetes environment setup

1. List the current Kubernetes context;

  ```bash
  kubectl config get-contexts
  ```

2. Change your Contexts;

  ```bash
  kubectl config use-context docker-desktop
  ```

## 2. Continue with Deployment

1. Continue setup and configuration from the [Mojaloop's deployment guide - 3.1. Kubernetes Ingress Controller](./README.md#31-kubernetes-ingress-controller) document.
