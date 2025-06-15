import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Slide,
  Stack,
  Fade,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { slides } from '../../constants/datas'; // Assuming this path is correct

const HeroSection = ({ theme, visible }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!visible || slides.length <= 1) return;

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFadeIn(true);
      }, 600);
    }, 10000);

    return () => clearInterval(interval);
  }, [visible, slides.length]);

  return (
    <Box
      sx={{
        pt: { xs: 2, md: 3 },
        pb: { xs: 2, md: 3 },
        textAlign: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #002855 100%)`,
        color: theme.palette.primary.contrastText,
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '20vh', md: '35vh' },
        display: 'flex',
        alignItems: 'center',
        mt: 10,
        mr: { xs: 2, sm: 4, md: 10 },
        ml: { xs: 2, sm: 4, md: 10 },
        borderTopRightRadius:'50px',
         borderTopLeftRadius:'50px'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Slide direction="down" in={visible} timeout={800}>
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: '100px', sm: '110px', md: '120px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 0.5,
            }}
          >
            {slides.map((slide, index) => (
              <Fade
                key={index}
                in={currentSlide === index && fadeIn}
                timeout={800}
                style={{
                  transitionDelay: currentSlide === index ? '100ms' : '0ms',
                }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    fontWeight: 'bold',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
                    background:
                      'linear-gradient(45deg, #FFFFFF 30%, #E8F4FD 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: { xs: '100px', sm: '110px', md: '120px' },
                    px:1,
                  }}
                >
                  {slide.title}
                </Typography>
              </Fade>
            ))}
          </Box>
        </Slide>

        <Slide direction="up" in={visible} timeout={1000}>
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: '50px', sm: '55px', md: '60px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
            }}
          >
            {slides.map((slide, index) => (
              <Fade
                key={index}
                in={currentSlide === index && fadeIn}
                timeout={800}
                style={{
                  transitionDelay: currentSlide === index ? '200ms' : '0ms',
                }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.85,
                    fontWeight: 300,
                    fontSize: { xs: '0.95rem', md: '1.1rem' },
                    maxWidth: '580px',
                    mx: 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: { xs: '50px', sm: '55px', md: '60px' },
                    px:1,
                  }}
                >
                  {slide.subtitle}
                </Typography>
              </Fade>
            ))}
          </Box>
        </Slide>

        {slides.length > 1 && (
          <Slide direction="up" in={visible} timeout={1400}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mt: 1.5,
                mb: 1.5,
              }}
            >
              {slides.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: currentSlide === index
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (currentSlide === index) return;
                    setFadeIn(false);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setFadeIn(true);
                    }, 300);
                  }}
                />
              ))}
            </Box>
          </Slide>
        )}

        <Slide direction="up" in={visible} timeout={1200}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 2.5 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: {xs: 2.5, sm: 3},
                py: {xs: 1, sm: 1.25},
                borderRadius: 2,
                fontSize: {xs: '0.9rem', sm: '1rem'},
                boxShadow: '0 6px 20px rgba(76, 175, 80, 0.25)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 25px rgba(76, 175, 80, 0.35)',
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
                px: {xs: 2.5, sm: 3},
                py: {xs: 1, sm: 1.25},
                borderRadius: 2,
                fontSize: {xs: '0.9rem', sm: '1rem'},
                color: theme.palette.primary.contrastText,
                borderColor: 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.6)',
                  transform: 'translateY(-1px)',
                },
              }}
              onClick={() => console.log('Ürün Yükle')}
            >
              Ürününü Yükle
            </Button>
          </Stack>
        </Slide>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;