const mongoose = require('mongoose');
require('dotenv').config();

// Connect to database
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

// Test database models
const testDatabase = async () => {
  await connectDB();
  
  try {
    // Import models
    const User = require('../src/models/User');
    
    // Check if there are any users
    const users = await User.find({});
    console.log('Users in database:', users.length);
    
    if (users.length > 0) {
      console.log('Sample user:', users[0]);
    }
    
    // Close connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Database test failed:', error.message);
    mongoose.connection.close();
  }
};

// Run the test
testDatabase();