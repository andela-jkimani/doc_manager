(function() {
  'use strict';
  var mongoose = require('mongoose');
  var User = require('./users');

  var Schema = mongoose.Schema;

  // defining the role schema
  var documentSchema = new Schema({
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      trim: true,
      unique: true
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
      type: String,
      required: true,
      default: Date.now()
    },
    modifiedAt: Date
  });

  module.exports = mongoose.model('Document', documentSchema);
})();
