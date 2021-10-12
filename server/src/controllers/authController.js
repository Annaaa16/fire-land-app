const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const { notifyServerError } = require('../helpers/notifyServer');
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXP,
} = require('../constants');

const authController = {};

authController.register = async (req, res) => {
  const { username, password, avatar } = req.body;

  // Empty username or password
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }

  try {
    const userExisting = await User.findOne({ username });

    // User already exists
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

    // Save to db
    await user.save();

    return res.json({
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
    const user = await User.findOne({ username });

    // User does not exist or incorrect username
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' });
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    // Incorrect password or not match
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' });
    }

    const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXP,
    });
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET);

    const filteredUser = {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
    };

    return res.json({
      success: true,
      message: 'User has successfully logged in',
      user: filteredUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

authController.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
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
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

authController.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Get user successfully',
      user,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

authController.getAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  // Empty refresh token
  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: 'Refresh token not found' });
  }

  try {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid refresh token' });
      }

      // Sign with userId after decoded user param
      const accessToken = jwt.sign(
        { userId: decoded?.userId },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_EXP,
        }
      );

      res.json({ success: true, accessToken });
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

authController.validateRefreshToken = (req, res) => {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error) => {
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid refresh token' });
    }

    res.json({ success: true, message: 'Valid refresh token' });
  });
};

module.exports = authController;