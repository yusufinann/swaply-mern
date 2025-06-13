const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api'; // .env'den okunur veya varsayılan

const config = {
  apiBaseUrl: API_BASE_URL,
};

export default config;