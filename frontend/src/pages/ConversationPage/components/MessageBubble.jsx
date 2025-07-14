// src/components/MessageBubble.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done'; // Tek tik
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Çift tik

const MessageBubble = ({ message, isOwnMessage }) => {
    
    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const bubbleWrapperStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
        maxWidth: '70%',
        mb: 2, 
    };

    const bubbleStyles = {
        p: 1.5,
        borderRadius: '20px',
        wordBreak: 'break-word',
        color: isOwnMessage ? 'white' : 'black',
        bgcolor: isOwnMessage ? 'primary.main' : '#e5e5ea',
    };

    const timeStyles = {
        fontSize: '0.75rem',
        color: 'text.secondary',
        mt: 0.5,
        px: 1,
    };

     const renderStatusTick = () => {
        if (!isOwnMessage) return null; // Tikler sadece kendi mesajlarımızda görünür
        
        const tickColor = message.status === 'read' ? 'info.main' : 'text.secondary';

        if (message.status === 'sent') {
            return <DoneIcon sx={{ fontSize: '1rem', color: 'text.secondary', ml: 0.5 }} />;
        }
        if (message.status === 'delivered' || message.status === 'read') {
            return <DoneAllIcon sx={{ fontSize: '1rem', color: tickColor, ml: 0.5 }} />;
        }
        return null;
    };
   return (
        <Box sx={bubbleWrapperStyles}>
            <Box sx={bubbleStyles}>
                <Typography variant="body1">{message.text}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end', mt: 0.5, px: 1 }}>
                <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                    {formatTime(message.createdAt)}
                </Typography>
                {renderStatusTick()}
            </Box>
        </Box>
    );
};

export default MessageBubble;