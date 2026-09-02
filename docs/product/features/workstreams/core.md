# Core and Releases Workstream
The Mojaloop Core and Releases workstream maintains the Mojaloop core (maintenance items such as fixes to critical bugs, prioritized feature enhancements, node upgrades) and undertakes the Release process of the core services and some adjacent services or products that are part of the Mojaloop Platform.

The workstream also aims to support other workstreams delivering features to core or supporting services by helping package services that are of release quality (the new features need to follow Mojaloop’s adopted quality standards and best practices such as automated tests, documentation, helm charts and such). This involves the community support aspect as well.

# Business Justification
The management of the Mojaloop Core and the releases of the open source platform is foundational to the offering.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| Sam Kummary | Shashi Hirugade<br>Juan Correa |

## Latest Update (Summary)
The Core and Releases workstream has prepared the 17.3.0 release by incorporating a range of stability and performance improvements, including fixes for long-running resource leaks identified through extended performance testing. Early results indicate that performance remains comparable despite the introduction of additional security measures such as Istio and mutual TLS. Planning for Version 18 is also underway, with emphasis on extensive adopter validation of the TigerBeetle-based architecture before production release.

## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28th July 2026| Paul Makin|Added latest update|
|1.1|4th December 2025| Paul Makin|Added latest update|
|1.0|25th November 2025| Paul Makin|Initial version|