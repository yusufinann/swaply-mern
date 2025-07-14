import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useConversationPage } from './useConversationPage';
import ProductInfo from './components/ProductInfo';
import ChatHeader from './components/ChatHeader';
import MessageArea from './components/MessageArea';
import MessageInput from './components/MessageInput';
import { useWebSocket } from '../../shared/context/WebSocketContext/context';

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(90vh - 64px)',
        backgroundColor: '#fff',
        gap: 10,
        p: 2
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
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden'
    },
};

const ConversationPage = () => {
    // Hook'tan dönen değerler değişti. Artık 'item' yok.
    const { chat, messages, currentUser, loading, error, sendMessage } = useConversationPage();
    const { isConnected } = useWebSocket();

    const isSendDisabled = loading || !isConnected || !chat;

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

    // Artık 'chat' objesinin varlığını kontrol ediyoruz.
    if (!chat) {
        return (
            <Box sx={styles.errorContainer}>
                <Alert severity="warning">Sohbet bulunamadı.</Alert>
            </Box>
        );
    }

    return (
        <Box sx={styles.mainContainer}>
             <ProductInfo />
            <Box sx={styles.activeChatPanel}>
                {/* ChatHeader'a chat.item'ı gönderiyoruz */}
                <ChatHeader item={chat.item} />
                <MessageArea messages={messages} currentUser={currentUser} />
                <MessageInput onSendMessage={sendMessage} disabled={isSendDisabled} />
            </Box>
        </Box>
    );
};

export default ConversationPage;