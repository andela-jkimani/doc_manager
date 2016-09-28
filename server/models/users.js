(function() {
  'use strict';
  var mongoose = require('mongoose');
  var bcrypt = require('bcrypt');
  // var Role = requiem2re('./roles');

  var Schema = mongoose.Schema;

  var userSchema = new Schema({
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
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user']
    }
  });

  userSchema.pre('save', function(done) {
    this.password = bcrypt.hashSync(this.password, 10);
    done();
  });

  module.exports = mongoose.model('User', userSchema);
})();
