import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import Chart from './Chart';
import OceanBackground from './OceanBackground';

function App() {
  const [chatInput, setChatInput] = useState<string>('');

  const handleSelectExample = (example: string) => {
    setChatInput(example);
  };

  return (
    <div className="app-container">
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', textAlign: 'center', padding: '10px', position: 'absolute', width: '100%', zIndex: 1000 }}>
        This content is provided solely for the preview of our prototype.
      </div>
      <OceanBackground />
      <Sidebar onSelectExample={handleSelectExample} currentQuery={chatInput} />
      <div className="main-content">
        <ChatArea chatInput={chatInput} setChatInput={setChatInput} />
        <Chart />
      </div>
    </div>
  );
}

export default App;
