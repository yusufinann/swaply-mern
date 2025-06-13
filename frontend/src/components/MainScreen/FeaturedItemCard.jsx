import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Avatar,
  Box,
  IconButton,
  Button,
  Rating
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const FeaturedItemCard = ({ item, theme, isHovered }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          '& .item-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          className="item-image"
          component="img"
          height="220"
          image={item.imageUrl}
          alt={item.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 1,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <IconButton
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': { backgroundColor: 'white' },
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': { backgroundColor: 'white' },
            }}
          >
            <ShareIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <Chip
            icon={<VerifiedIcon />}
            label="Doğrulanmış"
            size="small"
            color="secondary"
            sx={{
              backgroundColor: 'rgba(76, 175, 80, 0.9)',
              color: 'white',
              fontSize: '0.7rem',
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            lineHeight: 1.3,
            mb: 2,
          }}
        >
          {item.name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={item.category}
            size="small"
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
              fontWeight: 'medium',
            }}
          />
          <Rating value={4.5} size="small" readOnly />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
          {item.description.substring(0, 80)}{item.description.length > 80 && '...'}
        </Typography>

        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium' }}>
            Takas İsteği:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium', mt: 0.5 }}>
            {item.wants.substring(0, 50)}{item.wants.length > 50 && '...'}
          </Typography>
        </Box>
      </CardContent>

      <Box sx={{ p: 3, pt: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
              {item.user.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {item.user}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <LocationOnIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  İstanbul
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              2 saat önce
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<SwapHorizIcon />}
            sx={{ borderRadius: 2, fontWeight: 'bold' }}
          >
            Teklif Ver
          </Button>
          <IconButton
            color="primary"
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
            }}
          >
            <ChatBubbleIcon />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
};

export default FeaturedItemCard;