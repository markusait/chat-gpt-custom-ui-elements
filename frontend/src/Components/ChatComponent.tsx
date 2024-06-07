import React from 'react';
import { Container, TextField, Box, Paper, Typography, IconButton, InputAdornment, Chip, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { ChatMessage } from '../types/Chat';

interface ChipData {
    key: number;
    label: string;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));


interface ChipsArrayComponentProps {
    chipsArray: string[] | undefined;
    handleSendMessage: (messageContent: string, shouldSetSenderMsg: boolean) => void;
}
const ChipsArray: React.FC<ChipsArrayComponentProps> = ({ chipsArray, handleSendMessage }) => {
    if (!chipsArray) {
        return null;
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
                backgroundColor: 'transparent', 
            }}
            component="ul"
        >
            {chipsArray.map((txt: string, idx: number) => {
                return (
                    <ListItem key={idx}>
                        <Chip
                            label={txt}
                            clickable={true}
                            onClick={() => handleSendMessage(txt, true)}
                        />
                    </ListItem>
                );
            })}
        </Box>
    );
}


interface MessageComponentProps {
    msg: ChatMessage;
}
const MessageComponent: React.FC<MessageComponentProps> = ( {msg}) => {
    if (!msg) {
        return null;
    // } else if (msg.type === 'element-select' && msg.sender === 'bot') {
    //     return (
    //         <>
    //             {/* Your element-select rendering logic here */}
    //         </>
    //     );
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

interface ChatComponentProps {
    userMessage: string;
    setUserMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (messageContent: string, shouldSetSenderMsg: boolean) => void;
    chatMessages: ChatMessage[];
    loading: boolean;
}


const ChatComponent: React.FC<ChatComponentProps> = ({ userMessage, setUserMessage, handleSendMessage, chatMessages, loading }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage(userMessage, true);
            e.preventDefault(); // Prevents the addition of a new line in the input after pressing 'Enter'
        }
    };
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ width: '100%', height: '80vh',  display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: 2 }}>
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {chatMessages.map((msg, index) => (
                        <Box key={index} sx={{ mb: 2, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                            <MessageComponent msg={msg} />
                        </Box>
                    ))}
                </Box>
                <Box>
                    <ChipsArray chipsArray={chatMessages[chatMessages.length - 1]?.options} handleSendMessage={handleSendMessage} /> 
                </Box>
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
                                    {loading ? <CircularProgress /> : <SendIcon /> }
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