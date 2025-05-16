import axios from 'axios';

const backendApi = axios.create({baseURL: 'http://localhost:8000'});

export default backendApi;
