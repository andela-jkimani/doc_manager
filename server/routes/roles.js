module.exports = function(app) {
  var Role = require('../controllers/roles');
  var Auth = require('../controllers/middleware');

  // app.use(Auth.authenticate, Auth.authAccess);

  app.route('/roles')
    .get(Auth.authenticate, Auth.authAccess, Role.getAll)
    .post(Auth.authenticate, Auth.authAccess, Role.create);

  app.route('/roles/:id')
    .get(Auth.authenticate, Auth.authAccess, Role.getOne)
    .put(Auth.authenticate, Auth.authAccess, Role.update)
    .delete(Auth.authenticate, Auth.authAccess, Role.delete);
};
