# Fees and Tariffs
Mojaloop supports transaction fees using a flexible rules-driven architecture designed to ensure transparency and agreement at every stage of a payment.

##  **Agreement of Terms – Fee Negotiation**

Before a transaction occurs, Mojaloop uses its **Agreement of Terms** transaction phase to allow DFSPs to calculate  and agree all associated fees and commissions. 

At the beginning of this phase, the Payer's DFSP proposes the transaction to the Payee's DFSP, including a choice of charging model, being that either fees are added to the amount the sender pays, or they are deducted from the amount the beneficiary receives.

If the Payer's DFSP wishes to proceed, then they submit a confirmation. In this, the Payee's DFSP submits their fees (and other conditions) to the Payer's DFSP in the form of a contract, including either an acceptance of the chosen charging model, or a rejection.

If the Payer DFSP wishes to proceed on the terms presented by the Payee DFSP, then it presents the terms of the transfer to the Payer, including the total to be paid by the Payer based on the selected charging model. 

| Charging Model | Payer Pays| Payee Receives |
| -------------- | ---------------------- | -------------------- |
| Sender Pays | Value + Payer DFSP Fee + Payee DFSP Fee |Value|
| Beneficiary Pays| Value + Payer DFSP Fee|Value - Payee DFSP Fee|


If the Payer accepts the terms and wishes to proceed, the agreed transfer value is debited from the Payer's account by the Payer's DFSP, which then retains their own fees and submits a transfer request for the remaining value, together with the Payee's contract, to the Mojaloop Hub.

The Payee DFSP, on completion of the transfer, retains their agreed fees, and credits the Payee's account with the remainder.

In this way, all of the fees are consolidated into a single quote so the payer knows the exact cost before proceeding - including whether the Payee DFSP's fees are paid by the Payer or the Payee. 

##  **Rules Handler – Interchange Fees**

Mojaloop supports advanced fee rules like **interchange fees** via its Rules Handler, which evaluates transactions in-flight. For example, in a wallet-to-wallet peer‑to‑peer payment involving different DFSPs, Mojaloop can automatically apply a 0.6% fee charged by the Payee DFSP to the Payer DFSP. These are recorded as ledger entries and settled later.

## **Hub Fees (Operator Fees)**

Beyond per-transaction charges, hub operators may impose additional infrastructure–use or subscription fees on participating DFSPs. These “hub fees” are typically minimal — just enough to cover operational costs — with the aim of keeping end-user fees as low as possible in a “cost‑recovery plus" model. 

---

### In Summary

| Fee Type                | Handled By             | When & How                                    |
| ----------------------- | ---------------------- | --------------------------------------------- |
| Transaction Fees        | Agreement of Terms Service        | Quoted up front, agreed before execution      |
| Interchange Fees        | Rules Handler + Ledger | Applied during processing based on rules      |
| Hub Infrastructure Fees | Hub Operator           | Charged separately to recover operating costs |

This layered approach gives Mojaloop strong support for fee transparency, configurability, automation, and settlement consistency—crucial for interoperable and cost-effective financial inclusion systems.

## Applicability

This version of this document relates to Mojaloop Version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|17th July 2025| Paul Makin|Initial version|