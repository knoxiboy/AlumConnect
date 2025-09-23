const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

// Test authentication routes
const testAuthRoutes = async () => {
  const baseURL = 'http://localhost:3001/api/auth';
  
  try {
    console.log('Testing Alumni Signup...');
    const alumniSignupResponse = await axios.post(`${baseURL}/alumni/signup`, {
      name: 'Test Alumni',
      email: 'testalumni@example.com',
      password: 'password123',
      graduationYear: 2020,
      degree: 'M.Tech',
      major: 'Computer Science',
      currentPosition: 'Senior Engineer',
      company: 'Tech Corp',
      industry: 'Technology',
      location: 'San Francisco, CA'
    });
    
    console.log('Alumni Signup Response:', alumniSignupResponse.data);
    
    console.log('\nTesting Alumni Login...');
    const alumniLoginResponse = await axios.post(`${baseURL}/alumni/login`, {
      email: 'testalumni@example.com',
      password: 'password123'
    });
    
    console.log('Alumni Login Response:', alumniLoginResponse.data);
    
    console.log('\nTesting Student Signup...');
    const studentSignupResponse = await axios.post(`${baseURL}/student/signup`, {
      name: 'Test Student',
      email: 'teststudent@example.com',
      password: 'password123',
      enrollmentYear: 2021,
      degree: 'B.Tech',
      major: 'Computer Science',
      currentYear: 3
    });
    
    console.log('Student Signup Response:', studentSignupResponse.data);
    
    console.log('\nTesting Student Login...');
    const studentLoginResponse = await axios.post(`${baseURL}/student/login`, {
      email: 'teststudent@example.com',
      password: 'password123'
    });
    
    console.log('Student Login Response:', studentLoginResponse.data);
    
    console.log('\nTesting Admin Signup...');
    const adminSignupResponse = await axios.post(`${baseURL}/admin/signup`, {
      name: 'Test Admin',
      email: 'testadmin@example.com',
      password: 'password123',
      department: 'Computer Science',
      position: 'Head of Department'
    });
    
    console.log('Admin Signup Response:', adminSignupResponse.data);
    
    console.log('\nTesting Admin Login...');
    const adminLoginResponse = await axios.post(`${baseURL}/admin/login`, {
      email: 'testadmin@example.com',
      password: 'password123'
    });
    
    console.log('Admin Login Response:', adminLoginResponse.data);
    
    console.log('\nTesting Google OAuth routes...');
    console.log('Google OAuth endpoint:', `${baseURL}/google`);
    console.log('Google OAuth callback endpoint:', `${baseURL}/google/callback`);
    
    console.log('\nAll tests passed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error.response ? error.response.data : error.message);
  }
};

// Run the test
testAuthRoutes();