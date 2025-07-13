import React from 'react';
import {
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  Paper,
  Rating,
  Stack,
  Divider,
  Link,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTheme } from '@mui/material/styles';

const ProductDetailsInfo = ({ item, isOwner, isFavorited, favoriteLoading, onToggleFavorite, onMakeOffer, onOwnerClick, formatDate, onLocationClick }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: { xs: '100%', md: '60%' }, display: 'flex', flexDirection: 'column' }}>
      <Link href="#" underline="hover" sx={{ typography: 'caption', color: 'text.secondary', mb: 0.5 }}>
        {item.category?.name || item.category || 'Kategori Bilgisi'}
      </Link>

      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', lineHeight: 1.3, mb: 1 }}>
        {item.title || 'İsimsiz Ürün'}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
        <Rating name="product-rating" value={item.rating || 4.0} precision={0.1} readOnly size="small" />
        <Typography variant="body2" color="text.secondary">{(item.rating || 4.0).toFixed(1)}</Typography>
        <Link href="#" underline="hover" sx={{ typography: 'body2', color: 'text.primary' }}>
          {(item.reviewCount || 0).toLocaleString('tr-TR')} Değerlendirme
        </Link>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }}/>
        <Link href="#" underline="hover" sx={{ typography: 'body2', color: 'text.primary' }}>
          {(item.qaCount || 0).toLocaleString('tr-TR')} Soru & Cevap
        </Link>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <InfoOutlinedIcon fontSize="inherit" sx={{ mr: 0.5, color: 'primary.main' }} /> {item.popularityText || "Popüler ürün!"}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: theme.palette.grey[700] }}>
          {item.condition || 'Durumu belirtilmemiş.'}
      </Typography>

      <Stack direction={{xs: 'column', sm: 'row'}} spacing={1.5} sx={{ mb: 3 }}>
        {!isOwner && (
          <Button
            variant={isFavorited ? "contained" : "outlined"}
            onClick={onToggleFavorite}
            disabled={favoriteLoading}
            startIcon={
              favoriteLoading ? <CircularProgress size={20} color="inherit" /> :
              isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
            }
            sx={{
              flexGrow: 1,
              borderColor: isFavorited ? 'error.main' : 'grey.500',
              color: isFavorited ? 'common.white' : 'error.main',
              backgroundColor: isFavorited ? 'error.main' : 'transparent',
              '&:hover': {
                borderColor: 'error.dark',
                backgroundColor: isFavorited ? 'error.dark' : 'rgba(220, 53, 69, 0.08)',
              },
            }}
          >
            {favoriteLoading
              ? (isFavorited ? 'Çıkarılıyor...' : 'Ekleniyor...')
              : (isFavorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle')
            }
          </Button>
        )}

        {!isOwner && (
            <Button
            variant="contained"
            color="warning"
            fullWidth={false}
            startIcon={<SwapHorizIcon />}
            onClick={onMakeOffer}
            sx={{
              flexGrow: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '0.9rem',
              backgroundColor: 'warning.main',
              '&:hover': {backgroundColor: 'warning.dark'},
            }}
            >
            Bu Ürüne Teklif Yap
            </Button>
        )}
      </Stack>

      {isOwner && (
           <Alert severity="info" variant="outlined" sx={{mb: 2}}>Bu sizin kendi ürününüz.</Alert>
      )}

      {/* Shipping and Delivery */}
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
              Tahmini Teslim: <Link href="#" underline="hover" onClick={onLocationClick}>Konum Seçin</Link> adresinize göre değişiklik gösterebilir.
            </Typography>
          </Stack>
          {item.fastDeliveryAvailable && <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'success.light', color: 'success.darker', p: 1, borderRadius: 1, typography: 'caption' }}>
            <CheckCircleIcon fontSize="inherit" sx={{ mr: 0.5 }} />
            Daha Hızlı Teslimat yapan satıcı var!
          </Box>}
        </Stack>
      </Box>

      {/* Payment Options, Features, Description etc. */}
      {/* ... Diğer tüm detaylar buraya aynı şekilde devam eder ... */}
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
              {[{label: 'Form', value: 'Sıvı'}, {label: 'Hacim', value: item.volume || '750 ml'}, {label:'Ek Özellik', value: 'Promosyonlu'}, {label: 'Menşei', value: item.originCountry || item.origin || 'TR'}].map(feature => (
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
          Yüklenme Tarihi: {formatDate(item.createdAt)}
        </Typography>
      </Stack>

      {item.location && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            Konum: {typeof item.location === 'object' ? item.location.city : item.location}
          </Typography>
        </Stack>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
        Ürün Sahibi:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: item.owner?._id ? 'pointer' : 'default' }} onClick={onOwnerClick}>
        <Avatar src={item.owner?.avatarUrl} sx={{ width: 48, height: 48, mr: 2, bgcolor: theme.palette.primary.light }}>
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
  );
};

export default ProductDetailsInfo;