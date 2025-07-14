// src/shared/context/FavoritesContext.js

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getMyFavoriteItemsDetails, addFavoriteItem, removeFavoriteItem } from '../../services/userService';

const FavoritesContext = createContext(null);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated, updateUser } = useAuth();

  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoriteItems([]);
      setFavoriteIds(new Set());
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await getMyFavoriteItemsDetails();
      if (response.success && Array.isArray(response.favorites)) {
        setFavoriteItems(response.favorites);
        setFavoriteIds(new Set(response.favorites.map(item => item._id)));
        setError(null); // Başarılı fetch sonrası hatayı temizle
      } else {
        setError(response.message || 'Favori ürünler alınamadı.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Favoriler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);
  
  const isFavorited = useCallback((itemId) => favoriteIds.has(itemId), [favoriteIds]);


  const addFavorite = useCallback(async (itemId) => {
    const originalIds = new Set(favoriteIds);
    setFavoriteIds(prevIds => new Set(prevIds).add(itemId));

    try {
      const response = await addFavoriteItem(itemId);
      if (!response.success || !response.favorites) {
        throw new Error(response.message || 'Ürün favorilere eklenemedi.');
      }
      
      // AuthContext'i güncelle
      updateUser(prevUser => ({ ...prevUser, favorites: response.favorites }));
      await fetchFavorites();
      
      return { success: true, message: 'Ürün favorilere eklendi!' };
    } catch (err) {
      // Hata durumunda anlık güncellemeyi geri al
      setFavoriteIds(originalIds);
      return { success: false, message: err.message || 'Favori ekleme işlemi başarısız oldu.' };
    }
  }, [favoriteIds, updateUser, fetchFavorites]); // fetchFavorites'i dependency array'e ekle

  const removeFavorite = useCallback(async (itemId) => {
    const originalIds = new Set(favoriteIds);
    const originalItems = [...favoriteItems];
    
    setFavoriteIds(prevIds => {
      const newIds = new Set(prevIds);
      newIds.delete(itemId);
      return newIds;
    });
    setFavoriteItems(prevItems => prevItems.filter(item => item._id !== itemId));
    
    try {
      const response = await removeFavoriteItem(itemId);
      if (!response.success || !response.favorites) {
        throw new Error(response.message || 'Ürün favorilerden çıkarılamadı.');
      }
      
      updateUser(prevUser => ({ ...prevUser, favorites: response.favorites }));
      
      //await fetchFavorites();
      
      return { success: true, message: 'Ürün favorilerden çıkarıldı.' };
    } catch (err) {
      setFavoriteIds(originalIds);
      setFavoriteItems(originalItems);
      return { success: false, message: err.message || 'Favori çıkarma işlemi başarısız oldu.' };
    }
  }, [favoriteIds, favoriteItems, updateUser]); 



  const value = {
    favoriteItems,
    favoriteIds,
    loading,
    error,
    isFavorited,
    addFavorite,
    removeFavorite,
    fetchFavorites, // Bu fonksiyonu dışarıya vermek her zaman iyi bir pratiktir
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};