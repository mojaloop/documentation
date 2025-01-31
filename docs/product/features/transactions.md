
# Mojaloop Transactions
This section deals with all of the aspects of a Mojaloop transaction.
<details>
<summary>**Transaction Phases**</summary>

## Phases of a Mojaloop Transaction

A payment clearing hub based on a Mojaloop platform clears (routes and guarantees)
payments between accounts held by end parties (people, business,
government departments etc) at DFSPs, and integrates with a settlement
partner to orchestrate the movement of funds in settlement between
participating DFSPs at a later time, according to an agreed settlement
schedule.

All Mojaloop transactions are asynchronous (to ensure the most efficient
use of resources), and proceed through three phases:

1.  **Discovery,** when the Payer's DFSP works with the Mojaloop Hub to determine where the payment should be sent. This phase resolves an alias to a specific Payee DFSP and, in collaboration with that DFSP, an individual account.
 &nbsp;
2.  **Agreement of Terms, or Quotation,** when the two DFSP parties to the transaction agree that the transaction can go ahead (supporting, for example, restrictions relating to tiered KYC), and on what terms (including fees).
 &nbsp;

3.  **Transfer,** when the transaction between the two DFSPs (and by proxy their customers' accounts) is cleared.
&nbsp;

These phases are complemented by the asynchronous nature of Mojaloop. A transaction is always unique, ensuring that it will only be processed once, regardless of how frequently it is submitted for processing. This quality is known as idempotency, and ensures that, even if a customer experiences intermittent connectivity, they can be assured that their account will only be debited once, regardless of the number of retries.

This three-phase approach, complemented by idempotency, has been designed to minimize the risk of transaction failures or duplication. Consequently, we eliminate the need for transaction reconciliation by DFSPs, reduce most causes of disputes, and thereby minimize costs for all parties. 

Coupled with the Mojaloop approach to Risk Management, this ensures that even the smallest MFI and the largest international bank can participate on equal terms, without either imposing risk on the other or indeed on the Hub itself.
</details>
&nbsp;
<details>
<summary>**Mojaloop APIs**</summary>
## Mojaloop APIs

The Mojaloop Hub supports four APIs. The first two relate to end-customer transactions, whilst the last two relate to the administration of the Hub's relationship with participating DFSPs, and the settlement of cleared transactions:

1. **Transactional API**    
Mojaloop offers two functionally-equivalent transactional APIs, which each support direct connections with Participants for the purpose of conducting transactions. Both support all of the [**Mojaloop use cases**](./use-cases.md). These APIs are:
    - **FSP Interoperability (FSPIOP) API**, the long-established API, developed in accordance with the Level One Principals;
    - An **ISO 20022 Messaging Schema**, using an ISO 20022 message set provisionally agreed by the Mojaloop Foundation with the ISO 20022 Registration Management Group (RMG),and tailored to the needs of an Inclusive Instant Payments System (IIPS)such as Mojaloop. This is offered to adopters as an alternative to FSPIOP. More details of this schema can be found in the [**ISO20022 documentation**](./iso20022.md).
	
2.  **Third-party Payment Initiation (3PPI/PISP) API**

	This API is used to manage third party payment arrangements - payments initiated by fintechs on behalf of their customers from accounts held by those customers at DFSPs connected to the Mojaloop Hub. -- and to initiate those payments when authorized.


3.  **Administration API**

	The purpose of the Administration API is to enable Hub Operators to manage admin processes around:

	-   creating/activating/deactivating participants in the Hub

	-   adding and updating participant endpoint information

	-   managing participant accounts, limits, and positions

	-   creating Hub accounts

	-   performing Funds In and Funds Out operations

	-   creating/updating/viewing settlement models, for subsequent management using the Settlement API

	-   retrieving transfer details

4.  **Settlement API**

	The settlement API is used to manage the settlement process. It is not intended for the purpose of managing settlement models.


</details>
&nbsp;

<details>

<summary>**Unique Characteristics**</summary>

## Unique Transaction Characteristics

Most, if not all, of the functions Mojaloop supports are also offered by
other payment clearing hubs. What differentiates Mojaloop is:

1.  **The Three Phase Transaction Flow and Idempotency**, described above.   &nbsp;
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
    &nbsp;
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
	&nbsp;
4.  **The PISP API is made available through the Mojaloop Hub,** not by
    individual Participants. Consequently a fintech can integrate with
    the Hub and immediately be connected to all connected DFSPs, rather
    than needing to complete an API integration with the all
    individually. This substantially reduces costs and increases
    reliability for fintechs and their customers.
    </details>
    