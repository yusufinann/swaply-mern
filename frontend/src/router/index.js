import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import MainAppLayout from '../layouts/MainAppLayout';
import theme from '../theme/index';
import ProtectedRoute from './components/protectedRoute.js'; // Doğru yolu kontrol edin
import LoadingFallback from './components/LoadingFallback.js'; // Doğru yolu kontrol edin

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/index.jsx'));
// HomePage'i kullanmıyorsanız kaldırabilirsiniz, MainScreen ana sayfa gibi duruyor.
// const HomePage = lazy(() => import('../pages/HomePage/index.jsx'));
const MainScreen = lazy(() => import('../pages/MainScreen/index.jsx'));
const LoadProductPage = lazy(() => import('../pages/LoadProductPage/index.jsx'));
const SwapOfferPage = lazy(() => import('../pages/SwapOfferPage/index.jsx'));
const ManageOffersPage = lazy(() => import('../pages/ManageOffersPage/index.jsx'));
const MainContainer = lazy(() => import('../pages/MainContainer/index.jsx')); 

const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Giriş ve Kayıt sayfaları MainAppLayout DIŞINDA */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* MainAppLayout içindeki tüm rotalar Navbar'ı gösterecek */}
            <Route element={<MainAppLayout />}>
              {/* Ana Ekran (/) herkese açık */}
              <Route path="/" element={<MainScreen />} />

              {/* Korunan Rotalar */}
              <Route
                element={
                  <ProtectedRoute>
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                <Route element={<MainContainer />}> {/* Bu satır MainContainer'ın bir layout gibi davrandığını varsayar */}
                  {/* <Route path="/" element={<MainScreen />} /> // BU SATIR GEREKSİZ, dıştaki / zaten MainScreen'i gösteriyor */}
                  <Route path="urun-yukle" element={<LoadProductPage />} />
                  <Route path="takas-teklifi" element={<SwapOfferPage />} />
                  <Route path="teklifleri-yonet" element={<ManageOffersPage />} />
                  {/* <Route path="profil/:userId" element={<ProfilePage />} /> {/* Dinamik kullanıcı ID'si için */}
                  {/* <Route path="profil" element={<ProfilePage />} /> {/* Mevcut kullanıcının profili için (AuthContext'ten alınabilir) */}
                  {/* <Route path="ayarlar" element={<SettingsPage />} /> */} 
                </Route>
              </Route>
            </Route>

            {/* Yakalanmayan rotalar için bir 404 sayfası ekleyebilirsiniz */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;