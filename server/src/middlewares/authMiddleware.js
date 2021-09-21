const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('../constants');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Access token not found' });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }

    // Attach userId to request after decoded user param
    req.userId = user.id;

    next();
  });
};

module.exports = verifyToken;
