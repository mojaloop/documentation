# Introduction to Mojaloop 

Mojaloop is open source instant payments software that interconnects
disparate financial institutions in a manner that promotes financial
inclusion and provides robust risk management for all participants. It is available for use by any body that wishes to use it to implement and operate an inclusive instant payments scheme (IIPS).

## Regulators' and Operators' Perspective
Mojaloop provides the foundation for an operator to establish an Inclusive Instant Payment System (IIPS), and is intended to be integrated with a settlement partner. The partner may be the national RTGS, though other settlement mechanisms are also supported. In this way, Mojaloop enables the delivery of a comprehensive payments interoperability service to participating financial institutions (FIs).

Once deployed, Mojaloop allows the scheme operator to:
- Onboard, suspend, or reactivate participating FIs as required;
- Set net debit caps for each participant to manage both risk and liquidity;
- Select and operate the settlement model best aligned to scheme and national requirements;
- Define multiple settlement periods across the operational day, with the closure of each period generating a settlement file (according to the chosen model) for the settlement partner’s action.

The Mojaloop Hub underpins these functions by:
- Processing payments between debtor and creditor FIs on a continuous 24/7 basis;
- Updating each participant’s position in real time as debits and credits occur;
- Validating every payment to ensure sufficient liquidity and compliance with the participant’s net debit cap, rejecting transactions if these conditions are not met;
- Updating participant positions at the end of each settlement window to reflect the value of funds settled.

In addition, Mojaloop supports an **indirect participation model**, designed to extend access to smaller financial institutions — particularly non-bank entities such as MFIs — that are not eligible to participate directly in the national RTGS. This ensures broad inclusion within the payments ecosystem while maintaining financial stability.


## Technical Perspective

In order to deliver the IIPS described above, Mojaloop implements a set of core functions:

  |Alias Resolution|Clearing|Settlement|
|:--------------:|:--------------:|:--------------:|
|Payee address or **alias resolution**, ensuring that the account-holding institution – and thereby the correct payee account - is reliably identified|**Clearing** of payments end to end, with robust measures that remove any element of doubt about the success of a transaction|Orchestration of **Settlement** of cleared transactions between financial institutions using a model agreed between those institutions, and according to a predefined schedule.|

&nbsp;

These core functions are supported by some [unique characteristics](./transaction.html#unique-transaction-characteristics), which
together make Mojaloop a low cost, inclusive instant payments system:

1.  **A Three Phase Transaction Flow**, as follows:
	+  **Discovery,** when the Payer's DFSP works with the Mojaloop Hub to determine where the payment should be sent, so ensuring that transactions are not misdirected. This phase resolves an alias to a specific Payee DFSP and, in collaboration with that DFSP, an individual account.

	 + **Agreement of Terms, or Quotation,** when the two DFSP parties to the transaction both agree that the transaction can go ahead (supporting, for example, restrictions relating to tiered KYC), and on what terms (including fees), **before** either commits to it.

	+  **Transfer,** when the transaction between the two DFSPs (and by proxy their customers' accounts) is cleared, and it is guaranteed that both parties have the same, real-time view of the success or failure of the transaction.
&nbsp;

2.  **End to End Non-Repudiation** guarantees that each party to a message can be assured that the message has not been modified, and that it really was sent by the purported originator. This underlying technology is leveraged by Mojaloop to guarantee that a transaction will only be committed if *both* the Payer *and* the Payee DFSPs accept that it is, and neither party can repudiate the transaction. Naturally, it also guarantees that no third party can modify the transaction.
3.  **The PISP API is made available through the Mojaloop Hub,** not by individual DFSPs. Consequently a fintech can integrate with the Hub and immediately be connected to **all** connected DFSPs. 

**Note** In Mojaloop terms, a DFSP - or Digital Financial Service Provider - is a generic term for any financial institution, of any size or status, that is able to transact digitally. It applies equally to the largest international bank and the smallest Microfinance Institution or mobile wallet operator. "DFSP" is used throughout this document.   
&nbsp;

# The Mojaloop Ecosystem
## The Core
In reading this document, it is important to understand the terminology used to identify the various actors, and how they interact. The following diagram provides a high level view of the Mojaloop ecosystem.

![Mojaloop Ecosystem](./ecosystem.svg)

## Overlay Services
Around the core illustrated in the above diagram there are a set of overlay services, which also form part of the complete Mojaloop open source package. These are:
- The **Account Lookup Service** (ALS), and a number of oracles that are used by the ALS in alias resolution;
- A set of **portals**, built to use the Business Operations Framework, which allow a hub operator to interact with/manage the Mojaloop Hub;
- A **Merchant Payments** module, which supports merchant registration and the issuing of merchant IDs, including the generation of QR Codes which can be scanned to initiate a merchant transaction;
- The **Testing Toolkit** (TTK), which allows engineers to simulate any aspect of the Mojaloop core ecosystem, to facilitate their development, integration and testing efforts;
- An **Integration Toolkit** (ITK), part of the [connectivity support](./connectivity.md) library, which facilitates the connection between a DFSP and a Mojaloop Hub;
- **ISO 8583 integration**, which allows ATMs (or an ATM switch) to be integrated with a Mojaloop Hub, for cash withdrawals;
- [**MOSIP integration**](https://www.mosip.io), which allow payments to be routed to a MOSIP-based digital identity, rather than (say) a mobile phone number.

# Feature List

This document presents a feature list which covers the following aspects of Mojaloop:

-   [**Use Cases**](./use-cases.md), describing the use cases supported by every Mojaloop deployment.
-   [**Transactions**](./transaction.md), describing the Mojaloop APIs, how a transaction proceeds, and the aspects of a Mojaloop transaction that make it uniquely suited to the   implementation of an inclusive instant payments service.

-   [**Risk Management**](./risk.md), setting out the measures taken to ensure that no DFSP participating in a Mojaloop scheme is exposed to any counterparty risk, and that the integrity of the scheme as a whole is protected.

-  [**Connectivity Support**](./connectivity.md), describing the various tools and options for straightforward onboarding of participating DFSPs.

-  [**Portals and Operational Features**](./product.md), such as portals for user and service management, and the configuration and operation of a Mojaloop Hub.
-  [**Fees and Tariffs**](./tariffs.md) sets out the mechanisms that Mojaloop provides to support a range of different tariff models and the opportunities for participants and hub operators to levy fees.

-  [**Performance**](./performance.md), outlining the transaction processing performance adopters might expect. 
- [**Deployment**](./deployment.md), describing the different ways to deploy Mojaloop for a range of different purposes, and the tools that facilitate these deployment types. 
- [**Security**](./security.md), covering the security of the transactions between connected DFSPs and the Mojaloop Hub, the security of the Hub itself (including the operator portals), and the QA Framework currently being developed to validate the security and quality of a Mojaloop deployment.
- [**Engineering Principles**](./engineering.md), such as algorithmic adherence to the Mojaloop specification, code quality, security practices, scalability and performance patterns (amongst others).

-   [**Invariants**](./invariants.md), setting out the development and operational principles to which any Mojaloop implementation must adhere. This includes the principles which ensure the security and integrity of a Mojaloop deployment.

&nbsp;

# About This Document

## Purpose of This Document

This document catalogues the features of Mojaloop, independent of
implementation. It is intended to both inform potential adopters of the features they can expect and (where appropriate) how those features can be expected to function, and to inform developers of the features they must implement in order for their efforts to be accepted as an official instance of Mojaloop.

The Mojaloop Foundation (MLF) defines an implementation as being an
official instance of Mojaloop if it implements all of the features of
Mojaloop, without exception, and they pass the standard set of Mojaloop tests.

## Applicability

This version of this document relates to Mojaloop Version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.4|28th August 2025| Paul Makin|Added the "Regulators' and Operators' Perspective"|
|1.3|23rd June 2025| Paul Makin|Added the ecosystem text and diagram|
|1.2|14th April 2025| Paul Makin|Updates related to the release of V17|