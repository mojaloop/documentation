# Participant Feature Matrix

This document provides a comprehensive matrix of different participant types, their requirements, and recommended connectivity solutions for Mojaloop integration.

<style>
.participant-matrix {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    font-size: 12px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        vertical-align: top;
        position: relative;
    }

    th {
        background-color: #f8f9fa;
        font-weight: bold;
        font-size: 13px;
    }

    .category-header {
        background-color: #e9ecef;
        font-weight: bold;
        text-align: center;
    }

    td.small { 
        background-color: rgba(46, 204, 113, 0.2);
    }

    td.low-medium { 
        background-color: rgba(243, 156, 18, 0.2);
    }

    td.high-medium { 
        background-color: rgba(230, 126, 34, 0.2);
    }

    td.large { 
        background-color: rgba(231, 76, 60, 0.2);
    }

    .participant-type {
        font-weight: bold;
        min-width: 120px;
    }
}
</style>

## Payment Use-Case DFSPs

<table class="participant-matrix">
<thead>
<tr>
<th>Participant Category</th>
<th>Description</th>
<th>Expected Use-Cases</th>
<th>Infrastructure Requirements for Mojaloop Integration</th>
<th>Expected Production SLA</th>
<th>Likely Relevant Regulation</th>
<th>Special Security Requirements</th>
<th>Solution Options</th>
</tr>
</thead>
<tbody>
<tr>
<td class="small participant-type">Small self-hosting DFSP</td>
<td>- Small FI with single branch.<br>- Own workstations<br>- Minimal cloud and/or SaaS.</td>
<td>- All moja transfer types except bulk.<br>- Open banking (incl PISP, AISP)</td>
<td>- Single, cheap, low-end dedicated mini-pc (e.g. RPi)<br>- Single small business broadband Internet connection<br>- Self-hosted core banking system e.g. Mifos<br>- Use OS/Software firewall on same HW node as integration layer.</td>
<td>- "Some" downtime acceptable if hardware fails.<br>  - Some schemes may rule out DFSPs that cant meet a certain downtime SLA.<br>  - May take many days/weeks to purchase replacement hardware on total failure.<br>- Full Mojaloop security feature set: mTLS, JWS, ILP<br>- ~10 TPS peak sustained for 1 hour.<br>  - Max capable of 864000 per 24 hours.</td>
<td>- Record keeping?<br>- Security?</td>
<td>- No need to integrate with existing enterprise security platforms.<br>- Need a fully secure solution "in-a-box" following best industry practice for internet facing services i.e. including firewall.</td>
<td>- Docker compose based integration layer.<br>- Minimal, self-contained integration layer.</td>
</tr>
<tr>
<td class="low-medium participant-type">Low Medium self-hosted DFSP</td>
<td>- Small FI with one or two branches.<br>- Own "data centre" i.e. broom cupboard with a few servers, router, firewall etc...<br>- Some cloud knowledge and/or SaaS usage.</td>
<td>- All moja transfer types<br>- Bulk (1000's of transfers).<br>- Open banking (incl PISP, AISP)</td>
<td>- Single enterprise grade server hardware node.<br>- Use OS/Software firewall on same HW node as integration layer OR dedicated HW firewall.</td>
<td>- "Some" downtime acceptable if hardware fails.<br>  - Some schemes may rule out DFSPs that cant meet a certain downtime SLA.<br>  - May take hours to replace hardware on total failure.<br>- Full Mojaloop security feature set: mTLS, JWS, ILP<br>- ~50 TPS peak sustained for 1 hour.</td>
<td>- Record keeping?<br>- Security?</td>
<td>- May need integration with existing enterprise security platforms e.g. firewalls, gateways etc...<br>?? needs more clarification</td>
<td>- Docker compose or docker swarm based integration layer.<br>- Minimal, self-contained integration layer.</td>
</tr>
<tr>
<td class="high-medium participant-type">High Medium self-hosted DFSP</td>
<td>- Small FI with one or two branches.<br>- Own "data centre" i.e. broom cupboard with a few servers, router, firewall etc...<br>- Some cloud knowledge and/or SaaS usage.</td>
<td>- All moja transfer types<br>- Bulk (1000's of transfers).<br>- Open banking (incl PISP, AISP)</td>
<td>- In order to tolerate failure on 1 hardware node 3 or more hardware nodes are required. (2n+1)</td>
<td>- "Some" limited (minutes) downtime acceptable if hardware fails.<br>  - Some schemes may rule out DFSPs that cant meet a certain downtime SLA.<br>  - Should have spare hardware waiting or very fast replacement services in case of failures.<br>- Full Mojaloop security feature set: mTLS, JWS, ILP<br>- ~50 TPS peak sustained for 1 hour.</td>
<td>- Record keeping?<br>- Security?</td>
<td>- May need integration with existing enterprise security platforms e.g. firewalls, gateways etc...</td>
<td>- Kubernetes based integration layer<br>- Possibly have existing integration technology.</td>
</tr>
<tr>
<td class="large participant-type">Large self-hosted DFSP</td>
<td>- Mature, multi-branch FI with high internal IT capability<br>- Has own data centre and experts to manage systems<br>- Comfortable with Cloud and hybrid applications<br>- Has internal software engineering capability.</td>
<td>- All moja transfer types including bulk.<br>- Bulk (1000000's of transfers in a transaction @ 1000 per chunk, sorted per payee DFSP).<br>- Open banking (incl PISP, AISP)</td>
<td>- High availability of internal infrastructure is necessary<br>- Multiple active instances of all critical integration services spread across multiple hardware nodes.<br>- High availability, replicated data storage.<br>  - may be multi-site / availability zone / region.</td>
<td>- No downtime acceptable<br>- High-availability of connectivity.<br>  - multiple active connections via diverse routes.<br>- Optional persistent storage.<br>- Scheme connection and integration layer SLA should match SLA for existing internal infrastructure.<br>- Up to 800 TPS peak sustained for 1 hour for e.g. FXPs.</td>
<td>- Record keeping?<br>- Security?</td>
<td>- May need integration with existing enterprise security platforms e.g. firewalls, gateways etc...</td>
<td>- Kubernetes based integration layer<br>- Possibly have existing integration technology.</td>
</tr>
</tbody>
</table>

## Fintechs which use PISP and/or AISP

<table class="participant-matrix">
<thead>
<tr>
<th>Participant Category</th>
<th>Description</th>
<th>Expected Use-Cases</th>
<th>Infrastructure Requirements for Mojaloop Integration</th>
<th>Expected Production SLA</th>
<th>Likely Relevant Regulation</th>
<th>Special Security Requirements</th>
<th>Solution Options</th>
</tr>
</thead>
<tbody>
<tr>
<td class="small participant-type">Small self-hosting PISP/AISP</td>
<td>- Small org with single "branch" fintech with one or two products.<br>- Own workstations / servers<br>- Minimal cloud and/or SaaS.</td>
<td>- Relatively small bulk payments e.g. salary payments for SMEs</td>
<td>- Single, cheap, low-end dedicated mini-pc (e.g. RPi)<br>- Single small business broadband Internet connection<br>- Self-hosted core banking system e.g. Mifos<br>- Use OS/Software firewall on same HW node as integration layer.</td>
<td>- "Some" downtime acceptable if hardware fails.<br>  - Some schemes may rule out DFSPs that cant meet a certain downtime SLA.<br>  - May take many days/weeks to purchase replacement hardware on total failure.<br>- Full Mojaloop security feature set: mTLS, JWS, ILP<br>- Bulk interface SLA?<br>  - How should this be defined? Batch size? time to send batch over API? response time for callbacks?<br>  - Max batch size approx 10k payments<br>  - Sending 10k payments via bulk API should take < 30 seconds.<br>  - Responding to callbacks should take < 5 seconds.</td>
<td>- Record keeping?<br>- Security?</td>
<td>- No need to integrate with existing enterprise security platforms.<br>- Need a fully secure solution "in-a-box" following best industry practice for internet facing services i.e. including firewall.</td>
<td>- Docker compose based integration layer.<br>- Minimal, self-contained integration layer.</td>
</tr>
<tr>
<td class="low-medium participant-type">Low Medium self-hosting PISP/AISP</td>
<td>- Small org with one or two branches.<br>- Own "data centre" i.e. broom cupboard with a few servers, router, firewall etc...<br>- Some cloud knowledge and/or SaaS usage.</td>
<td>- Relatively small bulk payments e.g. salary payments for SMEs<br>- Account aggregation</td>
<td>- Single enterprise grade server hardware node.<br>- Use OS/Software firewall on same HW node as integration layer OR dedicated HW firewall.</td>
<td>- "Some" downtime acceptable if hardware fails.<br>  - Some schemes may rule out DFSPs that cant meet a certain downtime SLA.<br>  - May take hours to replace hardware on total failure.<br>- Full Mojaloop security feature set: mTLS, JWS, ILP<br>- Bulk interface SLA?<br>  - How should this be defined? Batch size? time to send batch over API? response time for callbacks?<br>  - Max batch size approx 25k payments<br>  - Sending 25k payments via bulk API should take < 60 seconds.<br>  - Responding to callbacks should take < 10 seconds.</td>
<td>- Record keeping?<br>- Security?</td>
<td>- May need integration with existing enterprise security platforms e.g. firewalls, gateways etc...<br>?? needs more clarification</td>
<td>- Docker compose or docker swarm based integration layer.<br>- Minimal, self-contained integration layer.</td>
</tr>
<tr>
<td class="high-medium participant-type">High Medium self-hosting PISP/AISP</td>
<td>- Small org with one or two branches.<br>- Own "data centre" i.e. broom cupboard with a few servers, router, firewall etc...<br>- Some cloud knowledge and/or SaaS usage.</td>
<td>- Bulk payment for large organisations e.g. government depts.<br>- Account aggregation</td>
<td>- In order to tolerate failure on 1 hardware node 3 or more hardware nodes are required. (2n+1)</td>
<td>- "Some" limited (minutes) downtime acceptable if hardware fails.<br>  - Some schemes may rule out DFSPs that cant meet a certain downtime SLA.<br>  - Should have spare hardware waiting or very fast replacement services in case of failures.<br>- Full Mojaloop security feature set: mTLS, JWS, ILP<br>- Bulk interface SLA?<br>  - How should this be defined? Batch size? time to send batch over API? response time for callbacks?<br>  - Max batch size approx 100-200k payments<br>  - Sending 100-200k payments via bulk API should take < 300 seconds.<br>  - Responding to callbacks should take < 120 seconds.</td>
<td>- Record keeping?<br>- Security?</td>
<td>- May need integration with existing enterprise security platforms e.g. firewalls, gateways etc...</td>
<td>- Kubernetes based integration layer<br>- Possibly have existing integration technology.</td>
</tr>
<tr>
<td class="large participant-type">Large self-hosting PISP/AISP</td>
<td>- Mature, multi-branch org with high internal IT capability<br>- Has own data centre and experts to manage systems<br>- Comfortable with Cloud and hybrid applications<br>- Has internal software engineering capability.</td>
<td>- Bulk payment for large organisations e.g. government depts.</td>
<td>- High availability of internal infrastructure is necessary<br>- Multiple active instances of all critical integration services spread across multiple hardware nodes.<br>- High availability, replicated data storage.<br>  - may be multi-site / availability zone / region.</td>
<td>- No downtime acceptable<br>- High-availability of connectivity.<br>  - multiple active connections via diverse routes.<br>- Optional persistent storage.<br>- Scheme connection and integration layer SLA should match SLA for existing internal infrastructure.<br>- Bulk interface SLA?<br>  - How should this be defined? Batch size? time to send batch over API? response time for callbacks?<br>  - Max batch size approx 1mil payments<br>  - Sending 1mil payments via bulk API should take < 600 seconds.<br>  - Responding to callbacks should take < 300 seconds.</td>
<td>- Record keeping?<br>- Security?</td>
<td>- May need integration with existing enterprise security platforms e.g. firewalls, gateways etc...</td>
<td>- Kubernetes based integration layer<br>- Possibly have existing integration technology.</td>
</tr>
</tbody>
</table>

## Document History
|Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|9th June 2025|Tony Williams|Initial version| 