var test = require('tape')
var Primus = require('primus')

var primus

test('setup primus client', function (t) {
  primus = Primus('http://localhost:8866', {})

  t.ok(primus, 'primus exists')
  t.equal(typeof primus.write, 'function', 'primus.write is a function')
  t.end()
})

test('ping pong', function (t) {
  t.end()
})
