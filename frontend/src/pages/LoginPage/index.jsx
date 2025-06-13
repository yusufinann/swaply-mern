// src/pages/LoginPage/LoginPage.js
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
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';

import { useLoginPage } from './useLoginPage';
import { useAuth } from '../../shared/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    error,
    loading: formLoading, 
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleGoogleLogin,
    navigate: formNavigate 
  } = useLoginPage();

  const { isAuthenticated, loading: authLoading } = useAuth(); 
  const location = useLocation(); 

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

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
      <Container component="main" maxWidth="xs">
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
            <Stack spacing={2.5}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="E-posta Adresi"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!(error && (error.toLowerCase().includes('e-posta') || error.toLowerCase().includes('email')))}
                disabled={formLoading}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Şifre"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!(error && error.toLowerCase().includes('şifre'))}
                disabled={formLoading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color={showPassword ? "primary" : "default"}
                        disabled={formLoading}
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
                {/* Potentially for a "Remember me" checkbox, if needed */}
              </Grid>
              <Grid item>
                <MuiLink
                  component="button"
                  variant="body2"
                  onClick={() => formNavigate('/sifremi-unuttum')} // use formNavigate from useLoginPage
                  disabled={formLoading}
                >
                  Şifremi Unuttum?
                </MuiLink>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ py: 1.5, position: 'relative' }}
              disabled={formLoading}
            >
              {formLoading ? <CircularProgress size={24} color="inherit" sx={{position: 'absolute'}} /> : 'Giriş Yap'}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                VEYA
              </Typography>
            </Divider>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                size="large"
                sx={{ borderColor: 'divider' }}
                disabled={formLoading}
              >
                Google ile Giriş Yap
              </Button>
            </Stack>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
              Hesabınız yok mu?{' '}
              <MuiLink
                component="button"
                variant="body2"
                onClick={() => formNavigate('/register')} // use formNavigate from useLoginPage
                disabled={formLoading}
              >
                Hemen Kayıt Olun
              </MuiLink>
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