const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', authController.register);

// @route POST api/auth/login
// @desc Check if user is logged in
// @access Public
router.post('/login', authController.login);

// @route POST api/auth/logout
// @desc Log out user
// @access Public
router.get('/logout', authController.logout);

// @route GET api/auth/refresh-token
// @desc Generate new access token
// @access Private
router.get('/refresh-token', verifyToken, authController.refreshToken);

// @route GET api/auth/verify-token
// @desc Validate access token
// @access Public
router.get('/verify-tokens', authController.verifyTokens);

module.exports = router;
