import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider} from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';// Pages
import MainScreen from '../pages/MainScreen/index.jsx'; 
import LoginPage from '../pages/LoginPage'; 
import LoadProductPage from '../pages/LoadProductPage/index.jsx';
import SwapOfferPage from '../pages/SwapOfferPage/index.jsx';
import ManageOffersPage from '../pages/ManageOffersPage/index.jsx';
import MainContainer from '../pages/MainContainer/index.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import theme from '../theme/index'
const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route element={<MainContainer />}> 
              <Route path="/" element={<MainScreen />} />
              <Route path="/urun-yukle" element={<LoadProductPage />} />
              <Route path="/takas-teklifi" element={<SwapOfferPage />} />
              <Route path="/teklifleri-yonet" element={<ManageOffersPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            {/* You could have other routes here that *don't* use MainLayout,
                e.g., a full-screen admin panel or a special landing page.
            <Route path="/admin" element={<AdminPanel />} /> 
            */}
          </Routes>
          <Footer /> 
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;