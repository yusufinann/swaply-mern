import React from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Grid,
  IconButton,
  InputAdornment,
  Avatar,
  Divider,
  Stack,
  Alert,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { useRegisterPage } from './useRegisterPage';

const RegisterPage = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    agreeToTerms,
    setAgreeToTerms,
    showPassword,
    showConfirmPassword,
    error,
    loading,
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleClickShowConfirmPassword,
    handleMouseDownConfirmPassword,
    handleGoogleLogin,
    navigate,
  } = useRegisterPage();

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
            <Alert severity="error" sx={{ width: '100%', mb: 2.5 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
            <Stack spacing={2.5}>
              <Grid container spacing={2}>
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              <TextField
                required
                fullWidth
                id="email"
                label="E-posta Adresi"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!(error && (error.toLowerCase().includes('e-posta') || error.toLowerCase().includes('email')))}
                disabled={loading}
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
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color={showPassword ? "primary" : "default"}
                        disabled={loading}
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
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                        color={showConfirmPassword ? "primary" : "default"}
                        disabled={loading}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      name="agreeToTerms"
                      color="primary"
                      disabled={loading}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      <MuiLink
                        href="/terms" // Bu sayfaların da oluşturulması gerekir
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { if(loading) e.preventDefault();}} // Yükleme sırasında linke tıklamayı engelle
                        sx={loading ? {pointerEvents: 'none', color: 'text.disabled'} : {}}
                      >
                        Kullanım Koşulları
                      </MuiLink>
                      {' ve '}
                      <MuiLink
                        href="/privacy" // Bu sayfaların da oluşturulması gerekir
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { if(loading) e.preventDefault();}}
                        sx={loading ? {pointerEvents: 'none', color: 'text.disabled'} : {}}
                      >
                        Gizlilik Politikası
                      </MuiLink>
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
                sx={{ py: 1.5, position: 'relative' }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" sx={{position: 'absolute'}}/> : 'Kayıt Ol'}
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
                disabled={loading}
              >
                Google ile Kayıt Ol
              </Button>

              <Typography variant="body2" color="text.secondary" align="center">
                Zaten bir hesabınız var mı?{' '}
                <MuiLink
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  disabled={loading}
                >
                  Giriş Yapın
                </MuiLink>
              </Typography>
            </Stack>
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