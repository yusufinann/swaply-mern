import config from '../../config'
import apiClient from '../../api/apiClient';

export const createItem=async()=>{
try {
     const response = await apiClient.get(config.apiEndpoints.createItem);
      return response.data;
} catch (error) {
     throw error;
}
}