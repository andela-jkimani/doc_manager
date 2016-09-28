module.exports = function(app) {
  var User = require('../controllers/users');
  var Auth = require('../controllers/middleware');

  app.route('/users')
    .get(User.getAll)
    .post(User.signup);

  app.post('/users/login', User.login);

  // app.use(Auth.authenticate, Auth.authAccess);

  app.route('/users/:id')
    .get(Auth.authenticate, Auth.authAccess, User.getOne)
    .put(Auth.authenticate, Auth.authAccess, User.update)
    .delete(Auth.authenticate, Auth.authAccess, User.delete);

  // app.get('/users/logout', Auth.authenticate, Auth.authAccess, User.logout);
  app.get('/users/limit/:limit', Auth.authenticate, Auth.authAccess,
    User.getByLimit);
};
