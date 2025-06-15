// src/pages/EditProductPage/index.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress,
  Alert,
  MenuItem,
  Chip,
  IconButton
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemById as getItemByIdApi, updateItem as updateItemApi } from '../../services/itemService';
import { categories as APP_CATEGORIES } from '../../constants/datas'; // Adjusted import

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id: itemId } = useParams();

  const [initialLoading, setInitialLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    images: [''],
    tags: [],
    status: 'Available',
  });
  const [currentTag, setCurrentTag] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const populateForm = useCallback((item) => {
    setFormValues({
      title: item.title || '',
      description: item.description || '',
      category: item.category || '', // This will be the slug from backend, e.g., 'moda'
      location: item.location || '',
      images: item.images && item.images.length > 0 ? item.images : [''],
      tags: item.tags || [],
      status: item.status || 'Available',
    });
  }, []);

  useEffect(() => {
    const fetchItemData = async () => {
      if (!itemId) {
        setError("Ürün ID'si bulunamadı.");
        setInitialLoading(false);
        return;
      }
      setInitialLoading(true);
      setError(null);
      try {
        const response = await getItemByIdApi(itemId);
        if (response.success && response.data) {
          populateForm(response.data);
        } else {
          setError(response.message || "Ürün bilgileri yüklenemedi.");
        }
      } catch (err) {
        setError(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchItemData();
  }, [itemId, populateForm]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formValues.images];
    newImages[index] = value;
    setFormValues(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    if (formValues.images.length < 5) {
      setFormValues(prev => ({ ...prev, images: [...prev.images, ''] }));
    }
  };

  const removeImageField = (index) => {
    const newImages = formValues.images.filter((_, i) => i !== index);
    setFormValues(prev => ({ ...prev, images: newImages.length > 0 ? newImages : [''] }));
  };

  const handleAddTag = () => {
    if (currentTag && !formValues.tags.includes(currentTag.trim()) && formValues.tags.length < 5) {
      setFormValues(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
      setCurrentTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormValues(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToDelete) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formValues.title || !formValues.category) {
      setError('Başlık ve Kategori alanları zorunludur.');
      return;
    }

    const filteredImages = formValues.images.map(img => img.trim()).filter(img => img !== '');

    const itemDataToUpdate = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      category: formValues.category, // This will be the slug, e.g., 'moda'
      location: formValues.location.trim(),
      images: filteredImages,
      tags: formValues.tags,
      status: formValues.status,
    };

    setLoading(true);
    try {
      const response = await updateItemApi(itemId, itemDataToUpdate);
      if (response.success) {
        setSuccess('Ürününüz başarıyla güncellendi! Takaslarım sayfasına yönlendiriliyorsunuz...');
        setTimeout(() => {
          navigate('/takasta');
        }, 2000);
      } else {
        setError(response.message || 'Ürün güncellenirken bir hata oluştu.');
      }
    } catch (err) {
      setError(err.message || 'Sunucuyla iletişim kurulamadı veya beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Container sx={{ textAlign: 'center', py: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Ürün bilgileri yükleniyor...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/takasta')} sx={{ mb: 2 }}>
        Takaslarıma Dön
      </Button>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
        Ürünü Düzenle
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Ürün Başlığı"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              label="Takas İçin İstedikleriniz (Açıklama)"
              name="description"
              multiline
              rows={3}
              value={formValues.description}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="category"
              name="category"
              select
              label="Kategori"
              value={formValues.category} // This will be e.g. 'moda'
              onChange={handleInputChange}
              disabled={loading}
            >
              <MenuItem value=""><em>Kategori Seçin</em></MenuItem>
              {APP_CATEGORIES.map((cat) => (
                <MenuItem key={cat.id} value={cat.value || cat.link.split('/').pop()}> {/* Value is e.g. 'moda' */}
                  {cat.title} {/* Displayed text is e.g. 'Moda ve Giyim' */}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="location"
              label="Konum (İlçe, Şehir)"
              name="location"
              value={formValues.location}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Grid>

           <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="status"
              name="status"
              select
              label="Durum"
              value={formValues.status}
              onChange={handleInputChange}
              disabled={loading}
              helperText="Ürünün mevcut takas durumu."
            >
              <MenuItem value="Available">Takasa Açık</MenuItem>
              <MenuItem value="Pending">Takas Beklemede</MenuItem>
              <MenuItem value="Swapped">Takaslandı</MenuItem>
            </TextField>
          </Grid>


          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{mt:1}}>Ürün Resimleri (URL)</Typography>
            {formValues.images.map((imgUrl, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label={`Resim URL ${index + 1}`}
                  value={imgUrl}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  disabled={loading}
                  sx={{ mr: 1 }}
                  placeholder="https://example.com/image.jpg"
                />
                {formValues.images.length > 1 && (
                  <IconButton onClick={() => removeImageField(index)} color="error" disabled={loading}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            {formValues.images.length < 5 && (
              <Button
                size="small"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={addImageField}
                disabled={loading || formValues.images.length >= 5}
                variant="outlined"
              >
                Başka Resim Ekle (URL)
              </Button>
            )}
            <Typography variant="caption" display="block" color="textSecondary" sx={{mt: 0.5}}>
                En fazla 5 resim URL'si ekleyebilirsiniz.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{mt:1}}>Etiketler</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Etiket Ekle"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }
                    }}
                    disabled={loading || formValues.tags.length >= 5}
                    sx={{ mr: 1 }}
                />
                <Button
                    variant="outlined"
                    onClick={handleAddTag}
                    disabled={loading || formValues.tags.length >= 5 || !currentTag.trim()}
                    startIcon={<AddCircleOutlineIcon />}
                >
                    Ekle
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formValues.tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    disabled={loading}
                />
                ))}
            </Box>
             <Typography variant="caption" display="block" color="textSecondary" sx={{mt: 0.5}}>
                En fazla 5 etiket.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading || initialLoading}
              sx={{ minWidth: '200px', fontWeight: 'bold', py: 1.5 }}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditProductPage;