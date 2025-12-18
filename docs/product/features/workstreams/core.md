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
The codebase for 17.2.0 RC passes ~80% of automated tests across eight major collections; remaining tests are blocked by security-related changes to the Testing Toolkit. Once resolved, and once all security vulnerabilities are cleared, the release will proceed.

Version 17.2.0 will deliver:
- Major performance enhancements
- LEI support in merchant services
- Inclusion of Connection Manager in Helm
- Significant DRPP-originating bug fixes

The team will evaluate in early 2026 whether the next release will be a minor revision or the TigerBeetle-based v18.

## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|4th December 2025| Paul Makin|Added latest update|
|1.0|25th November 2025| Paul Makin|Initial version|