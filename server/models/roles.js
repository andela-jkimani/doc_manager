(function() {
  'use strict';
  var mongoose = require('mongoose');

  var Schema = mongoose.Schema;

  var roleSchema = new Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      unique: true,
      enum: ['Admin', 'Owner', 'Viewer']
    }
  });

  module.exports = mongoose.model('Role', roleSchema);
})();
