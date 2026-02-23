# IaC Deployment Guide

## Table of contents

- [IaC in the context of Mojaloop](#iac-in-the-context-of-mojaloop)
- [Overview of Mojaloop IaC-based deployment](#overview-of-mojaloop-iac-based-deployment)
- [Deployment how-to](#deployment-how-to)
   - [Deploying the Control Center](#deploying-the-control-center)
      - [Control Center: Prerequisites](#control-center-prerequisites)
      - [Control Center: Prepare the infrastructure](#control-center-prepare-the-infrastructure)
      - [Control Center: Deploy Control Center host](#control-center-deploy-control-center-host)
      - [Control Center: Set up the Control Center container](#control-center-set-up-the-control-center-container)
      - [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)
      - [Control Center: Post-deployment configuration](#control-center-post-deployment-configuration)
      - [Control Center: Troubleshooting](#control-center-troubleshooting)
      - [Control Center: Maintenance](#control-center-maintenance)
      - [Control Center: Destroy the Control Center](#control-center-destroy-the-control-center)
   - [Deploying the Mojaloop Switch environment](#deploying-the-mojaloop-switch-environment)
      - [Mojaloop Switch: Prerequisites](#mojaloop-switch-prerequisites)
      - [Mojaloop Switch: Initialize the bootstrap environment](#mojaloop-switch-initialize-the-bootstrap-environment)
      - [Mojaloop Switch: Configure secrets in the Vault](#mojaloop-switch-configure-secrets-in-the-vault)
      - [Mojaloop Switch: Add custom configuration](#mojaloop-switch-add-custom-configuration)
      - [Mojaloop Switch: Run the deployment](#mojaloop-switch-run-the-deployment)
      - [Mojaloop Switch: Verify the deployment](#mojaloop-switch-verify-the-deployment)
      - [Mojaloop Switch: Access the portals](#mojaloop-switch-access-the-portals)
      - [Mojaloop Switch: Troubleshooting](#mojaloop-switch-troubleshooting)
      - [Mojaloop Switch: Destroy the Switch environment](#mojaloop-switch-destroy-the-switch-environment)
   - [Create a simulated DFSP in MCM](#create-a-simulated-dfsp-in-mcm)
   - [Deploying Payment Manager for Mojaloop](#deploying-payment-manager-for-mojaloop)
      - [Deploy PM4ML: Deploy PM4ML host](#deploy-pm4ml-deploy-pm4ml-host)
      - [Deploy PM4ML: Access the PM4ML portal](#deploy-pm4ml-access-the-pm4ml-portal)
      - [Deploy PM4ML: Access the MCM portal](#deploy-pm4ml-access-the-mcm-portal)
      - [Deploy PM4ML: Access the Testing Toolkit (TTK)](#deploy-pm4ml-access-the-testing-toolkit-ttk)
<!-- [Appendix: Notes for on-prem deployments](#appendix-notes-for-on-prem-deployments)
   [Required Virtual Machines](#required-virtual-machines)
   [Recommendations for the Virtual Machines](#recommendations-for-the-virtual-machines) -->

## Introduction

One of the ways you can deploy Mojaloop is via Infrastructure-as-Code (IaC), allowing you to automate the process of provisioning and deploying the servers, networks, databases, and other resources that make up an environment.

This guide describes how to install and configure Mojaloop environments leveraging IaC tools and automation.

<!-- ### IaC in general

IaC is the practice of defining and managing infrastructure through machine-readable configuration files. You treat your service components as code and run scripts (rather than applying manual processes) when setting up your target infrastructure. This results in more consistent environments, faster deployments, and easier rollback or replication.

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
- **Monitoring tools** (for example, Grafana): to observe and track what happens post-deployment -->

## IaC in the context of Mojaloop

Mojaloop provides IaC code to facilitate the provisioning and deploying of Mojaloop resources. While the code provided is specific to certain use cases, it can be reused and customised to fit individual needs -- for example, cloud versus on-premise deployments. <!-- This guide assumes a cloud-based deployment, with on-prem specifics called out where possible. -->

Mojaloop IaC code:

- Provides cloud-agnostic Infrastructure as Code (IaC) to be used in provisioning Kubernetes (K8s) clusters for use as Mojaloop Switches and/or Payment Managers.
- Automatically enables the use of a Control Center in a secure fashion.
- Provides modules for the following:
   - Automated GitOps-style provisioning of separate clusters dedicated to Mojaloop and Payment Manager for Mojaloop (PM4ML), respectively, via the use of reusable open-source modules.
   - A Vault instance to securely store configuration secrets as well as manage PKI configuration for mutual TLS enabled endpoints.
   - Automatically configured OIDC access control.
   - Wireguard mesh routes that provide the ability for individual clusters to securely reach private Control Center services and that also provide operator access to the clusters.
   - Automated handling of DNS/TLS termination for all public and private endpoints.
   - Various components such as Mojaloop Connection Manager (MCM) and an IAM stack to provide access control for Mojaloop services.
   - Database configuration that is specified at deployment time in order to allow the operator to choose in-cluster versus managed services for MySQL, Kafka, PostgreSQL and MongoDB.
- Provides High Availability and Disaster Recovery capabilities via the use of Kubernetes best practices.

To work effectively with Infrastructure-as-Code, we advise you to have working knowledge of the following concepts and technologies:

- **Infrastructure fundamentals**: to understand the resources you are managing (compute, networking, storage, identity and access management, regions and availability zones, and so on)
- **Containers and orchestration** (for example, Docker, Kubernetes, control plane, worker nodes, and so on): to understand how to manage containerised resources
- **Security and governance** (managing secrets, least privilege principle): to understand how to manage high-privilege resources
- **At least one IaC tool** (for example, Terraform, Ansible): to understand how IaC tools structure modules, resources, variables, and state
- **CI/CD and DevOps concepts**: to automate deployments
- **AWS services**: to understand configuration options and best practices of AWS resources configured and managed via IaC tools (such as: EC2 (virtual machines), S3 (object storage), VPC (networking), IAM (identity and access), RDS (databases))
- **Monitoring tools** (for example, Grafana): to observe and track what happens post-deployment

## Overview of Mojaloop IaC-based deployment

<!-- The following figure provides a high-level overview of the Mojaloop IaC deployment process (a concrete example).

![Mojaloop IaC sequence](assets/diagrams/iacDeployment/mojaloop_iac_sequence.png) -->

<!-- Diagram source file: https://app.diagrams.net/#G1YEjT1fDGisr1v6jujAEztCXND1eh50gS#%7B%22pageId%22%3A%22D1AxLu6UM391d6UU7Rue%22%7D -->

Mojaloop and PM4ML are cloud-native applications that are designed to run on top of Kubernetes (K8s). Both applications leverage similar capabilities in terms of databases, ingress control, Public Key Infrastructure (PKI) requirements for mTLS, and so on. Thus, we reuse the same infrastructure as code and extend it with slight modifications for the two scenarios. There is also the ability to run both Mojaloop and PM4ML in the same cluster for development purposes.

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

- Administrative privileges or IAM user with sufficient permissions <!-- QUESTION: What are those permissions exactly?  -->
- AWS CLI configured with appropriate credentials:
   - Install the AWS CLI. For guidance, see AWS article [Installing or updating to the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
   - Set up an access key for AWS CLI via the AWS console > your profile (following login, click your username in the top right corner) > **Security credentials** menu > **Create access key**.
   - Run `aws configure` in a terminal. This will automatically create a file named `credentials` in your home directory, in a folder named `.aws`. Store your AWS access key in the `credentials` file. This is needed so you can run AWS commands from your terminal. For more information, see AWS article [Configuration and credential file settings in the AWS CLI](https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html).
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
- Access to DNS management (AWS Route 53 or external provider)

#### Control Center: Prepare the infrastructure

##### Create SSH key pair

Generate an SSH key pair for secure access to the Control Center infrastructure.

1. Create the key pair through the AWS EC2 console or CLI.

   For details, see AWS article [Create a key pair for your Amazon EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html)

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

1. Create the required IAM group for Control Center operations through the AWS EC2 console or CLI. For details, see AWS article [Create IAM groups](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_create.html)

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

Deploy a dedicated VM to host the Control Center utility container. This will serve as the "Build Server". This Build Server can be re-used for any future deployments.

VM specifications:

- **Instance Type**: t3.medium
- **Operating System**: Ubuntu 24.04 LTS
- **Storage**: 16 GiB root volume (expandable as needed)
- **Security Group**: Allow SSH (port 22) from anywhere (If you're launching the VM instance via the AWS console (**EC2 > Instances > Launch instance**), choose **Anywhere** in the **Allow SSH traffic from** drop-down menu.)
<!-- - **Network**: Public subnet with Elastic IP EDITORIAL COMMENT: I haven't found the Elastic IP option in the GUI. -->
- **Authentication**: SSH key created earlier in section [Create SSH key pair](#create-ssh-key-pair)

Once the instance has been launched, record the public IP address, it will be needed when you ssh to the VM (next step).

#### Control Center: Deploy Control Center host

##### Initial system configuration

Connect to the Control Center host and perform initial setup:

1. Connect to your Control Center host VM via SSH:

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

The Build Server is now ready.

##### Set AWS credentials

Set AWS credentials so the first `terragrunt apply` can use those credentials to build the AWS infrastructure.

1. Put your key ID, access key, and session token in `~/.aws/credentials`:

   Change directory to the `aws` folder:

   ```bash
   cd aws
   ```

   Create and edit the `credentials` file:

   ```bash
   vi credentials
   ```

   Configure the following:

   ```bash
   [oss] 
   aws_access_key_id = <YOUR_AWS_ACCESS_KEY_ID>
   aws_secret_access_key = <YOUR_AWS_SECRET_ACCESS_KEY>
   ```

1. Set the profile in `~/.aws/config`:

   Create and edit the `config` file:

   ```bash
   vi config
   ```

   Configure the following:

   ```bash
   [profile oss]
   region = <YOUR_AWS_REGION>
   output = json
   ```

1. Create the `oss` AWS profile:

   ```bash
   aws configure --profile oss
   ```

   Provide the following when prompted:

      - AWS Access Key ID
      - AWS Secret Access Key
      - AWS Region
      - Output format (json)

1. If you use MFA to access your AWS account, you must generate MFA credentials.

   When you run the command below, don't forget to replace the following:

      - **<IDENTIFIER_OF_YOUR_MFA_DEVICE>**: This is the Identifier displayed in the AWS portal under **your profile in the top-right corner > Security credentials > Multi-factor authentication (MFA)**. It will be in this format: `arn:aws:iam::<your-aws-account-id>:mfa/<your-mfa-device-name>`
      - **<MFA_CODE_DISPLAYED_IN_YOUR_MFA_DEVICE>**: This is the code displayed right now in your device  (typically, your phone) that you use for MFA authentication to AWS.

   ```bash
   aws sts get-session-token --profile oss --duration-seconds 129600 --serial-number <IDENTIFIER_OF_YOUR_MFA_DEVICE> --token-code <MFA_CODE_DISPLAYED_IN_YOUR_MFA_DEVICE>
   ```

1. Copy the `AccessKeyId`, `SecretAccessKey`, and `SessionToken` values returned in the terminal. You will need them in the next step.

1. Edit the `~/.aws/credentials` file and replace the existing credentials with the following, using the MFA-generated credentials you copied in the previous step:

   ```bash
   [oss] 
   aws_access_key_id = <MFA_GENERATED_ACCESS_KEY_ID>
   aws_secret_access_key = <MFA_GENERATED_SECRET_ACCESS_KEY>
   aws_session_token = <MFA_GENERATED_SESSION_KEY>
   ```

1. Go back to the home directory: `cd ..`

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

After `--name` and `--hostname`, remember to change <NAME_OF_YOUR_CONTROL_CENTER_CONTAINER> and <NAME_OF_YOUR_CONTROL_CENTER_HOST_INSIDE_CONTAINER>.

```bash
docker run -t -d -v /home/ubuntu/.aws:/root/.aws --name <NAME_OF_YOUR_CONTROL_CENTER_CONTAINER> --hostname <NAME_OF_YOUR_CONTROL_CENTER_HOST_INSIDE_CONTAINER> --cap-add SYS_ADMIN --cap-add NET_ADMIN ghcr.io/mojaloop/control-center-util:6.1.2
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

   1. Specify which version of IaC you want to use (this needs to be determined before), for example (at the time of writing, mcm-1770187122 is the recommended release and [tag](https://github.com/mojaloop/iac-modules/tags)): `IAC_TERRAFORM_MODULES_TAG=mcm-1770187122`

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
      iac_terraform_modules_tag: mcm-1770187122 # IaC modules version
      ansible_collection_tag: v7.0.0-rc.144     # Ansible collection version
      vpc_cidr: 10.73.0.0/16

      enable_object_storage_backend: true 
      microk8s_dev_skip: false 
      k8s_cluster_module: eks 
      k8s_cluster_type: eks                     # Set to microk8s for on-prem deployments 
      private_dns_zone_id: "empty"
      tags:                                     # AWS resource tags
         Origin: Terraform 
         mojaloop/cost_center:                  # Ensure that you use a tag that has already been set up in AWS <!-- QUESTION: Where can we set that? -->
         mojaloop/env:                          # Ensure that you use a tag that has already been set up in AWS <!-- QUESTION: Where can we set that? -->
         mojaloop/owner: 
      nodes: 
         master-generic: 
            node_count: 3
      ```

1. Create and configure the `merged-config/common-vars.yaml` file.

   Create the `merged-config` folder:

   ```bash
   mkdir merged-config
   ```

   Create and edit the `common-vars.yaml` file:

   ```bash
   vi merged-config/common-vars.yaml
   ```

   Configure the following:

   **NOTE:** Proxmox-related variables are not required for a cloud-based (AWS) deployment, so when deploying the Control Center in the cloud, you can leave them as-is. Since they are configured to be required for all deployments, the dummy values specified below must be passed. Without the dummy values, the wrapper script that you are going to run in a subsequent step would fail.

   **NOTE:** Notice the comments next to the `mimir` values. The values that have been commented out represent the default values, together with a multiplier that is used to arrive at an optimized value. For example: the default value for `mimir_distributor_requests_cpu` is `500`, but we multiplied it by `0.7` to have the optimized value of `350`.

   **NOTE:** The value of `argocd_reconciliation_timeout` can differ based on the environment. By default, ArgoCD reconciles every 10 seconds, fetching the desired state from GitLab for comparison and applying changes if needed. In a dev environment where there are frequent changes, it is good practice to keep the timeout at the default value. However, in a prod environment where there are much fewer changes, the value of 5 minutes (specified below) is sufficient.

   ```yaml
   tf_version: ">= 1.2"
   local_tf_provider_version: "~> 2.4"

   netbird_image_version: "0.60.3"
   coredns_localcache_version: "1.12.1"

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
   mimir_distributor_requests_memory: "256Mi" 
   mimir_distributor_limits_cpu: "525m" # 750m  0.7 
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

1. Back in the **ccnew** folder, export the AWS secrets as environment variables.

   **NOTE:** If you use MFA, the session token is required, and you have to use the MFA-generated credentials.

   ```bash
   export AWS_ACCESS_KEY_ID=<ACCESS_KEY_ID>
   export AWS_SECRET_ACCESS_KEY=<SECRET_ACCESS_KEY>
   export AWS_SESSION_TOKEN=<SESSION_KEY>
   ```

1. Create the `oss` AWS profile:

   ```bash
   aws configure --profile oss
   ```

   Provide the following when prompted:

      - AWS Access Key ID
      - AWS Secret Access Key
      - AWS Region
      - Output format (json)

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
      1. Copy and save the Public IPv4 address, you will need it soon.
   1. Obtain the ssh key.
      1. Open a new terminal.
      1. `docker exec` inside the Control Center container:

         ```bash
         `docker exec it <NAME_OF_YOUR_CONTROL_CENTER_CONTAINER> bash`
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
      1. Paste the ssh key into a new file on your computer (use a meaningful and descriptive folder name):

         ```bash
         vi ~/.ssh/<FOLDER_NAME>
         ```

      1. Change the permission of the file so that only you can read it:

         ```bash
         chmod 400 ~/.ssh/<FOLDER_NAME>
         ```

   1. In a new terminal, connect to the bastion via ssh:

         ```bash
         ssh -i ~/.ssh/<FOLDER_NAME> ubuntu@<BASTION_IP_ADDRESS>
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

      Save the password that is returned, you will need it soon.

   1. Port forward:

      ```bash
      kubectl port-forward svc/argocd-server -n argocd 8080:443
      ```

   1. In a new terminal, create a secure tunnel so that visiting `localhost:8080` on your computer connects to `localhost:8080` on the remote server.

      ```bash
      ssh -i ~/.ssh/<FOLDER_NAME> -L 8080:localhost:8080 ubuntu@<BASTION_IP_ADDRESS>
      ```

   1. In your browser, open: `http://localhost:8080`

      This should open ArgoCD in your browser.

   1. Log in using the following credentials:

      - username: `admin`
      - password: `<THE_PASSWORD_THAT_YOU_HAVE_JUST_COPIED>`

   1. Observe how your applications are progressing. You can click **root-deployer** to have an overview of the status of each application. The root-deployer deploys the applications as per the configured sync waves (the order of waves has been set up so that dependencies are deployed first).

1. Once the wrapper script has run successfully, the Terraform state will be in the container, so you need to push the state to the new system (the Kubernetes cluster):

   `./movestatetok8s.sh`

   This enables team collaboration and state persistence within the Control Center.

You are now done deploying the Control Center.

#### Control Center: Post-deployment configuration

##### Zitadel: Set up a user account for all portals

All Control Center services (GitLab, ArgoCD, Grafana, Vault, and so on) use Zitadel for Single Sign-On (SSO). Once you create your user account in Zitadel, you will use the same credentials to access all portals.

1. Access Zitadel.

   You can access Zitadel via your browser, no VPN connection is required. The URL will be in this format: `https://zitadel.<CLUSTER_NAME>.<DOMAIN>`

   The `CLUSTER_NAME` and `DOMAIN` values come from the `cluster-config.yaml` file that you configured earlier (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

   For login, use the default credentials:

   - Username: `rootauto@zitadel.zitadel.<CLUSTER_NAME>.<DOMAIN>`
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

1. Go to the NetBird dashboard: `https://netbird-dashboard.<CLUSTER_NAME>.<DOMAIN>`

   The `CLUSTER_NAME` and `DOMAIN` values come from the `cluster-config.yaml` file that you configured earlier (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

1. On the login page, log in with your new user.

1. You will be prompted to install the NetBird client.

   ![Nebird: Install NetBird client](assets/screenshots/iacDeployment/003_cc_download_netbird_linux.png)

1. Retrieve the Management URL shown on the dashboard.

1. Open the client that you have just installed, and go to **Settings > Advanced Settings**.

1. Specify the **Management URL**, then click **Save**.

1. Establish a VPN connection.

   1. Open the NetBird client and click **Connect**.
   1. On the Zitadel SSO login page, use the credentials of the new non-root you have just set up in Zitadel.
   1. Follow the on-screen prompts.

Once you have connected, you can access all the portals.

##### GitLab: Set up two-factor authentication

1. Navigate to: `https://gitlab.<CLUSTER_NAME>.<DOMAIN>`

   The `CLUSTER_NAME` and `DOMAIN` values come from the `cluster-config.yaml` file that you configured earlier (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

1. To log in, select the **Zitadel** button.

1. When prompted to select an account, select your non-root user account.

1. Wait until GitLab prompts you to set up two-factor authentication.

   Note that you will not see any projects until you set up two-factor authentication.

1. Enable two-factor authentication for enhanced security, following the prompts to set up 2FA.

   ![GitLab: Enable two-factor authentication](assets/screenshots/iacDeployment/004_cc_gitlab_2factor.png)

1. Once done, go to **Groups** (left-hand menu) and choose **iac**.

   1. Click **bootstrap**. Under **custom-config**, you will find the values that you configured previously (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).
   1. In the **iac** group, you will also find two other environments, they act as templates and are empty. They will be automatically deleted once you have created your first environment.

##### Vault: Verify if secret paths are accessible

1. Go to: `https://vault.int.<CLUSTER_NAME>.<DOMAIN>`

   The `CLUSTER_NAME` and `DOMAIN` values come from the `cluster-config.yaml` file that you configured earlier (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

1. On the login page, select **Method: OIDC**, click **Sign in with OIDC Provider**, then in the window that pops up, choose your new user. <!-- EDITORIAL COMMENT: techops-admin -->

   ![Vault login](assets/screenshots/iacDeployment/006_vault_signin.png)

1. Verify if secret paths are accessible: under **Secret engines**, select **secret/**. You should see a list of secrets for various applications, such as GitLab, Grafana, Mimir, and so on.

   ![Vault secrets](assets/screenshots/iacDeployment/007_vault_secrets.png)

##### Grafana: Review dashboards and set up alerts

1. Go to: `https://grafana.int.<CLUSTER_NAME>.<DOMAIN>`

   The `CLUSTER_NAME` and `DOMAIN` values come from the `cluster-config.yaml` file that you configured earlier (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

1. On the login page, click the **Sign in with Zitadel** button and select your new user.

1. Review pre-configured dashboards. <!-- EDITORIAL COMMENT: Is there any? -->

1. Set up alert channels if required.

##### ArgoCD: Verify if all services are operational

1. Go to: `https://argocd.int.<CLUSTER_NAME>.<DOMAIN>`

   The `CLUSTER_NAME` and `DOMAIN` values come from the `cluster-config.yaml` file that you configured earlier (in section [Control Center: Deploy the Control Center](#control-center-deploy-the-control-center)).

1. On the login page, click the **Sign in with Zitadel** button, and select your new user.

1. Check the status of all applications, verify that they are healthy.

The Control Center is now fully up and running.

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
   nslookup gitlab.<CLUSTER_NAME>.<DOMAIN>
   nslookup zitadel.<CLUSTER_NAME>.<DOMAIN>
   ```

1. Test internal services:

   Once connected via VPN (example - update with your own `cluster_name` and `domain`):

   ```bash
   nslookup argocd.int.<CLUSTER_NAME>.<DOMAIN>
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

**Error message - Example:**

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

This is after having set up a new non-root user in Zitadel and having established a VPN connection via NetBird with this new user.

**Resolution:**

This might be due to your Internet Service Provider's (ISP's) DNS resolution service being slow.

Try changing your network settings to use Google Public DNS: [Configure your network settings to use Google Public DNS](https://developers.google.com/speed/public-dns/docs/using)

#### Control Center: Maintenance

<!-- ##### Adding new environments

1. Update the configuration:

   ```bash
   vi custom-config/environment.yaml
   # Add new environment to the list
   ```

1. Refresh templates:

   ```bash
   ./refresh-env-templates.sh
   ```

1. Apply changes: Sync changes through ArgoCD. -->

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

#### Control Center: Destroy the Control Center

**Prerequisites:**

- You have successfully destroyed all Switch and PM4ML environments.

For details on how to destroy the Switch, see [Mojaloop Switch: Destroy the Switch environment](#mojaloop-switch-destroy-the-switch-environment)

**Steps:**

To completely remove the Control Center:

1. ssh into the Control Center host:

   ```bash
   ssh -i ~/.ssh/<ACCESS_KEY> ubuntu@<PUBLIC_IP_ADDRESS>
   ```

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
   ./destroy-cc.sh
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
- VPN connection via NetBird
- Appropriate RBAC permissions

##### AWS resources

- AWS IAM user with deployment permissions
- Access key ID and secret access key
- Sufficient service quotas in target region

##### Tools and software

- kubectl CLI installed
<!-- - kubelogin for OIDC authentication -->
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
   - **IAC_MODULES_VERSION_TO_UPDATE** → the version of Terraform that you want to use (in our example, it is: `mcm-1770187122`)

1. Run the job. This will populate the repository of the Switch with the default configuration.

1. After successful initialization, access the newly created environment repository at **Groups > iac > <NAME_OF_YOUR_SWITCH_ENVIRONMENT>**.

1. Once in the Switch repository, click **Build > Pipelines** on the left.

   You will see that the environment is being initialized. It will fail because there is no custom configuration. This is fine for now, you will fix this later.

<!-- 1. Repeat the **deploy-env-templates** step for all the environments. -->

#### Mojaloop Switch: Configure secrets in the Vault

Set up the access key as a secret in the Vault.

1. Connect to Vault using the internal URL (requires VPN): `https://vault.int.<CLUSTER_NAME>.<DOMAIN>`

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

To configure the Switch, you are going to use a profile-based approach. What does this mean? You can define a "profile" (= a set of declarative configuration files) with values that are specific to your deployment, and use that profile to override the configuration defined in the **iac-modules** repository.

It is possible to define a separate profile for each and every deployment.

In the example below, we are going to use the [common-profile](https://github.com/infitx-org/common-profile) repository. All you have to do is reference the **common-profile** and the values defined in there will override the configuration defined in the **iac-modules** repository. [common-profile](https://github.com/infitx-org/common-profile) currently only specifies the values that are not defined in the default-config.

**NOTE:** The `cluster-config.yaml` file always needs to be present. Without this file, the deployment will fail.

**NOTE:** If you do not wish to override the default configuration in the **iac-modules** repository, do not reference any profile.

1. In GitLab, go back to the Switch environment.

1. Once in the Switch environment, go to **Code > Repository**.

1. Create a `submodules.yaml` file and configure it as follows:

   ```yaml
   profiles/switch:
   url: https://github.com/infitx-org/common-profile.git       # Replace with your own profile in case you have defined your own custom profile
   ref: main
   ```

   This submodule will clone the profile repository referenced as a git submodule and will merge it directly into the configuration. Anything that has to be overriden will be defined in the below steps.

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
   iac_terraform_modules_tag: mcm-1770187122             
   ansible_collection_tag: v7.0.0-rc.144
   manage_parent_domain: false
   cc: controlcenter
   cc_name: controlcenter
   sc: sccontrolcenter                                   # Dummy value for cloud-based deployments so that Terraform doesn't fail
   currency: <YOUR_CURRENCY>
   switch: <NAME_OF_YOUR_SWITCH>                         # In PM4ML, it will be replaced by e.g., test-<switch>-dfsp1
   tags:
      {
         "Origin": "Terraform",
         "mojaloop/cost_center": "<YOUR_COST_CENTER>",   # Ensure that you use a tag that has already been set up in AWS <!-- QUESTION: Where can we set that? -->
         "mojaloop/env": "<YOUR_ENVIRONMENT>",           # Ensure that you use a tag that has already been set up in AWS <!-- QUESTION: Where can we set that? -->
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
         REPORTING_TEMPLATE_API_ENDPOINT: https://finance-portal.int.<YOUR_SWITCH_ENVIRONMENT_NAME>.<YOUR_DOMAIN>/api/reports/report-multilateral-settlement    # Don't forget to update this

   reporting-hub-bop-shell:
   configFiles:
      config.json: # Feel free to customise the title, subtitle, image, colour
         TITLE: 'STG'
         SUBTITLE: 'Finance Portal'
         TITLE_IMAGE: 'data:image/webp;base64,UklGRlgDAABXRUJQVlA4IEwDAADwOACdASoAAlUBPpFGnkslo6KhpegAsBIJZ27hdrD0s7jrxt7P+7d/gLj/QAAB2S9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFKq9rLzcbA82B5sDzYHmwPNgebA82B5sDzYHmwPNgebA82B5sDzEIKY9N402B5sDzYHmwPNgebA82B5sDzYHmwPNgebA82B5sD07Fi3GwSrIjmk/fLYxJXvUOiOOd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yieH8ymNMHXYOuwddg67B12DrsHXYOuwddg67B12DrsHXYOuwddeQWLggk2B5sDzYHmwPNgebA82B5sDzYHmwPNgebA82B5sDzYY4UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75RS9xZ3yil7izvlFL3FnfKKXuLO+UUvcWd8ope4s75FAAD+/1/XP680CKPv//UGf/kGf/kGfqdMAARoAAAAAAAAAAAAAAAAAAACK+Kj032G4DHtg7Dwb0/4XH+klVC7pX9JKmN8EBg029Q3DW3qG4a29Q3DW3qG4a29Q3DW3qG2e/d1heeks2PKf9+bTfhdiJPvK28+3AsZPonFI4dE24ianN8MOImpzfDDiJqc3ww4ianN8MOImpzfN8lU84L/C0depefb/ndz+l12BZFWK67AsirFddgWRViuuwLIqxXXYFkVYrrsCeYIAAAAAAAAAAYn8NAaKQKSgL4g00WExaGr708XHVLA7e22TJfTxcdUsDt7bZMl9PFx1SwO3ttkyX08XHVLA7e22TJfTxcdUsDt7baTsicKMrlfN+L/tj8Ka3Pzb/SIOpinaMzQWRtY6qdBDuDpt4lyHVlzaptU8jsza9IrcuOXHTbxLkOrLm1Tap5HZm16RW5ccuOm3iX57oFSyQAAcCAAATyAADJYAAhzgAFWgAA0mAAAAAAA'
         TITLE_BAR_COLOR: '#0C1C8C'
   ```

1. Create a `mojaloop-stateful-resources-monolith-databases.yaml` file and configure it as follows:

   ```yaml
   common_platform_db:
   provider: rds
   common_mojaloop_db:
   provider: rds
   common_mongodb:
   provider: documentdb
   ```

   There will be two RDS databases: one for Ory, Keycloak, etc., and one for Mojaloop services such as the Central Ledger, MCM, etc. The MongoDB documentdb database will be for the Finance Portal, the collections, settlements, etc. <!-- EDITORIAL COMMENT: In the case of an on-prem deployment, they are created from Percona in the Storage-Cluster. -->

   `mojaloop-stateful-resources-monolith-databases.yaml` will create the databases and the default configuration: t3.million databases with a single instance. If you need bigger databases or more instances, you can add appropriate values. <!-- EDITORIAL COMMENT: We need to add an appendix with the full values from session 2, Nov 7th. The files in the default-config folder will not work, as they contain placeholders. In session 2, we specified values in place of the dummy values or placeholders. -->

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

1. Create a `platform-stateful-resources.yaml` file and configure it as follows: <!-- EDITORIAL COMMENT: Instead of `external`, we could've set internal/in-cluster also because we support it for on-prem for Percona, etc. -->

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

1. Create a `values-hub-provisioning-override.yaml` file and configure it as follows: <!-- QUESTION: Do we need to create the same file under default-config? 56:28-->

   ```yaml
   testCaseEnvironmentFile:
   inputValues:
         currency: "<YOUR_CURRENCY>"                              # Change this to your currency
         DEFAULT_SETTLEMENT_MODEL_NAME: "DEFAULTDEFERREDNET"
         hubEmail: "hub@example.com"
   ```

1. Commit your changes to main.

1. Run **init**. The first init may fail but this is fine for now. For the init to succeed, the S3 buckets must be up.

   <!-- QUESTION: Do we have to run merge-config before init? Also, do we have to wait and re-run **init** until it succeeds? -->

   <!-- EDITORIAL COMMENT: call 3 33:00-35:00 -->

1. Run **refresh-templates**.

   Whenever you use profiles, you need to run the **refresh-templates** job before the deploy job (via **GitLab > switch > Build > Pipleines**). The **refresh-templates** job will fetch the repository, add it as a submodule, and apply it.

<!-- call 3 37:00  We have to run refresh-templates only when you add a sub-module. Otherwise you can run the deploy job without it. You run refresh-templates when using profiles for the first time. When you just update something in the already existing profile, you don't need to run it. ??? However, if you change the profile, you have to run refresh-templates. It's because it's the one that will clone the profile and make that update. Each time we just update??? iac-modules or common-profiles, we have to run refresh-templates. -->

<!-- QUESTION: When do you have to run refresh-templates? Only when you add a sub-module? When using profiles for the first time? When you start referencing a whole different profile in the sub-module? When you just update something in the already existing profile, do you have to run it? -->

#### Mojaloop Switch: Run the deployment

1. Once **refresh-templates** has completed successfully, run **deploy-infra**.
   1. Select the **deploy** stage of your latest commit.
   1. Run **deploy-infra**. This will deploy the infrastructure, Kubernetes, ArgoCD, together with the configuration you specified.
      (After **deploy-infra** has run, two more jobs will run: **lint-apps** and **push-apps**. Following the **lint-apps** job, a **push-apps** job runs automatically, which will push the manifests generated for the ArgoCD applications.)
1. Wait until the job finishes successfully.

#### Mojaloop Switch: Verify the deployment

After **deploy-infra** has run successfully, you can check how the deployment of the various applications is progressing. You can do this in the following ways:

- If NetBird is not yet up and running: Use the bastion of the environment. For details, see section [Verify deployment via the bastion](#verify-deployment-via-the-bastion).
- If NetBird is already up and running: Access ArgoCD in your browser via port forwarding. For details, see section [Verify deployment via ArgoCD when NetBird is up and running](#verify-deployment-via-argocd-when-netbird-is-up-and-running).

##### Verify deployment via the bastion

1. After **deploy-infra** has run successfully, you can download the artifacts from the **Build > Artifacts** page. (When you run a deploy job, it will save some artifacts.)
   1. Browse **deploy-infra**, and explore its contents.
   1. Go to **ansible > k8s-deploy**.
   1. You will find the following artifacts:
      1. `inventory`: used for Terraform
      1. `oidc-kubeconfig`: the kubeconfig of the Kubernetes environment just deployed
      1. `sshkey`
1. ssh into the bastion of the environment. <!-- QUESTION: Why do we need to do that? --> For this, you need to grab the ssh key from the `sshkey` artifact, and the IP address of the bastion from the `inventory` artifact.
1. Copy the contents of the `sshkey` file, and paste it into the following new file: `~/.ssh/<ENVIRONMENT>-sshkey`
1. Grant read-only permissions to the ssh key:

   ```bash
   chmod 400 ~/.ssh/<ENVIRONMENT>-sshkey
   ```

1. To get the IP address of the bastion, open the `inventory` file and copy the value of `ansible_host`. Save this value because you will need it in the next step. You will find `ansible_host` at the top of the file, here:

   ```yaml
   all:
      hosts:
         bastion1:
            ansible_host: <IP_address>
      vars:
         ...
   ```

1. ssh into the bastion of the environment: <!-- QUESTION: Which port do we need to specify? -->

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

   When Netbird is in a synced state, you can log in to ArgoCD directly from the browser. See the next section: [Verify deployment via ArgoCD when NetBird is up and running](#verify-deployment-via-argocd-when-netbird-is-up-and-running).

##### Verify deployment via ArgoCD when NetBird is up and running

###### Configure user permissions

1. Log in as admin to Control Center Zitadel to grant permissions.
1. Add user to environment group:
   1. Click the Zitadel logo in the top left corner.
   1. Click **Users** and select your your non-admin user.
   1. In the left-hand menu, click **Authorizations**.
   1. Click **New**.
   1. Under **Search for a project**, select your Switch environment from the drop-down menu, and click **Continue**.
   1. Select all the roles and click **Save**.

###### Access ArgoCD

1. Go to: `https://argocd.int.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>`

   The `<NAME_OF_YOUR_SWITCH_ENVIRONMENT>` and `<NAME_OF_YOUR_DOMAIN>` values come from the `cluster-config.yaml` file that you configured earlier.

1. Log in using the **LOG IN VIA ZITADEL** button. When prompted, select the non-admin user account.

1. At this point, you can exit the bastion, you will not need it anymore.

1. Back in ArgoCD, go to **Applications** to see how the deployment of the applications is progressing.

1. Check how the deployment of databases is progressing.

   1. Go to **mojaloop-stateful-resources-app**. This app creates one RDS database for MCM, Central Ledger, Account Lookup, etc., and one DocumentDB for reporting, settlements, collections, etc.

      Ctrl+F and search for the string "rds". You will see that the deployment of the RDS clusters and the DocumentDB clusters are still progressing. Their deployment might take some time. You can check their progress in AWS as well by going to **Aurora and RDS > Databases** and **Amazon DocumentDB > Clusters** and checking values in the **Status** column (status **Creating** vs status **Available**).

   1. Go to **common-stateful-resources-app**. This app deploys one common RDS database for Keycloak, Ory, Kratos, Keto, etc. for the common statful resources. Ctrl+F and search for the string "rds". Check the health indicators (Synced, Healthy) of the RDS cluster to determine the progress of deployment.

When all the pods are up and running, you can start accessing the various portals (MCM portal, Finance Portal).

#### Mojaloop Switch: Access the portals

##### Configure Kubernetes access

You will use the kubetctl command-line tool to retrieve portal credentials from the Kubernetes clusters. For this, you need to set a kubeconfig file so that kubectl knows how to talk to your Kubernetes clusters.

1. In GitLab, navigate to the Switch: `https://gitlab.<CLUSTER_NAME>.<DOMAIN>/iac/<NAME_OF_YOUR_SWITCH_ENVIRONMENT>` You can download artifacts from the **Build > Artifacts** page. (When you run a deploy job, it will save some artifacts.)
   1. Browse **deploy-infra**, and explore its contents.
   1. Go to **ansible > k8s-deploy**.
   1. You will find the following artifacts:
      1. `inventory`
      1. `oidc-kubeconfig`: the kubeconfig of the Kubernetes environment just deployed
      1. `sshkey`
1. Download the `oidc-kubeconfig` artifact, and save it locally.
1. Set kubeconfig:

   Example (remember to use your own environment identifier instead of `sw001`):

   ```bash
   # Save downloaded kubeconfig
   mkdir -p ~/.kube
   mv ~/Downloads/kubeconfig ~/.kube/sw001-config

   # Export configuration
   export KUBECONFIG=~/.kube/sw001-config
   ```

##### Access Keycloak

1. Obtain the credentials:

   To obtain the username, execute: `kubectl get secret switch-keycloak-initial-admin -n keycloak -o jsonpath='{.data.username}' | base64 -D`

   To obtain the password, execute: `kubectl get secret switch-keycloak-initial-admin -n keycloak -o jsonpath='{.data.password}' | base64 -D`

1. Go to: `https://keycloak.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>`

   The `<NAME_OF_YOUR_SWITCH_ENVIRONMENT>` and `<NAME_OF_YOUR_DOMAIN>` values come from the `cluster-config.yaml` file that you configured earlier.

1. Log in.

1. Once logged in, check the current realm displayed in the top left corner. If it's not **hub-operators**, then switch to the **hub-operators** realm via the **Manage realm** menu item on the left.

##### Access Grafana

To access the Grafana monitoring dashboards of the Switch environment, perform the following steps:

1. Navigate to Grafana using the following URL: `https://grafana.int.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>`

   The `<NAME_OF_YOUR_SWITCH_ENVIRONMENT>` and `<NAME_OF_YOUR_DOMAIN>` values come from the `cluster-config.yaml` file that you configured earlier.

1. Log in:
   - Option 1: Choose the **Sign in with Zitadel** button and your non-admin user account. (recommended)
   - Option 2: Local admin account

      ```bash
      # Get username
      kubectl get secret grafana-admin-secret -n monitoring \
      -o jsonpath='{.data.admin-user}' | base64 -d

      # Get password
      kubectl get secret grafana-admin-secret -n monitoring \
      -o jsonpath='{.data.admin-pw}' | base64 -d
      ```

##### Access the Business Portal

1. Access the Business Portal at the following URL: `https://finance-portal.int.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>`

   The `<NAME_OF_YOUR_SWITCH_ENVIRONMENT>` and `<NAME_OF_YOUR_DOMAIN>` values come from the `cluster-config.yaml` file that you configured earlier.

1. Log in:

   - Username: `portal_admin`
   - Authentication: Retrieved from Keycloak secret

      ```bash
      kubectl get secret portal-admin-secret -n keycloak -o jsonpath='{.data.secret}' | base64 -D
      ```

1. Once logged in to the Business Portal, update the access rights of the Portal Admin user so that you can use this same user account to access all portals: <!-- QUESTION: Is this needed? Shall I remove this step? Maybe it's not recommended and we only used it in the call to save time? -->

   1. In the left-hand navigation menu, go to **Apps > Roles**. The **Users** page is displayed.
   1. Select **portal_admin@none**, and on the page that is displayed, click **Update Roles**. A **Select Roles** window pops up.
   1. Select all the roles except **audit**, and click **Update Roles**.

##### Access the MCM portal

1. Access the MCM portal at the following URL: `https://mcm.int.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>`

   The `<NAME_OF_YOUR_SWITCH_ENVIRONMENT>` and `<NAME_OF_YOUR_DOMAIN>` values come from the `cluster-config.yaml` file that you configured earlier.

1. Log in:

   - Username: `portal_admin` <!-- EDITORIAL COMMENT: Or is it mcm_admin? -->
   - Authentication: Retrieved from Keycloak secret

      ```bash
      kubectl get secret portal-admin-secret -n keycloak -o jsonpath='{.data.secret}' | base64 -D
      ```

In the MCM portal, you will see a widget displayed for the Hub and for the DFSPs. The DFSPs are created via the custom-config > `pm4ml-vars.yaml` file. It is only the DFSPs for the first deployment that are created via this file. Any future DFSPs must be created via Keycloak and MCM. This can be useful in testing scenarios too, when you want to simulate DFSPs. See section [Create a simulated DFSP in MCM](#create-a-simulated-dfsp-in-mcm).

#### Mojaloop Switch: Run TTK tests

<!-- Once the tests have run successfully, ...
You can check if tests are still running via ArgoCD. Under LAST SYNC, you might see the following status message displayed:
... waiting for completion of hook batch/Job/moja-ml-ttk-test-setup. -->

##### Automated tests

Following deployment, the following steps are taken automatically:

1. The `moja-ml-ttk-test-val-gp` pod in the mojaloop namespace provisions \<placeholder\>. <!-- QUESTION: What does this do? -->
1. The `moja-ml-ttk-test-setup` pod in the mojaloop namespace runs automated tests.

Automatic tests help you assess if the system you have just deployed works as expected.

Check the test summary in the logs to see if everything is working fine.

The log details will show a URL to download the test results from. You can use the results to investigate errors.

##### Run Golden Path tests

1. Download the test collection:
    1. Go to: [https://github.com/mojaloop/testing-toolkit-test-cases/releases/tag/v17.0.15](https://github.com/mojaloop/testing-toolkit-test-cases/releases/tag/v17.0.15) <!-- QUESTION: Should we reference some later version? -->
    1. Download the appropriate test collection.

1. Configure TTK.
    1. Load the golden path provisioning collection.
    1. Navigate to: Collections → Hub → Golden Path → P2P Money Transfer.
    1. Set environment to: `examples/environments/hub-k8s-default-environment.json`

1. Execute tests:
    1. Run the test suite.
    1. Verify all tests pass successfully.
    1. Review test results and logs.

<!-- EDITORIAL COMMENT: Should section Mojaloop Switch: Collect PM4ML configuration info from the old doc be added here? A copy-paste of the old info is available below in Appendix 1. -->

#### Mojaloop Switch: Troubleshooting
<!-- QUESTION: This section comes from the old doc. Is the info below still correct/relevant? -->

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

#### Mojaloop Switch: Destroy the Switch environment

##### Step 1: Destroy the Switch

There is no **destroy** job defined in the pipeline, in order to avoid anyone accidentally running it.

To destroy the Switch, perform the following steps:

1. Make a new commit to main (for example, add a comment to a file) and when formulating your commit message, make sure that it includes the prefix `destroy:`. This prefix is needed to get access to the **destroy** job.

   Example:

   ```bash
   destroy: uninstall the switch
   ```

1. In GitLab, navigate to the Switch environment, and go to **Build > Pipelines**.

1. Wait for the **init** job to complete successfully, then run **deploy-infra**.

1. Once **deploy-infra** has completed successfully, wait for **lint-apps** and **push-apps** to finish too.

   <!-- ARE THESE 2 STEPS NEEDED? 1. Wait for the **init** job of the **update generated configs to project** commit to complete.

   1. Go back to the pipeline of your **destroy: uninstall the switch** commit. -->

1. Go to **cleanup** stage > **destroy** job, and run the job manually. There is no need to define any variables.

1. Once the job has run, go to **AWS > EC2 Instances**. Everything is destroyed in AWS, except for the EBS Volumes, so you need to manually check if you can see any available volumes under **Elastic Block Store > Volumes**. Search by "Volume state = Available". The EC2 Instances detaches the EBS Volumes, but detaching them doesn't mean deleting them. "Available" means that the instance is not in use anymore, the instance is terminated.

1. Delete the GitLab repositories. For details, see section [Step 2: Delete repositories](#step-2-delete-repositories).

##### Step 2: Delete repositories

1. Go to **Projects > iac / bootstrap**.
1. Go to **custom-config**.
1. Delete the `environment.yaml` file. In case you do not wish to destroy the whole Switch, only certain environments, then in the `environment.yaml` file, remove the name of the environment that you want to delete.

   This is needed because there are some S3 buckets created from the Control Center to get used by the environments. They are created based on the `environment.yaml` file. For each environment, when the **init** phase is passed, the S3 buckets will be automatically created. Removing the `environment.yaml` file will remove the S3 buckets.

1. Commit your change.
1. Go to **Build > Pipelines**.
1. Select the latest change.
1. Run the deploy job. <!-- EDITORIAL COMMENT: Which one? -->
1. Go to the repository that you want to delete: **Projects > iac / <NAME_OF_ENVIRONMENT_TO_DELETE>**.
1. In the left-hand navigation pane, select **Deploy > Container registry**. There is a container created and cached inside this repository to be used by the pipeline runners, you will find that container here. To delete the repository, you need to manually delete any containers you find here.

Once you have deleted the repositories/container registries, you are ready to destroy the Control Center. For details, see section [Control Center: Destroy the Control Center](#control-center-destroy-the-control-center).

##### Important note about the destroy sequence

There are Terraform-created resources (such as EKS, EC2 instances, etc.), and there are also other Crossplane-created resources (such as RDS, DocumentDB, Route53, etc.). If you destroy everything in parallel, you will lose the Crossplane operators, and they are the only ones that manage Crossplane-managed resources. Therefore, you need to wait until the Crossplane operator destroys its created resources. Once that's done, you can destroy the Crossplane operator and the whole node.

RDS and databases are managed by ArgoCD using Crossplane, they are not created by Terraform.

### Create a simulated DFSP in MCM
<!-- QUESTION: Is there anything else that has to be done beforehand to set up a simulated DFSP? Should this section be rather part of the Deploy PM4ML chapter? -->

In testing scenarios, you may want to run end-to-end tests with simulated DFSPs. Here's how you can create a simulated DFSP in MCM.

1. Open the MCM portal.
1. In the left-hand menu, go to **Administration > DFSPs**.
1. Click **Add DFSP**.
1. In the **Add DFSP** pop-up window:
    1. Enter a **Name**. This is the name of the DFSP that will be created within the environment.
    1. The **ID** is the unique identifier of the DFSP. This field will be auto-filled for you as both the name and the ID must be the same as the `fspId` registered in the Hub.
    1. In the **Email** field, enter the email address of the DFSP Operator, where an invitation will be sent.
    1. Add a monetary zone by selecting one from the **Monetary Zone** drop-down list.
1. Click **Submit**.
1. Click **Close**.

At this point, the DFSP should receive an email with a link pointing to the MCM portal.

The DFSP must complete the following steps:

1. Retrieve the email sent by MCM.
1. Access the MCM portal using the link provided in the email. When prompted to specify a username and password, specify them.
1. Log in with the new credentials.
1. In the MCM portal, in the left-hand menu, go to **Integration > PM4ML Credentials**.
1. Click **Generate New Credentials**.

   The **PM4ML Keycloak Credentials** page displays, showing a Client ID and a Client Secret. These credentials will be used in PM4ML.

   If later on there is a need to create new credentials, it can be done via the **Regenerate Credentials** button.

### Deploying Payment Manager for Mojaloop

Payment Manager for Mojaloop (PM4ML) can be run as part of simulating DFSPs, for testing purposes.

#### Deploy PM4ML: Deploy PM4ML host
<!-- EDITORIAL COMMENT: Why is this needed? For simulating DFSPs? Or for a Deployment Guide for DFSPs? -->

Deploy a dedicated VM to host the PM4ML container for the DFSP. <!-- EDITORIAL COMMENT: Is this correct? -->

VM specifications:

- **Instance Type**: t2.medium
- **Operating System**: Ubuntu 24.04 LTS
- **Storage**: 32 GiB root volume (expandable as needed)
- **Security Group**: Allow SSH traffic from anywhere (If you're launching the VM instance via the AWS console (**EC2 > Instances > Launch instance**), choose **Allow ssh traffic from: Anywhere** in the drop-down menu.)
<!-- - **Network**: Public subnet with Elastic IP EDITORIAL COMMENT: I haven't found the Elastic IP option in the GUI. -->
- **Authentication**: SSH key created earlier in section [Create SSH key pair](#create-ssh-key-pair)

Once the instance has been launched, record the public IP address, it will be needed when you ssh to the VM (next step).

##### Initial system configuration

Connect to the PM4ML host and perform initial setup:

1. Connect to your PM4ML host VM via ssh:

   ```bash
   # Connect via SSH
   ssh -i ~/.ssh/<NAME_OF_PRIVATE_KEY> ubuntu@<PUBLIC_IP_ADDRESS>
   ```

1. Update system packages:

   ```bash
   # Switch to root user
   sudo su

   # Update system packages
   apt-get update && apt-get upgrade -y
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

1. Check the status of the Docker service:

   ```bash
   sudo systemctl status docker
   ```

   If the service is up and running, you can move on to the next section.

##### Set environment variables

1. Clone the PM4ML Docker repository:

   ```bash
   git clone https://github.com/pm4ml/pm4ml-docker-compose
   ```

1. Change directory:

   ```bash
   cd pm4ml-docker-compose
   ```

1. Copy the example variables file into an `.env` file:

   ```bash
   cp .env.example .env
   ```

1. Modify the configuration in the `.env` file to add your real values:

   ```bash
   vi .env
   ```

   Change the following environment variables:

   - `DFSP_ID`: This is the **CLIENT ID** that you will find in MCM, on the DFSP's **PM4ML Keycloak Credentials** page.
   - `AUTH_CLIENT_ID`: Same as above, so this is the **CLIENT ID** that you will find in MCM, on the DFSP's **PM4ML Keycloak Credentials** page.
   - `AUTH_OIDC_TOKEN_ROUTE`: Ensure that it is equal to the following value: `/realms/hub-operators/protocol/openid-connect/token`
   - `AUTH_CLIENT_SECRET`: This is the **CLIENT SECRET** that you will find in MCM, on the DFSP's **PM4ML Keycloak Credentials** page.
   - `SWITCH_DOMAIN`: This is the following value (replace with actual values): `<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>`
   - `PM4ML_DOMAIN`: This is the following value (replace with actual values): `<NAME_OF_YOUR_DOMAIN>`
   - `WHITELIST_IP`: This is the IP address of the DFSP. Copy and paste the Public IP address from the AWS Instance page.
   - `SUPPORTED_CURRENCIES`: This corresponds to the monetary zone of the DFSP.

   Comment out the lines that do not have any values specified.

   At the bottom of the file, add the following:

   ```bash
   OAuth2/Keycloak configuration for outbound requests
   WSO2_BEARER_TOKEN_ENABLED=true
   OAUTH_TOKEN_ENDPOINT=http://localhost:8080/realms/hub-operators/protocol/openid-connect/token
   OAUTH_CLIENT_KEY=<client id>
   OAUTH_CLIENT_SECRET=<client secret>
   OAUTH_REFRESH_SECONDS=3600
   OIDC_TOKEN_ROUTE=realms/hub-operators/protocol/openid-connect/token
   ```

   Where:

   - `OAUTH_TOKEN_ENDPOINT`: This is the Keycloak URL in this format: `http://keycloak.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>/realms/hub-operators/protocol/openid-connect/token`
   - `OAUTH_CLIENT_KEY`: This is the **CLIENT ID** that you will find in MCM, on the DFSP's **PM4ML Keycloak Credentials** page.
   - `OAUTH_CLIENT_SECRET`: This is the **CLIENT SECRET** that you will find in MCM, on the DFSP's **PM4ML Keycloak Credentials** page.

1. Modify the `docker-compose.yaml` file.

   ```bash
   vi docker-compose.yaml
   ```

   Under `environment`, change the value of `OAUTH_TOKEN_ENDPOINT` to the following (copy and paste the below value as-is):

   ```bash
   https://keycloak.${SWITCH_DOMAIN}${AUTH_OIDC_TOKEN_ROUTE:-/realms/hub-operators/protocol/openid-connect/token}
   ```

##### Configure DNS
<!-- EDITORIAL COMMENT: https://github.com/pm4ml/pm4ml-docker-compose/tree/main -->

1. In AWS, go to **Route 53 > Hosted zones**.
1. Select your base domain in the list of hosted zones.
1. Once on the page of your domain, click **Create record**. The **Create record** page displays.
1. In the **Record name** field, type `portal`.
1. In the **Value** field, enter the IP address of the DFSP. This is the same value that you entered in the `.env` file for `WHITELIST_IP`.
1. Leave all other values as-is.
1. Click **Add another record**.
1. In the **Record name** field, type `ml-connect`.
1. In the **Value** field, enter the IP address of the DFSP. This is the same value that you entered in the `.env` file for `WHITELIST_IP`.
1. Leave all other values as-is.
1. Click **Add another record**.
1. In the **Record name** field, type `ttk`.
1. In the **Value** field, enter the IP address of the DFSP. This is the same value that you entered in the `.env` file for `WHITELIST_IP`.
1. Leave all other values as-is.
1. Click **Create records**.

##### Configure firewall

1. In AWS, go to **EC2 > Instances**. Select the instance of the DFSP.
1. Once on the page of the DFSP instance, select the **Security** tab.
1. Click the entry under **Security groups**.
1. Once on the page of the security group, click **Edit inbound rules**.
1. On the **Edit inbound rules** page, click **Add rule**.
1. In the **Type** field, select **Custom TCP**.
1. In the **Port range** field, type `5050`.
1. In the **Source** field, leave it as **Custom**, and in the second field, click and select **0.0.0.0/0**.
1. Click **Add rule**.
1. In the **Type** field, select **Custom TCP**.
1. In the **Port range** field, type `6060`.
1. In the **Source** field, leave it as **Custom**, and in the second field, click and select **0.0.0.0/0**.
1. Click **Save rules**.

##### Set up SSL certificates

1. Back in the terminal of the PM4ML instance, stop the HAProxy container if running:

   ```bash
   docker compose stop haproxy
   ```

1. Run certificate generation:

   ```bash
   docker compose -f docker-compose-certbot.yaml up
   ```

   If successful, you should see a message that says:

   ```
   ...
   Successfully received certificate.
   Certificate is saved at: ...
   Key is saved at: ...
   This certificate expires on ...
   These files will be updated when the certificate renews.
   ...
   ```

1. Start up PM4ML services for the Finance Portal and TTK:

   ```bash
   docker compose --profile portal --profile ttk up -d
   ```

   Once the process has ended successfully, you are ready to access the portals.

#### Deploy PM4ML: Access the PM4ML portal

1. In the terminal of the PM4ML instance, issue the following command: <!-- EDITORIAL COMMENT: Steps 1-3 are a workaround, need to check if they're still needed. -->

   ```bash
   cat docker/certbot/etc/live/portal.mojaloop.live/fullchain.pem docker/certbot/etc/live/portal.mojaloop.live/privkey.pem > docker/certbot/certs/portal.pem 
   ```

1. Issue the following command:

   ```bash
   chmod 644 docker/certbot/certs/portal.pem 
   ```

1. Issue the following command:

   ```bash
   docker compose --profile portal --profile ttk stop
   ```

   Then:

   ```bash
   docker compose --profile portal --profile ttk up -d
   ```

1. Access the PM4ML portal at: `http://portal.<NAME_OF_YOUR_DOMAIN>`

1. Obtain the credentials from the `.env` file, use the values of the following variables:

   - `PORTAL_USER`
   - `PORTAL_PASSWORD`

1. Log in using the credentials from the `.env` file.

#### Deploy PM4ML: Access the MCM portal
<!-- EDITORIAL COMMENT: Is this needed so that the DFSP can access the PM4ML portal at their end? -->

1. Access the MCM portal as the Hub Operator at the following URL: `https://mcm.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>`

1. Log in:

   - Username: `portal_admin` <!-- EDITORIAL COMMENT: Or is it mcm_admin? -->
   - Authentication: Retrieved from Keycloak secret

      ```bash
      kubectl get secret portal-admin-secret -n keycloak -o jsonpath='{.data.secret}' | base64 -D
      ```

1. Once logged in, go to: **Certificates > TLS Client Certificates**.

1. Select the **Unprocessed DFSP CSRs** tab.

1. Click the **Use Provided CA to Sign CSR** button.

   You should see a message that says: **There are no unprocessed DFSP CSRs**

1. Go to **Administration > DFSPs**.

1. At the end of the row representing the DFSP that you have just added, there are two icons. Click the **Onboard** icon.

   You should see a message that says: **Saved Successfully**

<!-- END OF CALL 7 -->

##### Deploy PM4ML: Access the Testing Toolkit (TTK)

Navigate to the TTK portal using the following URL: `http://ttk.<NAME_OF_YOUR_SWITCH_ENVIRONMENT>.<NAME_OF_YOUR_DOMAIN>:6060`

<!-- EDITORIAL COMMENT: This section needs more info. -->

<!-- QUESTION: Should there be a Destroy PM4ML section here? -->

### Tips and tricks

#### Prefixing commit messages

When configuring the Switch, you can automatically trigger certain jobs by prefixing your commit message in a specific way:
<!-- EDITORIAL COMMENT: Need to double-check the names of the jobs. -->

| Prefix                      | Job                      | Comment |
|-----------------------------|--------------------------|---------|
| `deploy: <your-commit-message>`                   | **refresh-deploy-infra** | This job job will work as a **deploy** and **refresh-templates** at the same time but it will take longer. |
| `deploy-infra: <your-commit-message>`             | **deploy-infra**         | -       |
| `[skip lint] <your-commit-message>`               | Can be added to any job to skip the linter check  | For example, `deploy-infra: [skip lint]` triggers the **deploy-infra** job and skips the linter check. The linter check may sometimes fail, for example, due to CRDs not being available yet. In such cases, skipping the check can be useful. |
| `destroy: <your-commit-message>`                  | **destroy**              | There is no **destroy** job defined in the pipeline, and this prefix will not automatically run it either. The prefix will just show the **destroy** job and you will have to run the job manually. For details, see section [Destroying the Mojaloop Switch environment](#destroying-the-mojaloop-switch-environment). |

#### How to get the IP address of the various services

1. Connect to the NetBird VPN.
1. Open a new terminal.
1. Export kubeconfig.
1. Find out the Kubernetes namespaces in your cluster (you will need to specify namespaces in the next step):

```bash
kubectl get ns
```

1. Find out the host to ping:

   - For the Switch: `kubectl get VirtualService interop-vs -n mojaloop`
   - For Keycloak: `kubectl get VirtualService keycloak-ext-vs -n keycloak`
   - For MCM: `kubectl get VirtualService mcm-vs -n mcm`

   In the next step, you will need to use the value returned under `HOSTS`.

1. Ping the host: ping <HOSTS_VALUE>

#### Configure NetBird for a DFSP

DFSPs do not need to have connection to NetBird because they use public IP addresses to connect to the cluster. In case you still wish to connect a DFSP to NetBird because the DFSP does not have a public IP or you wish to perform some tests, complete the following steps.

1. In NetBird, go to **Setup Keys** in the left-hand menu.
1. Click **Create Setup Key**. The **Create New Setup Key** window pops up.
1. In the **Name** field, add a descriptive name.
1. In the **Expires in** field, leave it empty if you want the key to never expire. Otherwise, you can specify a set number of days. In the latter case, remember that the key has an expiry date and you will need to refresh the key.
1. Click the **Auto-assigned groups** field, and select ??? <!-- EDITORIAL COMMENT: You need to create a separate group for this purpose. But where? -->
1. Click **Create Setup Key**. The **Setup key created successfully** window pops up.
1. Copy and save the key.
1. Inside the VM, complete the following steps: <!-- EDITORIAL COMMENT: Which VM? -->

   1. Install NetBird:

      ```bash
      brew install netbirdio/tap/netbird
      ```

   1. Connect to Netbird using the key created above: 

      ```bash
      netbird up --setup-key <SETUP_KEY> --management-url <MANAGEMENT_URL>
      ```

<!-- Appendix 1: Old Mojaloop Switch deployment steps

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

1. In GitLab, go to **Settings > CI/CD > Variables** (bottom left corner), and create a new variable (click **Add variable**). 

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

   In case you're prompted to manually navigate to `http://localhost:8000/` in your browser, go ahead and do that. Log in to Zitadel as the admin user. Then come back to the command line terminal and you should see the requested application info displayed in the terminal.

1. Verify if all pods are running:

   ```bash
   kubectl get pods --all-namespaces | grep -v Running
   ```

##### Configure user permissions

1. Log in as admin to Control Center Zitadel to grant permissions.
1. Add user to environment group:
   1. Click the Zitadel logo in the top left corner.
   1. Click **Users** and select your your non-admin user.
   1. In the left-hand menu, click **Authorizations**.
   1. Click **New**.
   1. Under **Search for a project**, select your Switch environment from the drop-down menu, and click **Continue**.
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
1. The `moja-ml-ttk-test-val-gp` pod in the mojaloop namespace provisions \<placeholder\>. 
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
- Network connectivity requirements -->


<!-- ## Appendix 2: Notes for on-prem deployments

### Required Virtual Machines

In the case of on-prem deployments, the Virtual Machines (VMs) are provisioned on on-prem servers. The following VMs are required:

**For the Control Center:**

- A Build Server VM to act as the bootstrapper of the Control Center. The Control Center requires:
   - 1 Bastion VM, which will be used as a jump host to ssh to the other nodes.
   - 1 HAProxy VM, which must have a public IP address for traffic that targets the services that need to be publicly accessible, such as GitLab and Zitadel. So traffic will not go directly to where those services run, HAProxy will route traffic to them.
   - 1 Storage-Cluster HAProxy VM to route traffic between the Cluster API (CAPI) service and ProxMox (or your preferred virtualization platform) for requests that go to the Storage-Cluster. For information about the Storage-Cluster, see section [Storage-Cluster](#storage-cluster).
   - 3 Master Node VMs for the K8s cluster - to have a highly available K8s cluster in production.

**For each environment:**

- 1 Bastion VM
- 1 HAProxy VM
- 1 Master Node VM for the K8s cluster - in non-prod environments, 1 Master Node will suffice.

#### Build Server for the Control Center

Just like in the case of cloud deployments, you can use the same Build Server for each Control Center that you deploy.

The Build Server does not have to reach ProxMox. First, it will use the public IP address to reach the Bastion VM and then it will install NetBird so it can communicate with any other VM.

#### Storage-Cluster

The Control Center and the environments use a layer of storage called Storage-Cluster: this is an independent cluster outside the Control Center and any environments. The Control Center and the environments consume storage from the Storage-Cluster.

When bootstrapping the Control Center, the Control Center and CAPI automatically create the VMs for the Storage-Cluster and deploy the Storage-Cluster.

The CAPI needs to be able to communicate with ProxMox (or the virtualization service used to deploy the VMs). For that, we need to create a VM (called "Storage-Cluster HAProxy VM"), which will route traffic between the Control Center / the CAPI service and ProxMox itself. So this VM will only be used for creating the Storage-Cluster, and after that, it won't be used anymore. You need to install HAProxy inside this VM and configure it to route CAPI traffic over port 8006 to the ProxMox cluster IP address so that CAPI can create the Storage-Cluster.

#### HAProxy VM

\<placeholder to talk about the configuration of HAProxy\>

### Recommendations for the Virtual Machines

- **Update and upgrade system packages**
- **Time synchronization via crony**: Install, enable, and start crony on each of the Virtual Machines. This is recommended because there are some services (for example, MongoDB) which can crash if there are seconds of degradation between the nodes' times. Verify synchronization across all the nodes, verify that they all have the exact same timestamp.
- **No password authentication over ssh**: For security reasons, it is recommended to undo password authentication and accept ssh only through private-public keys.
- **Grant sudo privileges to ubuntu users**: IaC always uses ubuntu users, for example, the Ansible scripts in the iac-modules. <!-- QUESTION: Is this correct? -->
<!-- - **Remove unattended-upgrades**: This is recommended because automatically installed updates can potentially produce some instability in the system. -->
