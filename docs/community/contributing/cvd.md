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

### Reporters Policy

Reporters MUST adhere to the following guidelines.

#### General

* Reporters MUST comply with all applicable local and international laws in connection with security research activities
  or other participation in this vulnerability disclosure program.

* Reporters SHOULD make a good faith effort to notify and work directly with the affected vendor(s) or service providers
  prior to publicly disclosing vulnerability reports.

#### Scope of Authorized Testing

* Reporters MAY test The Mojaloop open-source software to detect a vulnerability for the sole purpose of providing The
  Mojaloop Foundation information about that vulnerability.

* Reporters SHOULD only test against test accounts owned by the Reporter or with explicit permission from the account
  holder.

* Reporters MUST avoid harm to the information systems and operations of The Mojaloop Foundation, its associates and
  users of Mojaloop open-source software.

* Reporters MUST make every effort to avoid privacy violations, degradation of user experience, disruption to production
  systems, and destruction or manipulation of data.

* Reporters MUST stop testing once that testing has established that a vulnerability exists, or sensitive data has been
  encountered. Sensitive data includes personally identifiable information, financial information (e.g., account
  numbers), proprietary information or trade secrets.

* Reporters MUST NOT test any software or services not expressly contained in The Mojaloop open-source software Github
  repositories, including any connected services.

* Reporters MUST NOT exploit any vulnerability beyond the minimal amount of testing required to prove that the
  vulnerability exists or to identify an indicator related to that vulnerability.

* Reporters MUST NOT intentionally access the content of any communications, data, or information transiting or stored
  on information systems belonging to The Mojaloop Foundation, its associates or users of Mojaloop open-source
  software – except to the extent that the information is directly related to a vulnerability and the access is
  necessary to prove that the vulnerability exists.

* Reporters MUST NOT exfiltrate any data under any circumstances.

* Reporters MUST NOT intentionally compromise the privacy or safety of The Mojaloop Foundation's personnel, customers,
  the general public, users of the Mojaloop open-source software or any legitimate third parties.

* Reporters MUST NOT use any exploit to compromise, alter, or exfiltrate data

* Reporters SHOULD NOT establish command line access and/or persistence

* Reporters MUST NOT exploit any vulnerabilities found to pivot to other systems.

* Reporters MUST NOT intentionally compromise the intellectual property or other commercial or financial interests of
  any The Mojaloop Foundation's personnel or entities, customers, the general public, users of the Mojaloop open-source
  software or any legitimate third parties.

* Reporters MUST NOT cause a denial of any legitimate services in the course of their testing.

* Reporters MUST NOT perform physical access testing (e.g. office access, open doors, tailgating, or other trespass).

* Reporters MUST NOT conduct social engineering in any form of The Mojaloop Foundation personnel its contractors,
  associates, or user of the Mojaloop open-source software, their personnel, contractors or customers.

* Reporters SHOULD contact The Mojaloop Foundation by email at [security@mojaloop.io](mailto:security@mojaloop.io) if at
  any point you are uncertain of whether to proceed with testing.

#### Coordination with The Mojaloop Foundation

* Reporters SHOULD submit vulnerability reports to The Mojaloop Foundation via secure (encrypted) email
  to [security@mojaloop.io](mailto:security@mojaloop.io).

* Reporters SHOULD submit high quality reports.

* Reporters SHOULD include sufficient descriptive details to permit The Mojaloop Foundation and/or the affected vendor(
  s) to accurately reproduce the vulnerable behavior.

* Reporters SHOULD NOT report unanalyzed crash dumps or fuzzer output unless accompanied by a sufficiently detailed
  explanation of how they represent a security vulnerability.

* Reporters SHOULD report other vulnerabilities found incidental to their in-scope testing even if those vulnerabilities
  would be otherwise considered out-of-scope. For example, while testing an in-scope system the reporter finds it to be
  exposing data from out-of-scope system. These are still reportable vulnerabilities.

* Reporters MUST keep confidential any information about vulnerabilities discovered for 90 days after you have notified
  The Mojaloop Foundation. Notwithstanding, this expectation does not preclude Reporters from simultaneously
  coordinating the vulnerability report with other affected parties (vendors, service providers, coordinators, etc.)

* Reporters MAY include a proof-of-concept exploit if available.

* Reporters MAY request that their contact information be withheld from all affected vendor(s).

* Reporters MAY request not to be named in the acknowledgements of The Mojaloop Foundation's public disclosures.

* Reporters MUST NOT submit a high-volume of low-quality reports.

* Reporters MUST NOT require The Mojaloop Foundation to enter into a customer relationship, non-disclosure agreement (
  NDA) or any other contractual or financial obligation as a condition of receiving or coordinating vulnerability
  reports.

* Reporters MUST NOT demand compensation in return for reporting vulnerability information reported outside of an
  explicit bug bounty program.

#### Coordination with vendors

* In the event that the Reporter finds a vulnerability in The Mojaloop Foundation open-source software consequent to a
  vulnerability in a generally available product or service, the Reporter MAY report the vulnerability to the affected
  vendor(s), service provider(s), or third party vulnerability coordination service(s) in order to enable the product or
  service to be fixed.

#### Coordination with others

* Reporters MAY engage the services of a third party coordination service (e.g., CERT/CC, DHS CISA) to assist in
  resolving any conflicts that cannot be resolved between the Reporter and The Mojaloop Foundation.

* Reporters SHOULD NOT disclose any details of any extant Mojaloop Foundation open-source software vulnerability, or any
  indicators of vulnerability to any party not already aware at the time the report is submitted to The Mojaloop
  Foundation.

#### Public disclosure

* Reporters MAY disclose to the public the prior existence of vulnerabilities already fixed by The Mojaloop Foundation,
  including potentially details of the vulnerability, indicators of vulnerability, or the nature (but not content) of
  information rendered available by the vulnerability.

* Reporters choosing to disclose to the public SHOULD do so in consultation with The Mojaloop Foundation.

* Reporters MUST NOT disclose any incidental proprietary data revealed during testing or the content of information
  rendered available by the vulnerability to any party not already aware at the time the report is submitted to
  The Mojaloop Foundation.

### Receivers Policy

The Mojaloop Foundation SHALL deal in good faith with Reporters who discover, test, and report vulnerabilities or
indicators of vulnerabilities in accordance with these guidelines.

#### General

* The Mojaloop Foundation MAY modify the terms of this policy or terminate the policy at any time.

* The Mojaloop Foundation SHALL use information reported to this program for defensive purposes only; to mitigate or
  remediate vulnerabilities in the Mojaloop open-source software, Mojaloop Foundation networks, applications, the
  applications of our vendors and those of users of Mojaloop open-source software.

#### Case handling

* The Mojaloop Foundation MAY, at our discretion, decline to coordinate or publish a vulnerability report. This decision
  is generally based on the scope and severity of the vulnerability and our ability to add value to the coordination and
  disclosure process.

* In the event that The Mojaloop Foundation declines to coordinate a vulnerability report, the Reporter MAY proceed to
  coordinate with any other affected vendor(s). Additionally, the Reporter MAY proceed with public disclosure at their
  discretion.

* The Mojaloop Foundation SHALL investigate every reported vulnerability and strive to ensure that appropriate steps are
  taken to mitigate risk and remediate reported vulnerabilities.

* The Mojaloop Foundation SHALL, to the best of our ability, validate the existence of the vulnerability

* The Mojaloop Foundation SHALL determine an appropriate timeframe for mitigation development and deployment for
  vulnerabilities reported in systems it controls.

#### Coordination with reporters

* The Mojaloop Foundation SHALL acknowledge receipt of vulnerability reports via email within 7 working days.

* The Mojaloop Foundation MAY contact the Reporter for further information.

* The Mojaloop Foundation SHALL inform the Reporter of the results of our validation, as appropriate, and accordingly
  provide status updates as remediation of the vulnerability is underway.

* The Mojaloop Foundation SHALL include credit to the reporter in any published vulnerability report unless otherwise
  requested by the reporter.

* In the event that The Mojaloop Foundation chooses to publicly disclose the reported vulnerability, The Mojaloop
  Foundation SHALL recognize your contribution to improving our security if you are the first to report a unique
  vulnerability, and your report triggers a code or configuration change.

* The Mojaloop Foundation MAY forward the name and contact information of the Reporter to any affected vendors unless
  otherwise requested by the reporter.

* The Mojaloop Foundation SHALL forward the name and contact information of the reporter to the affected vendors unless
  otherwise requested by the reporter.

* The Mojaloop Foundation SHALL advise the reporter of significant changes in the status of any vulnerability he or she
  reported to the extent possible without revealing information provided to us in confidence.

* The Mojaloop Foundation MAY adjust its publication timeframe to accommodate reporter constraints if that timing is
  otherwise compatible with this policy. In most cases such an adjustment would be expected to represent a delay rather
  than an acceleration of the publication schedule. Examples include delaying publication to coincide with conference
  presentations.

* The Mojaloop Foundation SHALL NOT require Reporters to enter into a customer relationship, non-disclosure agreement (
  NDA) or any other contractual or financial obligation as a condition of receiving or coordinating vulnerability
  reports.

#### Coordination with vendors

* In the event that The Mojaloop Foundation determines the reported vulnerability is consequent to a vulnerability in a
  generally available product or service, The Mojaloop Foundation MAY report the vulnerability to the affected vendor(
  s), service provider(s), or third party vulnerability coordination service(s) in order to enable the product or
  service to be fixed.

* The Mojaloop Foundation SHALL make a good faith effort to inform vendors of reported vulnerabilities prior to public
  disclosure.

* The Mojaloop Foundation SHALL forward vulnerability reports to the affected vendor(s) as soon as practical after we
  receive the report.

* The Mojaloop Foundation SHALL apprise any affected vendors of our publication plans and negotiate alternate
  publication schedules with the affected vendors when required.

* The Mojaloop Foundation SHALL provide the vendor the opportunity to include a vendor statement within our public
  disclosure document.

* The Mojaloop Foundation SHALL NOT withhold vendor-supplied information simply because it disagrees with our assessment
  of the problem.

* The Mojaloop Foundation SHALL notify affected vendors of any public disclosure plans.

* The Mojaloop Foundation SHALL NOT reveal information provided in confidence by any vendor.

* The Mojaloop Foundation SHALL act in accordance with the expectations of Reporters set forth in this policy when
  acting as a Reporter to other organizations (vendors, coordinators, etc.).

#### Coordination with others

* The Mojaloop Foundation MAY engage the services of a third party coordination service (e.g., CERT/CC, DHS CISA) to
  assist in resolving any conflicts that cannot be resolved between the Reporter and The Mojaloop Foundation.

* The Mojaloop Foundation MAY, at our discretion, provide reported vulnerability information to anyone who can
  contribute to the solution and with whom we have a trusted relationship, including vendors (often including vendors
  whose products are not vulnerable), service providers, community experts, sponsors, and sites that are part of a
  national critical infrastructure, if we believe those sites to be at risk.

#### Public disclosure

* The Mojaloop Foundation SHALL determine the type and schedule of our public disclosure of the vulnerability.

* The Mojaloop Foundation MAY disclose reported vulnerabilities reported to the public 7 days days after the initial
  report, regardless of the existence or availability of patches or workarounds from affected vendors.

* The Mojaloop Foundation MAY disclose vulnerabilities to the public earlier or later than 7 days due to extenuating
  circumstances, including but not limited to active exploitation, threats of an especially serious (or trivial) nature,
  or situations that require changes to an established standard.

* The Mojaloop Foundation MAY consult with the Reporter and any affected vendor(s) to determine the appropriate public
  disclosure timing and details.

* The Mojaloop Foundation SHALL balance the need of the public to be informed of security vulnerabilities with vendors'
  and users of Mojaloop open-source software need for time to respond effectively.

* The Mojaloop Foundation's final determination of a publication schedule SHALL be based on the best interests of the
  community overall.

* The Mojaloop Foundation SHALL publish public disclosures via one or more of email, slack, and/or the Mojaloop
  Community Central website.

* The Mojaloop Foundation MAY disclose to the public the prior existence of vulnerabilities already fixed by The
  Mojaloop Foundation, including potentially details of the vulnerability, indicators of vulnerability, or the nature (
  but not content) of information rendered available by the vulnerability.

* The Mojaloop Foundation SHALL make our disclosure determinations based on relevant factors such as but not limited to:
  whether the vulnerability has already been publicly disclosed, the severity of the vulnerability, potential impact to
  critical infrastructure, possible threat to public health and safety, immediate mitigations available, vendor
  responsiveness and feasibility for creating an upgrade or patch, and vendor estimate of time required for customers to
  obtain, test, and apply the patch. Active exploitation, threats of an especially serious nature, or situations that
  require changes to an established standard may result in earlier or later disclosure.

* The Mojaloop Foundation MAY disclose product vulnerabilities 30 days after the initial contact is made, regardless of
  the existence or availability of patches or workarounds from affected vendors in cases where a product is affected and
  the vendor is unresponsive, or fails to establish a reasonable timeframe for remediation.
