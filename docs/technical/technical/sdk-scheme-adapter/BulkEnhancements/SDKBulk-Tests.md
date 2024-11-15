# SDK Support for Bulk Transfers - Tests
## Test Strategy
The quality of the delivered solution is as good a the quality of the tests and testing strategy adopbted. The distributed nature of this event sourcing solution affected the testing strategy chosen. Multiple types of test were created, each supporting the others and designed to pick bugs as quickly as possible.

The Command event handler and the domain event handler have both unit tests and narrow integration tests as the base testing. The FSPIOP API and backend API components have only unit tests.
Great emphasis was put on the functional tests which then tested the four components working together in both happy and unhappy path scenarios.

### Narrow integration tests
These tests are written in jest and assert for example the updated state store and produced events based on a command event generated.

**Command Handler Integration Test Harness**

![Local Test Setup](../assets/CHIntegrationTestHarness.drawio.svg)

### The functional test testharness
The functional test makes use of the TTK which simulates both the Payer and the Payee DFSP backends. 

:::tip Note
This test harness tests both the Payer SDK and the Payee SDK.
:::

![Local Test Setup](../assets/bulk-functional-local-test-setup.drawio.svg)

:::tip Note
These test can be run on the local checked out monorepo, and are run in the CI pipeline, and are included in the helm as helm tests used to confirm deployment.
:::

## Payer DFSP Integration Test Matrix

<div style="font-size:small; white-space:nowrap;">

|Test Cases|C1|C2|C3|C4|C5|C6|C7|C8|C9|C10|C11|C12|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|INT D-1||||x|||||||||
|INT D-2||x|||||||||||
|INT D-3||x|||||||||||
|INT D-4|x||||||||||||
|INT D-5|||x||||||||||
|INT D-6|||x||||||||||
|INT A-1||||||x|||||||
|INT A-2|||||x||||||||
|INT T-1|||||||||||x||
|INT T-2||||||||||x|||
|INT T-3|||||||||x||||
|INT T-4|||||||||||x||
|INT T-5|||||||x||||||
|INT T-6||||||||||||x|

</div>

## Payer DFSP Functional Test Matrix

<div style="font-size:small; white-space:nowrap;">

|Test Cases|B1|B2|B3|B4|B5|F1|F2|F3|F4|F5|F6|F7|F8|F9|D1|D2|D3|D4|D5|D6|D7|D8|D9|D10|D11|D12|D13|D14|D15|D16|D17|D18|D19|D20|C1|C2|C3|C4|C5|C6|C7|C8|C9|C10|C11|C12|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|FUNC 1|x|x|x|x|x|x|x||x|x||x|x||x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x|x|x|x|x|x|x|x|x|x|x||x|x|x|x
|FUNC 2|x|x||||x||x|||||||x|x|x|x|x||||||||||||||||x|x|x|||||||||
|FUNC 3|x|x||||x||x|||||||x|x|x|x|x||||||||||||||||x|x|x|||||||||
|FUNC 4|x|x||||x||x|||||||x|x|x|x|x||||||||||||||||x|x|x|||||||||
|FUNC 5|x|x||||x||x|||||||x|x|x|x|x||||||||||||||||x|x|x|||||||||
|FUNC 6|x|x||||x||x|||||||x|x|x|x|x||||||||||||||||x|x|x|||||||||
|TC-BQ1|x|x|x|||x|x||x||x||||x|x|x|x|x|x|x|x|x|x|||||||||||x|x|x|x|x|x|||||x|x
|TC-BQ2|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|||||||||||x|x|x|x|x|x|||||x|x
|TC-BQ3|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x||||||
|TC-BQ4|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x||||||
|TC-BQ5|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x||||||
|TC-BQ6|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x||||||
|TC-BQ7|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x||||||
|TC-BQ8|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x||||||
|TC-BQ9|x|x|x|||x|x||x|x|x||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x||||||
|TC-BQ10|x|x|x|||x|x||x||x||||x|x|x|x|x|x|x|x|x|x|||||||||||x|x|x|x|x|x|||||x|x|
|TC-BQ11|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x|||||||
|TC-BQ13|x|x|x|||x|x||x|x|||||x|x|x|x|x|x|x|x|x|x|x||||||||||x|x|x|x|x|x|||||||
|TC-BT1|x|x|x|x|x|x|x||x|x||x||x|x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x||||x|x|x|x|x|x|x||x|x|x|x|
|TC-BT2|x|x|x|x|x|x|x||x|x||x||x|x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x||||x|x|x|x|x|x|x||x|x|x|x|
|TC-BT3|x|x|x|x|x|x|x||x|x|x|x||x|x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x||||x|x|x|x|x|x|x||x|x|x|x|
|TC-BT4|x|x|x|x|x|x|x||x|x|x|x||x|x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x||||x|x|x|x|x|x|x||x|x|x|x|
|TC-BT5|x|x|x|x|x|x|x||x|x||x||x|x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x||||x|x|x|x|x|x|x||x|x|x|x|
|TC-BT6|x|x|x|x|x|x|x||x|x||x||x|x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x||||x|x|x|x|x|x|x||x|x|x|x|
|TC-BT7|x|x|x|x|x|x|x||x|x||x||x|x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x||||x|x|x|x|x|x|x||x|x|x|x|
|TC-BT8|x|x|x|x|x|x|x||x|x||x||x|x|x|x|x|x|x|x|x|x|x|x|x|x|||x|x||||x|x|x|x|x|x|x||x|x|x|x|

</div>

## Payer DFSP Features reference
|#|Outbound Features|Detail|
|---|---|---|
|B1|Backend API|POST /bulkTransactions SDKBulkRequest|
|B2|Backend API|Event SDKOutboundBulkAcceptPartyInfoRequested|
|B3|Backend API|PUT /bulkTransactions/{bulkTransactionId} Accept Party|
|B4|Backend API|PUT /bulkTransactions/{bulkTransactionId} Accept Quote|
|B5|Backend API|PUT /bulkTransactions/{bulkTransactionId} Results|
|F1|FSPIOP API|GET /parties|
|F2|FSPIOP API|PUT /parties/{Type}/{ID}|
|F3|FSPIOP API|PUT /parties/{Type}/{ID}/error|
|F4|FSPIOP API|POST /bulkQuotes|
|F5|FSPIOP API|PUT /bulkQuotes/{ID}|
|F6|FSPIOP API|PUT /bulkQuotes/{ID}/error|
|F7|FSPIOP API|POST /bulkTransfers|
|F8|FSPIOP API|PUT /bulkTransfers/{ID}|
|F9|FSPIOP API|PUT /bulkTransfers/{ID}/error|
|D1|Domain Event Handler|SDKOutboundBulkRequestReceived|
|D2|Domain Event Handler|SDKOutboundBulkPartyInfoRequested|
|D3|Domain Event Handler|PartyInfoCallbackReceived|
|D4|Domain Event Handler|PartyInfoCallbackProcessed|
|D5|Domain Event Handler|SDKOutboundBulkPartyInfoRequestProcessed|
|D6|Domain Event Handler|SDKOutboundBulkAcceptPartyInfoReceived|
|D7|Domain Event Handler|SDKOutboundBulkAutoAcceptPartyInfoRequested|
|D8|Domain Event Handler|SDKOutboundBulkAcceptPartyInfoProcessed|
|D9|Domain Event Handler|BulkQuotesCallbackReceived|
|D10|Domain Event Handler|BulkQuotesCallbackProcessed|
|D11|Domain Event Handler|SDKOutboundBulkQuotesRequestProcessed|
|D12|Domain Event Handler|SDKOutboundBulkAcceptQuoteReceived|
|D13|Domain Event Handler|SDKOutboundBulkAcceptQuoteProcessed|
|D14|Domain Event Handler|SDKOutboundBulkAutoAcceptQuoteRequested|
|D15|Domain Event Handler|SDKOutboundBulkAutoAcceptQuoteProcessed|
|D16|Domain Event Handler|BulkTransfersCallbackReceived|
|D17|Domain Event Handler|BulkTransfersCallbackProcessed|
|D18|Domain Event Handler|SDKOutboundBulkTransfersRequestProcessed|
|D19|Domain Event Handler|SDKOutboundBulkResponseSent|
|D20|Domain Event Handler|SDKOutboundBulkResponseSentProcessed|
|C1|Command Event Handler|ProcessSDKOutboundBulkRequest|
|C2|Command Event Handler|ProcessSDKOutboundBulkPartyInfoRequest|
|C3|Command Event Handler|ProcessPartyInfoCallback|
|C4|Command Event Handler|ProcessSDKOutboundBulkAcceptPartyInfo|
|C5|Command Event Handler|ProcessSDKOutboundBulkQuotesRequest|
|C6|Command Event Handler|ProcessBulkQuotesCallback|
|C7|Command Event Handler|ProcessSDKOutboundBulkAcceptQuote|
|C8|Command Event Handler|ProcessSDKOutboundBulkAutoAcceptQuote|
|C9|Command Event Handler|ProcessSDKOutboundBulkTransfersRequest|
|C10|Command Event Handler|ProcessBulkTransfersCallback|
|C11|Command Event Handler|PrepareSDKOutboundBulkResponse|
|C12|Command Event Handler|ProcessSDKOutboundBulkResponseSent|

## Test Cases reference

|Group|# test case|Test Type|Status|Detail|
|--- |--- |--- |--- |--- |
|**Discovery** - Comand Handler Integration Tests|||||
|(process_bulk_accept_party_info.test.ts)|INT D-1|Integration|Pass|Given inbound command event ProcessSDKOutboundBulkAcceptPartyInfo is received Then the logic should loop through individual transfer in the bulk request And update the individual transfer state to DISCOVERY_ACCEPTED or DISCOVERY_REJECTED based on the value in the incoming event And update the overall global state to DISCOVERY_ACCEPTANCE_COMPLETED And outbound event SDKOutboundBulkAcceptPartyInfoProcessed should be published|
|(process_bulk_party_info_request.test.ts)|INT D-2|Integration|Pass|Given Party info does not already exist for none of the individual transfers. And Party Lookup is not skipped When inbound command event ProcessSDKOutboundBulkPartyInfoRequest is received Then the global state should be updated to DISCOVERY_PROCESSING And PartyInfoRequested kafka event should be published for each individual transfer. And State for individual transfer should be updated to DISCOVERY_PROCESSING|
|(process_bulk_party_info_request.test.ts)|INT D-3|Integration|Pass|Given Party info exists for individual transfers. And Party Lookup is not skipped When inbound command event ProcessSDKOutboundBulkPartyInfoRequest is received Then the global state should be updated to DISCOVERY_PROCESSING. And PartyInfoRequested outbound event should not be published for each individual transfer. And State for individual transfer should be updated to RECEIVED.|
|(process_bulk_request.test.ts)|INT D-4|Integration|Pass|When inbound command event ProcessSDKOutboundBulkRequest is received Then outbound event SDKOutboundBulkPartyInfoRequested should be published And Global state should be updated to RECEIVED.|
|(process_party_info_callback.test.ts)|INT D-5|Integration|Pass|Given receiving party info does not exist And receiving party lookup was successful When inbound command event ProcessPartyInfoCallback is received Then the state for individual successful party lookups should be updated to DISCOVERY_SUCCESS And the data in redis for individual transfer should be updated with received party info And outbound event PartyInfoCallbackProcessed event should be published And if all lookups are incomplete, outbound event ProcessSDKOutboundBulkPartyInfoRequestProcessed should not be published And neither outbound event SDKOutboundBulkAutoAcceptPartyInfoRequested/SDKOutboundBulkAutoAcceptPartyInfoRequested should be published|
|(process_party_info_callback.test.ts)|INT D-6|Integration|Pass|Given receiving party info does not exist And receiving party lookup was successful When inbound command event ProcessPartyInfoCallback is received Then the state for individual successful party lookups should be updated to DISCOVERY_SUCCESS And the data in redis for individual transfer should be updated with received party info And outbound event PartyInfoCallbackProcessed event should be published And if all lookups are complete, outbound event ProcessSDKOutboundBulkPartyInfoRequestProcessed should be published And if auto accept party is false, outbound event SDKOutboundBulkAcceptPartyInfoRequested should be published.|
|**Agreement** - Comand Handler Integration Tests|||||
|(process_bulk_quotes_callback.test.ts)|INT A-1|Integration|Pass|Given the BulkTransaction with Options { synchronous: false, onlyValidateParty: true, skipPartyLookup: false, autoAcceptParty: false, autoAcceptQuote: false } And callback for quote batch is successful And the callback has a combination of success and failed responses for individual quotes When Inbound command event ProcessBulkQuotesCallback is received Then the logic should update the individual batch state to AGREEMENT_COMPLETED or AGREEMENT_FAILED, And for each individual transfers in the batch, the state could be AGREEMENT_SUCCESS or AGREEMENT_FAILED accordingly And the individual quote data in redis should be updated with the response And the global BulkTransaction state should be AGREEMENT_ACCEPTANCE_PENDING And domain event BulkQuotesCallbackProcessed should be published And domain event SDKOutboundBulkQuotesRequestProcessed should be published|
|(process_bulk_quotes_callback.test.ts)|INT A-2|Integration|Pass|When Inbound command event ProcessSDKOutboundBulkQuotesRequest is received Then the logic should update the global state to AGREEMENT_PROCESSING, And create batches based on FSP that has DISCOVERY_ACCEPTED state And also has config maxEntryConfigPerBatch And publish BulkQuotesRequested per each batch And update the state of each batch to AGREEMENT_PROCESSING.|
|**Transfers** - Comand Handler Integration Tests|||||
|(prepare_sdk_outbound_bulk_response.test.ts)|INT T-1|Integration|Pass|Given the BulkTransaction with Options { synchronous: false, onlyValidateParty: true, skipPartyLookup: false, autoAcceptParty: false, autoAcceptQuote: false } When inbound command event PrepareSDKOutboundBulkResponseCmdEvt is received And SDKOutboundBulkResponsePreparedDmEvt should be published for each transfer batch And the Bulk Transaction global state should be updated to RESPONSE_PROCESSING|
|(process_bulk_transfers_callback.test.ts )|INT T-2|Integration|Pass|Given the BulkTransaction with Options { synchronous: false, onlyValidateParty: true, skipPartyLookup: false, autoAcceptParty: false, autoAcceptQuote: false } When inbound command event ProcessBulkTransfersCallbackCmdEvt is received Then the transfer batch state should be updated to TRANSFERS_COMPLETED States of failed quotes should remain AGREEMENT_FAILED And the logic should loop through individual transfers in the batch and update the state to TRANSFER_SUCCESS or TRANSFER_FAILED And BulkTransferProcessedDmEvt should be published for each transfer batch And domain event BulkQuotesCallbackProcessed should be published And domain event SDKOutboundBulkQuotesRequestProcessed should be published And domain event SDKOutboundBulkAutoAcceptQuoteProcessedDmEvt should be published And domain event BulkTransfersRequestedDmEvt should be published And domain event BulkTransfersCallbackProcessed should be published And domain event SDKOutboundBulkTransfersRequestProcessed should be published|
|(process_bulk_transfers_request.test.ts)|INT T-3|Integration|Pass|Given the BulkTransaction with Options { synchronous: false, onlyValidateParty: true, skipPartyLookup: false, autoAcceptParty: false, autoAcceptQuote: false } And callback for quote batch is successful And the callback has a combination of success and failed responses for individual quotes When Inbound command event ProcessSDKOutboundBulkTransfersRequestCmdEvt is received Then the global Bulk Transaction State should be updated to TRANSFERS_PROCESSING And the individual batch state should be equal to either TRANSFERS_PROCESSING or TRANSFERS_FAILED, And for each individual transfers in the batch, the state AGREEMENT_ACCEPTED or AGREEMENT_REJECTED depending on the acceptQuotes = TRUE/FALSE, And for each individual transfers in an AGREEMENT_FAILED state should not be altered, And the individual quote data in redis should be updated with the response And domain event BulkQuotesCallbackProcessed should be published And domain event SDKOutboundBulkQuotesRequestProcessed should be published And domain event SDKOutboundBulkAutoAcceptQuoteProcessedDmEvt should be published And domain event BulkTransfersRequestedDmEvt should be published|
|(process_prepare_bulk_response.test.ts)|INT T-4|Integration|Pass|When inbound command event PrepareSDKOutboundBulkResponseCmdEvt is received Then SDKOutboundBulkResponsePreparedDmEvnt should be published|
|(process_sdk_outbound_bulk_accept_quote.test.ts)|INT T-5|Integration|Pass|Given the BulkTransaction with Options { synchronous: false, onlyValidateParty: true, skipPartyLookup: false, autoAcceptParty: false, autoAcceptQuote: false } And callback for quote batch is successful And the callback has a combination of success and failed responses for individual quotes When Inbound command event ProcessSDKOutboundBulkAcceptQuote is received Then the global Bulk Transaction State should be updated to AGREEMENT_ACCEPTANCE_COMPLETED And the individual batch state should be equal to either AGREEMENT_COMPLETED or AGREEMENT_FAILED, And for each individual transfers in the batch, the state AGREEMENT_ACCEPTED or AGREEMENT_REJECTED depending on the acceptQuotes = TRUE/FALSE, And the individual quote data in redis should be updated with the response And domain event BulkQuotesCallbackProcessed should be published And domain event SDKOutboundBulkQuotesRequestProcessed should be published And domain event SDKOutboundBulkAutoAcceptQuoteProcessedDmEvt should be published And domain event BulkTransfersRequestedDmEvt should be published|
|(process_sdk_outbound_bulk_response_sent.test.ts)#|INT T-6|Integration|Pass|Given the BulkTransaction with Options { synchronous: false, onlyValidateParty: true, skipPartyLookup: false, autoAcceptParty: false, autoAcceptQuote: false } When inbound command event ProcessSDKOutboundBulkResponseSentCmdEvt is received And SDKOutboundBulkResponseSentProcessedDmEvt should be published for each transfer batch And the Bulk Transaction global state should be updated to RESPONSE_SENT |
|**Happy Path:** (bulk-happy-path.json)|||||
|- 1 transfer with acceptParty and acceptQuote set to true|||||
||TC-BHP1|Functional|Pass|4 transfers to 2 dfsps, with acceptParty and acceptQuote set to true|
||TC-BHP2|Validation|Pass|Bulk transaction having a format error|
|**Parties Errors:** (bulk-parties-error-cases.json)|||||
|- 1 transfer in the request|||||
||TC-BP1|Functional|Pass|Receiver sends error for in parties response|
||TC-BP2|Functional|Pass|Receiver timesout|
||TC-BP3|Functional|Pass|skipPartyLookup is false and receiver ifo exists in the request.|
|- 2 transfers in the request|||||
||TC-BP4|Functional|Pass|Receiver sends an error response for one of the transfers|
||TC-BP5|Functional|Pass|Receiver times out sending response for one of the transfers|
||TC-BP6|Functional|Pass|Do not get any response from the receiver for both the transfers|
|**Quotes Errors:** (bulk-quotes-error-cases.json)|||||
|- 2 transfers having the same receiver fsp id |||||
|- acceptParty for all transfers|||||
||TC-BQ1|Functional|Pass|Receiver fsp fails the entire batch |
||TC-BQ2|Functional|Pass|Receiver fsp times out the entire batch|
||TC-BQ3|Functional|Pass|Receiver fsp sends only one response and skips the other|
||TC-BQ4|Functional|Out of scope for MVP|Receiver fsp sends one success response and one failure response (Not Implemented - Issue 3015)|
|- acceptParty varying|||||
||TC-BQ5|Functional|Pass|One true, one false|
||TC-BQ6|Functional|Out of scope for MVP| Accept party false for all responses - Then only party details and no quote respone, final state to be COMPLETED (Not Implemented - Issue 3015)|
||TC-BQ7|Functional|Out of scope for MVP|True is sent only for one quote in PUT /bulkTxn acceptParty, ignoring second one (Not Implemented - Issue 3015)|
||TC-BQ8|Functional|Out of scope for MVP|false is sent only for one quote in PUT /bulkTxn acceptParty, ignoring second one - (Not Implemented - Issue 3015)|
|- 2 transfers having different receiver fsp ids - acceptParty for all transfers|||||
||TC-BQ9|Functional|Pass|One batch sends an error |
||TC-BQ10|Functional|Pass|Both batches sends error|
||TC-BQ11|Functional|Pass|One batch times out|
|- 3 transfers with 2 transfers having 1 receiver fsp id and the other having a different one|||||
||TC-BQ12|Functional|Out of scope for MVP|- The batch with 2 transfers sends only 1 transfer response and the other batch sends the success response (Not implemented - issue 3015)|
||TC-BQ13|Functional|Out of scope for MVP|Error in switch for unsupported currency - (issue - |
|**Transfers Errors:** (bulk-transfer-errors.json)|||||
|- One bulkTransfer with 2 transfers |||||
|- acceptQuote for all transfers|||||
||TC-BT1|Functional|Pass|Receiver fails the entire batch |
||TC-BT2|Functional|Pass|Receiver times out for the entire batch|
||TC-BT3|Functional|Out of scope for MVP|Receiver fsp sends only one response and skips the other (Not Implemented - Issue 3015)|
||TC-BT4|Functional|Intermittent Failures|Receiver fsp sends one success response and one failure  - ( Issue: 3019 )|
|- acceptQuote varying|||||
||TC-BT5|Functional|Out of scope for MVP|One true one false - TC2 - Bug 2958|
||TC-BT6|Functional|Out of scope for MVP|Accept quote - All false (Not Implemented - Issue 3015)|
||TC-BT7|Functional|Out of scope for MVP|True is sent only for one transfer in PUT /bulkTxn acceptParty, ignoring second one - (Not Implemented - Issue 3015)|
||TC-BT8|Functional|Out of scope for MVP|false is sent only for one transfer in PUT /bulkTxn acceptParty, ignoring second one - (Not Implemented - Issue 3015)|

