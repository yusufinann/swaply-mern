// src/api/api.js
import axios from 'axios';
import frontendConfig from '../config.js'; // Frontend config dosyasını import et

const apiClient = axios.create({
  baseURL: frontendConfig.apiBaseUrl, 
  withCredentials: true, 
});

// Her istek öncesi token'ı header'a ekleme
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hata yönetimi için interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Hatası:', error.response.data.message || error.message);
    } else {
      console.error('API Hatası:', error.message);
    }
    return Promise.reject(error);
  }
);
export default apiClient;