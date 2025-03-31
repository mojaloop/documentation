function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var host = headers.host.value;
    
    // Extract the subdomain from the host
    var domain = 'docs.mojaloop.io';
    if (host.endsWith(domain) && host !== domain) {
        var subdomain = host.slice(0, -(domain.length + 1)); // +1 for the dot
        
        // Check if this is a PR preview subdomain
        if (subdomain.startsWith('pr-')) {
            var prNumber = subdomain.slice(3); // Remove 'pr-' prefix
            // Rewrite the request to point to the correct PR folder in the preview bucket
            request.uri = '/pr-' + prNumber + request.uri;
        }
    }
    
    return request;
} 