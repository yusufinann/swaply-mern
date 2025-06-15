// src/pages/MySwappableItemsPage/index.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar 
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import UserItemCard from './UserItemCard';
import { getMyItems as getMyItemsApi, deleteItem as deleteItemApi } from '../../services/itemService'; // Import actual API calls

const MySwappableItemsPage = () => {
  const navigate = useNavigate();
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For fetching errors

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, name: '' });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getMyItemsApi(); // Actual API call
        if (response.success) {
          setItems(response.data);
        } else {
          setError(response.message || 'Ürünler yüklenirken bir hata oluştu.');
          setItems([]);
        }
      } catch (err) {
        setError(err.message || 'Sunucuyla iletişim kurulamadı veya beklenmeyen bir hata oluştu.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddNewItem = () => {
    navigate('/urun-yukle');
  };

  const handleEditItem = (itemId) => {
    navigate(`/urun-duzenle/${itemId}`); // Ensure this route exists and page is implemented
    // console.log(`Edit item with ID: ${itemId}`);
  };

  const openDeleteConfirmation = (itemId, itemName) => {
    setItemToDelete({ id: itemId, name: itemName });
    setDeleteDialogOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteDialogOpen(false);
    setItemToDelete({ id: null, name: '' });
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete.id) return;
    
    // Optimistic UI update can be done here if preferred, then revert on error
    // For now, we wait for API response.
    
    try {
      const response = await deleteItemApi(itemToDelete.id); // Actual API call
      if (response.success) {
        setItems(prevItems => prevItems.filter(item => item._id !== itemToDelete.id));
        setSnackbarMessage(response.message || 'Ürün başarıyla silindi.');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage(response.message || 'Ürün silinirken bir hata oluştu.');
        setSnackbarSeverity('error');
      }
    } catch (err) {
      setSnackbarMessage(err.message || 'Sunucu hatası: Ürün silinemedi.');
      setSnackbarSeverity('error');
    } finally {
      closeDeleteConfirmation();
      setSnackbarOpen(true);
    }
  };

  const handleViewOffersForItem = (itemId) => {
    navigate(`/urun/${itemId}/teklifler`); // Ensure this route exists and page is implemented
    // console.log(`Viewing offers for item ID: ${itemId}`);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', py: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Ürünleriniz yükleniyor...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt:0 }}> {/* Removed mt:5, assuming MainAppLayout handles top padding */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Takastaki Ürünlerim
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddNewItem}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          Yeni Ürün Ekle
        </Button>
      </Box>

      {error && ( // This error is for initial fetch
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {items.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Henüz takas için yüklediğiniz bir ürün bulunmuyor.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Hemen ilk ürününüzü yükleyerek takas yapmaya başlayın!
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleAddNewItem}
            size="large"
          >
            İlk Ürününü Yükle
          </Button>
        </Box>
      )}

      {items.length > 0 && (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <UserItemCard 
                item={item} 
                onDeleteClick={() => openDeleteConfirmation(item._id, item.title)} // Pass item.title for dialog
                onEditClick={() => handleEditItem(item._id)}
                onViewOffersClick={() => handleViewOffersForItem(item._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteConfirmation}
        aria-labelledby="delete-confirm-dialog-title"
        aria-describedby="delete-confirm-dialog-description"
      >
        <DialogTitle id="delete-confirm-dialog-title">Ürünü Silmeyi Onayla</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-confirm-dialog-description">
            "{itemToDelete.name}" adlı ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            İptal
          </Button>
          <Button onClick={handleDeleteItem} color="error" autoFocus>
            Sil
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MySwappableItemsPage;