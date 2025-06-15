import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Grow,
  Card,
  CardContent,
  Button,
} from '@mui/material';


const CategoriesSection = ({ theme, visible, categories, onCategorySelect }) => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Kategoriler
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {categories.slice(0, 8).map((category, index) => (
          <Grid item xs={6} sm={4} md={3} key={category.id}>
            <Grow in={visible} timeout={800 + index * 100}>
              <Card
                sx={{
                  height: '100%',
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  backgroundColor: category.bgColor,
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    '& .category-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                onClick={() => onCategorySelect(category)}
              >
                <Box className="category-icon" sx={{
                  mb: 3,
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  {category.icon}
                </Box>
                <CardContent sx={{ textAlign: 'center', p: 0, '&:last-child': { pb: 0 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      mb: 1,
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    }}
                  >
                    {category.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{ borderRadius: 3, px: 4 }}
          onClick={() => console.log('Tüm Kategoriler sayfasına git')}
        >
          Tüm Kategorileri Gör
        </Button>
      </Box>
    </Container>
  );
};

export default CategoriesSection;