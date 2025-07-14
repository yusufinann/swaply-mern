// src/config/index.js (or wherever your frontend config is)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const config = {
  apiBaseUrl: API_BASE_URL,
    wsBaseUrl: 'ws://localhost:3001',
  apiEndpoints: {
    // These should be relative paths from API_BASE_URL
    items: "/items", 
    myItems: "/items/my-items", // Added for clarity
    itemById: (id) => `/items/${id}`, // Function to generate item-specific path
     availableItems: "/items/all/available" ,
     favoriteItem: (itemId) => `/favorites/${itemId}`,
     getUserFavorites: "/favorites/me/"
  }
};

export default config;