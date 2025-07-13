import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../../services/itemService';

export const useConversationPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemData = async () => {
            if (!id) {
                setError("Geçersiz ürün ID'si");
                setLoading(false);
                return;
            }

            try {
                const response = await getItemById(id);
                if (response.success && response.data) {
                    setItem(response.data);
                } else {
                    setError(response.message || "Ürün bilgileri alınamadı.");
                }
            } catch (err) {
                setError(err.message || "Bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchItemData();
    }, [id]);

    return { item, loading, error };
};