var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./server/routes');
var morgan = require('morgan');
var config = require('./config');

app.use(morgan('dev'));

mongoose.connect(config.test.database);
mongoose.Promise = global.Promise;
app.set('mySecret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
  console.log('API is at port ', port);
});

module.exports = server;
