# IaC Deployment Guide

## IaC in the context of Mojaloop

Mojaloop provides IaC code to facilitate the provisioning and deploying of Mojaloop resources. While the code provided is specific to certain use cases, it can be reused and customised to fit individual needs (for example, cloud versus on-premise deployments).

Mojaloop IaC code:

- Provides cloud-agnostic Infrastructure as Code (IaC) to be used in provisioning Kubernetes (K8s) clusters for use as Mojaloop Switches and/or Payment Managers.
- Automatically enables the use of a Control Center in a secure fashion. <!-- EDITORIAL COMMENT: Cross-reference a resource that describes what the Control Center is. -->
- Provides modules for the following:
   - Automated GitOps-style provisioning of separate clusters dedicated to Mojaloop and Payment Manager for Mojaloop (PM4ML), respectively, via the use of reusable open-source modules.
   - A Vault instance to securely store configuration secrets as well as manage PKI configuration for mutual TLS enabled endpoints.
   - Automatically configured OIDC access control.
   - Wireguard mesh routes that provide the ability for individual clusters to securely reach private Control Center services and that also provide operator access to the clusters.
   - Automated handling of DNS/TLS termination for all public and private endpoints.
   - Various components such as Mojaloop Connection Manager (MCM) and an IAM stack to provide access control for Mojaloop services.
   - Database configuration that is specified at deployment time in order to allow the operator to choose in-cluster versus managed services for MySQL, Kafka, Postgresql and MongoDB.
- Provides High Availability and Disaster Recovery capabilities via the use of Kubernetes best practices.

## Overview of Mojaloop IaC-based deployment

<!-- The following figure provides a high-level overview of the Mojaloop IaC deployment process (a concrete example).

![Mojaloop IaC sequence](assets/diagrams/iacDeployment/mojaloop_iac_sequence.png) -->

<!-- Diagram source file: https://app.diagrams.net/#G1YEjT1fDGisr1v6jujAEztCXND1eh50gS#%7B%22pageId%22%3A%22D1AxLu6UM391d6UU7Rue%22%7D -->

Mojaloop and PM4ML are cloud-native applications that are designed to run on top of Kubernetes (K8s). Both applications leverage similar capabilities in terms of databases, ingress control, Public Key Infrastructure (PKI) requirements for mTLS, and so on. Thus, we reuse the same infrastructure as code and extend it with slight modifications for the 2 scenarios. There is also the ability to run both Mojaloop and PM4ML in the same cluster for development purposes.

**NOTE:** PM4ML is a tool for Digital Financial Service Provider (DFSP) participants, so the question might arise as to why it could be relevant in the context of Switch deployment. PM4ML can be run as part of simulating DFSPs, for testing purposes.

To deploy the Mojaloop and PM4ML environment clusters, the following tools are used:

- **Ansible**: A tool used for provisioning software repeatedly and idempotently via the use of playbooks that make use of reusable roles. These roles leverage modules that are executed on a virtual machine or bare-metal host via an ssh client. The main role of Ansible is to bootstrap the hosts used by the infrastructure with the prerequisites needed to run Kubernetes and initialise ArgoCD.
- **Terraform/Terragrunt**: This tool is used to provision resources via CRUD API calls. These resources range from the creation of network resources, whole K8s clusters, managed databases or the creation of an OIDC application in an identity management solution, and so on.
- **Helm**: A package management tool used to render K8s charts, which are groups of Kubernetes templates.
- **Kustomize**: A tool used to manipulate and render K8s templates, including Helm charts.
- **ArgoCD**: A tool used to deploy artifacts that are rendered via Helm and/or Kustomize to a K8s cluster and maintain the deployed state against a source of truth for the cluster, which is generated from multiple tagged git repositories in concert with environment-specific configuration values that are injected using custom ArgoCD plugins.

<!-- ### PLACEHOLDER: Target infrastructure

What does Mojaloop IaC code deploy? The following table provides an overview of the various components that Mojaloop IaC provides code for. The code is platform agnostic, you have the ability to run the building blocks of your deployment on any cloud provider or bare-metal.

(placeholder...) -->

## Deployment how-to

### Deploying the Control Center

This section provides comprehensive instructions for deploying the Mojaloop Control Center, a centralized management platform that orchestrates multiple Mojaloop environments. The Control Center provides integrated CI/CD pipelines, monitoring, security, and infrastructure management capabilities through a GitOps-driven architecture.

The Control Center deployment consists of:

- A Kubernetes cluster running on AWS infrastructure
- Integrated services including GitLab, ArgoCD, Vault, and monitoring tools
- Multi-tenant environment support with isolated namespaces
- Automated certificate management and DNS configuration

#### Control Center: Prerequisites

Before beginning the deployment, ensure you have the following in place.

##### AWS account access

- Administrative privileges or IAM user with sufficient permissions <!-- EDITORIAL COMMENT: Shall we list those permissions?  -->
- AWS CLI configured with appropriate credentials <!-- EDITORIAL COMMENT: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html + set up an access key for AWS cli via console > profile > Security Credentials. After that: `aws configure` + https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html-->
- Minimum service quotas:
  - vCPU limit: 64 (for m5.4xlarge instances)
  - Elastic IPs: 5
  - VPCs: 1 additional

##### Local development environment

- SSH client with key management capabilities
- Terminal with bash shell support
- Text editor for configuration files

##### Network requirements

- Available domain name for the Control Center
- Access to DNS management (Route53 or external provider)

#### Control Center: Prepare the infrastructure

##### Create SSH key pair

Generate an SSH key pair for secure access to the Control Center infrastructure.

1. Create the key pair through the AWS EC2 console or CLI.

   For details, see: [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html)

   Choose a meaningful name for your key pair. In the example below, the key pair is called: `ml-ccu-host-private-key`

1. Save the private key securely on your local machine, and set the permissions so that only you can read your private key file:

   ```bash
   # Store the private key
   mkdir -p ~/.ssh
   vi ~/.ssh/ml-ccu-host-private-key

   # Paste your private key content (ensure proper formatting)
   # The key should begin with -----BEGIN RSA PRIVATE KEY-----
   # and end with -----END RSA PRIVATE KEY-----

   # Set appropriate permissions
   chmod 400 ~/.ssh/ml-ccu-host-private-key
   ```

##### Configure AWS IAM

1. Create the required IAM group for Control Center operations through the AWS EC2 console or CLI. For details, see: [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_create.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_create.html)

   Note that in the example below, `mojaiac` is an existing IAM user.

   ```bash
   # Create the IAM group
   aws iam create-group \
   --group-name iac_admin \
   --profile mojaiac
   ```

1. Attach policies.

   ```bash
   # Attach administrator access policy
   aws iam attach-group-policy \
   --group-name iac_admin \
   --policy-arn arn:aws:iam::aws:policy/AdministratorAccess \
   --profile mojaiac
   ```

##### Provision build server

Deploy a dedicated VM to host the Control Center utility container. This will serve as the "build server". This build server can be re-used for any future deployments.

VM specifications:

- **Instance Type**: t3.medium
- **Operating System**: Ubuntu 24.04 LTS
- **Storage**: 16 GiB root volume (expandable as needed)
- **Security Group**: Allow SSH (port 22) from your IP (If you're launching the VM instance via the AWS console (**EC2 > Instances > Launch instance**), choose **My IP** in the drop-down menu.) <!-- EDITORIAL COMMENT: Allow SSH traffic from -> Anywhere -->
<!-- - **Network**: Public subnet with Elastic IP EDITORIAL COMMENT: I haven't found the Elastic IP option in the GUI. -->
- **Authentication**: SSH key created earlier in section [Create SSH key pair](#create-ssh-key-pair)

Once the instance has been launched, record the public IP address, it will be needed when you ssh to the VM (next step).

#### Control Center: Deploy build server

##### Initial system configuration

Connect to the build server and perform initial setup:

1. Connect to your build server VM via ssh:

   ```bash
   # Connect via SSH
   ssh -i ~/.ssh/ml-ccu-host-private-key ubuntu@<PUBLIC_IP_ADDRESS>
   ```

1. Update system packages:

   ```bash
   # Switch to root user
   sudo su

   # Update system packages
   apt-get update && apt-get upgrade -y
   ```

##### Install Docker

1. Install Docker and the unzip tool:

   ```bash
   sudo apt-get install -y docker.io unzip
   ```

<!-- Is this step needed? 1. exit -->

1. Start the Docker service:

   ```bash
   sudo systemctl start docker
   ```

1. Set Docker to start automatically every time the system boots (so there is no need to manually start it each time):

   ```bash
   sudo systemctl enable docker
   ```

1. Add your current user to the **docker** group (this will let you run Docker commands without needing `sudo` each time):

   ```bash
   sudo usermod -aG docker $USER
   ```

##### Install AWS CLI

1. Download the AWS CLI (version 2) installer for 64-bit Linux (and save the downloaded file under the name `awscliv2.zip`).

   ```bash
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   ```

1. Extract the contents of the ZIP file:

   ```bash
   unzip awscliv2.zip
   ```

1. Run the AWS CLI installer:

   ```bash
   sudo ./aws/install
   ```

##### Refresh and configure Docker

1. Refresh your current shell session so that your new group membership (the **docker** group) takes effect immediately:

   ```bash
   newgrp docker
   ```

1. Add your current user to the docker group:

   ```bash
   sudo gpasswd -a $USER docker
   ```

The build server is now ready.

##### Set AWS credentials

Set AWS credentials so the first `terragrunt apply` can use those credentials to build the AWS infrastructure.

1. Put your key ID, access key, and session token in `~/.aws/credentials`:

   **NOTE:** You only have to use a session token if your AWS account is set up to use MFA.

   ```bash
   vi ~/.aws/credentials
   ```

   Configure the following:

   ```bash
   [oss] 
   aws_access_key_id = <YOUR_ACCESS_KEY_ID>
   aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
   aws_session_token = <YOUR_SESSION_KEY>
   ```

1. Set the profile:

   ```bash
   vi ~/.aws/config
   ```

   Configure the following:

   ```bash
   [profile oss]
   region = <YOUR_REGION>
   output = json
   ```

##### Install a terminal multiplexer

Install tmux to ensure long-running processes continue if the SSH connection drops:

```bash
apt install tmux
tmux -V  # Verify installation
```

#### Control Center: Set up the Control Center container

##### Optional but recommended: Create a tmux session

You are recommended to create a tmux session. What is the advantage of that? If you get disconnected from the VM, when you go back, the deployment will still be running.

```bash
tmux new -s <NAME_OF_YOUR_TMUX_SESSION>
```

##### Run Docker container

Once in the tmux session, run the Docker container.

Change `--name` and `--hostname` to be the name that you want to give to your Control Center.

```bash
docker run -t -d -v /home/ubuntu/.aws:/root/.aws --name <NAME_OF_YOUR_CONTROL_CENTER> --hostname <NAME_OF_YOUR_CONTROL_CENTER> --cap-add SYS_ADMIN --cap-add NET_ADMIN ghcr.io/mojaloop/control-center-util:6.1.2
```

Access the container:

```bash
docker exec -it <NAME_OF_YOUR_CONTROL_CENTER> bash
```

##### Configure and initialize the environment

1. Configure the environment.

   1. Go to the `iac-run-dir` folder:

      ```bash
      cd iac-run-dir/
      ```

   1. You are going to set some variables in the `setenv` file:

      ```bash
      vi setenv
      ```

   1. Specify which version of IaC you want to use (this needs to be determined before), for example (at the time of writing, v7.0.0-rc.119 is the recommended release and [tag](https://github.com/mojaloop/iac-modules/tags)): `IAC_TERRAFORM_MODULES_TAG=v7.0.0-rc.119`

1. Initialize the environment.

   1. Load the configuration:

      ```bash
      source setenv
      ```

   1. Run the initialization script:

      ```bash
      ./init.sh
      ```

   This will clone the **iac-modules** repository (at the tag specified) into the `iac-run-dir` folder.

#### Control Center: Deploy the Control Center

1. Access the Control Center deployment directory:

   ```bash
   cd /iac-run-dir/iac-modules/terraform/ccnew/
   ```

1. Now you are going to configure some Control Center parameters.

   Explore what can be configured in the `default-config` folder (anything that can be configured is in `default-config`). Then copy anything you wish to customise into the placeholder `cluster-config.yaml` file in the `custom-config` folder, and make your required changes. Anything you specify in `custom-config` will override `default-config`.

1. Open the placeholder custom configuration file for editing:

   ```bash
   vi custom-config/cluster-config.yaml
   ```

1. Configure the following parameters:

   - You need a unique **cluster_name** for your Control Center.
   - The **domain** name will be used for all the URLs (for example, the URLs of all the portals). URLs will contain both the **cluster_name** and the **domain**. For example, if your **cluster_name** is `control-center` and your **domain** is `acme.mojaloop.io`, then an example URL will be: `https://gitlab.control-center.acme.mojaloop.io`.
   - Ensure that the **cloud_region** reflects your AWS region.
   - The **iac_terraform_modules_tag** is the one you specified earlier.
   - The **ansible_collection_tag** is the latest tag here: [https://github.com/mojaloop/iac-ansible-collection-roles/tags](https://github.com/mojaloop/iac-ansible-collection-roles/tags)
   - **Tags** are useful for statistics and investigation purposes in AWS.

      ```yaml
      cluster_name:                             # Unique identifier for your Control Center 
      domain:                                   # Your domain name
      cloud_region:                             # AWS region for deployment
      iac_terraform_modules_tag: v7.0.0-rc.119  # IaC modules version
      ansible_collection_tag: v7.0.0-rc.86      # Ansible collection version
      vpc_cidr: 10.73.0.0/16

      enable_object_storage_backend: true 
      microk8s_dev_skip: false 
      k8s_cluster_module: eks 
      k8s_cluster_type: eks 
      private_dns_zone_id: "empty"
      tags:                                     # AWS resource tags
         Origin: Terraform 
         mojaloop/cost_center:                  #Ensure that you use an env tag that already exists <!-- EDITORIAL COMMENT: Where can we set that? -->
         mojaloop/env:                          #Ensure that you use an env tag that already exists <!-- EDITORIAL COMMENT: Where can we set that? -->
         mojaloop/owner: 
      nodes: 
      master-generic: 
         node_count: 3
      ```

1. Configure the `common-vars.yaml` file.

   Open the placeholder file for editing:

   ```bash
   vi custom-config/common-vars.yaml
   ```

   Configure the following:

   **NOTE:** Proxmox-related variables are not required for a cloud-based (AWS) deployment, so you can leave them as-is. Since they are configured to be required for all deployments, the dummy values specified below must be passed. Without the dummy values, the wrapper script that you are going to run in a subsequent step would fail.

   **NOTE:** Notice the comments next to the `mimir` values. The values that have been commented out represent the default values, together with a multiplier that is used to arrive at an optimized value. For example: the default value for `mimir_distributor_requests_cpu` is `500`, but we multiplied it by `0.7` to have the optimized value of `350`.

   **NOTE:** The value of `argocd_reconciliation_timeout` can differ based on the environment. By default, ArgoCD reconciles every 10 seconds, fetching the desired state from GitLab for comparison and applying changes if needed. In a dev environment where there are frequent changes, it is good practice to keep the timeout at the default value. However, in a prod environment where there are much fewer changes, the value of 5 minutes (specified below) is sufficient.

   ```yaml
   capi_cluster_proxmox_user: dummyuser 
   capi_cluster_proxmox_password: somepass 
   capi_cluster_proxmox_host_sshkey: key 
   capi_cluster_proxmox_url: url 

   zitadel_rdbms_provider: "rds"

   netbird_rdbms_provider: "rds"

   gitlab_postgres_rdbms_provider: "rds"

   nexus_memory_limit: "12Gi" 
   nexus_memory_request: "8Gi" 
   nexus_jvm_min_heap_size: "8192m" 
   nexus_jvm_max_heap_size: "10240m" 
   nexus_jvm_additional_memory_options: "-XX:MaxDirectMemorySize=1g" 
   nexus_jvm_additional_options: "-XX:+UseG1GC -XX:MaxGCPauseMillis=200"

   mimir_distributor_requests_cpu: "350m" # 500m  0.7
   mimir_distributor_requests_memory: "256Mi" mimir_distributor_limits_cpu: "525m" # 750m  0.7 
   mimir_distributor_limits_memory: "1Gi" 
   mimir_ingester_requests_cpu: "700m" # 1000m  0.7 
   mimir_ingester_requests_memory: "3Gi" 
   mimir_ingester_limits_cpu: "2800m" # 4000m  0.7 
   mimir_ingester_limits_memory: "8Gi" 
   mimir_querier_limits_cpu: "700m" # 1000m  0.7 
   mimir_querier_limits_memory: "4Gi" 
   mimir_query_frontend_limits_cpu: "140m" # 200m  0.7 
   mimir_query_frontend_limits_memory: "512Mi" 
   mimir_compactor_limits_cpu: "1050m" # 1500m  0.7 
   mimir_compactor_limits_memory: "3Gi" 
   mimir_store_gateway_limits_cpu: "140m" # 200m  0.7 
   mimir_store_gateway_limits_memory: "1Gi"
   mimir_ruler_limits_cpu: "700m" # 1000m  0.7 
   mimir_ruler_limits_memory: "2Gi" 
   mimir_alertmanager_limits_cpu: "70m" # 100m  0.7 
   mimir_alertmanager_limits_memory: "512Mi" 
   mimir_distributor_replica_count: "'3'" 

   argocd_reconciliation_timeout: "5m"
   ```

1. While still in the **custom-config** folder, export the same AWS secrets as environment variables.

   **NOTE:** If you do not use MFA, the session token is not required.

   <!-- >```bash
   export AWS_ACCESS_KEY_ID=accesskeyID
   export AWS_SECRET_ACCESS_KEY=accesskeySECRET
   export AWS_SESSION_TOKEN=sessionToken
   ``` -->

   ```bash
   export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
   export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
   export AWS_SESSION_TOKEN=<YOUR_SESSION_KEY>
   ```

1. Change directory (`cd`) to the **ccnew** folder.

1. Deploy the Control Center by executing the following script:

   ```bash
   ./wrapper.sh
   ```

   The wrapper will:

   1. Validate configuration files.
   1. Create the AWS infrastructure (VPC, subnets, instances).
   1. Deploy the Kubernetes cluster.
   1. Install and configure all Control Center services.
   1. Set up GitOps with ArgoCD.

1. Monitor the progress of the deployment process through the terminal. It takes around 45-60 minutes for the process to complete.

   The script will display status updates for each component:
      - In case you observe **failed attempts and retries**, keep waiting, sometimes it takes multiple retries for some components to be set up.
      - In case the process completes with **errors**, run `./wrapper.sh` again. On the next attempt, the errors might get resolved.

1. Once ArgoCD has been installed (in the terminal, you should see something like `TASK [mojaloop.iac.cc_k8s : Install argocd]`), wait a few minutes, and then you can start monitoring events in ArgoCD via port forwarding.

   1. Obtain the bastion IP address.
      1. Go to the AWS portal, **EC2 > Instances**, and click the instance whose name ends in **bastion**.
      1. Copy the Public IPv4 address.
   1. Obtain the ssh key.
      1. Open a new terminal.
      1. `docker exec` inside the Control Center container:

      ```bash
      `docker exec it <NAME_OF_YOUR_CONTROL_CENTER> bash`
      ```

      1. Change directory to:

      ```bash
      cd /tmp/output/k8s-deploy
      ```

      You will find the ssh key in there.

      1. Display the contents of the file named `sshkey`:

      ```bash
      cat sshkey
      ```

      1. Copy the ssh key.
      1. Paste the ssh key here (use a meaningful and descriptive folder name):

      ```bash
      vi ~/.ssh/<FOLDER_NAME>
      ```

      1. Change the permission of the file so that only you can read it:

      ```bash
      chmod 400 ~/.ssh/<FOLDER_NAME>
      ```

      1. Connect to the bastion via ssh:

      ```bash
      ssh -i ~/.ssh/<FOLDER_NAME> ubuntu@<BASTION_IP_ADDRESS>
      ```

      1. Exit the session to return to your local machine: `exit`

   1. Create a tunnel between your machine and the VM. Issue the following command on your machine:

      ```bash
      ssh -i .ssh/<NAME_OF_YOUR_CONTROL_CENTER> -L 8082:127.0.0.1:8445 ubuntu@<bastion-ip-address>
      ```

   1. Export the kubeconfig:

      ```bash
      sudo su
      export KUBECONFIG=/root/.kube/kubeconfig
      ```

   1. Test if you have set `kubeconfig` successfully by issuing: `kubectl get ns`. If it gives you a list of nodes, then you can move on to the next step.
   1. Get the secret for ArgoCD:

      ```bash
      kubectl -n argocd get secret argocd-initial-admin-secret \
      -o jsonpath="{.data.password}" | base64 --decode; echo
      ```

      Save the password that is returned, you will need it in the next step.

   1. Port forward using the password obtained in the previous step:

      ```bash
      kubectl -n argocd port-forward svc/argocd-server 8445:80 --address 127.0.0.1
      ```

   1. In your browser, open: `http://localhost:8082`
      This should open ArgoCD in your browser.

   1. Log in using the following credentials:

      username: admin
      password: <THE_PASSWORD_THAT_YOU_HAVE_JUST_COPIED>

   1. Observe how your applications are progressing. You can click **root-deployer** to have an overview of the status of each application. The root-deployer deploys the applications as per the configured sync waves (the order of waves has been set up so that dependencies are deployed first).

1. Once the wrapper script has run successfully, the Terraform state will be in the container so you need to push the state to the new system (the Kubernetes cluster):

   `./movestatetok8s.sh`

   This enables team collaboration and state persistence within the Control Center.

You are now done deploying the Control Center.

#### Control Center: Post-deployment configuration

##### Zitadel: Set up a user account for all portals

All Control Center services (GitLab, ArgoCD, Grafana, Vault, and so on) use Zitadel for Single Sign-On (SSO). Once you create your user account in Zitadel, you will use the same credentials to access all portals.

1. Access Zitadel.

   You can access Zitadel via your browser, no VPN connection is required. The URL will be in this format: `https://zitadel.<cluster_name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

   For login, use the default credentials:

   - Username: `rootauto@zitadel.zitadel.<cluster_name>.<domain>`
   - Password: `#Password1!`

1. Follow the on-screen prompts and enable two-factor authentication.

1. Follow the on-screen prompts and change your password.

1. Create a user account with a strong password. You can do this via the **User** menu >> **New** button.

   Select the **Email verified** and **Set Initial Password** checkboxes to speed up the process.

   <!-- ![Zitadel: Create user](assets/screenshots/iacDeployment/001_cc_zitadel_create_user.png) -->

1. Grant appropriate permissions to this new user via the **Authorizations** menu:

   <!-- ![Zitadel: Grant permissions to new user 01](assets/screenshots/iacDeployment/002_cc_zitadel_grant_authorizations_1.png) -->

   1. Click **New**.

      <!-- ![Zitadel: Grant permissions to new user 02](assets/diagrams/iacDeployment/002_cc_zitadel_grant_authorizations_2.png) -->

   1. Click the **Project name** field. You will see a list of available projects: ZITADEL, grafana, vault, argocd, k8s, Nebird, gitlab.
   1. Select one of the projects, and click **Continue**.
   1. Select all the roles, and click **Save**.
   1. Repeat the steps above (Step5.1 - Step 5.4) for each of the projects.

1. Log out of Zitadel, clicking the **Logout All Users** button.

1. Log back in with the new user. (Follow the prompts to set up 2FA and change the password.)

##### Netbird: Set up VPN access to services

1. Go to the NetBird dashboard: `https://netbird-dashboard.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. On the login page, log in with your new user.

1. You will be prompted to install the NetBird client.

   <!-- ![Nebird: Install Netbird client](assets/screenshots/iacDeployment/003_cc_download_netbird_linux.png) -->

1. Retrieve the Management URL shown on the dashboard.

1. Open the client that you have just installed, and go to **Settings > Advanced Settings**.

1. Specify the **Management URL**, then click **Save**.

1. Establish a VPN connection.

   1. Open the NetBird client and click **Connect**.
   1. On the Zitadel SSO login page, use the credentials of the new non-root you have just set up in Zitadel.
   1. Follow the on-screen prompts.

Once you've connected, you can access all the portals.

##### GitLab: Set up two-factor authentication

1. Navigate to: `https://gitlab.<cluster_name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. To log in, select the **Zitadel** button.

1. When prompted to select an account, select your non-root user account.

1. Wait until GitLab prompts you to set up two-factor authentication.

   Note that you will not see any projects until you set up two-factor authentication.

1. Enable two-factor authentication for enhanced security, following the prompts to set up 2FA.

   <!-- ![GitLab: Enable two-factor authentication](assets/screenshots/iacDeployment/004_cc_gitlab_2factor.png) -->

1. Once done, go to **Groups** (left-hand menu) and choose **iac**.

   1. Click **bootstrap**. Under **custom-config**, you will find the values that you configured previously (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).
   1. In the **iac** group, you will also find two other environments, they act as templates and are empty. They will be automatically deleted once you have created your first environment.

##### Vault: Verify if secret paths are accessible

1. Go to: `https://vault.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

1. On the login page, select **Method: OIDC**, click **Sign in with OIDC Provider**, then in the window that pops up, choose your new user. <!-- EDITORIAL COMMENT: techops-admin -->

   <!-- ![Vault login](assets/screenshots/iacDeployment/006_vault_signin.png) -->

1. Verify if secret paths are accessible: under **Secret engines**, select **secret/**. You should see a list of secrets for various applications, such as GitLab, Grafana, Mimir, and so on.

   <!-- ![Vault secrets](assets/screenshots/iacDeployment/007_vault_secrets.png) -->

##### Grafana: Review dashboards and set up alerts

1. Go to: `https://grafana.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. On the login page, click the **Sign in with Zitadel** button and select your new user.

1. Review pre-configured dashboards. <!-- EDITORIAL COMMENT: Is there any? -->

1. Set up alert channels if required.

##### ArgoCD: Verify if all services are operational

1. Go to: `https://argocd.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

1. On the login page, click the **Sign in with Zitadel** button, and select your new user.

1. Check the status of all applications, verify that they are healthy.

The Control Center is now fully up and running.

### Deploying the Mojaloop Switch environment

This section provides instructions for deploying a Mojaloop Switch environment using the Control Center's GitOps infrastructure. The Switch environment serves as the central hub for processing financial transactions between Digital Financial Service Providers (DFSPs).

The Switch deployment consists of:

- Kubernetes cluster with Mojaloop core services
- Identity and access management with Keycloak
- Monitoring and observability stack
- Testing toolkit for validation
- Management portals for operations

The deployment utilizes:

- GitLab CI/CD pipelines for automation
- Terragrunt/Terraform for infrastructure provisioning
- ArgoCD for GitOps-based application deployment
- Vault for secrets management

#### Mojaloop Switch: Prerequisites

Before beginning the deployment, ensure you have the following in place.

##### Control Center access

- Active user account in Zitadel
- Access to Control Center GitLab
- VPN connection via Netbird
- Appropriate RBAC permissions

##### AWS resources

- AWS IAM user with deployment permissions
- Access key ID and secret access key
- Sufficient service quotas in target region

##### Tools and software

<!-- EDITORIAL COMMENT: Double-check if these are all needed-->
- kubectl CLI installed
- kubelogin for OIDC authentication
- Web browser for GitLab Web IDE access

##### Operator knowledge

Operators should be familiar with:

- Kubernetes operations
- GitLab CI/CD pipelines
- Mojaloop architecture
- YAML configuration syntax

#### Mojaloop Switch: Initialize the bootstrap environment

Deploying the Switch environment is done in GitLab.

The **iac/bootstrap** environment is present by default, this is the main project of the Control Center.

The deployment of the Switch follows a similar pattern to that of the Control Center.

1. In GitLab, go to **Projects**, click **iac/bootstrap/custom-config**.

1. Create a new file called `environment.yaml`.

   Add the following as the content of the file:

   ```yaml
   environments:
      - <NAME_OF_YOUR_PM4ML_ENVIRONMENT>
      - <NAME_OF_YOUR_SWITCH_ENVIRONMENT>
   ```

1. Commit your change to main.

1. In the left-hand navigation pane, go to **Build > Pipelines**.

1. Open the latest pipeline.

1. Wait until the **init** of the latest change completes. Once done, run **deploy**.

1. Once the **deploy** job has run successfully, verify if the environments have been created. Go to **Groups** (left-hand menu) and choose **iac**.

   You should see your new environments listed. If you click any of them, they will be empty.

   Now you are going to create a clone for the environments from **bootstrap**.

1. Go to **Groups** (left-hand menu) and choose **iac**.

1. In the left-hand navigation pane, go to **Build > Pipelines**.

1. Open the latest pipeline.

1. Click **deploy-env-templates** (don't run it, just click it). Later on, you will run this to populate the project of the Switch that you want to deploy.

   <!-- ![deploy-env-templates](assets/screenshots/iacDeployment/008_gitlab_deploy_env_templates.png) -->

1. Once you opened **deploy-env-templates**, you need to provide some environment variables:
   - **ENV_TO_UPDATE** → the name of the environment that you want to update, it is the Switch environment that you defined in the `custom-config/environment.yaml` file (in our example, it will be: `sw001`)
   - **IAC_MODULES_VERSION_TO_UPDATE** → the version of Terraform that you want to use (in our example, it is: `v7.0.0-rc.119`)

1. Run the job. This will populate the repository of the Switch with the default configuration.

1. After successful initialization, access the newly created environment repository at **Groups > iac > <SWITCH_ENVIRONMENT>**.

1. Once in the Switch repository, click **Build > Pipelines** on the left.

   You will see that the environment is being initialized. It will fail because there is no custom configuration. This is fine for now, you will fix this later.

<!-- 1. Repeat the **deploy-env-templates** step for all the environments. -->

#### Mojaloop Switch: Configure secrets in the Vault

Set up the access key as a secret in the Vault.

1. Connect to Vault using the internal URL (requires VPN):

   ```
   https://vault.int.<cluster-name>.<domain>
   ```

   Example:
   ```
   https://vault.int.cc004.perf004.mojaperflab.org/
   ```

1. Navigate to the following path: **Secrets Engines > secret > cloud-api-access**.

1. Verify if you can see the following secrets:

   - **cloud_platform_api_client_id**
   - **cloud_platform_api_client_secret**

   These secrets are AWS secrets automatically generated from the Control Center so the environments can use them.

1. Copy the values of these two secrets and save them. You will need them in the next steps.

1. Navigate to: **Secrets Engines > secret > \<NAME_OF_YOUR_SWITCH_ENVIRONMENT>**.

1. Create a secret called `cloud_platform_client_access_key` (click **Create secret +** in the top right corner and add `cloud_platform_client_access_key` in the **Path for this secret** field).

   <!-- ![Configure Vault secret](assets/screenshots/iacDeployment/010_vault_create_secret.png) -->

1. Set up the secret as follows:
   - Key: `value`
   - Value: The **cloud_platform_api_client_id** that you have just copied.

1. Click **Save**.

1. Navigate back to: **Secrets Engines > secret > \<NAME_OF_YOUR_SWITCH_ENVIRONMENT>**.

1. Create a secret called `cloud_platform_client_secret` (click **Create secret +** in the top right corner and add `cloud_platform_client_secret` in the **Path for this secret** field).

1. Set up the secret as follows:
   - Key: `value`
   - Value: The **cloud_platform_api_client_secret** that you have just copied.

1. Click **Save**.

#### Mojaloop Switch: Add custom configuration

To configure the Switch, you are going to use a profile-based approach. What does this mean? You can define a "profile" (= a set of declarative configuration files) with values that are specific to your deployment, and use the profile to override the configuration defined in the **iac-modules** repository.

It is possible to define a separate profile for each and every deployment.

In the example below, we are going to use the [common-profile](https://github.com/infitx-org/common-profile) repository. All you have to do is reference the **common-profile** and the values defined in there will override the configuration defined in the **iac-modules** repository.

**NOTE:** The `custom-config.yaml` file always needs to be present. Without this file, the deployment will fail. <!-- EDITORIAL COMMENT: Should be `cluster-config.yaml`-->

**NOTE:** If you do not wish to override the default configuration in the **iac-modules** repository, do not reference any profile.
<!-- EDITORIAL COMMENT: BTW, the profile currently only has the values that are not defined in the default-config. Also: the default thing is iac-modules and the profile overrides that. So the iac-modules is the default, if we don't want to override it, we just remove the override file. --> 

1. In GitLab, go back to the Switch environment.

1. Once in the Switch environment, go to **Code > Repository**.

1. Create a `submodules.yaml` file and configure it as follows:

   ```yaml
   profiles/switch:
   url: https://github.com/infitx-org/common-profile.git       # replace with your own profile in case you have defined your own custom profile
   ref: main
   ```

   This submodule will clone the repository referenced as a git submodule and will merge it directly into the configuration. Anything that has to be overriden will be defined in the below steps.

   **NOTE:** In case your profile is defined in a private repository, you have to set up a git-specific secret in the Vault. It will be used to authenticate to the repository automatically. There is no need to define a secret for a public repository.

   Here's how to define the secret in the Vault:

   1. Go to: **Secrets Engines > secret**.

   1. Create a secret called **git**.

   1. In the **Secret data** field, add **credentials** as the key, and a GitHub token as the value.

   1. Click **Save**.

1. Go to **Code > Repository > custom-config**.

1. Configure the `cluster-config.yaml` file as follows:

   ```yaml
   env: <NAME_OF_YOUR_SWITCH_ENVIRONMENT>
   vpc_cidr: <YOUR_CIDR> # "10.20.0.0/17"
   domain: <NAME_OF_YOUR_DOMAIN>
   k8s_cluster_type: eks
   k8s_cluster_module: eks
   cloud_region: <YOUR_AWS_REGION>
   object_storage_provider: s3
   cloud_platform: aws
   iac_terraform_modules_tag: v7.0.0-rc.119              # mcm-1762808514 --> mcm-1762866755
   ansible_collection_tag: v7.0.0-rc.86
   manage_parent_domain: false
   cc: controlcenter
   cc_name: controlcenter
   sc: sccontrolcenter                                   # dummy value for cloud-based deployments so that Terraform doesn't fail
   currency: <YOUR_CURRENCY>
   switch: <NAME_OF_YOUR_SWITCH>                         # in PM4ML, it will be replaced by e.g., test-<switch>-dfsp1
   tags:
      {
         "Origin": "Terraform",
         "mojaloop/cost_center": "<YOUR_COST_CENTER>",   # must already exist in AWS
         "mojaloop/env": "<YOUR_ENVIRONMENT>",           # must already exist in AWS
         "mojaloop/owner": "<YOUR_NAME>"
      }
   ```

1. Create a `common-vars.yaml` file and configure it as follows:

   ```yaml
   max_pods_per_node: 360
   prometheus_pvc_size: 25Gi
   prometheus_retention_period: 3d
   argocd_reconciliation_timeout: "5m"
   microk8s_version: 1.32/stable
   ```

1. Create a `finance-portal-values-override.yaml` file and configure it as follows:

   ```yaml
   reporting-hub-bop-settlements-ui:
   config:
      env:
         REPORTING_TEMPLATE_API_ENDPOINT: https://finance-portal.int.<YOUR_SWITCH_ENVIRONMENT_NAME>.<YOUR_DOMAIN>/api/reports/report-multilateral-settlement    # don't forget to update this

   reporting-hub-bop-shell:
   configFiles:
      config.json: # feel free to customise the title, subtitle, image, colour
         TITLE: 'STG'
         SUBTITLE: 'Finance Portal'
         TITLE_IMAGE: 'data:image/webp;base64,UklGRlgDAABXRUJQVlA4IEwDAADwOACdASoAAlUBPpFGnkslo6KhpegAsBIJZ27hdrD0s7jrxt7P+7d/gLj/QAAB2S9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFKq9rLzcbA82B5sDzYHmwPNgebA82B5sDzYHmwPNgebA82B5sDzEIKY9N402B5sDzYHmwPNgebA82B5sDzYHmwPNgebA82B5sD07Fi3GwSrIjmk/fLYxJXvUOiOOd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yieH8ymNMHXYOuwddg67B12DrsHXYOuwddg67B12DrsHXYOuwddeQWLggk2B5sDzYHmwPNgebA82B5sDzYHmwPNgebA82B5sDzYY4UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75FAAD+/1/XP680CKPv//UGf/kGf/kGfqdMAARoAAAAAAAAAAAAAAAAAAACK+Kj032G4DHtg7Dwb0/4XH+klVC7pX9JKmN8EBg029Q3DW3qG4a29Q3DW3qG4a29Q3DW3qG2e/d1heeks2PKf9+bTfhdiJPvK28+3AsZPonFI4dE24ianN8MOImpzfDDiJqc3ww4ianN8MOImpzfN8lU84L/C0depefb/ndz+l12BZFWK67AsirFddgWRViuuwLIqxXXYFkVYrrsCeYIAAAAAAAAAAYn8NAaKQKSgL4g00WExaGr708XHVLA7e22TJfTxcdUsDt7bZMl9PFx1SwO3ttkyX08XHVLA7e22TJfTxcdUsDt7baTsicKMrlfN+L/tj8Ka3Pzb/SIOpinaMzQWRtY6qdBDuDpt4lyHVlzaptU8jsza9IrcuOXHTbxLkOrLm1Tap5HZm16RW5ccuOm3iX57oFSyQAAcCAAATyAADJYAAhzgAFWgAA0mAAAAAAA'
         TITLE_BAR_COLOR: '#0C1C8C'
   ```

1. Create a `mojaloop-stateful-resources-monolith-databases.yaml` file and configure it as follows:

   There will be 2 RDS databases: one for Ory, Keycloak, etc., and one for Mojaloop services such as the Central Ledger, MCM, etc. The MongoDB documentdb database will be for the Finance Portal, the collections, settlements, etc. <!-- EDITORIAL COMMENT: In the case of an on-prem deployment, they are created from Persona in the storage cluster. -->

   `mojaloop-stateful-resources-monolith-databases.yaml` will create the databases and the default configuration: t3.million databases with a single instance. If you need bigger databases or more instances, you can add appropriate values. <!-- EDITORIAL COMMENT: We need to add an appendix with the full values from session 2, Nov 7th. The files in the default-config folder will not work, as they contain placeholders. In session 2, we specified values in place of the dummy values or placeholders. -->

   ```yaml
   common_platform_db:
   provider: rds
   common_mojaloop_db:
   provider: rds
   common_mongodb:
   provider: documentdb
   ```

1. Create a `mojaloop-values-override.yaml` file and configure it as follows:

   <!-- **NOTE:** Feel free to remove references to specific images. If you remove them, the images will be pulled from whatever the Helm chart specifies. -->

   ```yaml
   quoting-service:
      quoting-service-handler:
         configOverride:
               .RULErc:
                  rule:
                     maxAmount:
                           # GP currencies
                           XXX: 1000000
                           XDR: 1000000
                           XTS: 1000000
   ```

1. Create a `mojaloop-vars.yaml` file and configure it as follows:

   ```yaml
   onboarding_funds_in: 100000
   onboarding_net_debit_cap: 1000
   ```

1. Create a `platform-stateful-resources.yaml` file and configure it as follows: <!-- EDITORIAL COMMENT: Instead of `external`, we could've set internal/in-cluster also because we support it for on-prem for percona, etc.-->

   ```yaml
   mcm-db:
   deployment_type: external
   account-lookup-db:
   deployment_type: external
   central-ledger-db:
   deployment_type: external
   bulk-mongodb:
   deployment_type: external
   reporting-events-mongodb:
   deployment_type: external
   ttk-mongodb:
   deployment_type: external
   keycloak-db:
   deployment_type: external
   keto-db:
   deployment_type: external
   kratos-db:
   deployment_type: external
   ```

1. Create a `pm4ml-vars.yaml` file and configure it as follows:

   **NOTE:** Ensure that `${switch}` and `${currency}` have been defined in the `cluster-config.yaml` file as these values will be taken from there.

   ```yaml
   pm4mls:
      test-${switch}-dfsp1:
         currency: ${currency}
      test-${switch}-dfsp2:
         currency: ${currency}
      perf-${switch}-dfsp1:
         currency: ${currency}
      perf-${switch}-dfsp2:
         currency: ${currency}
   ```

   This file will create the PM4ML instances that we want to onboard.

1. Create a `values-hub-provisioning-override.yaml` file and configure it as follows: <!-- EDITORIAL COMMENT: Do we need to create the same file under default-config? 56:28-->

   ```yaml
   testCaseEnvironmentFile:
   inputValues:
         currency: "<YOUR_CURRENCY>"                              # change this to your currency
         DEFAULT_SETTLEMENT_MODEL_NAME: "DEFAULTDEFERREDNET"
         hubEmail: "hub@example.com"
   ```

1. Commit your changes to main.

1. Run **init**. The first init may fail but this is fine for now. For the init to succeed, the S3 buckets must be up. 
<!-- EDITORIAL COMMENT: Do we have to run merge-config before init? Also, do we have to wait and re-run **init** ntil it succeeds? -->

<!-- EDITORIAL COMMENT: call 3 33:00-35:00 -->

1. Run **refresh-templates**.

   Whenever you use profiles, you need to run the **refresh-templates** job before the deploy job (via **GitLab > switch > Build > Pipleines**). The **refresh-templates** job will fetch the repository, add it as a sub-module, and apply it.

<!-- 37:00  We have to run refresh-templates only when you add a sub-module. Otherwise you can run the deploy job without it. You run refresh-templates when using profiles for the first time. When you just update something in the already existing profile, you don't need to run it. ??? However, if you change the profile, you have to run refresh-templates. It's because it's the one that will clone the profile and make that update. Each time we just iac-modules or common-profiles, we have to run refresh-templates. -->

#### Mojaloop Switch: Run the deployment

1. Once **refresh-templates** has completed successfully, run **deploy-infra**.
   1. Select the **deploy** stage of your latest commit.
   1. Run **deploy-infra**. This will deploy the infrastructure, Kubernetes, ArgoCD, together with the configuration you specified.
      (After **deploy-infra** has run, two more jobs will run: **lint-apps** and **push-apps**. Following the **lint-apps** job, a **push-apps** job runs automatically, which will push the manifests generated for the ArgoCD applications.)
   1. Wait until the job finishes successfully.

#### Mojaloop Switch: Verify the deployment

1. After **deploy-infra** has run successfully, you can download the artifacts from the **Build > Artifacts** page. (When you run a deploy job, it will save some artifacts.)
   1. Browse **deploy-infra**, and explore its contents.
   1. Go to **ansible > k8s-deploy**.
   1. You will find the following artifacts:
      1. `inventory`: used for Terraform
      1. `oidc-kubeconfig`: the kubeconfig of the Kubernetes environment just deployed
      1. `sshkey`
1. ssh into the bastion of the environment. <!-- EDITORIAL COMMENT: Why do we need to do that? --> For this, you need to grab the ssh key from the `sshkey` artifact, and the IP address of the bastion from the `inventory` artifact.
1. Copy the contents of the `sshkey` file, and paste it into the following new file: `~/.ssh/<ENVIRONMENT>-sshkey`
1. Grant read-only permissions to the ssh key:

   ```bash
   chmod 400 ~/.ssh/<ENVIRONMENT>-sshkey
   ```

1. To get the IP address of the bastion, open the `inventory` file and copy the value of `ansible_host`. Save this value because you will need it in the next step. You will find `ansible_host` here:

   ```yaml
   all:
      hosts:
         bastion1:
            ansible_host: <IP_address>
      vars:
         ...
   ```

1. ssh into the bastion of the environment:

   ```bash
   ssh -i ~/.ssh/<ENVIRONMENT>-sshkey -L <PORT???> ubuntu@<IP-ADDRESS-OF-THE-BASTION>
   ```

1. To get root access, execute following command:

   ```bash
   sudo su
   ```

1. Export kubeconfig:

   ``` bash
   export KUBECONFIG=/root/.kube/kubeconfig
   ```

1. Get the ArgoCD admin password from Kubernetes:

   ```bash
   kubectl -n argocd get secret argocd-initial-admin-secret   -o jsonpath="{.data.password}" | base64 --decode; echo
   ```

1. Copy and save the secret returned in the terminal, you will soon need it.

1. To access the ArgoCD UI, forward a local port to the ArgoCD server service inside Kubernetes:

   ```bash
   kubectl -n argocd port-forward --address 0.0.0.0 service/argocd-server 8445:80
   ```

1. Navigate to **localhost** in your browser.

1. Log in to ArgoCD:

   - username: admin
   - password: the secret that you have just retrieved

1. Once logged in, you can check how the deployment of the various applications is progressing.

   When Netbird is in a synced state, you can log in to ArgoCD directly from the browser. See the next section: [Mojaloop Switch: Access ArgoCD when Netbird is up and running](#mojaloop-switch-access-argocd-when-netbird-is-up-and-running).

#### Mojaloop Switch: Access ArgoCD when Netbird is up and running

##### Configure user permissions

1. Log in as admin to Control Center Zitadel to grant permissions.
1. Add user to environment group:
   1. Click the Zitadel logo in the top left corner.
   1. Click **Users** and select your your non-admin user.
   1. In the left-hand menu, click **Authorizations**.
   1. Click **New**.
   1. Under **Search for a project**, select your Switch environment from the drop-down menu, and click **Continue**.
   1. Select all the roles and click **Save**.

##### Access ArgoCD

1. Go to: `https://argocd.int.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>`

   The `<NAME_OF_YOUR_SWITCH_ENVIRONMENT>` and `<NAME_OF_YOUR_DOMAIN>` values come from the `cluster-config.yaml` file that you configured earlier.

1. Log in using the **LOG IN VIA ZITADEL** button. When prompted, select the non-admin user account.

1. At this point, you can exit the bastion, you will not need it anymore.

1. Back in ArgoCD, go to **Applications** to see how the deployment of the applications is progressing.

1. Check how the deployment of databases is progressing.

   1. Go to **mojaloop-stateful-resources-app**. This app creates one RDS database for MCM, Central Ledger, Account Lookup, etc., and one DocumentDB for reporting, settlements, collections, etc.

   Ctrl+F on your laptop and search for the string "rds". You will see that the deployment of the RDS clusters and the DocumentDB clusters are still progressing. Their deployment might take some time. You can check their progress in AWS as well by going to **Aurora and RDS > Databases** and **Amazon DocumentDB > Clusters** and checking values in the **Status** column (status **Creating** vs status **Available**).

   1. Go to **common-stateful-resources-app**. This app deploys one common RDS database for Keycloak, Ory, Kratos, Keto, etc. for the common statful resources. Ctrl+F on your laptop and search for the string "rds". Check the health indicators (Synced, Healthy) of the RDS cluster to determine the progress of deployment.


TO BE CONTINUED...


### Destroying the Mojaloop Switch environment

There is no **destroy** job defined in the pipeline, in order to avoid anyone accidentally running it.

To destroy the Switch, perform the following steps:

1. Make a new commit to main (for example, add a comment to a file) and when formulating your commit message, make sure that it includes the string `destroy:`.

   Example:

   ```bash
   destroy: uninstall the switch
   ```

1. In GitLab, navigate to the Switch environment, and go to **Build > Pipelines**.

1. Run the **init** job.

1. Once **init** has completed successfully, run **deploy-infra**.

1. Once **deploy-infra** has completed successfully, wait for **lint-apps** and **push-apps** to finish too.

<!-- ARE THESE 2 STEPS NEEDED? 1. Wait for the **init** job of the **update generated confgs to project** commit to complete.

1. Go back to the pipeline of your **destroy: uninstall the switch** commit. -->

1. Go to **cleanup** stage > **destroy** job, and run the job manually. There is no need to define any variables.

1. Once the job has run, go to **AWS > EC2 Instances**. Everything is destroyed in AWS, except for the EBS Volumes, so you need to manually check if you can see any available volumes under **Elastic Block Store > Volumes**. Search by "Volume state = Available". The EC2 Instances detaches the EBS Volumes, but detaching them doesn't mean deleting them. "Available" means that the instance is not in use anymore, the instance is terminated.

1. Once you destroyed all environments and removed the container registries mentioned below, you are ready to destroy the Control Center. Go to **GitLab > iac > bootstrap > custom-config**. Delete the `environment.yaml` file and run the deploy job. <!-- EDITORIAL COMMENT: Which one? -->

   This is needed because there are some S3 buckets created from the Control Center to get used by the environments. They are created based on the `environment.yaml` file. For each environment, when the **init** phase is passed, the S3 buckets will be automatically created. Removing the `environment.yaml` file will remove the S3 buckets.

#### Important note about destroy sequence

There are Terraform-created resources (such as EKS, EC2 instances, etc.), and there are also other Crossplane-created resources (such as RDS, DocumentDB, Route53, etc.). If you destroy everything in parallel, you will lose the Crossplane operators, and they are the only ones that manage Crossplane-managed resources. Therefore, you need to wait until the Crossplane operator destroys its created resources. Once that's done, you can destroy the Crossplane operator and the whole node.

RDS and databases are managed by ArgoCD using Crossplane, they are not created by Terraform.

### Deleting a repository in GitLab

1. In GitLab, go to the repository that you want to delete: **Projects > iac / <NAME_OF_ENVIRONMENT_TO_DELETE>**.
1. In the left-hand navigation pane, select **Deploy > Container registry**. There is a container created and cached inside this repository to be used by the pipeline runners, you will find that container here. To delete the repository, you need to manually delete any containers you find here.
1. Go to **Projects > iac / bootstrap**.
1. Go to **custom-config** > `environment.yaml`.
1. In the `environment.yaml` file, remove the name of the environment whose repository you want to delete.
1. Commit your change.
1. Go to **Build > Pipelines**.
1. Select the latest change.
1. Run the deploy job. <!-- EDITORIAL COMMENT: Which one? -->

### Tips and tricks

When configuring the Switch, you can automatically trigger certain jobs by prefixing your commit message in a specific way:
<!-- EDITORIAL COMMENT: Need to double-check the names of the jobs. -->

| Prefix                      | Job                      | Comment |
|-----------------------------|--------------------------|---------|
| `deploy: <your-commit-message>`                   | **refresh-deploy-infra** | This job job will work as a **deploy** and **refresh-templates** at the same time but it will take longer. |
| `deploy-infra: <your-commit-message>`             | **deploy-infra**         | -       |
| `[skip lint] <your-commit-message>`               | Can be added to any job to skip the linter check  | For example, `deploy-infra: [skip lint]` triggers the **deploy-infra** job and skips the linter check. The linter check may sometimes fail, for example, due to CRDs not being available yet. In such cases, skipping the check can be useful. |
| `destroy: <your-commit-message>`                  | **destroy**              | There is no **destroy** job defined in the pipeline, and this prefix will not automatically run it either. The prefix will just show the **destroy** job and you will have to run the job manually. For details, see section [Destroying the Mojaloop Switch environment](#destroying-the-mojaloop-switch-environment). |
