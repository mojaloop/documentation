# Performance Optimisation Workstream
Demonstrate the performance of Mojaloop in a variety of deployment configurations, and develop and publish a whitepaper. Use a baseline on-premises configuration to measure changes in performance between Mojaloop releases.

# Business Justification
A whitepaper that demonstrates how Mojaloop exceeds the performance requirements of adopters would be a valuable tool for the Mojaloop community.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| James Bush | Julie Guetta<br>Shashi Hirugade<br>Sam Kummary<br>Nathan Delma<br>Ablipay (Jerome, team)|

## Latest Update (Summary)
The Performance workstream has advanced steadily, having overcome early delays caused by the high cost footprint of Mojaloop’s infrastructure — a by-product of DRPP-driven IaC complexity. These constraints prompted a parallel effort to create IaC Lite (see the Deployment Tools workstream), while the performance team itself resumed tests in AWS with support from the core engineering team. 

Throughput-limiting issues in the SDK were identified and resolved, allowing performance tests to proceed, and the team has already demonstrated performance in excess of 1000 TPS, and expects further milestones int he near future. 

Data from these tests is being collected and analysed as input for a comprehensive performance white paper, intended to guide infrastructure sizing, scaling decisions, and cost-performance optimisation for scheme implementers.
## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|25th November 2025| Paul Makin|Initial version|