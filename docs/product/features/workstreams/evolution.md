# Mojaloop Evolution Workstream
This workstream is aimed at carrying out a significant evolution in Mojaloop's most critical central services: 
- Replacing the accounting ledger functionality at the heart of Mojaloop with TigerBeetle. 
- Replace the heart of the settlement engine with TigerBeetle functionality updating it with Settlement V3 capabilities.

# Business Justification
This workstream has strategic importance; TigerBeetle is the next generation ledger technology developed specifically with Mojaloop in mind, and offers the potential of a transaction throughput performance improvement of at least an order of magnitude.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| Michael Richards | James Bush<br>Lewis Daley<br>Sam Kummary<br>Paul Makin |

## Latest Update (Summary)
### Forensic Audit
This aspect has been moved into [its own workstream](./audit.html).
### New Accounting Model
The new accounting model is broadly agreed and represents a major shift toward alignment with international accounting standards. This addresses concerns raised by global institutions and enhances Mojaloop’s credibility as a financial infrastructure platform. The initial target is TigerBeetle, though the team has not yet decided whether a MySQL version of the new model will also be produced.
### TigerBeetle Integration
The Mojaloop Evolution workstream continues to progress TigerBeetle integration, with development approaching code completion and current effort focused on integration testing. The implementation supports operation against both MySQL and TigerBeetle ledgers, allowing a gradual migration path while maintaining compatibility with existing deployments. The principal remaining work is validation of the integration test suite before an experimental community release becomes available.
### Settlement v3
Settlement v3 introduces deterministic settlement batches, addressing long-standing reconciliation challenges and enabling multi-scheme scalability. TigerBeetle will store settlement batch keys, while SQL components and admin APIs will require substantial enhancement to support model configuration, batch tracking, and settlement operations.

## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28th July 2026| Paul Makin|Added latest update|
|1.1|4th December 2025| Paul Makin|Added latest update|
|1.0|25th November 2025| Paul Makin|Initial version|