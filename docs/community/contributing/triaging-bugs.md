# Triaging Mojaloop OSS bugs

**AI Disclosure** This document includes content generated with assistance from Claude Opus 5.5. All content has been reviewed and validated by the author.

## Raising a bug / issue

If there is a bug or issue in general an issue is logged as a bug or feature request on the [project](https://github.com/mojaloop/project/issues/new/choose) repository and in some cases linked to an issue logged on the repository for that specific component.

There is a bug [template](https://github.com/mojaloop/project/issues/new?assignees=&labels=bug&template=bug_report.md&title=) that can be used and encourages use of details such as versions, expected results and other details, which help with triage and reproducing the issue.

## Once a bug is logged

1. Typically, the bug is initially triaged in the [#ml-oss-bug-triage](https://mojaloop.slack.com/messages/CMCVBHPUH) public channel on Mojaloop Slack
2. For Security and other sensitive issues, the bug is triaged on a private channel with current contributors, before information is made public at an appropriate time. Details for security issues are covered in [Disclosing Security Vulnerabilities](./cvd.md).
3. During bug triage, priority and severity are assigned to the bug after majority consensus and consultation with reporter(s), using the [categorisation process](#categorising-a-bug) below
4. Based on the priority and severity the bug is taken up by the Core team or other contributors based on a collaborative effort.
5. Once it is taken up, conversation and updates happen on GitHub issue and slack channel.

## Categorising a bug

Every triaged bug is assigned a **severity** and a **priority**. These are separate assessments:

- **Severity** describes the impact the bug has, or would have, on a Mojaloop scheme running in production.
- **Priority** describes how urgently a fix is needed, and therefore when it is scheduled.

The two are usually related, but not always. For example, a high severity bug in a component that no adopter has deployed to production yet may be given a lower priority, while a low severity bug that blocks a scheme from going live may be given a higher priority.

### Severity

Severity is assessed by asking: _if this bug occurred in a production scheme, what would the consequences be?_

| Severity | Description | Examples |
| --- | --- | --- |
| **S1 - Critical** | The scheme cannot operate, or the financial integrity of the scheme is compromised. No workaround is available. | Transfers cannot be processed; positions, balances or settlement figures are incorrect; funds are duplicated or lost; data is lost or corrupted. |
| **S2 - High** | A core function is significantly impaired for some or all participants, or there is a risk to financial integrity that can only be contained with manual intervention. A workaround may exist but is impractical to operate. | A transfer type or use case fails for a subset of participants; transactions require manual reconciliation; severe performance degradation under normal load. |
| **S3 - Medium** | A non-core function is impaired, or a core function is affected in a limited way. A workable workaround exists. | An administrative or reporting function returns incorrect results; an edge case in an API is handled incorrectly; operational tooling does not work as documented. |
| **S4 - Low** | There is little or no operational impact on the scheme. | Cosmetic issues; misleading log messages; documentation errors. |

### Priority

Priority is assessed by asking: _how soon does this need to be fixed, and in which release?_

| Priority | Description | Target |
| --- | --- | --- |
| **P1 - Immediate** | A fix is needed as soon as possible. Contributors are asked to prioritise this work over other activities. | Hotfix release of the affected supported version(s). |
| **P2 - High** | A fix is needed soon, but does not justify interrupting other work. | Next scheduled patch release. |
| **P3 - Medium** | A fix should be planned. | Scheduled into an upcoming minor release. |
| **P4 - Low** | A fix is desirable when capacity allows. | Backlog; may be suitable as a good first issue. |

When assigning priority, the following are taken into account:

- The severity of the bug
- Whether the bug affects schemes currently in production, or schemes preparing to go live
- The number of adopters likely to be affected
- Whether a workaround is available, and how practical it is to operate
- Which released versions are affected, and whether they are still supported
- Whether the bug has security implications (see [Coordinated Vulnerability Disclosure](./cvd.md))

The severity and priority are recorded on the GitHub issue, and may be revised as more information becomes available, for example once the root cause is understood.

## Triage

1. The discussion regarding the issue is open to the public for normal bugs / issues
2. Based on the discussions, a final call on the priority and severity of the issue is made by the Core team in consultation with the reporter(s).
3. The list and the process will be updated as it evolves.
4. Mojaloop bug triage slack channel #[ml-oss-bug-triage](https://mojaloop.slack.com/archives/CMCVBHPUH)

## Defect notifications

System integrators (SIs) and adopters who are actively deploying or operating Mojaloop can sign up to be notified about defects as they progress through the following stages:

1. **Identified** - a new bug has been logged
2. **Triaged** - severity and priority have been assigned
3. **Fixed** - a fix has been merged
4. **Released** - a release containing the fix is available

Notifications include, where available, a link to the GitHub issue, a summary of the bug, its severity and priority, the affected components and versions, any known workaround, and the release that contains the fix.

### Signing up

To sign up, email [bugs@mojaloop.io](mailto:bugs@mojaloop.io) with:

- Your name and organisation
- The email address(es) that notifications should be sent to
- Your role in relation to Mojaloop (for example, system integrator, scheme operator or DFSP)
- Optionally, the Mojaloop version(s) and components you have deployed

To stop receiving notifications, or to change your details, email [bugs@mojaloop.io](mailto:bugs@mojaloop.io).

### Security issues

Bugs with security implications are handled under the [Coordinated Vulnerability Disclosure](./cvd.md) process. Details of these bugs are not included in defect notifications until they can be disclosed publicly under that process.
