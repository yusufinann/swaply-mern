import React from 'react';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/context/AuthContext';

const ChatListItem = ({ chat }) => {
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    if (!currentUser?._id) return null;

    const otherParticipant = chat.participants.find(p => p._id !== currentUser._id);
    
    if (!otherParticipant) return null;

    const lastMessage = chat.lastMessage;
    const chatUrl = `/chats/${chat._id}`;

    const handleNavigate = () => {
        navigate(chatUrl);
    };

    return (
        <ListItem
            alignItems="flex-start"
            button
            onClick={handleNavigate}
            sx={{
                py: 2,
                '&:hover': {
                    backgroundColor: 'action.hover'
                },
                cursor: 'pointer'
            }}
        >
            <ListItemAvatar>
                <Avatar 
                    alt={otherParticipant.firstName} 
                    src={otherParticipant.avatarUrl} 
                    sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.light' }}
                >
                    {/* Fallback in case avatarUrl is missing */}
                    {otherParticipant.firstName?.charAt(0)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                        {`${otherParticipant.firstName} ${otherParticipant.lastName}`}
                    </Typography>
                }
                secondary={
                    <Box>
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: 'block', fontWeight: 'medium' }}
                        >
                            {chat.item?.title || 'Ürün bilgisi mevcut değil'}
                        </Typography>
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            noWrap
                            sx={{
                                fontStyle: lastMessage ? 'normal' : 'italic',
                                color: lastMessage ? 'text.primary' : 'text.secondary'
                            }}
                        >
                            {lastMessage?.text || 'Henüz mesajlaşma olmadı.'}
                        </Typography>
                    </Box>
                }
            />
            {lastMessage?.createdAt && (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 2, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
                    {new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            )}
        </ListItem>
    );
};

export default ChatListItem;