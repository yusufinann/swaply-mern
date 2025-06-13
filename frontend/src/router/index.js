// src/router/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MainAppLayout from '../layouts/MainAppLayout';
import MainScreen from '../pages/MainScreen/index.jsx';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage/index.jsx';
import LoadProductPage from '../pages/LoadProductPage/index.jsx';
import SwapOfferPage from '../pages/SwapOfferPage/index.jsx';
import ManageOffersPage from '../pages/ManageOffersPage/index.jsx';
import MainContainer from '../pages/MainContainer/index.jsx';

import theme from '../theme/index';

const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<MainAppLayout />}>
            <Route element={<MainContainer />}>
              <Route path="/" element={<MainScreen />} />
              <Route path="/urun-yukle" element={<LoadProductPage />} />
              <Route path="/takas-teklifi" element={<SwapOfferPage />} />
              <Route path="/teklifleri-yonet" element={<ManageOffersPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;