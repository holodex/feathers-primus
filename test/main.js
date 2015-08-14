var test = require('tape')
var join = require('path').join
var browserify = require('browserify')
var smokestack = require('smokestack')
var Primus = require('primus')
var tapParser = require('tap-parser')

var port = 8866
var primus

test('start primus server', function (t) {
  primus = Primus.createServer({
    port: port
  })
  t.ok(primus, 'primus exists')
  t.equal(typeof primus.write, 'function', 'primus.write is function')
  t.end()
})

test('run browser tests', function (t) {
  browserify(join(__dirname, '/browser.js'))
    .transform(require('../'))
    .bundle()
    .pipe(smokestack({
      browser: 'chrome',
      port: port + 1,
      saucelabs: false
    }))
    //.pipe(process.stdout)
    .pipe(tapParser(function(results) {
      t.ok(results.ok, 'all browser tests passed')
      t.end()
    }))
})

test('close primus server', function (t) {
  primus.destroy({
    close: true
  }, function (err) {
    t.error(err, 'no error')
    t.end()
  })
})
