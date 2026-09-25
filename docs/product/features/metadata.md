
# Metadata
The very nature of Mojaloop as a switch interconnecting DFSPs means that Mojaloop cannot ascribe meaning to the transaction. However, transactions do also have the potential to carry metadata alongside the payment details, and it is this metadata that can be used by a scheme to link the payment to transactions outside Mojaloop, so supporting interoperability by carrying context across DFSPs. This applies to either a push or an RTP transaction.

Metadata helps describe, contextualize, or manage the payment beyond just the amount, sender, and recipient. It is not strictly required to move money, but it is crucial for reconciliation, automation, compliance and customer experience.

At the simplest level this can be used to, for example, tie a payment to a bill, so it can be recognised as being in payment of an electricity bill. Another example would be to use it to carry an invoice number alongside a payment in settlement of a B2B liability. Or it might describe the purpose of a payment, such as “Tuition for Q3 2025”, “Salary June 2025”, or “Loan repayment”.

Where this metadata is intended to be used for payment automation, this "meaning" is defined by the scheme operator and the participating DFSPs, not the Mojaloop Hub. Automation would commonly be implemented as part of the [Core Connector customisation in the participation tools](./connectivity.md).

## Applicability

This version of this document relates to Mojaloop Version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|16th July 2025| Paul Makin|First version.|