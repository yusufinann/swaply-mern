import React from 'react';
import { Box, useScrollTrigger, useTheme, Zoom } from '@mui/material';
import PropTypes from 'prop-types';

const ScrollTop = (props) => {
  const { children, window } = props;
  const theme=useTheme();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const Htmlelement = document.documentElement;
    Htmlelement.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: (theme) => theme.zIndex.modal +1 }} // Ensure it's above other elements
      >
        {children}
      </Box>
    </Zoom>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default ScrollTop;