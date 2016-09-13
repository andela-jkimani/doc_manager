(function() {
  'use strict';
  var mongoose = require('mongoose');
  var User = require('./users');

  var Schema = mongoose.Schema;

  // defining the role schema
  var documentSchema = new Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    ownerId: {
      type: Number,
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
      default: 'public' },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    modifiedAt: Date
  });

  module.exports = mongoose.model('Document', documentSchema);
})();
