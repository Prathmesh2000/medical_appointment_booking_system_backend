const express = require('express');
const { login } = require('../controllers/authController/login');
const { signup } = require('../controllers/authController/signup');
const router = express.Router();

// Signup route
router.post('/login', login);
router.post('/signup', signup);

// Login route
// router.post('/login', login);

module.exports = router;
