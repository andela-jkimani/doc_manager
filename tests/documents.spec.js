'use strict';

var should = require('should');
var mongoose = require('mongoose');
var Document = require('./../server/models/document');

describe('Document model', function() {
  describe('Saving', function() {
    it('saves new document', function(done) {
      var document = new Document({
        id: 1,
        ownerId: 1,
        title: 'First Document',
        content: 'Created this document while writing the first test',
        createdAt: Date.now(),
      });
      document.save(function(err, saved) {
        should.not.exist(err);
        done();
      });
    });
    it('throws error when document is empty');
    it('throws validation error for duplicate document name');
  });
});
