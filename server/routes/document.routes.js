var express = require('express');
var app = express();
var Document = require('../controllers/documents');

app.route('/documents/')
  .get(Document.getAll)
  .post(Document.create);

app.route('/documents/:id')
  .get(Document.getOne)
  .put(Document.update)
  .delete(Document.delete);

app.post('/document/delete', Document.delete);
