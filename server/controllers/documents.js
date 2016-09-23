(function() {
  var Document = require('../models/documents');

  module.exports = {
    // Creating a document
    create: function(req, res) {
      var document = new Document();

      document.title = req.body.title;
      document.content = req.body.content;
      document.accessLevel = req.body.accessLevel;
      document.createdAt = req.body.createdAt;
      document.modifiedAt = req.body.modifiedAt;

      document.save(function(err) {
        if (err) {
          console.log(err);
          return res.status(404).send();
        }
        return res.status(200).send();
      });
    },

    getAll: function(req, res, next) {
      Document.find(function(err, document) {
        if (err) return next(err);
        return res.json(document);
      });
    },

    getByLimit: function(req, res) {
      Document.find()
      .limit(req.params.limit)
      .exec(function(err, document) {
        if (err) res.send(err);
        return res.json(document);
      })
      ;
    },

    getByUser: function(req, res) {
      Document.find({ ownerId: req.params.ownerId }, function(err, documents) {
        if (err) {
          res.send(err);
        } else {
          res.send(documents);
        }
      });
    },

    getOne: function(req, res) {
      Document.findById({ _id: req.params.id }, function(err, document) {
        if (err) {
          res.status(404).send({ message: 'user was not found' });
        } else {
          res.send(document);
        }
      });
    },

    delete: function(req, res) {
      Document.findByIdAndRemove({ _id: req.params.id }, function(err) {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send({ success: true, message: 'Document deleted successfully' });
        }
      });
    }
  };
})();
