const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  conversationId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient conversation queries
MessageSchema.index({ conversationId: 1, createdAt: -1 });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;