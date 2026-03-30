import axios from 'axios';

/**
 * Centralized API configuration for the photography website.
 * Uses environment variables for flexibility, with a fallback to the Render backend.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 
                 process.env.REACT_APP_API_URL || 
                 "https://photography-website-yon9.onrender.com";

const API = axios.create({
  baseURL: BASE_URL
});

// Interceptor to automatically attach token if it exists in localStorage
API.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      if (userData && userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    } catch (e) {
      console.error('Error parsing user data from localStorage', e);
    }
  }
  return config;
});

export default API;
