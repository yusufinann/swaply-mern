import React, { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
  Chip,
  Avatar,
  Paper,
  Rating,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Divider,
  Link,
  Grid,
  Snackbar, // Snackbar için eklendi
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Dolu kalp ikonu eklendi
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useTheme } from '@mui/material/styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getItemById as getItemByIdApi } from '../../services/itemService';
// Favori servis fonksiyonlarını import et
import { addFavoriteItem, removeFavoriteItem } from '../../services/userService'; // Veya userService/favoriteService
import { useAuth } from '../../shared/context/AuthContext';


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

const SwapOfferPage = () => {
  const { id: paramId } = useParams();
  const query = useQuery();
  const queryItemId = query.get('itemId');
  const itemId = paramId || queryItemId;

  const theme = useTheme();
  const navigate = useNavigate();
  // AuthContext'ten updateUserFavorites fonksiyonunu da almamız gerekebilir.
  // Bu fonksiyon, backend'den dönen güncel favori listesiyle context'teki kullanıcı bilgisini günceller.
  // Eğer AuthContext'te böyle bir fonksiyon yoksa, eklemeniz iyi olur.
  // Şimdilik sadece user objesini alıyorum, ancak context güncellemesi idealdir.
  const { user: authUser, updateUser: updateAuthUserContext } = useAuth(); // updateUser örnektir, sizinki farklı olabilir

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Favori state'leri
  const [isFavorited, setIsFavorited] = useState(false);
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
            // Kullanıcı giriş yapmışsa ve kullanıcının favorileri varsa, bu ürün favorilerde mi kontrol et
            if (authUser && authUser.favorites && response.data._id) {
              setIsFavorited(authUser.favorites.includes(response.data._id));
            }
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
  }, [itemId, authUser]); // authUser'ı dependency array'e ekle, login/logout sonrası kontrol için

  // Bu useEffect, item yüklendikten sonra veya authUser değiştiğinde favori durumunu ayarlar.
  useEffect(() => {
    if (authUser && authUser.favorites && item && item._id) {
        setIsFavorited(authUser.favorites.includes(item._id));
    } else {
        setIsFavorited(false); // Kullanıcı yoksa, favorileri yoksa veya item yoksa favori değil
    }
  }, [authUser, item]);


  const handleToggleFavorite = async () => {
    if (!authUser) {
      setSnackbar({ open: true, message: 'Favorilere eklemek için giriş yapmalısınız.', severity: 'info' });
      // navigate('/login'); // İsteğe bağlı olarak login sayfasına yönlendir
      return;
    }
    if (!item || !item._id) return;

    setFavoriteLoading(true);
    try {
      let response;
      if (isFavorited) {
        response = await removeFavoriteItem(item._id);
        setSnackbar({ open: true, message: response.message || 'Ürün favorilerden çıkarıldı!', severity: 'success' });
      } else {
        response = await addFavoriteItem(item._id);
        setSnackbar({ open: true, message: response.message || 'Ürün favorilere eklendi!', severity: 'success' });
      }

      if (response.success) {
        setIsFavorited(!isFavorited);
        // AuthContext'teki kullanıcı bilgisini güncelle (çok önemli!)
        // Backend genelde güncel favori listesini döner.
        if (response.favorites && updateAuthUserContext) { // updateAuthUserContext AuthContext'ten gelmeli
            // Örnek: updateAuthUserContext(prevUser => ({...prevUser, favorites: response.favorites}));
            // Veya daha direkt:
            // const updatedUser = { ...authUser, favorites: response.favorites };
            // login(updatedUser); // Eğer login fonksiyonunuz setUser'ı da yapıyorsa.
            // En iyisi AuthContext'e özel bir updateUserFavorites fonksiyonu eklemek.
            // Şimdilik, eğer AuthContext'te user.favorites direkt güncellenmiyorsa,
            // sayfa yenilenene kadar UI güncel kalmayabilir.
            // Bu kısım AuthContext'inizin yapısına göre uyarlanmalı.
             if (updateAuthUserContext && authUser) { // updateAuthUserContext -> AuthContext'ten gelen bir fonksiyon olmalı
                const updatedUserInfo = { ...authUser, favorites: response.favorites };
                updateAuthUserContext(updatedUserInfo); // Bu fonksiyon AuthContext'te user state'ini güncellemeli
            }
        }
      } else {
        setSnackbar({ open: true, message: response.message || 'İşlem başarısız.', severity: 'error' });
      }
    } catch (err) {
      console.error("Favori işlem hatası:", err);
      setSnackbar({ open: true, message: err.message || "Favori işlemi sırasında bir hata oluştu.", severity: 'error' });
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

  if (!itemId && !loading && !item) { // !item eklendi
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


  const isOwner = authUser && item.owner?._id === authUser._id;

  const handleMakeOffer = () => {
    if (!authUser) {
      setSnackbar({ open: true, message: 'Teklif yapmak için giriş yapmalısınız.', severity: 'info' });
      return;
    }
    if (isOwner) {
      setSnackbar({ open: true, message: 'Kendi ürününüze teklif yapamazsınız.', severity: 'warning' });
      return;
    }
    console.log("Make offer for item:", item._id);
    setSnackbar({ open: true, message: `"${item.title}" için takas teklifi oluşturma süreci başlayacak.`, severity: 'info' });
  };

  const mainImage = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/600x400.png?text=Resim+Yok';
  const otherImages = item.images && item.images.length > 1 ? item.images.slice(1) : [];

  const productRatingValue = item.rating || 4.0;
  const reviewCount = item.reviewCount || 0; // Varsayılan 0
  const qaCount = item.qaCount || 0; // Varsayılan 0
  const popularityText = item.popularityText || "Popüler ürün!";


  return (
    <Box
      sx={{
        width: '100%',
        mx: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 },overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 4 },
            width: '100%',
          }}
        >
          {/* IMAGE BOX */}
          <Box
            sx={{
              width: { xs: '100%', md: '40%' },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: 2,
                mb: otherImages.length > 0 ? 2 : 0,
                aspectRatio: '1/1',
                backgroundColor: theme.palette.grey[200],
              }}
              onClick={() => handleImageClick(mainImage)}
            >
              <img
                src={mainImage}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
              {item.isBestSeller && (
                <Chip
                  label="EN ÇOK SATAN"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    backgroundColor: 'warning.main',
                    color: 'common.white',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    height: 'auto',
                    '& .MuiChip-label': {
                      padding: '4px 8px',
                      fontSize: '0.8rem'
                    }
                  }}
                />
              )}
            </Box>
            {otherImages.length > 0 && (
              <ImageList sx={{ width: '100%', height: 'auto', mt: 1 }} cols={Math.min(otherImages.length, 4)} rowHeight={100} gap={8}>
                {otherImages.map((img, index) => (
                  <ImageListItem key={index} sx={{ cursor: 'pointer', borderRadius: 1, overflow: 'hidden', backgroundColor: theme.palette.grey[200], border: `1px solid ${theme.palette.grey[300]}` }} onClick={() => handleImageClick(img)}>
                    <img
                      srcSet={`${img}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                      src={`${img}?w=100&h=100&fit=crop&auto=format`}
                      alt={`${item.title} - ${index + 2}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Box>

          {/* DETAILS BOX */}
          <Box
            sx={{
              width: { xs: '100%', md: '60%' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link href="#" underline="hover" sx={{ typography: 'caption', color: 'text.secondary', mb: 0.5 }}> {/* warning.dark'tan text.secondary'ye */}
              {item.category?.name || item.category || 'Kategori Bilgisi'} {/* item.category bir obje ise .name alınabilir */}
            </Link>

            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', lineHeight: 1.3, mb: 1 }}>
              {item.title || 'İsimsiz Ürün'}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <Rating name="product-rating" value={productRatingValue} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">{productRatingValue.toFixed(1)}</Typography>
              <Link href="#" underline="hover" sx={{ typography: 'body2', color: 'text.primary' }}>
                {reviewCount.toLocaleString('tr-TR')} Değerlendirme
              </Link>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }}/>
              <Link href="#" underline="hover" sx={{ typography: 'body2', color: 'text.primary' }}>
                {qaCount.toLocaleString('tr-TR')} Soru & Cevap
              </Link>
            </Stack>

            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <InfoOutlinedIcon fontSize="inherit" sx={{ mr: 0.5, color: 'primary.main' }} /> {popularityText}
            </Typography>

            {/* Fiyat veya Takas Değeri Alanı - Eğer varsa */}
            {/* <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.dark', mb: 2 }}>
                {item.price ? `${item.price.toLocaleString('tr-TR')} TL` : 'Takas Değeri Belirtilmemiş'}
            </Typography> */}
             <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: theme.palette.grey[700] }}>
                {item.description || 'Durumu belirtilmemiş.'} {/* Ürün durumu için */}
            </Typography>


            <Stack direction={{xs: 'column', sm: 'row'}} spacing={1.5} sx={{ mb: 3 }}>
              {/* FAVORİ BUTONU */}
              {!isOwner && ( // Sadece ürün sahibi değilse favori butonu gösterilir
                <Button
                  variant={isFavorited ? "contained" : "outlined"}
                  onClick={handleToggleFavorite}
                  disabled={favoriteLoading || !authUser} // Kullanıcı yoksa da disable
                  startIcon={
                    favoriteLoading ? <CircularProgress size={20} color="inherit" /> :
                    isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
                  }
                  sx={{
                    flexGrow: 1,
                    borderColor: authUser ? (isFavorited ? 'error.main' : 'grey.500') : 'grey.400',
                    color: authUser ? (isFavorited ? 'common.white' : 'error.main') : 'text.disabled',
                    backgroundColor: authUser && isFavorited ? 'error.main' : 'transparent',
                    '&:hover': {
                      borderColor: authUser ? 'error.dark' : 'grey.500',
                      backgroundColor: authUser ? (isFavorited ? 'error.dark' : 'rgba(220, 53, 69, 0.08)') : 'transparent',
                    },
                    cursor: !authUser ? 'not-allowed' : 'pointer'
                  }}
                >
                  {favoriteLoading
                    ? (isFavorited ? 'Çıkarılıyor...' : 'Ekleniyor...')
                    : (isFavorited ? 'Favorilerden Çıkar' : (authUser ? 'Favorilere Ekle' : 'Giriş Yapın'))
                  }
                </Button>
              )}

              {/* TEKLİF YAP BUTONU */}
              {!isOwner && (
                  <Button
                  variant="contained"
                  color="warning"
                  // size="large" // Butonların boyutu uyumlu olsun diye medium (default)
                  fullWidth={false}
                  startIcon={<SwapHorizIcon />}
                  onClick={handleMakeOffer}
                  disabled={!authUser} // Kullanıcı yoksa disable
                  sx={{
                    flexGrow: 1.5,
                    fontWeight: 'bold',
                    // py: 1.2, // Yükseklik diğer butonla aynı olsun diye kaldırıldı
                    textTransform: 'none',
                    fontSize: '0.9rem', // Diğer butonla benzer font boyutu
                    backgroundColor: 'warning.main',
                    '&:hover': {backgroundColor: 'warning.dark'},
                    cursor: !authUser ? 'not-allowed' : 'pointer'
                  }}
                  >
                  Bu Ürüne Teklif Yap
                  </Button>
              )}
              {/* Eski IconButton kaldırıldı, yerine yukarıdaki butonlar geldi. */}
            </Stack>

            {isOwner && (
                 <Alert severity="info" variant="outlined" sx={{mb: 2}}>Bu sizin kendi ürününüz.</Alert>
            )}

            {/* ... (Kargo, Ödeme, Özellikler, Açıklama, Etiketler, Tarih, Konum, Sahip bilgileri...) ... */}
            <Box sx={{ backgroundColor: theme.palette.grey[50], p: 2, borderRadius: 1, mb: 2 }}>
              <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                      <LocalShippingIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                      Tahmini Kargoya Teslim: <Typography component="span" sx={{fontWeight: 'bold'}}>2 gün içinde</Typography>
                      </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                      <LocationOnIcon fontSize="small" color="action" sx={{mt:0.2}}/>
                      <Typography variant="body2" color="text.secondary">
                      Tahmini Teslim: <Link href="#" underline="hover" onClick={(e) => { e.preventDefault(); setSnackbar({open: true, message:'Konum seçme özelliği yakında!', severity: 'info'}); }}>Konum Seçin</Link> adresinize göre değişiklik gösterebilir.
                      </Typography>
                  </Stack>
                  {item.fastDeliveryAvailable && <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'success.light', color: 'success.darker', p: 1, borderRadius: 1, typography: 'caption' }}>
                      <CheckCircleIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                      Daha Hızlı Teslimat yapan satıcı var!
                  </Box>}
              </Stack>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>Ödeme Seçenekleri:</Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{backgroundColor: theme.palette.grey[100], p:1, borderRadius:1}}>
                  <CreditCardIcon fontSize="small" color="primary" />
                  <Typography variant="body2">12 Aya Varan Taksit Fırsatı (Aylık 14,62 TL'den başlayan)</Typography>
              </Stack>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>Öne Çıkan Özellikler:</Typography>
              <Grid container spacing={1}>
                  {[{label: 'Form', value: 'Sıvı'}, {label: 'Hacim', value: item.volume || '750 ml'}, {label:'Ek Özellik', value: 'Promosyonlu'}, {label: 'Menşei', value: item.originCountry || item.origin || 'TR'}].map(feature => ( // item.originCountry eklendi
                      <Grid item xs={6} sm={3} key={feature.label}>
                          <Paper variant="outlined" sx={{p: 1, textAlign: 'center', height: '100%'}}>
                              <Typography variant="caption" display="block" color="text.secondary">{feature.label}</Typography>
                              <Typography variant="body2" fontWeight="medium">{feature.value}</Typography>
                          </Paper>
                      </Grid>
                  ))}
              </Grid>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
              Takas İsteği / Açıklama:
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto', border: `1px solid ${theme.palette.grey[300]}`, p:1, borderRadius:1 }}>
              {item.description || 'Açıklama belirtilmemiş.'}
            </Typography>

            {item.tags && item.tags.length > 0 && (
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Etiketler:</Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {item.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            )}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, mt:1 }}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                Yüklenme Tarihi: {formatDateBasic(item.createdAt)}
                </Typography>
            </Stack>
            {item.location && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                Konum: {typeof item.location === 'object' ? item.location.city : item.location} {/* item.location obje ise city alınabilir */}
                </Typography>
            </Stack>
            )}
            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
              Ürün Sahibi:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: item.owner?._id ? 'pointer' : 'default' }} onClick={() => item.owner?._id && navigate(`/profil/${item.owner._id}`)}>
              <Avatar
                src={item.owner?.avatarUrl}
                sx={{ width: 48, height: 48, mr: 2, bgcolor: theme.palette.primary.light }}
              >
                {!item.owner?.avatarUrl && (item.owner?.firstName ? item.owner.firstName.charAt(0).toUpperCase() : <AccountCircleIcon />)}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {item.owner ? `${item.owner.firstName} ${item.owner.lastName}` : 'Bilinmeyen Kullanıcı'}
                </Typography>
                {item.owner && <Rating value={item.owner.rating || 0} precision={0.5} readOnly size="small" />}
              </Box>
            </Box>

          </Box>
        </Box>
      </Paper>

      {/* IMAGE DIALOG */}
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

      {/* TEKLİF OLUŞTURMA BÖLÜMÜ */}
      <Box sx={{ mt: 4, p:3, border: '1px dashed grey', borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h6">Teklifinizi Oluşturun</Typography>
        <Typography color="text.secondary" sx={{mb: 2}}>
            (Burada, bu ürün karşılığında kendi ürünlerinizi seçip teklifinizi tamamlayacağınız bölüm yer alacak.)
        </Typography>
        <Button variant="contained" disabled>Teklifi Gönder (Yakında)</Button>
      </Box>

      {/* SNACKBAR */}
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