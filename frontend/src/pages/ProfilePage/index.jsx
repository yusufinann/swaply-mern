// src/pages/ProfilePage.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Container, Typography, Avatar, Paper, CircularProgress, Alert, Grid,
  Divider, ListItemIcon, ListItemText, List, ListItem, Button
} from '@mui/material';
import { Email, Person, CalendarToday } from '@mui/icons-material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const formatDate = (dateString) => { /* ... (önceki gibi) ... */ };

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // Giriş yapmış kullanıcı
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true); // Giriş yapmış kullanıcı yüklenmesi için ayrı loading
  const [error, setError] = useState('');
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  // 1. Giriş yapmış kullanıcıyı bir kere çek (component mount olduğunda)
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      setLoadingAuth(true);
      try {
        const res = await axios.get('http://localhost:3001/api/auth/me', { withCredentials: true });
        setLoggedInUser(res.data.user);
      } catch (err) {
        console.warn('Could not fetch logged-in user:', err.message);
        // Bu hata kritik olmayabilir, kullanıcı giriş yapmamış olabilir.
        // Eğer /profile (kendi profili) ise ve giriş yoksa, login'e yönlendirilebilir.
        if (!userId) { // Kendi profilini görüntülemeye çalışıyor ama giriş yapmamış
            // navigate('/login'); // Opsiyonel: Giriş sayfasına yönlendir
            setError("Kendi profilinizi görmek için giriş yapmalısınız.");
        }
      } finally {
        setLoadingAuth(false);
      }
    };
    fetchLoggedInUser();
  }, [navigate, userId]); // userId'yi ekledik ki, eğer /profile (kendi profili) ise ve giriş yoksa işlem yapabilsin

  // 2. Profil kullanıcısını çek (userId değiştiğinde veya loggedInUser yüklendiğinde)
  useEffect(() => {
    // Giriş yapmış kullanıcı bilgisi henüz yüklenmediyse bekle
    if (loadingAuth) {
      return;
    }

    const fetchUserProfile = async () => {
      setLoadingProfile(true);
      setError('');
      setProfileUser(null);

      try {
        let fetchedUser;
        let targetUserId = userId; // Görüntülenecek kullanıcının ID'si

        if (!targetUserId) { // Eğer URL'de userId yoksa (yani /profile), loggedInUser'ın ID'sini kullan
          if (loggedInUser) {
            targetUserId = loggedInUser._id;
          } else {
            // Kendi profilini görmeye çalışıyor ama giriş yapılmamış ve loggedInUser null
            // fetchLoggedInUser'daki error handling bu durumu yakalamalıydı.
            // Buraya gelmemesi lazım eğer yukarıdaki navigate çalışırsa.
            setError("Profil bilgisi için kullanıcı ID bulunamadı.");
            setLoadingProfile(false);
            return;
          }
        }

        // Eğer targetUserId hala tanımsızsa (beklenmedik durum), hata ver.
        if (!targetUserId) {
            setError("Görüntülenecek kullanıcı ID'si belirlenemedi.");
            setLoadingProfile(false);
            return;
        }

        // Kendi profilimiz mi (/api/auth/me) yoksa başkasınınki mi (/api/users/:id)
        const endpoint = (loggedInUser && targetUserId === loggedInUser._id && !userId) // !userId önemli, /profile ise kendi /me endpoint'i
                         ? 'http://localhost:3001/api/auth/me'
                         : `http://localhost:3001/api/auth/${targetUserId}`;

        const response = await axios.get(endpoint, { withCredentials: true });
        fetchedUser = response.data.user;
        setProfileUser(fetchedUser);

        if (loggedInUser && fetchedUser && loggedInUser._id === fetchedUser._id) {
          setIsOwnProfile(true);
        } else {
          setIsOwnProfile(false);
        }

      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError(
          err.response?.data?.message ||
          'Profil bilgileri yüklenirken bir hata oluştu.'
        );
        setProfileUser(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();

  }, [userId, loggedInUser, loadingAuth]); // userId veya loggedInUser değiştiğinde veya auth yüklemesi bittiğinde çalışır

  // Ana Yükleme Durumu
  if (loadingAuth || loadingProfile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !profileUser) { // Eğer profil yüklenemedi ama bir hata mesajı varsa göster
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!profileUser) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="warning">Kullanıcı bilgisi bulunamadı.</Alert>
        {/* Opsiyonel: Eğer hata mesajı varsa onu da göster */}
        {error && <Alert severity="info" sx={{mt: 1}}>{error}</Alert>}
      </Container>
    );
  }

  // ... (Geri kalan JSX kısmı aynı)
  const avatarLetter = profileUser.firstName ? profileUser.firstName[0].toUpperCase() : '?';
  const fullName = `${profileUser.firstName || ''} ${profileUser.lastName || ''}`.trim();

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: { xs: 100, md: 150 },
                height: { xs: 100, md: 150 },
                fontSize: { xs: '3rem', md: '5rem' },
                mb: 2,
                bgcolor: 'primary.main',
              }}
            >
              {avatarLetter}
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              {fullName || 'Kullanıcı Profili'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              Kullanıcı
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h5" component="h2" sx={{ borderBottom: '2px solid', borderColor: 'primary.main', pb:1 }}>
                Kişisel Bilgiler
              </Typography>
              {isOwnProfile && (
                <Button variant="outlined" size="small" onClick={() => navigate('/profile/edit')}>
                  Profili Düzenle
                </Button>
              )}
            </Box>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Person color="action" />
                </ListItemIcon>
                <ListItemText
                  primary="Ad Soyad"
                  secondary={fullName || 'Belirtilmemiş'}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemIcon>
                  <Email color="action" />
                </ListItemIcon>
                <ListItemText
                  primary="E-posta Adresi"
                  secondary={profileUser.email || 'Belirtilmemiş'}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemIcon>
                  <CalendarToday color="action" />
                </ListItemIcon>
                <ListItemText
                  primary="Kayıt Tarihi"
                  secondary={formatDate(profileUser.createdAt)}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;