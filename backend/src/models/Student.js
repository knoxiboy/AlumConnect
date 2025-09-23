const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  enrollmentYear: {
    type: Number,
    required: true
  },
  graduationYear: {
    type: Number
  },
  degree: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  currentYear: {
    type: Number,
    required: true
  },
  currentPosition: {
    type: String
  },
  company: {
    type: String
  },
  industry: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  skills: [{
    type: String
  }],
  interests: [{
    type: String
  }],
  linkedIn: {
    type: String
  },
  website: {
    type: String
  }
}, {
  timestamps: true
});

// Encrypt password before saving
StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
StudentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;