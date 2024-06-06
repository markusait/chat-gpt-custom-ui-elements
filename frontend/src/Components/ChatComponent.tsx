import React from 'react';
import { Container, TextField, Box, Paper, Typography, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatMessage } from '../types/Chat';


interface ChatComponentProps {
    userMessage: string;
    setUserMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (messageContent: string, shouldSetSenderMsg: boolean) => void;
    chatMessages: ChatMessage[];
    // Define your component's props here
}

const MessageComponent: React.FC<MessageComponentProps> = ({ msg }) => {
    if (msg.type === 'element-select' && msg.sender === 'bot') {
        return (
            <>
                {/* Your element-select rendering logic here */}
            </>
        );
    } else {
        return (
            <Typography
                variant="body1"
                sx={{
                    display: 'inline-block',
                    padding: 1,
                    borderRadius: 1,
                    backgroundColor: msg.sender === 'user' ? 'primary.main' : 'secondary.main',
                    color: 'white',
                }}
            >
                {msg.text}
            </Typography>
        );
    }
};

const ChatComponent: React.FC<ChatComponentProps> = ({ userMessage, setUserMessage, handleSendMessage, chatMessages }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage(userMessage, true);
            e.preventDefault(); // Prevents the addition of a new line in the input after pressing 'Enter'
        }
    };
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ width: '100%', height: '80vh', overflowY: 'auto', padding: 2 }}>
                {chatMessages.map((msg, index) => (
                    <Box key={index} sx={{ mb: 2, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <MessageComponent msg={msg} />
                    </Box>
                ))}
            </Paper>
            <Box sx={{ width: '100%', display: 'flex', mt: 2 }}>
                <TextField
                    fullWidth
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton color="primary" onClick={handleSendMessage}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Container>
    );
};

export default ChatComponent;