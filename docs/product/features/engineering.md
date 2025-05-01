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

### Performance Baseline

The Mojaloop Hub has been demonstrated to support the following performance characteristics on minimal hardware:

- Clearing 1,000 transfers per second
- Sustained for one hour
- With not more than 1% (of transfer stage) taking more than 1 second through the hub

This baseline performance can be used as a reference point for system sizing and capacity planning.

### Deployment of Mojaloop Hub (excluding participant integrations)

The following table provides guidance on which Mojaloop deployment scenario is most appropriate for different user types and use cases.

<style>
table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
}
th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
    vertical-align: top;
    position: relative;
}
th {
    background-color: #f8f9fa;
}
td.green { 
    background-color: rgba(46, 204, 113, 0.3); /* Lighter green with opacity */
}
td.orange { 
    background-color: rgba(243, 156, 18, 0.3); /* Lighter orange with opacity */
}
td.amber { 
    background-color: rgba(230, 126, 34, 0.3); /* Lighter amber with opacity */
}
td.red { 
    background-color: rgba(231, 76, 60, 0.3); /* Lighter red with opacity */
}
</style>

<table>
<tr>
<th>Deployment Scenario / User type</th>
<th>Learning</th>
<th>Evaluation (choosing Mojaloop)</th>
<th>Use-case Testing</th>
<th>Feature Development and Dev Testing</th>
<th>Production</th>
</tr>
<tr>
<td>Student</td>
<td class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</td>
<td>?</td>
<td>?</td>
<td class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</td>
<td>N/A</td>
</tr>
<tr>
<td>Developer</td>
<td class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</td>
<td>?</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td>N/A</td>
</tr>
<tr>
<td>Business analyst</td>
<td class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td>N/A</td>
</tr>
<tr>
<td>Potential adopter</td>
<td class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td>N/A</td>
</tr>
<tr>
<td>Auditor / External QA / Security Analyst</td>
<td class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td>N/A</td>
<td>N/A</td>
</tr>
<tr>
<td>System Integrator</td>
<td class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="red">Footprint:<br>- Fully redundant, replicated, high availability deployment<br>- On-premises or cloud<br>SLA: High SLA in many areas.</td>
</tr>
<tr>
<td>Hub Operator</td>
<td class="green">Footprint: Single machine e.g. laptop or single VM.<br>SLA: None</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="orange">Footprint:<br>- Single machine e.g. laptop or single VM.<br>- Production like environment (sandbox? lower SLA than prod)<br>SLA:<br>- Lower than prod but possibility of testing NFRs.</td>
<td class="red">Footprint:<br>- Fully redundant, replicated, high availability deployment<br>- On-premises or cloud<br>SLA: High SLA in many areas.</td>
</tr>
</table>

### Deployment Tools

<table>
<tr>
<th>Tool</th>
<th>Features</th>
<th>Minimum Resource Requirements</th>
<th>Security</th>
<th>Documentation</th>
<th>SLA</th>
<th>Caveats, Assumptions, Limitations etc...</th>
</tr>
<tr>
<td class="green">core test harness</td>
<td>- single node<br>- docker-compose<br>- "profiles" available<br>- No HELM<br>- No gateway<br>- No ingress/egress components<br>- No IAM stack<br>- Deploys:<br>  - core services & backing services<br>  - portals (optional)<br>  - monitoring stack (optional)<br><br>Used in CI pipelines for integration testing.</td>
<td>Mid level laptop or desktop workstation</td>
<td>Zero security</td>
<td>- Developer focused documentation.<br>- Non-technical user documentation to support learning objectives.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use</td>
<td>- No SLA</td>
<td>- Never to be used in production.<br>- Never to be used to process real money transactions.</td>
</tr>
<tr>
<td class="orange">Miniloop</td>
<td>- single node kubernetes<br>- microk8s?<br>- HELM with string replacements<br>- No gateway<br>- No ingress/egress components<br>- No IAM stack<br>- Deploys:<br>  - core services & backing services<br><br>Gives ability to test in Kubernetes layer.</td>
<td>Mid level laptop or desktop workstation</td>
<td>Zero security</td>
<td>- Developer focused documentation<br>- Semi-technical / BA focused documentation to support use-case experimentation and testing.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use.</td>
<td>- No SLA</td>
<td>- Never to be used in production.<br>- Never to be used to process real money transactions.<br>- Possibly useful for testing/understanding of the HELM charts.</td>
</tr>
<tr>
<td class="amber">HELM deploy</td>
<td>- Just HELM charts needed to deploy Mojaloop services and backing services.</td>
<td>- High end laptop or workstation<br>- Small cloud kubernetes cluster.</td>
<td>User is required to harden their own Kubernetes cluster.</td>
<td>- Developer focused documentation<br>- Semi-technical / BA focused documentation to support use-case experimentation and testing.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use.</td>
<td>- Must be able to achieve SLAs (given baseline hardware specs):<br>  - Availability:<br>    - ? 4/5 9's?<br>  - RTO/RPO: ? As close to zero as possible.<br>  - Throughput/Performance<br>    - TPS: 1000+ (sustained for 1 hour)<br>    - Latency (Percentiles) (excluding external latencies):<br>      - Clearing: 99% < 1 second.<br>      - Lookup: 99% < second.<br>      - Agreement of Terms: 99% < 1 second.<br>  - Data management:<br>    - Mitigations against data loss i.e. replication, disaster recovery.<br>    - Retention (audit, compliance)<br>    - Archiving.<br><br>NB: Strategy is high availability over disaster recovery.</td>
<td>- Can be used in production.<br>- Safe for processing real money transactions.<br>- User/adopter is required to deploy and configure their own infrastructure, including Kubernetes cluster(s), ingress/egress, firewalls etc...<br>- Security is limited to what HELM charts provide. Additional security design and configuration is required.</td>
</tr>
<tr>
<td class="red">IaC</td>
<td>- multiple deployment platform targets<br>  - AWS, On-prem, other clouds, (modular)<br>- multiple orchestration layer options<br>  - managed k8s, microk8s, eks<br>- GitOps pattern (control centre)<br>  - can deploy and manage multiple hub instances / environments<br>- Deploys:<br>  - control centre<br>  - core services & backing services (options for managed backing services)<br>  - portals<br>  - IAM stack<br>  - monitoring stack<br>  - pm4ml<br>- GitOps pattern</td>
<td>- High end cloud or on-premise infrastructure.</td>
<td>Full security</td>
<td>- Multiple levels of documentation targeting all levels of "user".<br>- Developer docs to enable use, maintenance, enhancement, extenstion of IaC capabilities e.g. adding new targets / services / features.<br>  - Detailed architecture diagrams and explanation to enable deep understanding.<br>- Tech ops focused docs to enable "infrastructure engineer" level users to use IaC to deploy and maintain multiple mojaloop instances for development, testing and production.<br>- Product level documentation to explain IaC features e.g. what it does and where it is appropriate for use.</td>
<td>- Must be able to achieve SLAs (given baseline hardware specs):<br>  - Availability:<br>    - ? 4/5 9's?<br>  - RTO/RPO: ? As close to zero as possible.<br>  - Throughput/Performance<br>    - TPS: 1000+ (sustained for 1 hour)<br>    - Latency (Percentiles) (excluding external latencies):<br>      - Clearing: 99% < 1 second.<br>      - Lookup: 99% < second.<br>      - Agreement of Terms: 99% < 1 second.<br>  - Data management:<br>    - Mitigations against data loss i.e. replication, disaster recovery.<br>    - Retention (audit, compliance)<br>    - Archiving.<br><br>NB: Strategy is high availability over disaster recovery.</td>
<td>- Can be used in production.<br>- Safe for processing real money transactions.</td>
</tr>
</table>

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