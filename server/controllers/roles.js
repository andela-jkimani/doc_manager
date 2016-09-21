(function() {
  var Role = require('../models/roles');

  module.exports = {
    create: function(req, res) {
      var role = new Role();

      role.title = req.body.title;

      role.save(function(err) {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        }
        return res.status(200).send({ success: true, message: 'Role created successfully' });
      });
    },

    getAll: function(req, res) {
      Role.findById({ _id: req.params.id }, function(err, role) {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(role);
        }
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
