# Engineering Principles

This section details the principles behind the engineering aspects of
the Mojaloop Hub.

## Logging 

Industry-standard logging mechanisms for containers (stdout, stderr) are
the default.

## Transfers

1.  Resource identifiers are unique within a scheme and enforced by the hub.

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

### Deployment of Mojaloop Hub (excluding participant integrations)

The following table provides guidance on which Mojaloop deployment scenario is most appropriate for different user types and use cases.

<style>
.green { background-color: #2ecc71; }
.orange { background-color: #f39c12; }
.amber { background-color: #e67e22; }
.red { background-color: #e74c3c; }
</style>

| Deployment Scenario / User type | Learning | Evaluation (choosing Mojaloop) | Use-case Testing | Feature Development and Dev Testing | Production |
|--------------------------------|----------|--------------------------------|------------------|------------------------------------|------------|
| Student | <div class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</div> | ? | ? | <div class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</div> | N/A |
| Developer | <div class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</div> | ? | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | N/A |
| Business analyst | <div class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">? config changes only ?<br>Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | N/A |
| Potential adopter | <div class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | N/A |
| Auditor / External QA / Security Analyst | <div class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | N/A | N/A |
| System Integrator | <div class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="red">Footprint:<br>- Fully redundant, replicated, high availability deployment<br>- On-premises or cloud<br>SLA: High SLA in many areas.</div> |
| Hub Operator | <div class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</div> | <div class="red">Footprint:<br>- Fully redundant, replicated, high availability deployment<br>- On-premises or cloud<br>SLA: High SLA in many areas.</div> |

### Legend:
- <div class="green" style="display: inline-block; padding: 2px 4px; border-radius: 3px;">Green</div>: Easiest to deploy
- <div class="orange" style="display: inline-block; padding: 2px 4px; border-radius: 3px;">Orange</div>: Moderate complexity
- <div class="amber" style="display: inline-block; padding: 2px 4px; border-radius: 3px;">Amber</div>: Complex deployment
- <div class="red" style="display: inline-block; padding: 2px 4px; border-radius: 3px;">Red</div>: Most complex deployment

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

## Applicability

This version of this document relates to Mojaloop Version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14th April 2025| Paul Makin|Added version control|
|1.0|5th February 2025| James Bush|Initial version|