var staticModule = require('static-module');
var Primus = require('primus')
var http = require('http')

module.exports = primusify

function primusify (file, opts) {
  return staticModule({
    'primus': function (url, options) {
      var mockServer = http.createServer()
      return [
        '(function browserPrimus () {',
          'var module, exports',
          ';' + Primus(mockServer, options).library() + ';',
          'var url = \'' + url + '\'',
          'var options = JSON.parse(\'' + JSON.stringify(options) + '\')',
          'return this.Primus(url, options)',
        '})();'
      ].join('\n')
    }
  })
}

if (!module.parent) {
  process.stdin.pipe(primusify()).pipe(process.stdout)
}
