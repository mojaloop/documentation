# Scheme Key Choices

- Version: 5.0 
    - Author: Carol Coye Benson (Glenbrook)
    - Date: October 2019
    - Description: 

---

## **About the Mojaloop Community Business Document Project**

This document is part of the Mojaloop Community Business Document Project. The project is intended to support entities (countries, regions, associations of providers or commercial enterprises) implementing new payments systems using Mojaloop code. These entities will also need write Business Rules that participants in the system will follow.

The Mojaloop Community Business Document Project provides templates for Business Rules and related documents. There are many choices involved in implementing a new payment system: the templates show some of the choices and, where appropriate, commentary is provided on how the particular choice is related to the goals of a Level One aligned system.

The following documents are part of the project:

- Scheme Key Choices

- Scheme Participation Agreement Template

- Scheme Business Rules Template

- Platform Operating Guideline Template

- Exception Management Operating Guideline Template

- Uniform Glossary

## **Introduction**

Payments Schemes around the world are in the process of implementing, or considering implementation, of Mojaloop-based payments systems. Mojaloop is open-source software for financial services companies, government regulators, and others taking on the challenges of interoperability and financial inclusion. Mojaloop is based on the specification "Open API for FSP Interoperability Specification", which was developed to provide an open API specification for mobile money interoperability.

The Bill & Melinda Gates Foundation has provided funding and support for Mojaloop. Mojaloop is open source reference code which demonstrates the principles of the Level One Project, a vision for digital financial markets based on principles of interoperability, collaboration, and inclusion.

Schemes implementing Mojaloop will need to make a number of business choices about the design of the system. These choices, when made, will affect both the technical implementation of Mojaloop and the Business Rules which the Scheme will write, and which Participant DFSPs will agree to follow. This document describes and discusses some of the most significant of these choices. Where appropriate, recommendations for best practices are made to align with the Level One Project (L1P) Design Principles.

Although this document is written as a contribution to the Mojaloop community, the issues described here are pertinent to any Level One aligned payments system, regardless of the technical implementation chosen.

## **Choices Described in this Document**

[1 - Choice: Ownership of Scheme](#_1-choice-ownership-of-scheme)

[2 - Choice: Participation in the Scheme](#_2-choice-participation-in-the-scheme)

[3 - Choice: Relationship of Scheme to Platform](#_3-choice-relationship-of-scheme-to-platform)

[4 - Choice: Scope of Scheme Rules and Scheme Rules Authority](#_4-choice-scope-of-scheme-rules-and-scheme-rules-authority)

[5 - Choice: Use Cases](#_5-choice-use-cases)

[6 - Choice: QR Codes](#_6-choice-qr-codes)

[7 - Choice: Payments Addressing](#_7-choice-payments-addressing)

[8 - Choice: Interparticipant Settlement](#_8-choice-interparticipant-settlement)

[9 - Choice: Tiered Access](#_9-choice-tiered-access)

[10 - Choice: Scheme Fees and End User Pricing](#_10-choice-scheme-fees-and-end-user-pricing)

[11 - Choice: Brand Management](#_11-choice-brand-management)

[12 - Choice: Scheme Connections to Other Schemes](#_12-choice-scheme-connections-to-other-schemes)

[13 - Choice: Scheme Use by Other FSPs](#_13-choice-scheme-use-by-other-fsps)

[14 - Choice: Scheme Risk Management Standards](#_14-choice-scheme-risk-management-standards)

[15 - Choice: Exception Management](#_15-choice-exception-management)

## 1. Choice: Ownership of Scheme

The Scheme is the entity that writes the rules for the payment system. As such, the scheme controls multiple aspects of the delivery of scheme services, including how the technical and operational platform will be delivered to participating DFSPs. Common models in for Scheme ownership in the payments industry include:

- An association of participating DFSPs, with or without partial ownership by the Central bank

- A Central Bank or other government entity

- A commercial entity

The association model maximizes DFSP control of the Scheme and may encourage DFSPs to join and use the scheme. A government or central-bank controlled scheme may make regulatory supervision of DFSPs more effective and may make decision-making simpler: a government body may be willing to make infrastructure decisions that are for the good for the ecosystem as a whole, rather than optimizing individual DFSP benefits. A commercial entity may be faster to implement a new system and may be more effective in some situations in creating a sustainable operating model.

### 1.1 Level One Alignment — Scheme Ownership

Any of these ownership structures can deliver on the goals of L1P and financial inclusion. The Level One Design Principles suggest "self-governance by DFSPs" (the first model) as a preferred design, based on a belief that participation in governance can increase DFSP commitment to the scheme. Other designs can work, however, as long as the Scheme and its members have some form of participatory governance and operate with transparency and open communications.

The most important Level One principle is that the Scheme itself should operate on a "not for loss" (sustainable cost recovery) model. The latter is particularly important in order to deliver on the L1P goal of creating an ultra-low-cost payment system. This principle is predicated on the idea that DFSPs may, of course, operate on a for-profit basis in delivering payment services. The source of their revenues, however, may be primarily from \"[adjacencies](https://docs.gatesfoundation.org/documents/fighting%20poverty%20profitably%20full%20report.pdf)\" rather than fees related to the payment transaction itself. Note that the operating platform may be provided by a commercial entity, even if the Scheme itself is operated on a "not for loss" basis. This is discussed further below in "Choice: Relationship of Scheme to Platform".

Many legacy bank payments systems worldwide operate on the association model. ACH systems and domestic debit card systems (such as the U.S. ACH and Canada's Interac system) use this model and deliver ultra-low processing costs to participating DFSPs. Some new mobile payments systems, such as India's UPI system and Peru's BIM system also use this model.

Several countries provide services through the Central Bank: Mexico's SPEI model is notable here. Jordan's JoMoPay system started as a Central Bank system and has moved to the association model.

The global card networks, notably Visa and MasterCard, started as association models and have moved to a commercial model. Many FinTechs, such as PayPal or WeChat Payments, operate closed-loop systems on a commercial model.

## 2. Choice: Participation in the Scheme

Mojaloop and L1P use the term "DFSP" (Digital Financial Services Provider) to mean any entity within the jurisdiction in which the payment system operates that is licensed in some manner to provide end-user transaction accounts which hold funds, and which can be used to make and receive payments. This definition includes bank, other depository financial institutions, and eMoney issuers (sometimes referred to as Mobile Money Operators).

There are myriad other ecosystem participants who do not hold end-user transaction accounts: these include processors, aggregators, and some types of payments services providers. The relationship of these entities to the scheme and to DFSPs is discussed in [Choice: Scheme Use by Other FSPs](#_13-choice-scheme-use-by-other-fsps).

The question of participation is twofold: first, which categories of DFSPs are supported by the Scheme, and secondly, what is the process by which DFSPs are allowed to participate. The term "open loop" is used to refer to a structure in which multiple DFSPs join and use the scheme to exchange transactions (interoperate). But an "open loop" scheme can either be one in which any DFSP in a supported category is eligible to join the scheme, or one in which participation is limited, and managed by invitation. An applicant DFSP may face certain eligibility criteria (size, financial health, etc.) before being admitted to the Scheme.

The term "closed loop" is most often used to refer to a scheme which is not interoperable; in which the scheme entity has direct relationships with all end customers

L1P is strongly in favor of open loop systems. Furthermore, L1P advocates for all licensed providers of transaction accounts to be eligible: in other words, both bank and eMoney Issuer categories should be included, and allowed to interoperate through the Scheme platform.

There are a number of arguments which support this recommendation. The very concept of "financial inclusion" implies including previously excluded populations into the financial ecosystem of the country. In many countries, eMoney issuance or other structures have been approved by regulators to provide transaction accounts to populations that have not been able to be served economically by traditional banks. These eMoney issuers have frequently created closed-loop mobile wallets, and one of the goals of L1P and Mojaloop is to enable interoperability of these wallets. However, wallet holders need to pay not just other wallet holders, but merchants and other banked institutions, and banked individuals. Banked individuals and institutions also make payments to wallet holders. It makes sense that the same interoperable payment system should support both for efficiency reasons (why have multiple systems when a single system can connect all players?) and for economic reasons.

The economic argument revolves around the nature of transactional processing systems: the more volume, the lower the unit cost. This principle is also supported in the [World Bank/CPMI PAFI Report](http://www.worldbank.org/en/topic/financialinclusion/brief/pafi-task-force-and-report): \"the framework promotes innovation and competition by not hindering the entry of new types of PSP\.... Increased interoperability of and access to infrastructures supporting the switching, processing, clearing and settlement of payment instruments of the same kind are promoted\... payment infrastructures, including those operated by central banks, have objective, risk-based participation requirements that permit fair and open access to their services.\" A related and important point is that Scheme rules should specify that an individual Participant cannot discriminate against any other individual Participant: unless constrained by other factors (regulatory account limits, etc.), Participants must receive transactions sent by other Participants in the Scheme. This ensures full interoperability.

The second question is what eligibility criteria a potential DFSP must meet in order to actually join the scheme. Many payments schemes have fairly elaborate procedures to ensure that applicant DFSPs have the financial resources to comply with rules, and the technical wherewithal to meet the operational requirements of the rules.

Some form of these requirements is necessary for any scheme. But modern technology and, in particular, pre-funded settlement models greatly reduce the risks to the scheme in dealing with smaller DFSPs. The Level One alignment issue here is to ensure that the scheme is not inadvertently discriminating against smaller DFSPs and in favor of large ones. The goal should be to ensure the minimum necessary qualifications to support the obligations that a DFSP applicant is undertaking.

## 3. Choice: Relationship of Scheme to Platform

Our definitions separate the concept of a scheme (the entity that rights the rules for a payment system) and a platform (the set of services that physically enable interoperability). Most often, but not necessarily, the platform operates as a switch which routes transactions from one DFSP to another: the alternative is bilateral physical connections among DFSPs.

What is the relationship between the scheme and the platform? There are multiple models demonstrated in payments systems globally:

1. Same entity: the scheme operates the platform. This is seen frequently in commercial systems (e.g. Visa) and also in Central Bank provided systems (e.g. Bank of Mexico SPEI)

2. The scheme hires the platform: the switch and related services are operated by a separate entity, under contract to the scheme entity. The scheme pays the platform entity; this cost is recouped in fees from the scheme to its participating DFSPs. The U.K. Faster Payments system operates on this model (Faster Payments Scheme Ltd. hires Vocalink to operate the platform).

3. The scheme sets for the parameters by which operator(s) manage transactions governed by the rules: if there are multiple operators, those entities must interoperate, again as specified in Scheme rules. Individual DFSPs choose the operator they wish to use to access the system. The U.S. ACH system works in this manner, as do several of the SEPA payments systems in Europe.

4. No switch: this is really a variation of the model 3 above. Each DFSP independently and physically connects to each other DFSP, again within constraints set by the scheme rules. Debit cards in Australia work this way.

### 3.1 L1P Alignment: Relationship of Scheme to Platform

There is no single Level One Principle that argues in favor of one of these models vs. the other. Factors for consideration include:

- The goal is that all of the ecosystem players (Scheme, Platform, DFSPs, etc.) encourage L1P-compliant behavior. A more controlled model (models 1 or 2) arguably makes this easier.

- Having a low-cost system is a core tenet. However, it is debatable whether this is better achieved through Model 1 or Model 2. Models 3 and 4 bear the risk of excluding or disadvantaging smaller DFSPs or new system entrants.

- In Models 2 and 3, the platform providers will have their own operating guidelines. There may be situations in which provisions of Scheme rules are not adequately reflected or implemented by the Platform. This is an issue of power and control. Model 1 avoids this problem but could create a \"vendor lock-in\" type of problem, where DFSPs have no choice but to pay the costs of the Scheme-controlled platform.

## 4. Choice: Scope of Scheme Rules and Scheme Rules Authority

### 4.1 Scope

Scheme rules vary widely in scope from scheme to scheme. All cover the essential elements of scheme participation, party obligations, and the mechanics of interoperability. But many schemes go much further in terms of defining how DFSPs make payments services available to their customers, and under which terms. Two areas here are worthy of note: 

- Some schemes specify elements of the end-user experience. Examples of this include the card networks specifying card physical parameters and design requirements. Some systems (for example, Peru\'s BIM) specify how the mobile phone interface appears to a consumer. Other systems (for example, India\'s UPI) go so far as to provide the SKD\'s and API\'s that define what the end-user app can functionally do. Some systems may require that a DFSP receiving a credit-push transaction must post it to a customer\'s account within a specified amount of time 
- Some schemes also specify elaborate liability provisions on interoperable transactions. These provisions may vary according to use case and particular attributes of a transaction. For example, in the card networks, liability may pass from the card issuer to the merchant acquirer if the merchant terminal does not meet certain specifications.

### 4.2 Rules Authority

As described above, the scheme is the entity that writes the rules for the payment system. But who approves these rules? There are two primary models in the market place:

- DFSP Authority. In this model, all (or some) rules changes are voted on by participating DFSPs. The voting may be determined on a per-seat basis, or it may be determined on a volume-weighted basis. Many schemes have experimented with variations on this.

- Scheme Authority with DFSP Participation. In this model, rules authority rests with the scheme entity, but some degree of formal or informal participation by DFSPs is included: this can either be formal (standing committees that meet to consider rule changes, rules amendment commentary periods specified in the rules, etc.) or informal (scheme representatives meet and/or request written feedback on proposed rules changes).

### 4.3 L1P Alignment — Rules Scope and Authority

There are two relevant Level One principles: one is for participatory governance, and the other is the mandate to deliver a low-cost system. Level One also recognizes the importance of a system that is convenient and easy for end-user customers to use, particularly poor consumers and merchants. Considerations therefore include:

- Rules can create costs: the more elaborate the rules are specifying how DFSPs must deliver services to the customer, the higher the costs of complying with these rules will be.

- Offsetting this is the value of having a common consumer experience - there is considerable evidence that having a common experience can help consumers self-educate in the use of services. Arguably, this is an important factor in scaling the system. But the further a scheme goes in writing rules that effect end-user experience, the more important it is that participating DFSPs have some voice in these rules.

- Scheme experience has shown that explicit voting rules, although they sound good to DFSPs, often result in very long decision practices: this is one reason why some schemes use the second above, and use participating DFSPs as sounding boards, but do not grant rules authority.

## 5. Choice: Use Cases

One of the most important choices a scheme has to make is which use cases to support. Frequently, a real-time credit-push retail scheme starts with person to person (P2P) payments as the first use case: often, a scheme will indicate to the market that it intends to support other use cases in the future. As schemes evolve there are significant "sub use cases" to consider: in some Mojaloop implementations, the term "secondary use case" is used for this: as an example, if P2P is the use case, cross-border P2P might be a secondary use case; wallet-to-wallet and wallet-to-bank account might be secondary use cases.

Business rules may vary by use case and/or secondary use case. This may include operational details (data fields used, etc.), scheme pricing (in particular, interchange) and even liability provisions.

The Open API document used by the Mojaloop code includes the following list of use cases:

- P2P Transfer
- Agent-Initiated Cash In
- Agent-Initiated Cash Out
- Agent-Initiated Cash Out Authorized on POS
- Customer-Initiated Cash Out
- Merchant-Initiated Merchant Payment
- Merchant-Initiated Merchant Payment Authorized on POS
- ATM-Initiated Cash Out
- Refund

An implementing scheme will choose its own primary and secondary use cases, and the definitions of these will be in the Business Rules. Schemes should consider the following:

- Eventual scheme-to-scheme interoperability will be easier (especially from one Mojaloop-implemented scheme to another) if the same primary use cases and definitions are used

- Schemes may need to differentiate between a DFSP's ability to initiate transactions in a specific use case or secondary use case, and requirements that a DFSP needs to be able to support receiving transactions in a specific use case or secondary use case

- Any rules that are written specific to a use case or secondary use case need to be systemically detectable (by labelling or inference) if the rule will be automatically applied: this is particularly important for business-case-specific interchange fees. How this is done should be part of the business documentation, in the Operating Guidelines.

### 5.1 L1P Alignment — Use Cases

There are two considerations here. One significant issue is the relationship between high volumes in a payment system and the ability to deliver ultra-low-cost processing fees to participating DFSPs. Almost all retail payments systems support multiple use cases, including those which started with a single use case. The card networks are an excellent example of this: started to support point of sale purchases, they now support online purchases, bill payment, salary payments, and B2B payments. Payment processing is a scale business: the more volume, the lower the unit costs can be. Level One strongly supports a payment system being used for multiple use cases: ideally, all retail (e.g. excluding large value B2B) use cases in a country.

The other consideration is making the payment system easy for end-users to access and understand. The same system, with similar user interfaces, etc. for use cases will be easier for end-users (particularly poor or uneducated users) to use.

## 6 Choice: QR Codes

QR codes are emerging as a major enabler of merchant payments in developing countries. Both payment schemes and national payment authorities are deciding on formats, protocols, and scope for QR codes. Some of the decisions include:

- Is the QR code presented by the merchant, and scanned by the consumer, or presented by the consumer and scanned by the merchant? Level One has a preference for merchant-presented QR codes, implemented in conjunction with push, not pull payments. A merchant-presented QR code can be combined with a till number to enable consumers with feature phones to easily pay the same merchant.

- Is the QR code static (the same for all purchases), or is it dynamic? Rather than a choice, this is being seen as an evolution: most markets are starting with static QR codes, but have plans to move to dynamic codes. Dynamic codes function like a "request to pay" payment message in a push payment system, and can contain purchase-specific data.

- Does the national approach to QR codes use a "shared QR code" approach, in which a single QR code can represent a merchant's payments credentials across multiple schemes? The most common way in which this approach is implemented is through the use of EMVCo QR code standards. An alternative is a single QR code approach, in which a QR code is used only to access either an interoperable payment scheme (for example, Mexico's CoDi system) or a closed-loop system (for example, China's WeChat Payments). A single QR code approach may create low-cost advantages by driving volume through a single national platform, while a cross-scheme approach may enable competition among multiple schemes.

- If a shared QR code approach is used, is there a single national entity that controls which schemes a given merchant accepts? If so, who runs this "repository" function and what are its functions? Does it actually issue the QR code data string? If yes, does it sign the string and validate it? There is some speculation that a QR code repository could serve as a point of cross-payments system oversight and management of fraud. It could also tie into a national business registration scheme in some way. It is interesting to consider that a cross-scheme QR code repository might require its own business rules, which would become "meta rules" which would exist above the business rules of the individual schemes.

- Does the QR code data string (the "payload") contain the merchant's "payment address", or does it point in some way to a place where this is stored? The latter approach provides more flexibility and supports a merchant's ability to change providers.

- How is the consumer (and the merchant) protected from QR code fraud?

- What are the economics of the transaction to the merchant? Level One has a strong preference for zero, or near-zero pricing to the small or poor merchant.

## 7. Choice: Payments Addressing

Any scheme implementing credit-push payments needs to specify how the payer and their Payer DFSP addresses the payment. The address needs in some way to be resolved into the payee's account number at the DFSP who provides their transaction account. The scheme needs to decide:

- What types of payments addresses (sometimes called "identifiers") are used. Some payments addresses are institutional ID's and account numbers: a bank routing number and bank account number are an example of this. Other payments addresses may be account numbers without the institutional ID: a mobile phone number used to direct funds to an eMoney wallet provided by an MNO is an example of this. All other types of payments addresses are aliases of some sort. An alias may be an email address, a scheme-assigned merchant ID, a national identity number, or a mobile phone number used to direct funds to account other than that provided by an MNO eMoney issuer. An scheme-supported alias may also be a phrase: "payadamnu123".

- For each type of payment address supported by the scheme, the scheme needs to determine how that payment address is resolved. At a minimum, the scheme needs to support a mechanism by which the address is mapped to a DFSP scheme participant responsible for the transaction account associated with that payment address. Resolution can be done in a number of different ways:

    - The scheme can maintain a directory mapping addressing to responsible DFSP ID's: this requires some type of DFSP registration process for addresses.

    - The scheme can maintain a directory which maps the address to the responsible DFSP and also specifies the account number: this requires a slightly different registration process.

    - Either of these types of directories can be maintained by a third party: scheme rules would establish how these directories are populated, maintained and used, and what the responsibilities of the various parties are.

    - A scheme may also use a broadcast method to determine the DFSP responsible for a given payment address ("do you claim this address"), but needs to develop a protocol to manage conflicts if more than one DFSP "claims" the address.

- It is important to note that the resolution method can different for each type of supported payment address. Some supported payment address types may also be accompanied by particular data sets: for example, when a payment is being made in payment of an invoice, the payment address may be some type of alias, and that use of that alias may be tied to accompanying invoice data. Dynamic QR codes, as an example, will create a "request to pay" that may contain the scheme-supported merchant ID (an alias) and accompanying transaction data detail.

The Open API specification and the Mojaloop reference code support a wide range of different address types: mobile number, bank account, national ID, aliases ("Quickshop\@abc"), etc.

### 7.1 L1P Alignment — Payments Addressing 

Secure, easy payment addressing relates to two important concepts in Level One: convenience for the end-user and "openness". The latter is particularly important to enable competition and rapid scaling of a payment system. As schemes (Level One and otherwise) worldwide struggle to determine how to best solve the question of payments addressing, a few best practices appear to be emerging:

- Although the use of the mobile number, in particular, as an address has an obvious appeal, there appears to be a trend to use aliases — identifiers with no additional meaning. This is demonstrated in India with the UPI system and in Australia's new real-time system, where the identifier is referred to as the PAYID.

- Identifier portability is desirable, both from the perspective of user convenience and as a mechanism to avoid "DFSP lock-in".

- As mentioned above, the directory needs to ensure uniqueness of the payment address within the payment system: any given address can only map to a single DFSP. However, a single DFSP transaction account can have multiple payment addresses which route to it. DFSPs have the opportunity to create value-added services for their customers, in which they differentiate the treatment of transactions routed to them via different payment addresses (subject, of course, to overall scheme business rules).

## 8. Choice: Interparticipant Settlement

Payment schemes need to determine how participant DFSPs will settle their financial obligations to each other arising from interoperable transactions. There are multiple decisions to be made on the settlement model. Existing settlement models used in legacy retail payment systems have important controls over risks. As a general statement, schemes to today have opportunities to make choices leveraging modern technology and connectivity to manage these risks in different ways. Some of the choices are:

- Net, gross, or continuous gross settlement. Traditionally, net settlement has been used for retail payments systems (practically speaking, all systems except RTGS). Some real-time retail payment systems are now using gross settlement (Mexico's SPEI) or are planning to (Brazil). Some systems are using a continuous gross settlement account (U.S. RTP): in this approach, DFSPs jointly own a single account at the Settlement Bank, and ownership shares in the pooled account are determined, at any point in time, by the DFSPs ledger position at the platform. This approach uses no settlement entries, netting, or settlement entry posting.

- Choice of settlement bank. Most interoperable retail payment systems use the country's central bank as the settlement bank, but there are examples (card network settlement in the U.S.) where a commercial bank is used as the settlement bank.

- Dedicated or multi-purpose settlement accounts. Are the DFSP's settlement accounts, held at the settlement bank, dedicated to the purpose of scheme settlement, or are they used for other purposes (other scheme settlements, reserve balances, etc.) as well? In a continuous gross settlement model, the pooled account is always a dedicated account.

- Same day or deferred settlement. In a net settlement model, are settlement entries posted to settlement bank accounts on the day of the transaction, or later?

- Multiple or single settlement windows. In a net settlement model, is there a single settlement window per business day, or are there multiple? If multiple, are the windows defined by time periods, volume of transactions, or some other factor?

- Prefunded or not. Are settlement entries (in a net system) or individual transactions (in a gross system) allowed to occur if there is not sufficient funding in the settlement bank account? If so, what mechanisms (lines of credit, collateral accounts, etc.) are used to support this risk? The term "prefunded" is used when scheme rules specify that the DFSP must have enough money in their settlement account to cover an outbound transaction: if not, the platform will refuse the transaction.

- Dynamic position management or not. In a net settlement system which uses a switch, does the switch "know" the actual position of the sending DFSP before sending the transaction on to the receiving DFSP?

- Automated or manual net debit cap calculation. The net debit cap is an amount that the system uses, in conjunction with dynamic position management, to determine whether or not an individual transaction is sent to the receiving DFSP. This can either be manually set by the scheme (individually for each DFSP) or automated: the latter requires a real-time connection between the (dedicated) settlement bank account and the switch.

- Discretionary components of the net debit camp may be defined by the scheme. There are two types of these. A scheme discretionary component may add to, or subtract from, an individual DFSP's net debit cap. An addition can be used to create a safety margin; a subtraction can be used to extend overdraft capabilities to the DFSP. In the latter case, responsibility for the overdraft needs to be clearly agreed upon between the scheme and the settlement bank.

### 8.1 L1P Alignment — Interparticipant Settlement

Level One has a clear principle calling for same day settlement. Other than that, the most important considerations are how a given scheme will manage risk and costs for DFPS — liquidity costs in particular. This is a rapidly evolving area in payment systems, and it is expected that different schemes will make different choices. In general, it can be observed that automation supports scale, and that prefunding and multiple windows support low risk and low cost.

The Mojaloop reference code supports a variety of different settlement mechanisms.

## 9. Choice: Tiered Access

Legacy retail payment systems (and wholesale systems) generally support tiered access — the ability of smaller institutions to access the system through correspondent relationships with larger institutions. This has been considered necessary as smaller institutions frequently had difficulty in meeting either the settlement obligations of full participation or the technical (particularly security) obligations of full participation.

In countries with eMoney Issuance licenses (or with other non-bank or non-traditional DFSPs, or transaction account providers) the question becomes whether or not these non-traditional providers access the system directly or through a relationship with a traditional bank: in these cases, it is generally the settlement, and not the technical, issue in question.

### 9.1 L1P Alignment — Tiered Access

There is no single Level One principle which would direct a scheme on how to handle this issue. There are, however, both cost and risk issues to consider:

- It should be noted that larger institutions have created very profitable businesses in serving these smaller institutions. These costs, born by the indirect participants, will in some way be passed on to end-users. Because of this, Level One schemes may want to avoid this model where possible.

- The Level One principle of "Open Loop" suggests that a scheme should support the ability of all DFSPs to participate directly wherever possible: modern technology, such as that used by Mojaloop, and prefunded settlement models should make this simpler.

- Legacy systems also tend to "hide" the activity of the smaller institution from the scheme or the hub. This may be undesirable from a regulatory or risk management point of view. Some new retail real-time payment systems (notably the U.S. RTP Network) are allowing both technical and settlement indirect access with full transparency of the smaller institution to the scheme and platform.

- Another factor to consider is particular to countries with eMoney Issuance or other non-traditional DFSP providers. Under the L1P principle of DFSP involvement in governance decisions, it may be that asking eMoney Issuers to access a system "under" a bank participant may leave these DFSPs in a "second tier" position with respect to governance: this is arguably undesirable, and particularly in cases, which appear relevant in some countries, where the eMoney Issuers have a higher transaction volume than do their sponsoring banks.

Note this section does not discuss access to the system by other FSPs: that is addressed in [Choice: Scheme Use by Other FSPs](#_13-choice-scheme-use-by-other-fsps).

## 10. Choice: Scheme Fees and End User Pricing

Fees associated with an interoperable payment scheme can be categorized as:

-   End-User Fees: the fees (or minimum balance requirements, etc.) assessed by a DFSP to their end-user customer. This includes fees charged to consumers, merchants, billers, governments or other enterprises. Some of these fees are specifically attached to the interoperable transfer itself (e.g. a "send transfer" fee, or a "merchant discount fee"); others are related (a "cash-out" fee, an ATM withdrawal fee). These fees are typically set by the DFSP. In some countries and situations, regulation or scheme rule agreements may apply to or influence the fees. Fees may either be fixed amounts; fixed amounts; percent-of-value amounts, or a combination of fixed and percent of value. In either case, fee schedules can differ based on which value-bands (for example, transactions lower than value "X" have this fee) or end-user transaction volume.

- Processing Fees: the fee that the Scheme, and the Operator of the Platform (if different) charge to the DFSPs for use of the scheme and platform. As with end-user fees, processing fees can be fixed or variable and may also vary by value-band or transaction volume.

- Interchange Fees: fees that one DFSP pays to another DFSP related to an interoperable transaction. Interchange Fees are normally set by the Scheme (in the Scheme Rules) and are physically tabulated and collected by the Scheme. The scheme and the operator of the Platform do not pay or receive these fees: they are a debit to one DFSP and a credit to the other. Both the rate of interchange fees and direction (does the Payer DFSP pay or receive?) may vary by use case and secondary use case. Interchange fees may be fixed, a percent of value, or a combination of the two.

In addition to setting fee policies, schemes will need to decide on how fees are collected and (in the case of interchange fees) disbursed. There is an important consideration with interchange: should the fees be collected and disbursed as a part of the settlement of each transaction, or as an end-of-period (such as monthly) billing process?

### 10.1 L1P Alignment: Fees

One of the most important Level One concepts is to have an ultra-low-cost platform, with consumer and small merchant fees being as low as possible. An important element in achieving this for a payment system is reaching scale. Schemes will want to consider both of these factors as they set fee policies. Considerations include:

- **End-user pricing.** Is the scheme in a position to put any controls or limitations on this? The answer will vary by jurisdiction. Some schemes have put limitations on the structure of fees (e.g. must be flat vs. percent of value), which parties can be charged (e.g. payers can be charged but not payees, etc.) or on what overall fees can be. Some schemes have not written this into rules but have encouraged informal agreement on fee policies (subject to regulatory approvals) to incent consumer usage. Other schemes have prohibited certain types of fee actions, such as charging surcharges for interoperable transactions.

- **Processing Fees.** The goal here is for the scheme fees to DFSPs to be as low as possible (specifically and ideally, a fraction of a U.S. cent.). Best market practices are for these fees to be fixed, rather than percent-of-value: this makes sense given that the scheme and the platform are not taking value risk in processing the transactions. However, there is a challenge with purely fixed fees: how to avoid having fees that are too high for very low-value transactions. Some schemes are addressing this through value bands, with lower fixed charges for transactions under a certain value. Some schemes are establishing volume tiers to incent DFSPs. Schemes may wish to encourage (or even mandate) that DFSPs route "on-us" transactions (where payer and payee DFSP are the same institution) through the platform: if this is the case, the scheme may wish to set a zero fee for these transactions. Some schemes may also charge membership fees and/or onboarding fees to DFSPs. Finally, some schemes may provide a period of time after launch of the scheme in which all fees are waived.

- **Interchange Fees**. This is a complex and often debated topic in the payment industry worldwide, and one which frequently attracts regulatory scrutiny. Schemes may want to consider:

    - Whether or not to have interchange at all. Some payments systems have this; many do not. Retail real-time payments systems worldwide are split on whether or not they support the use of interchange, and where they do, in which direction interchange flows for use cases such as P2P.

    - Interchange is a useful mechanism for a form of billing: where the receiver of a valuable service (such as a merchant who wants access to a consumer's payment account) has no relationship with the provider of that service (the consumer's DFSP). Another example of this is where one bank's ATM is used to disburse funds to another bank's customer.

    - Interchange is more questionable when it is being used to support legacy business models: for example, if an interoperable transaction causes a paying DFSP to "lose" a cash-out fee they would otherwise have gained, the scheme may specify an interchange rate in which the Payee DFSP pays the Payer DFSP to compensate for this loss. It may be practical to use interchange in these situations in the short run, but in the long run one can argue that the underlying business model needs to evolve.

    - Schemes should keep in mind that wherever interchange is used, a "hard cost" is being created that is being absorbed by, and probably passed on in end-user fees, by the interchange-paying-DFSP.

## 11. Choice: Brand Management

Should a scheme brand be used? Should the same brand be used for all use cases? Or should the only brand used be the brand of the DFSP who is offering a service to its customers? Not surprisingly, this is an issue that has been debated in payments systems through the years.

### 11.1 L1P Alignment — Brand

Level One has a clear design principle supporting a common brand: this is predicated on making the service understandable and easy to use for both consumers and merchants. A common scheme brand may be used in conjunction with DFSP brands: "Use DFSP SuperPay (DFSP brand) with XPay (Scheme brand) to pay your bills."

Business rules will need to specify how and where the common brand is used.

## 12. Choice: Scheme Connections to Other Schemes

The advent of roughly similar real-time retail payments systems worldwide has led to many discussions about the desirability of connecting these schemes to each other. This can both facilitate transactions within a country, but notably has importance for cross-border payments of all kinds, including workers\' remittances.

In legacy payment systems, this type of connection is rare on a scheme-to-scheme basis. Notable exceptions to this are the connection domestically of ATM networks, and the connection of domestic card schemes that are owned or controlled by global card networks. What happens, instead, is that DFSPs or other providers who have participation in multiple networks (either directly or through partnerships) create the effect of cross-scheme connection through individual deals: this is, essentially, how cross-border correspondent banking works.

Mojaloop as a technology is designed to allow system-to-system connectivity. Schemes implementing Mojaloop systems will need to consider the balance between striking scheme-to-scheme business agreements (with concurrent technical connections) and/or allowing DFSPs in their scheme to connect to other schemes or DFSPs bilaterally.

### 12.1 L1P Alignment — Connections to Other Schemes

The relevant L1P principles here are low cost and "openness". The Mojaloop code in particular has the potential to turn cross-border transactions from ones that are governed by complex relationships (as in the case of traditional correspondent banking) into ones which are competed for in an open, interconnected marketplace. Schemes will need to evaluate the merits of this (arguably promoting lower costs) with the risks of dominance by major institutions. Scheme-to-scheme business arrangements may have a beneficial "level the playing field" characteristics. Hybrid relationships are also possible. This is an evolving area of the payment industry, and one where considerable variety of arrangements are both possible and likely.

## 13. Choice: Scheme Use by Other FSPs

A successful L1P aligned scheme will be used by many enterprises — merchants, billers, government agencies, etc. as well as individual people. There will also be a wide range of other FSPs (Financial Services providers) which are not DFSP's: in other words, which do not hold customer transaction accounts. This includes payments services providers: aggregators, merchant services providers, various DFSP processors, etc., all of which may want to connect to and use the scheme.

As described in the "participation" choice above, a Level One aligned scheme includes as direct, settling participants only the entities that hold the end-user transaction accounts: the accounts that are debited and credited as a result of the interoperable transaction.

Other entities may physically connect to the platform under a variety of business arrangements. The scheme will need to decide how involved scheme business rules are in dictating terms or standards for these arrangements. As a general principle, any other FSP connecting to the platform will need to be acting on behalf of a DFSP whose customer's transaction account is being debited (the payer DFSP) or credited (the payee DFSP). In legacy payments models, the DFSP retains all of the financial obligations and liabilities for the transaction: the third party is acting purely on behalf of the DFSP. Scheme business rules may specify requirements for the business arrangements between the DFSP and the third party. In some jurisdictions (notably India and the EU) regulation is driving changes to this model to allow other FSPs to have more direct involvement in schemes. Scheme rules will need to carefully describe and proscribe the parameters of these arrangements.

Definitional note: we are purposefully not using the term "PSP" (Payment Service Provider) here, as in various jurisdictions this term is used to include transaction account providers, in some cases, and non-transaction account providers in other cases. As a further comment, in many countries today entities such as aggregators hold financial accounts at banks or eMoney Issuers and use those accounts to receive money from customers and disburse money to other customers. In this role, the aggregator is a customer of a DFSP (the bank or eMoney Issuer) and is also acting as a Financial Services Provider. It may be that these aggregators in the future will not need to intermediate the financial transaction, but instead provide directions that lead to direct transfer of funds, through the scheme, from one customer's transaction account to another's.

### 13.1 L1P Alignment — Use by Other FSPs

The principles here are, again, low cost and openness. Level One would encourage new players to be able to use and access the scheme, as long as their actions are controlled by the scheme in order to ensure safety and financial stability.

## 14. Choice: Scheme Risk Management Standards

Payments schemes, their platforms, and participating DFSPs and third parties all, obviously, need to operate according to strong risk management standards in order to ensure a healthy payments system ecosystem.

The question for a scheme is the balance between defining these standards itself and relying on other standards. From a Business Rules perspective, this is a significant choice. Schemes may either:

- Develop detailed risk management standards for DFSPs (and for the Platform) and conduct rigorous certification and/or audit processes to ensure compliance

- Require DFSPs, the Platform and third parties to follow referenced national or global standards for risk management and security

### 14.1 L1P Alignment — Risk Management Standards

The Level One does not address which choice above is the better. But the concepts of a safe system for consumers to use, and a low-cost system clearly apply here. Some considerations:

- A shared fraud management utility (which Level One principles do support) can cost-effectively handle some of the tasks of fraud management. This does not reduce an individual DFSP's compliance burden, but merely shifts how it meets that burden

- The global card networks have effectively demonstrated the ability to automate elements of exception processing, focusing on those transactions which occur the most often

- The Mojaloop community has expressed interest in codifying exceptions, and providing support through code for some processes

- The Mojaloop community may also develop best practices documents for handling areas of risk management, including cybersecurity

## 15. Choice: Exception Management

Exception processing includes a wide variety of non-standard transactions and interactions among users and providers of a payment scheme. These include:

- Errors on the part of end-users

- Errors on the part of DFSPs, the Platform, or other FSPs

- Fraud committed by end-user customers, including individuals,
    merchants, billers, or other entities

- Fraud committed by third parties, including hackers

- Malicious attacks on the system or on individual DFPSs, including cyber-attacks.

Schemes have important choices to make about how involved the scheme, and its Business Rules, are in defining how scheme participants handle these exceptions. Legacy payment systems show us a wide variety of models which are used, from systems where the scheme and Business Rules have minimal involvement in handling of exception processing (checking, most ACH systems) to systems where the scheme and its Business Rules are extensively involved (most card networks). Real-time retail payment systems worldwide are generally only in the early stages of deciding on how to handle these matters.

### 15.1 L1P Alignment — Exception Processing

There are two very important Level One design principles that relate to this.

- One is the principle of transaction irrevocability. This means that a payment transaction that is successfully completed (in a Mojaloop implementation, one that has been fulfilled) may not be reversed without the consent of the payee.

- The other is the commitment to a shared fraud management resource at the platform level. The idea is that the scheme and its platform will have a larger view of all transaction data and will be able to perform fraud detection and management tasks more effectively and at a lower cost than can individual DFSPs. This concept is in its very early stage of evolution as Level One systems are deployed, both with and without Mojaloop technology.

Schemes will face significant challenges in this area as the long-anticipated rollout of merchant payments occurs, particularly in lesser developed markets that do not have highly penetrated card payments industries. The challenge will be to balance the desire to protect consumers from merchant fraud with the desire to have low-cost end-user pricing. In developed card payments markets, this is often provided by business rules which specify that a merchant's bank is responsible financially for fraud committed by the merchant. This works but results in relatively high transaction charges to the merchant, as their bank must cover their risk exposure under these rules. This financial model may or may not be sustainable in less developed economies. This is another are where we anticipate extensive evolution over the coming years.
