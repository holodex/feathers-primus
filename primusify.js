var staticModule = require('static-module');
var Primus = require('primus')
var Url = require('url')
var http = require('http')

module.exports = primusify

function primusify (file, opts) {
  return staticModule({
    'feathers-primus': function (options) {
      var mockServer = http.createServer()
      return [
        'function feathersPrimus () {',
          'var module = undefined',
          'var feathers = require("feathers-client")',
          ';' + Primus(mockServer, options).library(),
          'var primus = new this.Primus("' + Url.format(options) + '")',
          'return feathers.primus(primus)',
        '}'
      ].join('\n')
    }
  })
}

if (!module.parent) {
  process.stdin.pipe(primusify()).pipe(process.stdout)
}
