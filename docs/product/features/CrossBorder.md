# Cross Border Transactions

*This page assumes the reader is familiar with both Mojaloop's [**interscheme capabilities**](./InterconnectingSchemes.md) and the operation of [**foreign exchange**](./ForeignExchange.md).*

The current version of Mojaloop treats a cross-border transaction as a transaction that leaves one payments scheme, and is passed to another in a different regulatory jurisdiction. It is therefore, in Mojaloop terms, an interscheme transaction that includes a foreign exchange.

The following diagram illustrates how Mojaloop implements this functionality.

![Cross Border Transactions](./XB.svg)

In this context, a Proxy acts as the link between two Mojaloop schemes operating in different countries (regulatory jurisdictions), facilitating transactions and ensuring their end-to-end non-repudiation. Multiple FXPs are illustrated, two in jurisdiction A and one in jurisdiction B, so the various business models proposed for FX transactions can be supported.

This model can be extended further, so that countries with existing domestic instant payment systems can be interconnected, as follows: 

![Interconnecting Domestic Schemes to Offer Cross Border transactions](./ComplexXB.svg)

## Applicability

This version of this document relates to Mojaloop Version 17.

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|22nd April 2025| Paul Makin|Added version history; clarified some wording|
|1.0|14th April 2025| Paul Makin|Initial version|