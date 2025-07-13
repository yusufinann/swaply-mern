import React from 'react';
import {
  Container, Typography, Grid, CircularProgress, Alert, Box, Button, Paper, IconButton, Snackbar,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMyFavoritesPage } from './useMyFavoritesPage';

const MyFavoritesPage = () => {
  const {
    favoriteItems,
    loading,
    error,
    isAuthenticated,
    snackbar,
    navigate,
    handleRemoveFromFavorites,
    handleCloseSnackbar,
  } = useMyFavoritesPage();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Favoriler yükleniyor...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Alert severity="info" sx={{ mb: 3 }}>Favori ürünlerinizi görmek için lütfen giriş yapın.</Alert>
        <Button variant="contained" component={RouterLink} to="/login">Giriş Yap</Button>
      </Container>
    );
  }

  if (error) {
    return <Container maxWidth="lg" sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Favori Ürünlerim
      </Typography>

      {!favoriteItems || favoriteItems.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>Henüz favori ürününüz yok.</Typography>
          <Button variant="outlined" component={RouterLink} to="/">Ürünleri Keşfet</Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {favoriteItems.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <IconButton
                    aria-label="favorilerden çıkar"
                    onClick={() => handleRemoveFromFavorites(item._id)}
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, color: 'error.main' }}
                >
                    <DeleteOutlineIcon />
                </IconButton>
                <Box
                    component="img"
                    sx={{ height: 180, width: '100%', objectFit: 'contain', mb: 1.5, cursor: 'pointer' }}
                    alt={item.title}
                    src={item.images?.[0] || 'https://via.placeholder.com/300x200.png?text=Resim+Yok'}
                    onClick={() => navigate(`/takas-teklifi?itemId=${item._id}`)}
                />
                <Typography variant="h6" noWrap sx={{ cursor: 'pointer' }} onClick={() => navigate(`/takas-teklifi?itemId=${item._id}`)}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, my: 1 }}>
                  {item.price ? `${item.price.toLocaleString('tr-TR')} TL` : "Takas İçin Uygun"}
                </Typography>
                <Button variant="contained" size="small" fullWidth onClick={() => navigate(`/takas-teklifi?itemId=${item._id}`)}>
                  İncele
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyFavoritesPage;