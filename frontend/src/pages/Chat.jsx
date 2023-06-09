import React, { useState, useEffect } from 'react';

// Header component
const Header = () => {
  return (
    <header className="bg-gray-200 p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chat App</h1>

        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">Home</a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">About</a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Loading component
const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="rounded-full border-t-4 border-gray-300 h-16 w-16 animate-spin">
        <img
          src="https://i.gifer.com/17OE.gif"
          alt="Loading"
          className="h-1000 w-1000 rounded-full"
        />
      </div>
    </div>
  );
};


window.webkitSpeechRecognition = undefined;
const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.start();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      setChat((prevChat) => [...prevChat, { question: message, response: '' }]);
      setMessage('');
      setIsLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:6001/process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: message }),
        });

        if (!response.ok) {
          throw new Error('Server error');
        }

        const responseData = await response.json();
        setChat((prevChat) => {
          const updatedChat = [...prevChat];
          updatedChat[prevChat.length - 1].response = responseData;
          return updatedChat;
        });
      } catch (error) {
        // Handle error if necessary
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      console.log('Speech recognition API supported');
    } else {
      console.log('Speech recognition API not supported');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 p-4 overflow-y-scroll">
        {chat.map((chatItem, index) => (
          <div key={index} className="mb-4">
            <div className="rounded-lg p-2 bg-gray-100 text-gray-800">
              {chatItem.question}
            </div>
            {chatItem.response && (
              <div className="rounded-lg p-2 bg-green-100 text-green-800">
                {chatItem.response}
              </div>
            )}
          </div>
        ))}
      </div>

      <form
        className="flex items-center justify-center bg-gray-200 p-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="rounded-lg py-2 px-4 mr-2 flex-1"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="py-2 px-4 rounded-lg bg-blue-500 text-white"
        >
          Send
        </button>
        <button
          type="button"
          className="py-2 px-4 rounded-lg bg-green-500 text-white ml-2"
          onClick={handleVoiceInput}
        >
          Voice Input
        </button>
      </form>

      {isLoading && <Loading />}
    </div>
  );
};

export default ChatComponent;
