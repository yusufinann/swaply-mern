// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import { Cached, Logout, AccountCircle, Settings } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // useLocation kaldırıldı
import { useAuth } from '../shared/context/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation(); // Mevcut yolu almak için - KALDIRILDI
  // const isPublicHomePage = location.pathname === '/'; // Public ana sayfada mıyız? - KALDIRILDI

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    if (user && user._id) {
      navigate(`/profil/${user._id}`);
    } else {
      navigate('/profil'); // Genel bir profil yolu veya hata yönetimi
    }
  };

  const handleSettings = () => {
    handleCloseUserMenu();
    navigate('/ayarlar');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        {/* Logo/Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Cached sx={{ mr: 1, color: '#4caf50', fontSize: '2.5rem' }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
              Takasta
            </Typography>
          </RouterLink>
        </Box>

        {/* Navigation Links (Sadece giriş yapılmışsa göster) */}
        {isAuthenticated && ( // !isPublicHomePage koşulu kaldırıldı
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/ana-sayfa" // MainScreen'e yönlendirme
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            >
              Ana Sayfa
            </Button>
            <Button
              component={RouterLink}
              to="/urun-yukle"
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            >
              Ürün Yükle
            </Button>
            <Button
              component={RouterLink}
              to="/takas-teklifi"
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            >
              Takas Teklifi
            </Button>
            <Button
              component={RouterLink}
              to="/teklifleri-yonet"
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            >
              Tekliflerim
            </Button>
          </Box>
        )}

        {/* Auth Buttons / User Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 /* Nav linkleri varsa biraz boşluk */ }}>
          {isAuthenticated ? ( // Koşul sadece isAuthenticated olarak değiştirildi
            // Giriş yapılmışsa kullanıcı menüsü
            <>
              <IconButton
                onClick={handleClickUserMenu}
                size="small"
                sx={{ ml: 0 }} 
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: theme.palette.secondary.main }}>
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.firstName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    user.firstName?.charAt(0).toUpperCase() || <AccountCircle />
                  )}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleProfile}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  Profilim
                </MenuItem>
                <MenuItem onClick={handleSettings}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Ayarlar
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Çıkış Yap
                </MenuItem>
              </Menu>
            </>
          ) : ( 
            // Giriş yapılmamışsa Giriş/Kayıt butonları
            <>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.7)',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Giriş Yap
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                sx={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: '#388e3c',
                  }
                }}
              >
                Kayıt Ol
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;