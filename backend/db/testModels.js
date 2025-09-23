const mongoose = require('mongoose');
require('dotenv').config();

// Import models with correct relative paths
const User = require('../src/models/User');
const Student = require('../src/models/Student');

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
    // Clear existing test data
    await User.deleteMany({ email: 'teststudent@example.com' });
    
    // Test creating a sample student user
    const sampleUser = new User({
      name: 'Test Student',
      email: 'teststudent@example.com',
      password: 'password123',
      role: 'student'
    });
    
    const savedUser = await sampleUser.save();
    console.log('Sample user created:', savedUser._id);
    
    // Test creating a student profile with password
    const sampleStudent = new Student({
      user: savedUser._id,
      password: 'password123',
      enrollmentYear: 2021,
      degree: 'B.Tech',
      major: 'Computer Science',
      currentYear: 3
    });
    
    const savedStudent = await sampleStudent.save();
    console.log('Sample student profile created:', savedStudent._id);
    
    // Test password hashing
    const isPasswordMatch = await savedStudent.matchPassword('password123');
    console.log('Password hashing test:', isPasswordMatch ? 'PASSED' : 'FAILED');
    
    // Test finding the student with populated user data
    const foundStudent = await Student.findById(savedStudent._id).populate('user');
    console.log('Student found with user data:');
    console.log('  Name:', foundStudent.user.name);
    console.log('  Email:', foundStudent.user.email);
    console.log('  Degree:', foundStudent.degree);
    console.log('  Major:', foundStudent.major);
    
    // Test deleting the student profile and user
    await Student.deleteOne({ _id: savedStudent._id });
    await User.deleteOne({ _id: savedUser._id });
    console.log('Sample data deleted');
    
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