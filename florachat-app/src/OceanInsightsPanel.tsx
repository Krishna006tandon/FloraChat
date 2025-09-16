import React, { useState, useEffect } from 'react';

interface OceanInsightsPanelProps {
  currentQuery: string;
}

const defaultFact = {
  title: "Fact of the Day",
  content: "The Pacific Ocean contains more than half of the free water on Earth.",
  icon: "🌊",
  link: "https://en.wikipedia.org/wiki/Pacific_Ocean",
};

const termData: { [key: string]: { title: string; content: string; icon: string; link: string } } = {
  salinity: {
    title: "Term: Salinity",
    content: "Salinity is the measure of all the salts dissolved in water, often expressed in Practical Salinity Units (PSU).",
    icon: "📖",
    link: "https://en.wikipedia.org/wiki/Salinity",
  },
};

const locationData: { [key: string]: { title: string; content: string; icon: string; link: string } } = {
  "arabian sea": {
    title: "Location: Arabian Sea",
    content: "Average Depth: 3,862 m. Key Feature: High salinity due to high evaporation.",
    icon: "🌐",
    link: "https://en.wikipedia.org/wiki/Arabian_Sea",
  },
};

const instrumentData: { [key: string]: { title: string; content: string; icon: string; link: string } } = {
  "argo float": {
    title: "Instrument: Argo Float",
    content: "A robotic instrument that drifts in the ocean, measuring temperature and salinity.",
    icon: "🤖", // Using a robot icon as a placeholder for diagram/image
    link: "https://en.wikipedia.org/wiki/Argo_(oceanography)",
  },
};

const OceanInsightsPanel: React.FC<OceanInsightsPanelProps> = ({ currentQuery }) => {
  const [insightContent, setInsightContent] = useState(defaultFact);

  useEffect(() => {
    const queryLower = currentQuery.toLowerCase();
    let newInsight = defaultFact;

    if (queryLower.includes("salinity")) {
      newInsight = termData.salinity;
    } else if (queryLower.includes("arabian sea")) {
      newInsight = locationData["arabian sea"];
    } else if (queryLower.includes("argo float")) {
      newInsight = instrumentData["argo float"];
    } else if (queryLower.trim() === "") {
      newInsight = defaultFact;
    }

    setInsightContent(newInsight);
  }, [currentQuery]);

  return (
    <div className="ocean-insights-panel glassmorphic-card">
      <h3>Ocean Insights 🌊</h3>
      <div className="insight-card">
        <div className="insight-header">
          <span className="insight-icon">{insightContent.icon}</span>
          <h4>{insightContent.title}</h4>
        </div>
        <p>{insightContent.content}</p>
        {insightContent.link && (
          <a href={insightContent.link} target="_blank" rel="noopener noreferrer" className="learn-more-link">
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};

export default OceanInsightsPanel;
