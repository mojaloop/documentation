# Engineering Principles

This section details the principles behind the engineering aspects of
the Mojaloop Hub.

## Logging 

Industry-standard logging mechanisms for containers (stdout, stderr) are
the default.

## Transfers

1.  Resource identifiers are unique within a scheme and enforced by the
    hub.

2.  API methods which can potentially return large result sets are paged
    by default.

3.  Settlement model lookups use the currencies of payer and payee DFSP.

4.  Resources/entities are typed so they can be differentiated

5.  Names (of objects, methods, types, functions etc...) are clear and
    not open to misinterpretation.

## Accounts & Balances 

1.  Ledger implementation uses a strongly consistent underlying data
    store.

2.  Critical financial data is replicated to multiple geographically
    distributed nodes in a manner that is strongly consistent and highly
    performant, such that the failure of multiple physical nodes will
    result in zero data loss.

## Participants 

1.  Participant connectivity concerns are handled at a gateway layer to
    facilitate the use of industry standard tooling.

## Scalability and Resilience 

1.  Overall system transfer throughput (all three transfer phases) is
    scalable in as near linear manner as possible by the addition of low
    specification, commodity hardware nodes.

2.  Business critical data can be replicated to multiple geographically
    distributed nodes in a manner that is strongly consistent and highly
    performant; Failure of multiple physical nodes will result in zero
    data loss.

## Mojaloop Specification 

1.  JWS is supported

2.  Mutually authenticated (x.509) TLS v1.2 should be supported between
    participants and the hub

## Deployment 

1.  Helm charts are available, and default configuration values suitable
    for production deployment scenarios can be downloaded.

## General 

1.  Context specific processing is done once and results cached in
    memory where required later in the same call stack.

2.  All log messages contain contextual information.

3.  Failures are anticipated and handled as gracefully as possible.

4.  Cross process / network queries ask for only the data required.

5.  Layers of abstraction are kept to an absolute minimum.

6.  Interprocess communication uses the same transport mechanism
    wherever possible.

7.  Aggregates are stateless.
