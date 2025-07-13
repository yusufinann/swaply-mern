// components/MessageBubble.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const MessageBubble = ({ message, isOwnMessage }) => {
    const bubbleStyles = {
        p: 1.5,
        borderRadius: '20px',
        maxWidth: '70%',
        wordBreak: 'break-word',
        color: isOwnMessage ? 'white' : 'black',
        bgcolor: isOwnMessage ? 'primary.main' : '#e5e5ea',
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
    };

    return (
        <Box sx={bubbleStyles}>
            <Typography variant="body1">{message.text}</Typography>
        </Box>
    );
};

export default MessageBubble;