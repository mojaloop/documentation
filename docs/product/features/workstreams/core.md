# Core and Releases Workstream
The Mojaloop Core and Releases workstream maintains the Mojaloop core (maintenance items such as fixes to critical bugs, prioritized feature enhancements, node upgrades) and undertakes the Release process of the core services and some adjacent services or products that are part of the Mojaloop Platform.

The workstream also aims to support other workstreams delivering features to core or supporting services by helping package services that are of release quality (the new features need to follow Mojaloop’s adopted quality standards and best practices such as automated tests, documentation, helm charts and such). This involves the community support aspect as well.

# Business Justification
The management of the Mojaloop Core and the releases of the open source platform is foundational to the offering.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| Sam Kummary | Shashi Hirugade<br>Juan Correa<br>Walter Obadha |

## Latest Update (Summary)
PI 28 saw the successful delivery of Mojaloop v17.1.0, a clean release with no known vulnerabilities, accompanied by artefact provenance, a full SBOM, and coordinated improvements from related workstreams. 

Looking forward, the team concluded that no breaking release (v18) would be made this year. Instead, work is underway on v17.2.0, a non-breaking enhancement release expected by the end of PI 29. This release will bundle multiple fixes and significantly improved performance at the SDK layer — unlocking up to 10x throughput improvements. In collaboration with the Performance Optimisation workstream, a key goal is to tie measurable performance outcomes to a specific release version, supported by reproducible testing scripts and metrics dashboards. The workstream also responded rapidly to a breaking upstream change by Bitnami, implementing a short-term fix and designing a long-term solution to restore Helm chart stability.

## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|25th November 2025| Paul Makin|Initial version|