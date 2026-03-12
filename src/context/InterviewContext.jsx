import { createContext, useContext, useState, useRef, useEffect } from 'react';
import questionsData from '../data/questions.json';

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [track, setTrack] = useState(null);
  const [language, setLanguage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);
  const [isBotThinking, setIsBotThinking] = useState(false);

  const startInterview = (selectedTrack, selectedLanguage) => {
    setTrack(selectedTrack);
    setLanguage(selectedLanguage);
    
    const allQuestions = questionsData[selectedLanguage] || [];
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsInterviewStarted(true);
    setIsInterviewFinished(false);
    
    // Initial sequence with writing delays
    setIsBotThinking(true);
    setTimeout(() => {
      setMessages([
        {
          id: Date.now(),
          sender: 'bot',
          text: `Welcome, candidate. I am the AI Interview Assistant. Let's begin your ${selectedLanguage} assessment.`,
          timestamp: new Date().toLocaleTimeString(),
        }
      ]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Question 1: ${selected[0].question}`,
          timestamp: new Date().toLocaleTimeString(),
        }]);
        setIsBotThinking(false);
      }, 3000);
    }, 1500);
  };

  const submitAnswer = (answerText) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const normalizedAnswer = answerText.toLowerCase();
    const matches = currentQuestion.keywords.filter(keyword => normalizedAnswer.includes(keyword.toLowerCase()));
    const isCorrect = matches.length >= 1;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const userMsg = {
      id: Date.now() + Math.random(),
      sender: 'user',
      text: answerText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsBotThinking(true);

    // 3 second delay for bot processing as requested
    setTimeout(() => {
      const feedbackMsg = {
        id: Date.now() + Math.random(),
        sender: 'bot',
        text: isCorrect 
          ? "Excellent choice of words. Your understanding is precise." 
          : `I see. While that touches on it, you should prioritize: ${currentQuestion.keywords.slice(0, 3).join(', ')}.`,
        isCorrect,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, feedbackMsg]);

      // Move to next question or finish
      if (currentQuestionIndex < 9) {
        const nextQ = questions[currentQuestionIndex + 1];
        
        // Another delay before the next question for "typing"
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            sender: 'bot',
            text: `Question ${currentQuestionIndex + 2}: ${nextQ.question}`,
            timestamp: new Date().toLocaleTimeString(),
          }]);
          setCurrentQuestionIndex(prev => prev + 1);
          setIsBotThinking(false);
        }, 3000);
      } else {
        setTimeout(() => {
          setIsInterviewFinished(true);
          setIsBotThinking(false);
        }, 1500);
      }
    }, 3000); // The required 3 second evaluation delay
  };

  const resetInterview = () => {
    setTrack(null);
    setLanguage(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setMessages([]);
    setIsInterviewStarted(false);
    setIsInterviewFinished(false);
    setIsBotThinking(false);
  };

  return (
    <InterviewContext.Provider value={{
      track,
      language,
      questions,
      currentQuestionIndex,
      score,
      messages,
      isInterviewStarted,
      isInterviewFinished,
      isBotThinking,
      startInterview,
      submitAnswer,
      resetInterview
    }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);
