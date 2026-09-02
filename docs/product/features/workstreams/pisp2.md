# PISP 2.0 Workstream
The current PISP implementation requires refactoring to meet the general needs of adopters and fintechs, rather than supporting only one way of working. This will require complementary changes at the Hub and the Mojaloop Connector, and is expected to support continuing authorisation at the DFSP.

The refactored PISP interface will also support bulk payment initiation by a fintech, offering for example outsourced salary processing service.

This workstream needs to be completed before the proposed changes to bulk payments/PISP  are undertaken.

Enhancements to support AISP will follow in a future PI.

# Business Justification
Generalising Mojaloop's PISP implementation to support business models other than that of Google, the sponsor of the original implementation.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| Olivier Manzi<br>Yui Kanchalai | Adetayo Teluwo <br>Paul Makin<br>Sam Kummary<br>Michael Richards<br>Péricles Correa
 |

## Latest Update (Summary)
The PISP workstream has focused on establishing delivery processes, including GitHub project tracking, milestone management and contributor onboarding. Active open-source participation has increased significantly, while work has begun migrating the codebase to TypeScript. Looking ahead, the workstream is preparing for an end-to-end PISP 2.0 proof of concept, with particular attention on fintech integration tooling and the supporting SDK required to complement the existing hub functionality.

## Applicability

This version of this document relates to Mojaloop [Version 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0| 28th July 2026 | Paul Makin|Initial version|