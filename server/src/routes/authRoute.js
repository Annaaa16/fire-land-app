const express = require('express');

const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', authController.register);

// @route POST api/auth/login
// @desc Check if user is logged in
// @access Public
router.post('/login', authController.login);

// @route GET api/auth/user
// @desc Get current user
// @access Private
router.get('/user', verifyToken, authController.getCurrentUser);

// @route POST api/auth/token
// @desc Generate new access token
// @access Private
router.post('/token', authController.getAccessToken);

// @route POST api/auth/validate-refresh-token
// @desc Validate refresh token
// @access Private
router.post('/validate-refresh-token', authController.validateRefreshToken);

module.exports = router;
