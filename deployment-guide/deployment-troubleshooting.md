# Deployment Troubleshooting

## 1. Deployment issues

### 1.1. `ERR_NAME_NOT_RESOLVED` Error

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
  
### 1.2. MicroK8s - Connectivity Issues

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
