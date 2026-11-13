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
 * - Produces FIRST DRAFTS with DeepL. Every line it writes must be read and corrected by a
 *   human before merge - translationguidelines.md §10.
 * - Decides nothing for itself: `i18n-drift-check.mjs --audit` says what is missing or stale,
 *   and `--stamp` writes the hash afterwards.
 * - Spans that must never be translated (§3) are REMOVED before the text is sent, replaced by
 *   `<x>N</x>` tags DeepL is told to ignore, and spliced back after. restoreMask() then fails
 *   if any came back missing or duplicated, and checkStructure() refuses to write a page whose
 *   fences, headings, links or table rows no longer match the English.
 *
 * Exit codes: 0 ok · 1 usage/config/API error · 2 some pages were skipped
 *
 * Design notes, rollout, and troubleshooting: ./i18n-translate.md
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const DOCS_DIR = "docs";
const DRIFT_SCRIPT = "scripts/i18n-drift-check.mjs";
const GLOSSARY_DIR = "i18n/glossary";
const KEEP_ENGLISH_PATH = "i18n/glossary/keep-english.txt";
const SKIPLIST_PATH = "i18n/autotranslate-skiplist.txt";
const STAMP_KEY = "i18n_source_sha";

const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

// Front-matter values that are user-visible, and therefore the only ones we translate (§3).
// Matched on the key alone, at any indentation, so `features:` list items are covered.
const TRANSLATABLE_FRONT_MATTER_KEYS = new Set(["title", "tagline", "actionText", "details"]);

// DeepL target codes. Portuguese MUST be disambiguated or DeepL defaults to pt-BR, and this
// repository's Portuguese is European (see the pt locale annex).
const LOCALE_TARGETS = {
  fr: { translate: "FR", glossary: "fr", name: "French" },
  pt: { translate: "PT-PT", glossary: "pt", name: "Portuguese (European)" },
  es: { translate: "ES", glossary: "es", name: "Spanish" },
};

const DEFAULT_MAX_CHARS = 100_000;

/* ------------------------------------------------------------------ *
 * Small helpers
 * ------------------------------------------------------------------ */

function fail(message) {
  process.stderr.write(`[i18n-translate] ${redact(message)}\n`);
  process.exit(1);
}

function info(message) {
  process.stdout.write(`[i18n-translate] ${redact(message)}\n`);
}

// Every string on its way to a terminal or a log goes through here, so a stack trace cannot
// leak the key.
function redact(text) {
  const key = process.env.DEEPL_AUTH_KEY;
  if (!key || typeof text !== "string" || key.length < 8) return text;
  return text.split(key).join("***DEEPL_AUTH_KEY***");
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (!current.startsWith("--")) continue;

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

function runGit(args, options = {}) {
  return execFileSync("git", ["-c", "core.quotepath=false", ...args], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function toLocalizedPath(sourceFile, locale) {
  return `${DOCS_DIR}/${locale}/${sourceFile.slice(DOCS_DIR.length + 1)}`;
}

/* --- Markdown blocks: the unit we align old and new English by -------------------------- */

const FENCE_RE = /^(\s*)(```+|~~~+)/;

// Lossless: blocks.join("\n") reproduces the input exactly, which is what lets us rewrite one
// paragraph of a reviewed translation without disturbing the rest of the file.
export function splitBlocks(body) {
  const lines = body.split("\n");
  const blocks = [];
  let current = [];
  let fence = null;

  const flush = () => {
    if (current.length > 0) {
      blocks.push(current.join("\n"));
      current = [];
    }
  };

  for (const line of lines) {
    if (fence) {
      current.push(line);
      if (line.trim().startsWith(fence.marker) && line.trim().replace(/[`~]/g, "") === "") {
        fence = null;
        flush();
      }
      continue;
    }

    const fenceMatch = line.match(FENCE_RE);
    if (fenceMatch) {
      flush();
      fence = { marker: fenceMatch[2] };
      current.push(line);
      continue;
    }

    if (line.trim() === "") {
      flush();
      blocks.push("");
      continue;
    }

    current.push(line);
  }

  if (fence) flush(); // unterminated fence: keep it whole rather than treating it as prose
  flush();

  return blocks;
}

export function classifyBlock(block) {
  const trimmed = block.trim();
  if (trimmed === "") return "blank";
  if (FENCE_RE.test(block.split("\n")[0])) return "code";
  if (/^<[a-zA-Z/!]/.test(trimmed)) return "html";
  if (/^\|/.test(trimmed)) return "table";
  if (/^#{1,6}\s/.test(trimmed)) return "heading";
  if (/^:::/.test(trimmed)) return "container";
  if (/^(\s*)([-*+]|\d+[.)])\s/.test(block.split("\n")[0])) return "list";
  return "paragraph";
}

/* --- Masking ---------------------------------------------------------------------------- */

// Earliest pattern wins, and a later one that would overlap a claimed span is dropped whole
// (see claim()) - which is why the bare-URL pattern must stop at `]` and `)`. Changing
// anything here means re-running `npm run i18n:translate:corpus`.
const PROTECTED_PATTERNS = [
  /`[^`\n]*`/g, // inline code
  /!\[[^\]]*\]\([^)]*\)/g, // image: the alt text is handled separately and still translates
  /\]\([^)]*\)/g, // link target, keeping the preceding [text] translatable
  // Malformed link target, e.g. `[Table 57](#table-57]` - the anchor is still protected.
  // Bounded at whitespace and `]`: a greedy run to end of line would swallow the prose after
  // it, and would then be dropped whole for overlapping the next real span.
  /\]\([^)\s\]]*/g,
  /\]\[[^\]]*\]/g, // reference link target
  /<\/?[a-zA-Z][^>\n]*>/g, // HTML / Vue tags, and <autolinks>
  /\{\{[^}\n]*\}\}/g, // Vue interpolation
  // Bare URL. Ends on a non-punctuation character so a sentence keeps its own full stop.
  /https?:\/\/[^\s)\]<>]*[^\s)\]<>.,;:!?]/g,
  // A scheme left bare because the host was a placeholder the tag rule already claimed, as in
  // `https://<DNS_NAME>:4000`. Harmless to a translator, but the invariant is worth keeping
  // absolute: nothing that looks like a URL is ever sent.
  /https?:\/\//g,
  /\$\{[^}\n]*\}/g, // template placeholders
  /(?<=^|\s)[-\w./]+\.(?:md|js|mjs|json|ya?ml|sh|png|svg|puml)(?=$|[\s,.)])/g, // file paths
  // Last: a backtick left unpaired by the patterns above. Several source pages contain one
  // (`npm start' , ISO8583 `<-> ...). The prose around it still translates; the stray
  // character comes back exactly where it was rather than being moved by the translator.
  /`/g,
];

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Whole words, case sensitive, longest first so `ISO 20022` wins over `ISO`.
export function buildKeepEnglishPattern(terms) {
  const usable = terms.filter((term) => term.trim() !== "" && !term.startsWith("#"));
  if (usable.length === 0) return null;

  // Longest first, so `ISO 20022` wins over a hypothetical `ISO`.
  const sorted = [...usable].sort((a, b) => b.length - a.length).map(escapeRegExp);
  return new RegExp(`(?<![\\w-])(?:${sorted.join("|")})(?![\\w-])`, "g");
}

function xmlEscape(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Also decodes entities the translator may invent (`&#60;` for an escaped `<`). `&amp;` last,
// so a legitimate `&amp;lt;` does not collapse into `<`.
function xmlUnescape(text) {
  return text
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&(?:apos|#39);/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_whole, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_whole, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/gi, "&");
}

// Returns { masked, originals }. `masked` is XML-escaped except for the placeholder tags.
export function maskText(text, keepEnglishPattern) {
  const spans = [];

  // First match wins: a span overlapping one already claimed is rejected.
  const claim = (start, end) => {
    for (const span of spans) {
      if (start < span.end && end > span.start) return false;
    }
    spans.push({ start, end });
    return true;
  };

  for (const pattern of PROTECTED_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match[0] === "") {
        pattern.lastIndex += 1;
        continue;
      }
      claim(match.index, match.index + match[0].length);
    }
  }

  if (keepEnglishPattern) {
    keepEnglishPattern.lastIndex = 0;
    let match;
    while ((match = keepEnglishPattern.exec(text)) !== null) {
      claim(match.index, match.index + match[0].length);
    }
  }

  spans.sort((a, b) => a.start - b.start);

  const originals = [];
  let masked = "";
  let cursor = 0;

  for (const span of spans) {
    masked += xmlEscape(text.slice(cursor, span.start));
    masked += `<x>${originals.length}</x>`;
    originals.push(text.slice(span.start, span.end));
    cursor = span.end;
  }
  masked += xmlEscape(text.slice(cursor));

  return { masked, originals };
}

// A translator may MOVE a tag (word order differs between languages) but must return each one
// exactly once. Anything else means the output is damaged, so throw rather than hand back a
// plausible-looking page.
export function restoreMask(masked, originals) {
  const seen = new Set();
  const restored = xmlUnescape(masked).replace(/<x>\s*(\d+)\s*<\/x>/gi, (_whole, index) => {
    const position = Number(index);
    if (!Number.isInteger(position) || position < 0 || position >= originals.length) {
      throw new Error(`translation returned placeholder ${position}, which was never sent`);
    }
    if (seen.has(position)) {
      throw new Error(`translation duplicated placeholder ${position}`);
    }
    seen.add(position);
    return originals[position];
  });

  if (seen.size !== originals.length) {
    const lost = originals.map((_value, index) => index).filter((index) => !seen.has(index));
    throw new Error(
      `translation dropped ${lost.length} protected span(s): ` +
        lost.map((index) => JSON.stringify(originals[index].slice(0, 40))).join(", ")
    );
  }

  if (/<x>/i.test(restored)) {
    throw new Error("translation contains an unrecognised placeholder tag");
  }

  return restored;
}

/* --- Segmentation ----------------------------------------------------------------------- */

const LIST_MARKER_RE = /^(\s*(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?)/;
const HEADING_RE = /^(\s*#{1,6}\s+)(.*)$/;
const CONTAINER_RE = /^(\s*:::+\s*\w*\s*)(.*)$/;
const BLOCKQUOTE_RE = /^(\s*>\s?)/;

// Returns { pieces, join }, where join(translatedPieces) rebuilds the block. Splitting is per
// block type because the shape to preserve differs: a table keeps its cells, a list its
// markers, a heading its level. A block with nothing to translate yields no pieces.
export function segmentBlock(block, kind) {
  if (kind === "blank" || kind === "code" || kind === "html") {
    return { pieces: [], join: () => block };
  }

  const lines = block.split("\n");

  if (kind === "table") {
    // Cell by cell; the alignment row (|---|:--:|) is structure, never text.
    const plan = lines.map((line) => {
      if (!line.trim().startsWith("|")) return { literal: line };
      if (/^[\s|:-]+$/.test(line)) return { literal: line };
      const parts = line.split("|");
      return { parts };
    });

    const pieces = [];
    for (const row of plan) {
      if (!row.parts) continue;
      row.indexes = [];
      row.parts.forEach((cell, index) => {
        if (cell.trim() === "") return;
        row.indexes.push(index);
        pieces.push(cell.trim());
      });
    }

    return {
      pieces,
      join: (translated) => {
        let cursor = 0;
        return plan
          .map((row) => {
            if (!row.parts) return row.literal;
            const parts = [...row.parts];
            for (const index of row.indexes) {
              const original = parts[index];
              const leading = original.match(/^\s*/)[0] || " ";
              const trailing = original.match(/\s*$/)[0] || " ";
              parts[index] = `${leading}${translated[cursor]}${trailing}`;
              cursor += 1;
            }
            return parts.join("|");
          })
          .join("\n");
      },
    };
  }

  // Each line keeps its own marker, so nesting and numbering cannot drift.
  const lineOriented = kind === "heading" || kind === "list" || kind === "container";
  const hasQuote = lines.some((line) => BLOCKQUOTE_RE.test(line));

  if (lineOriented || hasQuote) {
    const plan = lines.map((line) => {
      let rest = line;
      let prefix = "";

      const quote = rest.match(BLOCKQUOTE_RE);
      if (quote) {
        prefix += quote[1];
        rest = rest.slice(quote[1].length);
      }

      const heading = rest.match(HEADING_RE);
      if (heading) {
        return { prefix: prefix + heading[1], text: heading[2] };
      }

      const container = rest.match(CONTAINER_RE);
      if (container) {
        return { prefix: prefix + container[1], text: container[2] };
      }

      const marker = rest.match(LIST_MARKER_RE);
      if (marker) {
        prefix += marker[1];
        rest = rest.slice(marker[1].length);
      }

      return { prefix, text: rest };
    });

    const pieces = [];
    for (const entry of plan) {
      if (entry.text.trim() === "") continue;
      entry.translate = true;
      pieces.push(entry.text);
    }

    return {
      pieces,
      join: (translated) => {
        let cursor = 0;
        return plan
          .map((entry) => {
            if (!entry.translate) return `${entry.prefix}${entry.text}`;
            const value = translated[cursor];
            cursor += 1;
            return `${entry.prefix}${value}`;
          })
          .join("\n");
      },
    };
  }

  // Paragraph: sent whole, so the translator sees its sentence context.
  if (block.trim() === "") return { pieces: [], join: () => block };
  const leading = block.match(/^\s*/)[0];
  const trailing = block.match(/\s*$/)[0];
  return {
    pieces: [block.trim()],
    join: (translated) => `${leading}${translated[0]}${trailing}`,
  };
}

/* --- Front matter ----------------------------------------------------------------------- */

// User-visible values only (§3); keys, `heroImage`, `home` and the stamp stay byte for byte.
// Line-based rather than a YAML round-trip, which would reformat lines nobody asked us to
// touch - these files are reviewed as diffs.
export function planFrontMatter(frontMatter) {
  const lines = frontMatter.split("\n");
  const plan = lines.map((line) => {
    const match = line.match(/^(\s*(?:-\s+)?)([A-Za-z_][\w-]*)(\s*:\s*)(.*)$/);
    if (!match) return { literal: line };

    const [, indent, key, separator, rawValue] = match;
    if (!TRANSLATABLE_FRONT_MATTER_KEYS.has(key)) return { literal: line };
    if (rawValue.trim() === "" || rawValue.trim() === "|" || rawValue.trim() === ">") {
      return { literal: line };
    }

    const quote = rawValue.startsWith('"') && rawValue.endsWith('"')
      ? '"'
      : rawValue.startsWith("'") && rawValue.endsWith("'")
        ? "'"
        : "";
    const value = quote ? rawValue.slice(1, -1) : rawValue;
    if (value.trim() === "") return { literal: line };

    return { indent, key, separator, quote, value, translate: true };
  });

  return {
    pieces: plan.filter((entry) => entry.translate).map((entry) => entry.value),
    join: (translated) => {
      let cursor = 0;
      return plan
        .map((entry) => {
          if (!entry.translate) return entry.literal;
          const value = translated[cursor];
          cursor += 1;
          return `${entry.indent}${entry.key}${entry.separator}${entry.quote}${value}${entry.quote}`;
        })
        .join("\n");
    },
  };
}

export function splitFrontMatter(content) {
  const match = content.match(FRONT_MATTER_RE);
  if (!match) return { frontMatter: null, body: content, raw: "" };
  return { frontMatter: match[1], body: content.slice(match[0].length), raw: match[0] };
}

/* --- Links ------------------------------------------------------------------------------ */

const ASSET_EXTENSIONS = /\.(png|jpe?g|gif|svg|webp|pdf|ico|css|js|json|zip)$/i;

// Root-absolute links point at the locale's own copy, but only where that copy exists: a link
// to an untranslated page is a 404, worse than §5's fallback of linking to English. Relative
// links already resolve inside the locale and are left alone.
export function rewriteInternalLinks(body, locale, repoRoot, exists = fs.existsSync) {
  return body.replace(/\]\((\/[^)\s]*)(\s+"[^"]*")?\)/g, (whole, target, title = "") => {
    if (target.startsWith(`/${locale}/`)) return whole;
    if (target.startsWith("/.vuepress/")) return whole;
    if (ASSET_EXTENSIONS.test(target.split("#")[0])) return whole;

    const [bare, anchor = ""] = target.split("#");
    const candidates = bare.endsWith("/")
      ? [`${bare}README.md`, `${bare}index.md`]
      : bare.endsWith(".md")
        ? [bare]
        : [`${bare}.md`, `${bare}/README.md`];

    const translated = candidates.some((candidate) =>
      exists(path.join(repoRoot, DOCS_DIR, locale, candidate.replace(/^\//, "")))
    );
    if (!translated) return whole;

    const suffix = anchor ? `#${anchor}` : "";
    return `](/${locale}${bare}${suffix}${title})`;
  });
}

/* --- Structure validation: the gate that decides whether a page is written -------------- */

// What must be identical between an English page and its translation (§4). A page failing any
// of these has been damaged, and must not reach a reviewer pretending to be a draft.
export function structureOf(markdown) {
  const { body } = splitFrontMatter(markdown);
  const blocks = splitBlocks(body);

  const fences = blocks.filter((block) => classifyBlock(block) === "code").length;
  const headings = [];
  let tableRows = 0;

  for (const block of blocks) {
    const kind = classifyBlock(block);
    if (kind === "code") continue;
    for (const line of block.split("\n")) {
      const heading = line.match(/^\s*(#{1,6})\s/);
      if (heading) headings.push(heading[1].length);
      if (line.trim().startsWith("|")) tableRows += 1;
    }
  }

  // Counted on the body minus code, since a fence may contain markdown.
  const prose = blocks
    .filter((block) => classifyBlock(block) !== "code")
    .join("\n");

  return {
    fences,
    headings,
    tableRows,
    links: (prose.match(/\]\([^)]*\)/g) || []).length,
    images: (prose.match(/!\[[^\]]*\]\([^)]*\)/g) || []).length,
  };
}

export function checkStructure(english, translated) {
  const a = structureOf(english);
  const b = structureOf(translated);
  const problems = [];

  if (a.fences !== b.fences) problems.push(`code blocks: ${a.fences} -> ${b.fences}`);
  if (a.links !== b.links) problems.push(`links: ${a.links} -> ${b.links}`);
  if (a.images !== b.images) problems.push(`images: ${a.images} -> ${b.images}`);
  if (a.tableRows !== b.tableRows) problems.push(`table rows: ${a.tableRows} -> ${b.tableRows}`);
  if (a.headings.length !== b.headings.length) {
    problems.push(`headings: ${a.headings.length} -> ${b.headings.length}`);
  } else if (a.headings.join(",") !== b.headings.join(",")) {
    problems.push(`heading levels changed: ${a.headings.join(",")} -> ${b.headings.join(",")}`);
  }

  return problems;
}

/* --- DeepL client: hand-rolled over fetch, since scripts here take no runtime deps ------ */

const MAX_TEXTS_PER_REQUEST = 50; // DeepL's documented limit
const MAX_RETRIES = 5;

export function apiBaseFor(authKey) {
  // Free-tier keys carry a :fx suffix and are served from a different host.
  return authKey.trim().endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class DeepLClient {
  constructor(authKey, { fetchImpl = fetch, now = Date.now } = {}) {
    if (!authKey || authKey.trim() === "") {
      throw new Error("DEEPL_AUTH_KEY is empty");
    }
    this.authKey = authKey.trim();
    this.base = apiBaseFor(this.authKey);
    this.fetch = fetchImpl;
    this.now = now;
    this.charactersSent = 0;
  }

  async request(endpoint, body, { method = "POST" } = {}) {
    let attempt = 0;

    for (;;) {
      attempt += 1;
      let response;
      try {
        response = await this.fetch(`${this.base}${endpoint}`, {
          method,
          headers: {
            // Header auth, never the query string: a URL ends up in proxy and CI logs.
            Authorization: `DeepL-Auth-Key ${this.authKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "mojaloop-documentation-i18n/1.0",
          },
          body,
        });
      } catch (error) {
        if (attempt > MAX_RETRIES) throw new Error(`network error: ${redact(String(error))}`);
        await sleep(Math.min(2 ** attempt * 500, 20_000));
        continue;
      }

      if (response.status === 429 || response.status >= 500) {
        if (attempt > MAX_RETRIES) {
          throw new Error(`DeepL kept returning ${response.status} after ${MAX_RETRIES} retries`);
        }
        const retryAfter = Number(response.headers.get("retry-after"));
        const wait = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : Math.min(2 ** attempt * 500, 20_000);
        await sleep(wait);
        continue;
      }

      if (response.status === 456) {
        throw new Error("DeepL quota exhausted for this key (HTTP 456). Nothing further sent.");
      }
      if (response.status === 403) {
        throw new Error("DeepL rejected the key (HTTP 403). Check DEEPL_AUTH_KEY.");
      }
      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        throw new Error(`DeepL HTTP ${response.status}: ${redact(detail).slice(0, 400)}`);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    }
  }

  async usage() {
    return this.request("/v2/usage", new URLSearchParams());
  }

  // tag_handling=xml with ignore_tags=x is what makes the masking contract hold: DeepL treats
  // `<x>7</x>` as an atom. split_sentences=nonewlines stops a multi-line block being reflowed.
  async translate(texts, { target, glossaryId, formality }) {
    if (texts.length === 0) return [];

    const results = [];
    for (let i = 0; i < texts.length; i += MAX_TEXTS_PER_REQUEST) {
      const slice = texts.slice(i, i + MAX_TEXTS_PER_REQUEST);
      const body = new URLSearchParams();
      body.append("source_lang", "EN"); // a glossary is only honoured when this is explicit
      body.append("target_lang", target);
      body.append("tag_handling", "xml");
      body.append("ignore_tags", "x");
      body.append("outline_detection", "0");
      body.append("split_sentences", "nonewlines");
      body.append("preserve_formatting", "1");
      if (glossaryId) body.append("glossary_id", glossaryId);
      if (formality) body.append("formality", formality);
      for (const text of slice) body.append("text", text);

      const payload = await this.request("/v2/translate", body);
      if (!Array.isArray(payload.translations) || payload.translations.length !== slice.length) {
        throw new Error("DeepL returned a different number of translations than were sent");
      }
      for (const translation of payload.translations) results.push(translation.text);
      this.charactersSent += slice.reduce((sum, text) => sum + text.length, 0);
    }

    return results;
  }

  async listGlossaries() {
    const payload = await this.request("/v2/glossaries", undefined, { method: "GET" });
    return payload.glossaries || [];
  }

  async createGlossary({ name, target, entriesTsv }) {
    const body = new URLSearchParams();
    body.append("name", name);
    body.append("source_lang", "en");
    body.append("target_lang", target);
    body.append("entries", entriesTsv);
    body.append("entries_format", "tsv");
    return this.request("/v2/glossaries", body);
  }

  async deleteGlossary(id) {
    return this.request(`/v2/glossaries/${encodeURIComponent(id)}`, undefined, {
      method: "DELETE",
    });
  }
}

/* --- Glossary files --------------------------------------------------------------------- */

// Rejects a duplicate source term rather than letting the last row win: §8 requires exactly
// one translation per term, so a file breaking that is a bug to surface, not resolve by luck.
export function parseGlossaryCsv(text) {
  const entries = new Map();
  const problems = [];
  let seenDataRow = false;

  text.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) return;

    const cells = splitCsvLine(trimmed);
    if (cells.length < 2) {
      problems.push(`line ${index + 1}: expected two columns, got ${cells.length}`);
      return;
    }
    const [source, target] = cells;

    // Header detection is by CONTENT, not line number: the comment block above it changes
    // length, and keying off the position once turned `en,target` into a live glossary term.
    if (!seenDataRow && source.toLowerCase() === "en" && target.toLowerCase() === "target") {
      seenDataRow = true;
      return;
    }
    seenDataRow = true;

    if (source === "" || target === "") {
      problems.push(`line ${index + 1}: empty term`);
      return;
    }
    if (entries.has(source) && entries.get(source) !== target) {
      problems.push(`line ${index + 1}: "${source}" already maps to "${entries.get(source)}"`);
      return;
    }
    entries.set(source, target);
  });

  return { entries, problems };
}

function splitCsvLine(line) {
  const cells = [];
  let current = "";
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quoted) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        current += char;
      }
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === ",") {
      cells.push(current.trim());
      current = "";
    } else current += char;
  }
  cells.push(current.trim());
  return cells;
}

function hashString(text) {
  // Not cryptographic: it only has to change when the glossary does.
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) hash = ((hash * 33) ^ text.charCodeAt(i)) >>> 0;
  return hash.toString(16).padStart(8, "0");
}

// The content hash is in the glossary's name, so "has it changed?" needs no local state -
// which matters because CI starts from a clean checkout on every run.
export async function ensureGlossary(client, locale, repoRoot, { quiet = false } = {}) {
  const csvPath = path.join(repoRoot, GLOSSARY_DIR, `${locale}.csv`);
  if (!fs.existsSync(csvPath)) {
    if (!quiet) info(`No glossary at ${GLOSSARY_DIR}/${locale}.csv - translating without one.`);
    return null;
  }

  const raw = fs.readFileSync(csvPath, "utf8");
  const { entries, problems } = parseGlossaryCsv(raw);
  if (problems.length > 0) {
    fail(`${GLOSSARY_DIR}/${locale}.csv is invalid:\n  - ${problems.join("\n  - ")}`);
  }
  if (entries.size === 0) {
    if (!quiet) info(`Glossary ${GLOSSARY_DIR}/${locale}.csv is empty - translating without one.`);
    return null;
  }

  const target = LOCALE_TARGETS[locale].glossary;
  const tsv = [...entries].map(([source, value]) => `${source}\t${value}`).join("\n");
  const name = `mojaloop-docs-${locale}-${hashString(tsv)}`;

  const existing = await client.listGlossaries();
  const match = existing.find((glossary) => glossary.name === name && glossary.ready !== false);
  if (match) {
    if (!quiet) info(`Reusing uploaded glossary ${name} (${entries.size} terms).`);
    return match.glossary_id;
  }

  const created = await client.createGlossary({ name, target, entriesTsv: tsv });
  if (!quiet) info(`Uploaded glossary ${name} (${entries.size} terms).`);

  // Drop superseded versions so the account does not accumulate one per edit. Cosmetic:
  // failure here must never abort a run.
  for (const glossary of existing) {
    if (!glossary.name.startsWith(`mojaloop-docs-${locale}-`)) continue;
    if (glossary.name === name) continue;
    try {
      await client.deleteGlossary(glossary.glossary_id);
    } catch {
      // ignore
    }
  }

  return created.glossary_id;
}

export function loadKeepEnglish(repoRoot) {
  const filePath = path.join(repoRoot, KEEP_ENGLISH_PATH);
  if (!fs.existsSync(filePath)) return [];
  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.startsWith("#"));
}

export function loadSkiplist(repoRoot) {
  const filePath = path.join(repoRoot, SKIPLIST_PATH);
  if (!fs.existsSync(filePath)) return [];
  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.startsWith("#"));
}

export function matchesSkiplist(sourcePath, patterns) {
  return patterns.some((pattern) => {
    const regex = new RegExp(
      `^${pattern
        .split("*")
        .map(escapeRegExp)
        .join("[^/]*")
        .replace(/\[\^\/\]\*\[\^\/\]\*/g, ".*")}$`
    );
    return regex.test(sourcePath);
  });
}

/* --- Translating a page ----------------------------------------------------------------- */

// Raw English in, raw translated out, masked and verified in between. Injecting this is what
// makes the pipeline testable without a network.
export function createSegmentTranslator({ client, target, keepEnglish, glossaryId, formality }) {
  const keepEnglishPattern = buildKeepEnglishPattern(keepEnglish);

  return async (texts) => {
    if (texts.length === 0) return [];

    const masks = texts.map((text) => maskText(text, keepEnglishPattern));

    // Nothing but structure left after masking: do not pay to send it.
    const sendable = [];
    masks.forEach((mask, index) => {
      if (/[\p{L}\p{N}]/u.test(xmlUnescape(mask.masked.replace(/<x>\d+<\/x>/g, "")))) {
        sendable.push(index);
      }
    });

    const translated = await client.translate(
      sendable.map((index) => masks[index].masked),
      { target, glossaryId, formality }
    );

    const output = texts.slice();
    sendable.forEach((index, position) => {
      output[index] = restoreMask(translated[position], masks[index].originals);
    });
    return output;
  };
}

// The stamp is not written here: i18n-drift-check.mjs --stamp does it afterwards, so the hash
// and the rule for computing it stay in one place.
export async function translatePage({ english, locale, repoRoot, translateSegments, existingFrontMatter }) {
  const { frontMatter, body } = splitFrontMatter(english);

  const frontPlan = frontMatter !== null ? planFrontMatter(frontMatter) : { pieces: [], join: () => "" };

  const blocks = splitBlocks(body);
  const plans = blocks.map((block) => segmentBlock(block, classifyBlock(block)));

  const allPieces = [...frontPlan.pieces];
  for (const plan of plans) allPieces.push(...plan.pieces);

  const translated = await translateSegments(allPieces);

  let cursor = 0;
  const take = (count) => translated.slice(cursor, (cursor += count));

  const newFrontMatter = frontMatter !== null ? frontPlan.join(take(frontPlan.pieces.length)) : null;
  const newBody = plans.map((plan) => plan.join(take(plan.pieces.length))).join("\n");

  const linked = rewriteInternalLinks(newBody, locale, repoRoot);

  if (newFrontMatter === null) return linked;

  // Carry forward an existing stamp so front matter does not churn in the diff.
  const preserved = existingFrontMatter
    ? (existingFrontMatter.split("\n").find((line) => line.trim().startsWith(`${STAMP_KEY}:`)) || null)
    : null;
  const lines = newFrontMatter.split("\n");
  if (preserved && !lines.some((line) => line.trim().startsWith(`${STAMP_KEY}:`))) {
    lines.push(preserved);
  }

  return `---\n${lines.join("\n")}\n---\n${linked}`;
}

class AlignmentError extends Error {}

// LCS over whole blocks, exact equality only: a block that changed by one word is a block to
// re-translate. Being cleverer would mean guessing which half of a reviewed paragraph is good.
export function alignBlocks(oldBlocks, newBlocks) {
  const rows = oldBlocks.length;
  const columns = newBlocks.length;
  const table = Array.from({ length: rows + 1 }, () => new Uint32Array(columns + 1));

  for (let i = rows - 1; i >= 0; i -= 1) {
    for (let j = columns - 1; j >= 0; j -= 1) {
      table[i][j] = oldBlocks[i] === newBlocks[j]
        ? table[i + 1][j + 1] + 1
        : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  // Per block of the NEW English page: the index of the matching OLD block, or -1.
  const matches = new Array(columns).fill(-1);
  let i = 0;
  let j = 0;
  while (i < rows && j < columns) {
    if (oldBlocks[i] === newBlocks[j]) {
      matches[j] = i;
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      i += 1;
    } else {
      j += 1;
    }
  }

  return matches;
}

// Updates a stale translation in place: only the English blocks that changed are sent, and
// reviewed sentences matching unchanged English are kept as the human left them.
//
// Throws AlignmentError when the translation no longer mirrors the English it was made from.
// That is not a failure to work around: we cannot say which paragraph corresponds to which, so
// re-translating wholesale would destroy reviewed work. The caller reports it and moves on.
export async function patchPage({
  oldEnglish,
  newEnglish,
  existingTranslation,
  locale,
  repoRoot,
  translateSegments,
}) {
  const oldParts = splitFrontMatter(oldEnglish);
  const newParts = splitFrontMatter(newEnglish);
  const existingParts = splitFrontMatter(existingTranslation);

  const oldBlocks = splitBlocks(oldParts.body);
  const newBlocks = splitBlocks(newParts.body);
  const existingBlocks = splitBlocks(existingParts.body);

  // Align on CONTENT blocks, ignoring blank ones. Blank blocks are separators, and their count
  // legitimately differs: `i18n-drift-check.mjs --stamp` writes front matter as "---\n...\n---\n\n",
  // so every page it stamps gains a leading blank the English source does not have. Counting
  // raw blocks would reject essentially every stamped page.
  const contentOf = (blocks) =>
    blocks.map((block, index) => ({ block, index })).filter((e) => classifyBlock(e.block) !== "blank");

  const oldContent = contentOf(oldBlocks);
  const existingContent = contentOf(existingBlocks);

  if (oldContent.length !== existingContent.length) {
    throw new AlignmentError(
      `the translation has ${existingContent.length} blocks where the English it was made from ` +
        `has ${oldContent.length}; cannot tell which paragraph is which`
    );
  }

  const oldKinds = oldContent.map((e) => classifyBlock(e.block)).join("|");
  const existingKinds = existingContent.map((e) => classifyBlock(e.block)).join("|");
  if (oldKinds !== existingKinds) {
    throw new AlignmentError(
      "the translation does not mirror the structure of the English it was made from"
    );
  }

  // Old English block index -> the reviewed translation of that block.
  const translationOf = new Map(
    oldContent.map((entry, rank) => [entry.index, existingContent[rank].block])
  );

  const matches = alignBlocks(oldBlocks, newBlocks);

  // Re-translated only when the English front matter actually moved.
  const frontChanged = (oldParts.frontMatter || "") !== (newParts.frontMatter || "");
  const frontPlan = frontChanged && newParts.frontMatter !== null
    ? planFrontMatter(newParts.frontMatter)
    : { pieces: [], join: () => null };

  const toTranslate = [...frontPlan.pieces];
  const blockPlans = newBlocks.map((block, index) => {
    if (matches[index] !== -1) return null; // unchanged English: keep the reviewed translation
    const plan = segmentBlock(block, classifyBlock(block));
    toTranslate.push(...plan.pieces);
    return plan;
  });

  const translated = await translateSegments(toTranslate);

  let cursor = 0;
  const take = (count) => translated.slice(cursor, (cursor += count));

  const newFrontMatter = frontChanged ? frontPlan.join(take(frontPlan.pieces.length)) : null;

  const bodyBlocks = newBlocks.map((block, index) => {
    const plan = blockPlans[index];
    if (plan !== null) return rewriteInternalLinks(plan.join(take(plan.pieces.length)), locale, repoRoot);
    // Unchanged English: reuse the reviewed translation. A blank block has no translation of
    // its own and is emitted as the new English has it.
    const oldIndex = matches[index];
    return translationOf.has(oldIndex) ? translationOf.get(oldIndex) : block;
  });

  const body = bodyBlocks.join("\n");

  if (newFrontMatter !== null) {
    const stampLine = (existingParts.frontMatter || "")
      .split("\n")
      .find((line) => line.trim().startsWith(`${STAMP_KEY}:`));
    const lines = newFrontMatter.split("\n");
    if (stampLine && !lines.some((line) => line.trim().startsWith(`${STAMP_KEY}:`))) {
      lines.push(stampLine);
    }
    return `---\n${lines.join("\n")}\n---\n${body}`;
  }

  return existingParts.raw + body;
}

export { AlignmentError };

/* --- Talking to the drift checker ------------------------------------------------------- */

// Via --json-out, the interface the drift checker already offers and the one CI uses.
export function readAudit(repoRoot) {
  const outPath = path.join(
    fs.mkdtempSync(path.join(repoRoot, ".i18n-translate-")),
    "audit.json"
  );

  try {
    execFileSync(process.execPath, [DRIFT_SCRIPT, "--audit", "--json-out", outPath], {
      cwd: repoRoot,
      stdio: ["ignore", "ignore", "pipe"],
      encoding: "utf8",
    });
    return JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch (error) {
    // --audit never exits non-zero on findings, so a throw here is a real failure.
    const detail = error.stderr ? String(error.stderr).trim() : String(error.message);
    fail(`could not run ${DRIFT_SCRIPT} --audit: ${detail}`);
  } finally {
    fs.rmSync(path.dirname(outPath), { recursive: true, force: true });
  }
}

function stampPage(repoRoot, localizedPath) {
  execFileSync(process.execPath, [DRIFT_SCRIPT, "--stamp", localizedPath], {
    cwd: repoRoot,
    stdio: ["ignore", "ignore", "pipe"],
    encoding: "utf8",
  });
}

// Null when the blob is absent: a shallow clone, or a stamp someone typed by hand.
function readSourceAtStamp(repoRoot, stamp) {
  try {
    return runGit(["cat-file", "blob", stamp], { cwd: repoRoot });
  } catch {
    return null;
  }
}

function readStamp(absolutePath) {
  if (!fs.existsSync(absolutePath)) return null;
  const match = fs.readFileSync(absolutePath, "utf8").match(FRONT_MATTER_RE);
  if (!match) return null;
  const line = match[1].split("\n").find((entry) => entry.trim().startsWith(`${STAMP_KEY}:`));
  if (!line) return null;
  return line.slice(line.indexOf(":") + 1).trim().replace(/^["']|["']$/g, "") || null;
}

// `unstamped` pages are excluded unless --retranslate says otherwise: such a page is usually
// a human translation predating stamping. We cannot prove it is current, but overwriting
// reviewed work on a guess is worse.
export function selectWork({ audit, locale, section, statuses, skiplist, repoRoot, exists = fs.existsSync }) {
  const prefix = section ? `${DOCS_DIR}/${section.replace(/^\/|\/$/g, "")}/` : `${DOCS_DIR}/`;

  return audit.findings
    .filter((finding) => finding.locale === locale)
    .filter((finding) => statuses.includes(finding.status))
    .filter((finding) => finding.source && finding.source.startsWith(prefix))
    .filter((finding) => !matchesSkiplist(finding.source, skiplist))
    .filter((finding) => exists(path.join(repoRoot, finding.source)))
    .map((finding) => ({
      status: finding.status,
      source: finding.source,
      target: finding.path || toLocalizedPath(finding.source, locale),
    }))
    .sort((a, b) => a.source.localeCompare(b.source));
}

function estimateCharacters(repoRoot, work) {
  // Upper bound: the whole English page. Masking and patching only ever send less.
  return work.reduce((total, item) => {
    try {
      return total + fs.statSync(path.join(repoRoot, item.source)).size;
    } catch {
      return total;
    }
  }, 0);
}

/* --- CLI -------------------------------------------------------------------------------- */

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

const SECTIONS = ["adoption", "community", "getting-started", "product", "quickstarts", "technical"];

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = process.cwd();

  if (args.help === "true") {
    process.stdout.write(usage());
    return;
  }

  if (!fs.existsSync(path.join(repoRoot, DRIFT_SCRIPT))) {
    fail(`${DRIFT_SCRIPT} not found. Run this from the repository root.`);
  }

  const ci = args.ci === "true";
  const dryRun = args["dry-run"] === "true";

  // Without a TTY, readline would wait on stdin for ever, so every question has a
  // non-interactive answer: name it on the command line, or accept the stated default.
  const interactive = Boolean(process.stdin.isTTY) && !ci;

  /* ---- locale ---- */
  let locale = args.locale;
  if (!locale && interactive) {
    locale = await prompt(`Locale (${Object.keys(LOCALE_TARGETS).join(" / ")}): `);
  }
  if (!locale || !LOCALE_TARGETS[locale]) {
    fail(`--locale must be one of: ${Object.keys(LOCALE_TARGETS).join(", ")}`);
  }

  /* ---- section ---- */
  let section = args.section === "true" ? null : args.section;
  if (section === undefined && interactive) {
    const answer = await prompt(`Section (${SECTIONS.join(" / ")}, or blank for all): `);
    section = answer === "" ? null : answer;
  } else if (section === undefined) {
    info("No --section given: considering every section.");
  }
  if (section) {
    const top = section.replace(/^\/|\/$/g, "").split("/")[0];
    if (!SECTIONS.includes(top)) {
      fail(`Unknown section "${section}". Expected one of: ${SECTIONS.join(", ")}`);
    }
    if (!fs.existsSync(path.join(repoRoot, DOCS_DIR, section.replace(/^\/|\/$/g, "")))) {
      fail(`docs/${section} does not exist.`);
    }
  }

  /* ---- what counts as work ---- */
  const statuses = ["missing", "stale"];
  if (args.retranslate === "true") statuses.push("unstamped");

  info("Reading the drift audit ...");
  const audit = readAudit(repoRoot);
  const skiplist = loadSkiplist(repoRoot);
  const work = selectWork({ audit, locale, section, statuses, skiplist, repoRoot });

  if (work.length === 0) {
    info(`Nothing to translate for ${locale}${section ? ` in ${section}` : ""}. `);
    return;
  }

  const byStatus = work.reduce((counts, item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
    return counts;
  }, {});
  const estimate = estimateCharacters(repoRoot, work);
  const maxChars = Number(args["max-chars"] || DEFAULT_MAX_CHARS);
  if (!Number.isFinite(maxChars) || maxChars <= 0) fail("--max-chars must be a positive number");

  info(`Locale: ${locale} (${LOCALE_TARGETS[locale].name})`);
  info(`Pages:  ${work.length} (${Object.entries(byStatus).map(([k, v]) => `${v} ${k}`).join(", ")})`);
  info(`Upper bound on characters to send: ~${estimate.toLocaleString("en-US")}`);
  info(`Cap for this run (--max-chars): ${maxChars.toLocaleString("en-US")}`);

  if (estimate > maxChars) {
    info("");
    info(
      `The estimate exceeds the cap, so pages will be translated in order until the cap is ` +
        `reached and the rest reported. Narrow it with --section, or raise --max-chars.`
    );
  }

  // A dry run needs no key - that is the point of it - but reports the quota when one is set.
  const authKey = process.env.DEEPL_AUTH_KEY;
  if (!authKey && !dryRun) {
    fail(
      "DEEPL_AUTH_KEY is not set. Put it in a local .env (git-ignored) and export it:\n" +
        "  set -a; . ./.env; set +a"
    );
  }

  const monthlyCap = Number(process.env.DEEPL_MONTHLY_CAP || 0);
  let client = null;
  let used = 0;
  let remaining = 0;

  if (authKey) {
    client = new DeepLClient(authKey);
    let usage_;
    try {
      usage_ = await client.usage();
    } catch (error) {
      fail(String(error.message));
    }
    used = usage_.character_count ?? 0;
    const limit = usage_.character_limit ?? 0;
    remaining = Math.max(limit - used, 0);
    info(
      `DeepL quota: ${used.toLocaleString("en-US")} of ${limit.toLocaleString("en-US")} used, ` +
        `${remaining.toLocaleString("en-US")} left.`
    );
  }

  if (dryRun) {
    info("");
    info("--dry-run: nothing was sent to DeepL and no file was written.");
    for (const item of work) info(`  ${item.status.padEnd(8)} ${item.target}`);
    if (!authKey) info("");
    if (!authKey) info("No DEEPL_AUTH_KEY set, so the remaining quota could not be reported.");
    return;
  }

  if (monthlyCap > 0 && used >= monthlyCap) {
    info(`Monthly cap DEEPL_MONTHLY_CAP=${monthlyCap} already reached. Nothing sent.`);
    return;
  }

  const budget = Math.min(
    maxChars,
    remaining || maxChars,
    monthlyCap > 0 ? monthlyCap - used : maxChars
  );

  if (!ci && !interactive) {
    // Refusing beats assuming consent for a run that spends quota and rewrites pages.
    fail(
      "stdin is not a terminal, so the confirmation cannot be asked. Re-run with --ci to " +
        "translate unattended, or --dry-run to see the plan."
    );
  }

  if (!ci) {
    const answer = await prompt(
      `\nTranslate ${work.length} page(s) into ${locale} with DeepL? This writes machine output you must review. [y/N] `
    );
    if (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "yes") {
      info("Cancelled. Nothing sent.");
      return;
    }
  }

  /* ---- translate ---- */
  const glossaryId = await ensureGlossary(client, locale, repoRoot, { quiet: ci });
  const translateSegments = createSegmentTranslator({
    client,
    target: LOCALE_TARGETS[locale].translate,
    keepEnglish: loadKeepEnglish(repoRoot),
    glossaryId,
    formality: args.formality && args.formality !== "true" ? args.formality : undefined,
  });

  const written = [];
  const skipped = [];
  let stoppedOnBudget = false;

  for (const item of work) {
    if (client.charactersSent >= budget) {
      stoppedOnBudget = true;
      skipped.push({ ...item, reason: "character budget reached" });
      continue;
    }

    const englishPath = path.join(repoRoot, item.source);
    const targetPath = path.join(repoRoot, item.target);
    const english = fs.readFileSync(englishPath, "utf8");

    try {
      let output;

      if (item.status === "stale" && args.retranslate !== "true") {
        const stamp = readStamp(targetPath);
        const oldEnglish = stamp ? readSourceAtStamp(repoRoot, stamp) : null;
        if (oldEnglish === null) {
          skipped.push({
            ...item,
            reason: `the English version it was translated from (${stamp ? stamp.slice(0, 7) : "unstamped"}) is not in this clone`,
          });
          continue;
        }
        output = await patchPage({
          oldEnglish,
          newEnglish: english,
          existingTranslation: fs.readFileSync(targetPath, "utf8"),
          locale,
          repoRoot,
          translateSegments,
        });
      } else {
        output = await translatePage({
          english,
          locale,
          repoRoot,
          translateSegments,
          existingFrontMatter: fs.existsSync(targetPath)
            ? splitFrontMatter(fs.readFileSync(targetPath, "utf8")).frontMatter
            : null,
        });
      }

      const problems = checkStructure(english, output);
      if (problems.length > 0) {
        skipped.push({ ...item, reason: `structure check failed - ${problems.join("; ")}` });
        continue;
      }

      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, output, "utf8");
      stampPage(repoRoot, item.target);
      written.push(item);
      info(`  wrote ${item.target}`);
    } catch (error) {
      if (error instanceof AlignmentError) {
        skipped.push({ ...item, reason: `needs a human - ${error.message}` });
        continue;
      }
      // Not this page's fault, and carrying on would burn the budget against the same wall.
      if (/quota|403|kept returning/i.test(String(error.message))) {
        skipped.push({ ...item, reason: String(error.message) });
        info("");
        info(`Stopping: ${error.message}`);
        break;
      }
      skipped.push({ ...item, reason: redact(String(error.message)) });
    }
  }

  /* ---- report ---- */
  info("");
  info(`Wrote ${written.length} draft page(s). Characters sent this run: ${client.charactersSent.toLocaleString("en-US")}.`);

  if (skipped.length > 0) {
    info(`Skipped ${skipped.length} page(s):`);
    for (const item of skipped) info(`  ${item.target}\n    ${item.reason}`);
  }
  if (stoppedOnBudget) {
    info("The character budget stopped this run. Re-run to continue where it left off.");
  }

  if (args["summary-out"]) {
    fs.writeFileSync(
      args["summary-out"],
      `${JSON.stringify({ locale, section: section || null, written, skipped, charactersSent: client.charactersSent }, null, 2)}\n`,
      "utf8"
    );
  }

  if (written.length > 0) {
    info("");
    info("Next steps - these drafts are NOT ready to merge:");
    info("  1. Read and correct every line (translationguidelines.md §10).");
    info("  2. npm run lint");
    info("  3. npm run dev   # check the page, sidebar, and language switcher");
    info(`  4. Commit on branch i18n-${locale}/<area> and include the AI/MT disclosure in the PR.`);
    info("");
    process.stdout.write(disclosureBlock(locale, written));
  }

  if (skipped.length > 0) process.exit(2);
}

// Printed, not inserted into the page: the disclosure belongs to the PR description, and a
// human has to stand behind it.
export function disclosureBlock(locale, written) {
  return [
    "--- copy into the PR description ---",
    "",
    "## AI assistance disclosure",
    "",
    `Tool: DeepL API (\`npm run i18n:translate\`), used to produce the FIRST DRAFT of the ${locale} pages below.`,
    "Scope: translated prose only. Code blocks, inline code, URLs, paths, API field names and",
    "component names were masked before sending and restored afterwards; the script refuses to",
    "write a page whose structure does not match the English source.",
    "Review: every line has been read and corrected by a human translator who understands the",
    "payments domain, as required by translationguidelines.md §10.",
    "",
    "Pages:",
    ...written.map((item) => `- \`${item.target}\``),
    "",
    "--- end ---",
    "",
  ].join("\n");
}

function usage() {
  return [
    "Usage: node scripts/i18n-translate.mjs [options]",
    "",
    "Produces FIRST-DRAFT translations with DeepL. Every page it writes must be read and",
    "corrected by a human before it is merged (translationguidelines.md §10).",
    "",
    "  --locale <fr|pt|es>   Target locale (prompted when omitted)",
    "  --section <name>      Limit to docs/<name>/ (prompted when omitted); blank means all",
    "  --dry-run             Show what would be translated; send nothing, write nothing",
    "  --max-chars <n>       Stop before exceeding this many characters (default 100000)",
    "  --retranslate         Also replace `unstamped` pages, discarding the existing text",
    "  --formality <v>       DeepL formality: default|prefer_more|prefer_less",
    "  --summary-out <path>  Write a JSON summary of what was written and skipped",
    "  --ci                  Non-interactive: no prompts, no confirmation",
    "  --help                Show this message",
    "",
    "Environment:",
    "  DEEPL_AUTH_KEY        Required. Never written to disk by this script.",
    "  DEEPL_MONTHLY_CAP     Optional. Refuse to push the account past this many characters.",
    "",
    "Exit codes: 0 ok · 1 usage/config/API error · 2 some pages were skipped",
    "",
  ].join("\n");
}

// Only when invoked directly, so the tests can import the pure functions above.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => fail(String(error && error.stack ? error.stack : error)));
}
