(function() {
  var Document = require('../models/documents');
  var jwt = require('jsonwebtoken');

  module.exports = {
    create: function(req, res) {
      var document = new Document();
      var decoded = jwt.decode(req.headers['x-access-token']);

      document.ownerId = decoded.id;
      document.title = req.body.title;
      document.content = req.body.content;
      document.accessLevel = req.body.accessLevel;
      document.createdAt = req.body.createdAt;
      document.modifiedAt = req.body.modifiedAt;

      document.save(function(err) {
        if (err) {
          return res.status(404).send(err);
        }
        return res.status(200).send({ success: true, message: 'Document created!' });
      });
    },

    all: function(req, res) {
      Document.find({})
        .sort({ createdAt: -1 })
        .limit(Number(req.query.limit))
        .exec(function(err, documents) {
          if (err) {
            res.send(err);
          } else {
            res.send(documents);
          }
        });
    },

    getByUser: function(req, res) {
      Document.find({ ownerId: req.params.user_id }, function(err, documents) {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(documents);
        }
      });
    },

    getByGenre: function(req, res) {
      Document.find({ genre: req.params.genre }, function(err, documents) {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(documents);
        }
      });
    },

    getOne: function(req, res) {
      var decoded = jwt.decode(req.headers['x-access-token']);
      Document.findById({ _id: req.params.id }, function(err, document) {
        if (err) {
          res.send(err);
        } else if (document === null) {
          res.send({ success: false, message: 'Not found' });
        } else if (decoded.id !== document.ownerId && decoded.role !== 'admin') {
          res.status(403).send({ success: false, message: 'Not authorized to view' });
        } else if (decoded.id === document.ownerId || decoded.role === 'admin') {
          res.status(200).send(document);
        } else {
          res.send({ succes: false, message: 'Document not found' });
        }
      });
    },

    update: function(req, res) {
      Document.findById({ _id: req.params.id }, function(err, document) {
        var decoded = jwt.decode(req.headers['x-access-token']);
        if (err) {
          res.send(err);
        } else if (document) {
          if (decoded.role === 'admin') {
            if (req.body.content) { document.content = req.body.content; }
            if (req.body.title) { document.title = req.body.title; }
            if (req.body.accessType) { document.accessType = req.body.accessType; }
            if (req.body.genre) { document.genre = req.body.genre; }
            document.save(function() {
              if (err) res.send(err);
              res.status(200).send({ success: true, message: 'Document successfully updated' });
            });
          } else {
            res.status(403).send({ success: false, message: 'Not authorized to update' });
          }
        } else {
          res.status(404).send({ success: false, message: 'document not found' });
        }
      });
    },

    delete: function(req, res) {
      Document.findOne({ _id: req.params.id }, function(err, document) {
        var decoded = jwt.decode(req.headers['x-access-token']);
        if (err) res.send(err);
        else if (decoded.id !== document.ownerId && decoded.role !== 'admin') {
          res.status(403).send({ success: false, message: 'Unauthorized' });
        } else {
          Document.remove({ _id: req.params.id }, function() {
            if (err) res.send(err);
            else {
              res.status(200).send({ success: true, message: 'Document deleted successfully' });
            }
          });
        }
      });
    }
  };
})();
