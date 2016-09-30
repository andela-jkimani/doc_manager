var mongoose = require('mongoose');
var documentData = require('./data/documents');
var userData = require('./data/users');
var roleData = require('./data/roles');
var User = require('../models/users');
var Document = require('../models/documents');
var Role = require('../models/roles');
var config = require('../../config');

mongoose.connect(config.database.test, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.db.dropDatabase(function() {
      console.log('Database dropped');
    });
  }
});

mongoose.connection.on('connected', function(err) {
  if (err) {
    console.log(err);
  } else {
    Document.create(documentData, function() {
      if (err) {
        console.log('error: ', err);
      } else {
        console.log('Documents created successfully');
      }
    });

    Role.create(roleData, function() {
      if (err) {
        console.log('error: ', err);
      } else {
        console.log('Roles created successfully');
      }
    });

    User.create(userData, function(err, users) {
      if (err) {
        console.log('error: ', err);
      } else {
        console.log('Users created successfully');
      }
      process.exit();
    });

    // mongoose.connection.db.close(true, function() {
    //   console.log('Database seeded');
    // });
  }
});
