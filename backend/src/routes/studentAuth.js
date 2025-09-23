const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createUser } = require('../controllers/authController');
const Student = require('../models/Student');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Student Signup
router.post('/student/signup', async (req, res) => {
  const { name, email, password, enrollmentYear, degree, major, currentYear } = req.body;

  try {
    const savedUser = await createUser(name, email, password, 'student');

    // Create student profile with password
    const student = new Student({
      user: savedUser._id,
      password, // This will be hashed by the pre-save middleware
      enrollmentYear,
      degree,
      major,
      currentYear
    });

    await student.save();

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

// Student Login
router.post('/student/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    // Check if user is a student
    if (user.role !== 'student') {
      return res.status(401).json({ message: 'Not authorized as student' });
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