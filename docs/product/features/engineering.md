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

### Deployment Tools

| Tool | Features | Minimum Resource Requirements | Security | Documentation | SLA | Caveats, Assumptions, Limitations etc... |
|------|----------|------------------------------|----------|---------------|-----|------------------------------------------|
| <div class="green">core test harness</div> | - single node<br>- docker-compose<br>- "profiles" available<br>- No HELM<br>- No gateway<br>- No ingress/egress components<br>- No IAM stack<br>- Deploys:<br>  - core services & backing services<br>  - portals (optional)<br>  - monitoring stack (optional)<br><br>Used in CI pipelines for integration testing. | Mid level laptop or desktop workstation | Zero security | - Developer focused documentation.<br>- Non-technical user documentation to support learning objectives.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use | - No SLA | - Never to be used in production.<br>- Never to be used to process real money transactions. |
| <div class="orange">Miniloop</div> | - single node kubernetes<br>- microk8s?<br>- HELM with string replacements<br>- No gateway<br>- No ingress/egress components<br>- No IAM stack<br>- Deploys:<br>  - core services & backing services<br><br>Gives ability to test in Kubernetes layer. | Mid level laptop or desktop workstation | Zero security | - Developer focused documentation<br>- Semi-technical / BA focused documentation to support use-case experimentation and testing.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use. | - No SLA | - Never to be used in production.<br>- Never to be used to process real money transactions.<br>- Possibly useful for testing/understanding of the HELM charts. |
| <div class="amber">HELM deploy</div> | - Just HELM charts needed to deploy Mojaloop services and backing services. | - High end laptop or workstation<br>- Small cloud kubernetes cluster. | User is required to harden their own Kubernetes cluster. | - Developer focused documentation<br>- Semi-technical / BA focused documentation to support use-case experimentation and testing.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use. | - Must be able to achieve SLAs (given baseline hardware specs):<br>  - Availability:<br>    - ? 4/5 9's?<br>  - RTO/RPO: ? As close to zero as possible.<br>  - Throughput/Performance<br>    - TPS: 1000+ (sustained for 1 hour)<br>    - Latency (Percentiles) (excluding external latencies):<br>      - Clearing: 99% < 1 second.<br>      - Lookup: 99% < second.<br>      - Agreement of Terms: 99% < 1 second.<br>  - Data management:<br>    - Mitigations against data loss i.e. replication, disaster recovery.<br>    - Retention (audit, compliance)<br>    - Archiving.<br><br>NB: Strategy is high availability over disaster recovery. | - Can be used in production.<br>- Safe for processing real money transactions.<br>- User/adopter is required to deploy and configure their own infrastructure, including Kubernetes cluster(s), ingress/egress, firewalls etc...<br>- Security is limited to what HELM charts provide. Additional security design and configuration is required. |
| <div class="red">IaC</div> | - multiple deployment platform targets<br>  - AWS, On-prem, other clouds, (modular)<br>- multiple orchestration layer options<br>  - managed k8s, microk8s, eks<br>- GitOps pattern (control centre)<br>  - can deploy and manage multiple hub instances / environments<br>- Deploys:<br>  - control centre<br>  - core services & backing services (options for managed backing services)<br>  - portals<br>  - IAM stack<br>  - monitoring stack<br>  - pm4ml<br>- GitOps pattern | - High end cloud or on-premise infrastructure. | Full security | - Multiple levels of documentation targeting all levels of "user".<br>- Developer docs to enable use, maintenance, enhancement, extenstion of IaC capabilities e.g. adding new targets / services / features.<br>  - Detailed architecture diagrams and explanation to enable deep understanding.<br>- Tech ops focused docs to enable "infrastructure engineer" level users to use IaC to deploy and maintain multiple mojaloop instances for development, testing and production.<br>- Product level documentation to explain IaC features e.g. what it does and where it is appropriate for use. | - Must be able to achieve SLAs (given baseline hardware specs):<br>  - Availability:<br>    - ? 4/5 9's?<br>  - RTO/RPO: ? As close to zero as possible.<br>  - Throughput/Performance<br>    - TPS: 1000+ (sustained for 1 hour)<br>    - Latency (Percentiles) (excluding external latencies):<br>      - Clearing: 99% < 1 second.<br>      - Lookup: 99% < second.<br>      - Agreement of Terms: 99% < 1 second.<br>  - Data management:<br>    - Mitigations against data loss i.e. replication, disaster recovery.<br>    - Retention (audit, compliance)<br>    - Archiving.<br><br>NB: Strategy is high availability over disaster recovery. | - Can be used in production.<br>- Safe for processing real money transactions. |

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