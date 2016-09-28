(function() {
  'use strict';
  var mongoose = require('mongoose');

  var Schema = mongoose.Schema;

  var roleSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      enum: ['admin', 'user']
    }
  });

  module.exports = mongoose.model('Role', roleSchema);
})();
