const mongoose = require('mongoose');

const JobApplicationSchema = mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  resumeUrl: {
    type: String
  },
  portfolioUrl: {
    type: String
  },
  expectedSalary: {
    type: String
  },
  availableFrom: {
    type: Date
  },
  whyInterested: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Submitted', 'Reviewed', 'Interview', 'Accepted', 'Rejected'],
    default: 'Submitted'
  }
}, {
  timestamps: true
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

module.exports = JobApplication;