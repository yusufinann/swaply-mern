import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getItemById as getItemByIdApi } from '../../services/itemService';
import { useAuth } from '../../shared/context/AuthContext';
import { useFavorites } from '../../shared/context/FavoritesContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const formatDateBasic = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  } catch (e) {
    return 'geçersiz tarih';
  }
};

export const useSwapOfferPage = () => {
  const { id: paramId } = useParams();
  const query = useQuery();
  const queryItemId = query.get('itemId');
  const itemId = paramId || queryItemId;

  const navigate = useNavigate();
  const { user: authUser, isAuthenticated } = useAuth();
  const { isFavorited, addFavorite, removeFavorite } = useFavorites();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (itemId) {
      const fetchItemDetails = async () => {
        setLoading(true);
        setError(null);
        setItem(null);
        try {
          const response = await getItemByIdApi(itemId);
          if (response.success && response.data) {
            setItem(response.data);
          } else {
            setError(response.message || 'Ürün detayı alınamadı.');
          }
        } catch (err) {
          setError(err.message || 'Bir hata oluştu.');
        } finally {
          setLoading(false);
        }
      };
      fetchItemDetails();
    } else {
      setItem(null);
    }
  }, [itemId]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      setSnackbar({ open: true, message: 'Favorilere eklemek için giriş yapmalısınız.', severity: 'info' });
      return;
    }
    if (!item || !item._id) return;

    setFavoriteLoading(true);
    const currentlyFavorited = isFavorited(item._id);
    const apiCall = currentlyFavorited ? removeFavorite : addFavorite;
    
    try {
        const result = await apiCall(item._id);
        if(result.success){
            setSnackbar({ open: true, message: result.message, severity: 'success' });
        } else {
            throw new Error(result.message);
        }
    } catch (err) {
        setSnackbar({ open: true, message: err.message || "Favori işlemi başarısız oldu, lütfen tekrar deneyin.", severity: 'error' });
    } finally {
        setFavoriteLoading(false);
    }
  };

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const handleCloseImageDialog = () => {
    setSelectedImage(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleMakeOffer = () => {
    if (!authUser) {
      setSnackbar({ open: true, message: 'Teklif yapmak için giriş yapmalısınız.', severity: 'info' });
      return;
    }
    if (isOwner) {
      setSnackbar({ open: true, message: 'Kendi ürününüze teklif yapamazsınız.', severity: 'warning' });
      return;
    }
    navigate(`/swap-offer/${item._id}`);
    console.log("Make offer for item:", item._id);
    setSnackbar({ open: true, message: `"${item.title}" için takas teklifi oluşturma süreci başlayacak.`, severity: 'info' });
  };
  
  const isOwner = authUser && item && item.owner?._id === authUser._id;
  const itemIsFavorited = item ? isFavorited(item._id) : false;

  const mainImage = item?.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/600x400.png?text=Resim+Yok';
  const otherImages = item?.images && item.images.length > 1 ? item.images.slice(1) : [];
  const productRatingValue = item?.rating || 4.0;
  const reviewCount = item?.reviewCount || 0;
  const qaCount = item?.qaCount || 0;
  const popularityText = item?.popularityText || "Popüler ürün!";

  return {
    itemId,
    item,
    loading: loading,
    error,
    selectedImage,
    isFavorited: itemIsFavorited,
    favoriteLoading,
    snackbar,
    setSnackbar,
    isOwner,
    mainImage,
    otherImages,
    productRatingValue,
    reviewCount,
    qaCount,
    popularityText,
    navigate,
    handleToggleFavorite,
    handleImageClick,
    handleCloseImageDialog,
    handleCloseSnackbar,
    handleMakeOffer,
    formatDateBasic,
  };
};