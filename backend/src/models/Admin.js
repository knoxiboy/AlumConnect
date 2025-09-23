const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  permissions: [{
    type: String,
    enum: ['manage_users', 'manage_content', 'manage_events', 'manage_jobs', 'view_reports']
  }]
}, {
  timestamps: true
});

// Encrypt password before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;