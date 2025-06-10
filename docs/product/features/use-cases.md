
# Use Cases

A Mojaloop Hub's core function is the clearing of the transfer of funds between two accounts, each of which is held at a DFSP connected to the Hub, commonly referred to as a push payment. This enables it to support a wide range of use cases.

(For an API-led view of use cases, please refer to the [use cases section of the Mojaloop API documentation](https://docs.mojaloop.io/api/fspiop/use-cases.html#table-1))
## Core Use Cases
This means that, at the most basic level, a Mojaloop Hub directly supports the following use cases:
- Person to Person (**P2P**);
- Person to Business (**P2B**), including simple forms of merchant payments, both face to face and remote (online);
- Business to Business (**B2B**);
- Business to Government (**B2G**);
- Simple forms of Person to Government (**P2G**) payments

In all types of merchant payment, a payment can be facilitated using merchant IDs (for USSD) or QR codes (smartphones).

## Request To Pay

As well as push payments, Mojaloop supports Request To Pay (RTP) transactions, in which a payee requests a payment from a payer, and _when the payer consents_ their DFSP pushes the payment to the payee on their behalf. This supports the following use cases:

- **Merchant payments**, in a face to face environment, for example using a QR code;
    - 	The practicalities of configuring Mojaloop's Merchant Payments solution, including the content of QR codes, are explored in <b><a href="https://./merchant-payments.html" style="color: ox 00A3FF;">How to Configure Merchant Payments for Mojaloop</a>.</b>
    - In all types of face to face merchant payment, a payment can be facilitated using merchant IDs (for USSD) or QR codes (smartphones).
- **e-Commerce**, sometimes also known as remote merchant payments, when for example a checkout page (web page or mobile app) would include a "pay from my bank account" button, which would trigger an RTP. 

- **Collections**, including P2G, P2B, B2B and B2G - though this can also be achieved through the fintech/3PPI interface described below. 

## Cash Services
A Mojaloop Hub directly supports the common interoperable cash in/out transactions that every DFSP (and their customers) would expect:
- **Cardless ATM**;
- **Cash In at off-us Agent**;
- **Cash Out at off-us Agent**;
- **Offline Cash**.

A Mojaloop Hub is able to offer support to **offline cash** payment schemes because such a payment scheme is viewed as cash - albeit digital. So a withdrawal to an offline cash wallet (a load) is analogous to a "cash out" transaction; and a deposit from an offline cash wallet (an upload) is analogous to a "cash in" transaction. However, the operator of such a scheme might consider that all such wallet load/upload transactions, whether on-us or off-us, should be processed through the Mojaloop Hub, for ease of reconciliation by the offline scheme.

## Fintechs and Others
A Mojaloop Hub directly supports Third Party Payment Initiation (3PPI), so that Payment Initiation Service Providers (PISPs) - better known as fintechs - can, using their own smartphone apps, recruit customers, and offer them a unified or enhanced payments service. Most DFSPs connected to a Mojaloop Hub can support 3PPI services, if they have a reasonably modern back office.

A fintech can use the 3PPI service to initiate a Request To Pay (RTP) - asking their customer's DFSP to initiate a payment to a payee. This supports the following use cases:
-	**Collections**, in particular P2G and P2B;
-	**Salary payments**, essentially the processing of a bulk payments list, on behalf of small/medium businesses; 
-	**Merchant payments** (P2B), using a QR code for initiation.

## Bulk Payments
Every payments service needs to facilitate bulk payments, and Mojaloop offers this service using an extremely efficient model. All but the very smallest DFSPs are able to offer this service to their customers, allowing them to submit payments lists that can reach every customer of every connected DFSP. This is in support of:
- **Pensions, Social and other payments** (G2P);
- **Salaries** (G2P and B2P).

In addition, the bulk payment functionality is available through the **3PPI service** (above), which would enable all DFSPs - even the very smallest - to offer a smaller scale bulk payments service through either a fintech, or directly through their own 3PPI service.


## Cross Border Payments

A Mojaloop Hub can enable a DFSP's customers to send money across borders in a cost-effective manner, facilitating the foreign exchange (FX) process as part of the transaction. This supports the following use cases:
- **P2P** and **P2B** (sending money to friend and family in another country, or paying a bill in another country);
- **Merchant Payments**, using RTP cross-border (supporting, for example, a small merchant that wishes to cross a nearby border to trade at a local market, taking payments in the local currency)

In order to explore the aspects of the Mojaloop ecosystem that enable this, it is recommended to review:
1. The ability to connect a Mojaloop Hub to neighbouring payment schemes, either within the same country or elsewhere, so that interoperability is supported. This capability <a href="https://./InterconnectingSchemes.html" style="color: ox 00A3FF;">is introduced here</a>.
  
2. The support for foreign exchange providers (FXPs) to connect to a Mojaloop Hub and offer FX services. Neither the payer not the payee needs to define the currency to be used for a transaction; they each transact in their own currency, and the Mojaloop Hub(s) facilitate the interchange. This capability <a href="https://./ForeignExchange.html" style="color: ox 00A3FF;">is introduced here</a>.

3. How the interconnection/interscheme and foreign exchange capabilities are brought together to support <a href="https://./CrossBorder.html" style="color: ox 00A3FF;">cross border transactions</a>.

## Extended Use Cases

In addition to these standard use cases, Mojaloop supports the implementation
of more complex use cases by adopters, which add additional features and
are layered over the top of the standard use cases.

These
scheme-specific use cases can readily be added by individual scheme
operators.

## Applicability

This version of this document relates to Mojaloop Version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.3|10th June 2025| Paul Makin|Added a description of e-commerce payments using RTP. Retitled 3PPI payments as Fintech payments.Clarified bulk payment initiation via 3PPI. Finally, some cosmetic updates to highlight hyperlinks to other documents.|
|1.2|14th April 2025| Paul Makin|Updates related to the release of V17, including links to the interscheme and FX documentation.|