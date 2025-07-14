import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const styles = {
    inputArea: {
        display: 'flex',
        p: 2,
        gap: 2,
        alignItems: 'center',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        flexShrink: 0,
    },
};

const MessageInput = ({ onSendMessage, disabled }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <Box sx={styles.inputArea}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={disabled ? "Bağlantı kuruluyor..." : "Mesajınızı yazın..."}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={4}
                disabled={disabled}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                    },
                }}
            />
            <IconButton
                color="primary"
                onClick={handleSend}
                disabled={disabled || !text.trim()}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default MessageInput;