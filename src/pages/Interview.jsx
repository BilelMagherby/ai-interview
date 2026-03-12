import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import ChatMessage from '../components/ChatMessage';
import AnswerInput from '../components/AnswerInput';
import ProgressBar from '../components/ProgressBar';
import { Power, Bot, ShieldCheck, Activity, Cpu } from 'lucide-react';

const Interview = () => {
  const navigate = useNavigate();
  const { 
    messages, 
    submitAnswer, 
    currentQuestionIndex, 
    isInterviewFinished, 
    language,
    difficulty,
    isInterviewStarted,
    isBotThinking,
    resetInterview
  } = useInterview();
  
  const messagesEndRef = useRef(null);

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-green-400 border-green-500/20 bg-green-500/5';
      case 'Hard': return 'text-purple-400 border-purple-500/20 bg-purple-500/5';
      default: return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotThinking]);

  useEffect(() => {
    if (!isInterviewStarted) {
      navigate('/tracks');
    }
  }, [isInterviewStarted, navigate]);

  useEffect(() => {
    if (isInterviewFinished) {
      navigate('/result');
    }
  }, [isInterviewFinished, navigate]);

  const handleSendAnswer = (text) => {
    submitAnswer(text);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#020617] text-white overflow-hidden pt-28 pb-12 neural-grid">
      {/* HUD Header */}
      <div className="fixed top-0 inset-x-0 z-20 glass h-24 border-b border-primary-blue/20 flex items-center justify-between px-12 backdrop-blur-2xl">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-neon blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-12 h-12 rounded-xl bg-dark-bg flex items-center justify-center border border-primary-blue/30 shadow-neon">
              <Bot size={28} className="text-primary-cyan animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-1">
             <div className="flex items-center gap-2">
               <h4 className="font-black text-lg text-white tracking-widest uppercase">{language}</h4>
               <span className={`px-2 py-0.5 rounded-md border text-[10px] font-mono tracking-tighter ${getDifficultyColor(difficulty)}`}>
                 LEVEL: {difficulty?.toUpperCase()}
               </span>
               <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono tracking-tighter">V4.02.AI</span>
             </div>
             <div className="flex items-center gap-3 text-[10px] font-mono text-white/30 text-emerald-400">
               <span className="flex items-center gap-1.5"><Activity size={12} /> BIOMETRIC SCAN OK</span>
               <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> SECURE LINK</span>
             </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-white/30 font-mono text-[11px] tracking-[0.2em]">
           <span className="animate-pulse">LATENCY: 4.8ms</span>
           <span>SYNC: [||||||||||]</span>
           <span className="animate-pulse">FREQ: 5.2GHz</span>
        </div>

        <button 
          onClick={() => { resetInterview(); navigate('/'); }}
          className="relative px-4 py-2 rounded-xl bg-red-500/5 hover:bg-red-500/15 text-red-500/70 hover:text-red-500 border border-red-500/20 hover:border-red-500/40 transition-all hover:scale-110 active:scale-90 group"
        >
          <Power size={22} className="group-hover:rotate-45 transition-transform" />
        </button>
      </div>

      {/* Main Conversation Container */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 overflow-y-auto custom-scrollbar pt-8 pb-48 flex flex-col gap-6">
        <ProgressBar current={currentQuestionIndex + 1} total={10} />
        
        <div className="space-y-8 min-h-full">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {isBotThinking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -20, y: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start mb-8 items-end gap-5"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-primary-blue/50 blur opacity-40 animate-pulse" />
                  <div className="relative w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center shrink-0 shadow-neon">
                    <Bot size={24} className="animate-bounce" />
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-3xl rounded-bl-none flex flex-col gap-3 min-w-[200px]">
                  <div className="flex items-center gap-2 text-primary-cyan/70 text-[10px] font-mono tracking-widest opacity-80 animate-pulse">
                    <Cpu size={12} /> ANALYZING NEURAL PATTERNS...
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-cyan shadow-cyan animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-cyan shadow-cyan animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-cyan shadow-cyan animate-bounce" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Futuristic Floating Input Bar */}
      <div className="fixed bottom-0 inset-x-0 pb-12 pt-24 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <AnswerInput onSend={handleSendAnswer} disabled={isBotThinking} />
        </div>
      </div>

      {/* Deep Space Background Lighting */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary-blue/5 blur-[150px] rounded-full -z-1" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-primary-purple/5 blur-[150px] rounded-full -z-1" />
    </div>
  );
};

export default Interview;
