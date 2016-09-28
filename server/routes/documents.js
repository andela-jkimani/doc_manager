module.exports = function(app) {
  var Document = require('../controllers/documents');
  var Auth = require('../controllers/middleware');

  // app.use(Auth.authenticate, Auth.authAccess);

  app.route('/documents')
    .get(Auth.authenticate, Document.getAll)
    .post(Auth.authenticate, Document.create);

  app.route('/documents/:id')
    .get(Auth.authenticate, Document.getOne)
    .put(Auth.authenticate, Document.update)
    .delete(Auth.authenticate, Document.delete);

  app.get('documents/users/:id', Auth.authenticate, Auth.authAccess, Document.getByUser);
  app.get('/users/:user_id/documents', Document.getByUser);
  // app.get('/search', Document.getByGenre);
};
