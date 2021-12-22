const jwt = require('jsonwebtoken');

const { TOKENS, COOKIES } = require('../constants');
const { setTokens } = require('../helpers/tokens');

const verifyTokens = (req, res, next) => {
  const { access_token, refresh_token } = req.cookies;

  if (!access_token || !refresh_token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token is missing' });
  }

  jwt.verify(access_token, TOKENS.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      // Access token has expired
      if (error.expiredAt) {
        jwt.verify(
          refresh_token,
          TOKENS.REFRESH_TOKEN_SECRET,
          (error, decoded) => {
            if (error) {
              res
                .status(401)
                .json({ success: false, message: 'Invalid refresh token' });
            } else {
              req.userId = decoded.userId;

              res.clearCookie(COOKIES.ACCESS_TOKEN_KEY);
              setTokens.accessToken(res, decoded.userId);

              next();
            }
          }
        );
      } else {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid token' });
      }
    } else {
      req.userId = decoded.userId;

      next();
    }
  });
};

module.exports = verifyTokens;
