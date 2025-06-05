import axios from 'axios';

const backendApi = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: "https://my-video-hub-backend-api-eta.vercel.app",
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
backendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default backendApi;
