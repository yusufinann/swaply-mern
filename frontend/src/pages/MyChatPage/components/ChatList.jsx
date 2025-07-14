import React from 'react';
import { List, Divider } from '@mui/material';
import ChatListItem from './ChatListItem';

const ChatList = ({ chats }) => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            {chats.map((chat, index) => (
                <React.Fragment key={chat._id}>
                    <ChatListItem chat={chat} />
                    {index < chats.length - 1 && <Divider component="li" />}
                </React.Fragment>
            ))}
        </List>
    );
};

export default ChatList;