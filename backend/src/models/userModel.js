/*
 * userModel.js
 * Defines the user schema and model.
 * For example, using Mongoose with MongoDB.
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Additional fields for income types, etc., can be added here.
});

userSchema.statics.findByCredentials = async (email, password) => {
  // Custom method to validate user credentials (placeholder)
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  // In a real app, compare hashed passwords
  if (user.password !== password) throw new Error('Invalid password');
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
