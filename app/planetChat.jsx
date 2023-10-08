'use client'
import React, { useState, useEffect, useRef } from 'react';

function PlanetChat({ currentPlanet, onClose, onAskQuestion }) {
  const messageGuide = {
    mars: `I am Martinus, an alien from Mars. I have gained knowledge through communication with Earth's explorers during their expeditions to Mars. I'm well-versed in Martian topics and can answer questions related to Mars, but I won't provide information about other planets or unrelated topics. Feel free to ask me anything about Mars!` ,
    saturn: ` I am Saturney, an extraterrestrial visitor from Saturn. I rely on the unique density of Saturn to stay afloat, and I always wear warm clothing because Saturn is incredibly cold. My expertise lies solely in matters related to Saturn and its moons. I won't provide information about any other planets or unrelated topics. Feel free to ask me any questions about Saturn and its fascinating moons!`,
    venus: `I am Venusus, an extraterrestrial being hailing from the planet Venus. Beauty is inherent to my existence, as my planet is named after the goddess of beauty and love. I am here to provide answers exclusively related to Venus. I won't entertain questions about other planets or unrelated topics. Please feel free to inquire about anything concerning Venus, and I'll be delighted to assist you.`
  } 
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([{text: messageGuide[currentPlanet], role: "api"}]);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const [isLoading, setIsLoading] = useState(false); // New state variable for loading state

  const handleAskQuestion = () => {
    if (question.trim() !== '') {
      const userMessage = { text: question, type: 'user' };
      setChatHistory([...chatHistory, userMessage]);
      
      setIsLoading(true); // Set loading to true when question is asked

      onAskQuestion(question).then((response) => {
        const apiMessage = { text: response, type: 'api' };
        setChatHistory((prevHistory) => [...prevHistory, apiMessage]);
        setIsLoading(false); // Set loading to false when response is received
      });

      setQuestion('');
    }
  };


  const planetIconSrc = `/${currentPlanet.toLowerCase()}_guide.jpg`;
  const chat_background = `/${currentPlanet.toLowerCase()}_chat.gif`;
  return (
    <>
    <div className="fixed inset-0 flex flex-col justify-end items-center z-[100]">
      {/* Remove the backgroundImage from here */}
      <div className="relative bg-white p-4 w-full flex justify-between items-center z-[130]">
        <div className="flex items-center">
          <img src={planetIconSrc} alt={`${currentPlanet} icon`} className="w-12 h-12 mr-3" />
          <h2 className="text-xl font-semibold text-black">{currentPlanet == "mars" ? "Martinus" : currentPlanet == "saturn" ? "Saturney" : "Venusus"}</h2>
        </div>
        <button className="text-blue-500 hover:text-blue-700" onClick={onClose}>
          Close
        </button>
      </div>
  
      {/* Add the background styles here */}
      <div className="overflow-y-auto flex-grow p-4 w-full flex flex-col relative z-[120]" ref={chatMessagesRef}>
        <div className="absolute inset-0 blur-md" style={{ backgroundImage: `url(${chat_background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
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
        {isLoading && (
            <div className="flex gap-2 mt-3 self-start">
              <div className="w-2 h-2 rounded-full animate-pulse bg-white"></div>
              <div className="w-2 h-2 rounded-full animate-pulse bg-white"></div>
              <div className="w-2 h-2 rounded-full animate-pulse bg-white"></div>
            </div>
        )}
    </div>

  
      <div className="relative bg-white p-4 w-full flex justify-between items-center z-[130]">
        <input  
          type="text"
          placeholder="Ask a question..."
          className="text-black flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer" onClick={handleAskQuestion}>
          Send
        </button>
      </div>
    </div>
    </>
  );
  
};

export default PlanetChat;
