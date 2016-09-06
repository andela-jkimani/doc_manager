'use strict';

module.exports = function(app) {
  app.route('/documents')
    .get(function(req, res) {
      res.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
    });
};
