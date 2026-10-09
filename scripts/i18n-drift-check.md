# Translation drift check

`scripts/i18n-drift-check.mjs` tells you which translated pages no longer match the English
documentation, and shows translators exactly what changed.

**AI Disclosure** This document includes content generated with assistance from Claude. All content has been reviewed and validated by the author.

This guide covers what the script does, every command, how to try it safely, what the tests
check, and the reasons behind the design.

- [The idea in one minute](#the-idea-in-one-minute)
- [Before you start](#before-you-start)
- [Commands at a glance](#commands-at-a-glance)
- [What the statuses mean](#what-the-statuses-mean)
- [How to use it, by role](#how-to-use-it-by-role)
- [Each command in detail](#each-command-in-detail)
- [Reading the report](#reading-the-report)
- [The baseline and out-of-scope languages](#the-baseline-and-out-of-scope-languages)
- [What happens on GitHub](#what-happens-on-github)
- [Try it yourself](#try-it-yourself)
- [The tests](#the-tests)
- [What the script cannot know](#what-the-script-cannot-know)
- [Troubleshooting](#troubleshooting)
- [Design notes](#design-notes)

## The idea in one minute

English pages live under `docs/`. Each translation lives at the same path under
`docs/<language>/`:

```
docs/technical/guide.md        English source
docs/fr/technical/guide.md     French translation
docs/pt/technical/guide.md     Portuguese translation
```

Every translated page records **which version of the English page it was made from**. The
record is a fingerprint of the English text, written at the top of the translated file:

```yaml
---
i18n_source_sha: 7e45a52f21d78bfc6c6233abd7e8b2a73b007a10
---
```

We call this line the **stamp**. The fingerprint is git's own hash of the English file:
change one character of the English page and the fingerprint changes completely.

To judge a translation, the script computes the fingerprint of the English page as it is
today and compares:

| Recorded stamp vs. English page today | Verdict |
| --- | --- |
| same | the translation is **up to date** |
| different | the English page changed after the translation was made: the translation is **stale** |
| no stamp | **unstamped**: the script cannot tell |

The script never reads the translated text and does not understand any language. It answers
one question reliably: *did the English page change since this translation was stamped?*

All languages are treated the same way. Examples below use French (`fr`), but every command
covers every language directory.

## Before you start

- Node.js 22 (see `.nvmrc`) and git.
- Run every command from the repository root.
- No `npm install` is needed for the script or its tests: they only use Node built-ins.

## Commands at a glance

| Command | What it does | Changes files? |
| --- | --- | --- |
| `npm run i18n:audit` | Reports the state of every translation in the repository, with coverage percentages | no |
| `npm run i18n:check` | Reports what your branch did to English pages, uncommitted work included, and whether translations followed | writes `i18n-report.md` / `.json` (git-ignored) |
| `npm run i18n:explain -- <translated page>` | Shows the English lines that changed since that page was translated | no |
| `npm run i18n:stamp` | Stamps translated pages that have **no stamp yet** | yes, translated pages |
| `npm run i18n:stamp -- <translated page>` | Refreshes the stamp of that one page | yes, that page |
| `npm run i18n:stamp -- --changed` | Refreshes the stamp of every translated page you edited on your branch | yes, those pages |
| `npm run i18n:stamp -- --force` | Refreshes every stamp, including stale ones. Use with care | yes, translated pages |
| `npm run i18n:baseline` | Records today's known gaps so they stop counting as new | writes `scripts/i18n-baseline.json` |
| `npm run i18n:test` | Runs the script's automated tests | no |

The `--` after the npm script name is required: it tells npm that what follows is meant for
the script.

## What the statuses mean

| Status | Meaning | What to do |
| --- | --- | --- |
| `missing` | The English page has no translation in this language | Translate it, then stamp it |
| `stale` | The stamp no longer matches the English page | Run `i18n:explain`, carry the changes across, re-stamp |
| `orphaned` | The translation exists but its English page was deleted or renamed | Delete or move the translation |
| `unstamped` | The translation exists but has no stamp | Stamp it (see first-time setup) |
| `needs_review` | Only in `i18n:check`: the English page changed, and the *unstamped* translation was not touched on this branch. An estimate, not a proof | Check the page, then stamp it |
| `updated` | The translation matches the current English page | Nothing |

## How to use it, by role

### I translate pages

**I translated a new page.**

```bash
npm run i18n:stamp -- docs/fr/path/to/page.md
```

Commit the translated page with its stamp.

**The report says one of my pages is `stale`.**

1. See what changed in English:

   ```bash
   npm run i18n:explain -- docs/fr/path/to/page.md
   ```

2. Carry those changes into the translation.
3. Re-stamp the page. This is your statement that the translation now matches:

   ```bash
   npm run i18n:stamp -- docs/fr/path/to/page.md
   ```

**I updated several pages in one sitting.** Stamp them all at once:

```bash
npm run i18n:stamp -- --changed
```

**The English change does not affect the translation** (a typo fixed in English, for
example). The translated file does not need editing, but its stamp is now behind. Name the
page to re-stamp it:

```bash
npm run i18n:stamp -- docs/fr/path/to/page.md
```

`--changed` would skip it, because you did not edit the translated file.

**Only stamp what you really updated.** Stamping a page says "this translation matches the
current English page". The script trusts you.

### I change English pages

Nothing is required. When you open a pull request, a bot comments with the list of
translations your change leaves behind. To see that list before you commit or push, run
`npm run i18n:check`. The comment is information, not a blocker. If you can update the
translations yourself, do it in the same pull request and stamp them; otherwise translators
will pick them up from the issue created after merge.

If you rename or delete an English page, rename or delete its translations too, or they
will be reported as `orphaned`.

### I maintain the repository

**First-time setup.** Until pages carry stamps, the script cannot detect anything.

1. Decide which languages are in scope. A language whose translation has just started
   reports every page not translated yet as `missing`: several hundred for a language that
   only has a home page. That is accurate, and it is a usable to-do list. If the team
   prefers to keep such a language out of the reports until its translation is further
   along, see [the baseline section](#the-baseline-and-out-of-scope-languages).
2. Stamp every existing translation:

   ```bash
   npm run i18n:stamp
   ```

   This declares "all current translations are up to date as of today". Nobody can verify
   that page by page; it is the starting line from which drift is measured.
3. Record the gaps that remain (missing and orphaned pages) as known debt:

   ```bash
   npm run i18n:baseline
   ```

4. Commit the stamped pages and `scripts/i18n-baseline.json`.

**Blocking pull requests (optional, a team decision).** By default the script only reports.
Adding `--fail-on` to the command in `.github/workflows/i18n-translation-drift.yml` makes the
job fail when a pull request creates *new* drift:

```bash
node scripts/i18n-drift-check.mjs --base ... --head ... --fail-on missing,orphaned,stale
```

Do this only after the baseline exists, or every pull request will fail on old gaps.

## Each command in detail

All `npm run i18n:*` commands call `node scripts/i18n-drift-check.mjs` with different
options. `node scripts/i18n-drift-check.mjs --help` lists the options.

### `npm run i18n:audit`

Scans the whole repository as it is on disk, committed or not. For every English page and
every language, it reports `missing`, `stale`, `unstamped` or `orphaned` pages, plus a
coverage table. Pages that are fine are not listed.

Useful options:

```bash
node scripts/i18n-drift-check.mjs --audit --markdown-out i18n-report.md --json-out i18n-report.json
```

Open `i18n-report.md` in your editor's Markdown preview for a readable version. Both report
files are git-ignored.

### `npm run i18n:check`

Runs:

```bash
node scripts/i18n-drift-check.mjs --base origin/master --working-tree --markdown-out i18n-report.md --json-out i18n-report.json
```

1. Asks git which files changed since your branch left `--base`.
2. Keeps the English pages only.
3. For each one, and for each language, gives a verdict: `orphaned`, `missing`, `updated`,
   `stale`, or, for unstamped pages, an estimate (`updated` if the translation was edited
   on the same branch, `needs_review` if not).

Where the range ends depends on one option:

| Option | The range ends at | Sees uncommitted work? | Used by |
| --- | --- | --- | --- |
| `--working-tree` | the files on your disk: committed, staged, saved, or new and not yet tracked by git | yes | `npm run i18n:check` |
| `--head <ref>` (default `HEAD`) | a commit | no | GitHub, which checks exactly the commits of the pull request |

The report's `Range:` line tells you which one ran: `origin/master...working tree` or
`<base>...<head>`. The two options cannot be combined.

If `origin/master` does not exist locally, the script falls back to `master`, then
`origin/main`, then `main`, and says so. If none exists it stops rather than report a clean
result it cannot back up.

### `npm run i18n:explain -- <translated page>`

Prints the difference between the English page the translation was made from and the
English page today:

```
docs/guide/install.md changed since docs/fr/guide/install.md was translated (794419b -> a23119c).
Carry these changes across, then run: npm run i18n:stamp -- docs/fr/guide/install.md

diff --git a/docs/guide/install.md b/docs/guide/install.md
index 794419b..a23119c 100644
--- a/docs/guide/install.md
+++ b/docs/guide/install.md
@@ -1,3 +1,3 @@
 # Install

-Run the installer.
+Run the installer as administrator.
```

The first four lines after the blank line are git's header and can be ignored. Below them,
a line starting with `-` was removed from the English page and a line starting with `+` was
added. It works on uncommitted English changes too.

Other answers you can get:

| Message | Meaning |
| --- | --- |
| `... is up to date with ...` | Nothing to do |
| `carries no i18n_source_sha` | The page was never stamped, so there is no starting point to compare with |
| `records source version 1111111, which was not found in this repository` | The stamp was typed by hand, or your clone is shallow (`git fetch --unshallow`) |
| `... no longer exists: the translation is orphaned` | The English page was deleted or renamed |

### `npm run i18n:stamp`

The only command that edits documentation files. It never runs in CI.

It touches only the stamp line. If the page has no front matter block (`---` ... `---`) at
the top, it creates one. Everything else in the file is left byte for byte as it was.

| Form | Pages considered | Overwrites a stale stamp? |
| --- | --- | --- |
| `npm run i18n:stamp` | every translated page | **no**: only fills in pages with no stamp |
| `npm run i18n:stamp -- <page>` | that page | yes |
| `npm run i18n:stamp -- --changed` | translated pages that differ from the base branch: committed, staged, saved, or not yet tracked by git | yes |
| `npm run i18n:stamp -- --force` | every translated page | yes |

`--changed` compares with `origin/master` by default. Use `--base` to compare with
something else. For example, only your uncommitted work:

```bash
npm run i18n:stamp -- --changed --base HEAD
```

(`HEAD` is git's name for your last commit.)

The command ends with a count of what it did:

```
[i18n-check] Stamped translations with i18n_source_sha: 256 front matter created, 80 key added,
0 updated, 0 already current, 1 out of date left untouched.
```

| Count | Meaning |
| --- | --- |
| `front matter created` | the page had no front matter; one was created with the stamp |
| `key added` | the page had front matter; the stamp line was added |
| `updated` | a stale stamp was replaced |
| `already current` | the stamp already matched; nothing written |
| `out of date left untouched` | a stale stamp was found and deliberately kept, so the drift stays visible |

### `npm run i18n:baseline`

Runs a full audit and writes every `missing`, `stale` and `orphaned` finding to
`scripts/i18n-baseline.json`. See [below](#the-baseline-and-out-of-scope-languages).

### Options and exit codes

| Option | Meaning |
| --- | --- |
| `--base <ref>` | Start of the git range (default `origin/master`) |
| `--head <ref>` | End of the git range (default `HEAD`) |
| `--working-tree` | End the range at the files on disk instead of a commit, so uncommitted and untracked changes are reported |
| `--audit` | Scan the whole repository instead of a git range |
| `--json-out <path>`, `--markdown-out <path>` | Write the report to a file |
| `--fail-on <list>` | Exit with code 2 on *new* findings of these statuses, e.g. `missing,orphaned,stale` |
| `--update-baseline` | With `--audit`: rewrite the baseline |
| `--stamp [path]`, `--changed`, `--force` | See `i18n:stamp` |
| `--explain <path>` | See `i18n:explain` |

| Exit code | Meaning |
| --- | --- |
| 0 | Clean, or report-only |
| 1 | Usage or configuration error |
| 2 | New drift found and `--fail-on` asked to block |

## Reading the report

A pull-request report looks like this:

```markdown
## Translation Drift Report

Locales: `fr`
Range: `50f8c8c...HEAD`

| Status | New | Known debt | Meaning |
| --- | ---: | ---: | --- |
| ❌ missing | 1 | 0 | translation does not exist |
| ⚠️ stale | 1 | 0 | translation records an older version of the source |

### Needs attention (2)

**`fr`**

- ❌ `docs/fr/guide/faq.md` (missing)
- ⚠️ `docs/fr/guide/install.md` (stale) — translates source 794419b, current source is a23119c

> Verdicts are exact: each translation records the `i18n_source_sha` it was made from ...
```

- **New** counts findings that are not in the baseline. **Known debt** counts the ones that
  are: still shown, never blocking.
- **Needs attention** lists the new findings, grouped by language.
- The last line tells you how far to trust the verdicts. If some pages have no stamp, it
  says that their verdict "is inferred from the diff alone and may be wrong".

An audit report adds a coverage table per language:

```markdown
### Coverage - `fr`

| Section | Source pages | Translated | Up to date |
| --- | ---: | ---: | ---: |
| `getting-started` | 18 | 13 (72%) | 0 (0%) |
| `technical` | 185 | 184 (99%) | 0 (0%) |
| **all** | 349 | 339 (97%) | 0 (0%) |
```

| Column | Counts |
| --- | --- |
| Section | the top-level folder under `docs/`; `(root)` is for pages directly in `docs/` |
| Source pages | English pages in that folder |
| Translated | how many have a translated file. Existence only |
| Up to date | how many have a stamp that matches the English page today |

`Up to date` at 0% does not mean the translations are bad. It means none is stamped yet, so
nothing can be proven. After first-time setup it jumps to the `Translated` figure, then
drops each time an English page changes without its translation following.

## The baseline and out-of-scope languages

`scripts/i18n-baseline.json` holds two team decisions.

**Known debt (`entries`).** Gaps accepted when the file was generated. They are still
reported, in the "Known debt" column, but they do not count as new and never trigger
`--fail-on`. This lets CI block *new* drift without first fixing every old gap. Regenerate
with `npm run i18n:baseline` when gaps are closed.

**Out-of-scope languages (`ignoredLocales`).** A language listed here is left out of every
report and is never stamped. Its directory is still recognised as a translation, so its
pages are not mistaken for English pages. The key is the language code; the value is a free
note:

```json
{
  "ignoredLocales": { "de": "translation not started yet" },
  "entries": []
}
```

Regenerating the baseline keeps `ignoredLocales` as it is. Set it *before* generating the
baseline; otherwise the ignored language's missing pages are recorded as known debt first.

## What happens on GitHub

`.github/workflows/i18n-translation-drift.yml` runs when English or translated pages, the
VuePress config, or the script change.

| Event | What runs | Result |
| --- | --- | --- |
| Pull request | the check, over the commits of the pull request | one bot comment with the report, updated on each push |
| Push to `master` | the check, over the pushed commits | if there is new drift, an issue labelled `i18n`, `translation-needed` and `locale:<language>` |

This workflow runs on GitHub Actions, next to the repository's CircleCI pipeline
(`.circleci/config.yml`) and independently of it: CircleCI builds and publishes the site,
this workflow only reports on translations. It needs the permissions declared at the top of
the file: read the contents, write pull-request comments, and write issues.

Both jobs compare commits (`--head`), never `--working-tree`: on GitHub there is no work in
progress, and the report must describe exactly what is being merged.

Neither job fails the build today. See [blocking pull requests](#i-maintain-the-repository).

## Try it yourself

A ten-minute tour on a real page. Steps 3 to 7 edit files under `docs/`; step 8 undoes
everything.

**Before you start**, run `git status --short` and make sure you have no work in progress
under `docs/`, because step 8 discards all uncommitted changes there.

1. **Run the tests.**

   ```bash
   npm run i18n:test
   ```

   Expect `pass 20`, `fail 0`.

2. **Look at the coverage.**

   ```bash
   node scripts/i18n-drift-check.mjs --audit --markdown-out i18n-report.md
   ```

   Open `i18n-report.md` in Markdown preview and find the `Coverage` tables.

3. **Stamp one page.**

   ```bash
   npm run i18n:stamp -- docs/fr/index.md
   git hash-object docs/index.md
   ```

   Open `docs/fr/index.md`: an `i18n_source_sha:` line appeared at the top. Its value is
   exactly what the second command prints: the stamp is git's fingerprint of the English
   page.

4. **Confirm the page is up to date.**

   ```bash
   npm run i18n:explain -- docs/fr/index.md
   ```

   Expect `docs/fr/index.md is up to date with docs/index.md`.

5. **Pretend the English page changed.** Add any sentence at the end of `docs/index.md`,
   save, and run step 4 again. Your sentence is shown with a `+` in front. Run step 2
   again: the report now shows `stale | 1`.

   The order of steps 3 and 5 matters. If you change the English page *before* stamping,
   the stamp records the changed version and no drift is detected.

6. **See the bulk-stamp safeguard.**

   ```bash
   npm run i18n:stamp
   ```

   This writes a stamp into every unstamped translation (several hundred files; step 8
   undoes it). The summary ends with `1 out of date left untouched`: the stale page from
   step 5 was *not* marked up to date.

7. **Re-stamp the page you "updated".**

   ```bash
   npm run i18n:stamp -- docs/fr/index.md
   npm run i18n:explain -- docs/fr/index.md
   ```

   Expect `1 updated`, then `is up to date`. To try `--changed` instead, edit an already
   stamped translated page, save, and run `npm run i18n:stamp -- --changed --base HEAD`.

8. **Put everything back.**

   ```bash
   git checkout -- docs
   git status --short
   ```

9. **Run the pull-request check locally.** Add a sentence to `docs/index.md` again, save,
   do not commit, and run:

   ```bash
   npm run i18n:check
   ```

   The report's range reads `...working tree`, and `docs/fr/index.md` is listed even though
   nothing was committed. Undo the edit with `git checkout -- docs/index.md`.

## The tests

```bash
npm run i18n:test
```

The tests live in `scripts/i18n-drift-check.test.mjs` and take about fifteen seconds. Each test
builds a small throwaway git repository in the system's temporary folder, puts a few pages
in it, runs the real script as a command, checks the result, and deletes the folder. They
never touch this repository.

A `✔` line is a passing test, a `✖` line is a failing one, followed by what was expected
and what was found. `fail 0` at the bottom is the line to look for. Run the tests after any
change to the script.

In the table, "old stamp" means a fake stamp that matches nothing, which makes the page
stale.

| # | Setup | Command | Must be true |
| --- | --- | --- | --- |
| 1 | Repository configured like a Windows checkout (`core.autocrlf=true`), English page saved with Windows line endings, unstamped translation | `--stamp` | The stamp written equals the hash git stores for the English page |
| 2 | Same kind of repository, translation stamped with git's hash | `--audit` | No finding at all |
| 3 | Translation with an old stamp; baseline generated; then the English page changes and is committed | check with `--fail-on stale,needs_review` | The page is `stale`, marked as known debt, and the exit code is 0 |
| 4 | Translation with an old stamp | `--stamp` | The old stamp is still there; output says `1 out of date left untouched` |
| 5 | Unstamped translation | `--stamp` | The page gets the correct stamp |
| 6 | Two translations with old stamps | `--stamp docs/fr/one.md` | `one.md` is refreshed, `two.md` keeps its old stamp |
| 7 | Translation with an old stamp | `--stamp --force` | The stamp is refreshed |
| 8 | Translation stamped, then the English text changes from "Version one." to "Version two." | `--explain` | Output contains `-Version one.` and `+Version two.`; exit code 0 |
| 9 | Translation stamped with the current English version | `--explain` | Output says `up to date`; exit code 0 |
| 10 | Translation with a stamp git has never seen | `--explain` | Clear error `... not found in this repository`; exit code 1 |
| 11 | Unstamped translation | `--explain` | Clear error mentioning `i18n_source_sha`; exit code 1 |
| 12 | Section `a`: one page translated and current, one not translated. Section `b`: one page translated but unstamped | `--audit` | JSON coverage for `fr` is 3 pages, 2 translated, 1 up to date, with the right split per section |
| 13 | Same as 12 | `--audit` | The printed report contains the coverage table with the right percentages |
| 14 | Two translations with old stamps, committed; then one is edited and *not* committed | `--stamp --changed` | Only the edited page is refreshed |
| 15 | One unstamped translation committed; then a brand-new translation that git does not track yet | `--stamp --changed` | The new page is stamped; the untouched page is left unstamped |
| 16 | Stamped, up-to-date translation committed; then the English page is edited and *not* committed | check with `--working-tree` | The translation is reported `stale` |
| 17 | Same start; then a new English page is created that git does not track yet | check with `--working-tree` | Its translation is reported `missing` |
| 18 | Same start; then the English page is deleted and the deletion is *not* committed | check with `--working-tree` | The translation is reported `orphaned` |
| 19 | Same as 16 | check with `--head HEAD` | No finding: without `--working-tree`, uncommitted work stays out, which is what CI relies on |
| 20 | Same start | check with both `--head` and `--working-tree` | Clear error naming both options; exit code 1 |

Tests 1 to 4 each reproduce a bug that existed (see [design notes](#design-notes)). Tests 5
to 7 make sure the safeguard from test 4 did not break normal stamping.

## What the script cannot know

| The script knows | The script does not know |
| --- | --- |
| That the English page changed since the last stamp. Always, exactly | Whether the translation is complete |
| Which English lines changed | Whether the translation is correct |
| | Whether the change was really carried across before the page was re-stamped |

Stamping is a statement made by a person. Two things keep it honest:

- a bare `npm run i18n:stamp` never refreshes a stale stamp, so nobody does it by accident;
- a refreshed stamp shows up as a changed line in the pull request, where a reviewer can
  check that the translation changed with it.

## Troubleshooting

**I changed an English page and nothing is reported.** Most likely the translation is not
stamped: an audit then shows it as `unstamped`, not `stale`, because there is nothing to
compare with. If you called the script by hand with `--head`, uncommitted changes are left
out; use `npm run i18n:check`, which passes `--working-tree`.

**Everything is `unstamped` and "Up to date" is 0%.** First-time setup has not been done.
See [I maintain the repository](#i-maintain-the-repository).

**Hundreds of `missing` pages for one language.** Its translation has just started, and
every page not translated yet counts as `missing`. The number drops as pages are
translated. To keep that language out of the reports for now, add it to `ignoredLocales`.

**`Warning: docs/<language>/ exists but is not declared in docs/.vuepress/config.js`.** The
directory is treated as a language, but VuePress will not show it in the language switcher
until it is declared in the config. Harmless for the script.

**`Base ref "origin/master" not found. Falling back to "master".`** Harmless. Run
`git fetch origin` to compare with the latest upstream state.

**`git diff ... failed` in CI.** The checkout is shallow. Use `actions/checkout` with
`fetch-depth: 0`.

**`--explain` says the recorded version was not found.** The stamp was written by hand or
comes from a version of the English page that was never committed. Re-translate against the
current page and re-stamp.

**A page became `stale` right after stamping.** It was stamped while the English page had
uncommitted changes, and those changes were then discarded. Re-stamp it.

## Design notes

**Why a content hash, not "was the file edited?" or commit dates.** An earlier version asked
whether the translated file was touched in the same change. That measures the gesture, not
the content: adding a comma to the French page made it look current. Commit dates are no
better: a squash or a rebase rewrites them, and the whole French translation landed in one
squashed commit, so every page shared a date. Nothing done inside the translated file can
change the hash of the English file.

**Why the hash comes from git.** The script asks `git hash-object` rather than hashing the
bytes on disk. With `core.autocrlf`, a Windows checkout holds CRLF line endings where the
repository stores LF, so hashing raw bytes gives a different answer on a translator's
Windows machine than in CI on Linux, and every page stamped on Windows would be reported
stale. `git hash-object` applies the same line-ending rules as `git add`. All files are
hashed in one git call.

**Why git is called without a shell.** On Windows, `cmd.exe` removes the `^` of
`<ref>^{commit}`, so no base branch could ever be resolved and the check mode failed on
every Windows machine. Calling git directly also means a branch name can never be read as
shell syntax.

**Why a bare `--stamp` refuses to refresh stale stamps.** A translator who updates one page
and then stamps everything would silently mark every other stale page as current. A false
"up to date" cannot be recovered; a stale warning can. Refreshing therefore takes a page
name, `--changed`, or `--force`.

**Why `npm run i18n:check` looks at the working tree, and CI does not.** A person at their
desk wants to know what their change will leave behind *before* committing, and a commit
range cannot see work in progress. CI is the opposite case: it must describe exactly the
commits being merged, so it keeps an explicit `--base`/`--head` range. The verdicts
themselves always came from the files on disk; `--working-tree` makes the list of changed
pages come from the same place.

**Why both modes use the word `stale`.** The baseline is written by an audit and matched on
status and path. When the check mode used a different status name for the same condition,
known debt was never recognised and showed up as new. `needs_review` remains only for the
weaker verdict on unstamped pages.

**Why languages come from both the config and the disk.** A language directory can exist
before anyone declares it in the VuePress config. If it were not recognised, its pages
would be treated as English pages and the script would demand translations *of them*. The
script uses both sources and warns about the difference.

**Why first-time stamping is acceptable.** Stamping every page at once asserts something
nobody verified. It is the same bargain as the baseline: freeze the past, watch what comes
next.
