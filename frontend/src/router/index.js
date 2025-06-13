import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import MainAppLayout from '../layouts/MainAppLayout';
import theme from '../theme/index';
import ProtectedRoute from './components/protectedRoute.js';
import LoadingFallback from './components/LoadingFallback.js';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/index.jsx'));
const HomePage = lazy(() => import('../pages/HomePage/index.jsx'));
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<MainAppLayout />}>
              <Route path="/" element={<HomePage />} />

              <Route
                element={
                  <ProtectedRoute>
                    <Outlet /> 
                  </ProtectedRoute>
                }
              >
                <Route element={<MainContainer />}> {/* MainContainer artık Outlet içinde */}
                  <Route path="ana-sayfa" element={<MainScreen />} /> {/* Ana sayfa yeni yolu */}
                  <Route path="urun-yukle" element={<LoadProductPage />} />
                  <Route path="takas-teklifi" element={<SwapOfferPage />} />
                  <Route path="teklifleri-yonet" element={<ManageOffersPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;