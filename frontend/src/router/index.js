// src/router/index.js (GÜNCELLENMİŞ HALİ)

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// YENİ EKLEDİK: FavoritesProvider'ı buraya import ediyoruz.
import { FavoritesProvider } from '../shared/context/FavoritesContext';

import MainAppLayout from '../layouts/MainAppLayout';
import theme from '../theme/index';
import ProtectedRoute from './components/protectedRoute.js';
import LoadingFallback from './components/LoadingFallback.js';
import EditProductPage from '../pages/EditProductPage/index.jsx';
import MySwappableItemsPage from '../pages/MySwappableItemsPage/index.jsx';
import CategoryPage from '../pages/CategoryPage/index.jsx';
import MyFavoritesPage from '../pages/MyFavoritesPage/index.jsx';
import ProfilePage from '../pages/ProfilePage/index.jsx';
import ConversationPage from '../pages/ConversationPage/index.jsx';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/index.jsx'));
const MainScreen = lazy(() => import('../pages/MainScreen/index.jsx'));
const LoadProductPage = lazy(() => import('../pages/LoadProductPage/index.jsx'));
const SwapOfferPage = lazy(() => import('../pages/SwapOfferPage/index.jsx'));
const ManageOffersPage = lazy(() => import('../pages/ManageOffersPage/index.jsx'));
const MainContainer = lazy(() => import('../pages/MainContainer/index.jsx'));

const FavoritesLayout = () => (
  <FavoritesProvider>
    <Outlet />
  </FavoritesProvider>
);

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
              <Route element={<FavoritesLayout />}>
                <Route path="/" element={<MainScreen />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route
                  element={
                    <ProtectedRoute>
                      <Outlet />
                    </ProtectedRoute>
                  }
                >
                  <Route element={<MainContainer />}>
                    <Route path="urun-yukle" element={<LoadProductPage />} />
                    <Route path="teklifleri-yonet" element={<ManageOffersPage />} />
                    <Route path="takasta" element={<MySwappableItemsPage />} />
                    <Route path="urun-duzenle/:id" element={<EditProductPage />} />
                    <Route path="takas-teklifi" element={<SwapOfferPage />} />
                    <Route path="favorilerim" element={<MyFavoritesPage />} />
                    <Route path="profil" element={<ProfilePage />} />
                    <Route path="/profil/:userId" element={<ProfilePage />} />
                    <Route path="/swap-offer/:id" element={<ConversationPage />} />
                  </Route>
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