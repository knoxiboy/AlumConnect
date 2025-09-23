const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../src/models/User');
const Alumni = require('../src/models/Alumni');
const Student = require('../src/models/Student');
const Admin = require('../src/models/Admin');
const Connection = require('../src/models/Connection');
const Event = require('../src/models/Event');
const Job = require('../src/models/Job');
const Message = require('../src/models/Message');

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Test database operations
const testDatabase = async () => {
  await connectDB();
  
  try {
    // Test creating a sample user
    const sampleUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'student'
    });
    
    const savedUser = await sampleUser.save();
    console.log('Sample user created:', savedUser._id);
    
    // Test finding the user
    const foundUser = await User.findOne({ email: 'test@example.com' });
    console.log('User found:', foundUser.name);
    
    // Test deleting the user
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Sample user deleted');
    
    console.log('Database test completed successfully!');
    
  } catch (error) {
    console.error('Database test failed:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the test
testDatabase();