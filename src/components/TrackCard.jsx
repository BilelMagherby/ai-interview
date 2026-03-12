import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const TrackCard = ({ title, icon: Icon, onClick, color = "blue", delay = 0 }) => {
  const isBlue = color === "blue";
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isBlue ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group cursor-pointer w-full max-w-md"
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${isBlue ? 'from-blue-600 to-cyan-400' : 'from-purple-600 to-pink-500'} rounded-3xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`} />
      
      <div className="relative glass-card p-10 rounded-3xl flex flex-col items-center text-center overflow-hidden">
        {/* Animated Background Shape */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${isBlue ? 'bg-blue-500' : 'bg-purple-500'} group-hover:scale-150 transition-transform duration-700`} />
        
        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors shadow-2xl`}>
          <Icon className={`w-12 h-12 ${isBlue ? 'text-blue-400' : 'text-purple-400'}`} />
        </div>
        
        <h3 className="text-3xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-white/50 mb-8 leading-relaxed">
          Master {title.toLowerCase()} concepts and ace your technical assessments.
        </p>
        
        <div className={`flex items-center font-bold tracking-wider uppercase text-sm ${isBlue ? 'text-blue-400' : 'text-purple-400'}`}>
          Select Track <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default TrackCard;
