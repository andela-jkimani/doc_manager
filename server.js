var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

// configuration
var port = process.env.PORT || 8080; // used to create, sign and verify tokens

// using bodyParser(middleware) to get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// routes
app.get('/', function(req, res) {
  res.send('Welcome to my API!!');
});

// start the server
app.listen(port, function() {
  console.log('Magic happens at http://localhost:' + port);
});
