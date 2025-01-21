
# Transactions

## Core Use Cases

A Mojaloop Hub supports a range of different transaction types,
classified below according to whether an end customer's DFSP initiates
the transactions, or whether it is initiated on the customer's behalf
by, for example, a fintech, using Mojaloop's PISP interface.

|DFSP-initiated|PISP-initiated|
|:--------------:|:--------------:|
|Account to account: person to person (P2P) or business to business or government (B2B/B2G)<br><br>Merchant Request to Pay<br><br>Bulk payments lists of any size, from small/local to nation-scale, in support of G2P, social payments, pensions and salaries.|Account association/continuing authorization<br><br>Request to Pay|

## Value-Add Use Cases

In addition to the core use cases, Mojaloop supports the implementation
of a number of more complex use cases, which add additional features and
are layered over the top of the core use cases.

The most prominent of these is Merchant Payments, which adds a Merchant
Registry function externally to the Mojaloop Hub, and supports the
generation of QR codes for the routing of payments from customers with
smartphones to merchants, linked to merchants' existing systems. This is
in parallel to support for USSD-based merchant payments.

Other use cases supported include collections, agent-facilitated cash
in/out, ATM withdrawals and cross-border payments. Further
service-specific use cases can readily be added by individual scheme
operators.

## Mojaloop APIs

The Mojaloop Hub supports four core APIs:

1. FSP Interoperability (FSPIOP) API

	This API is the principal transactional API, supporting direct connections with Participants.It supports the P2P, Request To Pay (RTP), Bulk Payments and the DFSP-side of PISP transactions.

	Note that the Mojaloop Community is at an advanced stage of moving to ISO 20022 compliance, using an ISO 20022 message set provisionally agreed with the ISO 20022 Registration Management Group (RMG),and tailored to the needs of an Inclusive Instant Payments System (IIPS)such as Mojaloop. This will be offered to adopters as an alternative to FSPIOP.

2.  Administration API

	The purpose of the Administration API is to enable Hub Operators to manage admin processes around:

	-   creating/activating/deactivating participants in the Hub

	-   adding and updating participant endpoint information

	-   managing participant accounts, limits, and positions

	-   creating Hub accounts

	-   performing Funds In and Funds Out operations

	-   creating/updating/viewing settlement models, for subsequent management using the Settlement API

	-   retrieving transfer details

3.  Settlement API

	The settlement API is used to manage the settlement process. It is not intended for the purpose of managing settlement models.

4.  Third-party Payment Initiation (3PPI/PISP) API

	This API is used to manage third party payment arrangements - payments initiated by fintechs on behalf of their customers from accounts held by those customers at DFSPs connected to the Mojaloop Hub. -- and to initiate those payments when authorized.

## Phases 

Mojaloop is a payment clearing hub: it clears (routes and guarantees)
payments between accounts held by end parties (people, business,
government departments etc) at DFSPs, and integrates with a settlement
partner to orchestrate the movement of funds in settlement between
participating DFSPs at a later time, according to an agreed settlement
schedule.

All Mojaloop transactions are asynchronous (to ensure the most efficient
use of resources), and proceed through three phases:

1.  **Discovery,** when the Payer's DFSP works with the Mojaloop Hub to determine where the payment should be sent. This phase resolves an alias to a specific Payee DFSP and, in collaboration with that DFSP, an individual account.

2.  **Agreement of Terms, or Quotation,** when the two DFSP parties to the transaction agree that the transaction can go ahead (supporting, for example, restrictions relating to tiered KYC), and on what terms (including fees).

3.  **Transfer,** when the transaction between the two DFSPs (and by proxy their customers' accounts) is cleared.
&nbsp;

This three phase approach has been designed to minimise the risk of transactions failing, so that we remove the need for transaction reconciliation by DFSPs, eliminate most causes of disputes, and so minimise costs for all parties. This, together with the Mojaloop approach to Risk Management, ensures that even the smallest MFI and the biggest international bank can participate on equal terms, with neither imposing risk on the other (or indeed on the Hub itself).

## Unique Transaction Characteristics

Most, if not all, of the functions Mojaloop supports are also offered by
other payment clearing hubs. What differentiates Mojaloop is:

1.  **The Three Phase Transaction Flow**, described above.

2.  **The Agreement of Terms, or Quotation,** phase of a transaction,
    which allows two DFSPs to agree that a transaction can take place
    *before* it is committed. This supports some of the most complex
    aspects of transactions between differing types of Participant; a
    Payee DFSP can verify that the customer's account can receive the
    payment, that it hasn't been suspended, or the payment won't breach
    transaction or balance limits. If that's all OK, then the Payee DFSP
    can accept the transaction, subject to any fees that it will charge
    (any Hub fees are outside of the transaction itself). Only if the
    Payer DFSP, and the Payer him/herself, agree to those charges will
    the transaction then take place. This removes the uncertainty, and
    all but guarantees that the transaction will succeed, even before it
    happens.

3.  **End to End Non-Repudiation** in the Transfer phase of the
    transaction guarantees that each party to a message can be assured
    that the message has not been modified, and that it really was sent
    by the purported originator. This underlying technology is leveraged
    by Mojaloop to guarantee that a transaction will only be committed
    if *both* the Payer *and* the Payee DFSPs accept that it is, and
    neither party can repudiate the transaction. This obviates the need
    for transaction-level reconciliation, which drives down on the level
    of disputed transactions and eliminates exception processing, and so
    substantially reduces costs for all participants.

	The Mojaloop community provides a number of tools that can be freely used by DFSPs to connect to a Mojaloop Hub. These remain within the DFSP's domain, and are not the concern of the hub operator or any other party. As well as managing the connection to the Hub and facilitating transactions, these tools also ensure the security of the connection and in particular provide the key DFSP link to this non-repudiation capability.

4.  **The PISP API is made available through the Mojaloop Hub,** not by
    individual Participants. Consequently a fintech can integrate with
    the Hub and immediately be connected to all connected DFSPs, rather
    than needing to complete an API integration with the all
    individually. This substantially reduces costs and increases
    reliability for fintechs and their customers.