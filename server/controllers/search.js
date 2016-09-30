module.exports = {
  search: function(req, res) {
    var Document = require('./documents');
    if (req.query.genre) {
      Document.getByGenre(req, res);
    } else if (req.query.access) {
      Document.getByAccessLevel(req, res);
    } else if (req.query.date) {
      Document.getByDate(req, res);
    } else {
      res.send({ message: 'Enter a search term' });
    }
  }
};
