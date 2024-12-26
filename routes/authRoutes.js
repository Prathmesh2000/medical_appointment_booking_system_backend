const express = require('express');
const { login } = require('../controllers/authController/login');
const { signup } = require('../controllers/authController/signup');
const { verifyToken } = require('../controllers/authController/verifytoken');
const router = express.Router();

// Signup route
router.post('/login', login);
router.post('/signup', signup);
router.post('/verifyuser', verifyToken)

// Login route
// router.post('/login', login);

module.exports = router;
