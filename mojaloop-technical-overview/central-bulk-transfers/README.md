# Bulk Transfers Design

The Bulk Transfers scenario is described in the API Definition document regarding the resource /bulkTransfers. For details _(refer to section `6.10`)_ as per the [Mojaloop Specification](https://github.com/mojaloop/mojaloop-specification/blob/master/API%20Definition%20v1.0.pdf)

1. [Introduction](introduction)
2. [Design Considerations](design-considerations)
3. [Steps involved in the high-level Architecture](steps-involved-in-the-high-level-architecture)
4. [Notes](notes)
    a. [Discussion items](discussion-items)
    b. [Proposed new tables](proposed-new-tables)
    c. [Bulk Transfers States](bulk-transfers-states)
  
## 1. Introduction

The Bulk Transfers process is discussed in section 6.10 of the API Definiton 1.0 document, depicted in [Figure 60](./Figure60-Example-Bulk-Transfer-Process-Spec1.0.png). The key items implied in the specification in its current version 1.0 are that

- Reservation of funds is done for each individual transfer from the Payer FSP to the Payee FSP
- Even if a single individual transfer fails during the prepare process, the whole bulk is to be rejected.

## 2. Design Considerations

Accoring to the Figure-60 of the specification, below are a few key implications from the Specification.

1. The Payer DFSP performs user look-ups for the individual parties involved in the bulk payment separately
2. The Payer DFSP performs bulk quoting per Payee DFSP
3. The onus is on the Payer DFSP to prepare bulk transfers based on Payee FSPs and send out a bulk transfer request to a single Payee FSP
4. This seems to be an all-or-nothing process where even if a single individual transfer fails to be reserved, then the whole bulk needs to be rejected because it cannot be sent to the Payee as it is if it has an individual transfer for which funds couldn't be reserved.
5. In light of the above, the proposal being made right now is to empower the Switch (needs updating the Specification) to send out the POST /bulkTransfers request with the list of individual transfers for which funds were able to be reserved on the Switch.
6. The implication is that the Switch aggregaets commits/failures from the Payee FSP for the bulk and sends out a single PUT /bulkTransfers/{ID} call to the Payer FSP that includes the entire list of transfers that includes individual transfers that failed both at the Switch and the Payee FSP
7. For example: If there are 1000 individual transfers in a Bulk Transfer and if the Switch is able to reserve funds for 900 of the individual transfers, then a prepare bulk transfer reqeust to the Payee DFSP is sent with the list of those 900 individual transfers. Once the Payee FSP sends the Bulk Fulfil request for those 900 transfers of which lets say, 800 can be committed and 100 are aborted, then the Switch processes those individual transfers accordingly and sends out the PUT callback (PUT /bulkTransfers/{ID}) notification to the Payer FSP with all the 1000 individual transfers, 800 of which are committed and 200 of which are aborted.
8. There will be implications to aspects such as Signature, Encryption, PKI and other security aspects that will need to be addressed.
9. The ordering of the individual transfers need to be considered as well by the Scheme. A Goal for implementation in emerging markets is to maximize the number of transactions involved and so a well designed Scheme may re-order individual transfers in the ascending order of the magnitude of amounts and then process them. But this can be a Scheme consideration.
10. However, a recommended Scheme Rule is that the Payee FSPs shouldn't be allowed to re-order the individual transfers in a bulk to avoid bias towards Payee parties.
11. The Settlements part involved with bulk transfers where Government payments are involved with large sums of money needs to be discussed to allow for moving through tranfers without strict liquidity rules needs to be discussed.

## 3. Steps involved in the high-level Architecture

Below are the steps involved at the high level in the architecture diagram for bulk transfers with some description.  

1. [1.0, 1.1, 1.2] An Incoming bulk Transfer request (POST /bulkTransfers) on the ml-api-adapter is placed on kafka topic bulk prepare and a 202 is sent to the Payer FSP  
2. [1.3] Bulk Prepare handler consumes the request, records the status as Received  
        a. Bulk Prepare handler then validates the Bulk and changes state to Pending if the validation is successful  
        b. [<alt>1.4] If validaiton fails, Bulk Prepare handler changes the bulkTransferState to Pending_Rejected (an internal state) and produces a message onto the bulk processing topic  
            i. Bulk processing Handler then updates the bulkTransferState to Rejected and sends out a notification to the Payer  
3. [1.4] [Continuing 2.a] Bulk Prepare handler breaks down the bulk into individual transfers and puts each of them on the prepare topic  
        a. As part of this, each transfer is individually assigned the 'expiration time' of the bulk Transfer itself (and other fields necessary for individual transfers)  
4. [1.5, 1.6, 1.7] Prepare handler, Position handler are refactored to cater to bulk prepare messaging (to handle individual transfers in a bulk, using flags such as type, action, etc)  
        a. Reservation of funds --> This is left to the individual handlers and and the whole bulk is then aggregated in the Bulk Processing Handler.  
5. [1.8] Position Handler to produce messages corresponding to individual transfers that are part of a bulk to bulk processing topic  
6. [1.9] For every message consumed from the bulk processing topic a check is made on the Bulk processing Handler to see if that’s the last individual transfer in a bulk  
7. [1.10, 1.11, 1.12] If it is the last transfer, aggregate the state of all the individual transfers and  
        a. If all of them are in reserved state --> Send POST /bulkTransfers to the Payee (by producing a message to the notifications topic which is then consumed by the notification handler)  
        b. When bulkTransfer prepare is sent, then change status to Accepted  
8. In a successful case of Prepare - when the PUT from the Payee FSP for bulkFulfil is received, a message is put on the bulk fulfils topic  
9. This is to be consumed by the bulkFulfilHandler, which then change state to Processing  
10. The bulk-fulfil-handler breaks down the bulk into individual transfers and sends each of them through the refactored Fulfil, Position Handlers to commit/abort each of them based on the PUT /bulkTransfers/{ID} message by the Payee and commit/release funds on the Switch  
11. The bulk-processing-handler is to then aggregate all the individual transfer results and change the state of bulkTransfer to Completed/Rejected based on success/failure  
        a. If the Payee sends 'committed' for even one of the individual transfers the proposal is to change bulk state to Completed.  
        b. However, for step-8 or if the Payee sends 'rejected' as bulkTransferState then final state on Switch should be 'Rejected'  
12. Send notifications to both Payer and Payee  

## 4. Notes

### 4.a. Discussion items

Here are some of the interesting aspects of the proposal

1. NFR: The Switch needs to record the changes and the original request for validation and for auditing purposes  
2. Payload size for a bulk transfer - to be considered for Kafka messaging  
        a. Is there a need to rethink the moving of larger messages? Possibly using persistent messages?
        b. Possible size of a bulk transfer - 300,000 messages
        c. Discuss requirements for the size

### 4.b. Proposed New tables

Below are the proposed tables as part of designinig the Bulk transfers

- bulkTransfer  
- bulkTransferStateChange  
- bulkTransferError  
- bulkTransferDuplicateCheck  
- bulkTransferAssociation  
- bulkTransferExtension  
- bulkTransferFulfilment  
- bulkTransferState  
- bulkProcessingState  

### 4.c. Bulk Transfer States

Below are the states of a Bulk transfer as per the Mojaloop API Specification

1. RECEIVED  
2. PENDING  
3. ACCEPTED  
4. PROCESSING  
5. COMPLETED  
6. REJECTED  