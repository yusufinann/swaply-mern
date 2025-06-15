// src/pages/LoadProductPage/index.jsx
import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { createItem as createItemApi } from '../../services/itemService';
import { categories as APP_CATEGORIES } from '../../constants/datas'; // Adjusted import

const LoadProductPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState(['']);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    if (images.length < 5) {
      setImages([...images, '']);
    }
  };

  const removeImageField = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages.length > 0 ? newImages : ['']);
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title || !category) {
      setError('Başlık ve Kategori alanları zorunludur.');
      return;
    }

    const filteredImages = images.map(img => img.trim()).filter(img => img !== '');

    const itemData = {
      title: title.trim(),
      description: description.trim(),
      category, // This will now be the slug, e.g., 'moda'
      location: location.trim(),
      images: filteredImages,
      tags,
    };

    setLoading(true);
    try {
      const response = await createItemApi(itemData);
      
      if (response.success) {
        setSuccess('Ürününüz başarıyla yüklendi! Takaslarım sayfasına yönlendiriliyorsunuz...');
        setTitle('');
        setDescription('');
        setCategory('');
        setLocation('');
        setImages(['']);
        setTags([]);
        setCurrentTag('');
        setTimeout(() => {
          navigate('/takasta');
        }, 2000);
      } else {
        setError(response.message || 'Ürün yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      setError(err.message || 'Sunucuyla iletişim kurulamadı veya beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
        Yeni Ürün Yükle
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              helperText="Takas etmek istediğiniz ürünün adı (örn: Kırmızı Bisiklet, Antika Saat)"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              helperText="Bu ürün karşılığında ne tür ürünlerle takas yapmak istersiniz? (örn: Benzer değerde bir tablet, Mutfak robotu, Koleksiyonluk figürler)"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="category"
              select
              label="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              helperText="Ürününüzün ait olduğu kategoriyi seçin."
            >
              <MenuItem value="">
                <em>Kategori Seçin</em>
              </MenuItem>
              {APP_CATEGORIES.map((cat) => (
                <MenuItem key={cat.id} value={cat.value || cat.link.split('/').pop()}>
                  {cat.title}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={loading}
              helperText="Takasın gerçekleşebileceği genel konum (örn: Kadıköy, İstanbul)"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{mt:1}}>Ürün Resimleri (URL)</Typography>
            {images.map((imgUrl, index) => (
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
                {images.length > 1 && (
                  <IconButton onClick={() => removeImageField(index)} color="error" disabled={loading}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            {images.length < 5 && (
              <Button
                size="small"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={addImageField}
                disabled={loading || images.length >= 5}
                variant="outlined"
              >
                Başka Resim Ekle (URL)
              </Button>
            )}
             <Typography variant="caption" display="block" color="textSecondary" sx={{mt: 0.5}}>
                En fazla 5 resim URL'si ekleyebilirsiniz. Gerçek bir uygulamada dosya yükleme özelliği olurdu.
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
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                        }
                    }}
                    disabled={loading || tags.length >= 5}
                    sx={{ mr: 1 }}
                />
                <Button
                    variant="outlined"
                    onClick={handleAddTag}
                    disabled={loading || tags.length >= 5 || !currentTag.trim()}
                    startIcon={<AddCircleOutlineIcon />}
                >
                    Ekle
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    disabled={loading}
                />
                ))}
            </Box>
             <Typography variant="caption" display="block" color="textSecondary" sx={{mt: 0.5}}>
                Ürününüzü tanımlayan en fazla 5 etiket ekleyebilirsiniz.
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ minWidth: '200px', fontWeight: 'bold', py: 1.5 }}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Yükleniyor...' : 'Ürünü Takasa Ekle'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoadProductPage;