// oauth-connector.js
// simple JS proxy script that can be included on any web page to forward
//  OAuth2.0 callbacks to api.cloudsponge.com
// when the script loads, it checks the querystring for oauth params like:
//  * code
//  * error
//  * error_code
//  * state
//  if it finds any of these, it will fling the authorization code up to api.cloudsponge.com/auth
//   and redirect the page accordingly

const proxyHost = 'https://api.cloudsponge.com/auth'
const oauthKeys = ['code', 'state', 'error', 'error_code']

// serializes an object into a query-string
const serializeParams = (params) => {
  const results = []
  for (let k in params) {
    results.push(k + '=' + encodeURIComponent(params[k]))
  }
  return results.join('&')
}

// converts the URL string into an object
const parseParams = (url) => {
  var obj = {}
  url.replace(/([^?=&]+)(=([^&]*))?/g, function ($0, $1, $2, $3) {
    return (obj[$1] = decodeURIComponent($3))
  })
  return obj
}

const checkRedirect = (queryString) => {
  // parse the query string
  const queryParams = parseParams(queryString)

  // selects just the OAuth-related params out of the query
  const oauthParams = {}
  let key
  for (key in queryParams) {
    if (
      key == 'code' ||
      key == 'state' ||
      key == 'error' ||
      key == 'error_code'
    ) {
      oauthParams[key] = queryParams[key]
      oauthProxy.redirecting = true
    }
  }

  // checks to see if this page actually the necessary received OAuth params
  // and then flings the state and code up to CloudSponge to do the heavy lifting work
  if (oauthProxy.redirecting) {
    window.location = proxyHost + '?' + serializeParams(oauthParams)
  }
}

const oauthProxy = {
  redirecting: false,
  proxyHost,
  checkRedirect,
}

// as we load, it's time to check the query string and redirect if necessary
checkRedirect(window.location.search)

export default oauthProxy
