// src/pages/MySwappableItemsPage/UserItemCard.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CategoryIcon from '@mui/icons-material/Style'; // Using Style as a generic category icon
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// useNavigate is not directly used for props actions, so it can be removed if not needed for other internal navigation.
// import { useNavigate } from 'react-router-dom';

const UserItemCard = ({ item, onDeleteClick, onEditClick, onViewOffersClick }) => {
  // const navigate = useNavigate();

  const handleEdit = () => {
    if (onEditClick) onEditClick(item._id);
  };

  const handleDelete = () => {
    // Pass item.title (or item.name if that's what your backend/display logic uses)
    // The backend item model uses 'title'.
    if (onDeleteClick) onDeleteClick(item._id, item.title || item.name);
  };

  const handleViewOffers = () => {
    if (onViewOffersClick) onViewOffersClick(item._id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Determine the name/title to display. Backend uses 'title'.
  const itemName = item.title || item.name || 'İsimsiz Ürün';
  // Determine the desired items/description. Backend uses 'description' for what user wants.
  const desiredItemsText = item.description || item.desiredItems || 'Belirtilmemiş';

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/300x200.png?text=Resim+Yok'}
        alt={itemName}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', minHeight: '3em' }}>
          {itemName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CategoryIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {item.category || 'Kategori Yok'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Yüklenme: {formatDate(item.createdAt)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.primary" sx={{ mb: 1, fontWeight: 'medium' }}>
          Takas İsteği:
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '2.5em'
        }}>
          {desiredItemsText}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, justifyContent: 'space-between', borderTop: '1px solid #eee' }}>
        <Box>
            <Tooltip title="Düzenle">
                <IconButton onClick={handleEdit} color="primary" aria-label="edit item">
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Sil">
                <IconButton onClick={handleDelete} color="error" aria-label="delete item">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>
        {/*
          offersCount is not part of your backend Item model.
          If you add it later, this part will work. Otherwise, it will not render.
        */}
        {typeof item.offersCount === 'number' && (
            <Tooltip title={`${item.offersCount} Teklif Mevcut`}>
                <Chip
                    icon={<VisibilityIcon />}
                    label={`${item.offersCount} Teklif`}
                    onClick={handleViewOffers}
                    clickable
                    variant="outlined"
                    color="secondary"
                    size="small"
                />
            </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default UserItemCard;