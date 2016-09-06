(function() {
  'use strict';
  var mongoose = require('mongoose');

  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: Boolean,
  });

  module.exports = mongoose.model('User', userSchema);
})();
