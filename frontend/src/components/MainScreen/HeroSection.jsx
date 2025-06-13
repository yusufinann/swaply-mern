import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Slide,
  Grow,
  Stack,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = ({ theme, visible, statsVisible, stats }) => {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        textAlign: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #002855 100%)`,
        color: theme.palette.primary.contrastText,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Slide direction="down" in={visible} timeout={800}>
          <Box>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                background:
                  'linear-gradient(45deg, #FFFFFF 30%, #E8F4FD 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Paranı Harcama, Takasla Kazan!
            </Typography>
          </Box>
        </Slide>

        <Slide direction="up" in={visible} timeout={1000}>
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}
          >
            Fazlalık eşyalarınla hayallerindeki ürünlere ulaş. Sürdürülebilir,
            ekonomik ve eğlenceli.
          </Typography>
        </Slide>

        <Grow in={statsVisible} timeout={1200}>
          <Grid
            container
            spacing={2}
            sx={{ mb: 6, justifyContent: 'center' }}
          >
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ color: theme.palette.secondary.main, mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grow>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(76, 175, 80, 0.4)',
              },
            }}
            onClick={() => console.log('Takasları Keşfet')}
          >
            Takasları Keşfet
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              color: theme.palette.primary.contrastText,
              borderColor: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: theme.palette.primary.contrastText,
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() => console.log('Ürün Yükle')}
          >
            Ürününü Yükle
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;