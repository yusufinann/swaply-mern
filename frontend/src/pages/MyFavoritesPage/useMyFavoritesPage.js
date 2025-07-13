import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { useFavorites } from '../../shared/context/FavoritesContext';

export const useMyFavoritesPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { favoriteItems, loading: favoritesLoading, error, removeFavorite} = useFavorites();
  const navigate = useNavigate();
  
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleRemoveFromFavorites = useCallback(async (itemIdToRemove) => {
    const result = await removeFavorite(itemIdToRemove, true);
    if(result.success){
        setSnackbar({ open: true, message: result.message, severity: 'success' });
    } else {
        setSnackbar({ open: true, message: result.message, severity: 'error' });
    }
  }, [removeFavorite]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return {
    favoriteItems,
    loading: authLoading || favoritesLoading,
    error,
    isAuthenticated,
    snackbar,
    navigate,
    handleRemoveFromFavorites,
    handleCloseSnackbar,
  };
};