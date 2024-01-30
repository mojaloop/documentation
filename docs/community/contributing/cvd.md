# Disclosing and Receiving Information Regarding Security Vulnerabilities

The Mojaloop Foundation and community take the security of Mojaloop software very seriously and operate a number of
processes intended to ensure Mojaloop is a secure platform for conducting business. Please see
our [documentation on cybersecurity architecture](../tools/cybersecurity.md) for more information.

The Mojaloop Foundation operates
a ["Coordinated Vulnerability Disclose"](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure) process
which is a model whereby a discovered vulnerability or issue is disclosed publicly only after responsible and effected
parties have been given sufficient time to patch or remedy the problem. By operating this model, the Mojaloop Foundation
and community aim to minimise the potential impact of such issues on our adopters.

## Mojaloop Foundation Coordinated Vulnerability Disclosure Policy

The following sections define the requirements and expectations of various parties involved in the discovery and
remediation of security vulnerabilities in the Mojaloop software. All members of the Mojaloop community are expected to
comply with these policies regardless of which role they are playing in any particular scenario. Participation in the
Mojaloop community implies acceptance of and compliance with these policies.

### Terminology

The following definitions apply within the Mojaloop Foundation Coordinated Vulnerability Disclosure Policy:

#### Terms from RFC 2119

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "
OPTIONAL" in this document are to be interpreted as described in RFC 2119.

#### Terms from ISO, CERT

The terms "Researcher" or "Reporter" in this document are intended to be consistent with the terms "Finder" and/or "
Reporter" as used in ISO/IEC 29147:2014(E) and the CERT® Guide to Coordinated Vulnerability Disclosure.

#### Other Terms

ORGANIZATION - The Mojaloop Foundation.

SYSTEM SCOPE - The Mojaloop Foundation's information systems, The Mojaloop Foundation's public and/or private web sites,
Mojaloop
open-source software, Mojaloop open-source software users and/or adopters information systems and their public and/or
private websites.

JURISDICTION - the territorial, political, or governmental scope of a regulatory authority applicable in any particular
scenario. Determination of the applicable JURISDICTION shall be determined by The Mojaloop Foundation.

SLC - Service Level Commitment, typically expressed in terms of the minimum or maximum time until some event trigger.
For example: at least 45 days, not more than 90 days, within 2 business days, etc.

PUBLICATION CHANNEL - A specific medium through which information is conveyed, e.g., a web site, mailing list, Twitter,
RSS or Atom Feed, or database.

BUG BOUNTY - A type of Vulnerability Disclosure Program in which the ORGANIZATION compensates reporters for reports
meeting specific criteria.

REPORTING CHANNEL - A specific medium through which vulnerability reports are communicated from a Reporter to the
ORGANIZATION. Examples include: an email address, a web form, or a bug tracking platform.

### Reporters Policy

Reporters MUST adhere to the following guidelines.

#### General

* Reporters MUST comply with all applicable JURISDICTION laws in connection with security research activities or other
  participation in this vulnerability disclosure program.

* Reporters SHOULD make a good faith effort to notify and work directly with the affected vendor(s) or service providers
  prior to publicly disclosing vulnerability reports.

#### Scope of Authorized Testing

* Reporters MAY test SYSTEM SCOPE to detect a vulnerability for the sole purpose of providing ORGANIZATION information
  about that vulnerability.

* Reporters SHOULD only test against test accounts owned by the Reporter or with explicit permission from the account
  holder.

* Reporters MUST avoid harm to ORGANIZATION's information systems and operations.

* Reporters MUST make every effort to avoid privacy violations, degradation of user experience, disruption to production
  systems, and destruction or manipulation of data.

* Reporters MUST stop testing once that testing has established that a vulnerability exists, or sensitive data has been
  encountered. Sensitive data includes personally identifiable information, financial information (e.g., account
  numbers), proprietary information or trade secrets.

* Reporters MUST NOT test any services not expressly listed in SYSTEM SCOPE, including any connected services

* Reporters MUST NOT exploit any vulnerability beyond the minimal amount of testing required to prove that the
  vulnerability exists or to identify an indicator related to that vulnerability.

* Reporters MUST NOT intentionally access the content of any communications, data, or information transiting or stored
  on ORGANIZATION's information system(s) – except to the extent that the information is directly related to a
  vulnerability and the access is necessary to prove that the vulnerability exists.

* Reporters MUST NOT exfiltrate any data under any circumstances.

* Reporters MUST NOT intentionally compromise the privacy or safety of ORGANIZATION's personnel, customers, the general
  public, or any legitimate third parties.

* Reporters MUST NOT use any exploit to compromise, alter, or exfiltrate data

* Reporters SHOULD NOT establish command line access and/or persistence

* Reporters MUST NOT exploit any vulnerabilities found to pivot to other systems.

* Reporters MUST NOT intentionally compromise the intellectual property or other commercial or financial interests of
  any ORGANIZATION's personnel or entities, customers, or any legitimate third parties.

* Reporters MUST NOT cause a denial of any legitimate services in the course of their testing.

* Reporters MUST NOT perform physical access testing (e.g. office access, open doors, tailgating, or other trespass).

* Reporters MUST NOT conduct social engineering in any form of ORGANIZATION personnel or contractors.

* Reporters SHOULD contact ORGANIZATION at POINT OF CONTACT if at any point you are uncertain of whether to proceed with
  testing.

#### Coordination with ORGANIZATION

* Reporters SHOULD submit vulnerability reports to ORGANIZATION via REPORTING CHANNEL.

* Reporters MAY be eligible for one or more bug bounties. See BUG BOUNTY for details where applicable.

* Reporters SHOULD submit high quality reports.

* Reporters SHOULD include sufficient descriptive details to permit ORGANIZATION and/or the affected vendor(s) to
  accurately reproduce the vulnerable behavior.

* Reporters SHOULD NOT report unanalyzed crash dumps or fuzzer output unless accompanied by a sufficiently detailed
  explanation of how they represent a security vulnerability.

* Reporters SHOULD report other vulnerabilities found incidental to their in-scope testing even if those vulnerabilities
  would be otherwise considered out-of-scope. For example, while testing an in-scope system the reporter finds it to be
  exposing data from out-of-scope system. These are still reportable vulnerabilities.

* Reporters MUST keep confidential any information about vulnerabilities discovered for SLC after you have notified
  ORGANIZATION. Notwithstanding, this expectation does not preclude Reporters from simultaneously coordinating the
  vulnerability report with other affected parties (vendors, service providers, coordinators, etc.)

* Reporters MAY include a proof-of-concept exploit if available.

* Reporters MAY request that their contact information be withheld from all affected vendor(s).

* Reporters MAY request not to be named in the acknowledgements of ORGANIZATION's public disclosures.

* Reporters MUST NOT submit a high-volume of low-quality reports.

* Reporters MUST NOT require ORGANIZATION to enter into a customer relationship, non-disclosure agreement (NDA) or any
  other contractual or financial obligation as a condition of receiving or coordinating vulnerability reports.

* Reporters MUST NOT demand compensation in return for reporting vulnerability information reported outside of an
  explicit bug bounty program.

#### Coordination with vendors

* In the event that the Reporter finds a vulnerability in a ORGANIZATION SYSTEM SCOPE consequent to a vulnerability in a
  generally available product or service, the Reporter MAY report the vulnerability to the affected vendor(s), service
  provider(s), or third party vulnerability coordination service(s) in order to enable the product or service to be
  fixed.

#### Coordination with others

* Reporters MAY engage the services of a third party coordination service (e.g., CERT/CC, DHS CISA) to assist in
  resolving any conflicts that cannot be resolved between the Reporter and ORGANIZATION.

* Reporters SHOULD NOT disclose any details of any extant ORGANIZATION SYSTEM SCOPE vulnerability, or any indicators of
  vulnerability to any party not already aware at the time the report is submitted to ORGANIZATION.

#### Public disclosure

* Reporters MAY disclose to the public the prior existence of vulnerabilities already fixed by ORGANIZATION, including
  potentially details of the vulnerability, indicators of vulnerability, or the nature (but not content) of information
  rendered available by the vulnerability.

* Reporters choosing to disclose to the public SHOULD do so in consultation with ORGANIZATION.

* Reporters MUST NOT disclose any incidental proprietary data revealed during testing or the content of information
  rendered available by the vulnerability to any party not already aware at the time the report is submitted to
  ORGANIZATION.

### Receivers Policy

ORGANIZATION SHALL deal in good faith with Reporters who discover, test, and report vulnerabilities or indicators of
vulnerabilities in accordance with these guidelines.

#### General

* ORGANIZATION MAY modify the terms of this policy or terminate the policy at any time.

* ORGANIZATION SHALL use information reported to this program for defensive purposes only; to mitigate or remediate
  vulnerabilities in our networks or applications, or the applications of our vendors.

#### Case handling

* ORGANIZATION MAY, at our discretion, decline to coordinate or publish a vulnerability report. This decision is
  generally based on the scope and severity of the vulnerability and our ability to add value to the coordination and
  disclosure process.

* In the event that ORGANIZATION declines to coordinate a vulnerability report, the Reporter SHOULD proceed to
  coordinate with any other affected vendor(s). Additionally, the Reporter MAY proceed with public disclosure at their
  discretion.

* ORGANIZATION SHALL investigate every reported vulnerability and strive to ensure that appropriate steps are taken to
  mitigate risk and remediate reported vulnerabilities.

* ORGANIZATION SHALL, to the best of our ability, validate the existence of the vulnerability

* ORGANIZATION SHALL determine an appropriate timeframe for mitigation development and deployment for vulnerabilities
  reported in systems it controls.

#### Coordination with reporters

* ORGANIZATION SHALL acknowledge receipt of vulnerability reports via email within SLC.

* ORGANIZATION MAY contact the Reporter for further information.

* ORGANIZATION SHALL inform the Reporter of the results of our validation, as appropriate, and accordingly provide
  status updates as remediation of the vulnerability is underway.

* ORGANIZATION SHALL include credit to the reporter in any published vulnerability report unless otherwise requested by
  the reporter.

* In the event that ORGANIZATION chooses to publicly disclose the reported vulnerability, ORGANIZATION SHALL recognize
  your contribution to improving our security if you are the first to report a unique vulnerability, and your report
  triggers a code or configuration change.

* ORGANIZATION MAY forward the name and contact information of the Reporter to any affected vendors unless otherwise
  requested by the reporter.

* ORGANIZATION SHALL forward the name and contact information of the reporter to the affected vendors unless otherwise
  requested by the reporter.

* ORGANIZATION SHALL advise the reporter of significant changes in the status of any vulnerability he or she reported to
  the extent possible without revealing information provided to us in confidence.

* ORGANIZATION MAY adjust its publication timeframe to accommodate reporter constraints if that timing is otherwise
  compatible with this policy. In most cases such an adjustment would be expected to represent a delay rather than an
  acceleration of the publication schedule. Examples include delaying publication to coincide with conference
  presentations.

* ORGANIZATION SHALL NOT require Reporters to enter into a customer relationship, non-disclosure agreement (NDA) or any
  other contractual or financial obligation as a condition of receiving or coordinating vulnerability reports.

#### Coordination with vendors

* In the event that ORGANIZATION determines the reported vulnerability is consequent to a vulnerability in a generally
  available product or service, ORGANIZATION MAY report the vulnerability to the affected vendor(s), service provider(
  s), or third party vulnerability coordination service(s) in order to enable the product or service to be fixed.

* ORGANIZATION SHALL make a good faith effort to inform vendors of reported vulnerabilities prior to public disclosure.

* ORGANIZATION SHALL forward vulnerability reports to the affected vendor(s) as soon as practical after we receive the
  report.

* ORGANIZATION SHALL apprise any affected vendors of our publication plans and negotiate alternate publication schedules
  with the affected vendors when required.

* ORGANIZATION SHALL provide the vendor the opportunity to include a vendor statement within our public disclosure
  document.

* ORGANIZATION SHALL NOT withhold vendor-supplied information simply because it disagrees with our assessment of the
  problem.

* ORGANIZATION SHALL notify affected vendors of any public disclosure plans.

* ORGANIZATION SHALL NOT reveal information provided in confidence by any vendor.

* ORGANIZATION SHALL act in accordance with the expectations of Reporters set forth in this policy when acting as a
  Reporter to other organizations (vendors, coordinators, etc.).

#### Coordination with others

* ORGANIZATION MAY engage the services of a third party coordination service (e.g., CERT/CC, DHS CISA) to assist in
  resolving any conflicts that cannot be resolved between the Reporter and ORGANIZATION.

* ORGANIZATION MAY, at our discretion, provide reported vulnerability information to anyone who can contribute to the
  solution and with whom we have a trusted relationship, including vendors (often including vendors whose products are
  not vulnerable), service providers, community experts, sponsors, and sites that are part of a national critical
  infrastructure, if we believe those sites to be at risk.

#### Public disclosure

* ORGANIZATION SHALL determine the type and schedule of our public disclosure of the vulnerability.

* ORGANIZATION MAY disclose reported vulnerabilities reported to the public N days after the initial report, regardless
  of the existence or availability of patches or workarounds from affected vendors.

* ORGANIZATION MAY disclose vulnerabilities to the public earlier or later than N days due to extenuating circumstances,
  including but not limited to active exploitation, threats of an especially serious (or trivial) nature, or situations
  that require changes to an established standard.

* ORGANIZATION MAY consult with the Reporter and any affected vendor(s) to determine the appropriate public disclosure
  timing and details.

* ORGANIZATION SHALL balance the need of the public to be informed of security vulnerabilities with vendors' need for
  time to respond effectively.

* ORGANIZATION's final determination of a publication schedule SHALL be based on the best interests of the community
  overall.

* ORGANIZATION SHALL publish public disclosures via PUBLICATION CHANNEL.

* ORGANIZATION MAY disclose to the public the prior existence of vulnerabilities already fixed by ORGANIZATION,
  including potentially details of the vulnerability, indicators of vulnerability, or the nature (but not content) of
  information rendered available by the vulnerability.

* ORGANIZATION SHALL make our disclosure determinations based on relevant factors such as but not limited to: whether
  the vulnerability has already been publicly disclosed, the severity of the vulnerability, potential impact to critical
  infrastructure, possible threat to public health and safety, immediate mitigations available, vendor responsiveness
  and feasibility for creating an upgrade or patch, and vendor estimate of time required for customers to obtain, test,
  and apply the patch. Active exploitation, threats of an especially serious nature, or situations that require changes
  to an established standard may result in earlier or later disclosure.

* ORGANIZATION MAY disclose product vulnerabilities SLC after the initial contact is made, regardless of the existence
  or availability of patches or workarounds from affected vendors in cases where a product is affected and the vendor is
  unresponsive, or fails to establish a reasonable timeframe for remediation.



