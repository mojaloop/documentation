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
PI-28 marked a pivotal phase in Mojaloop’s architectural roadmap, as the core ledger refactor toward TigerBeetle integration continued. Designed to overcome throughput bottlenecks caused by SQL locking in MySQL, TigerBeetle offers event-driven, concurrency-safe ledgering with expected performance exceeding 10,000 TPS per participant — enough to support national-scale cashless economies. Work is being led by Lewis Daly, who also introduced deterministic testing into the core ledger codebase, enhancing verification under edge-case conditions. A production-ready TigerBeetle release is projected for Q1–Q2 2026. In parallel, the workstream revisited the forensic audit trail architecture, prompted by DRPP’s high-throughput requirements, and has now reached architectural consensus via the Design Authority.

## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|25th November 2025| Paul Makin|Initial version|