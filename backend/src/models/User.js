const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values while still enforcing uniqueness
    },
    role: {
      type: String,
      enum: ['student', 'alumni', 'admin'],
      default: 'student',
    },
  },
  { timestamps: true }
);

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
  // Only hash the password if it's modified and not a Google auth user
  if (!this.isModified('password') || this.password === 'google_auth') {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // Google auth users don't have a real password
  if (this.password === 'google_auth') {
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
