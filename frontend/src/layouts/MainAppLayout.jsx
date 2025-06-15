// src/layouts/MainAppLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Footer'ı import ettiğinizden emin olun

const ACTUAL_NAVBAR_TOOLBAR_HEIGHT = 64;
const ACTUAL_CATEGORY_ICON_BAR_HEIGHT = 60; 
const TOTAL_NAVBAR_HEIGHT_FOR_PADDING = ACTUAL_NAVBAR_TOOLBAR_HEIGHT + ACTUAL_CATEGORY_ICON_BAR_HEIGHT;

const MainAppLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          paddingTop: `${TOTAL_NAVBAR_HEIGHT_FOR_PADDING}px`,
          flexGrow: 1, 
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            ml: { xs: 2, sm: 4, md: 10 },
            mr: { xs: 2, sm: 4, md: 10 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainAppLayout;