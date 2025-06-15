// src/layouts/MainAppLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACTUAL_NAVBAR_TOOLBAR_HEIGHT = 64;
const ACTUAL_CATEGORY_ICON_BAR_HEIGHT = 60;
const TOTAL_NAVBAR_HEIGHT_FOR_PADDING = ACTUAL_NAVBAR_TOOLBAR_HEIGHT + ACTUAL_CATEGORY_ICON_BAR_HEIGHT;

const MainAppLayout = () => {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          paddingTop: `${TOTAL_NAVBAR_HEIGHT_FOR_PADDING}px`,
          display: 'flex',
          flexDirection: 'column',
          minHeight: `calc(100vh - ${TOTAL_NAVBAR_HEIGHT_FOR_PADDING}px)`,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default MainAppLayout;