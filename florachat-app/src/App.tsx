import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import Chart from './Chart';
import OceanBackground from './OceanBackground';
import Tutorial from './Tutorial';

function App() {
  const [chatInput, setChatInput] = useState<string>('');
  const [showTutorial, setShowTutorial] = useState<boolean>(true);

  const handleSelectExample = (example: string) => {
    setChatInput(example);
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <div className="app-container">
      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', textAlign: 'center', padding: '10px', position: 'absolute', width: '100%', zIndex: 1000 }}>
        This content is provided solely for the preview of our prototype.
      </div>
      <OceanBackground />
      <Sidebar onSelectExample={handleSelectExample} currentQuery={chatInput} onShowTutorial={() => setShowTutorial(true)} />
      <div className="main-content">
        <ChatArea chatInput={chatInput} setChatInput={setChatInput} />
        <Chart />
      </div>
    </div>
  );
}

export default App;
