# IaC Deployment Guide

**NOTE:** This document is currently work in progress.

## Table of contents

- [Introduction](#introduction)
   - [IaC in general](#iac-in-general)
   - [When is IaC the right choice?](#when-is-iac-the-right-choice)
   - [IaC in the context of Mojaloop](#iac-in-the-context-of-mojaloop)
- [Overview of Mojaloop IaC-based deployment](#overview-of-mojaloop-iac-based-deployment)
   - [Target infrastructure](#placeholder-target-infrastructure)
- [Deployment how-to](#deployment-how-to)
   - [Deploying the Control Center](#deploying-the-control-center)
      - [Control Center: Prerequisites](#control-center-prerequisites)
      - [Prepare the infrastructure](#prepare-the-infrastructure)
      - [Deploy Control Center host](#deploy-control-center-host)
      - [Set up the Control Center utility container](#set-up-the-control-center-utility-container)
      - [Deploy the Control Center](#deploy-the-control-center)
      - [Control Center: Post-deployment configuration](#control-center-post-deployment-configuration)
      - [Control Center: Verify health and access](#control-center-verify-health-and-access)
      - [Control Center: Troubleshooting](#control-center-troubleshooting)
      - [Control Center: Maintenance](#control-center-maintenance)
   - [Deploying the Mojaloop Switch environment](#deploying-the-mojaloop-switch-environment)

## Introduction

One of the ways you can deploy Mojaloop is via Infrastructure-as-Code (IaC), allowing you to automate the process of provisioning and deploying the servers, networks, databases, and other resources that make up an environment.

This guide describes how to install and configure Mojaloop environments leveraging IaC tools and automation.

### IaC in general

IaC is the practice of defining and managing infrastructure through machine-readable configuration files. You treat your service components as code and run scripts (rather than applying manual processes) when setting up your target infrastructure. This results in more consistent environments, faster deployments, and easier rollback or replication.

![IaC high-level illustration](assets/diagrams/iacDeployment/iac_high_level.png)

Key features:

- **Automation & Repeatability**: Define infrastructure in code to automate the provisioning of environments, eliminating manual, error-prone setup.
- **Modularity & Reusability**: Code can be organised into reusable modules.
- **Idempotency**: Applying the same code multiple times leads to the same infrastructure.
- **Version Control and Lifecycle Management**: IaC code can be stored in Git, enabling change tracking, rollbacks, peer reviews, and auditability.
- **CI/CD Integration**: IaC can be integrated into pipelines to enable fully automated infrastructure deployments.

### When is IaC the right choice?

IaC comes with some overhead of writing and maintaining infrastructure code, and it may not be suitable for every scenario. A good rule of thumb is: a. if you're provisioning infrastructure across multiple environments, b. you need repeatable deployments, and c. you expect your infrastructure or your Infra team to grow – use IaC.
When deciding whether or not IaC-based deployments are the right path for your organisation, it is crucial to understand what IaC _cannot_ do: 

- IaC cannot _guarantee runtime correctness or uptime_, you will need to specifically set up monitoring and alerting capabilities, perform health checks, integration tests, etc.
- IaC cannot automatically _know your intent or business logic_. IaC tools apply the state you define, not what you "mean" to do. For example, IaC can't guess if deleting a resource will break production. You must model intent carefully and understand the impact of each change.
- IaC doesn't _handle full lifecycle management automatically_, for example, it won't clean up unused resources. IaC only manages what's explicitly defined in code.
- IaC doesn't _replace good engineering_. IaC simplifies provisioning, but it still requires: knowledge of cloud/network/database architecture, understanding of resource limits and trade-offs, debugging and maintenance skills, etc.

In light of the above, to work effectively with Infrastructure-as-Code, we advise you to have working knowledge of the following concepts and technologies:

- **Infrastructure fundamentals**: to understand the resources you are managing (compute, networking, storage, identity and access management, regions and availability zones, etc.) 
- **Containers and orchestration** (e.g., Docker, Kubernetes, control plane, worker nodes, etc.): to understand how to manage containerised resources
- **Security and governance** (managing secrets, least privilege principle): to understand how to manage high-privilege resources
- **At least one IaC tool** (e.g., Terraform, Ansible): to understand how IaC tools structure modules, resources, variables, and state
- **CI/CD and DevOps concepts**: to automate deployments
- **AWS services**: to understand configuration options and best practices of AWS resources configured and managed via IaC tools (such as: EC2 (virtual machines), S3 (object storage), VPC (networking), IAM (identity and access), RDS (databases), Lambda (serverless functions))
- **Monitoring tools** (e.g., Grafana): to observe and track what happens post-deployment

### IaC in the context of Mojaloop

Mojaloop provides IaC code to facilitate the provisioning and deploying of Mojaloop resources. While the code provided is specific to certain use cases, it can be reused and customised to fit individual needs (e.g., cloud versus on-premise deployments).

Mojaloop IaC code:

- Provides cloud-agnostic Infrastructure as Code (IaC) to be used in provisioning Kubernetes (K8s) clusters for use as Mojaloop Switches and/or Payment Managers.
- Automatically enables the use of a Control Center in a secure fashion. <!-- EDITORIAL COMMENT: Cross-reference a resource that describes what the Control Center is. -->
- Provides modules for the following:
   - Automated GitOps-style provisioning of separate clusters dedicated to Mojaloop and Payment Manager for Mojaloop (PM4ML), respectively via the use of reusable open-source modules.
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

Mojaloop and PM4ML are cloud-native applications that are designed to run on top of  Kubernetes (K8s). Both applications leverage similar capabilities in terms of databases, ingress control, PKI requirements for mTLS, etc. Thus, we reuse the same infrastructure as code and extend it with slight modifications for the 2 scenarios. There is also the ability to run both Mojaloop and PM4ML in the same cluster for development purposes.

To deploy the Mojaloop and PM4ML environment clusters, the following tools are used:

- **Ansible**: A tool used for provisioning software repeatedly and idempotently via the use of playbooks that make use of reusable roles. These roles leverage modules that are executed on a virtual machine or bare-metal host via an ssh client. The main role of Ansible is to bootstrap the hosts used by the infrastructure with the prerequisites needed to run Kubernetes and initialise ArgoCD.
- **Terraform/Terragrunt**: This tool is used to provision resources via CRUD API calls. These resources range from the creation of network resources, whole K8s clusters, managed databases or the creation of an OIDC application in an identity management solution, etc. 
- **Helm**: A package management tool used to render K8s charts, which are groups of Kubernetes templates.
- **Kustomize**: A tool used to manipulate and render K8s templates, including Helm charts.
- **ArgoCD**: A tool used to deploy artifacts that are rendered via Helm and/or Kustomize to a K8s cluster and maintain the deployed state against a source of truth for the cluster, which is generated from multiple tagged git repositories in concert with environment-specific configuration values that are injected using custom ArgoCD plugins.

### PLACEHOLDER: Target infrastructure

What does Mojaloop IaC code deploy? The following table provides an overview of the various components that Mojaloop IaC provides code for. The code is platform agnostic, you have the ability to run the building blocks of your deployment on any cloud provider or bare-metal.

(placeholder...)

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

- Administrative privileges or IAM user with sufficient permissions
- AWS CLI configured with appropriate credentials
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
- Firewall rules allowing SSH access to bastion hosts

#### Prepare the infrastructure

##### Create SSH key pair

Generate an SSH key pair for secure access to the Control Center infrastructure.

1. Create the key pair through the AWS EC2 console or CLI.

   For details, see: [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html)

   Choose a meaningful name for your key pair, such as: `ml-perf-ccu-host-private-key`

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

1. Create the required IAM group for Control Center operations through the AWS EC2 console or CLI. For details, see: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_create.html

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
- **Security Group**: Allow SSH (port 22) from your IP
- **Network**: Public subnet with Elastic IP
- **Authentication**: SSH key created earlier in section [Create SSH key pair](#create-ssh-key-pair)

Record the public IP address for SSH access.

#### Deploy Control Center host

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

#### Set up the Control Center utility container

We are going to spin up a container and then run Terraform to deploy the Control Center.

1. Launch the container.

   1. Start a new tmux session:

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

   1. Issue `docker ps` to see if the container is up. Look for your container id, in this example, it is: `ml-perf-ccu-4`.

   1. Access the container:

      ```bash
      docker exec -it ml-perf-ccu-4 bash.
      ```

1. Configure the environment.

   1. Go to the `iac-run-dir` folder: 
   
      ```bash
      cd iac-run-dir/
      ```

   1. We are going to set some variables in the `setenv` file:
   
      ```bash
      vi setenv
      ```

   1. Specify which version of IaC you want to use (this needs to be determined before), for example (at the time of writing, v5.9.0 is the latest release): `IAC_TERRAFORM_MODULES_TAG=v5.9.0`

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

#### Deploy the Control Center

1. Access the Control Center deployment directory:

   ```bash
   cd /iac-run-dir/iac-modules/terraform/ccnew/
   ```

1. Now we are going to configure some Control Center parameters.

   Explore what can be configured in the `default-config` folder. Then copy anything you wish to customize into the placeholder `cluster-config.yaml` file in the `custom-config` folder, and make your required changes.

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
      cluster_name: cc004                          # Unique identifier for your Control Center
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
1. Deploy the Control Center by executing the following script: 

   `./wrapper.sh`

   The wrapper will:

   1. Validate configuration files.
   1. Create the AWS infrastructure (VPC, subnets, instances).
   1. Deploy the Kubernetes cluster.
   1. Install and configure all Control Center services.
   1. Set up GitOps with ArgoCD.

1. The Terraform state will be in the container after running the script so you need to push the state to the new system: 

   `./movestatetok8s.sh`

   This enables team collaboration and state persistence within the Control Center.

You are now done deploying the Control Center.

#### Control Center: Post-deployment configuration

##### Zitadel: Set up a user account for all portals

All Control Center services (GitLab, ArgoCD, Grafana, Vault, etc.) use Zitadel for Single Sign-On (SSO). Once you create your user account in Zitadel, you will use the same credentials to access all portals.

1. Access Zitadel.

   You can access Zitadel via your browser, no VPN connection is required. The URL will be in this format: `https://zitadel.<cluster_name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

   For login, use the default credentials:

   - Username: `rootauto@zitadel.zitadel.<cluster_name>.<domain>`
   - Password: `#Password1!`

1. Create a user account with a strong password.

   For details, see: [https://zitadel.com/docs/guides/manage/console/users](https://zitadel.com/docs/guides/manage/console/users)

1. Enable two-factor authentication.

   For details, see: [https://zitadel.com/docs/guides/manage/console/default-settings#login-behavior-and-access](https://zitadel.com/docs/guides/manage/console/default-settings#login-behavior-and-access)

1. Grant appropriate permissions through the root user account. <needs to be elaborated>

##### Netbird: Set up VPN access to services

1. Go to the NetBird dashboard: `https://netbird-dashboard.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. Retrieve the Management URL shown on the dashboard.

1. Install a NetBird client. For details, see: [https://docs.netbird.io/how-to/installation](https://docs.netbird.io/how-to/installation)

1. Open the client, and go to **Settings > Advanced Settings**.

1. Specify the **Management URL**, then click **Save**.

1. Establish a VPN connection.

   1. Open the NetBird client and click **Connect**.
   1. On the SSO login page, use the default credentials.

      - Username: `rootauto@zitadel.zitadel.<cluster_name>.<domain>`
      - Password: `#Password1!`

Now you can access all the portals.

##### GitLab: Set up two-factor authentication

1. Navigate to: `https://gitlab.<cluster_name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. Enable two-factor authentication for enhanced security.

##### ArgoCD: Run the netbird-post-config application

After connecting to the VPN, there is one manual task to do in ArgoCD: sync the netbird-post-config application.

1. Go to: `https://argocd.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. Find the netbird-post-config application and run it.

##### Vault: Verify if secret paths are accessible

<!-- EDITORIAL COMMENT: This section needs to be further elaborated. -->

1. Go to: `https://vault.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. Log in with OIDC authentication.

1. Verify if secret paths are accessible.

##### Grafana: Review dashboards and set up alerts

1. Go to: `https://grafana.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

1. Review pre-configured dashboards.

1. Set up alert channels if required.

##### ArgoCD: Verify if all services are operational

1. Go to: `https://argocd.int.<cluster-name>.<domain>`

   The `cluster_name` and `domain` values come from the `cluster-config.yaml` file that you configured earlier.

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

   From within VPN connection (example - update with your own `cluster_name` and `domain`):

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

(placeholder)