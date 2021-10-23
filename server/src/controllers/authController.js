const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const { TOKENS } = require('../constants');
const { notifyServerError } = require('../helpers/notifyServerError');
const getTokens = require('../helpers/getTokens');

const authController = {};

authController.register = async (req, res) => {
  const { username, password, avatar } = req.body;

  // Empty username or password
  if (!username || !password) {
    res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }

  try {
    const userExisting = await User.findOne({ username });

    // User already exists
    if (userExisting) {
      res
        .status(400)
        .json({ success: false, message: 'Username is already taken' });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
      username,
      password: hashedPassword,
      avatar,
    });

    // Save to db
    await user.save();

    res.json({
      success: true,
      message: 'User has been created successfully',
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

authController.login = async (req, res) => {
  const { username, password } = req.body;

  // Empty username or password
  if (!username || !password) {
    res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }

  try {
    const user = await User.findOne({ username });

    // User does not exist or incorrect username
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' });
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    // Incorrect password or not match
    if (!isPasswordCorrect) {
      res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' });
    }

    const filteredUser = {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
    };

    res.json({
      success: true,
      message: 'User has successfully logged in',
      user: filteredUser,
      accessToken: getTokens.accessToken(user._id),
      refreshToken: getTokens.refreshToken(user._id),
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

authController.getAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  // Empty refresh token
  if (!refreshToken) {
    res
      .status(401)
      .json({ success: false, message: 'Refresh token not found' });
  }

  try {
    jwt.verify(refreshToken, TOKENS.REFRESH_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res
          .status(401)
          .json({ success: false, message: 'Invalid refresh token' });
      }

      // Sign with userId after decoded user param
      res.json({
        success: true,
        accessToken: getTokens.accessToken(decoded?.userId),
      });
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

authController.verifyToken = (req, res) => {
  const { accessToken } = req.body;

  // Empty access token
  if (!accessToken) {
    res.status(401).json({ success: false, message: 'Access token not found' });
  }

  jwt.verify(accessToken, TOKENS.ACCESS_TOKEN_SECRET, (error) => {
    if (error) {
      res.status(401).json({ success: false, message: 'Token is expired' });
    }

    res.json({ success: true, message: 'Valid access token' });
  });
};

module.exports = authController;
