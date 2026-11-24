# Forensic Audit Workstream
First, developing a forensic audit infrastructure/framework; second, updating the Mojaloop codebase to use that infrastructure and create a tamper evident audit log; and third, to create tools to allow that audit log to be analysed.

# Business Justification
Forensic audit capabilities are vital for a Production deployment at any scale.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| James Bush | Michael Richards <br>Paul Makin<br>Sam Kummary|

## Latest Update (Summary)
The Forensic Audit workstream has moved into implementation, with a functional codebase now available and non-functional testing underway. The next phase will integrate the audit client across Mojaloop’s core services while extensive performance testing evaluates whether the architecture can sustain target transaction volumes. Results from this testing will guide decisions on the final audit architecture, including the balance between synchronous and asynchronous processing.

## Applicability

This version of this document relates to Mojaloop [Version 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|28th July 2026| Paul Makin|Initial version|