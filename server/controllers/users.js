var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../models/users');


module.exports = {
  login: function(req, res) {
    // find the users
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. No user found' });
      } else if (user) {
        // check if password matches
        if (user.password !== res.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password' });
        } else {
          // if user is found and password is correct create a token
          var token = jwt.sign(user, config.secret, {
            expiresInMinutes: 1440
          });
        // return the information incuding the token
          res.json({
            success: true,
            message: 'Authentication passed.',
            token
          });
        }
      }
    });
  },

  signup: function(req, res) {
    var user = new User();

    user.id = req.body.id;
    user.username = req.body.username;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    });
  },

  getAll: function(req, res, next) {
    User.find(function(err, users) {
      if (err) return next(err);
      return res.json(users);
    });
  },

  delete: function(req, res, next) {
    User.findByIdAndRemove(req.body.id, req.body, function(err, user) {
      if (err) return next(err);
      return res.json(user);
    });
  },

  getOne: function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.status(404).send({ message: 'user was not found' });
      } else {
        res.send(user);
      }
    });
  },

  authenticate: function(req, res, next) {
    // get the token from body, query or token.
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          res.send(err);
        } else {
          // store the decoded token  info in a request object. To be used in subsequent requests.
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'no token provided, login to get a token.' });
    }
  }
};
