module.exports = function(app) {
  var User = require('../controllers/users');

  app.route('/users')
    .get(User.getAll)
    .post(User.signup);

  app.route('/users/:id')
    .get(User.authenticate, User.getOne)
    .delete(User.authenticate, User.delete);

  app.post('/users/logIn', User.logIn);
};
