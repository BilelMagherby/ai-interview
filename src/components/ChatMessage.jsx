import { motion } from 'framer-motion';
import { Bot, User, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  const isCorrect = message.isCorrect !== undefined ? message.isCorrect : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: isBot ? -30 : 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className={`flex w-full mb-10 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-6 items-start`}>
        {/* Avatar with Glow */}
        <div className="relative group shrink-0 mt-1">
          <div className={`absolute -inset-1 rounded-full blur opacity-50 transition duration-300 group-hover:opacity-100 ${isBot ? 'bg-primary-blue shadow-neon' : 'bg-primary-purple'}`} />
          <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/10 ${isBot ? 'bg-dark-bg text-primary-cyan' : 'bg-dark-bg text-primary-purple'}`}>
            {isBot ? <Bot size={24} /> : <User size={24} />}
          </div>
        </div>

        {/* Bubble */}
        <div className={`relative p-6 rounded-[2.5rem] overflow-hidden ${isBot ? 'glass-card rounded-bl-none border-primary-blue/30' : 'bg-gradient-to-br from-primary-blue/20 to-primary-purple/10 border border-primary-blue/30 rounded-br-none shadow-cyan'} group`}>
          {/* Internal Accent */}
          <div className={`absolute top-0 ${isBot ? 'left-0' : 'right-0'} w-1.5 h-full ${isBot ? 'bg-primary-blue' : 'bg-primary-purple'} opacity-50`} />

          {isCorrect !== null && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className={`absolute -top-1 -right-1 p-2 rounded-full shadow-2xl z-10 ${isCorrect ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-red-500 shadow-red-500/50'}`}
            >
              {isCorrect ? <CheckCircle2 size={18} className="text-white" /> : <XCircle size={18} className="text-white" />}
            </motion.div>
          )}

          <div className="relative z-10 space-y-3">
            <div className={`flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase opacity-40 ${isBot ? 'text-primary-cyan' : 'text-primary-purple'}`}>
              <Sparkles size={12} /> {isBot ? 'AI ENGINE' : 'CANDIDATE DATA'}
            </div>

            <p className="text-white/95 leading-relaxed text-lg font-medium tracking-tight">
              {message.text}
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-[9px] text-white/20 font-mono tracking-tighter uppercase">
                TS_{new Date().getTime().toString().slice(-6)} // {message.timestamp}
              </span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <div className="w-1 h-1 rounded-full bg-white/10" />
              </div>
            </div>
          </div>

          {/* Animated Background Flow */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.2),transparent)] -z-1 group-hover:opacity-20 transition-opacity" />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
