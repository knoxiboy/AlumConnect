const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;