# SDK support for Bulk Transfers - Design

This SDK Scheme Adapter design to support the bulk transfers use case.

## Mojaloop bulk transfer limitations overcome
The implementation of bulk transfers within Mojaloop have the following limitations that this SDK bulk design is designed to overcome.
1. Only individual transfers that are addressed to the same Payer DFSP may be included in a bulk quotes and bulk transfers call.
1. The bulk quotes and bulk transfers messages is limited to a maximum of 1000 individual transfers.
1. In order to allow a bulk transfers, all potential Payee DFSP's need to create integration support for bulk messaging. I.e. If the bulk use case where to be introduced into an existing scheme, then all connecting DFSP's would need to upgrade their connections and integrations into their core banking systems.
1. There is no bulk discovery call.

## SDK Scheme Adapter bulk design requirements
The design caters for:
1. Transfers where the discovery has not yet been called.
1. No limit on number of transfers
1. Payee integration support for bulk being optional
1. Optionally support 
   - a single call that performs Discovery, Agreement and Transfer
   - independently accepting of party lookups
   - independently accepting of quotes
   - setting a fee limit on the auto acceptance of quotes
   - the skipping of the discovery phase
   - running only the discovery phase
   - setting an expiration for the bulk message
   - home transaction Id's for both the bulk message and the individual transfers.
   - both synchronous API calls and asynchronous API calls

## Sequence Diagram
Here is a sequence diagram that outlines the role that the SDK Scheme Adapter will play in a bulk call, both for a Payer DFSP and a Payee DFSP.
![Bulk Transfer Sequence Diagram Overview](./assets/sequence/BulkDisbursementSequenceDiagramOverview-bulk.svg)

## Error Tables
[Table of Error Codes](./assets/sequence/BULK-ERRORCODES.md)

## Payer DFSP SDK Scheme Adapter Sequence Diagram

## Payee DFSP SDK Scheme Adapter Sequence Diagram

## Redis Store Data mapping


