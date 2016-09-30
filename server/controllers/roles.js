(function() {
  var Role = require('../models/roles');

  module.exports = {
    create: function(req, res) {
      var role = new Role();

      role.title = req.body.title;

      role.save(function(err) {
        if (err) {
          // console.log(err);
          return res.status(409).send(err);
        }
        return res.status(200).send({ success: true, message: 'Role created successfully' });
      });
    },

    getOne: function(req, res) {
      Role.findById({ _id: req.params.id }, function(err, role) {
        if (err) {
          res.send(err);
        } else if (role) {
          res.send(role);
        } else {
          res.send({ success: false, message: 'Role not found' });
        }
      });
    },

    getAll: function(req, res) {
      Role.find(function(err, roles) {
        if (err) res.send(err);
        return res.send(roles);
      });
    },

    update: function(req, res) {
      Role.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, function(err, user) {
        user.save(function() {
          if (err) {
            res.send(err);
          } else if (user) {
            res.status(200).send({ success: true, message: 'Role successfully updated' });
          } else {
            res.status(404).send({ success: false, message: 'Role not found' });
          }
        });
      });
    },

    delete: function(req, res) {
      Role.findByIdAndRemove({ _id: req.params.id }, function(err) {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send({ success: true, message: 'Role deleted successfully' });
        }
      });
    }
  };
})();
