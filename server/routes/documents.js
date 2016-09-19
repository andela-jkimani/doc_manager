module.exports = function(app) {
  var Document = require('../controllers/documents');
  var User = require('../controllers/users');

  app.route('/documents')
    .get(User.authenticate, Document.readAll)
    .post(User.authenticate, Document.create);

  app.route('/documents/:id')
    .get(User.authenticate, Document.readOne)
    // .put(User.authenticate, Document.update)
    .delete(User.authenticate, Document.delete);
};
