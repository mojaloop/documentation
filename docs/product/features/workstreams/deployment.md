# Deployment Tools Workstream
This workstream is concerned with the provision of tools, documentation and support to enable adopters to deploy the Mojaloop software in a variety of environments, cloud and on-premises.

# Business Justification
Providing a well documented, comprehensive suite of tools that enable adopters to engage with, develop, test, evaluate and operate our software is critical to supporting the establishment and long term sustainability of Mojaloop based IIPS. 

The aim is to enable adopters to deploy Mojaloop easily, in the environment of their choice, and with minimal support from the Community.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| James Bush | Tony Williams<br>Vanda Illyes<br>Sam Kummary<br>Paul Makin<br>Paul Baker<br>Michael Richards|

## Latest Update (Summary)
The Deployment Tools workstream focused on addressing a gap that emerged from increased IaC complexity: many schemes don’t require DRPP-scale infrastructure and are now underserved by the current deployment model. In response, the team began design of “IaC Lite,” a simpler, lower-cost deployment solution for production-quality Mojaloop environments. Early architecture work targets Proxmox (on-prem virtualisation), AWS, and GCP (GKE) — ensuring cloud-agnostic extensibility. Initial Terraform modules are under test in Mojaloop’s on-prem lab, and the team aims to release a community-testable version by end of November. Meanwhile, improved Helm charts are being developed and exercised through the performance and evolution workstreams, reflecting strong cross-stream alignment.

## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|25th November 2025| Paul Makin|Initial version|