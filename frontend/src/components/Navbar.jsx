// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { Cached } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        {/* Logo/Brand as a Link to Homepage */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Cached sx={{ mr: 1, color: '#4caf50', fontSize: '4.0rem' }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              Second-Hand
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', ml: 1 }}>
              Swap Marketplace
            </Typography>
          </RouterLink>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            component={RouterLink}
            to="/urun-yukle"
            color="inherit"
            sx={{ textTransform: 'none', fontSize: '16px' }}
          >
            Ürün Yükle
          </Button>
          <Button
            component={RouterLink}
            to="/takas-teklifi"
            color="inherit"
            sx={{ textTransform: 'none', fontSize: '16px' }}
          >
            Takas Teklifi
          </Button>
          <Button
            component={RouterLink}
            to="/teklifleri-yonet"
            color="inherit"
            sx={{ textTransform: 'none', fontSize: '16px' }}
          >
            Teklifleri Yönet
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            sx={{
              backgroundColor: '#2196f3',
              color: 'white', // Ensure text is visible
              textTransform: 'none',
              borderRadius: '20px',
              px: 3,
              '&:hover': {
                backgroundColor: '#1976d2', // Darker shade on hover
              }
            }}
          >
            Giriş Yap
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;