import { motion } from 'framer-motion';

const ProgressBar = ({ current, total = 10 }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4 flex flex-col gap-3 group">
      <div className="flex justify-between items-end mb-1 text-white/40 text-xs font-mono uppercase tracking-widest">
        <span>Question {current} of {total}</span>
        <span className="text-primary-blue animate-pulse">{Math.round(percentage)}% Complete</span>
      </div>
      
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors shadow-inner">
        <motion.div
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           transition={{ duration: 1, ease: "circOut" }}
           className="h-full bg-gradient-neon shadow-neon relative"
        >
          {/* Animated Glow Dot */}
          <motion.div
             animate={{ x: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-md opacity-80"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
