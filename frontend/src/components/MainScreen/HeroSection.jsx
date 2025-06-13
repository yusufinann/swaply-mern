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

const HeroSection = ({ theme, visible }) => {
  const slides = [
    {
      title: "Paranı Harcama, Takasta Kazan!",
      subtitle: "Fazlalık eşyalarınla hayallerindeki ürünlere ulaş. Sürdürülebilir ve ekonomik."
    },
    {
      title: "Birinin Çöpü, Başkasının Hazinesi",
      subtitle: "Kullanmadığın eşyalar başkalarının tam ihtiyacı olabilir. Takasla kazan!"
    },
    {
      title: "Değiş Tokuş, Değer Kazan",
      subtitle: "Para harcamadan istediğin ürünlere sahip ol. Akıllı takasın adresi."
    },
    {
      title: "Sürdürülebilir Yaşam Başlıyor",
      subtitle: "Çevreye dost, cebine uygun. Takasla hem tasarruf et hem doğayı koru."
    },
    {
      title: "Eşyalarına Yeni Hayat Ver",
      subtitle: "Evindeki fazlalıklar başka birinin eksikliğini tamamlasın. Takas yap, mutlu ol!"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
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
        minHeight: { xs: '60vh', md: '50vh' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Minimal decorative element */}
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
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
              minHeight: { xs: '140px', md: '180px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
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
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
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
                    minHeight: { xs: '140px', md: '180px' },
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
              minHeight: { xs: '80px', md: '70px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
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
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    maxWidth: '600px',
                    mx: 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: { xs: '80px', md: '70px' },
                  }}
                >
                  {slide.subtitle}
                </Typography>
              </Fade>
            ))}
          </Box>
        </Slide>

        {/* Slide indicator dots */}
        <Slide direction="up" in={visible} timeout={1400}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 2,
              mb: 2,
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
                    ? 'rgba(255,255,255,0.8)' 
                    : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => {
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

        <Slide direction="up" in={visible} timeout={1200}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 3,
                py: 1.25,
                borderRadius: 2,
                fontSize: '1rem',
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
                px: 3,
                py: 1.25,
                borderRadius: 2,
                fontSize: '1rem',
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