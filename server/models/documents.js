(function() {
  'use strict';
  var mongoose = require('mongoose');
  var User = require('./users');

  var Schema = mongoose.Schema;

  // defining the role schema
  var documentSchema = new Schema({
    ownerId: {
      type: String,
      required: true,
      ref: User.id
    },
    title: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      trim: true
    },
    accessLevel: {
      type: String,
      required: true,
      enum: ['private', 'public'],
      default: 'public'
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    modifiedAt: Date
  });

  module.exports = mongoose.model('Document', documentSchema);
})();
