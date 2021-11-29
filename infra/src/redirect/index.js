// a list of from, to redirects
// Regenerate this list by modifying `link_list.txt`
// and running `_generate_js_list.sh`
var redirectMapping = [
  // For example:
  {
    // an existing url on the docs 1.0 site
    from: '/documentation/contributors-guide/frequently-asked-questions.html',
    // the new destination url to use - where this page has been moved to
    to: '/getting-started/general-faqs.html'
  },
    { from: "/mojaloop-specification/", to: "/api/" },
    { from: "/mojaloop-specification/fspiop-api/documents/Logical-Data-Model.html", to: "/api/fspiop/logical-data-model.html" },
    { from: "/mojaloop-specification/fspiop-api/documents/Generic-Transaction-Patterns.html", to: "/api/fspiop/generic-transaction-patterns.html" },
    { from: "/mojaloop-specification/fspiop-api/documents/Use-Cases.html", to: "/api/fspiop/use-cases.html" },
    { from: "/mojaloop-specification/admin-api/admin-api-specification-v1.0.html", to: "/api/administration/" },
    { from: "/mojaloop-specification/fspiop-api/documents/Scheme-Rules.html", to: "/api/fspiop/scheme-rules.html" },
    { from: "/mojaloop-specification/fspiop-api/documents/JSON-Binding-Rules.html", to: "/api/fspiop/json-binding-rules.html" },
    { from: "/mojaloop-specification/fspiop-api/documents/PKI-Best-Practices.html", to: "/api/fspiop/pki-best-practices.html" },
    { from: "/mojaloop-specification/fspiop-api/documents/Signature_v1.1.html", to: "/api/fspiop/v1.1/signature.html" },
    { from: "/mojaloop-specification/fspiop-api/documents/Encryption_v1.1.html", to: "/api/fspiop/v1.1/encryption.html" },
    { from: "/mojaloop-specification/ccb-meetings/", to: "https://github.com/mojaloop/mojaloop-specification/tree/master/ccb-meetings" },
    { from: "/mojaloop-specification/ccb-meetings/Issue-and-Decision-Log.html", to: "https://github.com/mojaloop/mojaloop-specification/issues" },
    { from: "/documentation/", to: "/" },
    { from: "/documentation/deployment-guide/", to: "/legacy/deployment-guide/" },
    { from: "/documentation/deployment-guide/releases.html", to: "/legacy/deployment-guide/releases.html" },
    { from: "/documentation/deployment-guide/local-setup-linux.html", to: "/legacy/deployment-guide/local-setup-linux.html" },
    { from: "/documentation/deployment-guide/local-setup-mac.html", to: "/legacy/deployment-guide/local-setup-mac.html" },
    { from: "/documentation/deployment-guide/local-setup-windows.html", to: "/legacy/deployment-guide/local-setup-windows.html" },
    { from: "/documentation/deployment-guide/deployment-troubleshooting.html", to: "/legacy/deployment-guide/deployment-troubleshooting.html" },
    { from: "/documentation/deployment-guide/upgrade-strategy-guide.html", to: "/legacy/deployment-guide/upgrade-strategy-guide.html" },
    { from: "/documentation/deployment-guide/helm-legacy-migration.html", to: "/legacy/deployment-guide/helm-legacy-migration.html" },
    { from: "/documentation/deployment-guide/helm-legacy-deployment.html", to: "/legacy/deployment-guide/helm-legacy-deployment.html" },
    { from: "/documentation/contributors-guide/", to: "/community/contributing/contributors-guide.html" },
    { from: "/documentation/contributors-guide/new-contributor-checklist.html", to: "/community/contributing/new-contributor-checklist.html" },
    { from: "/documentation/contributors-guide/code-of-conduct.html", to: "/community/contributing/code-of-conduct.html" },
    { from: "/documentation/contributors-guide/signing-the-cla.html", to: "/community/contributing/signing-the-cla.html" },
    { from: "/documentation/contributors-guide/frequently-asked-questions.html", to: "/getting-started/faqs.html" },
    { from: "/documentation/contributors-guide/standards/", to: "/community/standards/guide.html" },
    { from: "/documentation/contributors-guide/tools-and-technologies/", to: "/community/tools/tools-and-technologies.html" },
    { from: "/documentation/contributors-guide/documentation/api-documentation.html", to: "/community/documentation/api-documentation.html" },
    { from: "/documentation/contributors-guide/documentation/documentation-style-guide.html", to: "/community/documentation/style-guide.html" },
    { from: "/documentation/mojaloop-roadmap.html", to: "/community/mojaloop-roadmap.html" },
    { from: "/documentation/mojaloop-publications.html", to: "/community/mojaloop-publications.html" },
    { from: "/documentation/discussions/readme.html", to: "/community/archive/discussion-docs/" },
    { from: "/documentation/discussions/ISO_Integration.html", to: "/community/archive/discussion-docs/" },
    { from: "/documentation/discussions/decimal.html", to: "/community/archive/discussion-docs/" },
    { from: "/documentation/discussions/workbench.html", to: "/community/archive/discussion-docs/" },
    { from: "/documentation/discussions/cross_border_day_1.html", to: "/community/archive/discussion-docs/" },
    { from: "/documentation/discussions/cross_border_day_2.html", to: "/community/archive/discussion-docs/" },
    { from: "/documentation/quality-security/readme.html", to: "/legacy/quality-security/readme.html" },
    { from: "/documentation/quality-security/program-management/readme.html", to: "/legacy/quality-security/program-management/readme.html" },
    { from: "/documentation/quality-security/program-management/vulnerability-disclosure-procedure.html", to: "/legacy/quality-security/program-management/vulnerability-disclosure-procedure.html" },
    { from: "/documentation/quality-security/program-management/scheme-rules-guidelines.html", to: "/legacy/quality-security/program-management/scheme-rules-guidelines.html" },
    { from: "/documentation/quality-security/standards-guidelines/readme.html", to: "/legacy/quality-security/standards-guidelines/readme.html" },
    { from: "/documentation/quality-security/reference-implementation.html", to: "/legacy/quality-security/reference-implementation.html" },
    { from: "/documentation/api/", to: "/api/" },
    { from: "/documentation/api/central-ledger-api-specification.html", to: "/api/administration/" },
    { from: "/documentation/api/central-settlements-api-specification.html", to: "/api/settlement/" },
    { from: "/documentation/api/als-oracle-api-specification.html", to: "/legacy/api/als-oracle-api-specification.html" },
    { from: "/documentation/mojaloop-technical-overview/", to: "/legacy/mojaloop-technical-overview/" },
    { from: "/documentation/mojaloop-technical-overview/overview/", to: "/legacy/mojaloop-technical-overview/overview/" },
    { from: "/documentation/mojaloop-technical-overview/overview/components-PI14.html", to: "/legacy/mojaloop-technical-overview/overview/components-PI14.html" },
    { from: "/documentation/mojaloop-technical-overview/account-lookup-service/", to: "/legacy/mojaloop-technical-overview/account-lookup-service/" },
    { from: "/documentation/mojaloop-technical-overview/quoting-service/", to: "/legacy/mojaloop-technical-overview/quoting-service/" },
    { from: "/documentation/mojaloop-technical-overview/central-ledger/", to: "/legacy/mojaloop-technical-overview/central-ledger/" },
    { from: "/documentation/mojaloop-technical-overview/central-ledger/admin-operations/", to: "/legacy/mojaloop-technical-overview/central-ledger/admin-operations/" },
    { from: "/documentation/mojaloop-technical-overview/central-ledger/transfers/", to: "/legacy/mojaloop-technical-overview/central-ledger/transfers/" },
    { from: "/documentation/mojaloop-technical-overview/central-bulk-transfers/", to: "/legacy/mojaloop-technical-overview/central-bulk-transfers/" },
    { from: "/documentation/mojaloop-technical-overview/central-settlements/", to: "/legacy/mojaloop-technical-overview/central-settlements/" },
    { from: "/documentation/mojaloop-technical-overview/central-settlements/settlement-process/", to: "/legacy/mojaloop-technical-overview/central-settlements/settlement-process/" },
    { from: "/documentation/mojaloop-technical-overview/central-settlements/funds-in-out/", to: "/legacy/mojaloop-technical-overview/central-settlements/funds-in-out/" },
    { from: "/documentation/mojaloop-technical-overview/transaction-requests-service/", to: "/legacy/mojaloop-technical-overview/transaction-requests-service/" },
    { from: "/documentation/mojaloop-technical-overview/central-event-processor/", to: "/legacy/mojaloop-technical-overview/central-event-processor/" },
    { from: "/documentation/mojaloop-technical-overview/event-framework/", to: "/legacy/mojaloop-technical-overview/event-framework/" },
    { from: "/documentation/mojaloop-technical-overview/event-stream-processor/", to: "/legacy/mojaloop-technical-overview/event-stream-processor/" },
    { from: "/documentation/mojaloop-technical-overview/fraud-services/", to: "/legacy/mojaloop-technical-overview/fraud-services/" },
    { from: "/documentation/mojaloop-technical-overview/fraud-services/related-documents/documentation.html", to: "/legacy/mojaloop-technical-overview/fraud-services/related-documents/documentation.html" },
    { from: "/documentation/mojaloop-technical-overview/sdk-scheme-adapter/", to: "/legacy/mojaloop-technical-overview/sdk-scheme-adapter/" },
    { from: "/documentation/mojaloop-technical-overview/ml-testing-toolkit/", to: "/legacy/mojaloop-technical-overview/ml-testing-toolkit/" },
    { from: "/documentation/repositories/", to: "/legacy/repositories/" },
    { from: "/documentation/glossary.html", to: "/legacy/glossary.html" },
  ]

var redirectMapping = [
  
]

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var response

  redirectMapping.forEach(m => {
    if (uri.endsWith(m.from)) {
      // request.uri = request.uri.replace(m.from, m.to)
      var newurl = uri.replace(m.from, m.to)
      console.log(`redirecting: ${m.from} ----> ${m.to}`)

      response = {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: { "location": { "value": newurl } }
      }
    }
  })
  if (response) {
    return response
  }

  // fallthrough
  return request
}
