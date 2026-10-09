#!/usr/bin/env node

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

 * MaximeNzo
 * Chancel WOROU <worouchancel@gmail.com>
 * Nounagnon02

 --------------
 ******/

/**
 * NOTES:
 * - ESM module (thus the extension `.mjs`), since package.json does not set `"type": "module"`.
 * - Detects translation drift between the English source docs under `docs/` and their
 *   localized copies under `docs/<locale>/`.
 *
 * HOW "UP TO DATE" IS DECIDED - read this first, it is the heart of the script.
 *
 * Every translated page carries a HASH of the English page it was made from, stored in its
 * front matter as `i18n_source_sha`. The hash is git's own blob hash of the source file.
 *
 *     docs/fr/technical/guide.md
 *     ---
 *     i18n_source_sha: 7e45a52f21d78bfc6c6233abd7e8b2a73b007a10   <- hash of docs/technical/guide.md
 *     ---
 *
 * To judge a translation we recompute the hash of the current English file and compare:
 *
 *     recorded hash === current hash  ->  the translation matches this exact English text
 *     recorded hash !== current hash  ->  the source moved on; the translation is behind
 *
 * Why a hash and not "was the file edited in this change?" - the question the script used
 * to ask. That older test was about the GESTURE, not the CONTENT: adding a stray comma to
 * the French page made it look up to date even when the English edit was never carried
 * across. A hash cannot be fooled that way, because nothing you do inside the translated
 * file changes the hash of the English one.
 *
 * A hash also survives what timestamps do not. The previous staleness check compared git
 * commit dates, which a squash or a rebase rewrites - and indeed the whole French
 * translation landed in one squashed commit, so every page shares a date and the check
 * detected nothing. Content hashing is immune to both.
 *
 * Cost of the approach: the hash is only true if translators refresh it (`npm run
 * i18n:stamp`). A page whose hash was never written is reported as `unstamped` rather than
 * silently trusted - see judgeTranslation().
 *
 * Two reporting modes:
 *   (default)  diff mode  - inspects a git range. Used by PR / push CI. With
 *                           --working-tree the range ends at the files on disk, which is
 *                           what `npm run i18n:check` uses on a contributor's machine.
 *   --audit               - scans the whole working tree. Used for the standing backlog,
 *                           and the only mode that reports coverage.
 *
 * Two translator tools:
 *   --stamp               - records source hashes. The only mode that edits documentation.
 *   --explain <page>      - shows what changed in the source since <page> was translated.
 *
 * Exit codes:
 *   0  clean (or report-only)
 *   1  usage or configuration error
 *   2  drift found outside of the baseline, and --fail-on asked us to block
 *
 * Design notes and the rationale behind each rule: ./i18n-drift-check.md
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const DOCS_DIR = "docs";
const CONFIG_PATH = "docs/.vuepress/config.js";
const BASELINE_PATH = "scripts/i18n-baseline.json";

// Front-matter key under which a translated page records the HASH of its English source.
// Written by --stamp, read by every verdict. Because it is a hash of the source file, no
// edit made inside the translated file can change it - which is precisely what stops a
// cosmetic tweak from passing as a real translation.
const STAMP_KEY = "i18n_source_sha";
const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

// A locale directory is a language tag: `fr`, `pt`, `pt-BR`, `zh-Hans`.
// Content directories (`adoption`, `getting-started`, ...) never match this.
const LOCALE_DIR_PATTERN = /^[a-z]{2}(-[A-Za-z]{2,4})?$/;

const STATUS_META = {
  missing: { emoji: "❌", label: "translation does not exist" },
  orphaned: { emoji: "🗑️", label: "translation exists but its source is gone" },
  stale: { emoji: "⚠️", label: "translation records an older version of the source" },
  needs_review: { emoji: "⚠️", label: "source changed, and the unstamped translation was not touched" },
  updated: { emoji: "✅", label: "translation matches the current source" },
  unstamped: { emoji: "·", label: `translation carries no ${"`i18n_source_sha`"} yet` },
};

const ALL_DRIFT_STATUSES = ["missing", "orphaned", "stale", "needs_review"];

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (!current.startsWith("--")) continue;

    // Support both `--key value` and `--key=value`.
    const equalsIndex = current.indexOf("=");
    if (equalsIndex !== -1) {
      args[current.slice(2, equalsIndex)] = current.slice(equalsIndex + 1);
      continue;
    }

    const key = current.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      i += 1;
    } else {
      args[key] = "true";
    }
  }
  return args;
}

function fail(message) {
  process.stderr.write(`[i18n-check] ${message}\n`);
  process.exit(1);
}

// No shell in between: on Windows, cmd.exe eats the `^` of `<ref>^{commit}`, and a ref name
// should never be given the chance to be read as shell syntax anyway.
function runGit(args, input) {
  return execFileSync("git", ["-c", "core.quotepath=false", ...args], {
    encoding: "utf8",
    input,
    stdio: [input === undefined ? "ignore" : "pipe", "pipe", "pipe"],
  }).trim();
}

function refExists(ref) {
  if (!ref) return false;
  try {
    runGit(["rev-parse", "--verify", "--quiet", `${ref}^{commit}`]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Locales come from two places, and we need the union of both.
 *
 * The VuePress config is the declared source of truth, but a locale directory can exist
 * on disk before anyone remembers to declare it (this is exactly what happened to `docs/pt/`).
 * An undeclared locale directory that we failed to recognize would be treated as English
 * source material, and we would then demand translations *of it* - so we trust the disk too,
 * and surface the discrepancy instead of silently papering over it.
 */
function detectLocales(repoRoot) {
  const declared = localesFromConfig(path.join(repoRoot, CONFIG_PATH));
  const onDisk = localesFromDisk(path.join(repoRoot, DOCS_DIR));

  const locales = [...new Set([...declared, ...onDisk])].sort();
  const undeclared = onDisk.filter((locale) => !declared.includes(locale));
  const unbuilt = declared.filter((locale) => !onDisk.includes(locale));

  return { locales, declared, onDisk, undeclared, unbuilt };
}

function localesFromConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    fail(`VuePress config not found at ${configPath}. Run this from the repository root.`);
  }

  // config.js is CommonJS and side-effect free (it only reads process.env), so requiring it
  // is both safe and far more robust than pattern-matching the file as text.
  let config;
  try {
    config = createRequire(import.meta.url)(configPath);
  } catch (error) {
    fail(`Could not load ${CONFIG_PATH}: ${error.message}`);
  }

  const keys = [
    ...Object.keys(config.locales || {}),
    ...Object.keys((config.themeConfig || {}).locales || {}),
  ];

  return [...new Set(keys.map((key) => key.replaceAll("/", "")).filter(Boolean))].sort();
}

function localesFromDisk(docsRoot) {
  return fs
    .readdirSync(docsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .filter((name) => LOCALE_DIR_PATTERN.test(name))
    .sort();
}

function resolveBaseRef(requestedBase) {
  const candidates = [
    requestedBase,
    requestedBase?.startsWith("origin/") ? requestedBase.replace(/^origin\//, "") : null,
    "origin/master",
    "master",
    "origin/main",
    "main",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (refExists(candidate)) {
      return { ref: candidate, fellBack: candidate !== requestedBase };
    }
  }

  return { ref: null, fellBack: true };
}

/**
 * `--name-status` rather than `--name-only`: without the status letter we cannot tell a
 * deleted source from a modified one, and would demand translations of files that no
 * longer exist. `-M` folds renames into a single R entry.
 */
function readChanges(baseRef, headRef) {
  let output;
  try {
    output = runGit(["diff", "--name-status", "-M", `${baseRef}...${headRef}`]);
  } catch (error) {
    fail(
      `git diff ${baseRef}...${headRef} failed: ${error.message.trim()}\n` +
        "If this runs in CI, make sure the checkout is not shallow (actions/checkout with fetch-depth: 0)."
    );
  }

  return parseNameStatus(output);
}

function parseNameStatus(output) {
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("\t");
      const code = parts[0];
      if (code.startsWith("R") || code.startsWith("C")) {
        return { status: code[0], oldPath: parts[1], path: parts[2] };
      }
      return { status: code[0], oldPath: null, path: parts[1] };
    });
}

/**
 * Every change since the base branch AS THE WORKING TREE STANDS: committed, staged, merely
 * saved, or not even tracked yet (reported as an addition).
 *
 * A commit range cannot see work in progress, and work in progress is exactly what a person
 * at their desk is asking about: `--working-tree` checks it before committing, and
 * `--stamp --changed` stamps right after editing.
 */
function readWorkingTreeChanges(baseRef) {
  const mergeBase = runGit(["merge-base", baseRef, "HEAD"]);
  const tracked = parseNameStatus(runGit(["diff", "--name-status", "-M", mergeBase]));
  const untracked = runGit(["ls-files", "--others", "--exclude-standard", "--", DOCS_DIR])
    .split("\n")
    .filter(Boolean)
    .map((filePath) => ({ status: "A", oldPath: null, path: filePath }));

  return [...tracked, ...untracked];
}

/**
 * THE HASH. Git's own blob hash of each file, asked from git itself - what
 * `git hash-object <file>` prints, so anyone can verify a stamp by hand.
 *
 * It has to come from git rather than from hashing the bytes on disk: with `core.autocrlf`
 * a Windows checkout holds CRLF where the repository stores LF, and hashing the raw bytes
 * gives a different answer on a translator's machine than in CI. Every page stamped on
 * Windows would then report as stale on Linux. `hash-object` applies the same line-ending
 * rules as `git add`, so the hash is the one git stores, on every platform.
 *
 * One subprocess for the whole list (`--stdin-paths`), not one per page.
 *
 * Any change to the source file - one character, one newline - produces a different hash.
 * That is the property the whole check rests on.
 */
function gitBlobShas(filePaths) {
  if (filePaths.length === 0) return new Map();

  const hashes = runGit(["hash-object", "--stdin-paths"], `${filePaths.join("\n")}\n`).split("\n");
  return new Map(filePaths.map((filePath, index) => [filePath, hashes[index].trim()]));
}

/**
 * Reads back the source HASH a translation recorded in its front matter.
 *
 * Returns null when the page has no front matter at all, or has one that never recorded a
 * hash. Null is not "up to date" and not "stale" - it means we cannot judge this page by
 * content, and callers must say so rather than guess.
 */
function readSourceStamp(absolutePath) {
  if (!fs.existsSync(absolutePath)) return null;

  const match = fs.readFileSync(absolutePath, "utf8").match(FRONT_MATTER_RE);
  if (!match) return null;

  const line = match[1].split("\n").find((entry) => entry.trim().startsWith(`${STAMP_KEY}:`));
  if (!line) return null;

  return line.slice(line.indexOf(":") + 1).trim().replace(/^["']|["']$/g, "") || null;
}

/**
 * Records a source HASH in a translated page, creating a front-matter block when the page
 * has none and leaving any existing keys untouched. Everything outside the stamp line is
 * preserved byte for byte - these are hand-written translations, not generated files.
 *
 * An existing stamp that differs is the drift signal itself, so it is only overwritten when
 * `overwrite` says the caller means it - see stampTranslations().
 *
 * Returns which of the five things happened, so --stamp can report real numbers instead of
 * claiming to have written every file it looked at.
 */
function writeSourceStamp(absolutePath, sha, { overwrite }) {
  const content = fs.readFileSync(absolutePath, "utf8");
  const stampLine = `${STAMP_KEY}: ${sha}`;
  const match = content.match(FRONT_MATTER_RE);

  if (!match) {
    fs.writeFileSync(absolutePath, `---\n${stampLine}\n---\n\n${content}`, "utf8");
    return "created";
  }

  const lines = match[1].split("\n");
  const index = lines.findIndex((entry) => entry.trim().startsWith(`${STAMP_KEY}:`));

  if (index === -1) {
    lines.push(stampLine);
  } else if (lines[index].trim() === stampLine) {
    return "unchanged";
  } else if (!overwrite) {
    return "kept";
  } else {
    lines[index] = stampLine;
  }

  // Function replacer: a `$` inside existing front matter must not be read as a pattern.
  const rebuilt = `---\n${lines.join("\n")}\n---\n`;
  fs.writeFileSync(absolutePath, content.replace(FRONT_MATTER_RE, () => rebuilt), "utf8");
  return index === -1 ? "stamped" : "updated";
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function isSourceDoc(filePath, locales) {
  if (!filePath.startsWith(`${DOCS_DIR}/`)) return false;
  if (!filePath.endsWith(".md")) return false;
  if (filePath.startsWith(`${DOCS_DIR}/.vuepress/`)) return false;
  return !locales.some((locale) => filePath.startsWith(`${DOCS_DIR}/${locale}/`));
}

function localeOf(filePath, locales) {
  return locales.find((locale) => filePath.startsWith(`${DOCS_DIR}/${locale}/`)) || null;
}

function toLocalizedPath(sourceFile, locale) {
  return `${DOCS_DIR}/${locale}/${sourceFile.slice(DOCS_DIR.length + 1)}`;
}

function toSourcePath(localizedFile, locale) {
  return `${DOCS_DIR}/${localizedFile.slice(`${DOCS_DIR}/${locale}/`.length)}`;
}

/**
 * Walks by hand rather than using `readdirSync({ recursive: true })` + `dirent.parentPath`,
 * which would silently produce wrong paths on Node older than 20.12.
 */
function listMarkdown(dir, repoRoot) {
  const absolute = path.join(repoRoot, dir);
  if (!fs.existsSync(absolute)) return [];

  const found = [];
  const walk = (relativeDir) => {
    for (const entry of fs.readdirSync(path.join(repoRoot, relativeDir), { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const relativePath = `${relativeDir}/${entry.name}`;
      if (entry.isDirectory()) {
        walk(relativePath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        found.push(normalizePath(relativePath));
      }
    }
  };

  walk(dir);
  return found;
}

function loadBaseline(repoRoot) {
  const empty = { entries: [], ignoredLocales: {}, index: new Set() };
  const baselinePath = path.join(repoRoot, BASELINE_PATH);
  if (!fs.existsSync(baselinePath)) return empty;

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch (error) {
    fail(`Could not parse ${BASELINE_PATH}: ${error.message}`);
  }

  const entries = parsed.entries || [];
  return {
    entries,
    ignoredLocales: parsed.ignoredLocales || {},
    index: new Set(entries.map((entry) => `${entry.status}|${entry.path}`)),
  };
}

function isKnownDebt(finding, baseline) {
  return baseline.index.has(`${finding.status}|${finding.path}`);
}

/**
 * Regenerating the baseline must not quietly discard `ignoredLocales`: that list is a team
 * decision about which languages are in scope, not something derived from the file tree.
 */
function writeBaseline(repoRoot, findings, ignoredLocales, generatedAt) {
  const entries = findings
    .filter((finding) => ALL_DRIFT_STATUSES.includes(finding.status))
    .map((finding) => ({
      status: finding.status,
      path: finding.path,
      source: finding.source,
    }))
    .sort((a, b) => `${a.status}${a.path}`.localeCompare(`${b.status}${b.path}`));

  const payload = {
    description:
      "Known translation gaps accepted at the time this file was generated. Findings listed " +
      "here are still reported, but do not fail CI, so only new regressions block a build. " +
      "Regenerate with: npm run i18n:baseline",
    generatedAt,
    ignoredLocalesHelp:
      "Locales listed below are out of scope: their directories are still recognized as " +
      "translations (so their pages are never mistaken for English sources), but they are " +
      "left out of every report. Remove one to start tracking it.",
    ignoredLocales,
    entries,
  };

  fs.writeFileSync(
    path.join(repoRoot, BASELINE_PATH),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8"
  );

  return entries.length;
}

/**
 * Diff mode: what did this change set do to the source docs, and did the translations follow?
 */
function collectDiffFindings({ changes, allLocales, reportedLocales, repoRoot }) {
  const changedPaths = new Set(changes.map((change) => normalizePath(change.path)));
  const sourceShas = gitBlobShas(
    changes
      .filter((change) => change.status !== "D")
      .map((change) => normalizePath(change.path))
      .filter((filePath) => isSourceDoc(filePath, allLocales))
      .filter((filePath) => fs.existsSync(path.join(repoRoot, filePath)))
  );
  const findings = [];

  for (const change of changes) {
    const filePath = normalizePath(change.path);
    // `allLocales` here, not `reportedLocales`: an out-of-scope locale directory must still
    // be recognized as a translation, or its pages get mistaken for English sources.
    if (!isSourceDoc(filePath, allLocales)) continue;

    for (const locale of reportedLocales) {
      const localizedPath = toLocalizedPath(filePath, locale);
      const exists = fs.existsSync(path.join(repoRoot, localizedPath));

      // A deleted source does not need translating - its translation needs deleting.
      if (change.status === "D") {
        if (exists) {
          findings.push({ status: "orphaned", locale, path: localizedPath, source: filePath });
        }
        continue;
      }

      if (!exists) {
        findings.push({ status: "missing", locale, path: localizedPath, source: filePath });
        continue;
      }

      findings.push({
        locale,
        path: localizedPath,
        source: filePath,
        ...judgeTranslation({
          repoRoot,
          currentSha: sourceShas.get(filePath),
          localizedPath,
          touchedInRange: changedPaths.has(localizedPath),
        }),
      });
    }
  }

  // A rename on the source side leaves the translation sitting at the old path.
  for (const change of changes) {
    if (change.status !== "R" || !change.oldPath) continue;
    const oldPath = normalizePath(change.oldPath);
    if (!isSourceDoc(oldPath, allLocales)) continue;

    for (const locale of reportedLocales) {
      const staleLocalizedPath = toLocalizedPath(oldPath, locale);
      if (fs.existsSync(path.join(repoRoot, staleLocalizedPath))) {
        findings.push({
          status: "orphaned",
          locale,
          path: staleLocalizedPath,
          source: `${oldPath} (renamed to ${normalizePath(change.path)})`,
        });
      }
    }
  }

  return findings;
}

/**
 * Is this translation the one that matches the current English page?
 *
 * With a stamp the answer is certain: the recorded hash either matches the source or it does
 * not, and no amount of unrelated editing inside the translated file can fake a match.
 * Without one we fall back to the older, weaker question - did the file appear in the same
 * change? - and flag the finding so the report can say how much it is worth.
 */
function judgeTranslation({ repoRoot, currentSha, localizedPath, touchedInRange }) {
  const stamp = readSourceStamp(path.join(repoRoot, localizedPath));

  if (!stamp) {
    return {
      status: touchedInRange ? "updated" : "needs_review",
      unstamped: true,
      detail: `no \`${STAMP_KEY}\` - verdict inferred from the diff alone`,
    };
  }

  // The comparison that makes the verdict trustworthy: the hash the translation recorded,
  // against the hash of the English file as it stands now.
  if (stamp === currentSha) return { status: "updated" };

  // Same status as audit mode gives the same condition: the baseline is written from an
  // audit and matched on status, so a second name here would make known debt look new.
  return {
    status: "stale",
    detail: `translates source ${stamp.slice(0, 7)}, current source is ${currentSha.slice(0, 7)}`,
  };
}

/**
 * Audit mode: the standing state of the repository, independent of any diff.
 */
function collectAuditFindings({ allLocales, reportedLocales, repoRoot }) {
  const findings = [];

  const sourceFiles = listMarkdown(DOCS_DIR, repoRoot).filter((filePath) =>
    isSourceDoc(filePath, allLocales)
  );
  const sourceShas = gitBlobShas(sourceFiles);

  for (const sourceFile of sourceFiles) {
    for (const locale of reportedLocales) {
      const localizedPath = toLocalizedPath(sourceFile, locale);
      const localizedAbs = path.join(repoRoot, localizedPath);

      if (!fs.existsSync(localizedAbs)) {
        findings.push({ status: "missing", locale, path: localizedPath, source: sourceFile });
        continue;
      }

      // Hash comparison, same rule as diff mode: what the translation claims to translate,
      // against what the English page actually is right now.
      const stamp = readSourceStamp(localizedAbs);
      if (!stamp) {
        findings.push({
          status: "unstamped",
          locale,
          path: localizedPath,
          source: sourceFile,
          unstamped: true,
        });
        continue;
      }

      const currentSha = sourceShas.get(sourceFile);
      // Hashes differ => the English page moved on after this translation was made.
      if (stamp !== currentSha) {
        findings.push({
          status: "stale",
          locale,
          path: localizedPath,
          source: sourceFile,
          detail: `translates source ${stamp.slice(0, 7)}, current source is ${currentSha.slice(0, 7)}`,
        });
      }
    }
  }

  for (const locale of reportedLocales) {
    for (const localizedPath of listMarkdown(`${DOCS_DIR}/${locale}`, repoRoot)) {
      if (localeOf(localizedPath, allLocales) !== locale) continue;
      const sourcePath = toSourcePath(localizedPath, locale);
      if (!fs.existsSync(path.join(repoRoot, sourcePath))) {
        findings.push({ status: "orphaned", locale, path: localizedPath, source: sourcePath });
      }
    }
  }

  return { findings, sourceFiles };
}

/**
 * How far along each locale is, overall and per top-level section of `docs/`.
 *
 * An audit only records what is wrong, so coverage is what remains: every source page that
 * drew no `missing` finding is translated, and every one that drew no finding at all is up
 * to date. "Translated" and "up to date" are kept apart on purpose - an unstamped page
 * exists, but nothing proves it still matches its source.
 */
function buildCoverage({ findings, sourceFiles, locales }) {
  const sectionOf = (sourceFile) => {
    const parts = sourceFile.split("/");
    return parts.length > 2 ? parts[1] : "(root)";
  };

  return locales.map((locale) => {
    const sections = new Map();
    const sectionFor = (sourceFile) => {
      const name = sectionOf(sourceFile);
      if (!sections.has(name)) {
        sections.set(name, { section: name, total: 0, translated: 0, upToDate: 0 });
      }
      return sections.get(name);
    };

    for (const sourceFile of sourceFiles) {
      const section = sectionFor(sourceFile);
      section.total += 1;
      section.translated += 1;
      section.upToDate += 1;
    }

    for (const finding of findings) {
      if (finding.locale !== locale || finding.status === "orphaned") continue;
      const section = sectionFor(finding.source);
      section.upToDate -= 1;
      if (finding.status === "missing") section.translated -= 1;
    }

    const rows = [...sections.values()].sort((a, b) => a.section.localeCompare(b.section));
    const sum = (key) => rows.reduce((total, row) => total + row[key], 0);

    return {
      locale,
      total: sum("total"),
      translated: sum("translated"),
      upToDate: sum("upToDate"),
      sections: rows,
    };
  });
}

function buildReport({ mode, findings, coverage, locales, localeInfo, baseline, range, generatedAt }) {
  const ignoredLocales = Object.keys(baseline.ignoredLocales);
  const annotated = findings.map((finding) => ({
    ...finding,
    known: isKnownDebt(finding, baseline),
  }));

  const counts = { missing: 0, orphaned: 0, stale: 0, needs_review: 0, updated: 0, unstamped: 0 };
  const newCounts = { missing: 0, orphaned: 0, stale: 0, needs_review: 0, updated: 0, unstamped: 0 };

  for (const finding of annotated) {
    counts[finding.status] += 1;
    if (!finding.known) newCounts[finding.status] += 1;
  }

  return {
    generatedAt,
    mode,
    range,
    locales,
    ignoredLocales,
    localeWarnings: {
      // Only worth flagging for locales we actually report on; an out-of-scope directory
      // is not expected to be wired into VuePress.
      undeclaredInConfig: localeInfo.undeclared.filter((l) => !ignoredLocales.includes(l)),
      declaredButAbsentOnDisk: localeInfo.unbuilt,
    },
    counts,
    newCounts,
    unstamped: annotated.filter((finding) => finding.unstamped).length,
    baselineSize: baseline.entries.length,
    // Audit mode only: a diff sees a handful of pages, not the state of a locale.
    coverage: coverage || [],
    findings: annotated,
    // Kept for backwards compatibility with the workflow's issue-creation step.
    hasDrift: ALL_DRIFT_STATUSES.some((status) => newCounts[status] > 0),
  };
}

function buildMarkdownReport(report) {
  const lines = ["## Translation Drift Report", ""];

  for (const locale of report.localeWarnings.undeclaredInConfig) {
    lines.push(
      `> 🔧 \`docs/${locale}/\` exists on disk but is not declared in \`${CONFIG_PATH}\`. ` +
        "It is treated as a locale here, but VuePress will not build a language switcher for it."
    );
    lines.push("");
  }

  if (report.mode === "diff" && report.findings.length === 0) {
    lines.push("No source documentation changed in this range. Nothing to translate.");
    return lines.join("\n");
  }

  if (report.mode === "audit" && report.findings.length === 0) {
    lines.push("Every source page has an up-to-date translation in every locale. ✅");
    return lines.join("\n");
  }

  lines.push(
    `Locales: ${report.locales.map((locale) => `\`${locale}\``).join(", ") || "_none_"}`,
    report.mode === "diff" ? `Range: \`${report.range}\`` : "Mode: full repository audit",
    ""
  );

  lines.push("| Status | New | Known debt | Meaning |", "| --- | ---: | ---: | --- |");
  for (const status of [...ALL_DRIFT_STATUSES, "updated", "unstamped"]) {
    if (report.counts[status] === 0) continue;
    const known = report.counts[status] - report.newCounts[status];
    lines.push(
      `| ${STATUS_META[status].emoji} ${status} | ${report.newCounts[status]} | ${known} | ${STATUS_META[status].label} |`
    );
  }
  lines.push("");

  lines.push(...buildCoverageLines(report.coverage));

  const actionable = report.findings.filter(
    (finding) => !finding.known && ALL_DRIFT_STATUSES.includes(finding.status)
  );

  if (actionable.some((finding) => finding.status === "stale")) {
    lines.push(
      "To see what changed in the English source of a stale page since it was translated: " +
        "`npm run i18n:explain -- <translated page>`",
      ""
    );
  }

  if (actionable.length === 0) {
    lines.push("No new drift. Everything flagged is already in the baseline.", "");
  } else {
    lines.push(`### Needs attention (${actionable.length})`, "");
    for (const finding of groupByLocale(actionable, report.locales)) {
      lines.push(`**\`${finding.locale}\`**`, "");
      for (const item of finding.items) {
        const detail = item.detail ? ` — ${item.detail}` : "";
        lines.push(`- ${STATUS_META[item.status].emoji} \`${item.path}\` (${item.status})${detail}`);
      }
      lines.push("");
    }
  }

  if (report.baselineSize > 0 || report.ignoredLocales.length > 0) {
    const parts = [];
    if (report.baselineSize > 0) {
      parts.push(`${report.baselineSize} known gap(s), reported but not blocking`);
    }
    if (report.ignoredLocales.length > 0) {
      parts.push(
        `locale(s) ${report.ignoredLocales.map((l) => `\`${l}\``).join(", ")} out of scope`
      );
    }
    lines.push(`<sub>Baseline (\`${BASELINE_PATH}\`): ${parts.join("; ")}.</sub>`);
  }

  const footnote =
    report.unstamped > 0
      ? `> ${report.unstamped} translation(s) carry no \`${STAMP_KEY}\`, so their verdict is inferred ` +
        "from the diff alone and may be wrong. Run `npm run i18n:stamp` to make it exact."
      : `> Verdicts are exact: each translation records the \`${STAMP_KEY}\` it was made from, so ` +
        "editing a translated file cannot make it look current when it is not.";

  lines.push("", footnote);

  return lines.join("\n");
}

function buildCoverageLines(coverage) {
  const lines = [];
  const share = (count, total) =>
    `${count} (${total === 0 ? 100 : Math.round((count / total) * 100)}%)`;

  for (const entry of coverage) {
    lines.push(
      `### Coverage - \`${entry.locale}\``,
      "",
      "| Section | Source pages | Translated | Up to date |",
      "| --- | ---: | ---: | ---: |"
    );
    for (const row of entry.sections) {
      lines.push(
        `| \`${row.section}\` | ${row.total} | ${share(row.translated, row.total)} | ${share(row.upToDate, row.total)} |`
      );
    }
    lines.push(
      `| **all** | ${entry.total} | ${share(entry.translated, entry.total)} | ${share(entry.upToDate, entry.total)} |`,
      ""
    );
  }

  return lines;
}

function groupByLocale(findings, locales) {
  return locales
    .map((locale) => ({ locale, items: findings.filter((finding) => finding.locale === locale) }))
    .filter((group) => group.items.length > 0);
}

function emitGithubAnnotations(report) {
  if (process.env.GITHUB_ACTIONS !== "true") return;

  for (const finding of report.findings) {
    if (finding.known || !ALL_DRIFT_STATUSES.includes(finding.status)) continue;
    const message = `${finding.status}: ${finding.path} (source: ${finding.source})`;
    process.stdout.write(`::warning file=${finding.source},title=i18n drift::${message}\n`);
  }
}

/**
 * Writes the source HASH into every translated page: for each English page, hash it once
 * and stamp that value into each of its translations. This is the only mode that modifies
 * documentation files, so it is always explicit and never runs in CI.
 *
 * Translators run this after carrying a change across. Skipping it leaves the page reporting
 * as behind, which is the deliberate failure direction - a stale warning is recoverable, a
 * false "up to date" is not.
 *
 * A bare `--stamp` only fills in pages that have no stamp yet. It must not refresh a stamp
 * that is out of date: a translator who carried one page across and then stamped everything
 * would silently mark every other stale page as current. Refreshing takes naming the page
 * (`--stamp <path>`), pointing at the pages just worked on (`--stamp --changed`), or
 * `--force` to say "all of them, I mean it".
 *
 * `only` is the set of translated pages to restrict to, or null for all of them.
 *
 * Bootstrapping is an assertion, not a measurement: stamping everything at once declares
 * "these translations are current as of today", which nobody can actually verify. That is
 * the same bargain as the baseline - freeze the past, watch what comes next.
 */
function stampTranslations({ allLocales, reportedLocales, repoRoot, only, force }) {
  const tally = { created: 0, stamped: 0, updated: 0, unchanged: 0, kept: 0, skipped: 0 };
  const overwrite = force || Boolean(only);

  const sourceFiles = listMarkdown(DOCS_DIR, repoRoot).filter((filePath) =>
    isSourceDoc(filePath, allLocales)
  );

  const sourceShas = gitBlobShas(sourceFiles);

  for (const sourceFile of sourceFiles) {
    const sourceSha = sourceShas.get(sourceFile);

    for (const locale of reportedLocales) {
      const localizedPath = toLocalizedPath(sourceFile, locale);
      if (only && !only.has(localizedPath)) continue;

      const localizedAbs = path.join(repoRoot, localizedPath);
      if (!fs.existsSync(localizedAbs)) {
        tally.skipped += 1;
        continue;
      }

      tally[writeSourceStamp(localizedAbs, sourceSha, { overwrite })] += 1;
    }
  }

  return tally;
}

/**
 * Shows a translator WHAT to carry across: the diff of the English page between the version
 * the translation was made from and the version that exists now.
 *
 * Costs nothing extra to support - the stamp is a git blob hash, so the old English text is
 * still in the repository under that very name, and git can diff it against today's file.
 */
function explainTranslation({ target, allLocales, repoRoot }) {
  const localizedPath = normalizePath(target);
  const locale = localeOf(localizedPath, allLocales);
  if (!locale) {
    fail(`${target} is not a translated page. Expected a path like ${DOCS_DIR}/<locale>/page.md.`);
  }
  if (!fs.existsSync(path.join(repoRoot, localizedPath))) {
    fail(`${localizedPath} does not exist.`);
  }

  const sourcePath = toSourcePath(localizedPath, locale);
  if (!fs.existsSync(path.join(repoRoot, sourcePath))) {
    fail(`The source of ${localizedPath} (${sourcePath}) no longer exists: the translation is orphaned.`);
  }

  const stamp = readSourceStamp(path.join(repoRoot, localizedPath));
  if (!stamp) {
    fail(
      `${localizedPath} carries no \`${STAMP_KEY}\`, so there is no record of which version of ` +
        `${sourcePath} it translates.`
    );
  }

  const currentSha = gitBlobShas([sourcePath]).get(sourcePath);
  if (stamp === currentSha) {
    return `${localizedPath} is up to date with ${sourcePath} (${currentSha.slice(0, 7)}).\n`;
  }

  try {
    runGit(["cat-file", "-e", `${stamp}^{blob}`]);
  } catch {
    fail(
      `${localizedPath} records source version ${stamp.slice(0, 7)}, which was not found in this ` +
        "repository. The stamp may have been typed by hand, or the clone may be shallow."
    );
  }

  return (
    `${sourcePath} changed since ${localizedPath} was translated ` +
    `(${stamp.slice(0, 7)} -> ${currentSha.slice(0, 7)}).\n` +
    `Carry these changes across, then run: npm run i18n:stamp -- ${localizedPath}\n\n` +
    `${runGit(["diff", "--no-color", stamp, sourcePath])}\n`
  );
}

function resolveBaseRefOrFail(requestedBase) {
  const { ref: baseRef, fellBack } = resolveBaseRef(requestedBase);

  if (!baseRef) {
    fail(
      `Base ref "${requestedBase}" could not be resolved, and no fallback branch exists. ` +
        "Refusing to report a clean run against an unknown range."
    );
  }

  if (fellBack) {
    process.stderr.write(
      `[i18n-check] Base ref "${requestedBase}" not found. Falling back to "${baseRef}".\n`
    );
  }

  return baseRef;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = process.cwd();
  const generatedAt = new Date().toISOString();

  if (args.help === "true") {
    process.stdout.write(usage());
    return;
  }

  const mode = args.audit === "true" ? "audit" : "diff";
  const localeInfo = detectLocales(repoRoot);

  if (localeInfo.locales.length === 0) {
    fail(`No locales found in ${CONFIG_PATH} or under ${DOCS_DIR}/.`);
  }

  // Loaded before collection: `ignoredLocales` decides which locales are reported at all.
  const baseline = loadBaseline(repoRoot);
  const allLocales = localeInfo.locales;
  const reportedLocales = allLocales.filter((locale) => !baseline.ignoredLocales[locale]);

  if (reportedLocales.length === 0) {
    fail(
      `Every detected locale (${allLocales.join(", ")}) is listed in ignoredLocales. ` +
        `Nothing left to check - edit ${BASELINE_PATH}.`
    );
  }

  for (const locale of localeInfo.undeclared) {
    if (baseline.ignoredLocales[locale]) continue;
    process.stderr.write(
      `[i18n-check] Warning: docs/${locale}/ exists but is not declared in ${CONFIG_PATH}.\n`
    );
  }

  if (args.explain) {
    if (args.explain === "true") fail("--explain needs the path of a translated page.");
    process.stdout.write(explainTranslation({ target: args.explain, allLocales, repoRoot }));
    return;
  }

  if (args.stamp) {
    let only = args.stamp === "true" ? null : new Set([normalizePath(args.stamp)]);
    if (args.changed === "true") {
      const baseRef = resolveBaseRefOrFail(args.base || "origin/master");
      only = new Set(
        readWorkingTreeChanges(baseRef)
          .filter((change) => change.status !== "D")
          .map((change) => normalizePath(change.path))
      );
    }
    const tally = stampTranslations({
      allLocales,
      reportedLocales,
      repoRoot,
      only,
      force: args.force === "true",
    });
    process.stdout.write(
      `[i18n-check] Stamped translations with ${STAMP_KEY}: ` +
        `${tally.created} front matter created, ${tally.stamped} key added, ` +
        `${tally.updated} updated, ${tally.unchanged} already current, ` +
        `${tally.kept} out of date left untouched.\n`
    );
    if (tally.kept > 0) {
      process.stdout.write(
        "[i18n-check] Out-of-date stamps are kept so the drift stays visible. Once a page is " +
          "translated, refresh it with --stamp <path> or --stamp --changed " +
          "(or everything with --stamp --force).\n"
      );
    }
    return;
  }

  let findings = [];
  let coverage = null;
  let range = null;

  if (mode === "diff") {
    const requestedBase = args.base || "origin/master";
    const workingTree = args["working-tree"] === "true";
    if (workingTree && args.head) {
      fail("--working-tree already ends at the files on disk; it cannot be combined with --head.");
    }

    const headRef = args.head || "HEAD";
    const baseRef = resolveBaseRefOrFail(requestedBase);

    range = workingTree ? `${baseRef}...working tree` : `${baseRef}...${headRef}`;
    findings = collectDiffFindings({
      changes: workingTree ? readWorkingTreeChanges(baseRef) : readChanges(baseRef, headRef),
      allLocales,
      reportedLocales,
      repoRoot,
    });
  } else {
    const audit = collectAuditFindings({ allLocales, reportedLocales, repoRoot });
    findings = audit.findings;
    coverage = buildCoverage({ ...audit, locales: reportedLocales });
  }

  if (args["update-baseline"] === "true") {
    if (mode !== "audit") {
      fail("--update-baseline requires --audit, so the baseline covers the whole repository.");
    }
    const frozen = writeBaseline(repoRoot, findings, baseline.ignoredLocales, generatedAt);
    const ignored = Object.keys(baseline.ignoredLocales);
    const suffix = ignored.length > 0 ? `, ignored locales kept: ${ignored.join(", ")}` : "";
    process.stdout.write(
      `[i18n-check] Baseline written to ${BASELINE_PATH} (${frozen} entries${suffix}).\n`
    );
    return;
  }

  const report = buildReport({
    mode,
    findings,
    coverage,
    locales: reportedLocales,
    localeInfo,
    baseline,
    range,
    generatedAt,
  });
  const markdown = buildMarkdownReport(report);

  if (args["json-out"]) {
    fs.writeFileSync(args["json-out"], `${JSON.stringify(report, null, 2)}\n`, "utf8");
  }
  if (args["markdown-out"]) {
    fs.writeFileSync(args["markdown-out"], `${markdown}\n`, "utf8");
  }

  process.stdout.write(`${markdown}\n`);
  emitGithubAnnotations(report);

  const failOn = resolveFailOn(args);
  const blocking = failOn.filter((status) => report.newCounts[status] > 0);
  if (blocking.length > 0) {
    process.stderr.write(
      `[i18n-check] New drift outside the baseline: ${blocking
        .map((status) => `${status}=${report.newCounts[status]}`)
        .join(", ")}\n`
    );
    process.exit(2);
  }
}

function resolveFailOn(args) {
  // `--fail-on-missing true` is kept as an alias for the original flag.
  if (args["fail-on-missing"] === "true" && !args["fail-on"]) return ["missing"];
  if (!args["fail-on"] || args["fail-on"] === "none") return [];

  const requested = args["fail-on"].split(",").map((value) => value.trim()).filter(Boolean);
  const unknown = requested.filter((status) => !ALL_DRIFT_STATUSES.includes(status));
  if (unknown.length > 0) {
    fail(`Unknown --fail-on status: ${unknown.join(", ")}. Valid: ${ALL_DRIFT_STATUSES.join(", ")}`);
  }
  return requested;
}

function usage() {
  return [
    "Usage: node scripts/i18n-drift-check.mjs [options]",
    "",
    "  --base <ref>          Base ref for diff mode (default: origin/master)",
    "  --head <ref>          Head ref for diff mode (default: HEAD)",
    "  --working-tree        Diff mode: end at the files on disk instead of --head, so that",
    "                        uncommitted and untracked changes are reported too",
    "  --audit               Scan the whole repository instead of a git range",
    "  --json-out <path>     Write the JSON report",
    "  --markdown-out <path> Write the Markdown report",
    "  --fail-on <list>      Exit 2 on new findings, e.g. missing,orphaned",
    "  --update-baseline     Rewrite the baseline from a full audit (implies --audit)",
    "  --stamp [path]        Record the current source hash in translations that have none,",
    "                        or refresh it in the one translation given",
    "  --changed             With --stamp: refresh the translations edited since --base,",
    "                        committed or not",
    "  --explain <path>      Show what changed in the source since <path> was translated",
    "  --force               With --stamp: also refresh stamps that are out of date",
    "  --help                Show this message",
    "",
  ].join("\n");
}

main();
