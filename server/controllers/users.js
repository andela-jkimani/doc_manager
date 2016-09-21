var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../models/users');


module.exports = {
  logIn: function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'User not found' });
      } else if (user) {
        if (user.password !== req.body.password) {
          res.json({ success: false, message: 'Incorrect password' });
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
      }
    });
  },


  signup: function(req, res) {
    var user = new User();

    user.username = req.body.username;
    user.name = { firstName: req.body.firstName, lastName: req.body.lastName };
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(409).send({ message: 'Duplicate' });
        } else {
          res.status(500).send(err);
        }
      } else {
        return res.status(200).send({ message: 'User created' });
      }
    });
  },

  getAll: function(req, res, next) {
    User.find(function(err, users) {
      if (err) return next(err);
      return res.json(users);
    });
    console.log(req);
  },

  getOne: function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
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
      { $set: { username: req.body.username } }, function(err, user) {
        user.save(function() {
          if (err) {
            res.send(err);
          } else if (user) {
            res.status(200).send({ success: true, message: 'User successfully updated', user });
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
  }
};
