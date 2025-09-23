const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Passport
require('./config/passport');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);

// Simple protected route for testing
const { protect } = require('./middleware/auth');
app.get('/api/protected', protect, (req, res) => {
  res.status(200).json({ message: `Welcome user ${req.user.id}, you have access to protected data!` });
});

// Test route for database models
app.get('/api/test-db', async (req, res) => {
  try {
    // Import models to test
    const User = require('./models/User');
    const Alumni = require('./models/Alumni');
    const Student = require('./models/Student');
    const Admin = require('./models/Admin');
    const Connection = require('./models/Connection');
    const Event = require('./models/Event');
    const Job = require('./models/Job');
    const Message = require('./models/Message');
    
    // Return success message with model names
    res.status(200).json({ 
      message: 'Database models loaded successfully',
      models: ['User', 'Alumni', 'Student', 'Admin', 'Connection', 'Event', 'Job', 'Message']
    });
  } catch (error) {
    res.status(500).json({ message: 'Error loading database models', error: error.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
