(function() {
  'use strict';
  var mongoose = require('mongoose');
  var User = require('./users');

  var Schema = mongoose.Schema;

  // defining the role schema
  var documentSchema = new Schema({
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
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
    accessType: {
      type: String,
      required: true,
      enum: ['private', 'public'],
      default: 'public'
    },
    genre: {
      type: String
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
