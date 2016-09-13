(function() {
  'use strict';
  var mongoose = require('mongoose');
  var bcrypt = require('bcrypt');
  var Role = require('./roles');

  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      }
    },
    email: {
      type: String,
      required: true
      // validate: {
      //   validator: function(v) {
      //     return (/([a-z]*)@([a-z]*)([.])([a-z]*)/g).test(v);
      //   },
      //   message: 'Enter a valid email!'
      // }
    },
    password: {
      type: String,
      required: true
    },
    Role: {
      type: String,
      ref: Role.title
    }
  });

  userSchema.pre('save', function(done) {
    this.password = bcrypt.hashSync(this.password, 10);
    done();
  });

  module.exports = mongoose.model('User', userSchema);
})();
