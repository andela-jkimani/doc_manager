var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = {
  authenticate: function(req, res, next) {
  // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'] || req.body.token || req.query.token;
    // decode token
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          res.json({ success: false, message: 'Token authentication failed' });
        } else {
          res.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
  },

  authAccess: function(req, res, next) {
    var decoded = jwt.decode(req.headers['x-access-token']);
    if (decoded.role === 'admin' || decoded.id === req.params.id) {
      next();
    } else {
      res.status(403).send({ success: false, message: 'You do not have permission' });
    }
  }
};

// 57e8333438229616d450d37e
