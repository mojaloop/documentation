# Fees and Tariffs

Mojaloop schemes may need to support several different types of fees.
These fees may be calculated using common tariff rules, but they do not all represent the same type of financial obligation and should not necessarily be collected or settled in the same way. Mojaloop makes a distinction between:

-   **Customer transaction fees:** fees charged by a DFSP to its own customer for providing a payment service.
-   **Interchange fees:** fees owed between participating DFSPs as a consequence of transactions processed through the scheme.
-   **Hub or scheme operator fees:** fees owed by participating DFSPs to the Hub or scheme operator for participation in, or use of, the service.

Mojaloop therefore separates three related concepts:

- **Tariff:** the rule that determines how a charge is calculated.

- **Fee obligation:** the amount owed by one party to another after
applying the relevant tariff.

- **Settlement mechanism:** the means by which that financial
obligation is ultimately discharged.

This separation allows Mojaloop to support flexible tariff structures
without requiring every type of fee to be treated as a separate payment or settled through the same mechanism.

## Overview

The three principal fee types are recommended to be handled as follows:

|  Fee type  |     Obligation   |  Calculation   |    Accounting |          Discharge|
|---|---|---|-------|
  |Customer transaction fee|Customer → DFSP|DFSP tariff/ Agreement of Terms|Local to the DFSP|Collected or retained by the DFSP|
|Interchange fee|DFSP → DFSP|Scheme tariff/ Rules Handler|Mojaloop interchange fee accounts|Periodic settlement|
| Hub/operator fee| DFSP → Hub operator| Scheme/ operator tariff|Hub billing /accounting|Payment to the Hub, normally initiated through RTP|

The tariff calculation mechanism may be common across these use cases, but the accounting and settlement treatment is deliberately different.

# Customer Transaction Fees

A DFSP may charge its customer for sending or receiving a payment. These charges are part of the service relationship between the DFSP and its customer and do not themselves create an obligation between Mojaloop participants.

Mojaloop's Agreement of Terms process allows charges affecting the payer or payee to be determined before the transaction is authorised. This allows the payer to understand the economic terms of the transaction before deciding whether to proceed.

For example, if a customer wishes to send USD 100 and the payer's DFSP charges USD 1 for the service, the customer may be presented with a request to approve a total debit of USD 101 before authorising the transaction.

The DFSP is responsible for collecting its customer fee. The fee does
not need to be transferred separately through Mojaloop or included in
scheme settlement.

Interchange charges incurred by the DFSP may influence how the DFSP
prices its service, but they do not necessarily need to appear as
separately payable customer charges.

# Interchange Fees

Interchange fees are fundamentally different from customer transaction fees. They represent financial obligations **between participating DFSPs** arising from transactions processed through the scheme. For example, a scheme may define a tariff under which the payer DFSP owes the payee DFSP 0.6% of the value of a particular class of merchant payment.

Then, for a USD 100 transaction:
-   the payment amount remains USD 100;
-   the tariff calculation produces an interchange fee of USD 0.60;
-   the USD 0.60 creates a financial obligation from the payer DFSP to the payee DFSP.

The interchange fee should not require a separate USD 0.60 payment to be executed alongside the original transaction. Instead, Mojaloop records the obligation in the participants'
interchange fee accounts.

## Tariff Calculation

Scheme tariff rules may be implemented using the Mojaloop Rules Handler. A tariff rule may take into account attributes such as:

-   transaction type;
-   transaction value;
-   payer or payee participant;
-   participant category;
-   currency;
-   transaction channel; or
-   other scheme-defined transaction characteristics.

Applying the rule produces a fee amount. The Rules Handler therefore determines **how much is owed** (the interchange obligation). It does not itself need to move the corresponding funds. Conceptually:

**Transaction attributes → Tariff rule → Fee calculation → Interchange obligation**

## Recording Interchange Obligations

Each participant may have an interchange fee account in addition to its other Mojaloop accounts. When a transaction is fulfilled, the Hub records the resulting interchange obligation against the relevant interchange fee accounts.

For example, for a USD 100 merchant payment:

- Payer DFSP → Payee DFSP: USD 100 payment obligation
- Payer DFSP → Payee DFSP: USD 0.60 interchange obligation

These are separate accounting obligations even though both arise from
the same transaction.

Interchange fee accounts allow these obligations to accumulate over a
settlement period rather than requiring each interchange charge to
generate an additional payment.

The processing model is therefore:

**Transaction → Rules Handler → Interchange calculation → Interchange
accounts → Settlement**

## Settlement of Interchange Fees

Interchange fee accounts can be included within the scheme's settlement model.

At settlement, the accumulated interchange obligations are incorporated into the participants' settlement positions according to the settlement model configured by the scheme.

This allows large numbers of individual interchange fees to be netted
rather than settled individually.

For example, during a settlement period:
-   DFSP A may owe DFSP B USD 10,000 in interchange fees;
-   DFSP B may owe DFSP A USD 7,000 in interchange fees.

The relevant net interchange position between them is therefore USD
3,000 before any further multilateral netting performed by the
settlement process.

Interchange is consequently treated as a **ledger and settlement
obligation**, rather than as a second payment attached to every
transaction.

# Hub and Scheme Operator Fees

Hub fees are economically different from interchange fees.

An interchange fee represents an obligation between participants. A Hub fee represents an obligation from a participant to the organisation operating the scheme or Hub.

Examples may include:

-   membership fees;
-   fixed monthly participation fees;
-   transaction processing fees;
-   volume-based charges; or
-   other scheme service charges.

The Hub may use tariff rules and transaction information to calculate
these charges. However, this does not require Hub fees to be accounted for or settled through participant interchange accounts.

## Calculating Hub Fees

A Hub tariff might, for example, specify:

**Monthly charge = USD 500 + USD 0.002 × volume of successful transactions**

The Hub can accumulate the information required to calculate the amount owed by each participant over the relevant billing period. The resulting amount becomes an ordinary financial obligation from the participant to the Hub operator.

## Collecting Hub Fees

The recommended model is for the Hub operator to maintain an account
with one of the participating DFSPs.

At the end of the billing period, the Hub calculates the amount owed by each participant and issues a Request to Pay (RTP). An authorised representative of the participant approves the payment and the DFSP executes it as an ordinary Mojaloop transaction.

Conceptually:

**Transaction/activity data → Hub tariff → Periodic invoice → RTP →
Participant payment → Hub account**

The Hub therefore receives its fees using the same payment
infrastructure that it provides to participants. The receiving DFSP subsequently accounts for the incoming payment
through the normal Mojaloop settlement process.

This avoids requiring the Hub itself to hold settlement liquidity solely for the purpose of collecting fees.

# Why Hub Fees and Interchange Fees Are Different

It is technically possible to design a model in which the Hub collects both Hub fees and interchange fees and subsequently redistributes interchange amounts to participants. Such an approach is not recommended as the default Mojaloop model, because if the Hub collected interchange centrally, it would need to:

-   receive funds owed between participants;
-   hold those funds pending distribution;
-   maintain liquidity for outgoing payments;
-   make payments to participants; and
-   assume a more direct role in participant financial obligations.

And this would move the Hub closer to the role of a financial intermediary and could introduce additional operational, liquidity, legal and regulatory considerations.

The preferred architecture therefore keeps the Hub out of the economic relationship between participants wherever possible. The Hub calculates and records scheme obligations where necessary, but does not unnecessarily become principal to them.

# Guarantees

A scheme may choose to guarantee some participant obligations, including interchange fees. For example, a scheme guarantee could allow a participant to regard an interchange receivable as carrying the credit risk of the scheme rather than the originating DFSP.

This is a scheme policy decision rather than a requirement of the
Mojaloop tariff architecture.

The default model should therefore allow interchange fees to behave like other participant settlement obligations without assuming that the Hub or scheme guarantees payment. A guarantee mechanism can be introduced separately where the governance, risk and regulatory arrangements of the scheme support it.

# Architectural Principles

The Mojaloop fee architecture can therefore be summarised through
these principles:

- **Tariff calculation is separate from settlement.**\
A tariff determines an amount. It does not determine how that amount must be paid.

- **Customer fees remain at the edge.**\
Charges between a DFSP and its customer are normally collected directly by the DFSP.

- **Interchange creates participant obligations.**\
Interchange fees are recorded between DFSPs using dedicated accounts and discharged through settlement.

- **Hub fees create obligations to the Hub operator.**\
These can be periodically calculated and paid to the Hub through normal Mojaloop payment mechanisms, including Request to Pay.

- **A fee does not necessarily require a payment transaction.**\
Interchange charges can be accumulated as ledger obligations and
subsequently netted through settlement.

- **The Hub should not unnecessarily become a financial intermediary.**\
Where an obligation exists between two participants, Mojaloop should normally record and settle that obligation without requiring the Hub to collect and redistribute the underlying funds.

# Summary

Mojaloop provides a common framework for determining tariffs while
allowing different economic obligations to be handled appropriately.

The resulting architecture can be represented as:

**Customer fees**

Customer → DFSP\
*Agreed before authorisation and collected by the DFSP*

**Interchange fees**

DFSP → DFSP\
*Calculated from scheme tariff rules → recorded in interchange accounts → periodically settled*

**Hub fees**

DFSP → Hub operator\
*Calculated from operator tariff → periodically invoiced → paid through RTP*

This separation provides a flexible tariff framework while preserving
Mojaloop's underlying model in which the Hub facilitates clearing and
settlement without unnecessarily becoming principal to participant
financial obligations.
