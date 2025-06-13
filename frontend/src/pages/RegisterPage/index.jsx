// RegisterPage.js
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
  Stack, // Stack'i aktif olarak kullanacağız
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';

// Sitenizin logosunu buraya import edin veya direkt URL kullanın
// import TakastaLogo from './path/to/your/takasta-logo.png';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Tüm zorunlu alanlar doldurulmalıdır.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    if (!agreeToTerms) {
      setError('Kullanım koşullarını ve gizlilik politikasını kabul etmelisiniz.');
      return;
    }

    console.log('Kayıt denemesi:', { firstName, lastName, email, password, agreeToTerms });
    // TODO: Gerçek API çağrısı
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();
  const handleGoogleLogin = () => {
    console.log('Google ile kayıt/giriş yapılıyor...');
    setError('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        p: { xs: 2, sm: 3 }
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: theme => theme.shape.borderRadius * 1.5,
            backgroundColor: 'background.paper',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <PersonAddOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mt: 2, mb: 1, color: 'text.primary' }}>
            Takasta'ya Kayıt Ol
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Yeni bir hesap oluşturmak için bilgilerinizi girin.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2.5 }}> {/* Hata mesajı için de Stack spacing'e uygun boşluk */}
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
            {/* Form elemanlarını Stack ile sarmalayarak dikey boşlukları kontrol ediyoruz */}
            <Stack spacing={2.5}> {/* Dikeyde elemanlar arası boşluk (2.5 * 8px = 20px) */}
              <Grid container spacing={2}> {/* Ad ve Soyad için yatayda boşluk (2 * 8px = 16px) */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="Adınız"
                    name="firstName"
                    autoComplete="given-name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={!!(error && error.toLowerCase().includes('adınız'))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Soyadınız"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={!!(error && error.toLowerCase().includes('soyadınız'))}
                  />
                </Grid>
              </Grid>

              <TextField
                required
                fullWidth
                id="email"
                label="E-posta Adresi"
                name="email"
                type="email" // Tarayıcıya e-posta olduğunu belirtmek için
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!(error && (error.toLowerCase().includes('e-posta') || error.toLowerCase().includes('email')))}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Şifre"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!(error && (error.toLowerCase().includes('şifre') && !error.toLowerCase().includes('eşleşmiyor')))}
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
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Şifreyi Onayla"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!(error && (error.toLowerCase().includes('şifreler eşleşmiyor') || (error.toLowerCase().includes('şifreyi onayla') && !error.toLowerCase().includes('eşleşmiyor'))))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                        color={showConfirmPassword ? "primary" : "default"}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* Kullanım koşulları ve hata mesajını bir arada tutmak için Box */}
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      name="agreeToTerms"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      <Link href="/terms" target="_blank" rel="noopener noreferrer">Kullanım Koşulları</Link>
                      {' ve '}
                      <Link href="/privacy" target="_blank" rel="noopener noreferrer">Gizlilik Politikası</Link>
                      'nı okudum ve kabul ediyorum.
                    </Typography>
                  }
                />
                {error && error.toLowerCase().includes('kullanım koşulları') && (
                  <Typography variant="caption" color="error" sx={{ display: 'block', ml: 4, mt: 0.5 }}>
                    Bu alanı işaretlemeniz gerekmektedir.
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 1.5 }} // Buton içi dikey padding, mt/mb Stack'ten gelecek
              >
                Kayıt Ol
              </Button>

              <Divider>
                <Typography variant="body2" color="text.secondary">
                  VEYA
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                size="large"
                sx={{ borderColor: 'divider' }}
              >
                Google ile Kayıt Ol
              </Button>

              <Typography variant="body2" color="text.secondary" align="center">
                Zaten bir hesabınız var mı?{' '}
                <Link href="/login" /* onClick={() => navigate('/login')} */>
                  Giriş Yapın
                </Link>
              </Typography>
            </Stack> {/* Stack sonu */}
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

export default RegisterPage;