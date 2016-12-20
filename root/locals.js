/* eslint-env node */
const process = require('process')

let locals = {
  typekitID: '',
  analyticsToken: '',
  URL: process.env.URL || '',
  S3URL: '',
  appID: '',
  title: '',
  shareTitle: '',
  description: '',
  twitter: {
    body: ''
  },
  pretty: true
}

locals.twitter.body = encodeURIComponent(locals.twitter.body)

module.exports = locals
