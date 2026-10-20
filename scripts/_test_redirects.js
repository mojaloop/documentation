#!/usr/bin/env node
/**
 * Tests infra/src/redirect/index.js, the CloudFront Function behind docs.mojaloop.io.
 *
 * This has to pass BEFORE the function is pushed: the CircleCI `infra` job runs
 * `terraform apply --auto-approve` on every branch, so a push deploys straight to
 * production with no staging step.
 *
 * Checks:
 *   1. source stays under the 10240-byte CloudFront Function limit
 *   2. no duplicate `from` keys (first match wins, so a duplicate silently shadows)
 *   3. no redirect loops, and no chain longer than MAX_HOPS
 *   4. every redirect lands on a page that exists (or an external URL)
 *   5. no page that exists today is redirected away
 *   6. any page removed or renamed in this branch has a rule, or is allowlisted
 *
 * Usage: node scripts/_test_redirects.js
 */
'use strict'

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT = path.join(__dirname, '..')
const FN = path.join(ROOT, 'infra/src/redirect/index.js')
const ALLOWLIST = path.join(ROOT, 'infra/src/redirect/no-redirect.txt')
const MAX_BYTES = 10240
const BUDGET = 9000 // leave room for future rules
const MAX_HOPS = 3

let failures = 0
function check (ok, label, detail) {
  if (ok) return
  failures++
  console.error('  FAIL  ' + label + (detail ? '\n        ' + detail : ''))
}

// --- load the function under test -------------------------------------------
const src = fs.readFileSync(FN, 'utf8')
// eslint-disable-next-line no-new-func
const handler = new Function(src + '\nreturn handler')()

function redirect (uri) {
  const res = handler({ request: { uri: uri } })
  if (res && res.statusCode) return res.headers.location.value
  return null // passed through
}

function follow (uri) {
  const seen = [uri]
  let cur = uri
  for (let i = 0; i <= MAX_HOPS; i++) {
    const next = redirect(cur)
    if (next === null) return { dest: cur, hops: i, chain: seen }
    if (/^https?:/.test(next)) return { dest: next, hops: i + 1, external: true, chain: seen }
    if (seen.indexOf(next) !== -1) return { loop: true, chain: seen.concat(next) }
    seen.push(next)
    cur = next
  }
  return { tooLong: true, chain: seen }
}

// --- the set of URLs the site actually publishes -----------------------------
function walk (dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.vuepress' || entry.name === 'node_modules') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

const livePages = new Set()
for (const file of walk(path.join(ROOT, 'docs'), [])) {
  const rel = path.relative(path.join(ROOT, 'docs'), file).split(path.sep).join('/')
  if (rel === 'index.md') { livePages.add('/'); livePages.add('/index.html'); continue }
  if (rel.endsWith('/README.md')) livePages.add('/' + rel.slice(0, -('README.md'.length)))
  else livePages.add('/' + rel.slice(0, -3) + '.html')
}
// the legacy gitbook is built separately and is a valid redirect destination
const isLegacy = (p) => p.indexOf('/legacy/') === 0

function exists (p) {
  if (livePages.has(p)) return true
  if (isLegacy(p)) return true // built by the `build-legacy` CI job, not from docs/
  // a directory URL may also be spelled with an explicit index.html
  if (p.endsWith('/index.html') && livePages.has(p.slice(0, -('index.html'.length)))) return true
  return false
}

// --- extract the rule tables -------------------------------------------------
function table (name) {
  const m = src.match(new RegExp('var ' + name + ' = \\[([\\s\\S]*?)\\n\\]'))
  if (!m) throw new Error('could not find rule table ' + name)
  return [...m[1].matchAll(/\["([^"]+)","([^"]+)"\]/g)].map((x) => [x[1], x[2]])
}
const X = table('X')
const P = table('P')
const SVC = src.match(/var SVC = "([^"]+)"/)[1].split(' ')
const allPrefix = P.concat(SVC.map((s) => ['/technical/' + s + '/', '/technical/technical/' + s + '/']))

console.log('Testing %s -- %d exact, %d prefix rules', path.relative(ROOT, FN), X.length, allPrefix.length)

// --- 1. size -----------------------------------------------------------------
const bytes = Buffer.byteLength(src)
check(bytes <= MAX_BYTES, 'source exceeds the CloudFront Function limit',
  bytes + ' bytes > ' + MAX_BYTES)
check(bytes <= BUDGET, 'source is over the ' + BUDGET + '-byte budget (limit is ' + MAX_BYTES + ')',
  bytes + ' bytes -- compact the rule table before adding more')
console.log('  size    %d bytes (%d free before the %d limit)', bytes, MAX_BYTES - bytes, MAX_BYTES)

// --- 2. duplicate keys -------------------------------------------------------
const seenFrom = new Set()
for (const [from] of X) {
  check(!seenFrom.has(from), 'duplicate exact rule, the later one is dead', from)
  seenFrom.add(from)
}
const seenPrefix = new Set()
for (const [from] of allPrefix) {
  check(!seenPrefix.has(from), 'duplicate prefix rule', from)
  seenPrefix.add(from)
}

// --- 3 & 4. every rule terminates on something real --------------------------
function assertResolves (probe, label) {
  const r = follow(probe)
  check(!r.loop, 'redirect loop', r.chain && r.chain.join(' -> '))
  check(!r.tooLong, 'redirect chain longer than ' + MAX_HOPS + ' hops', r.chain && r.chain.join(' -> '))
  if (r.loop || r.tooLong || r.external) return
  check(exists(r.dest), 'rule target does not exist', label + '  (resolved to ' + r.dest + ')')
}

for (const [from, to] of X) assertResolves(from, from + ' -> ' + to)

// A prefix rule is only meaningful for the pages beneath it, and some targets are
// asset directories with no index page. Probe each one with a real page under its
// target, mapped back through the rule, so we assert the round trip.
let unprobed = 0
for (const [from, to] of allPrefix) {
  // prefer a child page, but the directory index itself is a valid probe too
  const under = [...livePages].filter((p) => p.indexOf(to) === 0)
  const sample = under.find((p) => p !== to) || under[0]
  if (!sample) {
    if (!isLegacy(to)) unprobed++
    continue // nothing published under this target (assets only, or built elsewhere)
  }
  const stale = from + sample.slice(to.length)
  const r = follow(stale)
  check(!r.loop, 'redirect loop', r.chain && r.chain.join(' -> '))
  check(!r.tooLong, 'redirect chain longer than ' + MAX_HOPS + ' hops', r.chain && r.chain.join(' -> '))
  if (r.loop || r.tooLong) continue
  check(r.dest === sample, 'prefix rule does not round-trip',
    from + ' -> ' + to + '\n        ' + stale + ' resolved to ' + r.dest + ', expected ' + sample)
}
if (unprobed) console.log('  note    %d prefix rule(s) cover assets only, not probed', unprobed)

// --- 5. live pages are never redirected --------------------------------------
let redirectedLive = 0
for (const p of livePages) {
  if (redirect(p) !== null) {
    redirectedLive++
    check(false, 'a live page is being redirected away', p + ' -> ' + redirect(p))
  }
}
if (!redirectedLive) console.log('  live    %d published URLs, none redirected', livePages.size)

// --- 5b. named cases for the hazards this table is designed around -----------
// null means "must pass through untouched"
const CASES = [
  // the Nov-2024 restructure
  ['/api/', '/technical/api/'],
  ['/api', '/technical/api/'],
  ['/api/fspiop/scheme-rules.html', '/technical/api/fspiop/scheme-rules.html'],
  ['/technical/central-ledger/', '/technical/technical/central-ledger/'],
  ['/technical/account-lookup-service/', '/technical/technical/account-lookup-service/'],
  // legacy rules that used to point into the stale /api tree
  ['/mojaloop-specification/', '/technical/api/'],
  ['/documentation/api/central-ledger-api-specification.html', '/technical/api/administration/'],
  // the collapsed /documentation -> /legacy prefix families
  ['/documentation/deployment-guide/releases.html', '/legacy/deployment-guide/releases.html'],
  ['/documentation/', '/'],
  // must NOT redirect: these are the live pages the prefix rules could have eaten
  ['/technical/api/', null],
  ['/technical/api/fspiop/scheme-rules.html', null],
  ['/technical/technical/central-ledger/', null],
  ['/technical/reference-architecture/', null],
  ['/product/features/Iso20022/v1.0/MarketPracticeDocument.html', null],
  ['/legacy/glossary.html', null],
  // PR previews keep working, and stay inside their own prefix
  ['/pr/123/api/', '/pr/123/technical/api/'],
  ['/pr/123/technical/central-ledger/', '/pr/123/technical/technical/central-ledger/'],
  ['/pr/123/documentation/', '/pr/123/'],
  // external targets are never given a preview prefix
  ['/pr/123/mojaloop-specification/ccb-meetings/',
    'https://github.com/mojaloop/mojaloop-specification/tree/master/ccb-meetings'],
  // intentionally removed pages must fall through to the 404 page
  ['/quickstarts/one.html', null],
  ['/product/features/invariants2.html', null],
  ['/technical/technical/deployment-guide/upgrade-commands.html', null]
]
for (const [uri, want] of CASES) {
  const got = redirect(uri)
  check(got === want, 'unexpected redirect for ' + uri,
    'got ' + JSON.stringify(got) + ', expected ' + JSON.stringify(want))
}
console.log('  cases   %d named behaviour cases', CASES.length)

// --- 6. moved or deleted pages need a rule -----------------------------------
let allow = []
if (fs.existsSync(ALLOWLIST)) {
  allow = fs.readFileSync(ALLOWLIST, 'utf8').split('\n')
    .map((l) => l.replace(/#.*/, '').trim()).filter(Boolean)
}

function urlFor (rel) {
  const p = rel.replace(/^docs\//, '')
  if (p === 'index.md') return '/'
  if (p.endsWith('/README.md')) return '/' + p.slice(0, -('README.md'.length))
  return '/' + p.slice(0, -3) + '.html'
}

let diff = null
try {
  const base = execSync('git merge-base HEAD origin/master 2>/dev/null', { cwd: ROOT })
    .toString().trim()
  diff = execSync('git diff --name-status -M ' + base + ' HEAD -- docs/', { cwd: ROOT }).toString()
} catch (e) {
  console.log('  moved   skipped (no origin/master to diff against)')
}

if (diff !== null) {
  let checked = 0
  for (const line of diff.split('\n').filter(Boolean)) {
    const parts = line.split('\t')
    const status = parts[0][0]
    if (status !== 'D' && status !== 'R') continue
    const old = parts[1]
    if (!old.endsWith('.md') || old.includes('/.vuepress/')) continue
    const url = urlFor(old)
    if (allow.indexOf(url) !== -1) continue
    checked++
    const r = follow(url)
    check(!r.loop && !r.tooLong && (r.external || exists(r.dest)),
      'page removed or renamed with no redirect rule',
      old + '  (' + url + ')\n        add a rule to ' +
      path.relative(ROOT, FN) + ', or list the URL in ' + path.relative(ROOT, ALLOWLIST))
  }
  console.log('  moved   %d removed/renamed page(s) in this branch checked', checked)
}

// --- report ------------------------------------------------------------------
if (failures) {
  console.error('\n%d check(s) failed', failures)
  process.exit(1)
}
console.log('\nAll redirect checks passed.')
