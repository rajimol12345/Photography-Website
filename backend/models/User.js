const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'First name and Last name are required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'An email address is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Hidden by default for security
  },
  role: {
    type: String,
    enum: {
      values: ['User', 'Admin'],
      message: '{VALUE} is not a valid role'
    },
    default: 'User',
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Instance Method: Compare entered password with hashed DB password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware: Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
