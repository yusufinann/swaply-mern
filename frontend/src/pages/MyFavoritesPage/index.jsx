import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Button,
  Paper,
  IconButton,
  Snackbar, // Snackbar import edildi
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// Servis importlarınızı kendi dosya yapınıza göre düzenleyin
import { removeFavoriteItem, getMyFavoriteItemsDetails } from '../../services/userService'; // veya userService
import { useAuth } from '../../shared/context/AuthContext';

const MyFavoritesPage = () => {
  const { user, isAuthenticated, loading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();
  const [favoriteItems, setFavoriteItems] = useState([]); // Detaylı ürün objeleri listesi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      setFavoriteItems([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Bu API çağrısı, kullanıcının favori ID'lerini kullanarak
      // tam ürün detaylarını getirmeli.
      const response = await getMyFavoriteItemsDetails(); // Bu fonksiyonun backend'den populate edilmiş ürünleri getirdiğini varsayıyoruz.
      if (response.success && Array.isArray(response.favorites)) {
        setFavoriteItems(response.favorites);
      } else {
        setError(response.message || 'Favori ürünler alınamadı.');
        setFavoriteItems([]);
      }
    } catch (err) {
      setError(err.message || 'Favori ürünleri yüklerken bir hata oluştu.');
      setFavoriteItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]); // user bağımlılığı, user.favorites değiştiğinde yeniden çekmek için (opsiyonel)

  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated && user) {
        fetchFavorites();
      } else {
        setLoading(false);
        setFavoriteItems([]);
      }
    }
  }, [authLoading, isAuthenticated, user, fetchFavorites]);


  const handleRemoveFromFavorites = async (itemIdToRemove) => {
    if (!user) return;
    try {
      const response = await removeFavoriteItem(itemIdToRemove);
      console.log("Backend response after removing favorite:", response);
      if (response.success) {
        setFavoriteItems(prevItems => prevItems.filter(item => item._id !== itemIdToRemove));
        if (updateUser && response.favorites !== undefined) { // response.favorites backend'den güncel ID listesi olmalı
          updateUser(prevAuthUser => {
            if (!prevAuthUser) return null;
            return {
              ...prevAuthUser,
              favorites: response.favorites
            };
          });
        }
        setSnackbar({ open: true, message: 'Ürün favorilerden çıkarıldı.', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: response.message || 'Ürün favorilerden çıkarılamadı.', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Favoriden çıkarma sırasında bir hata oluştu.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (authLoading || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Favoriler yükleniyor...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Favori ürünlerinizi görmek için lütfen giriş yapın.
        </Alert>
        <Button variant="contained" component={RouterLink} to="/login">
          Giriş Yap
        </Button>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Favori Ürünlerim
      </Typography>

      {/* favoriteItems (ürün objeleri listesi) boşsa mesajı göster */}
      {favoriteItems.length === 0 ? (
        <Paper elevation={2} sx={{ p: {xs: 2, sm: 4}, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Henüz favori ürününüz bulunmamaktadır.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Beğendiğiniz ürünleri favorilerinize ekleyerek buradan kolayca takip edebilirsiniz.
          </Typography>
          <Button variant="outlined" component={RouterLink} to="/">
            Ürünleri Keşfet
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {favoriteItems.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', '&:hover': { boxShadow: 6} }}>
                <IconButton
                    aria-label="favorilerden çıkar"
                      onClick={() => {
        console.log("Button clicked to remove item:", item._id); // Test için log
        handleRemoveFromFavorites(item._id);
    }}
                    size="small"
                    title="Favorilerden Çıkar"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        },
                        color: 'error.main'
                    }}
                >
                    <DeleteOutlineIcon />
                </IconButton>
                <Box
                    component="img"
                    sx={{
                        height: 180,
                        width: '100%',
                        objectFit: 'contain',
                        mb: 1.5,
                        cursor: 'pointer',
                        borderRadius: 1,
                        backgroundColor: 'grey.100'
                    }}
                    alt={item.title}
                    src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/300x200.png?text=Resim+Yok'}
                    onClick={() => navigate(`/takas-teklifi?itemId=${item._id}`)}
                    onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/300x200.png?text=Resim+Yüklenemedi"; }}
                />
                <Typography variant="h6" component="h2" gutterBottom noWrap sx={{ fontWeight: 'medium', fontSize: '1.05rem', cursor: 'pointer', '&:hover': {color: 'primary.main'} }} onClick={() => navigate(`/takas-teklifi?itemId=${item._id}`)}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, minHeight: '40px', maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', mb:1 }}>
                  {item.description || "Açıklama bulunmuyor."}
                </Typography>
                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 1.5 }}> {/* Fiyat için */}
                  {item.price ? `${item.price.toLocaleString('tr-TR')} TL` : "Takas"}
                </Typography>
                <Button
                  variant="contained" // Daha belirgin bir buton
                  size="small"
                  fullWidth
                  onClick={() => navigate(`/takas-teklifi?itemId=${item._id}`)}
                >
                  İncele / Teklif Yap
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyFavoritesPage;