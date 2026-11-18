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

 * Eddy Kayiganwa

 --------------
 ******/

/**
 * NOTES:
 * - ESM module (thus the extension `.mjs`), since package.json does not set `"type": "module"`.
 * - Runs the masking pipeline over EVERY English page with a fake translator, and fails if
 *   anything that must never be translated would have left the machine.
 * - The unit tests pin down constructs we already know about; this one goes looking. Run it
 *   after any change to PROTECTED_PATTERNS, and when a batch of new English pages lands.
 *
 * Exit codes: 0 every page clean · 1 a page leaked or failed the structure check
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import {
  translatePage,
  checkStructure,
  createSegmentTranslator,
  loadKeepEnglish,
  loadSkiplist,
  matchesSkiplist,
} from "./i18n-translate.mjs";

const DOCS_DIR = "docs";
const LOCALE_DIR_PATTERN = /^[a-z]{2}(-[A-Za-z]{2,4})?$/;

function listEnglishPages(repoRoot) {
  const found = [];
  const walk = (relativeDir) => {
    for (const entry of fs.readdirSync(path.join(repoRoot, relativeDir), { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const relativePath = `${relativeDir}/${entry.name}`;
      if (entry.isDirectory()) {
        // Locale directories hold translations, not source.
        if (relativeDir === DOCS_DIR && LOCALE_DIR_PATTERN.test(entry.name)) continue;
        walk(relativePath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        found.push(relativePath);
      }
    }
  };
  walk(DOCS_DIR);
  return found.sort();
}

async function main() {
  const repoRoot = process.cwd();
  const verbose = process.argv.includes("--verbose");
  const includeSkipped = process.argv.includes("--all");

  const skiplist = loadSkiplist(repoRoot);
  const pages = listEnglishPages(repoRoot).filter(
    (page) => includeSkipped || !matchesSkiplist(page, skiplist)
  );

  let sent = [];
  // Accents every vowel, so the output differs in every translatable word: a translator that
  // echoed its input would pass a structure check trivially and prove nothing.
  const client = {
    charactersSent: 0,
    async translate(texts) {
      sent.push(...texts);
      return texts.map((text) =>
        text.replace(/<x>\d+<\/x>|&[a-z]+;|&#\d+;|[A-Za-z]+/g, (token) =>
          token.startsWith("<x>") || token.startsWith("&")
            ? token
            : token.replace(/[aeiou]/g, "é")
        )
      );
    },
  };

  const translateSegments = createSegmentTranslator({
    client,
    target: "FR",
    keepEnglish: loadKeepEnglish(repoRoot),
    glossaryId: null,
  });

  let failures = 0;
  let segments = 0;

  for (const page of pages) {
    const english = fs.readFileSync(path.join(repoRoot, page), "utf8");
    sent = [];

    let output;
    try {
      output = await translatePage({ english, locale: "fr", repoRoot, translateSegments });
    } catch (error) {
      failures += 1;
      process.stdout.write(`FAIL  ${page}\n      threw: ${error.message}\n`);
      continue;
    }
    segments += sent.length;

    // Checked per segment as it would leave the machine. Searching the corpus for strings
    // instead would flag words like `transfer` that legitimately appear in prose too.
    const leaks = [];
    for (const segment of sent) {
      const bare = segment.replace(/<x>\d+<\/x>/g, "");
      const excerpt = JSON.stringify(segment.slice(0, 100));
      if (bare.includes("`")) leaks.push(`backtick → ${excerpt}`);
      if (bare.includes("](")) leaks.push(`link target → ${excerpt}`);
      if (/https?:\/\//.test(bare)) leaks.push(`URL → ${excerpt}`);
      if (/<(?!x>)/.test(bare)) leaks.push(`unescaped < → ${excerpt}`);
    }

    const problems = checkStructure(english, output);

    if (leaks.length > 0 || problems.length > 0) {
      failures += 1;
      process.stdout.write(`FAIL  ${page}\n`);
      for (const problem of problems) process.stdout.write(`      structure: ${problem}\n`);
      for (const leak of [...new Set(leaks)].slice(0, 5)) process.stdout.write(`      ${leak}\n`);
    } else if (verbose) {
      process.stdout.write(`ok    ${page} (${sent.length} segments)\n`);
    }
  }

  process.stdout.write(
    `\n[i18n-translate] ${pages.length - failures}/${pages.length} English pages clean, ` +
      `${segments.toLocaleString("en-US")} segments checked.\n`
  );

  if (failures > 0) {
    process.stdout.write(
      "[i18n-translate] A leak means PROTECTED_PATTERNS in i18n-translate.mjs does not cover a " +
        "construct used in docs/. Fix the pattern, add the construct to the unit tests, and " +
        "re-run.\n"
    );
    process.exit(1);
  }
}

main().catch((error) => {
  process.stderr.write(`[i18n-translate] ${error.stack || error}\n`);
  process.exit(1);
});
