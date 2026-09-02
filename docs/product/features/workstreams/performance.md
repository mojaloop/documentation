# Performance Optimisation Workstream
Demonstrate the performance of Mojaloop in a variety of deployment configurations, and develop and publish a whitepaper. Use a baseline on-premises configuration to measure changes in performance between Mojaloop releases.

# Business Justification
A whitepaper that demonstrates how Mojaloop exceeds the performance requirements of adopters would be a valuable tool for the Mojaloop community.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| James Bush | Shashi Hirugade<br>Sam Kummary<br>Nathan Delma<br>Ablipay (Jerome, team)|

## Latest Update (Summary)
The Performance workstream has concentrated on improving the reproducibility of published benchmark results across adopter environments. Investigation identified deployment configuration differences, particularly around Kubernetes gateway configuration, as the primary cause of performance discrepancies reported by system integrators. Performance testing has been temporarily paused while platform-wide security remediation was completed, after which testing will resume with the aim of publishing an updated performance report. Initial results remain close to the previously demonstrated throughput of approximately 2,000 transactions per second.

## Applicability

This version of this document relates to Mojaloop [Version 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28th July 2026| Paul Makin|Added latest update|
|1.1|4th December 2025| Paul Makin|Added latest update|
|1.0|25th November 2025| Paul Makin|Initial version|