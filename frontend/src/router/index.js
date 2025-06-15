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
const MainScreen = lazy(() => import('../pages/MainScreen/index.jsx'));
const LoadProductPage = lazy(() => import('../pages/LoadProductPage/index.jsx'));
const SwapOfferPage = lazy(() => import('../pages/SwapOfferPage/index.jsx'));
const ManageOffersPage = lazy(() => import('../pages/ManageOffersPage/index.jsx'));
const MainContainer = lazy(() => import('../pages/MainContainer/index.jsx')); // Assuming this is also a layout or wrapper for protected routes
// If MainContainer is not needed for LoadProductPage etc. and they should be direct children of ProtectedRoute, adjust accordingly.


const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes without MainAppLayout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Routes using MainAppLayout (includes Navbar and content area) */}
            <Route element={<MainAppLayout />}>
              <Route path="/" element={<MainScreen />} />
              <Route path="/category/:categoryId" element={<MainScreen />} /> {/* Route for category specific view */}

              {/* Protected Routes, also under MainAppLayout */}
              <Route
                element={
                  <ProtectedRoute>
                    <Outlet /> {/* This Outlet allows nested protected routes */}
                  </ProtectedRoute>
                }
              >
                {/* 
                  If MainContainer is a specific page or layout for these routes, keep it.
                  If LoadProductPage, SwapOfferPage, etc., are meant to be direct children
                  of the ProtectedRoute and use the MainAppLayout's structure,
                  you might not need MainContainer wrapping them here, or MainContainer
                  itself should render an <Outlet /> if it's another layer of layout.
                  
                  Assuming MainContainer is a wrapper/layout for these specific pages:
                */}
                <Route element={<MainContainer />}> {/* Or directly render <Outlet /> if MainContainer is not a page itself */}
                  <Route path="urun-yukle" element={<LoadProductPage />} />
                  <Route path="takas-teklifi" element={<SwapOfferPage />} />
                  <Route path="teklifleri-yonet" element={<ManageOffersPage />} />
                  {/* Add other protected routes under MainContainer here if applicable */}
                </Route>
                 {/* 
                  If MainContainer is NOT a layout but a page itself, and you want 
                  other protected routes directly under ProtectedRoute, it would be:
                  <Route path="main-container" element={<MainContainer />} />
                  <Route path="urun-yukle" element={<LoadProductPage />} />
                  <Route path="takas-teklifi" element={<SwapOfferPage />} />
                  <Route path="teklifleri-yonet" element={<ManageOffersPage />} />
                 */}
              </Route>
            </Route>

            {/* Optional: Catch-all 404 Route */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;