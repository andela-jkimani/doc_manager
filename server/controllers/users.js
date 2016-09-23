var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../models/users');
var bcrypt = require('bcrypt');


module.exports = {
  signup: function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.name = { firstName: req.body.firstName, lastName: req.body.lastName };
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(409).send({ message: 'User already exists' });
        } else {
          res.status(500).send(err);
        }
      } else {
        res.status(200).send({ message: 'User created' });
      }
    });
  },

  authenticate: function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          res.json({ success: false, message: 'Token authentication failed' });
        } else {
          res.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
  },

  login: function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) {
        res.send(err);
      } else if (!user) {
        res.send({ success: false, message: 'User not found' });
      } else {
        bcrypt.compare(req.body.password, user.password, function() {
          if (err) {
            res.send(err);
          } else if (!user.password) {
            res.send({ success: false, message: 'Incorrect password' });
          } else {
            var token = jwt.sign(user, config.secret, {
              expiresIn: 1440 // 24 hours
            });
            res.json({
              success: true,
              message: 'Successfully authenticated!',
              token: token
            });
          }
        });
      }
    });
  },

  getAll: function(req, res) {
    User.find(function(err, users) {
      if (err) return err;
      return res.json(users);
    });
  },

  getByLimit: function(req, res) {
    User.find()
    .limit(req.params.limit)
    // .sort('createdAt': -1)
    .exec(function(err, users) {
      if (err) res.send(err);
      return res.json(users);
    });
  },

  getOne: function(req, res) {
    User.findById({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.send(err);
      } else if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User was not found' });
      }
    });
  },

  update: function(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id },
      { $set: req.body }, function(err, user) {
        user.save(function() {
          if (err) {
            res.send(err);
          } else if (user) {
            res.status(200).send({ success: true, message: 'User successfully updated' });
          } else {
            res.status(404).send({ success: false, message: 'User not found' });
          }
        });
      });
  },

  delete: function(req, res, next) {
    User.findByIdAndRemove(req.body.id, req.body, function(err, user) {
      if (err) return next(err);
      return res.json(user);
    });
  },

  logout: function(req, res) {
    delete req.decoded;
    if (req.decoded) {
      res.status(500).send({ success: false, message: 'Could not log out' });
    } else {
      return res.status(200).send({ success: true, message: 'Successfully logged out' });
    }
  }
};
