# Deploying Mojaloop

This section details the deployment aspects of the Mojaloop Hub.

## Deployment of Mojaloop Hub (excluding participant integrations)

The following table provides guidance on which Mojaloop deployment scenario is most appropriate for different user types and use cases.

For detailed information about each deployment tool, please refer to the [Deployment Tools](./tools) documentation.

<style>
.deployment-table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;

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
        position: relative;

        &:hover::after {
            content: "Use: core test harness";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.orange { 
        background-color: rgba(243, 156, 18, 0.3); /* Lighter orange with opacity */
        position: relative;

        &:hover::after {
            content: "Use: Miniloop";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.amber { 
        background-color: rgba(230, 126, 34, 0.3); /* Lighter amber with opacity */
        position: relative;

        &:hover::after {
            content: "Use: HELM deploy";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.red { 
        background-color: rgba(231, 76, 60, 0.3); /* Lighter red with opacity */
        position: relative;

        &:hover::after {
            content: "Use: IaC";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }
}
</style>

<table class="deployment-table">
<thead>
<tr>
<th>Deployment Scenario / User type</th>
<th>Learning</th>
<th>Evaluation (choosing Mojaloop)</th>
<th>Use-case Testing</th>
<th>Feature Development and Dev Testing</th>
<th>Production</th>
</tr>
</thead>
<tbody>
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
</tbody>
</table>

## Deployment Tools

<table class="deployment-table">
<thead>
<tr>
<th>Tool</th>
<th>Features</th>
<th>Minimum Resource Requirements</th>
<th>Security</th>
<th>Documentation</th>
<th>SLA</th>
<th>Caveats, Assumptions, Limitations etc...</th>
</tr>
</thead>
<tbody>
<tr>
<td class="green"><a href="./tools.html#core-test-harness">core test harness</a></td>
<td>- single node<br>- docker-compose<br>- "profiles" available<br>- No HELM<br>- No gateway<br>- No ingress/egress components<br>- No IAM stack<br>- Deploys:<br>  - core services & backing services<br>  - portals (optional)<br>  - monitoring stack (optional)<br><br>Used in CI pipelines for integration testing.</td>
<td>Mid level laptop or desktop workstation</td>
<td>Zero security</td>
<td>- Developer focused documentation.<br>- Non-technical user documentation to support learning objectives.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use</td>
<td>- No SLA</td>
<td>- Never to be used in production.<br>- Never to be used to process real money transactions.</td>
</tr>
<tr>
<td class="orange"><a href="./tools.html#miniloop">Miniloop</a></td>
<td>- single node kubernetes<br>- microk8s?<br>- HELM with string replacements<br>- No gateway<br>- No ingress/egress components<br>- No IAM stack<br>- Deploys:<br>  - core services & backing services<br><br>Gives ability to test in Kubernetes layer.</td>
<td>Mid level laptop or desktop workstation</td>
<td>Zero security</td>
<td>- Developer focused documentation<br>- Semi-technical / BA focused documentation to support use-case experimentation and testing.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use.</td>
<td>- No SLA</td>
<td>- Never to be used in production.<br>- Never to be used to process real money transactions.<br>- Possibly useful for testing/understanding of the HELM charts.</td>
</tr>
<tr>
<td class="amber"><a href="./tools.html#helm-deploy">HELM deploy</a></td>
<td>- Just HELM charts needed to deploy Mojaloop services and backing services.</td>
<td>- High end laptop or workstation<br>- Small cloud kubernetes cluster.</td>
<td>User is required to harden their own Kubernetes cluster.</td>
<td>- Developer focused documentation<br>- Semi-technical / BA focused documentation to support use-case experimentation and testing.<br>- Product level documentation to explain features e.g. what it does and where it is appropriate for use.</td>
<td>- Must be able to achieve SLAs (given baseline hardware specs):<br>  - Availability:<br>    - ? 4/5 9's?<br>  - RTO/RPO: ? As close to zero as possible.<br>  - Throughput/Performance<br>    - TPS: 1000+ (sustained for 1 hour)<br>    - Latency (Percentiles) (excluding external latencies):<br>      - Clearing: 99% < 1 second.<br>      - Lookup: 99% < second.<br>      - Agreement of Terms: 99% < 1 second.<br>  - Data management:<br>    - Mitigations against data loss i.e. replication, disaster recovery.<br>    - Retention (audit, compliance)<br>    - Archiving.<br><br>NB: Strategy is high availability over disaster recovery.</td>
<td>- Can be used in production.<br>- Safe for processing real money transactions.<br>- User/adopter is required to deploy and configure their own infrastructure, including Kubernetes cluster(s), ingress/egress, firewalls etc...<br>- Security is limited to what HELM charts provide. Additional security design and configuration is required.</td>
</tr>
<tr>
<td class="red"><a href="./tools.html#infrastructure-as-code-iac">Infrastructure as Code</a></td>
<td>- multiple deployment platform targets<br>  - AWS, On-prem, other clouds, (modular)<br>- multiple orchestration layer options<br>  - managed k8s, microk8s, eks<br>- GitOps pattern (control centre)<br>  - can deploy and manage multiple hub instances / environments<br>- Deploys:<br>  - control centre<br>  - core services & backing services (options for managed backing services)<br>  - portals<br>  - IAM stack<br>  - monitoring stack<br>  - pm4ml<br>- GitOps pattern</td>
<td>- High end cloud or on-premise infrastructure.</td>
<td>Full security</td>
<td>- Multiple levels of documentation targeting all levels of "user".<br>- Developer docs to enable use, maintenance, enhancement, extenstion of IaC capabilities e.g. adding new targets / services / features.<br>  - Detailed architecture diagrams and explanation to enable deep understanding.<br>- Tech ops focused docs to enable "infrastructure engineer" level users to use IaC to deploy and maintain multiple mojaloop instances for development, testing and production.<br>- Product level documentation to explain IaC features e.g. what it does and where it is appropriate for use.</td>
<td>- Must be able to achieve SLAs (given baseline hardware specs):<br>  - Availability:<br>    - ? 4/5 9's?<br>  - RTO/RPO: ? As close to zero as possible.<br>  - Throughput/Performance<br>    - TPS: 1000+ (sustained for 1 hour)<br>    - Latency (Percentiles) (excluding external latencies):<br>      - Clearing: 99% < 1 second.<br>      - Lookup: 99% < second.<br>      - Agreement of Terms: 99% < 1 second.<br>  - Data management:<br>    - Mitigations against data loss i.e. replication, disaster recovery.<br>    - Retention (audit, compliance)<br>    - Archiving.<br><br>NB: Strategy is high availability over disaster recovery.</td>
<td>- Can be used in production.<br>- Safe for processing real money transactions.</td>
</tr>
</tbody>
</table>

## Document History
|Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|3rd June 2025|Paul Makin|Removed performance section, moved it to new doc|
|1.0|7th May 2025|Tony Williams|Initial version| 