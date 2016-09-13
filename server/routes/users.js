var express = require('express');
var app = express();
var User = require('../controllers/users');

// Logs a user in
app.post('/users/login', User.login);

// Logs a user out
app.post('users/logout');

app.route('/users')
  // Find matching instances of user.
  .get(User.allUsers)
  // Creates a new user
  .post(User.signup);

app.route('/users/:id')
  // Finds user
  .get()
  // Update user attribute
  .put()
  // Delete a user
  .delete();

app.route('/documents')
  // Finding matching instances of a document
  .get()
  // Creates a new document instance
  .post();

app.route('/documents/:id')
  // Find document
  .get()
  // Update document attribute
  .put()
  // Delete a document
  .delete();

// Find all documents belonging to a user
app.get('/users/:id/documents');
