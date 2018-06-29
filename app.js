'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var auth = require("./api/helpers/auth");

module.exports = app;

var options = {
  Auth: auth.verifyToken
};
 
var config = {
  appRoot: __dirname, 
  swaggerSecurityHandlers: options
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  
  if (err) { throw err; }
  
  swaggerExpress.register(app);
  var port = process.env.PORT || 10010;
  console.log('app started on port:' + port);
  app.listen(port);


});