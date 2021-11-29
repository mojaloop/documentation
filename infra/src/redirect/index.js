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
  { from: "/documentation/mojaloop-technical-overview/", to: "/legacy/mojaloop-technical-overview/" },
  { from: "/documentation/mojaloop-technical-overview/overview/", to: "/legacy/mojaloop-technical-overview/overview/" },
  { from: "/documentation/mojaloop-technical-overview/overview/components-PI14.html", to: "/legacy/mojaloop-technical-overview/overview/components-PI14.html" },
  { from: "/documentation/mojaloop-technical-overview/overview/components-PI12.html", to: "/legacy/mojaloop-technical-overview/overview/components-PI12.html" },
  { from: "/documentation/mojaloop-technical-overview/account-lookup-service/", to: "/legacy/mojaloop-technical-overview/account-lookup-service/" },
  { from: "/documentation/mojaloop-technical-overview/account-lookup-service/als-get-participants.html", to: "/legacy/mojaloop-technical-overview/account-lookup-service/als-get-participants.html" },
  { from: "/documentation/mojaloop-technical-overview/account-lookup-service/als-post-participants.html", to: "/legacy/mojaloop-technical-overview/account-lookup-service/als-post-participants.html" },
  { from: "/documentation/mojaloop-technical-overview/account-lookup-service/als-post-participants-batch.html", to: "/legacy/mojaloop-technical-overview/account-lookup-service/als-post-participants-batch.html" },
  { from: "/documentation/mojaloop-technical-overview/account-lookup-service/als-del-participants.html", to: "/legacy/mojaloop-technical-overview/account-lookup-service/als-del-participants.html" },
  { from: "/documentation/mojaloop-technical-overview/account-lookup-service/als-get-parties.html", to: "/legacy/mojaloop-technical-overview/account-lookup-service/als-get-parties.html" },
  { from: "/documentation/mojaloop-technical-overview/quoting-service/", to: "/legacy/mojaloop-technical-overview/quoting-service/" },
  { from: "/documentation/mojaloop-technical-overview/quoting-service/qs-get-quotes.html", to: "/legacy/mojaloop-technical-overview/quoting-service/qs-get-quotes.html" },
  { from: "/documentation/mojaloop-technical-overview/quoting-service/qs-post-quotes.html", to: "/legacy/mojaloop-technical-overview/quoting-service/qs-post-quotes.html" },
  { from: "/documentation/mojaloop-technical-overview/quoting-service/qs-get-bulk-quotes.html", to: "/legacy/mojaloop-technical-overview/quoting-service/qs-get-bulk-quotes.html" },
  { from: "/documentation/mojaloop-technical-overview/quoting-service/qs-post-bulk-quotes.html", to: "/legacy/mojaloop-technical-overview/quoting-service/qs-post-bulk-quotes.html" },
  { from: "/documentation/mojaloop-technical-overview/central-ledger/", to: "/legacy/mojaloop-technical-overview/central-ledger/" },
  { from: "/documentation/mojaloop-technical-overview/central-ledger/admin-operations/", to: "/legacy/mojaloop-technical-overview/central-ledger/admin-operations/" },
  { from: "/documentation/mojaloop-technical-overview/central-ledger/transfers/", to: "/legacy/mojaloop-technical-overview/central-ledger/transfers/" },
  { from: "/documentation/mojaloop-technical-overview/central-bulk-transfers/", to: "/legacy/mojaloop-technical-overview/central-bulk-transfers/" },
  { from: "/documentation/mojaloop-technical-overview/central-settlements/", to: "/legacy/mojaloop-technical-overview/central-settlements/" },
  { from: "/documentation/mojaloop-technical-overview/transaction-requests-service/", to: "/legacy/mojaloop-technical-overview/transaction-requests-service/" },
  { from: "/documentation/mojaloop-technical-overview/transaction-requests-service/transaction-requests-post.html", to: "/legacy/mojaloop-technical-overview/transaction-requests-service/transaction-requests-post.html" },
  { from: "/documentation/mojaloop-technical-overview/transaction-requests-service/transaction-requests-get.html", to: "/legacy/mojaloop-technical-overview/transaction-requests-service/transaction-requests-get.html" },
  { from: "/documentation/mojaloop-technical-overview/transaction-requests-service/authorizations.html", to: "/legacy/mojaloop-technical-overview/transaction-requests-service/authorizations.html" },
  { from: "/documentation/mojaloop-technical-overview/central-event-processor/", to: "/legacy/mojaloop-technical-overview/central-event-processor/" },
  { from: "/documentation/mojaloop-technical-overview/central-event-processor/9.1.0-event-handler-placeholder.html", to: "/legacy/mojaloop-technical-overview/central-event-processor/9.1.0-event-handler-placeholder.html" },
  { from: "/documentation/mojaloop-technical-overview/central-event-processor/5.1.1-notification-handler-for-rejections.html", to: "/legacy/mojaloop-technical-overview/central-event-processor/5.1.1-notification-handler-for-rejections.html" },
  { from: "/documentation/mojaloop-technical-overview/central-event-processor/signature-validation.html", to: "/legacy/mojaloop-technical-overview/central-event-processor/signature-validation.html" },
  { from: "/documentation/mojaloop-technical-overview/event-framework/", to: "/legacy/mojaloop-technical-overview/event-framework/" },
  { from: "/documentation/mojaloop-technical-overview/event-stream-processor/", to: "/legacy/mojaloop-technical-overview/event-stream-processor/" },
  { from: "/documentation/mojaloop-technical-overview/fraud-services/", to: "/legacy/mojaloop-technical-overview/fraud-services/" },
  { from: "/documentation/mojaloop-technical-overview/fraud-services/related-documents/documentation.html", to: "/legacy/mojaloop-technical-overview/fraud-services/related-documents/documentation.html" },
  { from: "/documentation/mojaloop-technical-overview/sdk-scheme-adapter/", to: "/legacy/mojaloop-technical-overview/sdk-scheme-adapter/" },
  { from: "/documentation/mojaloop-technical-overview/sdk-scheme-adapter/usage/", to: "/legacy/mojaloop-technical-overview/sdk-scheme-adapter/usage/" },
  { from: "/documentation/mojaloop-technical-overview/sdk-scheme-adapter/usage/scheme-adapter-to-scheme-adapter/", to: "/legacy/mojaloop-technical-overview/sdk-scheme-adapter/usage/scheme-adapter-to-scheme-adapter/" },
  { from: "/documentation/mojaloop-technical-overview/sdk-scheme-adapter/usage/scheme-adapter-and-local-k8s/", to: "/legacy/mojaloop-technical-overview/sdk-scheme-adapter/usage/scheme-adapter-and-local-k8s/" },
  { from: "/documentation/mojaloop-technical-overview/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/", to: "/legacy/mojaloop-technical-overview/sdk-scheme-adapter/usage/scheme-adapter-and-wso2-api-gateway/" },
  { from: "/documentation/mojaloop-technical-overview/ml-testing-toolkit/", to: "/legacy/mojaloop-technical-overview/ml-testing-toolkit/" },
  { from: "/documentation/repositories/", to: "/legacy/repositories/" },
  { from: "/documentation/repositories/helm.html", to: "/legacy/repositories/helm.html" },
  { from: "/documentation/repositories/project.html", to: "/legacy/repositories/project.html" },
  { from: "/documentation/glossary.html", to: "/legacy/glossary.html" }
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
