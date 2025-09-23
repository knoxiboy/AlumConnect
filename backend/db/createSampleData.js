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

// Create sample data
const createSampleData = async () => {
  await connectDB();
  
  try {
    // Import models
    const User = require('../src/models/User');
    const Job = require('../src/models/Job');
    
    // Create a sample user
    const sampleUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'alumni'
    });
    
    const savedUser = await sampleUser.save();
    console.log('Sample user created:', savedUser._id);
    
    // Create sample jobs
    const sampleJobs = [
      {
        title: 'Software Engineer',
        company: 'Tech Corp',
        description: 'We are looking for a skilled software engineer to join our team.',
        requirements: ['JavaScript', 'React', 'Node.js'],
        location: 'Bangalore, India',
        salary: { min: 50000, max: 80000, currency: 'USD' },
        employmentType: 'Full-time',
        postedBy: savedUser._id,
        skills: ['JavaScript', 'React', 'Node.js'],
        experienceLevel: 'Mid'
      },
      {
        title: 'Data Science Intern',
        company: 'Data Insights',
        description: 'Join our data science team as an intern and work on real projects.',
        requirements: ['Python', 'SQL', 'Machine Learning'],
        location: 'Remote',
        salary: { min: 1000, max: 2000, currency: 'USD' },
        employmentType: 'Internship',
        postedBy: savedUser._id,
        isRemote: true,
        skills: ['Python', 'SQL', 'Machine Learning'],
        experienceLevel: 'Entry'
      }
    ];
    
    for (const jobData of sampleJobs) {
      const job = new Job(jobData);
      const savedJob = await job.save();
      console.log('Sample job created:', savedJob.title);
    }
    
    // Close connection
    mongoose.connection.close();
    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Failed to create sample data:', error.message);
    mongoose.connection.close();
  }
};

// Run the function
createSampleData();