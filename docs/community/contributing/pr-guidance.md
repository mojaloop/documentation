# Pull Request Guidelines

> **Applies to:** All contributors submitting pull requests to repositories under the [Mojaloop GitHub organisation](https://github.com/mojaloop).
> These guidelines complement the [Contributors' Guide](contributors-guide.md), the [AI Policy](../standards/ai_policy.md), and the [Product Engineering Process](product-engineering-process.md).

**AI Disclosure** This document includes content generated with assistance from Claude Sonnet 4.6. All content has been reviewed and validated by the author.


---

## 1. Before You Open a PR

### 1.1 Start With a GitHub Issue

Every PR must be linked to a GitHub Issue. Do not open a PR without one.

- If a relevant issue does not exist, **create it first** and allow time for triage or discussion before beginning implementation — especially for non-trivial changes.
- Issues are the primary space for design discussion, scoping decisions, and alignment with maintainers. Use them.


### 1.2 Discuss Consequential or Critical Changes First

If your change touches shared interfaces, settlement or clearing logic, core APIs, or security-sensitive code, review the [Consequential Change Process](https://docs.mojaloop.io/community/contributing/consequential-change-process.html) and [Critical Change Process](https://docs.mojaloop.io/community/contributing/critical-change-process.html) **before writing any code**. Raising a large architectural change as a surprise PR will result in it being returned for prior discussion.

---

## 2 Pull Request Titles

Mojaloop uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to help our automated tooling manage releases and deployments. Your Pull Request title **must** conform to the conventional commits specification to pass the CI/CD checks in CircleCI.

By adopting Conventional Commits + Semantic Versioning we can automatically release a new version for a given component and increment the `MAJOR`, `MINOR` and `BUGFIX` versions based soley on the PR titles, and auto generate rich changelogs. (See [this example](https://github.com/mojaloop/thirdparty-scheme-adapter/releases/tag/v11.20.0) of an auto generated changelog)

> **Note**:
> When merging (and squashing) a PR, GitHub uses the *title* of the PR for the git commit message. This means that to specify a breaking change, you must use the `!` format:
> "If included in the type/scope prefix, breaking changes MUST be indicated by a ! immediately before the :. If ! is used, BREAKING CHANGE: MAY be omitted from the footer section, and the commit description SHALL be used to describe the breaking change."

#### Examples of good PR titles

- feat(api): add ability to handle `PUT /thirdpartyRequests/trasactions/{ID}` endpoint
- fix: update outdated node modules
- feat(models)!: change database schema
- chore: tidy up readme

---

## 3. Keep PRs Small and Focused

This is the single most important thing you can do to help reviewers and maintainers.

### 3.1 One PR, One Purpose

A pull request should do exactly one thing: fix one bug, implement one feature, or address one concern. Mixed-purpose PRs are hard to review, hard to revert if something goes wrong, and create ambiguous commit history.

**Do not combine:**
- A bug fix and a refactor
- A feature and unrelated test clean-up
- Dependency updates and functional changes
- Whitespace changes with functional changes

If you find yourself writing "and also..." in the PR description, that is a signal to split the PR.

Note that changes to lots of whitespace e.g. reindenting, can obscure the purpose of an underlying change. Separate large whitespace changes into their own PRs to ease the review process.

### 3.2 Target an Appropriate Diff Size

There is no hard line-count limit, but as a practical guide:

| Diff size | Expectation |
|---|---|
| < 200 lines | Ideal. Can be reviewed quickly and thoroughly. |
| 200 – 500 lines | Acceptable for well-scoped changes with good context. |
| 500 – 1000 lines | Requires strong justification. Consider splitting. |
| > 1000 lines | Will likely be returned and asked to be broken up unless the change is inherently atomic (e.g. a generated file, a large rename). |

When a large change is genuinely atomic — such as a schema migration, a code generation output, or a bulk rename — add a note explaining why it cannot be split.

### 3.3 Separate Refactoring From Functional Changes

If you need to refactor code before making a functional change, raise the refactor as its own PR first. Mixing refactoring and behaviour changes makes it difficult to verify that no regressions have been introduced.

### 3.4 Keep Commits Clean

Squash or reorganise your commits before opening the PR so that each commit represents a logical, self-contained step. Avoid commits like `fix typo`, `wip`, or `try again`. A clean commit history helps reviewers and makes `git bisect` useful.

---

## 4. Writing a Good PR Description

A well-written description is not optional — it is part of your contribution. Reviewers should not have to reverse-engineer your intent from the diff.

Your PR description must include:

### 4.1 What and Why

Explain **what** the change does and **why** it is needed. Link to the relevant GitHub Issue. Do not simply restate the issue title — add the context a reviewer needs to evaluate your implementation choices.

### 4.2 How to Test

Describe how the reviewer can verify the change works correctly. Include:
- Steps to reproduce the issue (for bug fixes)
- How to exercise the new behaviour (for features)
- Pointers to the relevant automated tests

If a change cannot be automatically tested, explain why and describe the manual verification you performed.

### 4.3 Breaking Changes

If your PR introduces any breaking change — to an API, a configuration interface, a database schema, or a shared contract — call this out **explicitly and prominently** at the top of the description. Breaking changes require additional review and may need to follow the [Consequential Change Process](https://docs.mojaloop.io/community/contributing/consequential-change-process.html).

### 4.4 AI Assistance Disclosure (see Section 4)

If AI tools were used in producing any part of the PR — code, tests, or PR description — this must be disclosed in the PR description. See Section 4 for the required format.

---

## 5. AI Assistance: Attribution and Accountability

The [Mojaloop AI Policy](https://docs.mojaloop.io/community/standards/ai_policy.html) applies to all PR contributions. The following rules distil that policy into concrete PR requirements.

### 5.1 Disclosure Is Mandatory

If any AI tool (including but not limited to GitHub Copilot, ChatGPT, Claude, Gemini, Cursor, or similar) assisted in producing **any part of your PR** — including code, tests, commit messages, or the PR description itself — you must include the following disclosure block in your PR description:

```
**AI Assistance Disclosure**
AI tools were used in producing part of this contribution.
Tools used: [list tool(s) and version(s) where known]
Scope: [brief description of what was AI-assisted, e.g. "unit test scaffolding", "initial implementation of X function", "PR description draft"]
All AI-generated content has been reviewed, understood, and validated by the author.
```

All code files in the Mojaloop GitHub org must include a license and contributors header. Ensure any files you change have your name and current email address in the list. If you have used AI you should include details of the tools used alongside your name and email thus:

```
 - {your name} <{your email}> [Assisted by {model name} {model version}] 
```

e.g.
```
/*****
 License
 --------------
 Copyright © 2026 Mojaloop Foundation

 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0
 (the "License") and you may not use these files except in compliance with the [License](http://www.apache.org/licenses/LICENSE-2.0).

 You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the [License](http://www.apache.org/licenses/LICENSE-2.0).

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - James Bush <jbush@mojaloop.io> [Assisted by Claude Sonnet 4.6]

 --------------
 ******/
```

Omitting this disclosure when AI was used is a violation of the AI Policy and will result in the PR being returned.

### 5.2 You Are Fully Accountable for All Submitted Code

Disclosure is not a waiver of responsibility. Whether or not AI assistance was used, the human author of the PR is fully accountable for:

- The **correctness** of the logic
- The **security** of the implementation
- **Architectural consistency** with Mojaloop standards
- **Licensing compliance** — you must not submit AI-generated code derived from impermissibly licensed training data
- **Long-term maintainability** of what you have introduced

"The AI wrote it" is not an acceptable response to a review comment. If you cannot explain and defend every part of your PR, it is not ready to submit.

### 5.3 AI Must Not Substitute for Human Judgment

AI tools may not be used to make or delegate architectural or design decisions. Where an AI tool proposes an approach that deviates from established Mojaloop patterns or invariants, the human contributor is responsible for recognising this and correcting it before submission.

### 5.4 Automated Agent Submissions Are Prohibited

PRs may not be submitted by fully autonomous AI agents. All PRs must be opened by a human contributor. The only exception is officially sanctioned GitHub-native automation already integrated into Mojaloop workflows (e.g. Dependabot, Snyk, Mojaloop Foundation Automated tooling for maintenance). Automated agent submissions will be dismissed without review.

---

## 6. Code Quality Checklist

Before marking a PR ready for review, confirm the following:

- The PR is linked to a GitHub Issue with a closing keyword
- The PR does exactly one thing; unrelated changes have been removed or split out
- All automated tests pass locally
- New behaviour is covered by tests
- No new linting errors or warnings have been introduced
- Dependency changes are justified and minimal
- Any breaking changes are clearly flagged
- The PR description explains what, why, and how to test
- AI assistance disclosure is included if applicable (see Section 4.1)
- You have read, understood, and can defend every line of the diff

---

## 7. Reviewer Expectations

Reviewers are volunteers giving their time. Help them help you.

- **Respond promptly** to review comments. If you need time, say so.
- **Do not push unrelated changes** to a PR that is already under review without flagging them.
- **Do not rebase or force-push** a PR that has active review comments — it disrupts the reviewer's context. Coordinate first.
- If a reviewer asks you to split a PR, do so. This is not a criticism; it is how Mojaloop maintains a reviewable and bisectable history.
- A PR with no activity for **30 days** may be closed by a maintainer. It can be reopened when you are ready to continue.

---

## 8. Draft PRs

Use GitHub's **Draft PR** feature for work in progress. This signals to maintainers and reviewers that feedback on overall direction is welcome but a full review is not yet requested. Convert to "Ready for Review" only when all checklist items above are satisfied.

---

## 9. Hotfixes and Urgent Changes

For critical security fixes or production-breaking bugs, follow the [Critical Change Process](https://docs.mojaloop.io/community/contributing/critical-change-process.html). Even under time pressure, the AI disclosure requirement and the code quality checklist still apply. A fast review is not a licence to skip them.

---

*For questions about these guidelines, post in the relevant workstream Slack channel or open a GitHub Issue against the [documentation repository](https://github.com/mojaloop/documentation).*