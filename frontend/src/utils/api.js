
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
