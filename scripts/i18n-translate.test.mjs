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
 * - Run with: npm run i18n:translate:test
 * - No network. The DeepL client is replaced by a fake, so every test here is about OUR logic:
 *   what leaves the machine, what comes back in, and what we refuse to write.
 * - The wider net is `npm run i18n:translate:corpus`, which runs the same pipeline over every
 *   English page in docs/. It found the regressions grouped below.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  splitBlocks,
  classifyBlock,
  segmentBlock,
  maskText,
  restoreMask,
  buildKeepEnglishPattern,
  planFrontMatter,
  splitFrontMatter,
  rewriteInternalLinks,
  structureOf,
  checkStructure,
  alignBlocks,
  translatePage,
  patchPage,
  AlignmentError,
  createSegmentTranslator,
  parseGlossaryCsv,
  ensureGlossary,
  matchesSkiplist,
  apiBaseFor,
  selectWork,
} from "./i18n-translate.mjs";

/* --- Test doubles ----------------------------------------------------------------------- */

// Stands in for DeepL: shouts every word, leaves <x>N</x> tags and entities alone - exactly
// the contract ignore_tags buys from the real service.
function fakeTranslate(texts) {
  return texts.map((text) =>
    text.replace(/<x>\d+<\/x>|&[a-z]+;|&#\d+;|[A-Za-z]+/g, (token) =>
      token.startsWith("<x>") || token.startsWith("&") ? token : token.toUpperCase()
    )
  );
}

function fakeClient(behaviour = fakeTranslate) {
  const sent = [];
  return {
    sent,
    charactersSent: 0,
    async translate(texts) {
      sent.push(...texts);
      return behaviour(texts);
    },
  };
}

function translatorFor(client, keepEnglish = []) {
  return createSegmentTranslator({ client, target: "FR", keepEnglish, glossaryId: null });
}

/* --- Block splitting -------------------------------------------------------------------- */

test("splitBlocks round-trips every byte", () => {
  const body = "# Title\n\nA paragraph.\n\n```js\nconst a = 1;\n\nconst b = 2;\n```\n\n- one\n- two\n";
  assert.equal(splitBlocks(body).join("\n"), body);
});

test("a fenced block stays atomic even when it contains blank lines", () => {
  const body = "```sh\nnpm run dev\n\nnpm run build\n```";
  const blocks = splitBlocks(body);
  assert.equal(blocks.length, 1);
  assert.equal(classifyBlock(blocks[0]), "code");
});

test("an unterminated fence does not turn the rest of the page into prose", () => {
  const blocks = splitBlocks("```js\nconst a = 1;\n\nstill code");
  assert.equal(blocks.length, 1);
  assert.equal(classifyBlock(blocks[0]), "code");
});

test("block kinds are recognised", () => {
  assert.equal(classifyBlock("## Heading"), "heading");
  assert.equal(classifyBlock("| a | b |"), "table");
  assert.equal(classifyBlock("- item"), "list");
  assert.equal(classifyBlock("1. item"), "list");
  assert.equal(classifyBlock("::: tip Note"), "container");
  assert.equal(classifyBlock("<Badge text=\"x\"/>"), "html");
  assert.equal(classifyBlock("Just prose."), "paragraph");
  assert.equal(classifyBlock(""), "blank");
});

/* --- Masking: the safety property ------------------------------------------------------- */

test("inline code, URLs and link targets never reach the translator", async () => {
  const client = fakeClient();
  const translate = translatorFor(client);
  const text = "Call `POST /quotes` and read [the guide](/technical/guide.md) at https://example.org/x.";

  const [out] = await translate([text]);

  const sent = client.sent.join(" ");
  assert.ok(!sent.includes("POST /quotes"), "inline code was sent");
  assert.ok(!sent.includes("/technical/guide.md"), "link target was sent");
  assert.ok(!sent.includes("https://example.org/x"), "URL was sent");

  assert.ok(out.includes("`POST /quotes`"), "inline code came back changed");
  assert.ok(out.includes("](/technical/guide.md)"), "link target came back changed");
  assert.ok(out.includes("https://example.org/x"), "URL came back changed");
  assert.ok(out.includes("THE GUIDE"), "link text should have been translated");
});

test("keep-english terms are masked, and only as whole words", async () => {
  // A term that was NOT masked comes back as "TRADUIT".
  const client = fakeClient((texts) =>
    texts.map((t) => t.replace(/<x>\d+<\/x>|[A-Za-z]+/g, (token) => (token.startsWith("<x>") ? token : "TRADUIT")))
  );
  const translate = translatorFor(client, ["central-ledger", "ISO 20022", "Mojaloop"]);

  const [out] = await translate(["The central-ledger service follows ISO 20022 in Mojaloop."]);

  assert.ok(out.includes("central-ledger"));
  assert.ok(out.includes("ISO 20022"));
  assert.ok(out.includes("Mojaloop"));
  assert.ok(!client.sent.join(" ").includes("central-ledger"));
});

test("a longer keep-english term wins over a shorter one it contains", () => {
  const pattern = buildKeepEnglishPattern(["ISO", "ISO 20022"]);
  const matched = "ISO 20022 matters".match(pattern);
  assert.equal(matched[0], "ISO 20022");
});

test("masking survives a round trip with tags reordered, as a translation may do", () => {
  const { masked, originals } = maskText("Read `a` then `b`.", null);
  const reordered = masked.replace("<x>0</x>", "@@").replace("<x>1</x>", "<x>0</x>").replace("@@", "<x>1</x>");
  const restored = restoreMask(reordered, originals);
  assert.equal(restored, "Read `b` then `a`.");
});

test("a dropped placeholder is refused, not papered over", () => {
  const { masked, originals } = maskText("Run `npm run dev` now.", null);
  assert.throws(() => restoreMask(masked.replace("<x>0</x>", ""), originals), /dropped 1 protected span/);
});

test("a duplicated placeholder is refused", () => {
  const { masked, originals } = maskText("Run `npm run dev` now.", null);
  assert.throws(() => restoreMask(`${masked}<x>0</x>`, originals), /duplicated placeholder/);
});

test("an invented placeholder is refused", () => {
  const { originals } = maskText("Run `npm run dev` now.", null);
  assert.throws(() => restoreMask("Lancez <x>9</x>.", originals), /never sent/);
});

test("angle brackets in prose survive XML escaping", async () => {
  const client = fakeClient();
  const [out] = await translatorFor(client)(["Use a value < 5 & > 1 for the timeout."]);
  assert.ok(out.includes("< 5"), out);
  assert.ok(out.includes("> 1"), out);
  assert.ok(out.includes("&"), out);
});

test("entities the translator invents are decoded, not left as literal text", async () => {
  const client = fakeClient((texts) =>
    texts.map((t) => t.replace(/&lt;/g, "&#60;").replace(/"/g, "&quot;"))
  );
  const [out] = await translatorFor(client)(['A value < 5 is "small".']);
  assert.ok(!out.includes("&"), `entity left undecoded: ${out}`);
  assert.ok(out.includes("< 5"));
  assert.ok(out.includes('"small"'));
});

test("a protected span is still restored when the tag case comes back changed", () => {
  const { masked, originals } = maskText("Run `npm run dev`.", null);
  assert.equal(restoreMask(masked.replace("<x>0</x>", "<X>0</X>"), originals), "Run `npm run dev`.");
});

test("a segment with nothing but protected spans is never sent", async () => {
  const client = fakeClient();
  await translatorFor(client)(["`npm run build`"]);
  assert.equal(client.sent.length, 0);
});

/* --- Regressions: constructs that really occur in docs/ and really leaked --------------- */

test("a URL used as its own link text is masked, not just the target", () => {
  // docs/technical/.../deployment-troubleshooting.md and several others do this.
  const text = "notes: [https://github.com/mojaloop/helm/releases](https://github.com/mojaloop/helm/releases).";
  const { masked } = maskText(text, null);
  assert.ok(!masked.includes("github.com"), `URL leaked: ${masked}`);
});

test("a malformed link target keeps its anchor without swallowing the sentence", () => {
  // docs/technical/api/fspiop/v1.1/api-definition.md: `[Table 57](#table-57]`
  const { masked, originals } = maskText("[Table 57](#table-57] below contains the model.", null);
  assert.ok(!masked.includes("#table-57"), `anchor leaked: ${masked}`);
  assert.ok(masked.includes("below contains the model."), `prose was swallowed: ${masked}`);
  assert.ok(originals.includes("](#table-57"));
});

test("a URL whose host is a placeholder leaves no bare scheme behind", () => {
  // docs/technical/.../wso2-api-gateway/README.md: `https://<DNS_NAME>:4000`
  const { masked } = maskText("Point it at https://<DNS_NAME>:4000 to continue.", null);
  assert.ok(!masked.includes("https://"), `bare scheme leaked: ${masked}`);
  assert.ok(masked.includes("to continue."));
});

test("an unpaired backtick is protected rather than handed to the translator", () => {
  // docs/technical/faqs.md: "when running `npm start' command." and "ISO8583 `<-> Mojaloop"
  const { masked, originals } = maskText("Received an error when running `npm start' command.", null);
  assert.ok(!masked.includes("`"), `stray backtick leaked: ${masked}`);
  assert.ok(originals.includes("`"));
});

test("an unpaired backtick comes back in exactly its original place", () => {
  const text = "A generic ISO8583 `<-> Mojaloop integration is not available.";
  const { masked, originals } = maskText(text, null);
  assert.equal(restoreMask(masked, originals), text);
});

/* --- Segmentation ----------------------------------------------------------------------- */

test("table cells are translated individually and the shape is kept", async () => {
  const block = "| English | Notes |\n| --- | --- |\n| settlement | the domain sense |";
  const plan = segmentBlock(block, "table");
  assert.deepEqual(plan.pieces, ["English", "Notes", "settlement", "the domain sense"]);

  const rebuilt = plan.join(plan.pieces.map((p) => p.toUpperCase()));
  assert.equal(rebuilt.split("\n")[1], "| --- | --- |", "the alignment row must not move");
  assert.equal(rebuilt.split("\n").length, 3);
  assert.ok(rebuilt.startsWith("| ENGLISH | NOTES |"));
});

test("list markers and nesting are preserved", () => {
  const block = "- first item\n  - nested item\n- third item";
  const plan = segmentBlock(block, "list");
  assert.deepEqual(plan.pieces, ["first item", "nested item", "third item"]);
  assert.equal(plan.join(["un", "deux", "trois"]), "- un\n  - deux\n- trois");
});

test("ordered list numbering is preserved", () => {
  const plan = segmentBlock("1. one\n2. two", "list");
  assert.equal(plan.join(["un", "deux"]), "1. un\n2. deux");
});

test("heading level is preserved and the hashes are never sent", () => {
  const plan = segmentBlock("### Deployment guide", "heading");
  assert.deepEqual(plan.pieces, ["Deployment guide"]);
  assert.equal(plan.join(["Guide de deploiement"]), "### Guide de deploiement");
});

test("a container keyword is kept and only its title is translated", () => {
  const plan = segmentBlock("::: tip Remember this", "container");
  assert.deepEqual(plan.pieces, ["Remember this"]);
  assert.ok(plan.join(["Souvenez-vous"]).startsWith("::: tip "));
});

test("a bare container fence has nothing to translate", () => {
  assert.deepEqual(segmentBlock(":::", "container").pieces, []);
});

test("code and html blocks are passed through untouched", () => {
  const code = "```js\nconst a = 1;\n```";
  assert.deepEqual(segmentBlock(code, "code").pieces, []);
  assert.equal(segmentBlock(code, "code").join([]), code);

  const html = "<Badge text=\"beta\"/>";
  assert.deepEqual(segmentBlock(html, "html").pieces, []);
});

test("blockquote markers are preserved", () => {
  const plan = segmentBlock("> a quoted line", "paragraph");
  assert.deepEqual(plan.pieces, ["a quoted line"]);
  assert.equal(plan.join(["une citation"]), "> une citation");
});

/* --- Front matter ----------------------------------------------------------------------- */

test("only user-visible front-matter values are translated", () => {
  const frontMatter = [
    "home: true",
    "heroImage: /mojaloop_logo_med.png",
    "tagline: Open source payments",
    "actionText: Get started",
    "i18n_source_sha: abc123",
    "features:",
    "  - title: Interoperable",
    "    details: Works across providers",
  ].join("\n");

  const plan = planFrontMatter(frontMatter);
  assert.deepEqual(plan.pieces, [
    "Open source payments",
    "Get started",
    "Interoperable",
    "Works across providers",
  ]);

  const rebuilt = plan.join(["A", "B", "C", "D"]);
  assert.ok(rebuilt.includes("home: true"));
  assert.ok(rebuilt.includes("heroImage: /mojaloop_logo_med.png"));
  assert.ok(rebuilt.includes("i18n_source_sha: abc123"));
  assert.ok(rebuilt.includes("  - title: C"));
  assert.ok(rebuilt.includes("    details: D"));
});

test("front-matter quoting style is preserved", () => {
  const plan = planFrontMatter('title: "Quoted"');
  assert.equal(plan.join(["Cite"]), 'title: "Cite"');
});

test("splitFrontMatter separates the block from the body", () => {
  const { frontMatter, body } = splitFrontMatter("---\ntitle: X\n---\n\nBody.\n");
  assert.equal(frontMatter, "title: X");
  assert.equal(body, "\nBody.\n");
});

/* --- Links ------------------------------------------------------------------------------ */

test("a root-absolute link is localised only when the translated page exists", () => {
  const exists = (p) => p.replace(/\\/g, "/").endsWith("docs/fr/technical/guide.md");

  const body = "See [guide](/technical/guide.md) and [other](/technical/other.md).";
  const out = rewriteInternalLinks(body, "fr", "/repo", exists);

  assert.ok(out.includes("](/fr/technical/guide.md)"), out);
  assert.ok(out.includes("](/technical/other.md)"), "an untranslated target must stay English");
});

test("anchors survive link localisation", () => {
  const exists = () => true;
  const out = rewriteInternalLinks("[x](/technical/guide.md#post-participants)", "fr", "/repo", exists);
  assert.equal(out, "[x](/fr/technical/guide.md#post-participants)");
});

test("assets and already-localised links are left alone", () => {
  const exists = () => true;
  assert.equal(
    rewriteInternalLinks("![x](/mojaloop_logo_med.png)", "fr", "/repo", exists),
    "![x](/mojaloop_logo_med.png)"
  );
  assert.equal(
    rewriteInternalLinks("[x](/fr/technical/guide.md)", "fr", "/repo", exists),
    "[x](/fr/technical/guide.md)"
  );
});

test("relative links are never rewritten", () => {
  const body = "[x](./faqs.md) [y](../getting-started/index.md)";
  assert.equal(rewriteInternalLinks(body, "fr", "/repo", () => true), body);
});

/* --- Structure checking ----------------------------------------------------------------- */

test("structureOf counts what must not change", () => {
  const page = "---\ntitle: X\n---\n\n# A\n\n## B\n\n```js\nx\n```\n\n| a | b |\n| - | - |\n\n[l](/x) ![i](/y.png)\n";
  const s = structureOf(page);
  assert.equal(s.fences, 1);
  assert.deepEqual(s.headings, [1, 2]);
  assert.equal(s.tableRows, 2);
  assert.equal(s.links, 2); // the image is also a ](...) construct
  assert.equal(s.images, 1);
});

test("a page that keeps its structure passes", () => {
  const english = "# Title\n\nSome text with `code`.\n\n```js\nx\n```\n";
  const french = "# Titre\n\nUn texte avec `code`.\n\n```js\nx\n```\n";
  assert.deepEqual(checkStructure(english, french), []);
});

test("a lost code block is caught", () => {
  const english = "# Title\n\n```js\nx\n```\n";
  const broken = "# Titre\n";
  assert.ok(checkStructure(english, broken).some((p) => p.startsWith("code blocks")));
});

test("a changed heading level is caught", () => {
  assert.ok(
    checkStructure("# A\n\n## B\n", "# A\n\n### B\n").some((p) => p.includes("heading levels"))
  );
});

test("a lost link is caught", () => {
  assert.ok(
    checkStructure("See [x](/a).\n", "Voir x.\n").some((p) => p.startsWith("links"))
  );
});

/* --- Whole-page translation ------------------------------------------------------------- */

test("translatePage leaves code untouched and translates prose", async () => {
  const english = [
    "---",
    "title: Deployment",
    "heroImage: /logo.png",
    "---",
    "",
    "# Deployment",
    "",
    "Install the chart with `helm install`.",
    "",
    "```sh",
    "helm install mojaloop ./chart",
    "```",
    "",
  ].join("\n");

  const client = fakeClient();
  const out = await translatePage({
    english,
    locale: "fr",
    repoRoot: "/repo",
    translateSegments: translatorFor(client),
  });

  assert.ok(out.includes("heroImage: /logo.png"), "non-textual front matter changed");
  assert.ok(out.includes("title: DEPLOYMENT"), "title was not translated");
  assert.ok(out.includes("helm install mojaloop ./chart"), "the code block was altered");
  assert.ok(out.includes("# DEPLOYMENT"), "the heading was not translated");
  assert.deepEqual(checkStructure(english, out), []);
});

test("translatePage preserves an existing stamp so --stamp sees an update", async () => {
  const out = await translatePage({
    english: "---\ntitle: X\n---\n\nText.\n",
    locale: "fr",
    repoRoot: "/repo",
    translateSegments: translatorFor(fakeClient()),
    existingFrontMatter: "title: ancien\ni18n_source_sha: deadbeef",
  });
  assert.ok(out.includes("i18n_source_sha: deadbeef"), out);
});

/* --- Patching a stale page: the part that protects reviewed text ------------------------ */

const OLD_EN = "# Title\n\nFirst paragraph.\n\nSecond paragraph.\n";
const NEW_EN = "# Title\n\nFirst paragraph.\n\nSecond paragraph, now revised.\n";
const EXISTING_FR = "---\ni18n_source_sha: aaaa\n---\n# Titre\n\nPremier paragraphe.\n\nDeuxieme paragraphe.\n";

test("patchPage re-translates only the paragraph that changed", async () => {
  const client = fakeClient();
  const out = await patchPage({
    oldEnglish: OLD_EN,
    newEnglish: NEW_EN,
    existingTranslation: EXISTING_FR,
    locale: "fr",
    repoRoot: "/repo",
    translateSegments: translatorFor(client),
  });

  assert.deepEqual(client.sent, ["Second paragraph, now revised."], "sent more than the change");
  assert.ok(out.includes("Premier paragraphe."), "reviewed text was destroyed");
  assert.ok(out.includes("# Titre"), "the reviewed heading was destroyed");
  assert.ok(out.includes("SECOND PARAGRAPH, NOW REVISED."), "the change was not translated");
  assert.ok(out.includes("i18n_source_sha: aaaa"), "the stamp was dropped");
});

test("patchPage sends nothing when the English page did not really change", async () => {
  const client = fakeClient();
  await patchPage({
    oldEnglish: OLD_EN,
    newEnglish: OLD_EN,
    existingTranslation: EXISTING_FR,
    locale: "fr",
    repoRoot: "/repo",
    translateSegments: translatorFor(client),
  });
  assert.deepEqual(client.sent, []);
});

test("patchPage inserts a new paragraph without disturbing its neighbours", async () => {
  const withInsert = "# Title\n\nFirst paragraph.\n\nBrand new paragraph.\n\nSecond paragraph.\n";
  const client = fakeClient();
  const out = await patchPage({
    oldEnglish: OLD_EN,
    newEnglish: withInsert,
    existingTranslation: EXISTING_FR,
    locale: "fr",
    repoRoot: "/repo",
    translateSegments: translatorFor(client),
  });

  assert.deepEqual(client.sent, ["Brand new paragraph."]);
  assert.ok(out.includes("Premier paragraphe."));
  assert.ok(out.includes("Deuxieme paragraphe."));
  assert.ok(out.includes("BRAND NEW PARAGRAPH."));
});

test("a stamp-added leading blank line does not break alignment", async () => {
  // Regression: `i18n-drift-check.mjs --stamp` writes "---\n<sha>\n---\n\n", leaving a blank
  // first block that the English source has no counterpart for. Counting raw blocks rejected
  // every stamped page - which is every French page, once the backlog is stamped.
  const stamped = "---\ni18n_source_sha: aaaa\n---\n\n# Titre\n\nPremier paragraphe.\n\nDeuxieme paragraphe.\n";
  const client = fakeClient();
  const out = await patchPage({
    oldEnglish: OLD_EN,
    newEnglish: NEW_EN,
    existingTranslation: stamped,
    locale: "fr",
    repoRoot: "/repo",
    translateSegments: translatorFor(client),
  });

  assert.deepEqual(client.sent, ["Second paragraph, now revised."]);
  assert.ok(out.includes("Premier paragraphe."), "reviewed text was destroyed");
  assert.ok(out.includes("# Titre"));
  assert.ok(out.includes("SECOND PARAGRAPH, NOW REVISED."));
});

test("patchPage refuses to guess when the translation does not mirror the source", async () => {
  await assert.rejects(
    patchPage({
      oldEnglish: OLD_EN,
      newEnglish: NEW_EN,
      existingTranslation: "---\n---\n# Titre\n\nUn seul paragraphe.\n",
      locale: "fr",
      repoRoot: "/repo",
      translateSegments: translatorFor(fakeClient()),
    }),
    AlignmentError
  );
});

test("alignBlocks maps unchanged blocks and leaves changed ones unmatched", () => {
  assert.deepEqual(alignBlocks(["a", "b", "c"], ["a", "B!", "c"]), [0, -1, 2]);
  assert.deepEqual(alignBlocks(["a", "b"], ["a", "new", "b"]), [0, -1, 1]);
  assert.deepEqual(alignBlocks(["a", "b"], ["a"]), [0]);
});

/* --- Glossary, skiplist, endpoint ------------------------------------------------------- */

test("the header is skipped wherever the comment block leaves it", () => {
  // Regression: detection keyed off line 0, so trimming the comments above the header turned
  // `en,target` into a real glossary term.
  const { entries, problems } = parseGlossaryCsv("# a\n# b\n# c\nen,target\nsettlement,reglement\n");
  assert.deepEqual(problems, []);
  assert.ok(!entries.has("en"), "the header row leaked in as a term");
  assert.equal(entries.size, 1);
});

test("a real first row is not mistaken for a header", () => {
  const { entries } = parseGlossaryCsv("settlement,reglement\n");
  assert.equal(entries.get("settlement"), "reglement");
});

test("the glossary CSV is parsed and its header skipped", () => {
  const { entries, problems } = parseGlossaryCsv("en,target\nsettlement,reglement\nparticipant,participant\n");
  assert.deepEqual(problems, []);
  assert.equal(entries.get("settlement"), "reglement");
  assert.equal(entries.size, 2);
});

test("one term mapping to two translations is an error, not a last-one-wins", () => {
  const { problems } = parseGlossaryCsv("en,target\nsettlement,reglement\nsettlement,compensation\n");
  assert.equal(problems.length, 1);
  assert.match(problems[0], /already maps to/);
});

test("comments, blank lines and quoted cells are handled", () => {
  const { entries, problems } = parseGlossaryCsv('# note\n\nswitch,"commutateur, central"\n');
  assert.deepEqual(problems, []);
  assert.equal(entries.get("switch"), "commutateur, central");
});

test("the skiplist matches globs against source paths", () => {
  const patterns = ["docs/technical/api/**", "docs/community/standards/*.md"];
  assert.ok(matchesSkiplist("docs/technical/api/iso20022/README.md", patterns));
  assert.ok(matchesSkiplist("docs/community/standards/ai_policy.md", patterns));
  assert.ok(!matchesSkiplist("docs/product/index.md", patterns));
});

test("a missing glossary file is not an error - that is the shipped default", async () => {
  // No i18n/glossary/<locale>.csv exists yet; runs must proceed without one.
  const client = { async listGlossaries() { throw new Error("should not be called"); } };
  assert.equal(await ensureGlossary(client, "fr", "/nonexistent-repo", { quiet: true }), null);
});

test("free-tier keys are routed to the free endpoint", () => {
  assert.equal(apiBaseFor("abc-123:fx"), "https://api-free.deepl.com");
  assert.equal(apiBaseFor("abc-123"), "https://api.deepl.com");
});

/* --- Work selection --------------------------------------------------------------------- */

test("selectWork takes missing and stale pages, and skips unstamped ones", () => {
  const audit = {
    findings: [
      { status: "missing", locale: "fr", path: "docs/fr/product/a.md", source: "docs/product/a.md" },
      { status: "stale", locale: "fr", path: "docs/fr/product/b.md", source: "docs/product/b.md" },
      { status: "unstamped", locale: "fr", path: "docs/fr/product/c.md", source: "docs/product/c.md" },
      { status: "missing", locale: "pt", path: "docs/pt/product/a.md", source: "docs/product/a.md" },
      { status: "orphaned", locale: "fr", path: "docs/fr/old.md", source: "docs/old.md" },
    ],
  };

  const work = selectWork({
    audit,
    locale: "fr",
    section: "product",
    statuses: ["missing", "stale"],
    skiplist: [],
    repoRoot: "/repo",
    exists: () => true,
  });

  assert.deepEqual(work.map((w) => w.target), ["docs/fr/product/a.md", "docs/fr/product/b.md"]);
});

test("selectWork honours the skiplist and the section filter", () => {
  const audit = {
    findings: [
      { status: "missing", locale: "fr", path: "docs/fr/technical/a.md", source: "docs/technical/a.md" },
      { status: "missing", locale: "fr", path: "docs/fr/product/b.md", source: "docs/product/b.md" },
    ],
  };

  assert.deepEqual(
    selectWork({
      audit,
      locale: "fr",
      section: "technical",
      statuses: ["missing"],
      skiplist: ["docs/technical/**"],
      repoRoot: "/repo",
      exists: () => true,
    }),
    []
  );
});
