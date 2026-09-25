# QA Framework Workstream
The overall objective of this workstream is to develop a QA Framework that can be used to validate the configuration, functionality, security, interoperability readiness and performance of a deployment. This framework might be used by adopters to "self certify", or it might be used by an external reviewer to create a level of assurance for supervisory authorities and participants.

On delivery of the QA Framework at Mojacom 30, the workstream has now gone on to develop a machine readable version of the framework, with a view to taking advantage of automation of the QA process.

# Business Justification
A QA Framework provides a consistent approach for stakeholders to assess the quality and readiness of Mojaloop deployments, supporting independent evaluations of resilience, security, and functional integrity. By establishing a structured approach to assessing deployments, the framework helps:

- Deployment teams identify and address gaps early
- Participants assess operational readiness before onboarding
- Regulators or supervisory bodies interpret implementation quality based on objective inputs
- The Mojaloop community share best practices and align on minimum expectations.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| Moses Kipchirchir | Denis Mariru <br>Brian Njoroge<br>Bill Hodghead<br>Sam Kummary |

## Latest Update (Summary)
The QA Framework workstream has begun transforming the existing six-pillar quality framework into a machine-readable format. Initial work has focused on the Configuration pillar, establishing a schema and developing parser and composer components capable of automatically assessing Mojaloop deployments against defined quality criteria. Once validated, the approach will be extended to additional technical pillars, while areas requiring human judgement will continue to rely on manual assessment.

## Applicability

This version of this document relates to Mojaloop [Version 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28th July 2026| Paul Makin|Added latest update|
|1.1|4th December 2025| Paul Makin|Added latest update|
|1.0|25th November 2025| Paul Makin|Initial version|