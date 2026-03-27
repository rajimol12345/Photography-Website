const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * @desc    Generate JWT Token
 */
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  if (secret === 'fallback_secret') {
    console.warn('[AUTH] Warning: Using fallback JWT secret. Set JWT_SECRET in environment.');
  }
  return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

/**
 * @desc    Register a new user (Admin/User)
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log(`[AUTH-REGISTER] Processing: ${email}`);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields: Name, Email, and Password');
  }

  // Check unique email
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('This email is already registered. Please login instead.');
  }

  // Create User (Mongoose pre-save hashes the password)
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'User',
  });

  if (user) {
    console.log(`[AUTH-REGISTER] Registration successful for ${user._id}`);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Registration failed: Invalid user data provided');
  }
});

/**
 * @desc    Authenticate User & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(`[AUTH-LOGIN] Attempt for: ${email}`);

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password must be provided');
  }

  // Find user and explicitly select password (since it's hidden by default)
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    console.log(`[AUTH-LOGIN] Success for ${user._id}`);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Login failed: Invalid email or password');
  }
});

/**
 * @desc    Get current user profile
 * @route   GET /api/users/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('User record not found');
  }
});

/**
 * @desc    Admin: Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/**
 * @desc    Admin: Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Target user not found');
  }

  if (user.role === 'Admin') {
    res.status(400);
    throw new Error('Security Error: Administrator accounts cannot be deleted');
  }

  await user.deleteOne();
  res.json({ message: 'User account removed successfully' });
});

/**
 * @desc    Admin: Get user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  deleteUser,
  getUserById,
};