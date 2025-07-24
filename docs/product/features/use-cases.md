
# Use Cases

A Mojaloop Hub's core function is the clearing of the transfer of funds between two accounts, each of which is held at a DFSP connected to the Hub, commonly referred to as a push payment. This enables it to support a wide range of use cases. However this is not the only transfer type that Mojaloop supports.

The following description of the use cases supported by Mojaloop is grouped according to the underlying protocol types, in order to demonstrate the extensible nature of a Mojaloop Hub. So we have:
- **Push payments**, which supports the core use cases of P2P, B2B, etc;
- **Request To Pay**, which supports some types of merchant payments, e-commerce and collections;
- A range of **cash services**, including CICO and offline;
- **PISP/3PPI protocols**, which allow fintechs and others to develop services such as merchant payments, small-scale salary runs, collections etc;
- **Bulk payments**, to support nation-scale social payments and salaries;
- **Cross-Border payments**, including both remittances and merchant payments.

These are described in more detail below. When reading these descriptions, it should be remembered that many of these transaction types [support the transport of metadata along with the payment itself](./metadata.md).

(For an API-led view of use cases, please refer to the [use cases section of the Mojaloop API documentation](https://docs.mojaloop.io/api/fspiop/use-cases.html#table-1))
## "Push Payment" Use Cases
A Mojaloop Hub directly supports the following use cases, which are all "flavours" of push payments:
- Person to Person (**P2P**);
- Person to Business (**P2B**), including simple forms of merchant payments, both face to face and remote (online);
- Business to Business (**B2B**);
- Business to Government (**B2G**);
- Simple forms of Person to Government (**P2G**) payments

In all types of merchant payment, a payment can be facilitated using merchant IDs (for USSD) or QR codes (smartphones).

## "Request To Pay" Use Cases

As well as push payments, Mojaloop supports Request To Pay (RTP) transactions, in which a payee requests a payment from a payer, and _when the payer consents_ their DFSP pushes the payment to the payee on their behalf. This supports the following use cases:

- **Merchant payments**, in a face to face environment, for example using a QR code;
    - 	The practicalities of configuring Mojaloop's Merchant Payments solution, including the content of QR codes, are explored in [**How to Configure Merchant Payments for Mojaloop**](./merchant-payments.html).
    - In all types of face to face merchant payment, a payment can be facilitated using merchant IDs (for USSD) or QR codes (smartphones).
- **e-Commerce**, sometimes also known as remote merchant payments, when for example a checkout page (web page or mobile app) would include a "pay from my bank account" button, which would trigger an RTP. 

- **Collections**, including P2G, P2B, B2B and B2G. This would commonly used for the payment of utility bills. This can also be achieved through the fintech/3PPI interface described below - the decision is a matter for a scheme operator. 

## Cash Services
A Mojaloop Hub directly supports the common interoperable cash in/out transactions that every DFSP (and their customers) would expect:
- **Cardless ATM**, through integration with ATM networks, using the ISO 8583 protocol;
- **Cash In / Cash Out (CICO) at off-us Agent**;
- **Offline Cash**:
	- A Mojaloop Hub is able to offer support to **offline cash** payment schemes because such a payment scheme is viewed as cash - albeit digital. So a withdrawal to an offline cash wallet (a load) is analogous to a "cash out" transaction; and a deposit from an offline cash wallet (an upload) is analogous to a "cash in" transaction. However, the operator of such a scheme might consider that all such wallet load/upload transactions, whether on-us or off-us, should be processed through the Mojaloop Hub, for ease of reconciliation by the offline scheme.

## "3PPI" Use Cases - Fintechs and Others
A Mojaloop Hub directly supports Third Party Payment Initiation (3PPI), so that Payment Initiation Service Providers (PISPs) - better known as fintechs - can, using their own smartphone apps, recruit customers, and offer them a unified or enhanced payments service. Most DFSPs connected to a Mojaloop Hub can support 3PPI services, if they have a reasonably modern back office.

A fintech can use the 3PPI service to initiate a Request To Pay (RTP) - asking their customer's DFSP to initiate a payment to a payee. This supports the following use cases:
-	**Collections**, in particular P2G and P2B;
-	**Salary payments**, essentially the processing of a bulk payments list, on behalf of small/medium businesses; 
-	**Merchant payments** (P2B), using a QR code for initiation.

## "Bulk Payment" Use Cases
Every payments service needs to facilitate bulk payments, and Mojaloop offers this service using an extremely efficient model. All but the very smallest DFSPs are able to offer this service to their customers, allowing them to submit payments lists that can reach every customer of every connected DFSP. This is in support of:
- **Pensions, Social and other payments** (G2P);
- **Salaries** (G2P and B2P).

In addition, the bulk payment functionality is available through the **3PPI service** (above), which would enable all DFSPs - even the very smallest - to offer a smaller scale bulk payments service through either a fintech, or directly through their own 3PPI service.


## "Cross Border" Use Cases

A Mojaloop Hub can enable a DFSP's customers to send money across borders in a cost-effective manner, facilitating the foreign exchange (FX) process as part of the transaction. This supports the following use cases:
- **P2P** and **P2B** (sending money to friend and family in another country, or paying a bill in another country);
- **Merchant Payments**, using RTP cross-border (supporting, for example, a small merchant that wishes to cross a nearby border to trade at a local market, taking payments in the local currency)

In order to explore the aspects of the Mojaloop ecosystem that enable this, it is recommended to review:
1. The ability to connect a Mojaloop Hub to neighbouring payment schemes, either within the same country or elsewhere, so that interoperability is supported. This capability [**is introduced here**](./InterconnectingSchemes.html).
  
2. The support for foreign exchange providers (FXPs) to connect to a Mojaloop Hub and offer FX services. Neither the payer not the payee needs to define the currency to be used for a transaction; they each transact in their own currency, and the Mojaloop Hub(s) facilitate the interchange. This capability [**is introduced here**](./ForeignExchange.html).

3. How the interconnection/interscheme and foreign exchange capabilities are brought together to support [**cross border transactions**](./CrossBorder.html).
## Others; Card Payments
Many potential adopters ask about the possibility of using Mojaloop to switch card transactions. The answer is that, from a technical perspective, it is perfectly possible to switch a card transaction; the card Personal Account Number (PAN) can be used as an alias to initiate an RTP transaction, particularly as the Bank Identification Number (BIN), which forms part of the PAN, identifies the DFSP that holds the customer's account, to which the RTP should be routed.

However, the practicality is that the card Point of Sale (PoS) device would need to be updated to route transactions accordingly; domestic transactions via an RTP to the Mojaloop switch, the rest to the issuing card network. And those PoS devices often belong to the acquiring banks, who may be unlikely to grant access (larger retailers, who often own their, usually integrated, PoS devices, might be more amenable).

Further, re-routing transactions initiated using a card bearing the logo of an international payment scheme would be wholly inappropriate, and would almost certainly place everyone involved in a precarious legal position. Consequently this is something that should only ever be considered when a domestic card scheme is used, and the owner of that scheme is willing for their cards to be used in this way.

Finally, using such an approach for debit cards is a closer match to a Mojaloop RTP transaction; using it for a credit card, which might include placing a funds reservation on an account (when checking into a hotel, for example), would add further complexity.

## Extended Use Cases

In addition to these standard use cases, Mojaloop supports the implementation of more complex use cases by adopters, which add additional features and are layered over the top of the standard use cases.

These scheme-specific use cases can readily be added by individual scheme operators.

## Applicability

This version of this document relates to Mojaloop Version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.6|24th July 2025| Paul Makin|Fixed some broken links.|
|1.5|16th July 2025| Paul Makin|Changed the sub-headings to reflect how the introductory text talks about use cases. Refined the descriptions. Added a link to a metadata description. Added a note about card transactions.|
|1.4|12th June 2025| Paul Makin|Extended the introductory text to explain the use case grouping.|
|1.3|10th June 2025| Paul Makin|Added a description of e-commerce payments using RTP. Retitled 3PPI payments as Fintech payments.Clarified bulk payment initiation via 3PPI. Finally, some cosmetic updates to highlight hyperlinks to other documents.|
|1.2|14th April 2025| Paul Makin|Updates related to the release of V17, including links to the interscheme and FX documentation.|