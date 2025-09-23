
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const testDB = async () => {
  try {
    const response = await api.get('/test-db');
    return response.data;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
};

// Job Application APIs
export const applyForJob = async (applicationData) => {
  try {
    const response = await api.post('/alumni/job-applications', applicationData);
    return response.data;
  } catch (error) {
    console.error('Error applying for job', error);
    throw error;
  }
};

export const getUserJobApplications = async (userId) => {
  try {
    const response = await api.get(`/alumni/job-applications/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job applications', error);
    throw error;
  }
};

export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await axios.post('http://localhost:3001/api/alumni/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.fileUrl;
  } catch (error) {
    console.error('Error uploading resume', error);
    throw error;
  }
};
