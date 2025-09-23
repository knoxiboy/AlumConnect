const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AlumniSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  password: {
    type: String,
    required: true,
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
    enum: ['available', 'busy', 'not_available'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Encrypt password before saving
AlumniSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
AlumniSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Alumni = mongoose.model('Alumni', AlumniSchema);

module.exports = Alumni;