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
  const [difficulty, setDifficulty] = useState('Medium');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);
  const [isBotThinking, setIsBotThinking] = useState(false);
  
  // Advanced Metrics for Recruitment Appeal
  const [metrics, setMetrics] = useState({
    avgResponseTime: 0,
    answerDepth: 0,
    technicalKeywords: 0,
    consistency: 0,
  });
  
  const startTimeRef = useRef(null);
  const responseTimesRef = useRef([]);

  const startInterview = (selectedTrack, selectedLanguage, selectedDifficulty = 'Medium') => {
    setTrack(selectedTrack);
    setLanguage(selectedLanguage);
    setDifficulty(selectedDifficulty);
    
    // Reset Metrics
    setMetrics({
      avgResponseTime: 0,
      answerDepth: 0,
      technicalKeywords: 0,
      consistency: 0,
    });
    responseTimesRef.current = [];
    
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
          text: `Welcome, candidate. I am the AI Interview Assistant. Let's begin your ${selectedDifficulty} level ${selectedLanguage} assessment.`,
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
        startTimeRef.current = Date.now(); // Start timing first question
      }, 3000);
    }, 1500);
  };

  const submitAnswer = (answerText) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    // Track response time
    const responseTime = (Date.now() - startTimeRef.current) / 1000;
    responseTimesRef.current.push(responseTime);

    const normalizedAnswer = answerText.toLowerCase();
    const matches = currentQuestion.keywords.filter(keyword => normalizedAnswer.includes(keyword.toLowerCase()));
    
    let threshold = 1;
    if (difficulty === 'Hard') threshold = 2;
    
    const isCorrect = matches.length >= threshold;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Update Metrics
    setMetrics(prev => {
      const newAvgTime = responseTimesRef.current.reduce((a, b) => a + b, 0) / responseTimesRef.current.length;
      const newDepth = (prev.answerDepth * currentQuestionIndex + answerText.length) / (currentQuestionIndex + 1);
      return {
        avgResponseTime: Math.round(newAvgTime * 10) / 10,
        answerDepth: Math.round(newDepth),
        technicalKeywords: prev.technicalKeywords + matches.length,
        consistency: Math.min(100, Math.round((score / (currentQuestionIndex + 1)) * 100))
      };
    });

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
      if (currentQuestionIndex < 9 && currentQuestionIndex < questions.length - 1) {
        const nextQ = questions[currentQuestionIndex + 1];
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            sender: 'bot',
            text: `Question ${currentQuestionIndex + 2}: ${nextQ.question}`,
            timestamp: new Date().toLocaleTimeString(),
          }]);
          setCurrentQuestionIndex(prev => prev + 1);
          setIsBotThinking(false);
          startTimeRef.current = Date.now(); // Start timing for next question
        }, 3000);
      } else {
        setTimeout(() => {
          setIsInterviewFinished(true);
          setIsBotThinking(false);
        }, 1500);
      }
    }, 3000);
  };

  const resetInterview = () => {
    setTrack(null);
    setLanguage(null);
    setDifficulty('Medium');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setMessages([]);
    setMetrics({
      avgResponseTime: 0,
      answerDepth: 0,
      technicalKeywords: 0,
      consistency: 0,
    });
    setIsInterviewStarted(false);
    setIsInterviewFinished(false);
    setIsBotThinking(false);
  };

  return (
    <InterviewContext.Provider value={{
      track,
      language,
      difficulty,
      questions,
      currentQuestionIndex,
      score,
      messages,
      metrics,
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
