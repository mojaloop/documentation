# Deployment Troubleshooting

## 1. Deployment issues

### 1.1. MicroK8s - helm init connection refused

#### Description

The helm init:

   ```bash
   helm init
   ```

fails with error when installing locally on `microk8s`:

   ```
   Error: error installing: Post http://localhost:8080/apis/apps/v1/namespaces/kube-system/deployments: dial tcp 127.0.0.1:8080: connect: connection refused
   ```
   
#### Potential reason

This may be a missing  `~/.kube/config` file, where helm looks for connection details.

#### Fix

One of the solutions is to generate that file by issuing:

   ```bash
   microk8s.kubectl config view --raw > $HOME/.kube/config
   ```

### 1.2. Installation of mojaloop helm charts fail with "validation failed"

#### Description
   When installing mojaloop helm charts, for example with command:

   ```bash
   helm --namespace demo --name moja install mojaloop/mojaloop
   ```

   the following error occurs:

   ```
   Error: validation failed: [unable to recognize "": no matches for kind "Deployment" in version "apps/v1beta2", unable to recognize "": no matches for kind "Deployment" in version "extensions/v1beta1", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta2", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta1"]
   ```

#### Reason
  
In version 1.16 of Kubernetes breaking change has been introduced (more about it [in "Deprecations and Removals" of Kubernetes release notes](https://kubernetes.io/docs/setup/release/notes/#deprecations-and-removals). The `apps/v1beta1` and `apps/v1beta2`are no longer supported and `apps/v1` should be used instead.

Currently mojaloop helm charts (as for v8.4.0) refer to deprecated ids, therefore it's not possible to install current mojaloop charts on Kubernetes version above 1.15 without manually changing charts.

#### Fixes
  
2 fixes are available:
  
  1. Use v1.15 of Kubernetes (or microk8s when working locally).
  2. Adjust charts manually.

_Note: The new updated charts are expected to be deployed soon._

#### Additional details for `microk8s` fix

To check version of `microk8s`:
   ```bash
   snap info microk8s
   ```
_Note: Look at the end of the output for a row starting with "installed"_

To install most recent supported version:
   ```bash
   snap refresh microk8s --channel=1.15/stable --classic
   ```

### 1.3. `ERR_NAME_NOT_RESOLVED` Error

#### Description

The following error is displayed when attempting to access an end-point (e.g. central-ledger.local) via the Kubernetes Service directly in a browser: `ERR_NAME_NOT_RESOLVED`
    
#### Fixes
    
  * Verify that that Mojaloop was deployed by checking that the helm chart(s) was installed by executing:
   
      ```bash
      helm list
      ```

    If the helm charts are not listed, see the [Helm Chart Installation](README.md#4-helm) section to install a chart.
    
  * Ensure that all the Mojaloop Pods/Containers have started up correctly and are available through the Kubernetes dashboard.
  
  * Note that the Mojaloop deployment via Helm can take a few minutes to initially startup depending on the system's available resources and specification. It is recommended that you wait at least 10m for all Pods/Containers to self heal before troubleshooting.
  
### 1.4. MicroK8s - Connectivity Issues

#### Description

My pods can’t reach the internet or each other (but my MicroK8s host machine can). 

An example of this is that the Central-Ledger logs indicate that there is an error with the Broker transport as per the following example:
```
2019-11-05T12:28:10.470Z - info: Server running at: 
2019-11-05T12:28:10.474Z - info: Handler Setup - Registering {"type":"prepare","enabled":true}!
2019-11-05T12:28:10.476Z - info: CreateHandler::connect - creating Consumer for topics: [topic-transfer-prepare]
2019-11-05T12:28:10.515Z - info: CreateHandler::connect - successfully connected to topics: [topic-transfer-prepare]
2019-11-05T12:30:20.960Z - error: Consumer::onError()[topics='topic-transfer-prepare'] - Error: Local: Broker transport failure)
```
    
#### Fixes
    
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


## 2. Ingress issues

### 2.1. Ingress rules are not resolving for Nginx Ingress v0.22 or later

#### Description

Ingress rules are unable to resolve to the correct path based on the annotations specified in the values.yaml configuration files when using Nginx Ingress controllers v0.22 or later.

This is due to the changes introduced in Nginx Ingress controllers that are v0.22 or later as per the following link: https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.
    
#### Fixes
    
  * Make the following change to all Ingress annotations (from --> to) in each of the values.yaml files:
  
    `nginx.ingress.kubernetes.io/rewrite-target: '/'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/$1'`
   

### 2.2. Ingress rules are not resolving for Nginx Ingress earlier than v0.22

#### Description

Ingress rules are unable to resolve to the correct path based on the annotations specified in the values.yaml configuration files when using Nginx Ingress controllers that are older than v0.22.

This is due to the changes introduced in Nginx Ingress controllers that are v0.22 or later as per the following link: https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.
    
#### Fixes
    
  * Make the following change to all Ingress annotations (from --> to) in each of the values.yaml files:
  
    `nginx.ingress.kubernetes.io/rewrite-target: '/$1'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/'`
