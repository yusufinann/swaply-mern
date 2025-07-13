// ConversationPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useConversationPage } from './useConversationPage';
import ChatList from './components/ChatList';
import ChatHeader from './components/ChatHeader';
import MessageArea from './components/MessageArea';
import MessageInput from './components/MessageInput';

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(90vh - 64px)', // Adjust based on your AppBar height
        backgroundColor: '#fff',
        gap:10,
        p:2
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    errorContainer: {
        p: 4,
    },
    activeChatPanel: {
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '60vw', md: '60vw' },
        height: '100%',
    },
};

const ConversationPage = () => {
    const { item: initialItem, currentUser, loading, error } = useConversationPage();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (initialItem?.messages) {
            setMessages(initialItem.messages);
        }
    }, [initialItem]);

    const handleSendMessage = (text) => {
        const newMessage = {
            id: Date.now(),
            senderId: currentUser.id,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    if (loading) {
        return (
            <Box sx={styles.loadingContainer}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Sohbet yükleniyor...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={styles.errorContainer}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!initialItem) {
        return (
            <Box sx={styles.errorContainer}>
                <Alert severity="warning">Sohbete konu olan ürün bulunamadı.</Alert>
            </Box>
        );
    }

    return (
        <Box sx={styles.mainContainer}>
            <ChatList />
            <Box sx={styles.activeChatPanel}>
                <ChatHeader item={initialItem} />
                <MessageArea messages={messages} currentUser={currentUser} />
                <MessageInput onSendMessage={handleSendMessage} />
            </Box>
        </Box>
    );
};

export default ConversationPage;