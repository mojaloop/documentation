# Invariants

## General Principles

**The primary function of the platform is to clear payments in real-time
and facilitate regular settlement, by the end of the value day.**

1.  The platform allows participants to clear funds immediately to their
    customers while keeping the risks and costs associated with this to
    a minimum.

2.  The platform supports per-transfer checks on available liquidity
    where these are required in support of the first objective.

3.  The hub is optimized for critical path.

4.  Intra-day Automated Settlement; configured by scheme and
    implementation using recommended settlement models for financial
    market infrastructure.

**The hub supports fully automatic straight-through processing.**

1.  Straight through processing helps reduce human errors in the
    transfer process which ultimately reduces costs.

2.  The automated nature of straight through processing leads to faster
    value transfers between end customers.

**The hub requires no manual reconciliation as the protocol for
interacting with the hub guarantees deterministic outcomes.**

1.  When a transfer is finalized, there can be no doubt about the status
    of that transfer (alternatively, it is not finalized and active
    notice is provided to participants).
2.  The hub guarantees deterministic outcomes for transfers and is
    accepted by all participants as the final authority ("system of
    record") on the status of transfers.
3.  Determinism means individual transfers are traceable, auditable
    (based on limits, constraints), with final result provided within
    guaranteed time limit.
4.  For the avoidance of doubt, batch transfers are processed
    line-by-line with potentially differing deterministic outcomes for
    each.

**Transaction setup logic, which is use case-specific, is separated from
the policy-free transfer of money.**

1.  Transaction details and business rules should be captured and agreed
    as scheme rules and technical operating guidelines. They may then be
    applied during the quoting phase by those counterparties, and will
    be carried between those counterparties by the Hub.
2.  The agreement phase establishes a signed use-case specific
    transaction object which incorporates all transaction-specific
    details.
3.  The transfer phase orchestrates the clearance of the transfer of
    retail value between institutions for the benefit of the
    counterparties (i.e only system limit checks are applied) and
    without reference to transaction details.
4.  No additional transaction-specific processing during the transfer
    phase.

**The hub doesn't parse or act on end-to-end transaction details;
transfer messages contain only the values required to complete clearing
and settlement.**

1.  Checks & validations during the transfer step are only for
    conformance to scheme rules, limit checks, signature authentication,
    and validation of payment condition and fulfillment.
2.  Transfers that are committed for settlement are final and are
    guaranteed to settle under the scheme rules.

**Credit-push transfer semantics are reduced to their simplest form and
standardized for all transaction types.**

1.  Simplifies implementation and participant integration as many
    transaction types and use-cases can reuse the same underlying value
    transfer message flow.
2.  Abstracts use-case complexity away from the critical path.

**Internet-based API service hub is not a "message switch."**

1.  The service hub provides real-time API services for participants to
    support retail credit-push instant transfers.
2.  API services such as ID-to-participant look-up, transaction
    agreement between participants, submission of prepared transfers,
    and submission of fulfillment advice.
3.  Auxiliary API services for participants are provided to support
    onboarding, position management, reporting for reconciliation, and
    other non-realtime functions not associated with transfer
    processing.
4.  All messages are validated for conformance to the API specification;
    non-conforming messages are actively rejected with a standardized
    machine-interpretable reason code.

**The hub exposes asynchronous interfaces**

1.  To maximize system throughput and overall efficiency.
2.  To isolate leaf-node connectivity issues so they don't impact other
    end-users.
3.  To enable the hub system to process requests in its own priority
    order and without holding an active connection-per-transfer.
4.  To handle numerous concurrent long-running processes through
    internal batching and load balancing.
5.  To have a single mechanism for handling requests (Examples are
    transactions such as bulk or those needing end user input or that
    span multiple hops).
6.  To better support real world networking as issues with connection
    speed and reliability for one participant should have minimal impact
    on other participants or system availability more generally.

**The transfer API is idempotent**

1.  This ensures duplicate requests may be made safely by message
    originators in conditions of degraded network connectivity.
2.  Duplicate requests are recognized and result in the same outcome
    (valid duplicates) or are rejected as duplicate (when not allowed by
    specification) with reference to the original.

**Finalized Transfer records are held for a scheme-configurable period
to support scheme processes such as reconciliation, billing, and for
forensic purposes**

1.  It is not possible to query the "sub-status" of an in-process
    Transfer; the API provides a deterministic outcome with active
    notice provided within the guaranteed service time.

**Transfer records for finalized transfers are held indefinitely in
long-term storage to support business analysis by the scheme operator
and by participants (through appropriate interfaces)**

1.  Availability of Transfer records may lag online process finality to
    accommodate separation of record-keeping from real-time processing
    of Transfer requests.

**Hub may serve as a proxy for some inter-participant messages
(e.g. during the Agreement phase) to simplify interconnection, but
without parsing, storing (other than to support forwarding), or further
processing the messages.**

1.  In some messaging flows e.g. party lookup, it may be desirable for
    participants to have a single point of contact for routing of scheme
    related messages, even when the messages are not intended for the
    hub, nor require any inspection or other processing.

**To ensure system is arithmetically consistent, only fixed point
arithmetic is used.**

1.  For the avoidance of doubt, floating point calculations may lose
    accuracy and must not be used in any financial calculation.
2.  See Level One Decimal Type representation and forms.
3.  This specification enables seamless interchange with XML-based
    financial systems without loss of precision or accuracy

## Security and Safety 

**API messages are confidential, tamper-evident, and non-repudiable.**

1.  Confidentiality is required to protect the privacy of the
    participants and their customers.
2.  There are legal requirements in many regulatory domains where
    Mojaloop is expected to operate and as such, the hub must employ
    best practices to ensure that the privacy of the participants and
    their customers is protected.
3.  Tamper-evident integrity mechanisms are required to ensure that
    messages cannot be altered in transit.
4.  To ensure the integrity of the overall system, each recipient of a
    message should be able to independently tell, with a high degree of
    confidence, that the message was not altered in transit.
5.  Public key cryptography (digital signing) provides the current best
    known mechanism for tamper-evident messaging.
6.  The security of the sender's private (signing) key is critical.
7.  Scheme rules must be established to clarify the responsibilities for
    key management and the potential for financial liability upon
    compromise of a private key.
8.  Non-repudiation is required to ensure that the message was sent by
    the party which purported to send it and that provenance can not be
    repudiated by the sender.
9.  This is important for determining the liable party during audit and
    dispute resolution processes.

**API messages are authenticated upon receipt prior to acceptance or
further processing**

1.  Authentication gives a degree of confidence that the message was
    sent by the party which purported to send it.
2.  Authentication gives a degree of confidence that the message was not
    sent by an unauthorized party.

**Authenticated Messages are not acknowledged as accepted until safely
recorded to permanent store**

1.  The Mojaloop API assigns significant scheme related business meaning
    to certain HTTP response codes at various points in transaction
    flows.
2.  Certain HTTP responses, e.g. "202 Accepted", are intended to provide
    financial guarantees to participants, and as such must only be sent
    once the receiving entity is confident it has made safe, permanent
    record(s) in support of:
    -   Facilitating system wide recovery to a consistent state after
        failure(s) in one or more distributed components/entities.
    -   Accurate settlement processes
    -   Audit and dispute resolution processes
3.  For example a "202 Accepted" from the hub to the payee participant
    upon receipt of a transfer fulfilment message indicates a guarantee
    of transaction settlement to the payee.
4.  The Mojaloop API is designed to operate safely under imperfect
    network conditions and as such has built in support for retries and
    state synchronisation between participants.

**Three levels of communication security to ensure integrity,
confidentiality, and non-repudiation of messages between an API server
and API client.**

1.  Secure Connections: mTLS required for all communications between the
    hub and authorized participants.
    -   Ensures communications are confidential, between known
        correspondents, and communications are protected against
        tampering.
2.  Secure Messages: JSON message content is cryptographically signed
    according to the JWS specification.
    -   Assures recipients that messages were sent by the party which
        purported to send them, and that provenance cannot be repudiated
        by the sender.
3.  Secure Terms of Transfer: Interledger Protocol (ILP) between Payer
    and Payee participants.
    -   Protects the integrity of the payment condition and its
        fulfilment.
    -   Limits the time within which a transfer instruction is valid.

## Operational Characteristics

**Baseline system demonstrated on minimal hardware supports clearing
1,000 transfers per second, sustained for one hour, with not more than
1% (of transfer stage) taking more than 1 second through the hub.**

1.  This measurement includes all necessary hardware and software
    components with production grade security and data persistence in
    place.
2.  This measurement includes all three transfer stages: discovery,
    agreement, and transfer.
3.  This measurement does not include any participant-introduced
    latency.
4.  A one hour period is a reasonable approximation of a demand peak for
    a national payment system.
5.  A lower unit cost to scale than to initially provision.
6.  1000 transfers (clearing) per second is a reasonable starting point
    for a national payment system.
7.  1% of transfers (clearing) taking more than 1 second is a reasonable
    starting point for a national payment system.
8.  Mojaloop schemes should be able to start at a reasonable cost point,
    for national financial infrastructure, and scale economically as
    demand grows.

**Properly deployed, the hub is highly available and resilient to
failures.**

1.  In this instance we define the term "highly available" as meaning
    "the ability to provide and maintain an acceptable level of service
    in the face of faults and challenges to normal operation."
2.  Although schemes may determine their own definition of what
    constitutes an "acceptable level of service", Mojaloop makes certain
    contributing tradeoff choices:
    -   When fault modes permit, service is degraded across the entire
        participant population rather than individual participants
        suffering total outages while others remain serviceable.
    -   The hub has no single point of failure; meaning that it
        continues to operate with minimum degradation of service in the
        event of a failure of any single component.
    -   Multiple active instances of each component are deployed in a
        distributed manner behind load balancers.
    -   Each active component instance can handle requests from any
        client/participant, meaning no single participant loses the
        ability to transact in the event of a failure of any single
        component.
3.  Given appropriate infrastructure to operate upon, the Mojaloop
    software can be deployed in configurations which deliver 99.999%
    uptime (five nines) overall.
4.  This includes active:active and active:passive multiple,
    geographically distributed data center configurations where both
    services and data are replicated across multiple physical nodes
    which are expected to fail independently.
5.  Note that it is expected that nodes in replication groups (and/or
    clusters) will be located in diverse physical locations (racks
    and/or data centres) with independent power supplies and network
    interconnects.
6.  Should multiple component failures occur which have not been
    mitigated either in the Mojaloop software, deployment configuration
    or infrastructure, the Mojaloop API provides mechanisms for each
    entity in the scheme to recover to a consistent state, with the hub
    being the ultimate source of truth upon full restoration of service.
7.  Also see further points relating to resistance to data loss in the
    event of failures.
8.  Given that Mojaloop schemes are intended to form parts of national
    financial infrastructure they must have as close to zero downtime as
    possible, given reasonable cost constraints.
9.  Failures in hardware and software components are to be expected,
    even in the highest quality components available. Best practice
    suggests these failures should be anticipated and planned for as
    much as possible in the design of the hub with a view to minimising
    loss or degradation of service and/or data.
10. For the avoidance of doubt this means the tradeoffs chosen favour
    overall service availability and state consistency over performance,
    so that:

	-   All participants can continue to transact at a reduced rate rather
    than some participants being unable to transact at all.
	-   Inconsistencies in state between scheme entities are resolvable post
    service restoration via the Mojaloop API, with minimal manual
    reconciliation necessary; the hub being the ultimate source of
    truth.

**The hub is resistant to loss of data in the event of failures.**

1.  Given appropriate infrastructure to operate upon, the Mojaloop
    software can be deployed in configurations which reliably replicate
    data across multiple, redundant physical storage nodes prior to
    processing.
2.  Database engine components which are provided by the Mojaloop
    deployment mechanisms support the following:

	-   Primary:secondary asynchronous replication.
	-   Primary:primary synchronous replication.
	-   Synchronous quorum consensus algorithm based replication.

3.  The replication mechanisms available are dependant on the particular
    storage layer and database technologies employed.
4.  Should multiple component failures occur which have not been
    mitigated either in the Mojaloop software, deployment configuration
    or infrastructure, the Mojaloop API provides mechanisms for each
    entity in the scheme to recover to a consistent state with minimal
    financial exposure risk.
5.  Transfers become financially binding only when the hub has
    successfully responded to a transfer fulfilment message from the
    payee participant. This response is only sent when the hub has
    persisted the fulfilment message and its outcome to its ledger
    database.
6.  Expiration timestamps on all financially significant API messages
    facilitate timely and deterministic failure path outcomes for all
    participants via automated retry mechanisms.
7.  When Mojaloop schemes are intended to form parts of national
    financial infrastructure, they must do as much as possible, given
    reasonable cost constraints, to avoid loss of data in the event of a
    failure.
8.  Failures in hardware and software components are to be expected,
    even in the highest quality components available. Best practice
    suggests these failures should be anticipated and planned for in the
    design of the hub with a view to avoiding data loss.
9.  Participants need timely confidence in the status of financial
    transactions across the scheme in order to minimise exposure risk
    and deliver excellent customer experiences.