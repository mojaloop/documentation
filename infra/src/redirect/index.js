// a list of from, to redirects
var redirectMapping = require('./redirects')

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