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
  Grid
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Style';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useTheme } from '@mui/material/styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getItemById as getItemByIdApi } from '../../services/itemService';
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
  const { user: authUser } = useAuth();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const handleCloseImageDialog = () => {
    setSelectedImage(null);
  };

  if (!itemId && !loading) {
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
    if (isOwner) {
      alert("Kendi ürününüze teklif yapamazsınız.");
      return;
    }
    console.log("Make offer for item:", item._id);
    alert(`"${item.title}" için takas teklifi oluşturma süreci başlayacak.`);
  };

  const mainImage = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/600x400.png?text=Resim+Yok';
  const otherImages = item.images && item.images.length > 1 ? item.images.slice(1) : [];

  const productRatingValue = item.rating || 4.0;
  const reviewCount = item.reviewCount || 71743;
  const qaCount = item.qaCount || 4438;
  const popularityText = item.popularityText || "Popüler ürün! Son 24 saatte 10,8B kişi görüntüledi!";
  const itemPrice = item.price || "136 TL";

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

          <Box
            sx={{
              width: { xs: '100%', md: '60%' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link href="#" underline="hover" sx={{ typography: 'caption', color: 'warning.dark', mb: 0.5 }}>
              {item.category ? `${item.category} kategorisinde` : 'Kategori Bilgisi'}
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

            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.dark', mb: 2 }}>
              {itemPrice}
            </Typography>

            <Stack direction={{xs: 'column', sm: 'row'}} spacing={1.5} sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                onClick={() => alert('Bu ürün için "Şimdi Al" benzeri bir işlem (belki favorilere ekle?)')}
                sx={{ flexGrow: 1, borderColor: 'warning.main', color: 'warning.main', '&:hover': { borderColor: 'warning.dark', backgroundColor: 'rgba(255, 152, 0, 0.08)'} }}
              >
                Favorilere Ekle
              </Button>
              {!isOwner && (
                  <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  fullWidth={false}
                  startIcon={<SwapHorizIcon />}
                  onClick={handleMakeOffer}
                  sx={{ flexGrow: 1.5, fontWeight: 'bold', py: 1.2, textTransform: 'none', fontSize: '1rem', backgroundColor: 'warning.main', '&:hover': {backgroundColor: 'warning.dark'} }}
                  >
                  Bu Ürüne Teklif Yap
                  </Button>
              )}
              <IconButton aria-label="add to wishlist" sx={{borderColor: theme.palette.grey[400], borderWidth: 1, borderStyle: 'solid', borderRadius: theme.shape.borderRadius}}>
                  <FavoriteBorderIcon />
              </IconButton>
            </Stack>
            {isOwner && (
                 <Alert severity="info" variant="outlined" sx={{mb: 2}}>Bu sizin kendi ürününüz.</Alert>
            )}

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
                      Tahmini Teslim: <Link href="#" underline="hover" onClick={(e) => { e.preventDefault(); alert('Konum seçme özelliği'); }}>Konum Seçin</Link> adresinize göre değişiklik gösterebilir.
                      </Typography>
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'success.light', color: 'success.darker', p: 1, borderRadius: 1, typography: 'caption' }}>
                      <CheckCircleIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                      Daha Hızlı Teslimat yapan satıcı var!
                  </Box>
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
                  {['Form: Sıvı', `Hacim: ${item.volume || '750 ml'}`, 'Ek Özellik: Promosyonlu', `Menşei: ${item.origin || 'TR'}`].map(feature => (
                      <Grid item xs={6} sm={3} key={feature}>
                          <Paper variant="outlined" sx={{p: 1, textAlign: 'center', height: '100%'}}>
                              <Typography variant="caption" display="block" color="text.secondary">{feature.split(':')[0]}</Typography>
                              <Typography variant="body2" fontWeight="medium">{feature.split(':')[1].trim()}</Typography>
                          </Paper>
                      </Grid>
                  ))}
              </Grid>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
              Takas İsteği / Açıklama:
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto', }}>
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
                Konum: {item.location}
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
    </Box>
  );
};

export default SwapOfferPage;