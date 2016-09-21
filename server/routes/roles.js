module.exports = function(app) {
  var Role = require('../controllers/roles');
  var User = require('../controllers/users');

  app.route('/roles')
    .get(User.authenticate, Role.getAll)
    .post(User.authenticate, Role.create);
};
