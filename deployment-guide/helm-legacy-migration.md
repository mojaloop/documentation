# Migration from Helm v2 to v3

_Note: It is recommended that you upgrate from Helm v2 to v3 as v2 is at end-of-life. Refer to [Deployment with (Deprecated) Helm v2](./helm-legacy-deployment.md) if you still require information on using Helm v2._

This document provides instructions on how to migrate existing Mojaloop installations from Helm v2 to v3, and is based of the official Helm ([Migrating Helm v2 to v3](https://helm.sh/docs/topics/v2_v3_migration/)) document.

## Deployment and Setup

#### 1. Helm configuration

1. Install Helm v3

   Follow the [Installation Helm](https://helm.sh/docs/intro/install/) documentation to download and install Helm v3, but ensure to rename to binary as `helm3` before storing it in your path (i.e. on linux moving it to the `usr/local/bin` folder). This will ensure that the existing Helm v2 binary is still accessible.

2. Validate that Helm3 has been installed correctly
   Run the following command to ensure that it is functioning:
   ```bash
   $ helm3 repo list
   Error: no repositories to show
   ```
   You should receive the following response `Error: no repositories to show` which is expected, and indicates that the Helm3 binary is working.

3. Install the `helm-2to3` plugin
   ```bash
   helm3 plugin install https://github.com/helm/helm-2to3
   ```

   Run the following command to confirm the plugin installation:
   ```bash
   $ helm3 plugin list
   NAME  	VERSION	DESCRIPTION
   2to3  	0.2.0  	migrate and cleanup Helm v2 configuration and releases in-place to Helm v3
   ```

4. Backup your exisitng Helm v2 data

   Make a copy of your existing `~/.helm` directory as the next (`move`) command will cause your Helm v2 configuration to be no longer available.

5. Run the following commands to migrate your existing local configuration

   Try run a `dry-run` to ensure that everything looks fine:
   ```bash
   helm3 2to3 move config --dry-run
   ```

   Assuming that there are no errors, you can proceed with the following command:
   ```bash
   helm3 2to3 move config
   ```

   Run the following to ensure that the configuration was properly migrated, and your prviously Helm v2 configured repo config is shown:
   ```bash
   $ helm3 repo list
   NAME            URL
   stable          https://kubernetes-charts.storage.googleapis.com
   local           http://127.0.0.1:8879/charts
   incubator       http://storage.googleapis.com/kubernetes-charts-incubator
   kiwigrid        https://kiwigrid.github.io
   elastic         https://helm.elastic.co
   kiwigrid        https://kiwigrid.github.io
   bitnami         https://charts.bitnami.com/bitnami
   mojaloop        http://mojaloop.io/helm/repo/
   ```

#### 2. Migrating Helm Installations

   
   ```bash
   $ helm list

   NAME    	REVISION	UPDATED                 	STATUS  	CHART           	APP VERSION	NAMESPACE
   moja	1       	Thu Nov 14 15:01:00 2019	DEPLOYED	mojaloop-10.4.0	v10.4.0     	demo
   ```

   Dry-run the migration command to validate that everything looks fine:
   ```bash
   $ helm3 2to3 convert --dry-run moja
   2019/11/14 15:03:17 NOTE: This is in dry-run mode, the following actions will not be executed.
   2019/11/14 15:03:17 Run without --dry-run to take the actions described below:
   2019/11/14 15:03:17
   2019/11/14 15:03:17 Release "moja" will be converted from Helm v2 to Helm v3.
   2019/11/14 15:03:17 [Helm 3] Release "moja" will be created.
   2019/11/14 15:03:17 [Helm 3] ReleaseVersion "moja.v1" will be created.
   ```

   Run the migration command:
   ```bash
   $ helm3 2to3 convert moja
   2019/11/14 15:03:57 Release "moja" will be converted from Helm v2 to Helm v3.
   2019/11/14 15:03:57 [Helm 3] Release "moja" will be created.
   2019/11/14 15:03:57 [Helm 3] ReleaseVersion "moja.v1" will be created.
   2019/11/14 15:03:57 [Helm 3] ReleaseVersion "moja.v1" created.
   2019/11/14 15:03:57 [Helm 3] Release "moja" created.
   2019/11/14 15:03:57 Release "moja" was converted successfully from Helm v2 to Helm v3.
   2019/11/14 15:03:57 Note: The v2 release information still remains and should be removed to avoid conflicts with the migrated v3 release.
   2019/11/14 15:03:57 v2 release information should only be removed using `helm 2to3` cleanup and when all releases have been migrated over.
   ```

   Optionaly add `--delete-v2-releases` to the above command if you do not wish to retain the release information for the existing Helm v2 installation. This can be cleaned up later using the `helm3 2to3 cleanup`.

   Validate that the migration was successful:
   ```bash
   $ helm list
   NAME    	REVISION	UPDATED                 	STATUS  	CHART           	APP VERSION	NAMESPACE
   moja	1       	Thu Nov 14 15:01:00 2019	DEPLOYED	mojaloop-10.4.0	v10.4.0     	demo

   $ helm3 list -n demo
   NAME    	NAMESPACE	REVISION	UPDATED                             	STATUS  	CHART           	APP VERSION
   moja	demo 	1       	2019-11-14 13:01:00.188487 +0000 UTC	deployed	mojaloop-10.4.0	10.4.0
   ```

#### 3. Cleanup

   This section will show you how to remove Tiller and any existing configuration or metadata from existing Helm v2 deployments.

   _NOTE: This may impact any Helm v2 deployments that have not been migrated. It is recommended that you only run these commands if you have migrated all existing Helm v2 to v3 deployments!_

   ```bash
   $ helm3 2to3 cleanup --dry-run
   2019/11/14 15:06:59 NOTE: This is in dry-run mode, the following actions will not be executed.
   2019/11/14 15:06:59 Run without --dry-run to take the actions described below:
   2019/11/14 15:06:59
   WARNING: "Helm v2 Configuration" "Release Data" "Release Data" will be removed.
   This will clean up all releases managed by Helm v2. It will not be possible to restore them if you haven't made a backup of the releases.
   Helm v2 may not be usable afterwards.

   [Cleanup/confirm] Are you sure you want to cleanup Helm v2 data? [y/N]: y
   2019/11/14 15:07:01
   Helm v2 data will be cleaned up.
   2019/11/14 15:07:01 [Helm 2] Releases will be deleted.
   2019/11/14 15:07:01 [Helm 2] ReleaseVersion "moja.v1" will be deleted.
   2019/11/14 15:07:01 [Helm 2] Home folder "/Users/user/.helm" will be deleted.
   ```

   This will show a list of all what will be removed & deleted during the cleanup process:
   - Tiller service to be removed from kube-system namespace
   - Remote Helm v2 deployments
   - Local Helm v2 home configuration folder will be deleted

   If you are happy to proceed run the following command:
   ```bash
   helm3 2to3 cleanup
   ```
   
   If you no longer require Helm v2:
   - Uninstall Helm v2 from your local system
   - Rename the `helm3` binary to `helm`
