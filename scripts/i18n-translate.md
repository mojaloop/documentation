# Machine-translation drafts

`scripts/i18n-translate.mjs` produces **first drafts** of translations with DeepL. Every line
it writes is machine output that a human must read and correct before merge —
[translation guidelines §10](../translationguidelines.md).

**AI Disclosure** This document includes content generated with assistance from Claude. All content has been reviewed and validated by the author.

It is a drafting tool bolted onto [the drift checker](./i18n-drift-check.md), not a second
opinion about what needs translating. The drift checker decides that; this script translates
what it is told to.

## The idea in one minute

```text
npm run i18n:translate
  │
  ├─ asks i18n-drift-check.mjs --audit  what is missing or stale
  ├─ removes every code span, URL, path and component name from the text
  ├─ sends only the remaining prose to DeepL
  ├─ puts the removed spans back, and refuses the page if any came back wrong
  ├─ checks the result has the same fences, headings, links and table rows as the English
  └─ writes the page and stamps it with i18n-drift-check.mjs --stamp
```

Two things are deliberately *not* reimplemented: **what counts as stale** (the drift checker
owns that) and **the `i18n_source_sha` stamp** (written by `--stamp` after each page). One
definition of each in the repository, not two.

## Before you start

- Node 22 (`.nvmrc`), run from the repository root.
- Your own DeepL key: <https://www.deepl.com/pro-api>. One account per person — sharing a key
  breaches DeepL's terms. Free-tier keys end in `:fx` and are routed to the free endpoint.
- Put it in `.env` (git-ignored) and export it: `set -a; . ./.env; set +a`

The script never writes the key anywhere and scrubs it from its own error output. The usual
rule still applies: never paste it into an issue, a PR, or a log.

## Commands

| Command | What it does |
| --- | --- |
| `npm run i18n:translate` | Prompts for locale and section, shows a plan, asks before sending |
| `npm run i18n:translate -- --locale pt --section community` | Same, without the prompts |
| `npm run i18n:translate -- --locale fr --dry-run` | Lists the pages and the estimate. Sends nothing, needs no key |
| `npm run i18n:translate:test` | Unit tests, no network |
| `npm run i18n:translate:corpus` | Runs the masker over every English page and fails on a leak |

Flags: `--max-chars <n>` (default 100 000), `--retranslate`, `--formality`, `--summary-out`,
`--ci` for an unattended run. `--help` lists them all.

Exit codes: `0` fine · `1` usage, configuration, or API error · `2` some pages were skipped.

## What it will and will not touch

| Status | What happens |
| --- | --- |
| `missing` | The whole English page is translated into the mirrored path |
| `stale` | Only the paragraphs whose English changed are re-translated |
| `unstamped` | **Skipped.** `--retranslate` overrides, and discards the existing text |
| `orphaned` | Never touched |
| `updated` | Nothing to do |

`unstamped` is skipped for a reason worth stating plainly: such a page is usually a human
translation made before stamping existed — the 339 French pages are all like this today. We
cannot prove one is current, but overwriting reviewed work on a guess is far worse.

Pages in `i18n/autotranslate-skiplist.txt` are never drafted: the generated API reference,
licence and policy text, and the translation rules themselves.

> That file would naturally be called `...-ignore.txt`. It cannot: `.gitignore` carries a
> blanket `*ignore*` rule, so it would never be committed.

## Masking: how code survives a translator

§3 lists what must never be translated. Those spans are not *asked* to survive — they are
removed before the text leaves the machine:

```text
  Call `POST /quotes` and read [the guide](/technical/guide.md).
           ↓  mask
  Call <x>0</x> and read [the guide]<x>1</x>.
           ↓  DeepL, with tag_handling=xml and ignore_tags=x
  Appelez <x>0</x> et lisez [le guide]<x>1</x>.
           ↓  restore
  Appelez `POST /quotes` et lisez [le guide](/technical/guide.md).
```

A span that was masked cannot be mistranslated, because DeepL never saw it. Masked: inline
code, fenced blocks (never sent at all), link and image targets, HTML and Vue tags, bare URLs,
`${...}` placeholders, file paths, and every term in `i18n/glossary/keep-english.txt`.

`restoreMask()` then refuses anything it cannot vouch for. DeepL may legitimately **move** a
tag — word order differs between languages — but each must come back exactly once.

Four constructs that really occur in `docs/` leaked the first time the corpus check ran, and
each is now a unit test:

| Construct | Where | Why it leaked |
| --- | --- | --- |
| `[https://x](https://x)` | `deployment-troubleshooting.md` | A greedy `\S+` URL match overlapped the link target already claimed, so it was dropped whole |
| `[Table 57](#table-57]` | `api-definition.md` | Malformed markdown: no closing paren |
| `https://<DNS_NAME>:4000` | `wso2-api-gateway/README.md` | The `<...>` placeholder was claimed as a tag first, leaving the scheme bare |
| A backtick closed with `'` | `faqs.md` | The pair never matched |

Run `npm run i18n:translate:corpus` after any change to `PROTECTED_PATTERNS`.

## Updating a stale page without destroying reviewed text

Because the stamp is a git blob hash, the English a translation was made from is still in the
repository:

```text
git cat-file blob <i18n_source_sha>   the English as it was when translated
docs/<page>.md                        the English now
docs/<locale>/<page>.md               the reviewed translation of the old text
```

A translation must mirror its source block for block (§4), so the old English and the existing
translation correspond one to one. Align them, translate only the blocks whose English
changed, keep the reviewed translation everywhere else.

When that alignment does not hold, the script **does not** clobber the page. It reports
`needs a human` and moves on. `--retranslate` is the explicit override.

## The structure gate

Before a page is written it is compared against its English source: fenced code block count,
heading count **and level sequence**, link count, image count, table row count. Any difference
and the page is not written. A draft that quietly lost a code block is worse than no draft,
because it looks finished.

## Terminology

`i18n/glossary/keep-english.txt` holds terms whose translation is the English word —
`central-ledger`, `FSPIOP`, `ISO 20022`. They are masked like code.

Terms that **do** have an approved translation belong in a per-locale glossary at
`i18n/glossary/<locale>.csv` (`en,target`), which the script uploads to DeepL before each run
so every contributor gets the same terms. **No such file ships yet.** Each one must mirror the
normative glossary in the locale annex (`docs/community/contributing/translations/locales/<locale>.md`)
and be signed off by a language reviewer and a domain reviewer first. Without one the script
logs `translating without one` and carries on.

## Quota

- `--max-chars` (default 100 000) stops a run before it eats your quota. The script reads
  `/v2/usage` first and will not start work it cannot finish.
- `DEEPL_MONTHLY_CAP` refuses to push the account past a character count in the current
  billing period, using DeepL's own counter rather than local state.
- A quota or auth failure stops the run immediately rather than burning the rest of the budget.
- Segments with no words left after masking are never sent.

For scale: `--locale pt --dry-run` reports ~325 missing pages and ~3.3M characters. The DeepL
free tier is 500k a month, so a locale cannot be drafted in one pass on a free key.

## The tests

`npm run i18n:translate:test` — no network; the DeepL client is replaced by a fake that shouts
every word and leaves placeholder tags alone, which is the contract `ignore_tags` buys from the
real service. Covers block splitting, fence atomicity, every protected construct, the four
regressions above, placeholder loss and duplication, entity decoding, table/list/heading
segmentation, front-matter allowlisting, link localisation, structure checking, block
alignment, stale-page patching, and glossary parsing.

`npm run i18n:translate:corpus` is the wider net: the same pipeline over every English page,
failing on any leak. It found all four regressions.

## What the script cannot know

- **Whether the translation is any good.** It checks structure, never meaning. MT reliably
  fails on this repository's vocabulary — quote, settlement, clearing, switch, scheme — which
  is why §10 requires a human who knows payments to read every line.
- **Whether a heading it translated is linked by anchor elsewhere** (§5).
- **Whether a page belongs in the sidebar.** New pages must be added to
  `docs/.vuepress/config.js` by hand (§7), or they are effectively unpublished.
- **Whether a diagram needs translating.** `.plantuml` sources are untouched (§6).

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| `DEEPL_AUTH_KEY is not set` | `set -a; . ./.env; set +a` |
| `DeepL rejected the key (HTTP 403)` | Wrong key, or a free key against the paid host. The `:fx` suffix decides the host |
| `DeepL quota exhausted (HTTP 456)` | Nothing further was sent. Wait, or use a smaller `--section` |
| `needs a human - the translation has N blocks where the English ... has M` | The translation no longer mirrors its source. Fix by hand, or `--retranslate` |
| `structure check failed` | The page was not written. Reproduce with `npm run i18n:translate:corpus` |
| `the English version it was translated from is not in this clone` | Shallow clone. `git fetch --unshallow` |
| Everything is `unstamped` | Expected until the French backlog is stamped. See the drift checker |
