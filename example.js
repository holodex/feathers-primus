var feathers = require('feathers')
var primus = require('feathers-primus')

var app = feathers()
  .configure(primus({
    pathname: '/primus'
  }))

global.app = app
