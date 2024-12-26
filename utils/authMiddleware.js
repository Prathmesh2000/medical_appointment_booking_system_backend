const jwt = require("jsonwebtoken");
const { unauthorizedResponse } = require("./apiFunction");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  let token = req.header("Authorization") || '';
  token = token?.split(" ")?.[1] || '';

  if (!token) {
    return unauthorizedResponse(res, "Access Denied. No Token Provided");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return unauthorizedResponse(res, "Invalid Token");
  }
};

module.exports = verifyToken;
