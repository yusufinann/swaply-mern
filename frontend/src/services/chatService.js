import apiClient from "../api/apiClient";


export const initiateChatForItem = async (itemId) => {
    try {
      
        const response = await apiClient.post('/community-chats/initiate', { itemId });
        return response.data;
    } catch (error) {
        console.error("Sohbet başlatılırken veya alınırken hata oluştu:", error);
        throw error;
    }
};

export const getMyChats = async () => {
    try {
        const response = await apiClient.get('/community-chats'); 
        return response.data;
    } catch (error) {
        console.error("Sohbet listesi alınırken hata oluştu:", error);
        throw error;
    }
};

export const getChatById = async (chatId) => {
    try {
        const response = await apiClient.get(`/community-chats/${chatId}`);
        return response.data;
    } catch (error) {
        console.error(`Sohbet ${chatId} alınırken hata:`, error);
        throw error;
    }
};
