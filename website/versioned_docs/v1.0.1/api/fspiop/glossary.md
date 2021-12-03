# Glossary

## Preface

This section contains information about how to use this document.

### Conventions Used in This Document

The following conventions are used in this document to identify the specified types of information.

| **Type of Information** | **Convention** | **Example** |
| :--- | :--- | :--- |
| **Elements of the API, such as resources** | Boldface | **/authorization** |
| **Variables** | Italics within curled brackets | _{ID}_ |
| **Glossary** | Italics on first occurrence; defined in _Glossary_ | The purpose of the API is to enable interoperable financial transactions between a _Payer_ (a payer of **terms** electronic funds in a payment transaction) located in one _FSP_ (an entity that provides a digital financial service to an end user) and a _Payee_ (a recipient of electronic funds in a payment transaction) located in another FSP. |
| **Library documents** | Italics | User information should, in general, not be used by API deployments; the security measures detailed in _API Signature_ and _API Encryption_ should be used instead.|

### Document Version Information

| **Version** | **Date** | **Change Description** |
| :--- | :--- | :--- |
| **1.0** | 2018-03-13 | Initial version |

<br />

## Introduction

This document provides the glossary for the Open API for FSP Interoperability Specification. Terms have been compiled from three sources:

- ITU-T Digital Financial Services Focus Group Glossary (ITU-T)<sup>[ITU-T Digital Financial Services Focus Group Glossary (ITU-T)](https://www.itu.int/dms_pub/itu-t/opb/tut/T-TUT-ECOPO-2018-PDF-E.pdf)</sup>,

- Feedback from Technology Service Providers (TSPs) in the Product Development Partnership (PDP) work groups, and

- Feedback from the L1P IST Reference Implementation team (RI).

Information is shared in accordance with Creative Commons Licensing<sup>[LICENSE](https://github.com/mojaloop/mojaloop-specification/blob/master/LICENSE.md)</sup>.


### Open API for FSP Interoperability Specification

The Open API for FSP Interoperability Specification includes the following documents.

#### Logical Documents

- [Logical Data Model](./logical-data-model)

- [Generic Transaction Patterns](./generic-transaction-patterns)

- [Use Cases](./use-cases)

#### Asynchronous REST Binding Documents

- [API Definition](./api-definition)

- [JSON Binding Rules](./json-binding-rules)

- [Scheme Rules](./scheme-rules)

#### Data Integrity, Confidentiality, and Non-Repudiation

- [PKI Best Practices](./pki-best-practices)

- [Signature](./v1.1/signature)

- [Encryption](./v1.1/encryption)

#### General Documents

- [Glossary](#)

<br />


## API Glossary

| **Term** | **Alternative and Related Terms** | **Definition** | **Source** |
| --- | --- | --- | --- |
| **Access Channel** | POS ("Point of Sale"), Customer Access Point, ATM, Branch, MFS Access Point | Places or capabilities that are used to initiate or receive a payment. Access channels can include bank branch offices, ATMs, terminals at the POS, agent outlets, mobile phones, and computers. | ITU-T |
| **Account ID** | | A unique identifier assigned by the FSP that created the account. | PDP |
| **Account Lookup System** | | Account Lookup System is an abstract entity used for retrieving information regarding in which FSP an account, wallet, or identity is hosted. The Account Lookup System itself can be hosted in its own server, as part of a financial switch, or in the different FSPs. | PDP |
| **Active User** | | A term used by many providers in describing how many of their account holders are frequent users of their service. | 
| **Agent** | Agent Til , Agent Outlet | An entity authorized by the provider to handle various functions such as customer enrollment, cash-in and cash-out using an agent til . | ITU-T |
| **Agent Outlet** | Access Point | A physical location that carries one or more agent tills, enabling it to perform enrollment, cash-in, and cash-out transactions for customers on behalf of one or more providers. National law defines whether an agent outlet may remain exclusive to one provider. Agent outlets may have other businesses and support functions. | ITU-T |
| **Agent Till** | Registered Agent | An agent till is a provider-issued registered “line”, either a special SIM card or a POS machine, used to perform enrollment, cash-in and cash-out transactions for clients. National law dictates which financial service providers can issue agent tills. | ITU-T |
| **Aggregator** | Merchant Aggregator | A specialized form of a merchant services provider, who typically handles payment transactions for a large number of small merchants. Scheme rules often specify what aggregators are allowed to do. | ITU-T |
| **Anti-Money Laundering** | AML; also "Combating the Financing of Terrorism", or CFT | Initiatives to detect and stop the use of financial systems to disguise the use of funds that have been criminally obtained. | ITU-T |
| **API** | Application Programming Interface | A set of clearly defined methods of communication to allow interaction and sharing of data between different software programs. |PDP |
| **Arbitration** | | The use of an arbitrator, rather than courts, to resolve disputes. | ITU-T |
| **Authentication** | Verification, Validation | The process of ensuring that a person or a transaction is valid for the process (account opening, transaction initiation, and so on) being performed. | ITU-T |
| **Authorization** | | A process used during a "pull" payment (such as a card payment), in which the payee requests (through their provider) confirmation from the payer's bank that the transaction is good. | ITU-T |
| **Authorized /institution entity** | | Non-financial institutions that have followed the appropriate authorization by State Bank and/or relevant regulatory authorities to partake in the provisioning of mobile financial services. | PDP |
| **Automated Clearing House** | ACH | An electronic clearing system in which payment orders are exchanged among payment service providers, primarily via magnetic media or telecommunications networks, and then cleared amongst the participants. All operations are handled by a data processing center. An ACH typically clears credit transfers and debit transfers, and in some cases also cheques. | ITU-T |
| **Bank** | Savings Bank, Credit Union, Payments Bank | A chartered financial system within a country that has the ability to ITU-T accept deposits and make and receive payments into customer accounts. | ITU-T |
| **Bank Accounts and Transaction Services** | Mobile Banking, Remote Banking, Digital Banking| A transaction account held at a bank. This account may be accessible by       ITU-T a mobile phone, in which case it is sometimes referred to as "mobile banking".| ITU-T |
| **Bank-Led Model** | Bank-Centric Model| A reference to a system in which banks are the primary providers of digital financial services to end users. National law may require this. | ITU-T |
| **Basic Phone** | |     Minimum device required to use digital financial services. | PDP |
| **Bill Payment** | C2B, Utility Payments, School Payments | Making a payment for a recurring service, either in person ("face to face") or remotely. | ITU-T |
| **Biometric Authentication** | | The use of a physical characteristic of a person (fingerprint, IRIS, and so on) to authenticate that person. | ITU-T |
| **Biometric Authentication** | | Any process that validates the identity of a user who wishes to sign into a system by measuring some intrinsic characteristic of that user. | ITU-T |
| **Blacklist** | | A list or register of entities (registered users) that are being denied/blocked from a particular privilege, service, mobility, access or recognition. Entities on the list will not be accepted, approved and or recognized. It is the practice of identifying entities that such entities are denied, unrecognized, or ostracized. Where entities are registered users (or user accounts, if granularity allows) and services are informational (for example, balance check), transactional (for example, debit/credit) payments services or lifecycle (for example, registration, closure) services. | PDP |
| **Blockchain** | Digital Currency, Cryptocurrency, Distributed Ledger Technology| The technology underlying bitcoin and other cryptocurrencies—a shared digital ledger, or a continually updated list of all transactions.| ITU-T |
| **Borrowing** | | Borrowing money to finance a short-term or long-term need. | ITU-T |
| **Bulk Payments** | G2C, B2C, G2P, Social Transfers| Making and receiving payments from a government to a consumer: benefits, cash transfers, salaries, pensions, and so on | ITU-T |
| **Bulk Payment Services** | | A service which allows a government agency or an enterprise to make payments to a large number of payees - typically consumers but can be businesses as well | ITU-T |
| **Bulk upload service** | |   A service allowing the import of multiple transactions per session, most often via a bulk data transfer file which is used to initiate payments. Example: salary payment file. | ITU-T |
| **Bundling** | Packaging, Tying | A business model in which a provider which groups a collection of services into one product which an end user agrees to buy or use.| ITU-T |
| **Business** | | Entity such as a public limited or limited company or corporation that uses mobile money as a service; for example, making and accepting bill payments and disbursing salaries.| PDP |
| **Cash Management** | Agent Liquidity Management | Management of cash balances at an agent. | ITU-T |
| **Cash-In** | CICO (Cash-In Cash-Out) | Receiving eMoney credit in exchange for physical cash - typically done at an agent. | ITU-T |
| **Cash-Out** | CICO (Cash-In Cash-Out) | Receiving physical cash in exchange for a debit to an eMoney account - typically done at an agent. | ITU-T |
| **Certificate Signing Request** | CSR | Message sent from an applicant to a Certificate Authority in order to apply for a digital identity certificate. | |
| **Chip Card** | EMV Chip Card, Contactless Chip Card | A chip card contains a computer chip: it may be either contactless or contact (requires insertion into terminal). Global standards for chip cards are set by EMV. | ITU-T |
| **Clearing** | | The process of transmitting, reconciling, and, in some cases, confirming transactions prior to settlement, potentially including the netting of transactions and the establishment of final positions for settlement. Sometimes this term is also used (imprecisely) to cover settlement. For the clearing of futures and options, this term also refers to the daily balancing of profits and losses and the daily calculation of collateral requirements. | RI |
| **Clearing House** | | A central location or central processing mechanism through which financial institutions agree to exchange payment instructions or other financial obligations (for example, securities). The institutions settle for items exchanged at a designated time based on the rules and procedures of the clearinghouse. In some cases, the clearinghouse may assume significant counterparty, financial, or risk management responsibilities for the clearing system.| ITU-T |
| **Client Authentication** | TLS | A client authentication certificate is a certificate used to authenticate clients during an SSL handshake. It authenticates users who access a server by exchanging the client authentication certificate. ... This is to verify that the client is who they claim to be (Source: Techopedia). | |
| **Closed-Loop** | | A payment system used by a single provider, or a very tightly constrained group of providers.| ITU-T |
| **Combatting Terrorist Financing** | | Initiatives to detect and stop the use of financial systems to transfer funds to terrorist organizations or people. | ITU-T |
| **Commission** | |   An incentive payment made, typically to an agent or other intermediary who acts on behalf of a DFS provider. Provides an incentive for agent. | ITU-T |
| **Commit** | | Part of a 2-phase transfer operation in which the funds that were reserved to be transferred, are released to the payee; the transfer is completed between the originating/payer and destination/payee accounts. | PDP |
| **Condition** | | In the Interledger protocol, a cryptographic lock used when a transfer is reserved. Usually in the form of a SHA-256 hash of a secret preimage. When provided as part of a transfer request the transfer must be reserved such that it is only committed if the fulfillment of the condition (the secret preimage) is provided. | PDP |
| **Counterparty** | Payee, Payer, Borrower, Lender | The other side of a payment or credit transaction. A payee is the counterparty to a payer, and vice-versa. | ITU-T |
| **Coupon** | | A token that entitles the holder to a discount or that may be exchanged for goods or services.| PDP |
| **Credit History** | Credit Bureaus, Credit Files | A set of records kept for an end user reflecting their use of credit, including borrowing and repayment. | ITU-T |
| **Credit Risk Management** | | Tools to manage the risk that a borrower or counterparty will fail to meet its obligations in accordance with agreed terms. | ITU-T |
| **Credit Scoring** | | A process which creates a numerical score reflecting credit worthiness. | ITU-T |
| **Cross Border Trade Finance Services** | | Services which enable one business to sell or buy to businesses or individuals in other countries; may include management of payments transactions, data handling, and financing. | ITU-T |
| **Cross-FX Transfer** | | Transfer involving multiple currencies including a foreign exchange calculation.| PDP |
| **Customer Database Management** | | The practices that providers do to manage customer data: this may be enabled by the payment platform the provider is using. | ITU-T |
| **Customer Financial Data** | Customer Financial Data | Means a set of financial information of the customer, which includes account balances, deposits and data relating to financial transactions, and so on | PDP |
| **Data Controller** | Data Controller | Data Controller shall mean any person, public authority, agency or any other body which alone or jointly with others determines the purposes and means of the processing of personal data; where the purposes and means of processing are determined by national or Community laws or regulations, the controller or the specific criteria for his nomination may be designated by national or Community law. Also, Data Controller is responsible for providing a secure infrastructure in support of the data, including, but not limited to, providing physical security, backup and recovery processes, granting authorized access privileges and implementing and administering controls. | PDP |
| **Data Portability** | Data Portability | Data Portability shall mean a data subject’s ability to request a copy of personal data being processed in a format usable by this person and be able to transmit it electronically to another processing system | PDP |
| **Data Protection** | PCI-DSS | The practices that enterprises do to protect end user data and credentials. "PCI-DSS" is a card industry standard for this. | ITU-T |
| **Deposit Guarantee System** | Deposit Insurance | A fund that insures the deposits of account holders at a provider; often a government function used specifically for bank accounts. | ITU-T |
| **Diffie-Hellman solution** | | A secure mechanism for exchanging a shared symmetric key between two anonymous peers. | |
| **Digital Financial Services** | DFS, Mobile Financial Services | Digital financial services include methods to electronically store and transfer funds; to make and receive payments; to borrow, save, insure and invest; and to manage a person's or enterprise's finances. | ITU-T |
| **Digital Liquidity** | | A state in which a consumer willing to leave funds (eMoney or bank deposits) in electronic form, rather than performing a "cash-out". | ITU-T |
| **Digital Payment** | Mobile Payment, Electronic Funds Transfer | A broad term including any payment which is executed electronically. Includes payments which are initiated by mobile phone or computer. Card payments in some circumstances are considered to be digital payments. The term "mobile payment" is equally broad and includes a wide variety of transaction types which in some way use a mobile phone. | ITU-T |
| **Dispute Resolution** | | A process specified by a provider or by the rules of a payment scheme to resolve issues between end users and providers, or between an end user and its counter party. | ITU-T |
| **Electronic consent** | Electronic consent |Any sound, symbol, or process which is:<br>1. Related to technology<ul>a. Having electrical, digital, magnetic, wireless, optical, electromagnetic, or similar capabilities, including (but not limited to) mobile telephone, facsimile and internet and</ul><ul>b. Which may only be accessed through a security access code, and</ul></br><br>2. Logically associated with a legally binding agreement or authorization and executed or adopted by a person with the intent to be bound by such agreement or authorization.</br> | PDP |
| **Electronic Invoicing, ERP, Digital Accounting, Supply Chain Solutions, Services, Business Intelligence** | | Services which support merchant or business functions relating to DFS services. | ITU-T |
| **eMoney** |eFloat, Float, Mobile Money, Electronic Money, Prepaid Cards, Electronic Funds | A record of funds or value available to a consumer stored on a payment device such as chip, prepaid cards, mobile phones or on computer systems as a non-traditional account with a banking or non-banking entity. | ITU-T |
| **eMoney Accounts and Transaction Services** | Digital Wallet, Mobile Wallet, Mobile Money Account |A transaction account held at a non-bank. The value in such an account is referred to as eMoney. | ITU-T |
| **eMoney Issuer** | Issuer, Provider | A provider (bank or non-bank) who deposits eMoney into an account they establish for an end user. eMoney can be created when the provider receives cash ("cash-in") from the end user (typically at an agent location) or when the provider receives a digital payment from another provider. | ITU-T |
| **Encryption** |Decryption | The process of encoding a message so that it can be read only by the sender and the intended recipient. | ITU-T |
| **End User** |Consumer, Customer, Merchant, Biller | The customer of a digital financial services provider: the customer may be a consumer, a merchant, a government, or another form of enterprise. | ITU-T |
| **External Account** | | An account hosted outside the FSP, regularly accessible by an external provider interface API. | PDP |
| **FATF** | | The Financial Action Task Force is an intergovernmental organization to combat money laundering and to act on terrorism financing. | ITU-T |
| **Feature Phone** | |A mobile telephone without significant computational . | ITU-T |
| **Fees** | | The payments assessed by a provider to their end user. This may either be a fixed fee, a percent-of-value fee, or a mixture. A Merchant Discount Fee is a fee charged by a Merchant Services Provider to a merchant for payments acceptance. Payments systems or schemes, as well as processors, also charge fees to their customer (typically the provider.) | ITU-T |
| **Financial Inclusion** | | The sustainable provision of affordable digital financial services that bring the poor into the formal economy.| ITU-T |
| **Financial Literacy** | |Consumers and businesses having essential financial skills, such as preparing a family budget or an understanding of concepts such as the time value of money, the use of a DFS product or service, or the ability to apply for such a service. | ITU-T |
| **FinTech** | |A term that refers to the companies providing software, services, and products for digital financial services: often used in reference to newer technologies. | ITU-T |
| **Float** | |This term can mean a variety of different things. In banking, float is created when one party's account is debited or credited at a different time than the counterparty to the transaction. eMoney, as an obligation of a non-bank provider, is sometimes referred to as float. | ITU-T |
| **Fraud** | Fraud Management, Fraud Detection, Fraud Prevention | Criminal use of digital financial services to take funds from another individual or business, or to damage that party in some other way. | ITU-T |
| **Fraud Risk Management** | | Tools to manage providers' risks, and at times user's risks (for example, for merchants or governments) in providing and/or using DFS services. | ITU-T |
| **FSP** | Provider, Financial Service Provider (FSP), Payment Service Provider, Digital Financial Services Provider (DFSP) | The entity that provides a digital financial service to an end user (either a consumer, a business, or a government.) In a closed-loop payment system, the Payment System Operator is also the provider. In an open- loop payment system, the providers are the banks or non-banks which participate in that system. | ITU-T |
| **FSP On-boarding** | |    The process of adding a new FSP to this financial network. | RI |
| **Fulfillment** | | In the Interledger protocol, a secret that is the preimage of a SHA-256 hash, used as a condition on a transfer. The preimage is required in the commit message to trigger the transfer to be committed.| PDP |
| **FX** | | Foreign Exchange | PDP |
| **Government Payments Acceptance Services** | | Services which enable governments to collect taxes and fees from individuals and businesses. | ITU-T |
| **HCE** | | Host Card Emulation. A communication technology that enables payment data to be safely stored without using the Secure Element in the phone. | ITU-T |
| **Identity** | National Identity, Financial Identity, Digital Identity |A credential of some sort that identifies an end user. National identities are issued by national governments. In some countries a financial identity is issued by financial service providers. | ITU-T |
| **Immediate Funds Transfer** | Real Time | A digital payment which is received by the payee almost immediately upon the payer having initiated the transaction | ITU-T |
| **Insurance Products** | |   A variety of products which allow end user to insure assets or lives that they wish to protect.| ITU-T |
| **Insuring Lives or assets** | | Paying to protect the value of a life or an asset. | ITU-T |
| **Interchange** | Swipe Fee, Merchant Discount Fee | A structure within some payments schemes which requires one provider to pay the other provider a fee on certain transactions. Typically used in card schemes to effect payment of a fee from a merchant to a consumer's card issuing bank. | ITU-T |
| **Interledger** | | The Interledger protocol is a protocol for transferring monetary value across multiple disconnected payment networks using a choreography of conditional transfers on each network. | PDP |
| **International Remittance** | P2P; Remote Cross-Border Transfer of Value, Cross-Border Remittance | Making and receiving payments to another person in another country. | ITU-T |
| **Interoperability** | Interconnectivity | When payment systems are interoperable, they allow two or more proprietary platforms or even different products to interact seamlessly. The result is the ability to exchange payments transactions between and among providers. This can be done by providers participating in a scheme, or by a variety of bilateral or multilateral arrangements. Both technical and business rules issues need to be resolved for interoperability to work. | ITU-T |
| **Interoperability Service for Transfers (IST)** | Switch | An entity which receives transactions from one provider and routes those transactions on to another provider. A switch may be owned or hired by a scheme or be hired by individual providers. A switch may connect to a settlement system for inter-participant settlement and could also implicitly host other services - such as a common account locator service. | ITU-T |
| **Interoperability settlement bank** | | Entity that facilitates the exchange of funds between the FSPs. The settlement bank is one of the main entities involved in any inter-FSP transaction. | PDP |
| **Investment Products** | | A variety of products which allow end users to put funds into investments other than a savings account.| ITU-T |
| **Irrevocable** | |A transaction that cannot be "called back" by the payer; an irrevocable payment, once received by a payee, cannot be taken back by the payer. | ITU-T |
| **JSON** | JavaScript Object Notation | JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language, Standard ECMA-262 3rd Edition - December 1999 (Source: www.json.org). | |
| **Know Your Customer** | KYC, Agent and Customer Due Diligence, Tiered KYC, Zero Tier | The process of identifying a new customer at the time of account opening, in compliance with law and regulation. The identification requirements may be lower for low value accounts ("Tiered KYC"). The term is also used in connection with regulatory requirements for a provider to understand, on an ongoing basis, who their customer is and how they are using their account. | ITU-T |
| **Liability** | Agent Liability, Issuer Liability, Acquirer Liability | A legal obligation of one party to another; required by either national law, payment scheme rules, or specific agreements by providers. Some scheme rules transfer liabilities for a transaction from one provider to another under certain conditions. | ITU-T |
| **Liquidity** | Agent Liquidity | The availability of liquid assets to support an obligation. Banks and non-bank providers need liquidity to meet their obligations. Agents need liquidity to meet cash-out transactions by consumers and small merchants.| ITU-T |
| **Loans** | Microfinance, P2P Lending, Factoring, Cash Advances, Credit, Overdraft, Facility | Means by which end users can borrow money. | ITU-T |
| **M2C** | | Merchant to Customer or Consumer. | PDP |
| **mCommerce** | eCommerce | Refers to buying or selling in a remote fashion: by phone or tablet (mCommerce) or by computer (eCommerce). | ITU-T |
| **Merchant** | Payments Acceptor | An enterprise which sells goods or services and receives payments for such goods or services. | ITU-T |
| **Merchant Acquisition** | Onboarding | The process of enabling a merchant for the receipt of electronic payments.| ITU-T |
| **Merchant payment - POS** | C2B, Proximity Payments | Making a payment for a good or service in person ("face to face"); includes kiosks and vending machines. | ITU-T |
| **Merchant payment - Remote** |C2b, eCommerce Payment, Mobile Payment | Making a payment for a good or service remotely; transacting by phone, computer, and so on | ITU-T |
| **Merchant Payments Acceptance Services** | Acquiring Services | A service which enables a merchant or other payment acceptor to accept one or more types of electronic payments. The term "acquiring" is typically used in the card payments systems. | ITU-T |
| **Merchant Service Provider** | Acquirer | A provider (bank or non-bank) who supports merchants or other payments acceptors requirements to receive payments from customers. The term "acquirer" is used specifically in connection with acceptance of card payments transactions. |  ITU-T |
| **Mobile Network Operator** | MNO | An enterprise which sells mobile phone services, including voice and data communication. | ITU-T |
| **Money Transfer Operator** | |   A specialized provider of DFS who handles domestic and/or international remittances. | ITU-T |
| **MSISDN** | | Number uniquely identifying a subscription in a mobile phone network. These numbers use the E.164 standard that defines numbering plan for a world-wide public switched telephone network (PSTN).| RI |
| **Mutual Authentication** | TLS | Mutual authentication or two-way authentication refers to two parties authenticating each other at the same time, being a default mode of authentication in some protocols (IKE, SSH) and optional in others (TLS) (Source: Wikipedia). | |
| **Near Field Communication** | NFC | A communication technology used within payments to transmit payment data from an NFC equipped mobile phone to a capable terminal.| ITU-T |
| **Netting** | | The offsetting of obligations between or among participants in the settlement arrangement, thereby reducing the number and value of payments or deliveries needed to settle a set of transactions.| RI |
| **Non-Bank** | Payments Institution, Alternative Lender | An entity that is not a chartered bank, but which is providing financial services to end users. The requirements of non-banks to do this, and the limitations of what they can do, are specified by national law| ITU-T |
| **Non-Bank-Led Model** | MNO-Led Model | A reference to a system in which non-banks are the providers of digital financial services to end users. Non-banks typically need to meet criteria established by national law and enforced by regulators.| ITU-T |
| **Non-repudiation** | | Ability to prove the authenticity of a transaction, such as by validating a digital signature.| PDP |
| **Nostro Account** | | From the Payer's perspective: Payer FSP funds/accounts held/hosted at Payee FSP.| PDP |
| **Notification** | | Notice to a payer or payee regarding the status of transfer. |PDP |
| **Off-Us Payments** | Off-Net Payments | Payments made in a multiple-participant system or scheme, where the payer's provider is a different entity as the payee's provider. | ITU-T |
| **On-Us Payments** | On-Net Payments | Payments made in a multiple-participant system or scheme, where the payer's provider is the same entity as the payee's provider. | ITU-T |
| **Open-Loop** | | A payment system or scheme designed for multiple providers to participate in. Payment system rules or national law may restrict participation to certain classes of providers.| ITU-T |
| **Operations Risk Management** | |   Tools to manage providers' risks in operating a DFS system. | ITU-T |
| **Organization** | Business | An entity such as a business, charity or government department that uses mobile money as a service; for example, taking bill payments, making bill payments and disbursing salaries. | PDP |
| **OTP** | One-Time Password | OTP is a credential which by definition can only be used once. It is generated and later validated by the same FSP for automatic approval. The OTP is usually tied to a specific Payer in a Payment. The generated OTP is usually a numeric between 4 and 6 digits. | PDP |
| **Over The Counter Services** | OTC, Mobile to Cash | Services provided by agents when one end party does not have an eMoney account: the (remote) payer may pay the eMoney to the agent's account, who then pays cash to the non- account holding payee. | ITU-T |
| **P2P** | Domestic Remittance, Remote Domestic Transfer of Value| Making and receiving payments to another person in the same country. | ITU-T |
| **Participant** | | A provider who is a member of a payment scheme, and subject to that scheme's rules.| ITU-T |
| **Partner Bank** | | Financial institution supporting the FSP and giving it access to the local banking ecosystem. | PDP |
| **Payee** | Receiver | The recipient of electronic funds in a payment transaction. | ITU-T |
| **Payee FSP** | | Payee's Financial Service Provider. | PDP |
| **Payer** | Sender | The payer of electronic funds in a payment transaction. | ITU-T |
| **Payer FSP** | | Payer's Financial Service Provider. | PDP |
| **Paying for Purchases** | C2B - Consumer to Business | Making payments from a consumer to a business: the business is the "payment acceptor” or merchant. | ITU-T |
| **Payment Device** | ATM (Automated Teller Machine), POS (Point of Sale), Access Point, Point of Sale Device | Payment device is the abstract notion of an electronic device, other than the Payer’s own device, that is capable of letting a Payer accept a transaction through the use of a credential (some kind of OTP). Examples of (Payment) Devices are ATM and POS. | PDP |
| **Payment Instruction** | Payment Instruction | An instruction by a sender to a sender’s payment service provider, transmitted orally, electronically, or in writing, to pay, or to cause another payment service provider to pay, a fixed or determinable amount of money to a payee if: <br>a) The instruction does not state a condition of payment to the payee other than time of payment; and</br> <br>b) The instruction is transmitted by the sender directly to the sender’s payment service provider or to an agent, electronic fund transfers system or communication system for transmittal to the sender’s payment service provider.</br> | PDP |
| **Payment System** | Payment Network, Money Transfer System | ncompasses all payment-related activities, processes, mechanisms, infrastructure, institutions and users in a country or a broader region (for example a common economic area). | ITU-T |
| **Payment System Operator** | Mobile Money Operator, Payment Service Provider | The entity that operates a payment system or scheme. | ITU-T |
| **Peer FSP** | | The counterparty financial service provider. | PDP |
| **PEP** | | Politically Exposed Person. Someone who has been entrusted with a prominent public function. A PEP generally presents a higher risk for potential involvement in bribery and corruption by virtue of their position and the influence that they may hold (for example, ‘senior foreign political figure', 'senior political figure', foreign official', and so on).| PDP |
| **Platform** | Payment Platform, Payment Platform Provider, Mobile Money Platform |A term used to describe the software or service used by a provider, a scheme, or a switch to manage end user accounts and to send and receive payment transactions. | ITU-T |
| **Posting** | Clearing | The act of the provider of entering a debit or credit entry into the end user's account record. | ITU-T |
| **Pre-approval** |Debit Authorization, Mandate |Pre-approval means that a Payer is allowing a specific Payee to withdraw funds without the Payer having to manually accept the payment transaction. The pre-approval can be valid one time, valid during a specific time period or valid until the Payer cancels the pre-approval.| PDP |
| **Prefunding** | | The process of adding funds to Vostro/Nostro accounts. | PDP |
| **Prepaid Cards** | |eMoney product for general purpose use where the record of funds is stored on the payment card (on magnetic stripe or the embedded integrated circuit chip) or a central computer system, and which can be drawn down through specific payment instructions to be issued from the bearer’s payment card. | ITU-T |
| **Processing of Personal/Consumer Data** | Processing of Personal/Consumer Data | Processing of personal/consumer data shall mean any operation or set of operations which is performed upon personal/consumer data, whether or not by automatic means, such as collection, recording, organization, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, blocking, erasure or destruction. | PDP |
| **Processor** | Gateway | An enterprise that manages, on an out-sourced basis, various functions for a digital financial services provider. These functions may include transaction management, customer database management, and risk management. Processors may also do functions on behalf of payments systems, schemes, or switches. | ITU-T |
| **Promotion** | | FSP marketing initiative offering the user a transaction/service fee discount on goods or services. May be implemented through the use of a coupon. | PDP |
| **Pull Payments** | | A payment type which is initiated by the payee: typically, a merchant or payment acceptor, whose provider "pulls" the funds out of the payer's account at the payer's provider. | ITU-T |
| **Push Payments** | |A payment type which is initiated by the payer, who instructs their provider to debit their account and "push" the funds to the receiving payee at the payee's provider. | ITU-T |
| **Quote** | | Quote can be seen as the price for performing a hypothetical financial transaction. Some factors that can affect a Quote are Fees, FX rate, Commission, and Taxes. A Quote is usually guaranteed a short time period, after that the Quote expires and is no longer valid. | PDP |
| **Reconciliation** | | Cross FSP Reconciliation is the process of ensuring that two sets of records, usually the balances of two accounts, are in agreement between FSPs. Reconciliation is used to ensure that the money leaving an account matches the actual money transferred. This is done by making sure the balances match at the end of a particular accounting period. | PDP |
| **Recourse** | | Rights given to an end user by law, private operating rules, or specific agreements by providers, allowing end users the ability to do certain things (sometimes revoking a transaction) in certain circumstances. | ITU-T |
| **Refund** | | A repayment of a sum of money (i.e. repayment, reimbursement or rebate) to a customer returning the goods/services bought. | PDP |
| **Registration** | Enrollment, Agent Registration, User Creation, User On- Boarding | The process of opening a provider account. Separate processes are used for consumers, merchants’ agents, and so on | ITU-T |
| **Regulator** | | A governmental organization given power through national law to set and enforce standards and practices. Central Banks, Finance and Treasury Departments, Telecommunications Regulators, and Consumer Protection Authorities are all regulators involved in digital financial services. | ITU-T |
| **Reserve** | Prepare | Part of a 2-phase transfer operation in which the funds to be transferred are locked (the funds cannot be used for any purpose until either rolled back or committed). This is usually done for a predetermined duration, the expiration of which results in the reservation being rolled back.| PDP |
| **Reversal** | | The process of reversing a completed transfer. | PDP |
| **Risk Management** | Fraud Management | The practices that enterprises do to understand, detect, prevent, and manage various types of risks. Risk management occurs at providers, at payments systems and schemes, at processors, and at many merchants or payments acceptors.| ITU-T |
| **Risk-based Approach** | | A regulatory and/or business management approach that creates different levels of obligation based on the risk of the underlying transaction or customer. | ITU-T |
| **Roll back** | Reject | Roll back means that the electronic funds that were earlier reserved are put back in the original state. The financial transaction is cancelled. The electronic funds are no longer locked for usage.| PDP |
| **Rollback** | | The process of reversing a transaction - restoring the system (i.e. account balances affected by the transaction) to a previously defined state, typically to recover from an error and via an administrator-level user action. | PDP |
| **Rules** | | The private operating rules of a payments scheme, which bind the direct participants (either providers, in an open-loop system, or end users, in a closed-loop system). | ITU-T |
| **Saving and Investing** | | Keeping funds for future needs and financial return. | ITU-T |
| **Savings Products** | | An account at either a bank or non-bank provider, which stores funds with the design of helping end users save money. | ITU-T |
| **Scheme** | | A set of rules, practices and standards necessary for the functioning of payment services. | ITU-T |
| **Secure Element** | | A secure chip on a phone that can be used to store payment data. | ITU-T |
| **Security Access Code** | Security Access Code | A personal identification number (PIN), password/one-time password (OTP), biometric recognition, code or any other device providing a means of certified access to a customer’s account for the purposes of, among other things, initiating an electronic fund transfer. | PDP |
| **Security Level** | | Security specification of the system which defines effectiveness of risk protection. | ITU-T |
| **Sensitive Consumer Data** | Sensitive Consumer Data |Consumer Sensitive Data means any or all information that is used by a consumer to authenticate identity and gain authorization for performing mobile banking services, including but not limited to User ID, Password, Mobile PIN, Transaction PIN. Also includes data relating to religious or other beliefs, sexual orientation, health, race, ethnicity, political views, trades union membership, criminal record. | PDP |
| **Settlement** | Real Time Gross Settlement (RTGS) | An act that discharges obligations in respect of funds or securities transfers between two or more parties. | RI |
| **Settlement Instruction** | | Means an instruction given to a settlement system by a settlement system participant or by a payment clearing house system operator on behalf of a Central Bank settlement system participant to effect settlement of one or more payment obligations, or to discharge any other obligation of one system participant to another system participant.| PDP |
| **Settlement Obligation** | | Means an indebtedness that is owed by one settlement system participant to another as a result of one or more settlement instructions. | PDP |
| **Settlement System** | Net Settlement, Gross Settlement, RTGS | A system used to facilitate the settlement of transfers of funds, assets or financial instruments. Net settlement system: a funds or securities transfer system which settles net settlement positions during one or more discrete periods, usually at pre-specified times in the course of the business day. Gross settlement system: a transfer system in which transfer orders are settled one by one. | ITU-T |
| **Short Message Service** | | A service for sending short messages between mobile phones. | ITU-T |
| **SIM Card** | SIM ToolKit, Thin SIM | A smart card inside a cellular phone, carrying an identification number unique to the owner, storing personal data, and preventing operation if removed. A SIM Tool Kit is a standard of the GSM system which enables various value-added services. A "Thin SIM" is an additional SIM card put in a mobile phone. | ITU-T |
| **Smart Phone** | | A device that combines a mobile phone with a computer. | ITU-T |
| **Standards Body** | EMV, ISO, ITU, ANSI, GSMA | An organization that creates standards used by providers, payments schemes, and payments systems. | ITU-T |
| **Stored Value Account** | SVA | Account in which funds are kept in a secure, electronic format. May be a bank account or an eMoney account. | PDP |
| **Storing Funds** | Account, Wallet, Cash-In, Deposit | Converting cash into electronic money and keeping funds in secure electronic format. May be a bank account or an eMoney account. | PDP |
| **Super-Agent** | Master Agent | In some countries, agents are managed by Super Agents or Master Agents who are responsible for the actions of their agents to the provider. | ITU-T |
| **Supplier Payment** | B2B - Business to Business, B2G - Business to Government | Making a payment from one business to another for supplies, and so on: may be in-person or remote, domestic or cross border. Includes cross- border trade. | ITU-T |
| **Suspicious Transaction Report** | Suspicious Transaction Report | If a financial institution notes something suspicious about a transaction or activity, it may file a report with the Financial Intelligence Unit that will analyze it and cross check it with other information. The information on an STR varies by jurisdiction. | PDP |
| **Systemic Risk** | | In payments systems, the risk of collapse of an entire financial system or entire market, as opposed to risk associated with any one individual provider or end user. | ITU-T |
| **Tax Payment** | C2G, B2G |Making a payment from a consumer to a government, for taxes, fees, and so on | ITU-T |
| **Tokenization** | | The use of substitute a token ("dummy numbers") in lieu of "real" numbers, to protect against the theft and misuse of the "real" numbers. Requires a capability to map the token to the "real" number. | ITU-T |
| **Trading** | International Trade | The exchange of capital, goods, and services across international borders or territories. | ITU-T |
| **Transaction Accounts** | | Transaction account: broadly defined as an account held with a bank or other authorized and/or regulated service provider (including a non- bank) which can be used to make and receive payments. Transaction accounts can be further differentiated into deposit transaction accounts and eMoney accounts. Deposit transaction account: deposit account held with banks and other authorized deposit-taking financial institutions that can be used for making and receiving payments. Such accounts are known in some countries as current accounts, chequing accounts or other similar terms. | ITU-T |
| **Transaction Cost** | | The cost to a DFS provider of delivering a digital financial service. This could be for a bundle of services (for example, a "wallet") or for individual transactions. | ITU-T |
| **Transaction Request** | Payment Request | Transaction Request is a request sent by a Payee, meant for a Payer to transfer electronic funds to the Payee. The Transaction Request usually requires manual approval by the Payer to perform the financial transaction, but the Payee can also be pre-approved or a credential (usually OTP) can be sent as part of the transaction request for automatic validation and approval. | PDP |
| **Transfer** | | Generic term to describe any financial transaction where value is transferred from one account to another. | PDP |
| **Transfer Funds** | Sending or Receiving Funds | Making and receiving payments to another person. | ITU-T |
| **Transport Layer Security** | TLS, client authentication, mutual authentication | Transport Layer Security (TLS) is a cryptographic protocol that provides communications security over a computer network, used to secure point to point communication (Source: Wikipedia). | |
| **Trust Account** | Escrow, Funds Isolation, Funds Safeguarding, Custodian Account, Trust Account | A means of holding funds for the benefit of another party. eMoney Issuers are usually required by law to hold the value of end users' eMoney accounts at a bank, typically in a Trust Account. This accomplishes the goals of funds isolation and funds safeguarding. | ITU-T |
| **Trusted Execution Environment** | | A development execution environment that has security capabilities and meets certain security-related requirements. | ITU-T |
| **Ubiquity** | | The ability of a payer to reach any (or most) payees in their country, regardless of the provider affiliation of the receiving payee. Requires some type of interoperability. | ITU-T |
| **Unbanked** | Underbanked, Underserved| Unbanked people do not have a transaction account. Underbanked people may have a transaction account but do not actively use it. Underserved is a broad term referring to people who are the targets of financial inclusion initiatives. It is also sometimes used to refer to a person who has a transaction account but does not have additional DFS services. | ITU-T |
| **User ID** | | A unique identifier of a user. This may be an MSISDN, bank account, some form of DFSP-provided ID, national ID, and so on. In a transaction, money is generally addressed to a user ID and not directly to an account ID. | PDP |
| **USSD** | | A communication technology that is used to send text between a mobile phone and an application program in the network. | ITU-T |
| **Vostro Account** | | From the Payee's perspective: Payer FSP funds/accounts held/hosted at Payee FSP. | PDP |
| **Voucher** | | A monetary value instrument commonly used to transfer funds to customers (Payees) who do not have an account at the Payer's FSP. This could be Payees with no account or account at another FSP. | ITU-T |
| **Wallet** | eWallet | Repository of funds for an account. Relationship of Wallet to Account can be many to one. | PDP |
| **Whitelist** | | A list or register of entities (registered users) that are being provided a particular privilege, service, mobility, access or recognition, especially those that were initially blacklisted. Entities on the list will be accepted, approved and/or recognized. Whitelisting is the reverse of blacklisting, the practice of identifying entities that are denied, unrecognized, or ostracized. Where entities are registered users (or user accounts, if granularity allows) and services are informational (for example, balance check), transactional (for example, debit/credit) payments services or lifecycle (for example, registration, closure) services. | PDP |
| **'x'-initiated** | | Used when referring to the side that initiated a transaction; for example, agent-initiated cash-out vs. user-initiated cash-out. | PDP |
