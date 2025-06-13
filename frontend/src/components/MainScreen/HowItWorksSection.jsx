import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Grow,
} from '@mui/material';
import HowItWorksStepCard from './HowItWorksStepCard'; // Import the step card

const HowItWorksSection = ({ theme, visible, howItWorksSteps }) => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Nasıl Çalışır?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Sadece 4 adımda takas yapmaya başla ve hayallerindeki ürünlere kavuş!
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '12.5%',
            right: '12.5%',
            height: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            zIndex: 0,
            display: { xs: 'none', md: 'block' },
          }}
        />

        {howItWorksSteps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={step.id}>
            <Grow in={visible} timeout={1500 + index * 300}>
              <div> {/* Grow needs a direct child that accepts a ref */}
                <HowItWorksStepCard step={step} theme={theme} />
              </div>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorksSection;