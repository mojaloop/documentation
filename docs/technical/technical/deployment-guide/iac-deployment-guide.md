# IaC Deployment Guide

## Table of contents

- [Introduction](#introduction)
   - [IaC in general](#iac-in-general)
   - [When is IaC the right choice?](#when-is-iac-the-right-choice)
   - [IaC in the context of Mojaloop](#iac-in-the-context-of-mojaloop)
- [Overview of Mojaloop IaC-based deployment](#overview-of-mojaloop-iac-based-deployment)
- [Deployment how-to](#deployment-how-to)
   - [Deploying the Control Center](#deploying-the-control-center)
      - [Control Center: Prerequisites](#control-center-prerequisites)
      - [Control Center: Prepare the infrastructure](#control-center-prepare-the-infrastructure)
      - [Control Center: Deploy Control Center host](#control-center-deploy-control-center-host)
      - [Control Center: Set up the Control Center utility container](#control-center-set-up-the-control-center-utility-container)
      - [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)
      - [Control Center: Post-deployment configuration](#control-center-post-deployment-configuration)
      - [Control Center: Verify health and access](#control-center-verify-health-and-access)
      - [Control Center: Troubleshooting](#control-center-troubleshooting)
      - [Control Center: Maintenance](#control-center-maintenance)
   - [Deploying the Mojaloop Switch environment](#deploying-the-mojaloop-switch-environment)
      - [Mojaloop Switch: Prerequisites](#mojaloop-switch-prerequisites)
      - [Mojaloop Switch: Initialize the bootstrap environment](#mojaloop-switch-initialize-the-bootstrap-environment)
      - [Mojaloop Switch: Configure AWS credentials](#mojaloop-switch-configure-aws-credentials)
      - [Mojaloop Switch: Configure the Vault secret](#mojaloop-switch-configure-the-vault-secret)
      - [Mojaloop Switch: Configure the Switch](#mojaloop-switch-configure-the-switch)
      - [Mojaloop Switch: Run the deployment](#mojaloop-switch-run-the-deployment)
      - [Mojaloop Switch: Post-deployment verification](#mojaloop-switch-post-deployment-verification)
      - [Mojaloop Switch: Configure service access](#mojaloop-switch-configure-service-access)
      - [Mojaloop Switch: Run TTK tests](#mojaloop-switch-run-ttk-tests)
      - [Mojaloop Switch: Collect PM4ML configuration info](#mojaloop-switch-collect-pm4ml-configuration-info)
      - [Mojaloop Switch: Troubleshooting](#mojaloop-switch-troubleshooting)

## Introduction

One of the ways you can deploy Mojaloop is via Infrastructure-as-Code (IaC), allowing you to automate the process of provisioning and deploying the servers, networks, databases, and other resources that make up an environment.

This guide describes how to install and configure Mojaloop environments leveraging IaC tools and automation.

### IaC in general

IaC is the practice of defining and managing infrastructure through machine-readable configuration files. You treat your service components as code and run scripts (rather than applying manual processes) when setting up your target infrastructure. This results in more consistent environments, faster deployments, and easier rollback or replication.

![IaC high-level illustration](assets/diagrams/iacDeployment/iac_high_level.png)

<!-- Diagram source file: https://app.diagrams.net/#G1YEjT1fDGisr1v6jujAEztCXND1eh50gS#%7B%22pageId%22%3A%22J80BWPVAeOCRfKWJG03i%22%7D -->

Key features:

- **Automation & Repeatability**: Define infrastructure in code to automate the provisioning of environments, eliminating manual, error-prone setup.
- **Modularity & Reusability**: Code can be organised into reusable modules.
- **Idempotency**: Applying the same code multiple times leads to the same infrastructure.
- **Version Control and Lifecycle Management**: IaC code can be stored in Git, enabling change tracking, rollbacks, peer reviews, and auditability.
- **CI/CD Integration**: IaC can be integrated into pipelines to enable fully automated infrastructure deployments.

### When is IaC the right choice?

IaC comes with some overhead of writing and maintaining infrastructure code, and it may not be suitable for every scenario. A good rule of thumb is: a. if you're provisioning infrastructure across multiple environments, b. you need repeatable deployments, and c. you expect your infrastructure or your Infra team to grow – use IaC.
When deciding whether or not IaC-based deployments are the right path for your organisation, it is crucial to understand what IaC _cannot_ do: 

- IaC cannot _guarantee runtime correctness or uptime_, you will need to specifically set up monitoring and alerting capabilities, perform health checks, integration tests, and so on.
- IaC cannot automatically _know your intent or business logic_. IaC tools apply the state you define, not what you "mean" to do. For example, IaC can't guess if deleting a resource will break production. You must model intent carefully and understand the impact of each change.
- IaC doesn't _handle full lifecycle management automatically_, for example, it won't clean up unused resources. IaC only manages what's explicitly defined in code.
- IaC doesn't _replace good engineering_. IaC simplifies provisioning, but it still requires: knowledge of cloud/network/database architecture, understanding of resource limits and trade-offs, debugging and maintenance skills, and so on.

In light of the above, to work effectively with Infrastructure-as-Code, we advise you to have working knowledge of the following concepts and technologies:

- **Infrastructure fundamentals**: to understand the resources you are managing (compute, networking, storage, identity and access management, regions and availability zones, and so on)
- **Containers and orchestration** (for example, Docker, Kubernetes, control plane, worker nodes, and so on): to understand how to manage containerised resources
- **Security and governance** (managing secrets, least privilege principle): to understand how to manage high-privilege resources
- **At least one IaC tool** (for example, Terraform, Ansible): to understand how IaC tools structure modules, resources, variables, and state
- **CI/CD and DevOps concepts**: to automate deployments
- **AWS services**: to understand configuration options and best practices of AWS resources configured and managed via IaC tools (such as: EC2 (virtual machines), S3 (object storage), VPC (networking), IAM (identity and access), RDS (databases), Lambda (serverless functions))
- **Monitoring tools** (for example, Grafana): to observe and track what happens post-deployment

### IaC in the context of Mojaloop

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

The following figure provides a high-level overview of the Mojaloop IaC deployment process (a concrete example).

![Mojaloop IaC sequence](assets/diagrams/iacDeployment/mojaloop_iac_sequence.png)

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

   Choose a meaningful name for your key pair. In the example below, the key pair is called: `ml-perf-ccu-host-private-key`

1. Save the private key securely on your local machine, and set the permissions so that only you can read your private key file:

   ```bash
   # Store the private key
   mkdir -p ~/.ssh
   vi ~/.ssh/ml-perf-ccu-host-private-key

   # Paste your private key content (ensure proper formatting)
   # The key should begin with -----BEGIN RSA PRIVATE KEY-----
   # and end with -----END RSA PRIVATE KEY-----

   # Set appropriate permissions
   chmod 400 ~/.ssh/ml-perf-ccu-host-private-key
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

##### Provision the Control Center host VM

Deploy a dedicated VM to host the Control Center utility container.

VM specifications:

- **Instance Type**: t3.small
- **Operating System**: Ubuntu 24.04 LTS
- **Storage**: 20GB root volume (expandable as needed)
- **Security Group**: Allow SSH (port 22) from your IP (If you're launching the VM instance via the AWS console (**EC2 > Instances > Launch instance**), choose **My IP** in the drop-down menu.)
- **Network**: Public subnet with Elastic IP <!-- EDITORIAL COMMENT: I haven't found the Elastic IP option in the GUI. -->
- **Authentication**: SSH key created earlier in section [Create SSH key pair](#create-ssh-key-pair)

Once the instance has been launched, record the public IP address, it will be needed when you ssh to the VM (next step).

#### Control Center: Deploy Control Center host

##### Initial system configuration

Connect to the Control Center host and perform initial setup:

1. Connect to your Control Center host VM via ssh:

   ```bash
   # Connect via SSH
   ssh -i ~/.ssh/ml-perf-ccu-host-private-key ubuntu@<PUBLIC_IP_ADDRESS>
   ```

1. Update system packages:

   ```bash
   # Switch to root user
   sudo su

   # Update system packages
   apt-get update && apt-get upgrade -y
   ```

##### Install a terminal multiplexer

Install tmux to ensure long-running processes continue if the SSH connection drops:

```bash
apt install tmux
tmux -V  # Verify installation
```

##### Install Docker engine

Install Docker following the official Ubuntu installation procedure:

1. Remove conflicting packages:

   ```bash
   for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do
   sudo apt-get remove $pkg
   done
   ```

1. Add Docker repository:

   ```bash
   # Add Docker's official GPG key
   sudo apt-get update
   sudo apt-get install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc

   # Add Docker repository
   echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
   $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

1. Install Docker packages:

   ```bash
   sudo apt-get update
   apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

##### Configure AWS credentials

Set up AWS credentials for the Control Center utility:

1. Create the configuration directory:

   ```bash
   mkdir -p ~/.aws/
   ```

1. Create the credentials file:

   ```bash
   cat <<EOF > ~/.aws/credentials
   [oss]
   aws_access_key_id = <YOUR_ACCESS_KEY_ID>
   aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
   EOF

   # Replace <YOUR_ACCESS_KEY_ID> and <YOUR_SECRET_ACCESS_KEY> with actual values
   ```

#### Control Center: Set up the Control Center utility container

You are going to spin up a container and then run Terraform to deploy the Control Center.

1. Launch the container.

   1. Start a new tmux session (in this example, our container name is: `ml-perf-ccu-4`):

      ```bash
      tmux new -s ml-perf-ccu-4
      ```

   1. Run the Docker container to create the Control Center utility.

      ```bash
      docker run -it -d \
      -v ~/.aws:/root/.aws \
      --name <container-name> \
      --hostname <hostname-inside-container> \
      --cap-add SYS_ADMIN \
      --cap-add NET_ADMIN \
      ghcr.io/mojaloop/control-center-util:6.1.2
      ```

   1. Issue `docker ps` to see if the container is up. Look for your container name, in this example, it is: `ml-perf-ccu-4`.

   1. Access the container:

      ```bash
      docker exec -it ml-perf-ccu-4 bash
      ```

1. Configure the environment.

   1. Go to the `iac-run-dir` folder:
   
      ```bash
      cd iac-run-dir/
      ```

   1. You are going to set some variables in the `setenv` file:
   
      ```bash
      vi setenv
      ```

   1. Specify which version of IaC you want to use (this needs to be determined before), for example (at the time of writing, v5.9.0 is the latest [release](https://github.com/mojaloop/iac-modules/releases)): `IAC_TERRAFORM_MODULES_TAG=v5.9.0`

1. Initialize the environment.

   1. Load the configuration:

      ```bash
      source setenv
      ```

   1. Run the initialization script:
   
      ```bash
      ./init.sh
      ```

   This will clone the iac-modules repository into the `iac-run-dir` folder.

#### Control Center: Deploy the Control Center

1. Access the Control Center deployment directory:

   ```bash
   cd /iac-run-dir/iac-modules/terraform/ccnew/
   ```

1. Now you are going to configure some Control Center parameters.

   Explore what can be configured in the `default-config` folder. Then copy anything you wish to customise into the placeholder `cluster-config.yaml` file in the `custom-config` folder, and make your required changes.

1. Open the placeholder custom configuration file for editing:

   ```bash
   vi custom-config/cluster-config.yaml
   ```

1. Configure the following parameters:

   - You need a unique **cluster name** for your Control Center.
   - The **domain name** will be used for all the URLs (for example, the URLs of all the portals).
   - Ensure that the **cloud region** reflects your AWS region.
   - Provide an **email address for Let's Encrypt** configuration.
   - **Tags** are useful for statistics and investigation purposes in AWS.

   
      ```yaml
      cluster_name: cc004                         # Unique identifier for your Control Center
      domain: perf004.mojaperflab.org             # Your domain name
      cloud_region: eu-north-1                    # AWS region for deployment
      ansible_collection_tag: v5.5.0-rc3          # Ansible collection version
      iac_terraform_modules_tag: v5.9.0           # IaC modules version
      letsencrypt_email: admin@yourdomain.com     # Email for Let's Encrypt certificates
      tags:                                       # AWS resource tags
         Origin: Terraform
         mojaloop/cost_center: mlf-perf004-cc
         mojaloop/env: ft-sbox-rw
         mojaloop/owner: Your-Name
      ```

1. _optional_ To declare which environments you want to initialize in the Control Center in AWS, modify the environment configuration.

   You can create as many environments as you want (test and production environments, and Payment Manager environments).

   Make your required changes:
   
   ```bash
   vi custom-config/environment.yaml
   ```
   
   Example:

   ```yaml
   environments:
      - perf004-pm4ml
      - perf004-mojaloop
   ```

1. Deploy the Control Center by executing the following script:

   `./wrapper.sh`

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

1. The Terraform state will be in the container after running the script so you need to push the state to the new system:

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

   ![Zitadel: Create user](assets/screenshots/iacDeployment/001_cc_zitadel_create_user.png)

1. Grant appropriate permissions to this new user via the **Authorizations** menu:

   ![Zitadel: Grant permissions to new user 01](assets/screenshots/iacDeployment/002_cc_zitadel_grant_authorizations_1.png)

   1. Click **New**.

      ![Zitadel: Grant permissions to new user 02](assets/diagrams/iacDeployment/002_cc_zitadel_grant_authorizations_2.png)

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

   ![Nebird: Install Netbird client](assets/screenshots/iacDeployment/003_cc_download_netbird_linux.png)

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

1. Enable two-factor authentication for enhanced security:

   1. Click your user profile in the top left corner, and select **Preferences**.
   1. In the left-hand menu, select **Account**.
   1. Click the **Enable two-factor authentication** button and follow the prompts to set up 2FA.

      ![GitLab: Enable two-factor authentication](assets/screenshots/iacDeployment/004_cc_gitlab_2factor.png)

##### ArgoCD: Run the netbird-post-config application

After connecting to the VPN, there is one manual task to do in ArgoCD: sync the netbird-post-config application.

1. Go to: `https://argocd.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. On the login page, click **Log in via Zitadel** and log in with your new user.

1. Find the **netbird-post-config** application and run it (click **Sync**, then **Synchronize**).

   !["netbird-post-config" application in ArgoCD](assets/screenshots/iacDeployment/005_argocd_netbird-post-config.png)

##### Vault: Verify if secret paths are accessible

1. Go to: `https://vault.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. On the login page, select **Method: OIDC**, click **Sign in with OIDC Provider**, then in the window that pops up, choose your new user.

   ![Vault login](assets/screenshots/iacDeployment/006_vault_signin.png)

1. Verify if secret paths are accessible: under **Secret engines**, select **secret/**. You should see a list of secrets for various applications, such as GitLab, Grafana, Mimir, and so on.

   ![Vault secrets](assets/screenshots/iacDeployment/007_vault_secrets.png)

##### Grafana: Review dashboards and set up alerts

1. Go to: `https://grafana.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. On the login page, click the **Sign in with Zitadel** button and select your new user.

1. Review pre-configured dashboards.

1. Set up alert channels if required.

##### ArgoCD: Verify if all services are operational

1. Go to: `https://argocd.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. On the login page, click the **Sign in with Zitadel** button, and select your new user.

1. Check the status of all applications, verify that they are healthy.

#### Control Center: Verify health and access

##### Service health checks

Verify if all services are operational:

1. Check ArgoCD applications:

   ```bash
   kubectl get applications -n argocd
   ```

1. Verify pod status:

   ```bash
   kubectl get pods --all-namespaces | grep -v Running
   ```

1. Check Istio configuration:

   ```bash
   kubectl get gateway -n istio-system
   ```

##### DNS verification

Confirm that DNS records are properly configured:

1. Test external services:

   Example (update with your own `cluster_name` and `domain`):

   ```bash
   nslookup gitlab.cc004.perf004.mojaperflab.org
   nslookup zitadel.cc004.perf004.mojaperflab.org
   ```

1. Test internal services:

   Once connected via VPN (example - update with your own `cluster_name` and `domain`):

   ```bash
   nslookup argocd.int.cc004.perf004.mojaperflab.org
   ```

#### Control Center: Troubleshooting

##### AWS quota exceeded

**Error message:**

"You have requested more vCPU capacity than your current vCPU limit"

**Resolution:**

1. Access the AWS Service Quotas console.
1. Request an increase for the EC2 instance vCPU limit.
1. Wait for approval before retrying the deployment.

##### IAM group not found

**Error message:**

"The group with name iac_admin cannot be found"

**Resolution:**

Execute the IAM group creation commands from section [Configure AWS IAM](#configure-aws-iam).

##### Terraform state lock

**Error message:**

"Error acquiring the state lock"

**Resolution:**

```bash
# Force unlock with the lock ID from error message
terragrunt force-unlock <LOCK_ID>
```

##### Certificate generation failures

**Issue:**

Let's Encrypt certificate requests are failing.

**Resolution:**

1. Verify if DNS propagation has completed.
1. Check Let's Encrypt rate limits.
1. Verify domain ownership.

##### AWS EC2: UnAuthorized Operation

After executing the `wrapper.sh` script to run the CC deployment, you might get an `UnAuthorized Operation` error.

**Error message:**

"Error: Reading EC2 AMIs: operation error EC2: DescribeImages, https response error, StatusCode: 403, RequestID: {id}, api error UnAuthorized Operation: You are not authorized to perform this operation. User: arn:aws:iam::{account-id}:user/{username} is not authorized to perform: ec2:DescribeImages with an explicit deny in an identity-based policy"

Instead of `EC2` and `DescribeImages`, you may have some other service and operation in your error message.

**Resolution:**

1. Go to the IAM Policy Simulator: [https://policysim.aws.amazon.com](https://policysim.aws.amazon.com)
1. In section **Users, Groups, and Roles** on the left, select the username indicated in the error message.
1. In section **Policy Simulator** on the right, in the drop-down fields at the top of the page, choose the service (in our example, it is **EC2**) and the action (in our example, it is **DescribeImages**) that the user is unauthorized to perform according to the error message.
1. Click **Run Simulation**.
1. In the results, click the chevron at the beginning of the row. You should see a **Show Statement** link displayed.
1. Click **Show Statement**. Clicking the link will show you (on the left) the relevant part in the relevant Policy that is interfering with your permissions.

   Note that IAM permissions are additive, but an explicit `Deny` overrides all `Allow`s, no matter where they come from.

   The `UnAuthorized Operation` error might be caused by a Policy with a `Deny`.

1. Try modifying or removing the Policy that is causing the error.

##### Unable to access internal services (ArgoCD, Vault, Grafana)

**Error message:**

After deploying the Control Center, when accessing services that require a VPN connection (ArgoCD, Vault, Grafana), you get either of the following messages:

- `connection timed out`
- `unable to connect`

This is after having set up a new non-root user in Zitadel and having established a VPN connection via Netbird with this new user.

**Resolution:**

This might be due to your Internet Service Provider's (ISP's) DNS resolution service being slow.

Try changing your network settings to use Google Public DNS: [Configure your network settings to use Google Public DNS](https://developers.google.com/speed/public-dns/docs/using)

#### Control Center: Maintenance

##### Adding new environments

1. Update the configuration:

   ```bash
   vi custom-config/environment.yaml
   # Add new environment to the list
   ```

1. Refresh templates:

   ```bash
   ./refresh-env-templates.sh
   ```

1. Apply changes: Sync changes through ArgoCD.

##### Expanding storage

If additional storage is required on the Control Center host:

1. Check current usage:

   ```bash
   sudo lsblk
   ```

1. Expand the partition:

   ```bash
   # Adjust device name as needed
   sudo growpart /dev/nvme0n1 1
   ```

1. Resize the filesystem:

   ```bash
   sudo resize2fs /dev/nvme0n1p1
   ```

##### Destroying the Control Center

**Prerequisites:**

Make sure all Switch and PM4ML environments are successfully destroyed before destroying the Control Center.

**Steps:**

To completely remove the Control Center:

1. Navigate to the `ccnew` directory:

   ```bash
   cd /iac-run-dir/iac-modules/terraform/ccnew/
   ```

1. Load the configuration:

   ```bash
   source externalrunner.sh
   source scripts/setlocalvars.sh
   ```

1. Migrate state:

   ```bash
   ./movestatefromk8s.sh
   ```

1. Destroy resources:

   ```bash
   terragrunt run-all destroy --terragrunt-non-interactive
   ```

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

By default, when you open GitLab, you will see the environments that you configured in `custom-config/environment.yaml` (when you deployed the Control Center - see section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

The **iac/bootstrap** environment is present by default, this is the main project of the Control Center.

The deployment of the Switch follows a similar pattern to that of the Control Center.

1. In GitLab, go to **Projects**, click **iac/bootstrap**.

1. In the left-hand navigation pane, go to **Build > Pipelines**.

1. Open the latest pipeline.

1. Click **deploy-env-templates** (don't run it, just click it). Later on, you will run this to populate the project of the Switch that you want to deploy.

   ![deploy-env-templates](assets/screenshots/iacDeployment/008_gitlab_deploy_env_templates.png)

1. Once you opened **deploy-env-templates**, you need to provide some environment variables:
   - **ENV_TO_UPDATE** → the name of the environment that you want to update, it is the Switch environment that you defined in the `custom-config/environment.yaml` file in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center) (in our example, it will be: `sw004`)
   - **IAC_MODULES_VERSION_TO_UPDATE** → the version of Terraform that you want to use (in our example, it is: `v5.9.0`)

1. Run the job. This will populate the project of the Switch.

1. After successful initialization:

   1. Access the newly created environment repository at:

      ```
      https://gitlab.<cluster-name>.<domain>/iac/<env-to-update>
      ```
   
      Example:

      ```
      https://gitlab.cc004.perf004.mojaperflab.org/iac/sw004
      ```

   1. Verify the structure of the repository, and ensure that it contains:

   - `custom-config/` directory
   - `default-config/` directory
   - CI/CD pipeline configuration

#### Mojaloop Switch: Configure AWS credentials

Set up the `AWS_ACCESS_KEY_ID` variable. Each environment must have this information.

1. In GitLab, go to **Settings > CI/CD > Variables** (bottom left corner), and create a new variable (click **Add variable**). <!-- EDITORIAL COMMENT: Mention where exactly. Is this the Switch environment or the bootstrap? The Switch environment. -->

   ![CI/CD variables in GitLab](assets/screenshots/iacDeployment/009_gitlab_settings_cicd_variables.png)

1. Set up the variable as follows:
   - Key: `AWS_ACCESS_KEY_ID`
   - Value: The AWS access key ID of the Amazon account where you want to deploy the Switch. You can obtain this value from the AWS console, you will find it under your AWS profile > Security credentials > Access keys. You set up the corresponding key in section [Configure AWS credentials](#configure-aws-credentials) when you deployed the Control Center.
   - Type: Variable
   - Protected: Yes
   - Masked: Yes

#### Mojaloop Switch: Configure the Vault secret

Set up the access key as a secret in the Vault.

1. Connect to Vault using the internal URL (requires VPN):

   ```
   https://vault.int.<cluster-name>.<domain>
   ```

   Example:
   ```
   https://vault.int.cc004.perf004.mojaperflab.org/
   ```

1. Navigate to the following path: **Secrets Engines > secret > \<switch-project\>**

1. Create a secret called `cloud_platform_client_secret` (click **Create secret** and add `cloud_platform_client_secret` in the **Path for this secret** field).

   ![Configure Vault secret](assets/screenshots/iacDeployment/010_vault_create_secret.png)

1. Set up the secret as follows:
   - Key: `value`
   - Value: Your AWS secret access key (This is the secret access key corresponding to the access key for the AWS CLI. You set up this key in section [Configure AWS credentials](#configure-aws-credentials) when you deployed the Control Center.)

1. Click **Save**.

#### Mojaloop Switch: Configure the Switch

1. When the **deploy-env-templates** job has run, access the Switch project in GitLab by going to **Projects** and clicking **iac /\<environment identifier\>**.

1. Configure the Switch. The logic is similar to how you specified your configuration for the Control Center.

   There is a **default-config** folder with a set of default configurations. They can be explored to see what's inside. If you want to customise your configuration, then copy any configuration code from the default configuration into the `custom-config/cluster-config.yaml` file and make your changes.

   Commit directly to the `main` branch.

   Example:

   ```yaml
   env: sw004 # update according to your DNS planning
   vpc_cidr: "10.107.0.0/23"
   managed_vpc_cidr: "10.29.0.0/23"
   domain: hub004.mojaperflab.org # update according to DNS planning, ensure this domain name is different from the one specified for the Control Center
   managed_svc_enabled: false
   k8s_cluster_type: microk8s
   currency: EUR
   cloud_region: eu-north-1 # update according to your region planning
   ansible_collection_tag: v5.5.0-rc3
   iac_terraform_modules_tag: v5.9.0 # update according to your Terraform version
   letsencrypt_email: admin@yourdomain.com
   tags:
      {
         "Origin": "Terraform",
         "mojaloop/cost_center": "mlf-perf004-sw",
         "mojaloop/env": "ft-sbox-rw",
         "mojaloop/owner": "Your-Name",
      }
   ```

1. Set your desired Mojaloop version:
   1. Go to `custom-config/mojaloop-vars.yaml` file. If the file doesn't exist, create it.
   1. Specify a value for `mojaloop_chart_version`.
   1. You can also update the `mcm_chart_version` depending on which version of MCM you wish to use (in case you don't want to use the default version).

      ```yaml
      mojaloop_chart_version: 17.0.0 # Check latest version at https://github.com/mojaloop/helm/releases/
      onboarding_collection_tag: 17.0.0 # match the mojaloop version
      mcm_chart_version: 1.2.10 
      bulk_enabled: true # optional
      third_party_enabled: true # optional
      opentelemetry_enabled: false
      central_ledger_handler_transfer_position_batch_processing_enabled: true # required for now
      ```
   
   1. Commit directly to the `main` branch.

1. Configure the `mojaloop-rbac-api-resources.yaml` file. This file specifies the privileges for the business portals.

   1. Navigate to **default-config** and click `mojaloop-rbac-api-resources.yaml`.
   1. Copy the entire content.
   1. Navigate to the **custom-config** directory.
   1. Create a new file and name it `mojaloop-rbac-api-resources.yaml`.
   1. Paste the copied content and commit directly to the `main` branch.

1. Configure the `mojaloop-stateful-resources.json` file. This file specifies the configuration of databases and message queues.

   1. Navigate to **default-config** and click `mojaloop-stateful-resources.json`.
   1. Copy the entire content.
   1. Navigate to the **custom-config** directory.
   1. Create a new file and name it `mojaloop-stateful-resources.json`.
   1. Paste the copied content and commit directly to the `main` branch.

#### Mojaloop Switch: Run the deployment

1. In GitLab, go to **Projects**, click **iac/\<environment identifier\>**.
1. Select **Build > Pipelines**.
1. Ensure your latest commit passed the initialization (**init** stage) successfully. Initialization runs automatically on every commit.
1. Run the deploy job:
   1. Select the **deploy** stage of your latest commit.
   1. Run **deploy-infra**. This will deploy the infrastructure, Kubernetes, ArgoCD, together with the configuration you specified. The deployment process takes about 45-60 minutes to complete.
1. Following successful deployment, you can download the artifacts from the **Build > Artifacts** page. (When you run a deploy job, it will save some artifacts.)
   1. Browse **deploy-infra**, and explore its contents.
   1. Go to **ansible > k8s-deploy**.
   1. You will find the following artifacts:
      1. `inventory`: used for Terraform
      1. `oidc-kubeconfig`: the kubeconfig of the Kubernetes environment just deployed
      1. `sshkey`
1. Download the `oidc-kubeconfig` artifact, and save it locally. You will be able to access it via VPN.

#### Mojaloop Switch: Post-deployment verification

##### Configure Kubernetes access

1. Install an OIDC plugin, such as [kubelogin](https://github.com/int128/kubelogin). `kubelogin` is a client-side authentication helper for Kubernetes that enables you to authenticate to a Kubernetes cluster using OIDC (OpenID Connect).

1. Set kubeconfig:

   Example (remember to use your own environment identifier instead of `sw004`):

   ```bash
   # Save downloaded kubeconfig
   mkdir -p ~/.kube
   mv ~/Downloads/kubeconfig ~/.kube/sw004-config

   # Export configuration
   export KUBECONFIG=~/.kube/sw004-config
   ```

##### Verify deployment

Using kubeconfig, you can check if the pods are running, or if you spot some errors to resolve. You can also collect some useful information, for example, URLs.

1. Open `kubeconfig` via a Kubernetes dashboard/navigator app (such as [Lens](https://k8slens.dev/), for example). Alternatively, use your command line terminal.

1. Check ArgoCD applications:

   ```bash
   kubectl get Application -n argocd
   ```

   In case you're prompted to manually navigate to `http://localhost:8000/` in your browser, go ahead and do that. Log in to Zitadel. Then come back to the command line terminal and you should see the requested application info displayed in the terminal. <!-- EDITORIAL COMMENT: Try logging in as non-admin to see what happens. -->

1. Verify if all pods are running:

   ```bash
   kubectl get pods --all-namespaces | grep -v Running
   ```

##### Configure user permissions

1. Log in as admin to Control Center Zitadel to grant permissions.
1. Add user to environment group:
   1. Navigate to **Users** and select your your non-admin user.
   1. In the left-hand menu, click **Authorizations**.
   1. Click **New**.
   1. Under **Search for a project**, select your Switch environment from the drop-down menu.
   1. Select all the roles and click **Save**.

#### Mojaloop Switch: Configure service access

##### ArgoCD access

1. Get the ArgoCD portal's URL:

   ```bash
   kubectl get VirtualService -n argocd
   ```

   In the output returned, the `HOSTS` information is the link to the ArgoCD portal.

   Example:

   ```bash
   NAME       GATEWAY                                          HOSTS                                         AGE
   argocd-vs  ["istio-ingress-int/internal-wildcard-gateway"]  ["argocd.int.sw004.hub004.mojaperflab.org"]   32h
   ```

   **NOTE:** In order to have the information you can see in the output, you need to have reached a certain level of deployment to have Istio up and running. Istio is used to provide Ingress and Egress Gateways as well as ingress Virtual Services for the cluster. Without Istio up, you can use `kubectl port-forward` to forward a local port to the ArgoCD API server running inside your Kubernetes cluster. For details, see: [https://argo-cd.readthedocs.io/en/stable/getting_started/#port-forwarding](https://argo-cd.readthedocs.io/en/stable/getting_started/#port-forwarding)

1. Navigate to ArgoCD using the URL.

1. Log in via SSO with Zitadel (recommended).

   Alternatively:

   - Username: `admin`
   - Password:

      ```bash
      kubectl get secret argocd-initial-admin-secret -n argocd \
      -o jsonpath='{.data.password}' | base64 -d
      ```

##### Grafana access

To access the Grafana monitoring dashboards of the Switch environment, perform the following steps:

1. Get Grafana's URL:

   ```bash
   kubectl get VirtualService -n monitoring
   ```

   In the output returned, the `HOSTS` information is the link to Grafana.

1. Navigate to Grafana using the URL.

1. Log in:
   - Option 1: SSO via Zitadel (recommended)
   - Option 2: Local admin account

      ```bash
      # Get username
      kubectl get secret grafana-admin-secret -n monitoring \
      -o jsonpath='{.data.admin-user}' | base64 -d

      # Get password
      kubectl get secret grafana-admin-secret -n monitoring \
      -o jsonpath='{.data.admin-pw}' | base64 -d
      ```

##### Keycloak access

1. Get the Keycloak URLs:

   1. Admin console URL:

      ```bash
      kubectl get VirtualService keycloak-admin-vs -n keycloak
      ```

   1. External URL for OIDC:

      ```bash
      kubectl get VirtualService keycloak-ext-vs -n keycloak
      ```

   In the output returned, the `HOSTS` information is the link to Keycloak.

1. Navigate to Keycloak using the URL.

1. Obtain the credentials:

   ```bash
   # Get username
   kubectl get secret switch-keycloak-initial-admin -n keycloak \
   -o jsonpath='{.data.username}' | base64 -d

   # Get password
   kubectl get secret switch-keycloak-initial-admin -n keycloak \
   -o jsonpath='{.data.password}' | base64 -d
   ```

1. Log in.

##### Business Portal access

1. Get the Business Portal's URL:

   ```bash
   kubectl get VirtualService finance-portal-vs -n mojaloop
   ```

   In the output returned, the `HOSTS` information is the link to the portal.

1. Navigate to the Business Portal using the URL.

1. Log in:

   - Username: `portal_admin`
   - Authentication: Retrieved from Keycloak secret

      ```bash
      kubectl get secret portal-admin-secret -n keycloak \
      -o jsonpath='{.data.secret}' | base64 -d
      ```

##### MCM access

1. Get the MCM portal's URL:

   ```bash
   kubectl get VirtualService mcm-vs -n mcm
   ```
   
   In the output returned, the `HOSTS` information is the link to the portal.

1. Navigate to the MCM Portal using the URL.

1. Log in:

   - Username: `portal_admin`
   - Authentication: Retrieved from Keycloak secret

      ```bash
      kubectl get secret portal-admin-secret -n keycloak \
      -o jsonpath='{.data.secret}' | base64 -d
      ```

##### Testing Toolkit (TTK) access

Get the TTK's URL:

```bash
kubectl get VirtualService mojaloop-ttkfront-vs -n mojaloop
```

In the output returned, the `HOSTS` information is the link to the TTK frontend.

#### Mojaloop Switch: Run TTK tests

##### Automated tests

Following deployment, the following steps are taken automatically:
1. The `moja-ml-ttk-test-val-gp` pod in the mojaloop namespace provisions \<placeholder\>. <!-- EDITORIAL COMMENT: Need to investigate this. -->
1. The `moja-ml-ttk-test-setup` pod in the mojaloop namespace runs automated tests.

Automatic tests help you assess if the system you have just deployed works as expected.

Check the test summary in the logs to see if everything is working fine.

The log details will show a URL to download the test results from. You can use the results to investigate errors.

##### Run Golden Path tests

1. Download the test collection:
    1. Go to: [https://github.com/mojaloop/testing-toolkit-test-cases/releases/tag/v17.0.15](https://github.com/mojaloop/testing-toolkit-test-cases/releases/tag/v17.0.15)
    1. Download the appropriate test collection.

1. Configure TTK.
    1. Load the golden path provisioning collection.
    1. Navigate to: Collections → Hub → Golden Path → P2P Money Transfer.
    1. Set environment to: `examples/environments/hub-k8s-default-environment.json`

1. Execute tests:
    1. Run the test suite.
    1. Verify all tests pass successfully.
    1. Review test results and logs.

#### Mojaloop Switch: Collect PM4ML configuration info

##### Collect Integration URLs

For DFSP/PM4ML integration, collect the following URLs:

- OIDC authentication URL:
    ```bash
    # External Switch OIDC URL
    kubectl get VirtualService keycloak-ext-vs -n keycloak
    ```

- Interoperability API URL:
    ```bash
    # External Switch FQDN
    kubectl get VirtualService interop-vs -n mojaloop
    ```

- MCM public URL:
    ```bash
    # External MCM Public FQDN
    kubectl get VirtualService mcm-vs -n mcm
    ```

##### Get JWT token

1. Access Keycloak:
    1. Log in to the Keycloak admin console.
    2. Select the `fsps` realm in the top-left dropdown.

1. Retrieve the JWT Secret:
    1. Navigate to **Clients** in the menu on the left.
    2. Select `dfsp-jwt` from the list.
    3. Go to the **Credentials** tab.
    4. Copy the `fsp-jwt` secret.

##### Document integration details

Create a document with:

- All collected URLs
- JWT token/secret
- Network connectivity requirements

#### Mojaloop Switch: Troubleshooting

##### Pipeline failures

###### Init pipeline issues

- Verify AWS credentials are correctly set
- Check Vault connectivity
- Review pipeline logs for specific errors

###### Infrastructure deployment failures

- Check AWS service quotas
- Verify domain ownership
- Review Terraform state for conflicts

##### Service access issues

###### OIDC Authentication problems

- Verify Zitadel user permissions
- Check kubelogin installation
- Ensure VPN connection is active

###### Service Unavailable

- Check pod status
- Review ArgoCD sync status
- Verify Istio gateways and virtual services

##### Testing failures

###### TTK connection issues

- Verify TTK URL accessibility
- Check network policies
- Review Istio configuration

###### Golden Path test failures

- Ensure all services are healthy
- Check database connections
- Review service logs for errors