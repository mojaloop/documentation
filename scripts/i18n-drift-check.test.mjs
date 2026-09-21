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

 * Chancel WOROU <worouchancel@gmail.com>
 * Nounagnon02

 --------------
 ******/

/**
 * Tests for i18n-drift-check.mjs. Run with: npm run i18n:test
 *
 * The script is exercised as a CLI against a throwaway git repository, because what matters
 * is what a translator or CI actually gets back: the stamps written, the report, the exit code.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";

const SCRIPT = path.join(path.dirname(fileURLToPath(import.meta.url)), "i18n-drift-check.mjs");
const OLD_SHA = "1111111111111111111111111111111111111111";

function createRepo(t, { autocrlf = "false" } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "i18n-drift-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  const repo = {
    root,
    git: (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim(),
    write(relativePath, content) {
      const absolute = path.join(root, relativePath);
      fs.mkdirSync(path.dirname(absolute), { recursive: true });
      fs.writeFileSync(absolute, content, "utf8");
    },
    read: (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8"),
    commit(message) {
      repo.git("add", "-A");
      repo.git("commit", "--quiet", "-m", message);
      return repo.git("rev-parse", "HEAD");
    },
    run(...args) {
      const result = spawnSync(process.execPath, [SCRIPT, ...args], { cwd: root, encoding: "utf8" });
      return { code: result.status, stdout: result.stdout, stderr: result.stderr };
    },
    report(...args) {
      const result = repo.run(...args, "--json-out", "report.json");
      assert.ok(fs.existsSync(path.join(root, "report.json")), `no report written: ${result.stderr}`);
      return { ...result, report: JSON.parse(repo.read("report.json")) };
    },
  };

  repo.git("init", "--quiet");
  repo.git("config", "user.email", "test@example.com");
  repo.git("config", "user.name", "Test");
  repo.git("config", "core.autocrlf", autocrlf);
  repo.git("config", "core.safecrlf", "false");
  repo.write("docs/.vuepress/config.js", 'module.exports = { locales: { "/": {}, "/fr/": {} } };\n');
  // The baseline is written under scripts/, which always exists in the real repository.
  fs.mkdirSync(path.join(root, "scripts"));

  return repo;
}

function stamped(sha, body) {
  return `---\ni18n_source_sha: ${sha}\n---\n\n${body}`;
}

function stampOf(repo, relativePath) {
  const match = repo.read(relativePath).match(/^i18n_source_sha: (.+)$/m);
  return match ? match[1].trim() : null;
}

test("--stamp records the hash git stores, even when the working copy uses CRLF", (t) => {
  const repo = createRepo(t, { autocrlf: "true" });
  repo.write("docs/guide.md", "# Guide\r\n\r\nSome text.\r\n");
  repo.write("docs/fr/guide.md", "# Guide\n\nDu texte.\n");
  repo.commit("initial");

  repo.run("--stamp");

  assert.equal(stampOf(repo, "docs/fr/guide.md"), repo.git("rev-parse", "HEAD:docs/guide.md"));
});

test("--audit treats a page stamped with git's hash as current when the working copy uses CRLF", (t) => {
  const repo = createRepo(t, { autocrlf: "true" });
  repo.write("docs/guide.md", "# Guide\r\n\r\nSome text.\r\n");
  repo.write("docs/fr/guide.md", "placeholder\n");
  repo.commit("source");
  repo.write("docs/fr/guide.md", stamped(repo.git("rev-parse", "HEAD:docs/guide.md"), "# Guide\n"));
  repo.commit("translation");

  const { report } = repo.report("--audit");

  assert.deepEqual(report.findings, []);
});

test("a stale page frozen in the baseline is known debt in diff mode too", (t) => {
  const repo = createRepo(t);
  repo.write("docs/guide.md", "# Guide\n\nVersion one.\n");
  repo.write("docs/fr/guide.md", stamped(OLD_SHA, "# Guide\n"));
  const base = repo.commit("initial");

  repo.run("--audit", "--update-baseline");
  repo.write("docs/guide.md", "# Guide\n\nVersion two.\n");
  repo.commit("source moves on");

  const { code, report } = repo.report("--base", base, "--head", "HEAD", "--fail-on", "stale,needs_review");

  const finding = report.findings.find((entry) => entry.path === "docs/fr/guide.md");
  assert.equal(finding.status, "stale");
  assert.equal(finding.known, true);
  assert.equal(code, 0);
});

test("bulk --stamp leaves a page whose stamp is out of date untouched", (t) => {
  const repo = createRepo(t);
  repo.write("docs/behind.md", "# Behind\n");
  repo.write("docs/fr/behind.md", stamped(OLD_SHA, "# En retard\n"));
  repo.commit("initial");

  const { stdout } = repo.run("--stamp");

  assert.equal(stampOf(repo, "docs/fr/behind.md"), OLD_SHA);
  assert.match(stdout, /1 out of date left untouched/);
});

test("bulk --stamp still stamps pages that have no stamp yet", (t) => {
  const repo = createRepo(t);
  repo.write("docs/fresh.md", "# Fresh\n");
  repo.write("docs/fr/fresh.md", "# Nouveau\n");
  repo.commit("initial");

  repo.run("--stamp");

  assert.equal(stampOf(repo, "docs/fr/fresh.md"), repo.git("rev-parse", "HEAD:docs/fresh.md"));
});

test("--stamp <path> refreshes an out-of-date stamp on that page only", (t) => {
  const repo = createRepo(t);
  repo.write("docs/one.md", "# One\n");
  repo.write("docs/two.md", "# Two\n");
  repo.write("docs/fr/one.md", stamped(OLD_SHA, "# Un\n"));
  repo.write("docs/fr/two.md", stamped(OLD_SHA, "# Deux\n"));
  repo.commit("initial");

  repo.run("--stamp", "docs/fr/one.md");

  assert.equal(stampOf(repo, "docs/fr/one.md"), repo.git("rev-parse", "HEAD:docs/one.md"));
  assert.equal(stampOf(repo, "docs/fr/two.md"), OLD_SHA);
});

test("--stamp --force refreshes out-of-date stamps everywhere", (t) => {
  const repo = createRepo(t);
  repo.write("docs/behind.md", "# Behind\n");
  repo.write("docs/fr/behind.md", stamped(OLD_SHA, "# En retard\n"));
  repo.commit("initial");

  repo.run("--stamp", "--force");

  assert.equal(stampOf(repo, "docs/fr/behind.md"), repo.git("rev-parse", "HEAD:docs/behind.md"));
});

test("--explain shows the source lines that changed since the page was translated", (t) => {
  const repo = createRepo(t);
  repo.write("docs/guide.md", "# Guide\n\nVersion one.\n");
  repo.write("docs/fr/guide.md", "placeholder\n");
  repo.commit("source");
  repo.write("docs/fr/guide.md", stamped(repo.git("rev-parse", "HEAD:docs/guide.md"), "# Guide\n"));
  repo.write("docs/guide.md", "# Guide\n\nVersion two.\n");
  repo.commit("source moves on");

  const { code, stdout } = repo.run("--explain", "docs/fr/guide.md");

  assert.match(stdout, /^-Version one\.$/m);
  assert.match(stdout, /^\+Version two\.$/m);
  assert.equal(code, 0);
});

test("--explain says so when the translation is already current", (t) => {
  const repo = createRepo(t);
  repo.write("docs/guide.md", "# Guide\n");
  repo.write("docs/fr/guide.md", "placeholder\n");
  repo.commit("source");
  repo.write("docs/fr/guide.md", stamped(repo.git("rev-parse", "HEAD:docs/guide.md"), "# Guide\n"));

  const { code, stdout } = repo.run("--explain", "docs/fr/guide.md");

  assert.match(stdout, /up to date/);
  assert.equal(code, 0);
});

test("--explain fails clearly when the recorded source version is unknown to git", (t) => {
  const repo = createRepo(t);
  repo.write("docs/guide.md", "# Guide\n");
  repo.write("docs/fr/guide.md", stamped(OLD_SHA, "# Guide\n"));
  repo.commit("initial");

  const { code, stderr } = repo.run("--explain", "docs/fr/guide.md");

  assert.match(stderr, /1111111.*not found in this repository/);
  assert.equal(code, 1);
});

test("--explain fails clearly on a page that carries no stamp", (t) => {
  const repo = createRepo(t);
  repo.write("docs/guide.md", "# Guide\n");
  repo.write("docs/fr/guide.md", "# Guide\n");
  repo.commit("initial");

  const { code, stderr } = repo.run("--explain", "docs/fr/guide.md");

  assert.match(stderr, /no `i18n_source_sha`/);
  assert.equal(code, 1);
});

function coverageRepo(t) {
  const repo = createRepo(t);
  repo.write("docs/a/one.md", "# One\n");
  repo.write("docs/a/two.md", "# Two\n");
  repo.write("docs/b/three.md", "# Three\n");
  repo.write("docs/fr/b/three.md", "# Trois\n");
  repo.write("docs/fr/a/one.md", "placeholder\n");
  repo.commit("sources");
  repo.write("docs/fr/a/one.md", stamped(repo.git("rev-parse", "HEAD:docs/a/one.md"), "# Un\n"));
  repo.commit("translation");
  return repo;
}

test("--audit reports translation coverage per locale and per section", (t) => {
  const { report } = coverageRepo(t).report("--audit");

  const fr = report.coverage.find((entry) => entry.locale === "fr");
  assert.deepEqual(
    { total: fr.total, translated: fr.translated, upToDate: fr.upToDate },
    { total: 3, translated: 2, upToDate: 1 }
  );
  assert.deepEqual(fr.sections, [
    { section: "a", total: 2, translated: 1, upToDate: 1 },
    { section: "b", total: 1, translated: 1, upToDate: 0 },
  ]);
});

test("--audit prints the coverage table in the Markdown report", (t) => {
  const { stdout } = coverageRepo(t).run("--audit");

  assert.match(stdout, /### Coverage/);
  assert.match(stdout, /\| `a` \| 2 \| 1 \(50%\) \| 1 \(50%\) \|/);
  assert.match(stdout, /\| \*\*all\*\* \| 3 \| 2 \(67%\) \| 1 \(33%\) \|/);
});

test("--stamp --changed refreshes only the translations edited since the base", (t) => {
  const repo = createRepo(t);
  repo.write("docs/one.md", "# One\n");
  repo.write("docs/two.md", "# Two\n");
  repo.write("docs/fr/one.md", stamped(OLD_SHA, "# Un\n"));
  repo.write("docs/fr/two.md", stamped(OLD_SHA, "# Deux\n"));
  const base = repo.commit("initial");

  // Not committed yet: a translator stamps right after editing, before committing.
  repo.write("docs/fr/one.md", stamped(OLD_SHA, "# Un, retraduit\n"));
  repo.run("--stamp", "--changed", "--base", base);

  assert.equal(stampOf(repo, "docs/fr/one.md"), repo.git("rev-parse", "HEAD:docs/one.md"));
  assert.equal(stampOf(repo, "docs/fr/two.md"), OLD_SHA);
});

test("--stamp --changed also stamps a brand new translation that git does not track yet", (t) => {
  const repo = createRepo(t);
  repo.write("docs/one.md", "# One\n");
  repo.write("docs/two.md", "# Two\n");
  repo.write("docs/fr/two.md", "# Deux\n");
  const base = repo.commit("initial");

  repo.write("docs/fr/one.md", "# Un\n");
  repo.run("--stamp", "--changed", "--base", base);

  assert.equal(stampOf(repo, "docs/fr/one.md"), repo.git("rev-parse", "HEAD:docs/one.md"));
  assert.equal(stampOf(repo, "docs/fr/two.md"), null);
});

function stampedRepo(t) {
  const repo = createRepo(t);
  repo.write("docs/guide.md", "# Guide\n\nVersion one.\n");
  repo.write("docs/fr/guide.md", "placeholder\n");
  repo.commit("source");
  repo.write("docs/fr/guide.md", stamped(repo.git("rev-parse", "HEAD:docs/guide.md"), "# Guide\n"));
  const base = repo.commit("translation");
  return { repo, base };
}

test("check --working-tree reports a source change that is not committed yet", (t) => {
  const { repo, base } = stampedRepo(t);
  repo.write("docs/guide.md", "# Guide\n\nVersion two.\n");

  const { report } = repo.report("--base", base, "--working-tree");

  assert.deepEqual(
    report.findings.map((entry) => [entry.status, entry.path]),
    [["stale", "docs/fr/guide.md"]]
  );
});

test("check --working-tree reports a new source page that git does not track yet", (t) => {
  const { repo, base } = stampedRepo(t);
  repo.write("docs/new.md", "# New\n");

  const { report } = repo.report("--base", base, "--working-tree");

  assert.deepEqual(
    report.findings.map((entry) => [entry.status, entry.path]),
    [["missing", "docs/fr/new.md"]]
  );
});

test("check --working-tree reports a translation orphaned by an uncommitted deletion", (t) => {
  const { repo, base } = stampedRepo(t);
  fs.rmSync(path.join(repo.root, "docs/guide.md"));

  const { report } = repo.report("--base", base, "--working-tree");

  assert.deepEqual(
    report.findings.map((entry) => [entry.status, entry.path]),
    [["orphaned", "docs/fr/guide.md"]]
  );
});

test("check without --working-tree keeps uncommitted changes out of the report", (t) => {
  const { repo, base } = stampedRepo(t);
  repo.write("docs/guide.md", "# Guide\n\nVersion two.\n");

  const { report } = repo.report("--base", base, "--head", "HEAD");

  assert.deepEqual(report.findings, []);
});

test("--working-tree refuses to be combined with --head", (t) => {
  const { repo, base } = stampedRepo(t);

  const { code, stderr } = repo.run("--base", base, "--head", "HEAD", "--working-tree");

  assert.match(stderr, /--working-tree.*--head/);
  assert.equal(code, 1);
});
