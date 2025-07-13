// src/pages/SwapOfferPage/index.jsx (GÜNCELLENMİŞ HALİ)

import React from 'react';
import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSwapOfferPage } from './useSwapOfferPage';
import ProductImageGallery from './components/ProductImageGallery';
import ProductDetailsInfo from './components/ProductDetailsInfo';

const SwapOfferPage = () => {
  const {
    itemId,
    item,
    loading,
    error,
    selectedImage,
    isFavorited,
    favoriteLoading,
    snackbar,
    setSnackbar,
    isOwner,
    mainImage,
    otherImages,
    navigate,
    handleToggleFavorite,
    handleImageClick,
    handleCloseImageDialog,
    handleCloseSnackbar,
    handleMakeOffer,
    formatDateBasic,
  } = useSwapOfferPage();

  if (!itemId && !loading && !item) {
    return (
      <Box sx={{ maxWidth: 'md', mx: 'auto', py: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Takas Teklifi Oluştur
        </Typography>
        <Typography color="text.secondary">
          Takas yapmak istediğiniz ürünü seçin veya arayın.
        </Typography>
        <Box sx={{ mt: 3, p: 3, border: '1px dashed grey', borderRadius: 2 }}>
          <Typography variant="subtitle1">
            (Burada ürün arama veya kullanıcının kendi ürünlerini listeleme bölümü yer alacak)
          </Typography>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Ürün detayları yükleniyor...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!item) {
     return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Alert severity="warning">Ürün bulunamadı veya yüklenemedi.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 4 }, width: '100%' }}>
          
          <ProductImageGallery
            mainImage={mainImage}
            otherImages={otherImages}
            itemTitle={item.title}
            isBestSeller={item.isBestSeller}
            onImageClick={handleImageClick}
          />
          
          <ProductDetailsInfo
            item={item}
            isOwner={isOwner}
            isFavorited={isFavorited}
            favoriteLoading={favoriteLoading}
            onToggleFavorite={handleToggleFavorite}
            onMakeOffer={handleMakeOffer}
            onOwnerClick={() => item.owner?._id && navigate(`/profil/${item.owner._id}`)}
            formatDate={formatDateBasic}
            onLocationClick={(e) => { e.preventDefault(); setSnackbar({open: true, message:'Konum seçme özelliği yakında!', severity: 'info'}); }}
          />

        </Box>
      </Paper>

      {/* Dialog ve Snackbar gibi sayfa geneli bileşenler burada kalabilir */}
      <Dialog open={Boolean(selectedImage)} onClose={handleCloseImageDialog} maxWidth="lg" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseImageDialog}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'common.white', backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': {backgroundColor: 'rgba(0,0,0,0.7)'} }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img src={selectedImage} alt="Zoomed item" style={{ maxHeight: '90vh', maxWidth: '100%', objectFit: 'contain' }} />
          )}
        </DialogContent>
      </Dialog>
      
      <Box sx={{ mt: 4, p:3, border: '1px dashed grey', borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h6">Teklifinizi Oluşturun</Typography>
        <Typography color="text.secondary" sx={{mb: 2}}>
            (Burada, bu ürün karşılığında kendi ürünlerinizi seçip teklifinizi tamamlayacağınız bölüm yer alacak.)
        </Typography>
        <Button variant="contained" disabled>Teklifi Gönder (Yakında)</Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SwapOfferPage;