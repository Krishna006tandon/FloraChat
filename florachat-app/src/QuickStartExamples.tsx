import React, { useState } from 'react';

interface QuickStartExamplesProps {
  onSelectExample: (example: string) => void;
}

const examples = [
  {
    id: 1,
    text: "Show me the latest temperature profile for Argo float 12345",
    icon: "🌡️",
  },
  {
    id: 2,
    text: "Compare salinity between the Arabian Sea and the Bay of Bengal for the last month.",
    icon: "⚖️",
  },
  {
    id: 3,
    text: "What are the active BGC floats in the Indian Ocean?",
    icon: "🌊",
  },
];

const QuickStartExamples: React.FC<QuickStartExamplesProps> = ({ onSelectExample }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCardClick = (exampleText: string) => {
    onSelectExample(exampleText);
  };

  return (
    <div className="quick-start-examples-section">
      <div className="section-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Quick Start & Examples</h3>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isExpanded && (
        <div className="examples-list">
          {examples.map((example) => (
            <div
              key={example.id}
              className="example-card glassmorphic-card"
              onClick={() => handleCardClick(example.text)}
            >
              <span className="example-icon">{example.icon}</span>
              <p className="example-text">{example.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickStartExamples;
