var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = {
  authenticate: function(req, res, next) {
  // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'] || req.body.token || req.query.token;
    // decode token
    if (token) {
      jwt.verify(token, config.test.secret, function(err, decoded) {
        if (err) {
          res.json({ success: false, message: 'Token authentication failed' });
        } else {
          req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
          };
          next();
        }
      });
    } else {
      res.status(401).send({
        success: false,
        message: 'No token provided'
      });
    }
  },

  authAccess: function(req, res, next) {
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).send({ success: false, message: 'You do not have permission' });
    }
  }
};
