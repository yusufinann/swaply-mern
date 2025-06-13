import React, { useState } from 'react';
import {
  Box,
  Container,
  Chip,
  Typography,
  Grid,
  Grow,
  Button,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FeaturedItemCard from './FeaturedItemCard'; // Import the new card

const FeaturedItemsSection = ({ theme, visible, featuredItems }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<StarIcon />}
            label="ÖNE ÇIKANLAR"
            color="primary"
            sx={{ mb: 2, fontWeight: 'bold' }}
          />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Öne Çıkan Takaslar
          </Typography>
          <Typography variant="body1" color="text.secondary">
            En popüler ve ilgi çeken takas teklifleri
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featuredItems.map((item, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={item.id}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Grow in={visible} timeout={1200 + index * 200}>
                <div> {/* Grow needs a direct child that accepts a ref */}
                  <FeaturedItemCard 
                    item={item} 
                    theme={theme} 
                    isHovered={hoveredCard === item.id} 
                  />
                </div>
              </Grow>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 3, px: 6 }}
            onClick={() => console.log('Daha Fazla Ürün')}
          >
            Daha Fazla Ürün Gör
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedItemsSection;