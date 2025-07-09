# Mojaloop Deployment Tools

This document outlines the three deployment options for Mojaloop, ordered by complexity and production-readiness. Each tool serves specific use cases and deployment scenarios.

## Core Test Harness

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(46, 204, 113, 0.3); margin-right: 10px;"></div>
    <span>Development and Testing Environment</span>
</div>

The Core Test Harness provides a single-node development environment using docker-compose. This tool implements a minimal Mojaloop stack without production components, making it suitable for development and testing.

> **🔗 Technical Documentation:**  
> **GAP** - No dedicated technical documentation found for Core Test Harness. Related references in:
> - [Deployment Guide - Prerequisite Backend Helm Deployment](../../../technical/technical/deployment-guide/README.md#_5-1-prerequisite-backend-helm-deployment) (mentions docker-compose examples)
> - [Release Notes](../../../technical/technical/releases.md) (mentions Core-test-harness validation)

### Implementation Details

The Core Test Harness runs on a single machine using docker-compose for orchestration. It deploys core services and backing services without production-grade components like gateways, ingress/egress, or IAM stacks. The implementation uses configurable profiles to manage different deployment scenarios.

Resource requirements include a mid-level laptop or desktop workstation with sufficient memory for container orchestration. The tool integrates with CI pipelines for automated testing and validation.

### Development Workflow

Developers interact with the Core Test Harness through docker-compose commands. The tool supports local development workflows with hot-reloading capabilities. Configuration occurs through environment variables and docker-compose override files.

### Testing Capabilities

The Core Test Harness enables unit testing, integration testing, and end-to-end testing of Mojaloop components. It provides a controlled environment for testing service interactions and validating business logic.

## HELM Deploy

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(230, 126, 34, 0.3); margin-right: 10px;"></div>
    <span>Production Deployment Solution</span>
</div>

HELM Deploy provides production-ready deployment capabilities through HELM charts. This implementation requires a pre-configured Kubernetes cluster and implements production-grade security and performance requirements.

> **🔗 Technical Documentation:**  
> - [Mojaloop Deployment Guide](../../../technical/technical/deployment-guide/README.md) - Comprehensive HELM deployment documentation
> - [Upgrade Strategy Guide](../../../technical/technical/deployment-guide/upgrade-strategy-guide.md) - HELM upgrade procedures  
> - [Deployment Troubleshooting](../../../technical/technical/deployment-guide/deployment-troubleshooting.md) - Common issues and solutions

### Infrastructure Requirements

The deployment requires:
- A hardened Kubernetes cluster
- Network policies and security configurations
- Storage class definitions
- Resource quotas and limits

### Performance Specifications

The implementation must meet these performance criteria:
- 1000+ TPS sustained for one hour
- 99th percentile latency under 1 second for:
  - Clearing operations
  - Lookup operations
  - Agreement of Terms
- 99.99% availability
- Zero RTO/RPO for critical operations

### Security Implementation

Security implementation includes:
- Network policy enforcement
- Pod security policies
- Service mesh integration
- Secret management
- Certificate management

## Infrastructure as Code

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(231, 76, 60, 0.3); margin-right: 10px;"></div>
    <span>Enterprise Deployment Solution</span>
</div>

The Infrastructure as Code (IaC) implementation provides a comprehensive deployment solution supporting multiple platforms and orchestration layers. It implements GitOps patterns for managing multiple hub instances.

> **🔗 Technical Documentation:**  
>  **GAP** - Limited internal technical documentation for IaC setup and configuration
> - [IaC Installation Guide](../../../getting-started/installation/installing-mojaloop.md) - Basic IaC overview (see item 2)
> - [IaC Deployment Blog](https://infitx.com/deploying-mojaloop-using-iac) - External detailed guide
> - [IaC AWS Platform Repository](https://github.com/mojaloop/iac-aws-platform) - AWS-specific implementation

### Platform Support

The implementation supports:
- AWS deployment through CloudFormation/Terraform
- On-premises deployment through Terraform
- Multi-cloud deployment through provider-agnostic modules
- Multiple Kubernetes distributions:
  - Managed k8s services
  - Microk8s
  - EKS

### Control Center Architecture

The control center implements GitOps patterns for:
- Multi-environment management
- Configuration versioning
- Deployment automation
- State management
- Drift detection

### Component Deployment

The implementation deploys:
- Control center services
- Core Mojaloop services
- Backing services
- Portal applications
- IAM infrastructure
- Monitoring stack
- PM4ML components

### Performance and Security

The IaC implementation enforces:
- Production-grade security controls
- Performance requirements matching HELM Deploy
- High availability configurations
- Disaster recovery procedures
- Compliance requirements

## Document History
|Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|5th June 2025| Tony Williams|Added links to technical documentation| 
|1.0|14th May 2025| Tony Williams|Initial version| 