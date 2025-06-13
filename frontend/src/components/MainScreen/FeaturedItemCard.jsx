import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Avatar,
  Box,
  IconButton,
  Button,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, // For login form in modal
  Link as MuiLink,
  CircularProgress, // For loading state in modal
  Alert, // For error display in modal
  Grid
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // For modal icon
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';


import { useAuth } from '../../shared/context/AuthContext'; // Adjust path
import { useNavigate } from 'react-router-dom';

const FeaturedItemCard = ({ item, theme, isHovered }) => {
  const { isAuthenticated, login, loading: authLoading, error: authError, clearError: clearAuthError } = useAuth();
  const navigate = useNavigate();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [modalShowPassword, setModalShowPassword] = useState(false);
  const [modalLoginAttempted, setModalLoginAttempted] = useState(false); // To show errors only after submit

  const handleOpenLoginModal = () => {
    if (clearAuthError) clearAuthError(); // Clear any previous auth errors
    setModalLoginAttempted(false); // Reset attempt flag
    setModalEmail(''); // Reset fields
    setModalPassword('');
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
    if (clearAuthError) clearAuthError();
    setModalLoginAttempted(false);
  };

  const handleModalLoginSubmit = async (event) => {
    event.preventDefault();
    setModalLoginAttempted(true);
    if (!modalEmail || !modalPassword) {
      // Basic client-side validation, AuthContext login should handle more
      return;
    }
    const success = await login(modalEmail, modalPassword);
    if (success) {
      handleCloseLoginModal();
      // Optionally, you can trigger the offer action again here or just let the UI update
      console.log('Login successful from modal, user can now make offer.');
    }
  };

  const handleOfferClick = () => {
    if (isAuthenticated) {
      console.log('User is authenticated, proceed with offer for item:', item.name);
      // Example: navigate(`/items/${item.id}/make-offer`);
    } else {
      handleOpenLoginModal();
    }
  };

  const handleChatClick = () => {
    if (isAuthenticated) {
        console.log("User authenticated, opening chat for item:", item.name);
        // navigate(`/chat/${item.userId}/${item.id}`);
    } else {
        handleOpenLoginModal(); // Or a different modal/prompt if desired
    }
  };

  const handleClickShowModalPassword = () => setModalShowPassword((show) => !show);
  const handleMouseDownModalPassword = (event) => event.preventDefault();


  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            '& .item-image': {
              transform: 'scale(1.05)',
            },
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            className="item-image"
            component="img"
            height="220"
            image={item.imageUrl}
            alt={item.name}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              gap: 1,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <IconButton
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                '&:hover': { backgroundColor: 'white' },
              }}
              onClick={() => {
                if (!isAuthenticated) handleOpenLoginModal();
                else console.log('Favorite clicked');
              }}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                '&:hover': { backgroundColor: 'white' },
              }}
               onClick={() => {
                 if (!isAuthenticated) handleOpenLoginModal();
                 else console.log('Share clicked');
              }}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
            <Chip
              icon={<VerifiedIcon />}
              label="Doğrulanmış"
              size="small"
              sx={{
                backgroundColor: 'rgba(76, 175, 80, 0.9)',
                color: 'white',
                fontSize: '0.7rem',
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: 1.3,
              mb: 2,
            }}
          >
            {item.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Chip
              label={item.category}
              size="small"
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.secondary.contrastText,
                fontWeight: 'medium',
              }}
            />
            <Rating value={item.rating || 4.5} size="small" readOnly />
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
            {item.description.substring(0, 80)}{item.description.length > 80 && '...'}
          </Typography>

          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.default,
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              Takas İsteği:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium', mt: 0.5 }}>
              {item.wants.substring(0, 50)}{item.wants.length > 50 && '...'}
            </Typography>
          </Box>
        </CardContent>

        <Box sx={{ p: 3, pt: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                {item.user.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {item.user}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <LocationOnIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {item.location || 'İstanbul'}
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {item.timeAgo || '2 saat önce'}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<SwapHorizIcon />}
              sx={{ borderRadius: 2, fontWeight: 'bold' }}
              onClick={handleOfferClick}
            >
              Teklif Ver
            </Button>
            <IconButton
              color="primary"
              sx={{
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
              }}
              onClick={handleChatClick}
            >
              <ChatBubbleIcon />
            </IconButton>
          </Stack>
        </Box>
      </Card>

      {/* Inline Login Modal */}
      <Dialog
        open={loginModalOpen}
        onClose={handleCloseLoginModal}
        aria-labelledby="login-modal-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="login-modal-title" sx={{ textAlign: 'center', pt: 3 }}>
          <Avatar sx={{ m: 'auto', bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          Giriş Yap
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleModalLoginSubmit} noValidate sx={{ mt: 1 }}>
            {authError && modalLoginAttempted && ( // Show error from AuthContext
              <Alert severity="error" sx={{ mb: 2 }}>
                {authError}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="modal-email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              autoFocus
              value={modalEmail}
              onChange={(e) => setModalEmail(e.target.value)}
              error={modalLoginAttempted && !modalEmail} // Basic validation
              helperText={modalLoginAttempted && !modalEmail ? "E-posta gerekli." : ""}
              disabled={authLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type={modalShowPassword ? 'text' : 'password'}
              id="modal-password"
              autoComplete="current-password"
              value={modalPassword}
              onChange={(e) => setModalPassword(e.target.value)}
              error={modalLoginAttempted && !modalPassword} // Basic validation
              helperText={modalLoginAttempted && !modalPassword ? "Şifre gerekli." : ""}
              disabled={authLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowModalPassword}
                      onMouseDown={handleMouseDownModalPassword}
                      edge="end"
                      disabled={authLoading}
                    >
                      {modalShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={authLoading}
            >
              {authLoading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink
                    component="button"
                    variant="body2"
                    onClick={() => {
                        handleCloseLoginModal();
                        navigate('/sifremi-unuttum'); // Or your forgot password route
                    }}
                    disabled={authLoading}
                >
                  Şifremi Unuttum?
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt:0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Hesabınız yok mu?{' '}
            <MuiLink
              component="button" // Make it act like a button for onClick
              variant="body2"
              onClick={() => {
                handleCloseLoginModal();
                navigate('/register');
              }}
              disabled={authLoading}
            >
              Hemen Kayıt Olun
            </MuiLink>
          </Typography>
          <Button onClick={handleCloseLoginModal} fullWidth disabled={authLoading}>
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

FeaturedItemCard.defaultProps = {
  item: {
    imageUrl: 'https://via.placeholder.com/300x220.png?text=Sample+Item',
    name: 'Örnek Takas Ürünü',
    category: 'Elektronik',
    description: 'Bu harika bir takas ürünüdür. Birçok özelliği vardır ve yeni sahibini beklemektedir. Açıklamanın devamı...',
    wants: 'Benzer değerde bir tablet veya akıllı saat arıyorum.',
    user: 'KullanıcıAdı',
    location: 'Ankara',
    timeAgo: '3 saat önce',
    rating: 4.0
  },
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