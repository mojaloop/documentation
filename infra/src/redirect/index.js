// Redirects for docs.mojaloop.io. CloudFront Function, viewer-request, cloudfront-js-1.0.
//
// HARD LIMIT: CloudFront Function source must be <= 10240 bytes. Keep this file terse.
// This file IS the source of truth -- there is no generator. Edit it directly.
//
// Paths are matched with any /pr/<n> preview prefix stripped, then re-applied to the
// Location, so redirects work identically on the site and in PR previews.
//   X = exact match, checked first, first match wins.
//   P = prefix match, longest match wins, the remaining path is carried across.
// A P rule never fires on a path already under its own target, which makes
// self-nesting rules (e.g. Iso20022 -> Iso20022/v1.0) loop-safe.
//
// Moving or deleting a page? Add a rule here, or list it in no-redirect.txt.
// Verify before pushing -- `node scripts/_test_redirects.js` -- because the CircleCI
// `infra` job applies terraform on EVERY branch, straight to production.
var S = 302 // flip to 301 once a new batch of rules has been verified in production

var X = [
  ["/mojaloop-specification/","/technical/api/"],
  ["/mojaloop-specification/fspiop-api/documents/Logical-Data-Model.html","/technical/api/fspiop/logical-data-model.html"],
  ["/mojaloop-specification/fspiop-api/documents/Generic-Transaction-Patterns.html","/technical/api/fspiop/generic-transaction-patterns.html"],
  ["/mojaloop-specification/fspiop-api/documents/Use-Cases.html","/technical/api/fspiop/use-cases.html"],
  ["/mojaloop-specification/admin-api/admin-api-specification-v1.0.html","/technical/api/administration/"],
  ["/mojaloop-specification/fspiop-api/documents/Scheme-Rules.html","/technical/api/fspiop/scheme-rules.html"],
  ["/mojaloop-specification/fspiop-api/documents/JSON-Binding-Rules.html","/technical/api/fspiop/json-binding-rules.html"],
  ["/mojaloop-specification/fspiop-api/documents/PKI-Best-Practices.html","/technical/api/fspiop/pki-best-practices.html"],
  ["/mojaloop-specification/fspiop-api/documents/Signature_v1.1.html","/technical/api/fspiop/v1.1/signature.html"],
  ["/mojaloop-specification/fspiop-api/documents/Encryption_v1.1.html","/technical/api/fspiop/v1.1/encryption.html"],
  ["/mojaloop-specification/ccb-meetings/","https://github.com/mojaloop/mojaloop-specification/tree/master/ccb-meetings"],
  ["/mojaloop-specification/ccb-meetings/Issue-and-Decision-Log.html","https://github.com/mojaloop/mojaloop-specification/issues"],
  ["/documentation/","/"],
  ["/documentation/contributors-guide/","/community/contributing/contributors-guide.html"],
  ["/documentation/contributors-guide/new-contributor-checklist.html","/community/contributing/new-contributor-checklist.html"],
  ["/documentation/contributors-guide/code-of-conduct.html","/community/contributing/code-of-conduct.html"],
  ["/documentation/contributors-guide/signing-the-cla.html","/community/contributing/signing-the-cla.html"],
  ["/documentation/contributors-guide/frequently-asked-questions.html","/getting-started/faqs.html"],
  ["/documentation/contributors-guide/standards/","/community/standards/guide.html"],
  ["/documentation/contributors-guide/tools-and-technologies/","/community/tools/tools-and-technologies.html"],
  ["/documentation/contributors-guide/documentation/api-documentation.html","/community/documentation/api-documentation.html"],
  ["/documentation/contributors-guide/documentation/documentation-style-guide.html","/community/documentation/style-guide.html"],
  ["/documentation/contributors-guide/documentation/","/community/documentation/standards.html"],
  ["/documentation/contributors-guide/standards/creating-new-features.html","/community/standards/creating-new-features.html"],
  ["/documentation/contributors-guide/standards/triaging-ml-oss-bugs.html","/community/standards/triaging-bugs.html"],
  ["/documentation/contributors-guide/standards/versioning.html","/community/standards/versioning.html"],
  ["/documentation/contributors-guide/tools-and-technologies/automated-testing.html","/community/tools/automated-testing.html"],
  ["/documentation/contributors-guide/tools-and-technologies/code-quality-metrics.html","/community/tools/code-quality-metrics.html"],
  ["/documentation/contributors-guide/tools-and-technologies/pragmatic-rest.html","/community/tools/pragmatic-rest.html"],
  ["/documentation/mojaloop-roadmap.html","/community/mojaloop-roadmap.html"],
  ["/documentation/mojaloop-publications.html","/community/mojaloop-publications.html"],
  ["/documentation/discussions/readme.html","/community/archive/discussion-docs/"],
  ["/documentation/discussions/ISO_Integration.html","/community/archive/discussion-docs/"],
  ["/documentation/discussions/decimal.html","/community/archive/discussion-docs/"],
  ["/documentation/discussions/workbench.html","/community/archive/discussion-docs/"],
  ["/documentation/discussions/cross_border_day_1.html","/community/archive/discussion-docs/"],
  ["/documentation/discussions/cross_border_day_2.html","/community/archive/discussion-docs/"],
  ["/documentation/api/","/technical/api/"],
  ["/documentation/api/central-ledger-api-specification.html","/technical/api/administration/"],
  ["/documentation/api/central-settlements-api-specification.html","/technical/api/settlement/"],
  ["/documentation/api/als-oracle-api-specification.html","/legacy/api/als-oracle-api-specification.html"],
  ["/documentation/glossary.html","/legacy/glossary.html"],
  ["/api","/technical/api/"],
  ["/product/features/deploying.html","/product/features/deployment/deploying.html"],
  ["/product/features/tools.html","/product/features/deployment/tools.html"],
  ["/technical/technical/deployment-guide/releases.html","/technical/technical/releases.html"],
  ["/technical/technical/deployment-guide/dependency-vulnerability-management.html","/technical/technical/security/dependency-vulnerability-management.html"],
  ["/community/test.html","/community/tools/test.html"]
]

var P = [
  ["/documentation/mojaloop-technical-overview/","/legacy/mojaloop-technical-overview/"],
  ["/documentation/quality-security/","/legacy/quality-security/"],
  ["/documentation/deployment-guide/","/legacy/deployment-guide/"],
  ["/documentation/repositories/","/legacy/repositories/"],
  ["/api/","/technical/api/"],
  ["/product/features/Iso20022/","/product/features/Iso20022/v1.0/"]
]

// Nov-2024 restructure (1eb38014): /technical/<svc>/ moved to /technical/technical/<svc>/
var SVC = "account-lookup-service assets central-bulk-transfers central-event-processor central-ledger deployment-guide event-framework event-stream-processor fraud-services ml-testing-toolkit overview quoting-service sdk-scheme-adapter transaction-requests-service".split(" ")
for (var n = 0; n < SVC.length; n++) {
  P.push(["/technical/" + SVC[n] + "/", "/technical/technical/" + SVC[n] + "/"])
}

function handler(event) {
  var req = event.request
  var uri = req.uri
  var base = ""
  var i

  // PR previews live under /pr/<n>/ -- strip it so rules anchor at the site root
  if (uri.indexOf("/pr/") === 0) {
    var c = uri.indexOf("/", 4)
    if (c > 0) {
      base = uri.substring(0, c)
      uri = uri.substring(c)
    }
  }

  var to = null
  for (i = 0; i < X.length; i++) {
    if (uri === X[i][0]) {
      to = X[i][1]
      break
    }
  }

  if (to === null) {
    var best = 0
    for (i = 0; i < P.length; i++) {
      var from = P[i][0]
      var dest = P[i][1]
      if (uri.indexOf(dest) === 0) continue // already at the target, never rewrite
      if (uri.indexOf(from) === 0 && from.length > best) {
        best = from.length
        to = dest + uri.substring(from.length)
      }
    }
  }

  if (to !== null) {
    return {
      statusCode: S,
      statusDescription: "Moved",
      headers: { location: { value: to.indexOf("http") === 0 ? to : base + to } }
    }
  }

  // Not redirected: PR preview directory paths still need an explicit index document
  if (base !== "" && uri.charAt(uri.length - 1) === "/") {
    req.uri = base + uri + "index.html"
  }
  return req
}
