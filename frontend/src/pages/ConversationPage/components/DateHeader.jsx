import React from 'react';
import { Box, Chip } from '@mui/material';

const formatDateHeader = (dateString) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    messageDate.setHours(0, 0, 0, 0);

    if (today.getTime() === messageDate.getTime()) {
        return 'TODAY';
    }

    if (yesterday.getTime() === messageDate.getTime()) {
        return 'YESTERDAY';
    }

    return messageDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const DateHeader = ({ date }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Chip 
                label={formatDateHeader(date)} 
                sx={{ pointerEvents: 'none' }}
            />
        </Box>
    );
};

export default DateHeader;