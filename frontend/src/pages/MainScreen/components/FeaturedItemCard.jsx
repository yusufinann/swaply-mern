import React, { useState } from 'react';
import {
  Card, CardMedia, CardContent, Typography, Chip, Stack, Avatar, Box, IconButton,
  Button, Rating, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  Link as MuiLink, CircularProgress, Alert, Grid, InputAdornment
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Basic date formatter without date-fns
const formatDateBasic = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    // Simple format: DD.MM.YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch (e) {
    console.warn("Invalid date for formatting:", dateString);
    return 'geçersiz tarih';
  }
};

const FeaturedItemCard = ({ item, theme, isHovered }) => {
  const { isAuthenticated, user: authUser, login, loading: authLoading, error: authError, clearError: clearAuthError } = useAuth();
  const navigate = useNavigate();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [modalShowPassword, setModalShowPassword] = useState(false);
  const [modalLoginAttempted, setModalLoginAttempted] = useState(false);

  const handleOpenLoginModal = () => {
    if (clearAuthError) clearAuthError();
    setModalLoginAttempted(false); setModalEmail(''); setModalPassword('');
    setLoginModalOpen(true);
  };
  const handleCloseLoginModal = () => {
    setLoginModalOpen(false); if (clearAuthError) clearAuthError(); setModalLoginAttempted(false);
  };
  const handleModalLoginSubmit = async (event) => {
    event.preventDefault(); setModalLoginAttempted(true);
    if (!modalEmail || !modalPassword) return;
    const success = await login(modalEmail, modalPassword);
    if (success) { handleCloseLoginModal(); }
  };

  const handleOfferClick = () => {
    if (isAuthenticated) {
      if (authUser && authUser._id === item.owner?._id) {
          alert("Kendi ürününüze teklif veremezsiniz.");
          return;
      }
      navigate(`/takas-teklifi?itemId=${item._id}`);
    } else {
      handleOpenLoginModal();
    }
  };

  const handleChatClick = () => {
    if (isAuthenticated) {
      if (authUser && authUser._id === item.owner?._id) {
          alert("Kendi ürününüz için sohbet başlatamazsınız.");
          return;
      }
      console.log("Navigate to chat for item:", item.title, "with owner:", item.owner?._id);
    } else {
      handleOpenLoginModal();
    }
  };

  const handleClickShowModalPassword = () => setModalShowPassword((show) => !show);
  const handleMouseDownModalPassword = (event) => event.preventDefault();

  const imageUrl = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/300x220.png?text=Resim+Yok';
  const itemName = item.title || 'İsimsiz Ürün';
  const productInfo = item.productInfo || `Bu ${item.category || 'ürün'} takas için harika bir seçenek. Detaylar için tıklayın.`;
  const wantsDescription = item.description || "Belirtilmemiş";
  const ownerName = item.owner ? `${item.owner.firstName} ${item.owner.lastName}` : 'Bilinmeyen Kullanıcı';
  const ownerAvatarText = item.owner?.firstName ? item.owner.firstName.charAt(0).toUpperCase() : '?';
  const ownerAvatarUrl = item.owner?.avatarUrl;
  const itemLocation = item.location || 'Konum Belirtilmemiş';
  const creationDate = formatDateBasic(item.createdAt);
  const displayRating = item.owner?.rating || 0;

  return (
    <>
      <Card
        sx={{
          height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer', position: 'relative', overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            '& .item-image': { transform: 'scale(1.05)' },
          },
        }}
        onClick={() => navigate(`/item/${item._id}`)}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            className="item-image" component="img" height="220"
            image={imageUrl} alt={itemName}
            sx={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
          />
          <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 1, opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            <IconButton size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: 'white' } }}
              onClick={(e) => { e.stopPropagation(); if (!isAuthenticated) handleOpenLoginModal(); else console.log('Favorite clicked'); }}>
              <FavoriteIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: 'white' } }}
              onClick={(e) => { e.stopPropagation(); if (!isAuthenticated) handleOpenLoginModal(); else console.log('Share clicked'); }}>
              <ShareIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: {xs: 2, sm: 3} }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem', lineHeight: 1.3, mb: 1, minHeight: '2.6em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {itemName}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <Chip label={item.category || "Diğer"} size="small" sx={{ backgroundColor: theme.palette.secondary.light, color: theme.palette.secondary.contrastText, fontWeight: 'medium' }}/>
            <Rating value={displayRating} size="small" readOnly precision={0.5} />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5, height: '3em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
             {productInfo.substring(0, 90)}{productInfo.length > 90 && '...'}
          </Typography>
          <Box sx={{ p: 1.5, backgroundColor: theme.palette.background.default, borderRadius: 2, mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              Takas İsteği:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium', mt: 0.5, height: '2.5em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {wantsDescription.substring(0, 70)}{wantsDescription.length > 70 && '...'}
            </Typography>
          </Box>
        </CardContent>

        <Box sx={{ p: {xs: 2, sm: 3}, pt: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar src={ownerAvatarUrl} sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                {!ownerAvatarUrl && ownerAvatarText}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{ownerName}</Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <LocationOnIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">{itemLocation}</Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">{creationDate}</Typography>
            </Stack>
          </Stack>
          <Stack direction={{xs: 'column', sm: 'row'}} spacing={1}>
            <Button fullWidth variant="contained" color="primary" startIcon={<SwapHorizIcon />}
              sx={{ borderRadius: 2, fontWeight: 'bold' }} onClick={(e) => { e.stopPropagation(); handleOfferClick();}}>
              Teklif Ver
            </Button>
            <IconButton color="primary" sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: 2, width: {xs: '100%', sm: 'auto'}, px: {xs: 0, sm: 1.5} }}
              onClick={(e) => { e.stopPropagation(); handleChatClick();}}>
              <ChatBubbleIcon />
            </IconButton>
          </Stack>
        </Box>
      </Card>
      <Dialog open={loginModalOpen} onClose={handleCloseLoginModal} maxWidth="xs" fullWidth aria-labelledby="login-modal-title">
        <DialogTitle id="login-modal-title" sx={{ textAlign: 'center', pt: 3 }}>
          <Avatar sx={{ m: 'auto', bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          Giriş Yap
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleModalLoginSubmit} noValidate sx={{ mt: 1 }}>
            {authError && modalLoginAttempted && (
              <Alert severity="error" sx={{ mb: 2 }}>{authError}</Alert>
            )}
            <TextField margin="normal" required fullWidth id="modal-email" label="E-posta Adresi" name="email" autoComplete="email" autoFocus value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} error={modalLoginAttempted && !modalEmail} helperText={modalLoginAttempted && !modalEmail ? "E-posta gerekli." : ""} disabled={authLoading}/>
            <TextField margin="normal" required fullWidth name="password" label="Şifre" type={modalShowPassword ? 'text' : 'password'} id="modal-password" autoComplete="current-password" value={modalPassword} onChange={(e) => setModalPassword(e.target.value)} error={modalLoginAttempted && !modalPassword} helperText={modalLoginAttempted && !modalPassword ? "Şifre gerekli." : ""} disabled={authLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowModalPassword} onMouseDown={handleMouseDownModalPassword} edge="end" disabled={authLoading}>
                      {modalShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }} disabled={authLoading}>
              {authLoading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component="button" variant="body2" onClick={() => { handleCloseLoginModal(); navigate('/sifremi-unuttum');}} disabled={authLoading}>
                  Şifremi Unuttum?
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt:0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Hesabınız yok mu?{' '}
            <MuiLink component="button" variant="body2" onClick={() => { handleCloseLoginModal(); navigate('/register');}} disabled={authLoading}>
              Hemen Kayıt Olun
            </MuiLink>
          </Typography>
          <Button onClick={handleCloseLoginModal} fullWidth disabled={authLoading}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

FeaturedItemCard.defaultProps = {
  theme: {
    palette: {
      primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0', contrastText: '#fff' },
      secondary: { main: '#9c27b0', light: '#ba68c8', dark: '#7b1fa2', contrastText: '#fff' },
      background: { default: '#f5f5f5', paper: '#ffffff' },
      text: { primary: 'rgba(0, 0, 0, 0.87)', secondary: 'rgba(0, 0, 0, 0.6)' }
    }
  },
  isHovered: false,
};

export default FeaturedItemCard;