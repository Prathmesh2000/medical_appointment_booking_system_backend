const jwt = require('jsonwebtoken');

// Token verification controller
exports.verifyToken = (req, res) => {
  const token = req.body.token; // Expecting token in the request body

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      valid: true,
      message: 'Token is valid',
      decoded, // Send the decoded payload
    });
  } catch (error) {
    return res.status(401).json({
      valid: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};
