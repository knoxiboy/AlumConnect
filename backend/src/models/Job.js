const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  location: {
    type: String,
    required: true
  },
  salary: {
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expiryDate: {
    type: Date
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  skills: [{
    type: String
  }],
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'executive']
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;