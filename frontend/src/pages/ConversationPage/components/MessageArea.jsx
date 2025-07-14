// src/components/MessageArea.js (GÜNCELLENMİŞ)

import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material'; // Stack import'u kaldırıldı
import MessageBubble from './MessageBubble';
import DateHeader from './DateHeader';

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
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [messages]);

    if (!currentUser) return null;

    const chatElements = [];
    let lastMessageDate = null;

    messages.forEach((msg) => {
        const messageDate = new Date(msg.createdAt).toDateString();

        if (messageDate !== lastMessageDate) {
            chatElements.push(
                <DateHeader key={messageDate} date={msg.createdAt} />
            );
            lastMessageDate = messageDate;
        }

        chatElements.push(
            <MessageBubble
                key={msg._id}
                message={msg}
                isOwnMessage={msg.sender?._id === currentUser._id}
            />
        );
    });

    return (
        <Box sx={styles.messageArea} ref={scrollContainerRef}>
            {chatElements}
        </Box>
    );
};

export default MessageArea;