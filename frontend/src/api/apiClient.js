// src/api/api.js
import axios from 'axios';
import frontendConfig from '../config.js'; // Frontend config dosyasını import et

const apiClient = axios.create({
  baseURL: frontendConfig.apiBaseUrl, 
  withCredentials: true, 
});

export default apiClient;