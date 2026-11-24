# Fees and Tariffs

Mojaloop schemes may need to support several different types of fees. These fees may be calculated using common tariff rules, but they do not all represent the same type of financial obligation and should not necessarily be collected or settled in the same way. Mojaloop makes a distinction between:

- **Customer transaction fees:** fees charged by either DFSP for providing a payment service and collected, as agreed during the transaction, from either the debit party or the credit party.
- **Interchange fees:** fees owed between participating DFSPs as a consequence of transactions processed through the scheme. They are borne by DFSPs and, under scheme rules, are not recovered directly from customers.
- **Hub or scheme operator fees:** fees owed by participating DFSPs to the Hub or scheme operator for participation in, or use of, the service.

Mojaloop therefore separates three related concepts:

**Tariff:** the rule that determines how a charge is calculated.

**Fee obligation:** the amount owed by one party to another after applying the relevant tariff.

**Settlement mechanism:** the means by which that financial obligation is ultimately discharged.

This separation allows Mojaloop to support flexible tariff structures without requiring every type of fee to be treated as a separate payment or settled through the same mechanism.

## Overview

The three principal fee types are handled as follows:

| Fee type | Obligation | Calculation | Accounting | Discharge |
|---|---|---|---|---|
| Customer transaction fee | Debit or credit party → charging DFSP | DFSP tariff / Agreement of Terms | Reflected in the agreed transaction terms and accounted for by the relevant DFSPs | Collected through the transaction from the debit or credit party, including where that party is not a customer of the charging DFSP |
| Interchange fee | DFSP → DFSP | Scheme tariff / Rules Handler | Mojaloop interchange fee accounts | Periodic settlement; borne by DFSPs and not recovered directly from customers under scheme rules |
| Hub/operator fee | DFSP → Hub operator | Scheme/operator tariff | Hub billing/accounting | Payment to the Hub, normally initiated through RTP |

The tariff calculation mechanism may be common across these use cases. The accounting and settlement treatment is deliberately different.

# Customer Transaction Fees

A DFSP may charge a transaction fee for sending, receiving or otherwise providing a payment service. The party from whom that fee is collected does not have to be the charging DFSP's own customer. Subject to the scheme rules and the terms agreed for the transaction, a fee charged by either the payer DFSP or the payee DFSP may be allocated to and collected from either the debit party or the credit party.

Mojaloop's Agreement of Terms process communicates the proposed transaction amount and applicable fees before the transaction is authorised. The quote can therefore express both which DFSP charges a fee and whether that fee is to be collected from the debit or the credit party. This enables all charges affecting the payer or payee to be included in the economic terms presented for agreement, irrespective of whether the party bearing a particular fee is a customer of the DFSP that charges it.

For example, on a USD 100 transfer, a USD 1 fee charged by either DFSP may be allocated to the debit party. The agreed terms may then require a total debit of USD 101 while preserving the USD 100 amount credited to the credit party. Alternatively, the agreed terms may allocate the fee to the credit party, reducing the amount delivered to that party as permitted by the scheme and transaction terms.

Mojaloop supports collection of the agreed fee as part of processing the transaction. The two participating DFSPs account for the resulting amounts so that the charging DFSP receives its fee, even where the fee is collected from the other DFSP's customer. The fee does not need to be executed as a separate customer payment or included as an interchange obligation in scheme settlement.

Interchange charges incurred by a DFSP may inform its overall pricing, but scheme rules distinguish them from customer transaction fees. An interchange fee must not be presented to or recovered directly from a customer as an interchange charge.

# Interchange Fees

Interchange fees are fundamentally different from customer transaction fees. They are financial obligations **between participating DFSPs** arising from transactions processed through the scheme. The DFSPs bear those obligations. Under scheme rules, interchange fees are not charged to or recovered directly from the debit or credit customer.

For example, a scheme may define a tariff under which the payer DFSP owes the payee DFSP 0.6% of the value of a particular class of merchant payment. Then, for a USD 100 transaction:

- the payment amount remains USD 100;
- the tariff calculation produces an interchange fee of USD 0.60;
- the USD 0.60 creates a financial obligation from the payer DFSP to the payee DFSP; and
- neither customer is directly charged the USD 0.60 interchange fee.

The interchange fee should not require a separate USD 0.60 payment to be executed alongside the original transaction. Instead, Mojaloop records the obligation in the participants' interchange fee accounts.

## Tariff Calculation

Scheme tariff rules may be implemented using the Mojaloop Rules Handler. A tariff rule may take into account attributes such as:

- transaction type;
- transaction value;
- payer or payee participant;
- participant category;
- currency;
- transaction channel; or
- other scheme-defined transaction characteristics.

Applying the rule produces a fee amount. The Rules Handler therefore determines **how much one DFSP owes another**. It does not charge a customer or itself move the corresponding funds. Conceptually:

**Transaction attributes → Tariff rule → Fee calculation → Interchange obligation**

## Recording Interchange Obligations

Each participant may have an interchange fee account in addition to its other Mojaloop accounts. When a transaction is fulfilled, the Hub records the resulting interchange obligation against the relevant interchange fee accounts.

For example, for a USD 100 merchant payment:

- Payer DFSP → Payee DFSP: USD 100 payment obligation

- Payer DFSP → Payee DFSP: USD 0.60 interchange obligation

These are separate accounting obligations between the DFSPs even though both arise from the same transaction. The interchange obligation does not alter the customer's agreed transaction amount and is not passed through as a direct customer charge.

Interchange fee accounts allow these obligations to accumulate over a settlement period rather than requiring each interchange charge to generate an additional payment.

The processing model is therefore:

**Transaction → Rules Handler → Interchange calculation → Interchange accounts → Settlement**

## Settlement of Interchange Fees

Interchange fee accounts can be included within the scheme's settlement model.

At settlement, the accumulated interchange obligations are incorporated into the participants' settlement positions according to the settlement model configured by the scheme. This allows large numbers of individual interchange fees to be netted rather than settled individually.

For example, during a settlement period:

- DFSP A may owe DFSP B USD 10,000 in interchange fees;
- DFSP B may owe DFSP A USD 7,000 in interchange fees.

The relevant net interchange position between them is therefore USD 3,000 before any further multilateral netting performed by the settlement process.

Interchange is consequently treated as a **DFSP-to-DFSP ledger and settlement obligation**, rather than as a second customer payment attached to every transaction.

(**Note:** This capability may be dependent on the implementation of Settlement V3, which is currently an outstanding task.)

# Hub and Scheme Operator Fees

Hub fees are economically different from interchange fees.

An interchange fee represents an obligation between participants. A Hub fee represents an obligation from a participant to the organisation operating the scheme or Hub. Examples may include:

- membership fees;
- fixed monthly participation fees;
- transaction processing fees;
- volume-based charges; or
- other scheme service charges.

The Hub may use tariff rules and transaction information to calculate these charges. However, this does not require Hub fees to be accounted for or settled through participant interchange accounts.

## Calculating Hub Fees

A Hub tariff might, for example, specify:

**Monthly charge = USD 500 + (USD 0.002 × successful transactions)**

The Hub can accumulate the information required to calculate the amount owed by each participant over the relevant billing period. The resulting amount becomes an ordinary financial obligation from the participant to the Hub operator.

## Collecting Hub Fees

The recommended model is for the Hub operator to maintain an account with one of the participating DFSPs.

At the end of the billing period, the Hub calculates the amount owed by each participant and issues a Request to Pay (RTP). An authorised representative of the participant approves the payment and the DFSP executes it as an ordinary Mojaloop transaction.

Conceptually:

**Transaction/activity data → Hub tariff → Periodic invoice → RTP → Participant payment → Hub account**

The Hub therefore receives its fees using the same payment infrastructure that it provides to participants. The receiving DFSP subsequently accounts for the incoming payment through the normal Mojaloop settlement process.

This avoids requiring the Hub itself to hold settlement liquidity solely for the purpose of collecting fees.

# Why Hub Fees and Interchange Fees Are Different

It is technically possible to design a model in which the Hub collects both Hub fees and interchange fees and subsequently redistributes interchange amounts to participants. Such an approach is not recommended as the default Mojaloop model, because if the Hub collected interchange centrally, it would need to:

- receive funds owed between participants;
- hold those funds pending distribution;
- maintain liquidity for outgoing payments;
- make payments to participants; and
- assume a direct financial position in participant obligations.

This would move the Hub closer to the role of a financial intermediary and could introduce additional operational, liquidity, legal and regulatory considerations.

The preferred architecture therefore keeps the Hub out of the economic relationship between participants.

**Interchange:** DFSP → DFSP

**Hub fees:** DFSP → Hub

The Hub may calculate, record and facilitate settlement of scheme obligations where necessary, but does not become principal to them or accept the associated credit risk.

# Responsibility for Interchange Obligations

The scheme should take no financial position in interchange obligations and should not guarantee them. Each interchange obligation remains the responsibility of the participant that incurred it until it has been discharged through settlement. A participant receiving an interchange amount therefore retains exposure to the participant that owes it; the obligation is not converted into a claim on the scheme or Hub.

The scheme may nevertheless permit interchange fees to accrue without requiring participants to pre-fund them. In such a model, the absence of pre-funding does not transfer the obligation or its credit risk to the scheme: the owing participant remains fully responsible for the interchange amount and must fund and discharge it when settlement falls due.

Scheme rules and risk controls should specify how unpaid interchange obligations are handled. Those arrangements may include participant limits, monitoring, default procedures and other controls, but should not make the scheme principal to the obligation or require it to meet one participant's debt to another.

# Architectural Principles

The Mojaloop fee architecture can therefore be summarised through the following seven principles:

**Tariff calculation is separate from settlement.**  
A tariff determines an amount. It does not determine how that amount must be paid.

**Customer fee charging and collection are distinct.**  
A transaction fee charged by either DFSP may, through the Agreement of Terms process, be allocated to and collected from either the debit party or the credit party. The collecting party does not therefore have to be the charging DFSP's own customer.

**Interchange creates participant obligations, not customer charges.**  
Interchange fees are borne by DFSPs, recorded between them using dedicated accounts and discharged through settlement. Scheme rules prohibit their direct recovery from customers.

**Participants remain responsible for interchange.**  
Interchange need not be pre-funded, but the owing participant remains responsible for the obligation until settlement. The scheme neither guarantees the obligation nor accepts its credit risk.

**Hub fees create obligations to the Hub operator.**  
These can be periodically calculated and paid to the Hub through normal Mojaloop payment mechanisms, including Request to Pay.

**A fee does not necessarily require a payment transaction.**  
Customer transaction fees can be collected as part of the agreed transaction, while interchange charges can be accumulated as ledger obligations and subsequently netted through settlement.

**The Hub should not become a financial intermediary.**  
Where an obligation exists between two participants, Mojaloop should record and facilitate settlement of that obligation without requiring the Hub to collect and redistribute the underlying funds, guarantee payment or take a financial position.

# Summary

Mojaloop provides a common framework for determining tariffs while allowing different economic obligations to be handled appropriately. The resulting architecture can be represented as:

**Customer transaction fees**

Debit or credit party → charging DFSP  
*Charged by either DFSP, agreed before authorisation and collected from either party through the transaction*

**Interchange fees**

DFSP → DFSP  
*Borne by DFSPs and not recovered directly from customers → calculated from scheme tariff rules → recorded in interchange accounts → periodically settled without a scheme guarantee; pre-funding need not be required, but the participant remains responsible*

**Hub fees**

DFSP → Hub operator  
*Calculated from operator tariff → periodically invoiced → paid through RTP*

This separation provides a flexible tariff framework while preserving Mojaloop's underlying model in which the Hub facilitates clearing and settlement without becoming principal to participant financial obligations, accepting their credit risk or guaranteeing their discharge.

## Applicability

This version of this document relates to Mojaloop Version [17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.02.0)

## Document History

|Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|2.1|10th September 2026|Paul Makin|Clarified how customer fees may be charged and collected; confirmed that interchange obligations are borne by DFSPs and are not recovered directly from customers; replaced scheme guarantees with participant responsibility, no scheme financial position and a TIPS-like non-prefunding approach|
|2.0|3rd September 2026|Paul Makin|Updated and extended following discussions between the MLF and implementors|
|1.0|17th July 2025|Paul Makin|Initial version|
