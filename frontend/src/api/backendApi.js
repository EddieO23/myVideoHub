// import axios from 'axios';

// const backendApi = axios.create({baseURL: 'http://localhost:8000'});

// export default backendApi;


import axios from 'axios';

const backendApi = axios.create({
  baseURL: 'http://localhost:8000',
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
