const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../src/models/User');

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

// Clear test data
const clearTestData = async () => {
  await connectDB();
  
  try {
    // Clear test users
    await User.deleteMany({ 
      email: { 
        $in: [
          'testalumni@example.com',
          'teststudent@example.com',
          'testadmin@example.com'
        ] 
      } 
    });
    
    console.log('Test data cleared successfully!');
    
  } catch (error) {
    console.error('Error clearing test data:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the clear test data function
clearTestData();