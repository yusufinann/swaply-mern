// LoginPage.js
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  IconButton,
  InputAdornment,
  Avatar,
  Divider,
  Stack, // Elemanları dikeyde veya yatayda kolayca sıralamak için
  Alert // Hata mesajları için (opsiyonel)
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google'; // Google ikonu
// import AppleIcon from '@mui/icons-material/Apple'; // Opsiyonel Apple ikonu

// Sitenizin logosunu buraya import edin veya direkt URL kullanın
// import TakastaLogo from './path/to/your/takasta-logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // Hata mesajı için state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Önceki hataları temizle

    if (!email || !password) {
      setError('E-posta ve şifre alanları zorunludur.');
      return;
    }
    // TODO: Gerçek giriş mantığı (API çağrısı vb.)
    console.log('Giriş denemesi:', { email, password });
    // Başarılı giriş sonrası yönlendirme veya state güncellemesi
    // Örnek:
    // try {
    //   const response = await api.login(email, password);
    //   // Yönlendirme veya kullanıcı bilgilerini kaydetme
    // } catch (err) {
    //   setError(err.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    // }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGoogleLogin = () => {
    // TODO: Google ile giriş mantığı
    console.log('Google ile giriş yapılıyor...');
    setError('');
    // Örnek: firebase.auth().signInWithPopup(googleProvider);
  };

  // Opsiyonel: Diğer sosyal medya girişleri
  // const handleAppleLogin = () => {
  //   console.log('Apple ile giriş yapılıyor...');
  //   setError('');
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, // Hoş bir gradient arka plan
        // Veya düz renk: backgroundColor: 'background.default',
        p: { xs: 2, sm: 3 } // Kenarlardan boşluk
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6} // Daha belirgin bir gölge
          sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: theme => theme.shape.borderRadius * 1.5, // Biraz daha yuvarlak köşeler
            backdropFilter: 'blur(10px)', // Arka plan gradyanı ile iyi gider (eğer paper'a alpha verirseniz)
            // backgroundColor: 'rgba(255, 255, 255, 0.9)', // Hafif transparan kağıt (gradient arka planla)
            backgroundColor: 'background.paper', // Düz renk arka planla
          }}
        >
          {/* Logo Alanı - İsteğe bağlı */}
          {/* <img src={TakastaLogo} alt="Takasta Logo" style={{ width: 120, marginBottom: 16 }} /> */}
          {/* Veya */}
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>

          <Typography component="h1" variant="h4" sx={{ mt: 2, mb: 1, color: 'text.primary' }}>
            Takasta'ya Giriş Yap
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Hesabınıza erişmek için bilgilerinizi girin.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <Stack spacing={2.5}> {/* Alanlar arası boşluk için Stack */}
              <TextField
                required
                id="email"
                name="email"
                label="E-posta Adresi"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!(error && error.toLowerCase().includes('e-posta'))} // Hata durumunda vurgula
              />
              <TextField
                required
                name="password"
                label="Şifre"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!(error && error.toLowerCase().includes('şifre'))} // Hata durumunda vurgula
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color={showPassword ? "primary" : "default"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2, mb: 2.5 }}>
              <Grid item>
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Beni Hatırla"
                  sx={{ color: 'text.secondary' }}
                /> */}
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" > {/* Temadan otomatik renk alır */}
                  Şifremi Unuttum?
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large" // Daha belirgin bir buton
              sx={{ py: 1.5 }} // Buton içi dikey padding
            >
              Giriş Yap
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                VEYA
              </Typography>
            </Divider>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="outlined" // Google için farklı bir stil
                color="primary" // Veya temadaki secondary'i Google mavisi yapabilirsiniz
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                size="large"
                sx={{ borderColor: 'divider' }} // Daha yumuşak kenarlık
              >
                Google ile Giriş Yap
              </Button>
              {/* Örnek Apple Login Butonu
              <Button
                fullWidth
                variant="outlined"
                color="inherit" // Apple için siyah/gri tonları
                startIcon={<AppleIcon />}
                onClick={handleAppleLogin}
                size="large"
                sx={{ borderColor: 'divider', color: 'text.primary' }}
              >
                Apple ile Giriş Yap
              </Button>
              */}
            </Stack>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
              Hesabınız yok mu?{' '}
              <Link href="#" /*onClick={() => navigate('/kayit-ol')}*/ >
                Hemen Kayıt Olun
              </Link>
            </Typography>
          </Box>
        </Paper>
        <Typography variant="caption" color="rgba(255,255,255,0.7)" align="center" sx={{ mt: 4, display: 'block' }}>
          {'Tüm hakları saklıdır. © Takasta '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default LoginPage;