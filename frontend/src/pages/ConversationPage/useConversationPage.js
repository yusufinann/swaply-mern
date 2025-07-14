import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { getChatById } from '../../services/chatService';
import { useWebSocket } from '../../shared/context/WebSocketContext/context';

export const useConversationPage = () => {
    const { chatId } = useParams();
    const { user: currentUser, loading: authLoading } = useAuth();
    const { socket, isConnected } = useWebSocket();

    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChatData = async () => {
            if (authLoading) return;
            if (!chatId || !currentUser?._id) {
                setError("Sohbet bulunamadı veya bu sayfayı görüntülemek için giriş yapmalısınız.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await getChatById(chatId);
                if (response.success && response.data) {
                    setChat(response.data);
                    setMessages(response.data.messages || []);
                } else {
                    throw new Error(response.message || 'Sohbet verileri alınamadı.');
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };
        fetchChatData();
    }, [chatId, currentUser, authLoading]);

    useEffect(() => {
        if (socket && isConnected && chat?._id && currentUser?._id) {
            const hasUnreadMessages = messages.some(
                msg => msg.status !== 'read' && msg.sender?._id !== currentUser._id
            );
            if (hasUnreadMessages) {
                const payload = {
                    type: 'mark_as_read',
                    payload: {
                        chatId: chat._id,
                        readerId: currentUser._id
                    }
                };
                socket.send(JSON.stringify(payload));
            }
        }
    }, [socket, isConnected, chat, currentUser, messages]);

    useEffect(() => {
        if (!socket || !chat?._id) return;

        const handleWebSocketEvent = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'new_message' && data.payload.chatId === chat._id) {
                    setMessages(prev => {
                        if (prev.some(msg => msg._id === data.payload._id)) {
                            return prev;
                        }
                        return [...prev, data.payload];
                    });
                } else if (data.type === 'messages_read' && data.payload.chatId === chat._id) {
                    const { readMessageIds } = data.payload;
                    setMessages(prev =>
                        prev.map(msg => 
                            readMessageIds.includes(msg._id.toString())
                                ? { ...msg, status: 'read' }
                                : msg
                        )
                    );
                }
            } catch (e) {
                console.error("Gelen WebSocket mesajı işlenirken hata oluştu:", e);
            }
        };

        socket.addEventListener('message', handleWebSocketEvent);
        return () => {
            socket.removeEventListener('message', handleWebSocketEvent);
        };
    }, [socket, chat?._id]);

    const sendMessage = useCallback((text) => {
        if (!socket || !isConnected || !chat || !currentUser) {
            console.error("Mesaj göndermek için bağlantı veya gerekli bilgiler eksik.");
            return;
        }
        const messagePayload = {
            type: 'chat_message',
            payload: {
                chatId: chat._id,
                senderId: currentUser._id,
                text: text.trim(),
            }
        };
        socket.send(JSON.stringify(messagePayload));
    }, [socket, isConnected, chat, currentUser]);

    return { chat, messages, currentUser, loading, error, sendMessage };
};