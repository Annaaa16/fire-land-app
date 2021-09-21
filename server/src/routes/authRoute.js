const express = require('express');

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
// @access Public
router.post('/token', authController.getNewAccessToken);

module.exports = router;
