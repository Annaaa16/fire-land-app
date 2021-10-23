const jwt = require('jsonwebtoken');

const { TOKENS } = require('../constants');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: 'Header access token not found' });
  }

  jwt.verify(token, TOKENS.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Sign with userId after decoded user param
    req.userId = decoded.userId;

    next();
  });
};

module.exports = verifyToken;
