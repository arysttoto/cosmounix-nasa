'use client'
import React, { useState, useEffect, useRef } from 'react';

const PlanetChat = ({ currentPlanet, onClose, onAskQuestion }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat messages when a new message is added
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleAskQuestion = () => {
    if (question.trim() !== '') {
      const userMessage = { text: question, type: 'user' };
      setChatHistory([...chatHistory, userMessage]);

      onAskQuestion(question).then((response) => {
        const apiMessage = { text: response, type: 'api' };
        setChatHistory((prevHistory) => [...prevHistory, apiMessage]);
      });

      setQuestion('');
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-end items-center z-50">
      <div className="absolute inset-0 bg-white opacity-90 z-10"></div> {/* Increased opacity for clarity */}
      <div className="relative bg-white p-4 w-full flex justify-between items-center z-30"> {/* Increased z-index for clarity */}
        <h2 className="text-xl font-semibold">{currentPlanet}</h2> 
        <button className="text-blue-500 hover:text-blue-700" onClick={onClose}> 
          Close
        </button>
      </div>
      <div className="overflow-y-auto flex-grow p-4 w-full bg-gray-100 flex flex-col z-30" ref={chatMessagesRef}> {/* Increased z-index for clarity */}
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`py-2 px-4 rounded-md mb-2 ${
              message.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-white text-black self-start'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="relative bg-white p-4 w-full flex justify-between items-center z-30"> {/* Increased z-index for clarity */}
        <input
          type="text"
          placeholder="Ask a question..."
          className="text-black flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer"
          onClick={handleAskQuestion}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PlanetChat;
