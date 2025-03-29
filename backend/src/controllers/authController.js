/*
 * authController.js
 * Handles user authentication logic: signup, login, logout.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assume we have a user model

// Signup: Create a new user and return a token
exports.signup = async (req, res) => {
  try {
    // Create a new user from request data
    const newUser = await User.create(req.body);
    // Generate a JWT token for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'secretKey', {
      expiresIn: '1d'
    });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login: Authenticate user and return a token
exports.login = async (req, res) => {
  try {
    // Find the user by email and validate password
    const user = await User.findByCredentials(req.body.email, req.body.password);
    if (!user) return res.status(401).json({ error: 'Authentication failed' });
    // Generate token upon successful login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretKey', {
      expiresIn: '1d'
    });
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
