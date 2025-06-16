import frontendConfig from '../config'; // Ensure path is correct for your frontend config
import apiClient from '../api/apiClient'; // Ensure path is correct for your axios client

export const addFavoriteItem = async (itemId) => {
  try {
    // Token'ın apiClient tarafından header'a eklendiğini varsayıyoruz.
    const endpoint = frontendConfig.apiEndpoints.favoriteItem(itemId);
    const response = await apiClient.post(endpoint); // POST for adding
    return response.data; // Expected: { success: true, message: '...', favorites: [...] }
  } catch (error) {
    console.error("Error adding favorite:", error.response?.data || error.message);
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const removeFavoriteItem = async (itemId) => {
  try {
    const endpoint = frontendConfig.apiEndpoints.favoriteItem(itemId);
    const response = await apiClient.delete(endpoint); 
    return response.data; // Expected: { success: true, message: '...', favorites: [...] }
  } catch (error) {
    console.error("Error removing favorite:", error.response?.data || error.message);
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};
export const getMyFavoriteItemsDetails = async () => {
  try {
    const endpoint = frontendConfig.apiEndpoints.getUserFavorites; // Config'den alın veya direkt yazın
    const response = await apiClient.get(endpoint);
    return response.data; // Beklenen format: { success: true, favorites: [itemObject1, itemObject2, ...] }
  } catch (error) {
    console.error("Error fetching favorite items details:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};