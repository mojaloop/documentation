// a list of from, to redirects
var redirectMapping = [
  {
    // an existing url on the docs 1.0 site
    from: '/documentation/contributors-guide/frequently-asked-questions.html',
    // the new destination url to use - where this page has been moved to
    to: '/getting-started/general-faqs.html'
  },
  {
    from: '/documentation/contributors-guide/standards/triaging-ml-oss-bugs.html',
    to: '/community/triaging-bugs.html'
  }
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