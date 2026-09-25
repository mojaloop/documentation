# Performance
Naturally, transaction throughput performance - usually measured as transactions per second - is a key metric for adopters, who need to be confident that Mojaloop can support their requirements, whether it be a national deployment, or sector-specific, or multi-national.

For this reason, the Mojaloop Community has established a performance baseline, and works continuously to refine and improve the efficiency of transaction processing.

## Performance Baseline

Version 17.0.0 of the Mojaloop Hub has been demonstrated to support the following performance characteristics on ***minimal*** hardware:

- Clearing 1,000 transfers per second
- Sustained for one hour
- With not more than 1% (of transfer stage) taking more than 1 second through the hub

This baseline performance can be used as a reference point for system sizing and capacity planning.

Naturally, higher performance may be expected using greater hardware resources.

## Future Performance Expectations

Work continues to replace Mojaloop's existing ledger technology with the [TigerBeetle](https://tigerbeetle.com/) financial transactions database. As the ledger performance is a significant element of the overall performance of Mojaloop, a significant uptick in that performance is expected through the adoption of TigerBeetle, with this expected to be completed by the time of the release of Mojaloop Version 19.0.


## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|3rd June 2025| Paul Makin|Initial version; performance text moved from deployment documentation|