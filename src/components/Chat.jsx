import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Input, Button, Card, CardBody, Spinner, Avatar } from '@nextui-org/react';
import { SendIcon } from './Icons';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/api/chat', {
        message: inputMessage
      });
      
      const botMessage = { 
        text: data.response || data.message || 'No se recibió una respuesta válida', 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Ha ocurrido un error al comunicarse con el servidor';
      
      setMessages(prev => [...prev, { 
        text: errorMessage,
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="chat-container">
      <CardBody>
        <div className="chat-header">
          <Avatar
            src="src/assets/Logo w 88.7.png"
            className="w-12 h-12"
          />
          <div className="chat-header-info">
            <h2 className="text-lg font-semibold">Asistente Radio Lira</h2>
            <span className="text-sm text-green-500">En línea</span>
          </div>
        </div>
        
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message-wrapper ${message.sender}`}>
              <Avatar
                src={message.sender === 'bot' ? "src/assets/Logo w 88.7.png" : "/user-avatar.png"}
                className="message-avatar"
                size="sm"
              />
              <Card 
                className={`message-card ${message.sender}`}
                shadow="sm"
              >
                <CardBody>
                  {message.text}
                </CardBody>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="message-wrapper bot">
              <Avatar
                src="/radio-lira-bot.png"
                className="message-avatar"
                size="sm"
              />
              <Card className="message-card bot">
                <CardBody className="loading-container">
                  <Spinner size="sm" color="current"/>
                </CardBody>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={sendMessage} className="chat-input-form">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            disabled={isLoading}
            className="chat-input"
            size="lg"
            variant="bordered"
            endContent={
              <Button 
                type="submit"
                isIconOnly
                color="primary"
                disabled={isLoading || !inputMessage.trim()}
                className="send-button"
              >
                <SendIcon />
              </Button>
            }
          />
        </form>
      </CardBody>
    </Card>
  );
}

export default Chat;
