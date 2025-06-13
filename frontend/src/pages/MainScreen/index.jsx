import React, { useState, useEffect } from 'react';
import { Box, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { categories, featuredItems, howItWorksSteps, recentSwaps, stats } from '../../constants/datas';
import HeroSection from '../../components/MainScreen/HeroSection';
import LiveSwapsSection from '../../components/MainScreen/LiveSwapsSection';
import CategoriesSection from '../../components/MainScreen/CategoriesSection';
import FeaturedItemsSection from '../../components/MainScreen/FeaturedItemsSection';
import HowItWorksSection from '../../components/MainScreen/HowItWorksSection';
import CallToActionSection from '../../components/MainScreen/CallToActionSection';


const MainScreen = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setStatsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      
      <HeroSection 
        theme={theme} 
        visible={visible} 
        statsVisible={statsVisible} 
        stats={stats} 
      />

      <LiveSwapsSection 
        theme={theme} 
        visible={visible} 
        recentSwaps={recentSwaps} 
      />
      
      <CategoriesSection 
        theme={theme} 
        visible={visible} 
        categories={categories} 
      />

      <FeaturedItemsSection 
        theme={theme} 
        visible={visible} 
        featuredItems={featuredItems}
      />
      
      <HowItWorksSection 
        theme={theme} 
        visible={visible} 
        howItWorksSteps={howItWorksSteps} 
      />

      <CallToActionSection theme={theme} />

      {/* Floating Action Button */}
      <Fab 
        color="secondary" 
        sx={{ 
          position: 'fixed', 
          bottom: 32, 
          right: 32,
          boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
        onClick={() => console.log("Hızlı Ürün Ekle")}
      >
        <ArrowForwardIcon />
      </Fab>

      {/* Custom animations - consider moving to a global CSS file or theme overrides */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
};

export default MainScreen;