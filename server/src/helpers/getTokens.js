const jwt = require('jsonwebtoken');

const { TOKENS } = require('../constants');

const getTokens = {
  accessToken: (userId) => {
    return jwt.sign({ userId }, TOKENS.ACCESS_TOKEN_SECRET, {
      expiresIn: TOKENS.ACCESS_TOKEN_EXP,
    });
  },
  refreshToken: (userId) => {
    return jwt.sign({ userId }, TOKENS.REFRESH_TOKEN_SECRET);
  },
};

module.exports = getTokens;
