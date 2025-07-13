// components/ChatHeader.js
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const styles = {
    header: {
        display: 'flex',
        flexDirection: 'row',
        p: 2,
        gap: 2,
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        flexShrink: 0,
    },
    headerImage: {
        height: '50px',
        width: '50px',
        borderRadius: '12px',
    },
    headerInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
};

const ChatHeader = ({ item }) => {
    return (
        <Box sx={styles.header}>
            <Avatar
                variant="rounded"
                src={item.images?.[0] || ''}
                alt={item.title}
                sx={styles.headerImage}
            />
            <Box sx={styles.headerInfo}>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                    {item.title}
                </Typography>
                <Typography variant='body2' color="text.secondary">
                    {item.owner?.firstName || 'Bilinmeyen Kullanıcı'} ile sohbet
                </Typography>
            </Box>
        </Box>
    );
};

export default ChatHeader;