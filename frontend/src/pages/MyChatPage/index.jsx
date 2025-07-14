import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import { getMyChats } from '../../services/chatService';
import ChatList from './components/ChatList';

const MyChatsPage = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                setLoading(true);
                const response = await getMyChats();
                if (response.success) {
                    setChats(response.data);
                } else {
                    setError(response.message || 'Sohbetler yüklenemedi.');
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Bir sunucu hatası oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="80vh"><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;
    }

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                Sohbetlerim
            </Typography>
            <Paper elevation={3} sx={{ borderRadius: 2 }}>
                {chats.length > 0 ? (
                    <ChatList chats={chats} />
                ) : (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography color="text.secondary">Henüz bir sohbetiniz bulunmuyor.</Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default MyChatsPage;