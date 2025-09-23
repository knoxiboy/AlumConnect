const mongoose = require('mongoose');

const AlumniSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  graduationYear: {
    type: Number,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  currentPosition: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  skills: [{
    type: String
  }],
  linkedIn: {
    type: String
  },
  website: {
    type: String
  },
  isMentor: {
    type: Boolean,
    default: false
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Not Available'],
    default: 'Available'
  }
}, {
  timestamps: true
});

const Alumni = mongoose.model('Alumni', AlumniSchema);

module.exports = Alumni;