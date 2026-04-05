import React, { useState } from 'react';
import { Send, X, Bot } from 'lucide-react';
import './ChatBox.css';

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! I am Tobe, your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Thanks for reaching out! We'll get back to you shortly." }
      ]);
    }, 1000);
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <div className="chatbox-header-title">
          <Bot size={20} className="bot-icon" />
          <span>Tobe Assistant</span>
        </div>
        <button className="close-btn" onClick={onClose}><X size={18} /></button>
      </div>

      <div className="chatbox-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <form className="chatbox-input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="send-btn">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
