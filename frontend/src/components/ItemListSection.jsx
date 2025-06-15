import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Grow,
  Button,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeaturedItemCard from './MainScreen/FeaturedItemCard';

const ItemListSection = ({
  theme,
  visible,
  items,
  title,
  subtitle,
  onClearCategory,
  showViewMore = false,
  viewMoreAction,
  viewMoreText = "Daha Fazla Ürün Gör"
}) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!items || items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          {onClearCategory && (
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={onClearCategory}
              sx={{ mb: 4 }}
            >
              Geri Dön
            </Button>
          )}
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Bu kategoride henüz ürün bulunmamaktadır.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, py: { xs: 1, md: 3 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          {onClearCategory && (
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={onClearCategory}
              sx={{ mb: 4 }}
            >
              Geri Dön
            </Button>
          )}
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item.id}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Grow in={visible} timeout={800 + index * 150}>
                <div>
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

        {showViewMore && items.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 3, px: 6 }}
              onClick={viewMoreAction || (() => console.log('View More Clicked'))}
            >
              {viewMoreText}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

ItemListSection.defaultProps = {
  visible: true,
  items: [],
  title: "Ürünler",
  theme: {
    palette: {
      background: { paper: '#fff' },
      primary: { main: '#1976d2' },
      secondary: { light: '#ba68c8', contrastText: '#fff' },
      text: { secondary: 'rgba(0,0,0,0.6)' }
    }
  }
};

export default ItemListSection;