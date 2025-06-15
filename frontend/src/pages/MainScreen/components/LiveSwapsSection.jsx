import React from 'react';
import {
  Container,
  Box,
  Chip,
  Typography,
  Grid,
  Grow,
  Paper,
  Stack,
  Avatar,
} from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const LiveSwapsSection = ({ theme, visible, recentSwaps }) => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Chip
          icon={<TrendingFlatIcon />}
          label="CANLI TAKASLAR"
          color="secondary"
          sx={{ mb: 2, fontWeight: 'bold' }}
        />
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          Şu An Gerçekleşen Takaslar
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Topluluğumuzda her dakika yeni takaslar gerçekleşiyor!
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {recentSwaps.map((swap, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Grow in={visible} timeout={1000 + index * 200}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '1px solid rgba(0,18,51,0.1)',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 32, height: 32 }}>
                    <SwapHorizIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2" color="text.secondary">
                    {swap.time}
                  </Typography>
                </Stack>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                    {swap.item1} <TrendingFlatIcon sx={{ mx: 1, fontSize: 16 }} /> {swap.item2}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {swap.user1} ↔ {swap.user2}
                  </Typography>
                </Box>
              </Paper>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LiveSwapsSection;