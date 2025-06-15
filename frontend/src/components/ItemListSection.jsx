import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Grow, Button, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeaturedItemCard from './MainScreen/FeaturedItemCard';
import { useTheme } from '@mui/material/styles';
import { getAllAvailableItems } from '../services/itemService';

const ItemListSection = ({
  title,
  subtitle,
  onClearCategory,
  categoryFilter,
  searchQuery,
  itemsPerPage = 8,
}) => {
  const theme = useTheme();
  const [internalItems, setInternalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showViewMore, setShowViewMore] = useState(false);

  useEffect(() => {
    const fetchItems = async (pageToFetch = 1) => {
      setLoading(true);
      if (pageToFetch === 1) setError(null); // Reset error only on initial load/filter change

      try {
        const params = { page: pageToFetch, limit: itemsPerPage };
        if (categoryFilter) params.category = categoryFilter;
        if (searchQuery) params.search = searchQuery;

        const response = await getAllAvailableItems(params);
        if (response.success) {
          setInternalItems(prevItems => pageToFetch === 1 ? response.data : [...prevItems, ...response.data]);
          setTotalPages(response.totalPages || 1);
          setCurrentPage(response.currentPage || pageToFetch);
          setShowViewMore((response.currentPage || pageToFetch) < (response.totalPages || 1));
        } else {
          setError(response.message || "Ürünler yüklenemedi.");
          if (pageToFetch === 1) setInternalItems([]);
        }
      } catch (err) {
        setError(err.message || "Bir hata oluştu.");
        if (pageToFetch === 1) setInternalItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems(1);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, searchQuery, itemsPerPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      // Re-trigger fetch logic for the next page
      fetchMoreItems(nextPage);
    }
  };
  
  const fetchMoreItems = async (page) => {
      setLoading(true);
      try {
        const params = { page, limit: itemsPerPage };
        if (categoryFilter) params.category = categoryFilter;
        if (searchQuery) params.search = searchQuery;
        
        const response = await getAllAvailableItems(params);
        if (response.success) {
          setInternalItems(prevItems => [...prevItems, ...response.data]);
          setCurrentPage(response.currentPage || page);
          setTotalPages(response.totalPages || totalPages); // Keep existing if not returned
          setShowViewMore((response.currentPage || page) < (response.totalPages || totalPages));
        } else {
          console.error("Daha fazla ürün yüklenemedi:", response.message);
          // Optionally show a snackbar for load more errors
        }
      } catch (err) {
        console.error("Daha fazla ürün yüklenirken hata:", err.message);
      } finally {
        setLoading(false);
      }
  };

  if (loading && currentPage === 1 && internalItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{mt: 2}}>Ürünler yükleniyor...</Typography>
      </Container>
    );
  }

  if (!loading && error && internalItems.length === 0) {
     return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          {onClearCategory && (
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onClearCategory} sx={{ mb: 4 }}>
              Geri Dön
            </Button>
          )}
           <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            {title || (categoryFilter ? `${categoryFilter} Kategorisi` : "Tüm Ürünler")}
          </Typography>
          <Alert severity="error" sx={{mt: 2}}>{error}</Alert>
        </Box>
      </Container>
     );
  }

  if (!loading && internalItems.length === 0 && !error) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          {onClearCategory && (
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onClearCategory} sx={{ mb: 4 }}>
              Geri Dön
            </Button>
          )}
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            {title || (categoryFilter ? `${categoryFilter} Kategorisi` : "Tüm Ürünler")}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {searchQuery ? `"${searchQuery}" için sonuç bulunamadı.` : "Görünüşe göre burada hiç ürün yok!"}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: {xs: 4, md: 6} }}>
          {onClearCategory && (
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onClearCategory} sx={{ mb: 3 }}>
              Tüm Kategorilere Dön
            </Button>
          )}
          <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 1.5, fontSize: {xs: '2rem', sm: '2.5rem'} }}>
            {title || (categoryFilter ? `${categoryFilter} Kategorisi` : "Keşfet")}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <Grid container spacing={{xs: 2, sm: 3, md: 4}}>
          {internalItems.map((item, index) => (
            <Grid
              item xs={12} sm={6} md={4} lg={3}
              key={item._id || index}
              onMouseEnter={() => setHoveredCard(item._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Grow in={true} timeout={300 + index * 100} style={{ transformOrigin: '0 0 0' }}>
                <div>
                  <FeaturedItemCard
                    item={item}
                    theme={theme}
                    isHovered={hoveredCard === item._id}
                  />
                </div>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {showViewMore && internalItems.length > 0 && currentPage < totalPages && (
          <Box sx={{ textAlign: 'center', mt: {xs: 4, md: 6} }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 3, px: 6, py: 1.5 }}
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading && currentPage > 1 && internalItems.length > 0 ? <CircularProgress size={24} color="inherit"/> : "Daha Fazla Yükle"}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

ItemListSection.defaultProps = {
  title: "Öne Çıkan Ürünler",
  itemsPerPage: 8,
};

export default ItemListSection;