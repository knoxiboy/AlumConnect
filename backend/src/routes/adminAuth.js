const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Admin Signup
router.post('/admin/signup', async (req, res) => {
  const { name, email, password, department, position } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user with admin role
    const user = new User({
      name,
      email,
      password,
      role: 'admin'
    });

    const savedUser = await user.save();

    // Create admin profile with password
    const admin = new Admin({
      user: savedUser._id,
      password, // This will be hashed by the pre-save middleware
      department,
      position
    });

    await admin.save();

    // Generate token
    const token = generateToken(savedUser._id);

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    // Check if user is an admin
    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized as admin' });
    }

    // Validate password against User model
    const validate = await user.matchPassword(password);

    if (!validate) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;