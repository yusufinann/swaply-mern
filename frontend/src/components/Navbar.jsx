// src/components/layout/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import { Logout, AccountCircle, Settings } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { categories as allCategoriesData } from '../constants/datas';

const NAVBAR_TOOLBAR_HEIGHT = 64;
const CATEGORY_ICON_BAR_HEIGHT = 60;

const categoryBackgroundColors = [
  '#fdecea', '#e6f4ff', '#e6f7f0', '#fffbeb', '#f3e8fd',
  '#fff3e0', '#e0fcff', '#f1f8e9', '#ffebee', '#e3f2fd',
  '#e8f5e9', '#fffde7',
];

const Navbar = () => {
  const theme = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

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
    navigate('/');
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    if (user && user._id) {
      navigate(`/profil/${user._id}`);
    } else {
      navigate('/profil');
    }
  };

  const handleSettings = () => {
    handleCloseUserMenu();
    navigate('/ayarlar');
  };

  const handleCategorySelectInNavbar = (category) => {
    navigate(`/category/${category.id}`);
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{
        minHeight: `${NAVBAR_TOOLBAR_HEIGHT}px!important`,
        height: `${NAVBAR_TOOLBAR_HEIGHT}px!important`,
        backgroundColor: theme.palette.primary.main,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <SwapHorizIcon sx={{ mr: 1, color: '#4caf50', fontSize: '2.5rem' }}/>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
              Takasta
            </Typography>
          </RouterLink>
        </Box>

        {isAuthenticated && (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Button component={RouterLink} to="/" sx={{ textTransform: 'none', fontSize: '1rem', color: 'white' }}>Ana Sayfa</Button>
            <Button component={RouterLink} to="/urun-yukle" sx={{ textTransform: 'none', fontSize: '1rem', color: 'white' }}>Ürün Yükle</Button>
            <Button component={RouterLink} to="/takas-teklifi" sx={{ textTransform: 'none', fontSize: '1rem', color: 'white' }}>Takas Teklifi</Button>
            <Button component={RouterLink} to="/teklifleri-yonet" sx={{ textTransform: 'none', fontSize: '1rem', color: 'white' }}>Tekliflerim</Button>
            <Button component={RouterLink} to="/takasta" sx={{ textTransform: 'none', fontSize: '1rem', color: 'white' }}>Takastalarım</Button>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: isAuthenticated ? 2 : 0 }}>
          {isAuthenticated ? (
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
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.firstName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    user?.firstName?.charAt(0).toUpperCase() || <AccountCircle />
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
                    '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
                    '&:before': {
                      content: '""', display: 'block', position: 'absolute', top: 0, right: 14,
                      width: 10, height: 10, bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">{user?.firstName} {user?.lastName}</Typography>
                  <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleProfile}><ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>Profilim</MenuItem>
                <MenuItem onClick={handleSettings}><ListItemIcon><Settings fontSize="small" /></ListItemIcon>Ayarlar</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}><ListItemIcon><Logout fontSize="small" /></ListItemIcon>Çıkış Yap</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)', textTransform: 'none', fontSize: '0.9rem', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)'}}}>Giriş Yap</Button>
              <Button component={RouterLink} to="/register" variant="contained" sx={{ backgroundColor: '#4caf50', color: 'white', textTransform: 'none', fontSize: '0.9rem', '&:hover': { backgroundColor: '#388e3c' }}}>Kayıt Ol</Button>
            </>
          )}
        </Box>
      </Toolbar>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          height: `${CATEGORY_ICON_BAR_HEIGHT}px`,
          backgroundColor: theme.palette.background.paper,
          overflowX: 'auto',
          '&::-webkit-scrollbar': { height: '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)',
            borderRadius: '3px',
          },
        }}
      >
        {allCategoriesData.map((category, index) => (
          <Button
            key={category.id}
            onClick={() => handleCategorySelectInNavbar(category)}
            title={category.title}
            variant="text"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: theme.spacing(0.5, 0.25),
              minWidth: 0,
              height: '100%',
              borderRadius: 0,
              color: theme.palette.text.primary,
              backgroundColor: categoryBackgroundColors[index % categoryBackgroundColors.length],
              textTransform: 'none',
              transition: 'background-color 0.2s, color 0.2s, transform 0.15s ease-out',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.primary.main,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 8px -2px ${theme.palette.action.disabled}`,
              },
              '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                margin: 0,
              },
              '& svg': {
                fontSize: '1.9rem',
              },
            }}
          >
            {category.icon}
          </Button>
        ))}
      </Box>
    </AppBar>
  );
};

export default Navbar;