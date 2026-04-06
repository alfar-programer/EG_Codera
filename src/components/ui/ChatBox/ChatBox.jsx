import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, Zap } from 'lucide-react';
import './ChatBox.css';

const BOT_REPLIES = {
  default: [
    "Great question! Our team specializes in crafting digital experiences that truly convert. Let me connect you with the right expert. 🎯",
    "We'd love to help! EG Codera builds world-class brands. Want to schedule a free consultation? 🚀",
    "Absolutely! Our portfolio speaks for itself. Check out our work section below, or ask me anything specific. ✨",
  ],
  pricing: "Our packages start from competitive rates tailored to your project scope. Let's discuss your needs — we offer free discovery calls! 💰",
  services: "We offer: Brand Identity, Web Development, UI/UX Design, SEO Strategy, and Digital Marketing. Which interests you most? ⚡",
  contact: "You can reach us at hello@egcodera.com or book a call directly. Want me to help schedule? 📅",
  timeline: "Typical projects take 4–12 weeks. Rush delivery is available. Tell me about your deadline! ⏱️",
};

const QUICK_REPLIES = [
  { label: "💰 Pricing",   key: "pricing"  },
  { label: "⚡ Services",  key: "services" },
  { label: "📅 Contact",   key: "contact"  },
  { label: "⏱️ Timeline", key: "timeline" },
];

const getReply = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) return BOT_REPLIES.pricing;
  if (lower.includes('service') || lower.includes('offer') || lower.includes('do you'))  return BOT_REPLIES.services;
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach'))   return BOT_REPLIES.contact;
  if (lower.includes('time') || lower.includes('long') || lower.includes('deadline'))    return BOT_REPLIES.timeline;
  return BOT_REPLIES.default[Math.floor(Math.random() * BOT_REPLIES.default.length)];
};

const TypingIndicator = () => (
  <div className="tobe-typing">
    <div className="tobe-avatar-sm">T</div>
    <div className="tobe-typing-dots">
      <span /><span /><span />
    </div>
  </div>
);

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hey! 👋 I'm **Tobe**, your AI guide at EG Codera. What can I help you build today?", time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowQuickReplies(false);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: getReply(text), time: new Date() },
      ]);
    }, 1200 + Math.random() * 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatText = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="tobe-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="tobe-chat">

        {/* ── Header ── */}
        <div className="tobe-header">
          <div className="tobe-header-left">
            <div className="tobe-avatar-ring">
              <div className="tobe-avatar">T</div>
              <span className="tobe-online-dot" />
            </div>
            <div className="tobe-header-info">
              <div className="tobe-name">
                Tobe <Sparkles size={13} className="tobe-sparkle" />
              </div>
              <div className="tobe-status">AI Assistant · Online</div>
            </div>
          </div>
          <button className="tobe-close" onClick={onClose} aria-label="Close chat">
            <X size={15} />
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="tobe-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`tobe-msg-row ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="tobe-avatar-sm">T</div>
              )}
              <div className="tobe-bubble-wrap">
                <div
                  className={`tobe-bubble ${msg.sender}`}
                  dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                />
                <span className="tobe-time">{formatTime(msg.time)}</span>
              </div>
            </div>
          ))}

          {isTyping && <TypingIndicator />}

          {showQuickReplies && !isTyping && (
            <div className="tobe-chips">
              {QUICK_REPLIES.map((chip) => (
                <button
                  key={chip.key}
                  className="tobe-chip"
                  onClick={() => sendMessage(chip.label)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <form className="tobe-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="tobe-input"
            placeholder="Ask me anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={300}
          />
          <button
            type="submit"
            className={`tobe-send ${input.trim() ? 'active' : ''}`}
            disabled={!input.trim()}
            aria-label="Send"
          >
            <Zap size={16} />
          </button>
        </form>

        {/* ── Footer ── */}
        <div className="tobe-footer">
          Powered by <span className="tobe-brand">EG Codera AI</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
