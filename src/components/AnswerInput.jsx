import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnswerInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-6 px-4">
      <AnimatePresence>
        {disabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary-cyan/70 text-sm font-medium animate-pulse"
          >
            <Sparkles size={14} />
            AI is thinking...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card rounded-3xl p-3 border border-white/10 shadow-2xl group focus-within:border-primary-blue/50 transition-all duration-300">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={disabled ? "Please wait for the interviewer..." : "Type your detailed answer here..."}
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/30 resize-none py-3 px-4 text-lg custom-scrollbar min-h-[56px] max-h-[200px]"
          />
          
          <button
            type="submit"
            disabled={disabled || !text.trim()}
            className={`p-4 rounded-2xl transition-all duration-300 ${
              text.trim() && !disabled
                ? 'bg-gradient-neon text-white shadow-neon hover:scale-110 active:scale-95'
                : 'bg-white/5 text-white/20 border border-white/5'
            }`}
          >
            <Send size={24} />
          </button>
        </form>
      </div>
      
      <p className="text-center text-[10px] text-white/20 mt-3 font-mono tracking-tighter uppercase">
        Press ENTER to send   •   SHIFT + ENTER for new line
      </p>
    </div>
  );
};

export default AnswerInput;
