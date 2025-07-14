import React from 'react';
import { Box, Typography } from '@mui/material';

const styles = {
    panel: {
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
        width: '320px',
        flexShrink: 0,
        height: '60%',
    },
    header: {
        p: 2,
        borderBottom: '1px solid #e0e0e0',
    },
    placeholderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 2,
        textAlign: 'center',
    },
    placeholder: {
        p: 3,
        border: '2px dashed #e0e0e0',
        borderRadius: '16px',
        width: '80%',
    },
};

const ProductInfo = () => {
    return (
        <Box sx={styles.panel}>
            <Box sx={styles.header}>
                <Typography variant="h6" fontWeight="bold">Ürün bilgileri</Typography>
            </Box>
            <Box sx={styles.placeholderContainer}>
                <Box sx={styles.placeholder}>
                    <Typography color="text.secondary">
                        ürün bilgileri burada listelenecek.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductInfo;