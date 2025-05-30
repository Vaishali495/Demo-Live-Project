import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7000',
  timeout: 5000,
  withCredentials: true, // Add this to include credentials in every request
});

export default axiosInstance;
