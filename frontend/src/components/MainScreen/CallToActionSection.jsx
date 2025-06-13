import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
} from '@mui/material';

const CallToActionSection = ({ theme }) => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
          Hemen Takasa Başla!
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}>
          Binlerce kullanıcı zaten takaslarını yapıyor. Sen de katıl!
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 6,
              py: 2,
              borderRadius: 3,
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            Hemen Başla
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 6,
              py: 2,
              borderRadius: 3,
              borderColor: 'rgba(255,255,255,0.5)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            Daha Fazla Bilgi
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default CallToActionSection;