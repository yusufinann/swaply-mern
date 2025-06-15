// src/layouts/MainAppLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define or import these constants
const NAVBAR_TOOLBAR_HEIGHT = 30;
const CATEGORY_ICON_BAR_HEIGHT = 20;
const TOTAL_NAVBAR_HEIGHT = NAVBAR_TOOLBAR_HEIGHT + CATEGORY_ICON_BAR_HEIGHT;

const MainAppLayout = () => {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          paddingTop: `${TOTAL_NAVBAR_HEIGHT}px`,
          // Add other styling as needed for your layout
        }}
      >
        <Outlet />
      </Box>
      <Footer/>
    </>
  );
};

export default MainAppLayout;