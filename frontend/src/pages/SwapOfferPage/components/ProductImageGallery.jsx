import React from 'react';
import { Box, Chip, ImageList, ImageListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProductImageGallery = ({ mainImage, otherImages, itemTitle, isBestSeller, onImageClick }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: { xs: '100%', md: '40%' } }}>
      <Box
        sx={{
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: 2,
          mb: otherImages.length > 0 ? 2 : 0,
          aspectRatio: '1/1',
          backgroundColor: theme.palette.grey[200],
        }}
        onClick={() => onImageClick(mainImage)}
      >
        <img
          src={mainImage}
          alt={itemTitle}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
        {isBestSeller && (
          <Chip
            label="EN ÇOK SATAN"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: 'warning.main',
              color: 'common.white',
              fontWeight: 'bold',
              borderRadius: '4px',
              height: 'auto',
              '& .MuiChip-label': {
                padding: '4px 8px',
                fontSize: '0.8rem'
              }
            }}
          />
        )}
      </Box>
      {otherImages.length > 0 && (
        <ImageList sx={{ width: '100%', height: 'auto', mt: 1 }} cols={Math.min(otherImages.length, 4)} rowHeight={100} gap={8}>
          {otherImages.map((img, index) => (
            <ImageListItem key={index} sx={{ cursor: 'pointer', borderRadius: 1, overflow: 'hidden', backgroundColor: theme.palette.grey[200], border: `1px solid ${theme.palette.grey[300]}` }} onClick={() => onImageClick(img)}>
              <img
                srcSet={`${img}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                src={`${img}?w=100&h=100&fit=crop&auto=format`}
                alt={`${itemTitle} - ${index + 2}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default ProductImageGallery;