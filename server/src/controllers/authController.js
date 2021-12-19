const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const { COOKIES, TOKENS } = require('../constants');
const { notifyServerError } = require('../helpers/notifyError');
const { setTokens, getTokens } = require('../helpers/tokens');
const cookieOptions = require('../configs/cookieOptionsConfig');

const authController = {};

authController.register = async (req, res) => {
  const { username, password, avatar } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }

  try {
    const userExisting = await User.findOne({ username });

    if (userExisting) {
      return res
        .status(400)
        .json({ success: false, message: 'Username is already taken' });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
      username,
      password: hashedPassword,
      avatar,
    });

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
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }

  try {
    const user = await User.findOne({ username }).select('+password').lean();

    // User does not exist or incorrect username
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Incorrect password or not match
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' });
    }

    setTokens.accessToken(res, user._id);
    setTokens.refreshToken(res, user._id);

    delete user.password;

    res.json({
      success: true,
      message: 'User has successfully logged in',
      user,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

authController.logout = (req, res) => {
  res.clearCookie(COOKIES.ACCESS_TOKEN_KEY);
  res.clearCookie(COOKIES.REFRESH_TOKEN_KEY);

  res.json({
    success: true,
    message: 'User has successfully logged out',
  });
};

authController.refreshToken = (req, res) => {
  res.json({
    success: true,
    message: 'Refresh token successful',
    accessToken: getTokens.accessToken(req.userId),
    cookieOptions,
  });
};

authController.verifyTokens = (req, res) => {
  const { access_token, refresh_token } = req.cookies;

  let success = true;

  if (!access_token || !refresh_token) {
    return res.status(401).json({ success: false, message: 'Token not found' });
  }

  jwt.verify(access_token, TOKENS.ACCESS_TOKEN_SECRET, (error) => {
    // Token is modified by user
    if (error) {
      success = false;
    }
  });

  jwt.verify(refresh_token, TOKENS.REFRESH_TOKEN_SECRET, (error) => {
    // Token has expired
    if (error) {
      success = false;
    }
  });

  if (success) {
    return res.json({
      success: true,
      message: 'Valid tokens',
    });
  }

  res.status(401).json({ success: false, message: 'Invalid token' });
};

module.exports = authController;
