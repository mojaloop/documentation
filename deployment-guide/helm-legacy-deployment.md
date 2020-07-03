# Mojaloop Deployment with (Deprecated) Helm v2

_Note: It is recommended that you upgrate from Helm v2 to v3 as v2 is at end-of-life. Refer to legacy instruction for [Helm v2](./helm-legacy-deployment.md). Please refer to the [Helm v2 to v3 Migration Guide](./helm-legacy-migration.md)._

This document exists for legacy purposes and describes how to install Mojaloop using Helm v2. Refer to the [Design Authority issue #52](https://github.com/mojaloop/design-authority/issues/52) for more information.

## Deployment and Setup

#### 4.1. Helm v2 configuration

1. Config Helm CLI and install Helm Tiller on K8s cluster:
   ```bash
   helm init
   ```
   _Note: if `helm init` fails with `connection refused error`, refer to [troubleshooting](./deployment-troubleshooting.md#helm_init_connection_refused)_

2. Validate Helm Tiller is up and running. _Windows replace `grep` with `findstr`_:
   ```bash
   kubectl -n kube-system get po | grep tiller
   ```

3. Add mojaloop repo to your Helm config (optional). _Linux use with sudo_:
   ```bash
   helm repo add mojaloop http://mojaloop.io/helm/repo/
   ```
   If the repo already exists, substitute 'add' with 'apply' in the above command.

4. Add the additional dependency Helm repositories. This is needed to resolve Helm Chart dependencies required by Mojaloop charts. Linux use with sudo;
   ```bash
   helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
   helm repo add kiwigrid https://kiwigrid.github.io
   helm repo add elastic https://helm.elastic.co
   ```

5. Update helm repositories. _Linux use with sudo_:
   ```bash
   helm repo update
   ```

### 5. Mojaloop

#### 5.1. Mojaloop Helm v2 Deployment

1. Install Mojaloop:

   Default installation:
   ```bash
   helm --namespace demo --name moja install mojaloop/mojaloop
   ```
   
   Version specific installation:
   ```bash
   helm --namespace demo --name moja install mojaloop/mojaloop --version {version}
   ```
   
   List of available versions:
   ```bash
   helm search -l mojaloop/mojaloop
   ```
   
   Custom configured installation:
   ```bash
   helm --namespace demo --name moja install mojaloop/mojaloop -f {custom-values.yaml}
   ```
   _Note: Download and customize the [values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml). Also ensure that you are using the value.yaml from the correct version which can be found via [Helm Releases](https://github.com/mojaloop/helm/releases)._
