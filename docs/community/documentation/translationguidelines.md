# Mojaloop Documentation Translation Rules & Guidelines

> **Status:** Release 1.0
> 
> **Applies to:** Everyone translating, reviewing, or merging localized content in the `mojaloop/documentation` repository.
> 
> **Companion documents:** Contributing guide, Contributors guide, PR guidance, AI usage policy.

These guidelines establish the normative framework for the creation and lifecycle of localized content. **Part 1** details universal principles that remain binding across all locales for every contributor, reviewer, and maintainer. **Part 2** outlines the mandatory composition of locale-specific annexes, which codify regional standards for register, typography, and authoritative terminology. Onboarding a new language requires providing a guide that adheres to Part 1 without superseding or conflicting with its general rules.

---

## Part 1 — General rules (all locales)

### 1. Principles

- **English is the single source of truth:** `docs/**` outside a locale directory is canonical. A translation reflects the English page; it never leads it.
- **Translate the whole page, not the gist:** Fidelity beats concision — see [§4](#4-fidelity).
- **A translation is documentation, not a side artifact:** It is held to the same lint, review, and build standards as English content.
- **Consistency outranks personal preference:** Where the glossary decides a term, the glossary wins, even if a reviewer would phrase it differently.

### 2. Repository layout and the mirroring rule

Each locale lives under `docs/<locale>/` and mirrors the English tree exactly:

| English source | French translation |
| --- | --- |
| `docs/getting-started/README.md` | `docs/fr/getting-started/README.md` |
| `docs/technical/api/fspiop/glossary.md` | `docs/fr/technical/api/fspiop/glossary.md` |

**Rules:**

- **Never translate a path.** Directory names, file names, and file extensions stay identical to the English source. `docs/fr/adoption/` — not `docs/fr/adoption-fr/`, not `docs/fr/adhésion/`.
- **Never invent locale-only pages** without first adding the English source page. If content only makes sense for one locale, raise it as an English page first, or discuss it in an issue.
- **Never delete a translated page** because the English one was reorganized — move it to the matching new path in the same PR.
- **One English page maps to exactly one translated page.** No splitting, no merging.

### 3. What is translated and what is not

**Translate:**

- Body prose, headings, list items, table cell content, table headers
- Link text (the `[...]` part), image alt text (the `![...]` part)
- Blockquote and admonition text, including `Note` / `Warning` labels
- Frontmatter values that are user-visible: `tagline`, `title`, `actionText`, `features[].title`, `features[].details`
- Comments in example code **only** where they are explanatory prose, never where they are part of a copy-pasteable command

**Never translate:**

- File paths, directory names, anchors, and URLs
- Frontmatter keys (`home:`, `heroImage:`, `sidebar:`) and non-textual values (`heroImage: /mojaloop_logo_med.png`)
- Code blocks, inline code spans, CLI commands, environment variables, config keys
- API artefacts: endpoint paths, HTTP methods and headers, JSON/YAML field names, enum values, error codes (`3100`, `payerFsp`, `POST /quotes`)
- Component, repository, and service names: `central-ledger`, `ml-api-adapter`, `sdk-scheme-adapter`, `account-lookup-service`
- Product, organisation, and standards names: Mojaloop, Mojaloop Foundation, FSPIOP, ISO 20022, Kubernetes, Helm, Docker
- Conventional Commit types (`feat:`, `fix:`, `chore:`) and Git/GitHub UI terms rendered as literals
- License headers and the Apache-2.0 license text
- Slack channel names (`#general`, `#help-mojaloop`) and GitHub labels

**Judgement calls:** an English technical term used as a term of art in the target language may stay in English (see the French annex, [§A.3](#a3-terms-kept-in-english)). Decide once, record it in the glossary, apply it everywhere.

### 4. Fidelity

This is the rule most often broken in this repository, and the one that has generated the most review churn.

- **Do not summarise.** If the English paragraph has four clauses, the translation has four clauses. Condensing a sentence because the point "is already clear" is a defect, not an edit.
- **Do not drop content.** Every heading, list item, table row, note, caveat, example, and link in the source appears in the translation.
- **Do not add content.** No new examples, no clarifying sentences the English page does not have. If the English page is wrong or unclear, fix it upstream in English ([§9](#9-synchronisation-and-drift)) — do not patch it in the translation only.
- **Preserve structure.** Heading levels, list nesting, numbering, table shape, and code-block boundaries are identical to the source.
- **Preserve register.** Normative language stays normative: `MUST` / `SHOULD` / `MAY` keep their RFC 2119 force. Do not soften an obligation into a suggestion.
- **Preserve hedging.** "may", "is expected to", "typically" carry meaning in specifications. Translate the hedge, do not resolve it.

### 5. Links

- **Cross-locale links are a bug.** A link from `docs/fr/**` must resolve inside `docs/fr/**`. `[Consulter les API](/api/)` sends a French reader to an English page; it should target the localized path where one exists.
- **Prefer relative links** (`./demos/why-mojaloop.md`, `../getting-started/faqs.md`). They survive locale duplication automatically; root-absolute links do not.
- Where the target genuinely has no translation (external sites, the generated API reference under `/api/`), keep the English target and make it evident in the link text.
- **Keep the file extension exactly** as the English source has it. This repository mixes `./faqs` and `./license.md`; match the source rather than normalising.
- **Anchors** (`#post-participants`) are generated from the target page's headings. If you translate a heading, every link pointing at its anchor — in any locale — must be updated in the same PR.

### 6. Images, diagrams, and assets

- **Shared raster assets are not duplicated.** Screenshots and PNGs under `docs/.vuepress/public/` are referenced from all locales. Translate the alt text, keep the path.
- **Translate alt text always.** It is user-visible and accessibility-relevant.
- **Diagrams with embedded text** (`.plantuml` + generated `.svg` under `assets/diagrams/`) are duplicated per locale. If you translate the labels:
  - edit the `.plantuml` source, never the generated `.svg`;
  - regenerate with `npm run build:plantuml:diff` (or `:all`) and commit both files;
  - keep participant/component identifiers in English, translate captions and notes only.
- **When in doubt, leave the diagram in English.** An untranslated diagram is a known gap; a hand-edited SVG that drifts from its source is a maintenance trap.

### 7. Site configuration

Navigation is not derived from the file tree. Every locale has its own blocks in `docs/.vuepress/config.js`:

- `themeConfig.locales['/fr/']` — `selectText`, `label`, and the top `nav`
- `themeConfig.sidebar['/fr/adoption/']`, `['/fr/technical/']`, `['/fr/community/']` … — the sidebar trees
- `locales['/fr/']` — `lang: 'fr-FR'`, title, description

**Rules:**

- A new or moved translated page must be added to the matching sidebar block in the same PR. A page absent from the sidebar is effectively unpublished.
- Sidebar `title` and `nav` `text` are translated; `link` values point at the locale's own paths.
- After a config change, verify locally with `npm run dev` that the language switcher lands on the equivalent page and the sidebar renders.

### 8. Terminology and the glossary

- Each locale annex holds a normative glossary. **One source term maps to exactly one target term** across the whole locale.
- **Extending the glossary is a deliberate act.** New or contested terms are proposed in the PR that first needs them, agreed by the reviewers, and added to the annex in that same PR — not left to be "regularised later".
- **Changing an agreed term is a repo-wide change.** Do it in a dedicated PR that updates every occurrence, with the glossary row updated in the same commit. Do not leave two spellings alive.
- **The glossary is not a style suggestion.** A reviewer may reject a PR solely for glossary drift.

### 9. Synchronisation and drift

English changes; translations must follow.

- **`updated` is a signal, not a guarantee.** The check compares paths, not content. Human review is still required.
- **English-first for corrections.** If you find an error in the English source while translating — a broken link, a wrong term, or a stale statement — open a separate PR against the English page. Do not silently correct it in the translation; that creates a divergence the drift checker cannot see.
- **Locale PRs that lag are expected; locale PRs that hide the lag are not.** If you cannot translate an English change immediately, say so in the PR and open a follow-up issue rather than leaving the report unexplained.

### 10. Machine translation and AI assistance

Machine translation is permitted as a first draft only, and is governed by the [Mojaloop AI usage policy](./docs/community/standards/ai_policy.md) and [§5 of the PR guidance](./docs/community/contributing/pr-guidance.md).

- **Disclosure is mandatory.** If any part of a PR — including translated prose — was produced with an AI or MT tool, include the AI assistance disclosure block in the PR description, listing the tools and the scope.
- **You are responsible for the output.** "The tool translated it that way" is not an acceptable response to a review comment.
- **Every machine-translated line must be read and corrected by a human** who understands both the language and the payments domain. MT reliably fails on Mojaloop's exact vocabulary — quotes, settlement, clearing, switch, scheme — which is precisely the vocabulary that matters.
- **Never machine-translate inside code blocks or API field names.** Verify that the tool did not.

### 11. Branching, commits, and PRs

- **Branch naming:** `i18n-<locale>/<area>` — e.g. `i18n-fr/technical`, `i18n-fr/adoption`. Review-feedback branches: `i18n-<locale>/remarks`.
- **PR titles follow Conventional Commits,** in English, and name the locale and area:
  - `feat(i18n-fr): translate technical/reference-architecture pages`
  - `fix(i18n-fr): correct settlement terminology in adoption pages`
- **One area per PR.** Do not mix a new translation with a terminology sweep or with English source fixes. Split them.
- **Keep diffs reviewable.** The [PR size guidance](./docs/community/contributing/pr-guidance.md#32-target-an-appropriate-diff-size) applies. A bulk terminology rename is inherently atomic — say so in the description.
- **PR descriptions are in English** (the repository's working language); reviewer discussion may be in the locale's language.

### 12. Review

Every translation PR needs:

1. **A language reviewer** — fluent in the target language, checks fluency, register, typography, and glossary compliance.
2. **A domain reviewer** — checks that the payments and Mojaloop semantics survived the translation. Where one person credibly covers both, one reviewer plus a maintainer is acceptable.

Reviewers check, in order: fidelity ([§4](#4-fidelity)) → terminology ([§8](#8-terminology-and-the-glossary)) → links and structure ([§5](#5-links)) → fluency. A fluent paragraph that changes the meaning of a specification is a blocking defect; a slightly stiff sentence is not.

### 13. Definition of done

Before marking a translation PR ready for review:

- [ ] Path mirrors the English source exactly
- [ ] Whole page translated — nothing summarised, dropped, or added
- [ ] Heading levels, lists, tables, and code blocks structurally identical to the source
- [ ] Code, API field names, component names, and commands untouched
- [ ] Glossary terms applied consistently; any new term added to the annex in this PR
- [ ] All internal links resolve within the locale; anchors verified
- [ ] Image alt text translated; shared asset paths unchanged
- [ ] Diagrams: `.plantuml` edited and `.svg` regenerated, or left in English deliberately
- [ ] `docs/.vuepress/config.js` sidebar and nav updated for new or moved pages
- [ ] `npm run lint` passes
- [ ] `npm run dev` renders the page, the sidebar, and the language switcher correctly
- [ ] Drift report reviewed; any `missing` / `needs_review` entry explained in the PR description
- [ ] AI/MT disclosure included if applicable

---

## Part 2 — Locale Translation Guides

Every locale **MUST** provide its own translation annex. These guides contain the specific rules that cannot be generalized across the entire Mojaloop repository.

The universal principles in Part 1 are binding. An annex **MUST NOT** supersede or conflict with them. A locale guide defines:

- Linguistic register and target voice
- Typographic and formatting standards
- Technical terms preserved in English
- Normative glossary of approved terms
- Localized translation traps to avoid
- Linguistic review criteria

Annexes are stored at:

```
docs/community/contributing/translations/locales/<locale>.md
```

Examples include:

```
docs/community/contributing/translations/locales/fr.md
docs/community/contributing/translations/locales/pt.md
docs/community/contributing/translations/locales/es.md
```

### 2.1 Locale guide structure

The following sections are MUST-haves for every locale guide.

#### Register and voice

Establishes the prose style for the localized documentation, specifically covering:

- Directness and addressing the reader
- Level of formality
- Standard sentence construction
- Active vs. passive voice conventions
- The tone of instructions
- Rules for handling RFC-style normative language

Translations must mirror the strength of the source without dilution. For instance:

- `MUST` remains a strict requirement.
- `SHOULD` remains a strong recommendation.
- `MAY` remains a permissive option.

Style preferences never justify weakening technical obligations.

#### Typography

Specifies regional formatting requirements, including:

- Quotes and apostrophes
- Spacing and capitalization
- Date, number, and punctuation conventions

Adherence to these rules ensures readability and repository-wide consistency.

#### Terms kept in English

Annexes **MUST** list terms of art and identifiers that are not translated, such as:

- Mojaloop services and repository names
- API endpoints and field names
- Industry standards, development tools, and Git UI terms

Official identifiers are always literal. If an English term is retained for domain clarity, provide context on its first appearance.

**Example:**

- Preserved term: `"scheme"`
- Initial occurrence: `"the payment scheme (scheme)"`

#### Normative glossary

Each locale guide **MUST** include a glossary of canonical translations.

- One source term maps to exactly one approved target term.
- Apply terms consistently across all localized pages.
- New terms require consensus before inclusion.
- Glossary updates require an atomic update of all affected files.
- The glossary is the final authority; reviewers may block a PR for drift.

**Example:**

| English term | Approved translation | Do not use | Notes |
| --- | --- | --- | --- |
| settlement | *translated term* | *alternative terms* | Domain meaning |
| participant | *translated term* | *alternative terms* | FSP/Entity |

#### Language-specific pitfalls

Guides **SHOULD** list recurrent errors such as false friends, ambiguous terms, or failures in machine translation. These entries help maintain quality and reduce review churn.

### 2.2 Maintaining locale guides

Annexes are living documents. When a PR settles a terminology question, that decision **MUST** be codified in the guide immediately rather than lingering in PR comments.

### 2.3 Adding a new locale guide

To onboard a new language:

1. Create the annex at `docs/community/contributing/translations/locales/<locale>.md`
2. Include register, typography, glossary, and English-term sections.
3. Designate domain and language reviewers.
4. Configure `docs/.vuepress/config.js`
5. Begin translation according to the Part 3 priorities.

A locale lacking an annex or assigned reviewers is not ready for production use.

---

## Open questions for reviewers

These are unresolved and deliberately left for the review of this draft:

1. **Diagram policy.** Should localized `.plantuml` sources be maintained at all, or should all diagrams stay in English to avoid regeneration drift? Duplicating them roughly doubles the diagram maintenance surface.
2. **Drift enforcement.** The drift checker supports `--fail-on-missing`. Should a `missing` translation block an English PR, or stay advisory? Blocking couples English velocity to translator availability.
3. **Cross-locale link fallback.** When a target page is untranslated, do we link to the English page silently, or mark it visibly (e.g. «(en anglais)»)?
4. **Glossary location.** Should Annex A.4 eventually move into the published docs as a contributor-facing page, so it is linkable from PR reviews?
5. **Publishing this document.** It currently sits at the repository root and is not published to the site. Should it become a page under `docs/community/contributing/` instead — which would then make it subject to its own translation rules?