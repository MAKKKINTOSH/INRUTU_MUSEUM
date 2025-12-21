import React, { useState, useRef, useEffect } from 'react';
import Styles from './ChatWindow.module.css';

export function ChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Здравствуйте! 👋 Я ваш цифровой гид по Музею вычислительной техники ИрНИТУ. Могу рассказать об экспонатах, исторических личностях, экскурсиях и ответить на ваши вопросы. С чего начнём?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Фокус на поле ввода при открытии
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Здесь будет интеграция с API для получения ответа от бота
    // Пока что добавляем заглушку ответа
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: 'Спасибо за ваше сообщение! В данный момент я настраиваюсь. Скоро я смогу отвечать на ваши вопросы о музее.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <div className={Styles.ChatWindow}>
      <div className={Styles.ChatHeader}>
        <div className={Styles.ChatHeaderInfo}>
          <div className={Styles.ChatHeaderAvatar}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                fill="currentColor"
              />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
              <path
                d="M8 10C8 8.89543 8.89543 8 10 8H14C15.1046 8 16 8.89543 16 10V14C16 15.1046 15.1046 16 14 16H10C8.89543 16 8 15.1046 8 14V10Z"
                fill="currentColor"
                opacity="0.2"
              />
            </svg>
          </div>
          <div className={Styles.ChatHeaderText}>
            <div className={Styles.ChatHeaderTitle}>Цифровой гид музея</div>
            <span className={Styles.ChatStatus}>Онлайн • Готов помочь</span>
          </div>
        </div>
        <button
          className={Styles.CloseButton}
          onClick={onClose}
          aria-label="Закрыть чат"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={Styles.ChatMessages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${Styles.Message} ${
              message.sender === 'user' ? Styles.UserMessage : Styles.BotMessage
            }`}
          >
            <div className={Styles.MessageContent}>
              <p>{message.text}</p>
              <span className={Styles.MessageTime}>
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className={Styles.ChatInput} onSubmit={handleSendMessage}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите ваше сообщение..."
          className={Styles.Input}
        />
        <button
          type="submit"
          className={Styles.SendButton}
          disabled={!inputValue.trim()}
          aria-label="Отправить сообщение"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

