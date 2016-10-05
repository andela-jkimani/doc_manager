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
    user.role = req.body.role;
    user.save(function(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(409).send({ message: 'User already exists' });
        } else {
          res.status(500).send(err);
        }
      } else {
        res.status(201).send({ user });
      }
    });
  },

  login: function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.send({ success: false, message: 'User not found' });
      } else {
        bcrypt.compare(req.body.password, user.password, function() {
          if (err) {
            res.send(err);
          } else if (!user.password) {
            res.send({ success: false, message: 'Incorrect password' });
          } else {
            var token = jwt.sign({ id: user.id, username: user.username, role: user.role },
              config.secret, {
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
      if (err) {
        res.status(500).send(err);
      } else if (req.user.role !== 'admin') {
        res.status(403).send({ success: false });
      } else if (req.user.role === 'admin') {
        res.status(200).send(users);
      } else {
        res.send({ succes: false, message: 'Users not found' });
      }
    });
  },

  findByRole: function(req, res) {
    User.find({})
    .limit(Number(req.query.limit))
    .exec(function(err, users) {
      if (err) res.status(500).send(err);
      res.status(200).send(users.filter(function(user) {
        if (user.role.title === req.query.role) {
          return users;
        }
      }));
    });
  },

  getByLimit: function(req, res) {
    User.find()
    .limit(req.params.limit)
    // .sort('createdAt': -1)
    .exec(function(err, users) {
      if (err) res.status(500).send(err);
      return res.status(200).send(users);
    });
  },

  getOne: function(req, res) {
    User.findById({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'User was not found' });
      }
    });
  },

  update: function(req, res) {
    User.findById({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else if (user) {
        if (req.user.role === 'admin') {
          if (req.body.email) { user.email = req.body.email; }
          if (req.body.firstName) { user.firstName = req.body.firstName; }
          if (req.body.lastName) { user.lastName = req.body.lastName; }
          if (req.body.password) { user.password = req.body.password; }
          user.save(function() {
            if (err) res.send(err);
            res.status(200).send({ success: true, message: 'User successfully updated' });
          });
        } else {
          res.status(403).send({ success: false, message: 'Not authorized to update' });
        }
      } else {
        res.status(404).send({ success: false, message: 'User not found' });
      }
    });
  },

  delete: function(req, res) {
    User.findOne({ _id: req.params.id }, function(err) {
      if (err) res.send(err);
      else if (req.user.role !== 'admin') {
        res.status(403).send({ success: false, message: 'Unauthorized' });
      } else {
        User.remove({ _id: req.params.id }, function() {
          if (err) res.status(500).send(err);
          else {
            res.status(200).send({ success: true, message: 'User deleted successfully' });
          }
        });
      }
    });
  }
};
