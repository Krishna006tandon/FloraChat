import React, { useState, useEffect } from 'react';
import './Tutorial.css';

interface TutorialProps {
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: 'Welcome to FloraChat!',
    text: 'This tutorial will guide you through the features of our application.',
    target: null,
  },
  {
    title: 'Chat History',
    text: 'This is where your chat history will be displayed.',
    target: '.chat-history-section',
  },
  {
    title: 'Ocean Insights',
    text: 'This panel shows insights about the ocean based on your queries.',
    target: '.ocean-insights-panel',
  },
  {
    title: 'Quick Start Examples',
    text: 'Click on these examples to quickly start a conversation.',
    target: '.quick-start-examples',
  },
  {
    title: 'Chat Area',
    text: 'This is where you can type your messages and see the conversation.',
    target: '.chat-area',
  },
  {
    title: 'Chart',
    text: 'This chart displays data related to your conversation.',
    target: '.chart',
  },
];

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const currentStep = tutorialSteps[step];
    const prevStep = tutorialSteps[step - 1];

    if (prevStep && prevStep.target) {
      const prevTargetElement = document.querySelector(prevStep.target);
      if (prevTargetElement) {
        prevTargetElement.classList.remove('tutorial-highlight');
      }
    }

    if (currentStep.target) {
      const targetElement = document.querySelector(currentStep.target);
      if (targetElement) {
        targetElement.classList.add('tutorial-highlight');
        const targetRect = targetElement.getBoundingClientRect();
        const tutorialContent = document.querySelector('.tutorial-content') as HTMLElement;
        if (tutorialContent) {
          tutorialContent.style.transform = '';
          const tutorialRect = tutorialContent.getBoundingClientRect();
          let top = targetRect.top;
          let left = targetRect.right + 20;

          if (left + tutorialRect.width > window.innerWidth) {
            left = targetRect.left - tutorialRect.width - 20;
          }

          if (top + tutorialRect.height > window.innerHeight) {
            top = window.innerHeight - tutorialRect.height - 20;
          }

          if (left < 0) {
            left = 20;
          }

          if (top < 0) {
            top = 20;
          }

          tutorialContent.style.top = `${top}px`;
          tutorialContent.style.left = `${left}px`;
        }
      }
    } else {
      const tutorialContent = document.querySelector('.tutorial-content') as HTMLElement;
      if (tutorialContent) {
        tutorialContent.style.top = '50%';
        tutorialContent.style.left = '50%';
        tutorialContent.style.transform = 'translate(-50%, -50%)';
      }
    }

    return () => {
      if (currentStep.target) {
        const targetElement = document.querySelector(currentStep.target);
        if (targetElement) {
          targetElement.classList.remove('tutorial-highlight');
        }
      }
    };
  }, [step]);

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentStep = tutorialSteps[step];

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <button className="tutorial-close" onClick={onClose}>&times;</button>
        <h2>{currentStep.title}</h2>
        <p>{currentStep.text}</p>
        <div className="tutorial-navigation">
          {step > 0 && <button onClick={handlePrev}>Previous</button>}
          <button onClick={handleNext}>{step === tutorialSteps.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
