# Portuguese (pt-PT) translation annex

> **Status:** Draft — pending reviewer assignment
>
> **Applies to:** content under `docs/pt/**`. Part 1 of the [translation guidelines](../../../documentation/translationguidelines.md) is binding; nothing here supersedes it.

**AI Disclosure** This document includes content generated with assistance from Claude Opus 5. All content has been reviewed and validated by the author.

## Locale decisions of record

These are proposals, adopted so that translation can begin. Maintainer deliberation may revise any of them, and with them the pages already translated.

| Decision | Ruling | Consequence |
| --- | --- | --- |
| Variant | **pt-PT** | European lexis, AO90 orthography, `lang: 'pt-PT'` |
| Diagrams | **Stay in English** | No `.puml` or `.svg` duplicated under `docs/pt/`. Translate surrounding prose and alt text only |
| Order | getting-started → adoption → community → product → technical | technical is largest and most API-dense, so last |
| Untranslated targets | English page, marked **«(em inglês)»** | Body links and the nav in `config.js` |
| Reviewers | **To be assigned** | Until a language and a domain reviewer are named, the locale is not production-ready |

## The English source

Four voices, needing different treatment. Identify which you are in before choosing a register.

| Register | Where | Reads as |
| --- | --- | --- |
| Specification | `technical/api/**` | Third person, heavily passive, RFC 2119 keywords |
| Procedural | `contributing/**`, `getting-started/**` | Bare imperatives — "Run the following script" |
| Advocacy | `adoption/**`, `product/**` | First person plural — "We developed Mojaloop to…" |
| Minutes and archive | `community/**` archive | Conversational, dated — "Please have a look at…" |

Courtesy and first-person plural belong to the last two. Do not carry that warmth into specification pages.

## A.1 Register and voice

### Addressing the reader

Never `você`, nor `tu`.

- **Instructions** take the third-person imperative: `Run the following script` → **`Execute o script seguinte`**.
- **Descriptive "you"** becomes impersonal: `where you can find the logs` → **`onde é possível encontrar os registos`**.
- **`o utilizador`** renders "the user" as a role, never as a way to address the reader.

### Formality

One register above conversational, well below legal.

- Do not add courtesy the English lacks: `Please have a look at X` → **`Consulte X`**, not `Por favor, consulte`, which is heavier in Portuguese than "please" is in English.
- Keep courtesy that carries meaning — a genuine request to a person rather than an instruction to a reader.
- Do not elevate. Specification prose is formal already; matching it does not mean `outrossim` or `porquanto`.

### Sentence construction

- **Preserve sentence boundaries.** Four English sentences stay four — splitting a long specification sentence is a fidelity breach even when it reads better.
- Portuguese runs 15–25% longer. Expected, and not licence to compress.
- Keep the English information order unless Portuguese syntax forbids it.

### Active and passive voice

Passivity in specification prose is load-bearing: it keeps the obligation on the artefact rather than on an unnamed implementer.

- **Keep the passive where the English is passive** and no agent is named.
- Prefer the analytic passive (`é definido`) over the pronominal (`define-se`), which reads generic rather than normative.

### Tone of instructions

An instruction states what to do. Do not soften an imperative into `pode`, add reassurance the English lacks, or downgrade a `Warning` into advice.

### RFC 2119 normative language

Follow the `fr` precedent: **translate the keywords, keep them capitalised, inflect for agreement.** The capitals are what mark them normative rather than ordinary modal verbs.

| English | pt-PT | Force |
| --- | --- | --- |
| `MUST`, `SHALL` | **DEVE** / **DEVEM** | Absolute requirement |
| `MUST NOT`, `SHALL NOT` | **NÃO DEVE** / **NÃO DEVEM** | Absolute prohibition |
| `SHOULD` | **DEVERIA** / **DEVERIAM** | Strong recommendation |
| `SHOULD NOT` | **NÃO DEVERIA** / **NÃO DEVERIAM** | Strong recommendation against |
| `MAY` | **PODE** / **PODEM** | Genuinely optional |
| `REQUIRED` | **OBRIGATÓRIO** | Absolute requirement |
| `RECOMMENDED` | **RECOMENDADO** | Strong recommendation |
| `OPTIONAL` | **OPCIONAL** | Genuinely optional |

The indicative/conditional split (`DEVE` against `DEVERIA`) keeps `MUST` and `SHOULD` distinct — never render `SHOULD` as `DEVE`. The modal keywords inflect for number only; the last three are adjectives and agree in gender too (`OBRIGATÓRIA`, `OBRIGATÓRIOS`).

One exception, as in `fr`: the boilerplate sentence cites the keywords, so they stay English inside it.

> Os termos «MUST», «MUST NOT», «REQUIRED», «SHALL», «SHALL NOT», «SHOULD», «SHOULD NOT», «RECOMMENDED», «MAY» e «OPTIONAL» neste documento devem ser interpretados conforme descrito na RFC 2119.

Non-RFC hedging — "typically", "is expected to" — is translated as a hedge, never resolved into fact.

## A.2 Typography

- **AO90 orthography:** `ação`, `adoção`, `atualização`, `projeto`, `objetivo`. AO90 does not touch the variant vowel — pt-PT keeps `eletrónico`, `económico` against pt-BR `eletrônico`, `econômico`.
- **Quotes:** `«…»`, with `"…"` nested inside. Quotes in code spans are code — leave them.
- **Apostrophes** are rare in Portuguese; where one is required (`d’água`), use the typographic `’`, never the straight `'`. Apostrophes inside code spans are code.
- **No space before `:`, `;`, `?`, `!`** — that is French, and leaks in from `docs/fr/`.
- **Decimal comma, non-breaking space for thousands:** `1,5`, `10 000`. Numbers in code, config and API examples are never reformatted.
- **Dates:** `26 de agosto de 2026`, months lower case; numeric `dd/mm/aaaa`. ISO dates in code stay ISO.
- **Headings are sentence case with no numbers**, per the repository style guide.

## A.3 Terms kept in English

Never translated, including in headings and link text. Gloss on first occurrence where not self-evident.

- **Components and repositories:** `central-ledger`, `ml-api-adapter`, `sdk-scheme-adapter`, `account-lookup-service`, and every other repository name.
- **Standards, organisations, tooling:** Mojaloop, Mojaloop Foundation, FSPIOP, ISO 20022, Interledger, RFC 2119, Kubernetes, Helm, Docker, Git, GitHub, npm.
- **API artefacts:** endpoint paths, HTTP methods and headers, JSON and YAML field names, enum values, error codes — `payerFsp`, `POST /quotes`, `3100`.
- **Git and GitHub terms** as literals: `commit`, `branch`, `pull request`, `merge`, `issue`, `label`, and Conventional Commit types (`feat:`, `fix:`).
- **Domain terms of art** settled below: `switch`, `scheme`, `hub`, `DFSP`, `FSP`, `deployment`, `onboarding`, `endpoint`, `rollback`, `workstream`.

Retained terms take Portuguese articles and agree in number — **`o switch`**, **`os switches`**, **`o DFSP`** — and are not italicised.

Where English uses one as a verb, use the light-verb construction with `fazer`, not a coined Portuguese verb: `to deploy` → **`fazer o deploy de`**, `to roll back` → **`fazer o rollback de`**. Keep to `fazer` rather than alternating with `efetuar` or `realizar`. English past participles are recast around the noun — `is deployed on Kubernetes` → **`o deployment é feito em Kubernetes`** — never inflected as if the loanword were a Portuguese verb.

## A.4 Normative glossary

One source term maps to exactly one target term across the locale. A reviewer may block a PR for drift from this table alone.

| English | Approved | Do not use | Notes |
| --- | --- | --- | --- |
| quote | **cotação** | citação, orçamento | `citação` is a false friend — a quotation of text. `POST /quotes` stays literal |
| settlement | **liquidação** | acerto, assentamento, povoação | The last two are MT reading "settlement" as a village |
| clearing | **compensação** | limpeza, apuramento, liquidação | Distinct from settlement, and must stay distinct |
| switch | *not translated* | comutador, interruptor | `o switch` |
| scheme | *not translated* | esquema, regime | `esquema` connotes a scam. Gloss once: `o scheme (o conjunto de regras do sistema de pagamentos)` |
| participant | **participante** | membro, ator | An institution participating in a scheme |
| transfer | **transferência** | transação, remessa | Not interchangeable with `transaction` |
| hub | *not translated* | centro, núcleo | `o hub` |
| DFSP, FSP | *not translated* | PSF, IFD | `o DFSP`. Expand once per page: `DFSP (Digital Financial Services Provider)` |
| payer, payee | **pagador**, **beneficiário** | recebedor, sacador, credor, devedor | The API fields `payerFsp` and `payeeFsp` stay literal |
| ledger | **razão geral** | livro-diário, contabilidade | `central-ledger` and `Interledger` are names — never translate the `ledger` inside them |
| fee | **comissão** | taxa, tarifa, propina | `taxa` is reserved for `rate`. By far the most common of the three |
| rate | **taxa** | cotação, tarifa | As in `taxa de câmbio`, `taxa de juro` |
| tariff | **tarifa** | tarifário, taxa, comissão | `tarifário` is the rate card, not a single tariff |
| deployment, deploy | *not translated* | implantação, implementação | `o deployment`. Verb forms use `fazer o deploy de` |
| onboarding | *not translated* | integração, adesão | `o onboarding` |
| endpoint | *not translated* | ponto final, ponto de extremidade | `o endpoint` |
| rollback | *not translated* | reversão, retrocesso | `o rollback` |
| workstream | *not translated* | fluxo de trabalho, linha de trabalho | `o workstream`. `fluxo de trabalho` is `workflow`, a different thing |

## A.5 Language-specific pitfalls

### False friends

| English | Wrong | Correct |
| --- | --- | --- |
| eventually | eventualmente (*occasionally*) | por fim, acabar por |
| actually | atualmente (*currently*) | na verdade, efetivamente |
| to support (a feature) | suportar (*to endure*) | permitir, ser compatível com |
| to realise | realizar (*to carry out*) | perceber, constatar |
| library | livraria (*bookshop*) | biblioteca |
| sensible | sensível (*sensitive*) | sensato, razoável |

### pt-BR lexis

Machine translation defaults to Brazilian Portuguese. Highest-frequency checks:

| pt-BR | pt-PT |
| --- | --- |
| usuário | utilizador |
| arquivo | ficheiro |
| tela | ecrã |
| gerenciar, gerenciamento | gerir, gestão |
| acessar | aceder |
| banco de dados | base de dados |
| time (a team) | equipa |
| registrar, registro | registar, registo |
| planejar | planear |

### Number scale

`billion` is **`mil milhões`**, not `bilião` — a `bilião` is 10¹². The error is three orders of magnitude, and it appears wherever adoption and product pages quote transaction volumes.

## A.6 Review criteria

Every translation PR needs a language reviewer and a domain reviewer (Part 1 §12). Neither is yet assigned for this locale. Reviewers check in the order Part 1 sets — fidelity, terminology, links and structure, fluency — and additionally, for pt-PT:

- **Blocking:** `você` or `tu`; pt-BR lexis from A.5; a term rendered against A.4; an RFC keyword whose force has shifted; a number that changed magnitude; a diagram translated against the ruling above.
- **Blocking:** a link from `docs/pt/**` landing in English without the «(em inglês)» marker.
- **Not blocking:** stiff phrasing that preserves meaning. A fluent sentence that changes what a specification requires is a defect; an awkward one that does not is a comment.
