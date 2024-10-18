// src/api.ts

import { getAuthHeader } from '@/utilities/auth';
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://chatbotserver.infosenior.care/',  
  // baseURL: 'http://192.168.100.58:5000/',  

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    
    const authHeader = await getAuthHeader();
    if (authHeader) {
      config.headers['Authorization'] = authHeader.Authorization;
    }
  
    
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    console.log(error);
    return Promise.reject(error);
  },
);

export default api;