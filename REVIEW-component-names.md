# Reviewer worklist — component names to restore to English

Not committed, not part of either branch. Delete when done.

`i18n/glossary/keep-english.txt` masked only the hyphenated repository form
(`central-ledger`), so the spaced prose form (`Central Ledger`) reached DeepL and was
translated, which annex A.4 forbids. The prose forms are now in `keep-english.txt`
(verified: `maskText` protects `Central Ledger` / `SDK Scheme Adapter` while leaving the
generic `ledger database` translatable), but the drafts already written still carry the
translated forms.

**Cheapest fix:** next billing period, re-run only these pages with `--retranslate`
(~100k characters total) rather than correcting them by hand. The renderings vary by
number and article (`Adaptadores de esquemas SDK`, `adaptador del esquema SDK`), so bulk
search-and-replace is not safe.

`Central Ledger` in `docs/pt/technical/**` was already corrected by hand (15 sites),
along with 17 pre-AO90 spellings and one malformed link.

## es — `i18n/es-technical`

| page | term | occurrences to restore |
| --- | --- | --- |
| `README.md` | central ledger | 1 |
| `business-operations-framework/ReportDeveloperGuide.md` | central ledger | 1 |
| `business-operations-framework/ReportingBC.md` | central ledger | 4 |
| `business-operations-framework/SecurityBC.md` | Finance Portal | 1 |
| `faqs.md` | Central ledger | 1 |
| `reference-architecture/boundedContexts/accountsAndBalances/index.md` | central ledger | 1 |
| `technical/central-event-processor/README.md` | Central Event Processor | 2 |
| `technical/central-ledger/README.md` | central ledger | 4 |
| `technical/overview/README.md` | Central Ledger | 1 |
| `technical/overview/README.md` | Quoting Service | 1 |
| `technical/quoting-service/README.md` | Quoting Service | 3 |
| `technical/releases.md` | Central Event Processor | 1 |
| `technical/releases.md` | Finance Portal | 2 |
| `technical/sdk-scheme-adapter/BulkEnhancements/Readme.md` | SDK Scheme Adapter | 3 |
| `technical/sdk-scheme-adapter/BulkEnhancements/SDKBulk-API-Design.md` | SDK Scheme Adapter | 1 |
| `technical/sdk-scheme-adapter/IntegrationBulkFlowPatterns.md` | SDK Scheme Adapter | 2 |
| `technical/sdk-scheme-adapter/README.md` | SDK Scheme Adapter | 6 |
| `technical/sdk-scheme-adapter/RequestToPay.md` | SDK Scheme Adapter | 1 |
| `technical/sdk-scheme-adapter/usage/README.md` | Mojaloop Simulator | 5 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-local-k8s/README.md` | SDK Scheme Adapter | 3 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/README.md` | Central Ledger | 1 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/README.md` | Central Settlement | 1 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/README.md` | SDK Scheme Adapter | 1 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/README.md` | Mojaloop Simulator | 3 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-to-scheme-adapter/README.md` | mojaloop simulator | 7 |
| `technical/transaction-requests-service/README.md` | Transaction Requests Service | 1 |
| `technical/transfer-journey/README.md` | SDK scheme adapter | 2 |
| `technical/transfer-journey/reference.md` | SDK scheme adapter | 1 |

**es: 61 occurrences across 23 pages.**

## pt — `i18n/pt-technical`

| page | term | occurrences to restore |
| --- | --- | --- |
| `README.md` | central ledger | 1 |
| `business-operations-framework/ReportDeveloperGuide.md` | central ledger | 1 |
| `business-operations-framework/SecurityBC.md` | Finance Portal | 1 |
| `faqs.md` | Account Lookup Service | 1 |
| `reference-architecture/boundedContexts/accountsAndBalances/index.md` | central ledger | 1 |
| `reference-architecture/boundedContexts/thirdPartyApi/index.md` | Account Lookup Service | 1 |
| `technical/account-lookup-service/README.md` | Account Lookup Service | 3 |
| `technical/central-event-processor/README.md` | Central Event Processor | 1 |
| `technical/overview/README.md` | Account Lookup Service | 1 |
| `technical/overview/README.md` | Quoting Service | 1 |
| `technical/quoting-service/README.md` | Quoting Service | 3 |
| `technical/sdk-scheme-adapter/BulkEnhancements/Readme.md` | SDK Scheme Adapter | 3 |
| `technical/sdk-scheme-adapter/BulkEnhancements/SDKBulk-API-Design.md` | SDK Scheme Adapter | 1 |
| `technical/sdk-scheme-adapter/IntegrationBulkFlowPatterns.md` | SDK Scheme Adapter | 2 |
| `technical/sdk-scheme-adapter/README.md` | SDK Scheme Adapter | 5 |
| `technical/sdk-scheme-adapter/RequestToPay.md` | SDK Scheme Adapter | 1 |
| `technical/sdk-scheme-adapter/usage/README.md` | Mojaloop Simulator | 5 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-local-k8s/README.md` | SDK Scheme Adapter | 3 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/README.md` | Central Settlement | 1 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/README.md` | SDK Scheme Adapter | 1 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/README.md` | Mojaloop Simulator | 3 |
| `technical/sdk-scheme-adapter/usage/scheme-adapter-to-scheme-adapter/README.md` | mojaloop simulator | 7 |

**pt: 47 occurrences across 19 pages.**

---

## `Handler` has no agreed rendering in pt

Counted only on pages whose **English** contains "Handler":

| rendering | occurrences | files |
| --- | --- | --- |
| `Gestor` | 50 | 20 |
| left in English (`Handler`) | 37 | 29 |
| `Processador` | 6 | 5 |
| `Manipulador` | 1 | 1 |

**14 pages use two or more of these in the same file**, e.g.
`technical/central-bulk-transfers/transfers/1.1.0-bulk-prepare-transfer-request-overview.md`
mixes all three of English, `Gestor` and `Processador`.

Annex A.4 does not cover `Handler`, and per the annex's own process a new term needs a
language reviewer and a domain reviewer to sign off. So this is **not** something to fix
file-by-file: decide once, add the row to A.4, regenerate `i18n/glossary/pt.csv`, and the
glossary will then enforce it on every future run.

Proposed row, for sign-off — not applied:

| English | Approved | Do not use | Notes |
| --- | --- | --- | --- |
| handler | *not translated* | gestor, processador, manipulador | `o handler`. Names a Mojaloop component role, as `switch` and `hub` do (A.3). The sidebar labels in `docs/.vuepress/config.js` already assume this. |

### Correction to the commit message

`i18n/pt-technical`'s commit message quotes "English (47 files), `Manipulador` (33),
`Gestor` (27), `Processador` (11)". Those were file counts over all pt pages and included
`gestor`/`processador` rendering "manager"/"processor" rather than "Handler". The table
above is the corrected count. The commit was not amended because nothing was to be
committed in this pass.
