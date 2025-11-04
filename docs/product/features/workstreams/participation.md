# Participation Tools Workstream
The overall objective of the Participation Tools workstream is to develop a “DFSP Tools” portfolio, with the intention of supporting DFSPs and SIs in the integration of the DFSP’s systems with a Mojaloop Hub. Rather than only offering semi-finalised solutions, the portfolio will comprise the tools to carry out an integration, plus a set of exemplar implementations, each tailored to a specific type of DFSP.

It should be emphasised to all DFSPs that reaping the benefits of an inclusive instant payments solution such as Mojaloop relies on the implementation of a “whole ecosystem” approach - and this means extending the reach of the Mojaloop service into the DFSPs’ domains, giving them and their customers the advantages of assurance of transaction finality, lower cost and the reliable delivery of every valid transaction.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| James Bush | Sam Kummary, Yevhen Kryiukha, Paul Baker, Vijay Kumar, Phil Green, Steve Haley, Paul Makin |

## Latest Update (Summary)
The Participation Tools workstream has advanced the long-running effort to refactor and modularise the Mojaloop Connection Manager (MCM). The server component is now fully decoupled from the Mojaloop IaC stack and deployable via Helm into any Kubernetes environment. The onboarding journey has also been re-architected to remove dependency on HashiCorp Vault and Mojaloop’s IAM defaults, allowing standalone, flexible MCM deployments. Only the client-side MCM refactor remains, along with documentation. 

A Docker Compose version of Payment Manager has been developed for smaller DFSPs, and community-facing documentation — including tool selection guidance — has been authored and reviewed. A generalised version of the DRPP system integrator (SI) onboarding guide is planned for future PIs.

## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|4th November 2025| Paul Makin|Initial version|