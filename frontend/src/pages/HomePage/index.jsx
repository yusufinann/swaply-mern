// src/pages/HomePage/index.jsx
import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext'; // AuthContext'i import ediyoruz

const HomePage = () => {
  const { isAuthenticated } = useAuth(); // Kullanıcının giriş durumunu alıyoruz

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Takasta'ya Hoş Geldiniz!
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Eşyalarınızı değerinde takas etmenin en kolay ve güvenilir yolu.
        Hemen keşfetmeye başlayın!
      </Typography>
      <Box sx={{ mt: 4 }}>
        {!isAuthenticated && ( // Kullanıcı giriş yapmamışsa butonları göster
          <>
            <Button component={RouterLink} to="/login" variant="contained" color="primary" sx={{ mr: 2, px: 4, py: 1.5, fontSize: '1rem' }}>
              Giriş Yap
            </Button>
            <Button component={RouterLink} to="/register" variant="outlined" color="primary" sx={{ px: 4, py: 1.5, fontSize: '1rem' }}>
              Kayıt Ol
            </Button>
          </>
        )}
        {isAuthenticated && ( // Kullanıcı giriş yapmışsa ana sayfaya yönlendirme butonu
           <Button component={RouterLink} to="/ana-sayfa" variant="contained" color="secondary" sx={{ px: 4, py: 1.5, fontSize: '1rem' }}>
             Uygulamaya Git
           </Button>
        )}
      </Box>
      <Typography variant="body1" sx={{ mt: 6, fontStyle: 'italic' }}>
        "Birinin çöpü, başkasının hazinesidir."
      </Typography>
    </Container>
  );
};

export default HomePage;