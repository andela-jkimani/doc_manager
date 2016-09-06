var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign and verify tokens
var config = require('./config'); // get our config file
var User = require('./server/models/users'); // get our mongoose model


// configuration
var port = process.env.PORT || 8080; // used to create, sign and verify tokens
mongoose.Promise = global.Promise;
mongoose.connect(config.database); // connect to database
app.set('mySecret', config.secret); // secret variable

// using bodyParser to get nfo from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// routes
app.get('/', function(req, res) {
  res.send('Ola!! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function(req, res) {
  // creating a user
  var jacky = new User({
    id: 3,
    username: 'maggie',
    name: { first: 'Maggie', last: 'Kimani' },
    email: 'maggie@gmail.com',
    password: 'maggie',
    admin: false,
  });
  // saving the user
  jacky.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// get an instance of the router for api route
var router = express.Router();

// register our API
app.use('/api', router);

// route to authenticate a user
router.post('/authenticate', function(req, res) {
  // find the users
  User.findOne({
    username: req.body.username,
  }), function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. No user found' });
    } else if (user) {
      // check if password matches
      if (user.password !== res.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password' });
      } else {
        // if user is found and password is correct create a token
        var token = jwt.sign(user, app.get('mySecret'), {
          expiresInMinutes: 1440,
        });
      // return he information incuding the token
        res.json({
          success: true,
          message: 'Authentication passed. Enjoy your token',
          token,
        });
      }
    }
  };
});

// route middleware to verify a token
router.use(function(req, res, next) {
  // check header or URL parameters or POST parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-tokens'];
  // decode token
  if (token) {
    // verifies token and checks exp
    jwt.verify(token, app.get('mySecret'), function(err, decoded) {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token' });
      } else {
        // if everything is good, save the request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided',
    });
  }
});

// route to return all users (http://localhost/api/users)
router.get('/users', function(req, res) {
  var query = req.query;
  User.find(query, function(err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
});

// start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
