import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatComponent from '../Components/ChatComponent';
import {ChatMessage} from '../types/Chat';

const Chat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = async (messageContent: string, shouldSetSenderMsg: boolean) => {
    if (!messageContent.trim()) {
      return
    }
    const newMessage = { text: messageContent, sender: 'user', type: 'text'};
    if (shouldSetSenderMsg) {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    setUserMessage('');

    try {
      const response = await axios.post('http://localhost:8000/api/chat/', { message: messageContent });
      const jsonResponse = JSON.parse(response.data.response);
      let botMessage = {} as ChatMessage;
      if (jsonResponse.type === 'text') {
        botMessage = { text: jsonResponse.content, sender: 'bot', type: 'text'};
      } else if (jsonResponse.type === 'element-select') {
        botMessage = { text: jsonResponse.content, sender: 'bot', type: 'element-select', options: jsonResponse.options};
      }
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    handleSendMessage('Customer has entered the chat', false);
  }, []);

  return (
    <>
      <ChatComponent
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        handleSendMessage={handleSendMessage}
        chatMessages={chatMessages}
      />
    </>
  );
};

export default Chat;
