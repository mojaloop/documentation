
<h1>Mojaloop Vulnerability Management Process</h1>

Contents:
1. [Introduction](#1-introduction)
2. [Security committee](#2-security-committee)
3. [Handling a possible vulnerability](#3-handling-a-possible-vulnerability)
4. [Mojaloop Vulnerability Management Processes in Place](#4-mojaloop-vulnerability-management-processes-in-place)
5. [Scope](#5-scope)

<h3>1. Introduction</h3>

This document outlines the Mojaloop Vulnerability Management Process, providing guidelines for the Mojaloop community on identifying, reporting, assessing, and addressing security vulnerabilities within Mojaloop software. By adhering to recognized security standards, such as ISO 27001, Mojaloop ensures a consistent approach to maintaining security and resilience.

This process is based on Mojaloop's established processes, ensuring a well-defined scope and guidelines that adopters of the software can rely on. It emphasizes responsible handling of vulnerabilities until verified fixes are available and properly communicated.

A structured, transparent, and effective vulnerability management process is essential for maintaining trust and safeguarding the Mojaloop ecosystem.

<h3>2. Security Committee</h3>

Mojaloop's vulnerability management process is supported by a designated "Security Committee," a core group responsible for coordinating all aspects of vulnerability management. This committee oversees the process, including:

1. Reviewing and validating vulnerability reports.
2. Deciding on the acceptance or rejection of reported vulnerabilities.
3. Defining appropriate fixes and planning announcements.
4. Coordinating releases that include security patches.

The Security Committee is composed of core contributors and community leaders who ensure the efficient and secure handling of vulnerabilities within Mojaloop. Its structure and responsibilities are designed to maintain the security and integrity of the Mojaloop ecosystem.

<h3>3. Handling a Possible Vulnerability</h3>

Mojaloop vulnerability disclosure (CVD) policy: [https://docs.mojaloop.io/community/contributing/cvd.html](https://docs.mojaloop.io/community/contributing/cvd.html) 

The default process for managing a possible security vulnerability in Mojaloop is outlined in the above link. Projects that require a different process must document it clearly and publicly.

The process for general third-party dependencies and other open source modules is outlined in the [dependency vulnerability management](dependency-vulnerability-management.md) guide.

<h4>Security for Mojaloop Community Members</h4>

Mojaloop community members and member organizations play a vital role in the vulnerability management process, particularly in handling potential vulnerabilities according to defined procedures. The following guidance outlines the expected steps:

* Avoid entering details of security vulnerabilities in public bug trackers, unless access is strictly limited.
* Security communications should be limited to private channels designated for this purpose. These channels are not notification systems for the general public.

<h4>Work in Private</h4>

Information about a vulnerability should not be made public until a formal announcement is issued at the end of the process. This means:

* **Do not create public issue tracker tickets (e.g. GitHub/Zenhub) to track the issue**, as this would make it public.
* **Messages associated with code commits should not reference the security nature of the commit.**
* **Discussions regarding the vulnerability, potential fixes, and announcements should occur on private channels**, such as a project-specific security mailing list or a private channel for maintainers.
* Work with Mojaloop security team (security at mojaloop dot io) to follow the CVD process: https://docs.mojaloop.io/community/contributing/cvd.html

<h4>Report</h4>

The person discovering the issue (the reporter) should report the vulnerability by completing the report and emailing it to: **[security@mojaloop.io](mailto:security@mojaloop.io)** . Report templates can be follow the bug template here: https://github.com/mojaloop/project/issues .

List of issues that are deemed relevant:
1. Security issues / vulnerabilities in Mojaloop core services (application codebase)
2. Security issues / vulnerabilities in Mojaloop supporting services
3. Wide-spread or day-zero issues in latest versions of critical dependencies Mojaloop's core and supporting services use (such as nodejs, kafka, mysql)

List of issues that are not deemed critical or of low priority and responses may be delayed:

1. Vulnerabilities regarding [mojaloop.io](mojaloop.io) website
2. Vulnerabilities regarding [docs.mojaloop.io](docs.mojaloop.io) website

<h4>Acknowledge</h4>

The Mojaloop security team should send an email to the original reporter to acknowledge receipt of the report. This acknowledgment should ideally include a copy to the relevant private security mailing list.

<h4>Investigate and Respond</h4>

The team investigates the report and either rejects or accepts it.

1. Information may be shared with domain experts privately, provided they understand it is not for public disclosure.
2. If rejected, the team explains the decision to the reporter, with a copy to the relevant security mailing list.
3. If accepted, the team notifies the reporter that the report is being addressed.

<h4>Resolve</h4>

* The team agrees on a fix, typically on a private list.
* Details of the vulnerability and the fix should be documented to generate draft announcements.
* The reporter may be provided with a copy of the fix and the draft announcement for comment.
* The fix is committed without any reference in the commit message that it relates to a security vulnerability.
* A release that includes the fix is created. More details are included in the Mojaloop CVD policy.

<h4>Announce</h4>

* After the release, the vulnerability and fix are publicly announced.
* The announcement should be sent to relevant destinations, including the vulnerability reporter, project security lists, and possibly public security lists.

<h4>Complete</h4>

The project's public security pages should be updated with information about the vulnerability, ensuring transparency for users.

<h3>4. Mojaloop Vulnerability Management Processes in Place</h3>

Mojaloop has established a series of robust processes and tools to manage vulnerabilities throughout the software development lifecycle, ensuring alignment with industry best practices, including ISO 27001 standards for vulnerability identification and mitigation.

<h4>Vulnerability Management</h4>

Continuous monitoring of open-source components for vulnerabilities is integrated into the CI/CD pipeline. This process is automated to assess each release, commit, and pull request, leveraging Node Package Manager (NPM) for dependency vulnerability assessments.

<h4>Static Application Security Testing (SAST)</h4>

Mojaloop uses multiple tools for SAST, providing detailed insights into code-level vulnerabilities by leveraging public vulnerability databases, including:

1. **GitHub Security Tools:** Including Dependabot for dependency scanning (relying on GitHub’s Advisory Database), CodeQL for code analysis, and Secret Scanning to prevent the inclusion of sensitive information.
2. **SonarCloud:** Analyzes every commit, pull request, and release for code quality and security issues, utilizing vulnerability data from public databases such as CVE (Common Vulnerabilities and Exposures).

<h4>Software Bill of Materials (SBOM) and Dependency Management</h4>

An SBOM tool is used to generate an inventory of third-party dependencies, allowing for:

1. Identification of vulnerabilities and license compliance issues.
2. Regular reporting for regulatory and security assessments.
3. Ongoing monitoring of library versions across all repositories.
4. Ensuring well maintained and managed packages / dependencies are used and outdated ones are managed accordingly.

Here's more information about SBOM in Mojaloop: https://github.com/mojaloop/ml-depcheck-utility?tab=readme-ov-file#sbom-generation-tool-for-mojaloop-repositories 

<h4>Container Security</h4>

Container images are scanned for vulnerabilities using Grype before release. Grype is configured following best practices and stricter configurations are recommended for adopters. Grype configuration from the CI Orb Mojaloop uses: https://github.com/mojaloop/ci-config-orb-build?tab=readme-ov-file#vulnerability-image-scan-configuration .

<h4>License Compliance</h4>

An automated license scanner ensures that only components with compatible licenses are used. Compliance checks are integrated into the CI/CD processes, blocking non-compliant code from being merged or deployed.

<h4>Provenance of Images</h4>

Following Mojaloop Release (v17.1.0), Mojaloop's helm charts are signed at publishing and can be verified at install / deploy time (This feature has native helm support in helm), to ensure provenance of artefacts related to charts. In the future this can be extended to other artefacts such as images.

<h4>Mojaloop CI/CD Security Process</h4>

Mojaloop employs a CI/CD pipeline that automatically integrates security checks throughout the software development process. This ensures consistent security application without manual oversight. Branch protection rules enforce continuous checks on every commit, pull request, and release.

CI/CD Security Integration:

1. **Container Security: **…
2. **License Compliance:** …
3. **Dependency Vulnerability Scanning:** …

All critical vulnerabilities are logged, and the CI/CD pipeline will block publishing images or packages until these issues are resolved. These automated security measures in the CI/CD pipeline guarantee that code is continuously tested, secure, and compliant, maintaining high security standards across the development process.

<h4>Coordinated Vulnerability Disclosure (CVD)</h4>

Mojaloop operates a CVD process, ensuring responsible parties have adequate time to address and remedy vulnerabilities before public disclosure.

Mojaloop vulnerability disclosure (CVD) policy: [https://docs.mojaloop.io/community/contributing/cvd.html](https://docs.mojaloop.io/community/contributing/cvd.html) 

<h4>Reporting and Compliance</h4>

Comprehensive reports are generated after each scan, detailing outcomes, remediation actions, and their effectiveness.

All reports are stored for auditing and compliance, ensuring transparency and accountability.

Report from license scanning at helm level is provided with Mojaloop release notes (also confirms that license scanning step has passed and only includes allowed licenses). The license summary file is attached to the release notes (present at the bottom): [https://github.com/mojaloop/helm/releases/tag/v17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) provides an example.

Image scanning reports are present for review in the CI tool (circleCI) to record either failure or pass result (but the workflow moves forward only if this step passes). For example / reference, a sample Grype scanning result here: [https://app.circleci.com/pipelines/github/mojaloop/account-lookup-service/2165/workflows/d420ef53-85a7-46d3-af1e-1527baf3a207/jobs/16509/artifacts](https://app.circleci.com/pipelines/github/mojaloop/account-lookup-service/2165/workflows/d420ef53-85a7-46d3-af1e-1527baf3a207/jobs/16509/artifacts) (though this might go out-of-date with time, it is given as an example)

<h3>5. Scope</h3>

The Mojaloop vulnerability management process applies to all components that are part of the Mojaloop Helm release. 

This includes:

1. All core components and services are explicitly defined in the Mojaloop Helm charts.
2. Dependencies included within the Mojaloop Helm release, which are automatically scanned as part of the vulnerability management process.

Exclusions:

1. Repositories that are not part of the Mojaloop core release are considered non-production and are excluded from the vulnerability management process.
2. External components required for a typical Mojaloop deployment (e.g., MySQL, Redis, MongoDB, Kafka) are not maintained by the Mojaloop Foundation and are excluded from this vulnerability management process meant for Mojaloop's application codebase, though they are part of the general vulnerability management (as third-party OSS dependencies).

This approach ensures that the Mojaloop core components are consistently secured, while also clarifying the boundary of responsibility regarding external dependencies and providing guidance regarding other (or third-party) OSS packages, dependencies and tools.

<h2></h2>
