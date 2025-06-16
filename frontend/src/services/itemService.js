import frontendConfig from '../config'; // Ensure path is correct for your frontend config
import apiClient from '../api/apiClient'; // Ensure path is correct for your axios client

export const createItem = async (itemData) => {
  try {
    const response = await apiClient.post(frontendConfig.apiEndpoints.items, itemData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
        throw error.response.data;
    }
    throw error; // Rethrow for the component to handle
  }
};

export const getMyItems = async () => {
  try {
    // Assuming apiEndpoints.myItems is defined in your config as "/items/my-items"
    // or you construct it as: `${frontendConfig.apiEndpoints.items}/my-items`
    const endpoint = frontendConfig.apiEndpoints.myItems || `${frontendConfig.apiEndpoints.items}/my-items`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
        throw error.response.data;
    }
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    // Assuming apiEndpoints.itemById is a function: (id) => `/items/${id}`
    // or construct as: `${frontendConfig.apiEndpoints.items}/${itemId}`
    const endpoint = typeof frontendConfig.apiEndpoints.itemById === 'function'
      ? frontendConfig.apiEndpoints.itemById(itemId)
      : `${frontendConfig.apiEndpoints.items}/${itemId}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
        throw error.response.data;
    }
    throw error;
  }
};

export const getItemById = async (itemId) => {
  try {
    const endpoint = typeof frontendConfig.apiEndpoints.itemById === 'function'
      ? frontendConfig.apiEndpoints.itemById(itemId)
      : `${frontendConfig.apiEndpoints.items}/${itemId}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
        throw error.response.data;
    }
    throw error;
  }
};

export const updateItem = async (itemId, itemData) => {
  try {
    const endpoint = typeof frontendConfig.apiEndpoints.itemById === 'function'
      ? frontendConfig.apiEndpoints.itemById(itemId)
      : `${frontendConfig.apiEndpoints.items}/${itemId}`;
    const response = await apiClient.put(endpoint, itemData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
        throw error.response.data;
    }
    throw error;
  }
};

// Function to get all publicly available items (for ItemListSection)
export const getAllAvailableItems = async (params = {}) => {
  // params could include { category, search, page, limit }
  try {
    // Assuming apiEndpoints.availableItems is defined as "/items/all/available"
    // or construct as: `${frontendConfig.apiEndpoints.items}/all/available`
    const endpoint = frontendConfig.apiEndpoints.availableItems || `${frontendConfig.apiEndpoints.items}/all/available`;
    const response = await apiClient.get(endpoint, { params });
    return response.data; // Expected: { success: true, data: items[], totalPages, currentPage, totalItems }
  } catch (error) {
    if (error.response && error.response.data) {
        throw error.response.data;
    }
    throw error;
  }
};

