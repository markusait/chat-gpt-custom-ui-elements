import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatComponent from '../Components/ChatComponent';
import {ChatMessage} from '../types/Chat';

const Chat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (messageContent: string, shouldSetSenderMsg: boolean) => {
    if (!messageContent.trim()) {
      return
    }
    setLoading(true);
    const newMessage = { text: messageContent, sender: 'user', type: 'text'};
    if (shouldSetSenderMsg) {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    setUserMessage('');

    try {
      const response = await axios.post('http://localhost:8000/api/chat/', { message: messageContent });
      // Not doing JSON.parse here because axios already does it
      const jsonResponse = response.data.response
      let botMessage = {} as ChatMessage;
      if (jsonResponse.type === 'text') {
        botMessage = { text: jsonResponse.content, sender: 'bot', type: 'text'};
      } else if (jsonResponse.type === 'element-select' || jsonResponse.type === 'element-multi-select') {
        botMessage = { text: jsonResponse.content, sender: 'bot', type: jsonResponse.type, options: jsonResponse.options};
      }
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
    }
    setLoading(false);
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
        loading={loading}
      />
    </>
  );
};

export default Chat;
