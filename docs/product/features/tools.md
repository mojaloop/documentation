# Mojaloop Deployment Tools

This section provides detailed information about the various tools available for deploying Mojaloop.

## Core Test Harness

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(46, 204, 113, 0.3); margin-right: 10px;"></div>
</div>

### Quick Description
A lightweight, single-node deployment tool designed for learning, development, and testing purposes. It uses docker-compose for orchestration and provides a simplified Mojaloop environment without production-grade components.

### Technical Documentation
[Technical Documentation Link] (placeholder)

### Detailed Breakdown

#### Features
- Single node deployment
- Docker-compose based orchestration
- Configurable profiles
- No HELM integration
- No gateway components
- No ingress/egress components
- No IAM stack
- Deploys:
  - Core services & backing services
  - Optional portals
  - Optional monitoring stack
- Used in CI pipelines for integration testing

#### Resource Requirements
- Mid-level laptop or desktop workstation

#### Security
- Zero security - not intended for production use

#### Documentation
- Developer-focused documentation
- Non-technical user documentation for learning objectives
- Product-level documentation explaining features and appropriate use cases

#### SLA
- No SLA provided

#### Limitations
- Never to be used in production
- Never to be used for processing real money transactions

## Miniloop

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(243, 156, 18, 0.3); margin-right: 10px;"></div>
</div>

### Quick Description
A single-node Kubernetes-based deployment tool that provides a more production-like environment for testing and evaluation purposes. It uses HELM with string replacements for configuration.

### Technical Documentation
[Technical Documentation Link] (placeholder)

### Detailed Breakdown

#### Features
- Single node Kubernetes deployment
- Microk8s-based
- HELM with string replacements
- No gateway components
- No ingress/egress components
- No IAM stack
- Deploys:
  - Core services & backing services
- Enables testing in Kubernetes layer

#### Resource Requirements
- Mid-level laptop or desktop workstation

#### Security
- Zero security - not intended for production use

#### Documentation
- Developer-focused documentation
- Semi-technical/BA focused documentation for use-case experimentation
- Product-level documentation explaining features and appropriate use cases

#### SLA
- No SLA provided

#### Limitations
- Never to be used in production
- Never to be used for processing real money transactions
- Useful for testing/understanding HELM charts

## HELM Deploy

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(230, 126, 34, 0.3); margin-right: 10px;"></div>
</div>

### Quick Description
A production-ready deployment solution using HELM charts to deploy Mojaloop services and backing services. Requires user to provide and configure their own Kubernetes infrastructure.

### Technical Documentation
[Technical Documentation Link] (placeholder)

### Detailed Breakdown

#### Features
- HELM charts for Mojaloop services and backing services deployment

#### Resource Requirements
- High-end laptop or workstation
- Small cloud Kubernetes cluster

#### Security
- User is required to harden their own Kubernetes cluster

#### Documentation
- Developer-focused documentation
- Semi-technical/BA focused documentation for use-case experimentation
- Product-level documentation explaining features and appropriate use cases

#### SLA Requirements
- Availability: 4/5 9's
- RTO/RPO: As close to zero as possible
- Throughput/Performance:
  - TPS: 1000+ (sustained for 1 hour)
  - Latency (Percentiles, excluding external latencies):
    - Clearing: 99% < 1 second
    - Lookup: 99% < 1 second
    - Agreement of Terms: 99% < 1 second
- Data Management:
  - Mitigations against data loss (replication, disaster recovery)
  - Retention (audit, compliance)
  - Archiving

#### Limitations
- Can be used in production
- Safe for processing real money transactions
- User/adopter must deploy and configure their own infrastructure
- Security limited to HELM charts - additional security configuration required

## Infrastructure as Code (IaC)

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(231, 76, 60, 0.3); margin-right: 10px;"></div>
</div>

### Quick Description
A comprehensive deployment solution supporting multiple platforms and orchestration layers, implementing GitOps patterns for managing multiple hub instances and environments.

### Technical Documentation
[Technical Documentation Link] (placeholder)

### Detailed Breakdown

#### Features
- Multiple deployment platform targets:
  - AWS
  - On-premises
  - Other clouds (modular)
- Multiple orchestration layer options:
  - Managed k8s
  - Microk8s
  - EKS
- GitOps pattern (control centre)
  - Deploy and manage multiple hub instances/environments
- Deploys:
  - Control centre
  - Core services & backing services
  - Portals
  - IAM stack
  - Monitoring stack
  - PM4ML

#### Resource Requirements
- High-end cloud or on-premise infrastructure

#### Security
- Full security implementation

#### Documentation
- Multiple levels targeting all user types
- Developer documentation for maintenance and enhancement
- Technical operations documentation for infrastructure engineers
- Product-level documentation explaining features and use cases

#### SLA Requirements
- Availability: 4/5 9's
- RTO/RPO: As close to zero as possible
- Throughput/Performance:
  - TPS: 1000+ (sustained for 1 hour)
  - Latency (Percentiles, excluding external latencies):
    - Clearing: 99% < 1 second
    - Lookup: 99% < 1 second
    - Agreement of Terms: 99% < 1 second
- Data Management:
  - Mitigations against data loss (replication, disaster recovery)
  - Retention (audit, compliance)
  - Archiving

#### Limitations
- Can be used in production
- Safe for processing real money transactions

## Document History
|Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|7th May 2025| Tony Williams|Initial version| 