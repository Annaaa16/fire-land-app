const jwt = require('jsonwebtoken');

const { TOKENS, COOKIES } = require('../constants');
const cookieOptions = require('../configs/cookieOptionsConfig');

const setTokens = {
  accessToken: (res, userId) => {
    const accessToken = jwt.sign({ userId }, TOKENS.ACCESS_TOKEN_SECRET, {
      expiresIn: TOKENS.ACCESS_TOKEN_EXP,
    });

    res.cookie(COOKIES.ACCESS_TOKEN_KEY, accessToken, cookieOptions);
  },
  refreshToken: (res, userId) => {
    const refreshToken = jwt.sign({ userId }, TOKENS.REFRESH_TOKEN_SECRET, {
      expiresIn: TOKENS.REFRESH_TOKEN_EXP,
    });

    res.cookie(COOKIES.REFRESH_TOKEN_KEY, refreshToken, cookieOptions);
  },
};

const getTokens = {
  accessToken: (userId) => {
    return jwt.sign({ userId }, TOKENS.ACCESS_TOKEN_SECRET, {
      expiresIn: TOKENS.ACCESS_TOKEN_EXP,
    });
  },
};

module.exports = { setTokens, getTokens };
