import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const HowItWorksStepCard = ({ step, theme }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: 'center',
        borderRadius: 4,
        border: `2px solid ${theme.palette.divider}`,
        height: '100%',
        position: 'relative',
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(0,18,51,0.1)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -15,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          width: 30,
          height: 30,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '0.9rem',
        }}
      >
        {step.id}
      </Box>

      <Box sx={{ mb: 3, color: theme.palette.primary.main, mt: 2 }}>
        {step.icon}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}>
        {step.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
        {step.description}
      </Typography>
    </Paper>
  );
};

export default HowItWorksStepCard;