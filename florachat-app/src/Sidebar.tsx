import React from 'react';
import QuickStartExamples from './QuickStartExamples';
import OceanInsightsPanel from './OceanInsightsPanel';

interface SidebarProps {
  onSelectExample: (example: string) => void;
  currentQuery: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectExample, currentQuery }) => {
  return (
    <div className="sidebar">
      <h2>FloatChat</h2>
      <div className="chat-history-section">
        <h3>Chat History</h3>
        {/* Placeholder for chat history */}
        <p>No recent chats</p>
      </div>
      <OceanInsightsPanel currentQuery={currentQuery} />
      <QuickStartExamples onSelectExample={onSelectExample} />
    </div>
  );
};

export default Sidebar;
