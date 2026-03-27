const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * @desc    Protect routes - Verify JWT Token
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // 1. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

      // 2. Fetch user associated with token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Authorization failed: User no longer exists');
      }

      return next();
    } catch (error) {
      console.error(`[AUTH ERROR] ${error.message}`);
      res.status(401);
      throw new Error('Authorization failed: Invalid or expired token');
    }
  }

  // No token found
  if (!token) {
    res.status(401);
    throw new Error('Authorization failed: No access token provided');
  }
});

/**
 * @desc    Authorize specific roles
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Access Denied: Your role (${req.user?.role || 'Guest'}) does not have permission for this resource`);
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };