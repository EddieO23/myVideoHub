import axios from 'axios';

const backendApi = axios.create({baseURL: 'http://localhost:8000/api',});

export default backendApi;
