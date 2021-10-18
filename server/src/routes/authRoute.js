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

// @route POST api/auth/token
// @desc Generate new access token
// @access Private
router.post('/token', verifyToken, authController.getAccessToken);

// @route POST api/auth/verify-token
// @desc Validate access token
// @access Private
router.post('/verify-token', verifyToken, authController.verifyToken);

module.exports = router;
