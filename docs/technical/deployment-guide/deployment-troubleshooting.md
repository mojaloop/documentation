# Deployment Troubleshooting

## 1. Known issues

### 1.1. Nginx-Ingress Controller support for Mojaloop Helm release v13.x - v14.0x.x support for Kubernetes v1.20 - v1.21

If you are using Mojaloop `v13.x` - `v14.0.x`, and want to install the `Nginx-Ingress` controller, then it is recommended that you install `Nginx-Ingress Controller v0.47.0` along with `Kubernetes v1.20 - v1.21` due to breaking changes introduce in `Kubernetes v1.22`.

If you are using helm, this can be done as follows:

```bash
helm install ingress-nginx ingress-nginx --version="3.33.0" --repo https://kubernetes.thub.io/ingress-nginx
```

### 1.2. Nginx-Ingress Controller support for Mojaloop Helm release v12.x

If you are installing Mojaloop v12.x with an Nginx-Ingress controller version newer than `v0.22.0`, ensure you create a custom [Mojaloop v12.0.0 values config](https://github.com/jaloop/helm/blob/v12.0.0/mojaloop/values.yaml) with the following changes prior to stall:**

```YAML
## **LOOK FOR THIS LINE IN mojaloop/values.yaml CONFIG FILE**
mojaloop-simulator:
  ingress:
   ## nginx ingress controller >= v0.22.0 <-- **COMMENT THE FOLLOWING THREE LINES BELOW:**
   # annotations: <-- COMMENTED
   #  nginx.ingress.kubernetes.io/rewrite-target: '/$2' <-- COMMENTED
   # ingressPathRewriteRegex: (/|$)(.*) <-- COMMENTED
   ## nginx ingress controller < v0.22.0 <-- **UNCOMMENT THE FOLLOWING THREE LINES LOW:**
   annotations:
     nginx.ingress.kubernetes.io/rewrite-target: '/'
   ingressPathRewriteRegex: "/"
```

**Note: This is NOT necessary if you are installing Mojaloop v13.x or newer.**

### 1.3. Docker Desktop Kubernetes support for Mojaloop v13.x - v14.0.x

If you are installing Mojaloop `v13.x` - `v14.0.x`, on Windows or MacOS, it is recommend that you install [Docker Desktop v4.2.0](https://docs.docker.com/desktop/release-notes/#420) version as it comes packaged with Kubernetes v1.21.5 which meets Mojaloop `v13.x` - `v14.0.x` version which matches [Deployment Guide (1. Pre-requisites)](README.md#1-pre-requisites) recommendations.

### 1.4. Mojaloop Helm release v10.x or less does not support Kubernetes v1.16 or greater

#### 1.4.1 Description

_Note: This is only applicable to Mojaloop Helm v10.x or less release._

When installing mojaloop helm charts, the following error occurs:

```log
Error: validation failed: [unable to recognize "": no matches for kind "Deployment" in version "apps/v1beta2", unable to recognize "": no matches for kind "Deployment" in version "extensions/v1beta1", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta2", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta1"]
```

#### 1.4.2 Reason
  
In version 1.16 of Kubernetes breaking change has been introduced (more about it [in "Deprecations and Removals" of Kubernetes release notes](https://kubernetes.io/docs/setup/release/notes/#deprecations-and-removals). The  Kubernetes API versions `apps/v1beta1` and `apps/v1beta2`are no longer supported and  and have been replaced by `apps/v1`.

Mojaloop helm charts v10 or less refer to deprecated ids, therefore it's not possible to install v10- on Kubernetes version above 1.15 without manually modification.

Refer to the following issue for more info: [mojaloop/helm#219](https://github.com/mojaloop/helm/issues/219)

#### 1.4.3 Fixes
  
Ensure that you are deploying Mojaloop Helm charts v10.x or less on v1.15 of Kubernetes.

#### 1.4.4 Additional details for `microk8s` fix

Refer to the following section for more information on how to install the desired Kubernetes version: [Mojaloop Setup for Linux (Ubuntu) - 2.1. MicroK8S](./local-setup-linux.md#21-microk8s).

## 2. Deployment issues

### 2.1. `ERR_NAME_NOT_RESOLVED` Error

#### 2.1.1 Description

The following error is displayed when attempting to access an end-point (e.g. central-ledger.local) via the Kubernetes Service directly in a browser: `ERR_NAME_NOT_RESOLVED`

#### 2.1.2 Fixes

1. Verify that that Mojaloop was deployed by checking that the helm chart(s) was installed by executing:

   ```bash
   helm list
   ```

   If the helm charts are not listed, see the [Deployment Guide - 5.1. Mojaloop Helm Deployment](./README.md#51-mojaloop-helm-deployment) section to install a chart.

2. Ensure that all the Mojaloop Pods/Containers have started up correctly and are available through the Kubernetes dashboard.

3. Note that the Mojaloop deployment via Helm can take a few minutes to initially startup depending on the system's available resources and specification. It is recommended that you wait at least 10m for all Pods/Containers to self heal before troubleshooting.
  
### 2.3. MicroK8s - Connectivity Issues

#### 2.3.1 Description

My pods can’t reach the internet or each other (but my MicroK8s host machine can).

An example of this is that the Central-Ledger logs indicate that there is an error with the Broker transport as per the following example:

```log
2019-11-05T12:28:10.470Z - info: Server running at: 
2019-11-05T12:28:10.474Z - info: Handler Setup - Registering {"type":"prepare","enabled":true}!
2019-11-05T12:28:10.476Z - info: CreateHandler::connect - creating Consumer for topics: [topic-transfer-prepare]
2019-11-05T12:28:10.515Z - info: CreateHandler::connect - successfully connected to topics: [topic-transfer-prepare]
2019-11-05T12:30:20.960Z - error: Consumer::onError()[topics='topic-transfer-prepare'] - Error: Local: Broker transport failure)
```

#### 2.3.2 Fixes

Make sure packets to/from the pod network interface can be forwarded to/from the default interface on the host via the iptables tool. Such changes can be made persistent by installing the iptables-persistent package:

```bash
sudo iptables -P FORWARD ACCEPT
sudo apt-get install iptables-persistent
```

or, if using ufw:

```bash
sudo ufw default allow routed
```

The MicroK8s inspect command can be used to check the firewall configuration:

```bash
microk8s.inspect
```

## 3. Ingress issues

### 3.1. Ingress rules are not resolving for Nginx Ingress v0.22 or later when installing Mojaloop Helm v12.x or less

#### 3.1.1 Description

_Note: This is only applicable to Mojaloop Helm v12.x or less release._

Ingress rules are unable to resolve to the correct path based on the annotations specified in the [values.yaml](https://github.com/mojaloop/helm/blob/v12.0.0/mojaloop/values.yaml) configuration files when using Nginx Ingress controllers v0.22 or later.

This is due to the changes introduced in Nginx Ingress controllers that are v0.22 or later as per the following link: https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.

#### 3.1.2 Fixes

Make the following change to Ingress annotations (from --> to) in the values.yaml files:

```yaml
nginx.ingress.kubernetes.io/rewrite-target: '/'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/$1'
```

### 3.2. Ingress rules are not resolving for Nginx Ingress earlier than v0.22

#### 3.2.1 Description

Ingress rules are unable to resolve to the correct path based on the annotations specified in the [values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml) configuration files when using Nginx Ingress controllers that are older than v0.22.

This is due to the changes introduced in Nginx Ingress controllers that are v0.22 or later as per the following link: https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.

#### 3.2.2 Fixes

Make the following change to all Ingress annotations (from --> to) in each of the values.yaml files:
  
```yaml
nginx.ingress.kubernetes.io/rewrite-target: '/$1'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/'
```
