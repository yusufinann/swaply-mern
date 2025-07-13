// components/MessageArea.js
import React, { useRef, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import MessageBubble from './MessageBubble';

const styles = {
    messageArea: {
        flexGrow: 1,
        p: 2,
        overflowY: 'auto',
        backgroundColor: '#f4f4f8',
        display: 'flex',
        flexDirection: 'column',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '3px',
        },
    },
};

const MessageArea = ({ messages, currentUser }) => {
    const endOfMessagesRef = useRef(null);

    // const scrollToBottom = () => {
    //     endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

    return (
        <Box sx={styles.messageArea}>
            <Stack spacing={2}>
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isOwnMessage={msg.senderId === currentUser.id}
                    />
                ))}
            </Stack>
            <div ref={endOfMessagesRef} />
        </Box>
    );
};

export default MessageArea;