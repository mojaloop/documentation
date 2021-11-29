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
  { from: "/mojaloop-specification/ccb-meetings/Issue-and-Decision-Log.html", to: "https://github.com/mojaloop/mojaloop-specification/issues" }
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
