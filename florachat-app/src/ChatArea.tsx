import React, { useRef, useEffect } from 'react';

interface ChatAreaProps {
  chatInput: string;
  setChatInput: (input: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatInput, setChatInput }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatInput]); // Focus when chatInput changes (e.g., from example click)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return; // Don't send empty messages
    console.log("Sending message:", chatInput);
    setChatInput(""); // Clear input after sending
  };

  const isSendButtonEnabled = chatInput.trim() !== "";

  return (
    <div className="chat-area">
      <h2>Chat Area</h2>
      {/* Placeholder for chat messages */}
      <div className="chat-messages"></div>

      <div className="chat-input-container">
        <button className="microphone-button" aria-label="Voice input">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.2-3c0 3-2.54 5.1-5.2 5.1S6.8 14 6.8 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.8z"/>
          </svg>
        </button>
        <input
          ref={inputRef}
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={chatInput}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && isSendButtonEnabled) {
              handleSendMessage();
            }
          }}
        />
        <button
          className={`send-button ${isSendButtonEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleSendMessage}
          disabled={!isSendButtonEnabled}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
