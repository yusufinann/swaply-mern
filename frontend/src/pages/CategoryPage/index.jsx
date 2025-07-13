// src/pages/CategoryPage/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography,CircularProgress, Alert, Button } from '@mui/material';
import { categories } from '../../constants/datas';
import ItemListSection from '../MainScreen/components/ItemListSection';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const foundCategory = categories.find(cat => cat.value.toLowerCase() === categoryId.toLowerCase()); //Slug uyumlu hale getirildi.

    if (foundCategory) {
      setCategoryInfo(foundCategory);
    } else {
      setError(`"${categoryId}" adında bir kategori bulunamadı.`);
    }
    setLoading(false);
  }, [categoryId]);

  const handleClearCategory = () => {
    navigate('/');
  };

  if (loading) {
    return (
      // <MainAppLayout> KALDIRILDI
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', py: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Kategori bilgileri yükleniyor...</Typography>
      </Container>
      // </MainAppLayout> KALDIRILDI
    );
  }

  if (error || !categoryInfo) {
    return (
      // <MainAppLayout> KALDIRILDI
      <Container sx={{ textAlign: 'center', py: 5 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Kategori bilgileri alınamadı.'}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Ana Sayfaya Dön
        </Button>
      </Container>
      // </MainAppLayout> KALDIRILDI
    );
  }
  return (
    <ItemListSection
      title={categoryInfo.title}
      subtitle={categoryInfo.subtitle || `"${categoryInfo.title}" kategorisindeki tüm takaslık ürünleri keşfedin.`}
      categoryFilter={categoryId}
      onClearCategory={handleClearCategory}
      itemsPerPage={12}
    />
  );
};

export default CategoryPage;