# Policy on the Responsible Use of Artificial Intelligence (AI) Tools by Community Members

- Version: 1.0
- Effective Date: 2026-02-16
- Author: James Bush (jbush@mojaloop.io)
- Applies To: All contributors, maintainers, adopters, and participants in the Mojaloop Foundation community and its associated projects, including repositories under the Mojaloop GitHub organisation.

**AI Disclosure** This document includes content generated with assistance from ChatGPT 5.2. All content has been reviewed and validated by the author.

---

## 1. Purpose

This policy establishes clear and pragmatic guidelines for the responsible use of Artificial Intelligence (AI) tools within the Mojaloop community.

The Mojaloop Foundation supports innovation and productivity enhancements, including the use of AI-assisted tools. However, transparency, accountability, and community trust remain paramount. This policy ensures that AI use enhances collaboration without undermining openness, authorship integrity, or technical quality.

---

## 2. Guiding Principles

All AI use within the Mojaloop community must adhere to the following principles:

1. **Human Accountability** – A human contributor is always responsible for the final output.
2. **Transparency** – Use of AI-generated content must be clearly disclosed.
3. **Quality and Security** – AI-generated outputs must meet Mojaloop’s engineering and documentation standards.
4. **Community Integrity** – AI must not be used in ways that disrupt or overwhelm community processes.

---

## 3. Permitted Uses of AI Tools

### 3.1 AI as Note-Takers in Community Calls

AI tools may be used to take notes during **public Mojaloop community calls**, subject to the following conditions:

- The AI tool user **must be personally present** in the call unless prior authorisation is obtained from the meeting host.
- AI note-taking tools may not join calls independently of a human participant without explicit prior authorisation from the meeting host.
- Anonymous AI bots are not permitted. All AI bots must disclose publicly the human community member they represent.
- AI note-taking tools may only join calls where call recording is enabled.

**Rationale:**
The Mojaloop community values open discussion and psychological safety. The presence of numerous unattended recording or summarisation bots may discourage participation and negatively affect collaboration.

---

### 3.2 AI Assistance in Documentation

Community members may use AI tools to assist with:

- Drafting documentation
- Improving clarity or grammar
- Reformatting content
- Generating summaries
- Translating content

However:

- Any document in which AI has generated **any portion of the content** must contain a clear statement in the document header specifying:
  - That AI tools were used
  - Which AI tool(s) were used

**Example Disclosure Statement:**

  _This document includes content generated with assistance from [Tool Name]. All content has been reviewed and validated by the author._

Failure to disclose AI-assisted generation may result in the document being rejected or returned for correction.

**Rationale:**
Transparency maintains trust in authorship and allows readers to assess provenance appropriately.

---

### 3.3 AI Assistance in Code Creation and Debugging

AI tools may be used for:

- Code generation
- Code suggestions
- Refactoring assistance
- Debugging support
- Test generation
- Documentation generation for code

However, the following rules strictly apply:

#### 3.3.1 Human Submission Requirement

- All pull requests (PRs), issues, and code submissions must be made by human contributors.
- Fully automated AI agents may not submit PRs, bug fixes, or code changes.
- All pull requests (PRs), issues, and code submissions must follow the Mojaloop community product engineering process requirements.
- The only exception is officially supported automated tools already integrated into GitHub workflows (e.g., dependency update bots such as Dependabot).

Any automated agent submissions beyond approved GitHub-native tools will be **dismissed without review**.

---

#### 3.3.2 Mandatory Human Review

All AI-assisted code:

- MUST be thoroughly reviewed by the human submitter.
- MUST be understood in full by the submitter.
- MUST meet Mojaloop coding standards and architectural principles.
- MUST pass all automated tests and validation pipelines.

Code that is clearly AI-generated and has not been properly reviewed, validated, and understood by the human author will not be accepted into the codebase.

The human contributor submitting the PR retains full accountability for:

- Correctness
- Security
- Licensing compliance
- Architectural consistency
- Long-term maintainability

**Rationale:**
Mojaloop operates in the financial services domain. The integrity, security, and correctness of code are non-negotiable.

---

## 4. Prohibited Uses

The following uses of AI are not permitted within Mojaloop community processes:

- Unattended AI bots joining community calls.
- Fully autonomous AI agents submitting PRs or issues.
- Submitting AI-generated content without required disclosure (where applicable).
- Delegating architectural or design decisions to AI tools.
- Using AI tools to scrape, summarise, or redistribute restricted or confidential information without permission.

---

## 5. Enforcement

Maintainers and reviewers may:

- Request disclosure statements be added.
- Reject PRs that appear insufficiently reviewed.
- Close automated agent submissions without comment.
- Request clarification regarding AI involvement.

Repeated or deliberate violations may be escalated in accordance with Mojaloop community governance procedures.

---

## 6. Future Review

AI capabilities evolve rapidly. This policy will be reviewed periodically by the Mojaloop Foundation and community maintainers to ensure it remains appropriate, practical, and aligned with community values.

---

## 7. Summary

AI tools are permitted within the Mojaloop community when used responsibly and transparently.

- Humans must remain accountable.
- AI must not overwhelm community processes.
- Disclosure is required in documentation.
- Code must always be reviewed and submitted by a human.

The Mojaloop Foundation encourages thoughtful adoption of AI tools in ways that strengthen, not dilute, the quality, trust, and collaborative spirit of the Mojaloop ecosystem.

