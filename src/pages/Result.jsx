import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { Trophy, RefreshCcw, Home as HomeIcon, Star, Award, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const Result = () => {
  const { score, resetInterview, language, isInterviewStarted } = useInterview();
  const navigate = useNavigate();
  const [level, setLevel] = useState({ name: '', color: '', icon: Star });

  useEffect(() => {
    if (!isInterviewStarted) {
      navigate('/');
      return;
    }

    // Celebration effect
    if (score >= 7) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }

    // Determine level
    if (score <= 3) {
      setLevel({ name: 'Beginner', color: 'text-blue-400', icon: Zap });
    } else if (score <= 7) {
      setLevel({ name: 'Intermediate', color: 'text-purple-400', icon: Award });
    } else {
      setLevel({ name: 'Advanced', color: 'text-amber-400', icon: Trophy });
    }
  }, [score, isInterviewStarted, navigate]);

  const handleRetry = () => {
    resetInterview();
    navigate('/tracks');
  };

  const handleGoHome = () => {
    resetInterview();
    navigate('/');
  };

  const LevelIcon = level.icon;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
      <div className="container max-w-4xl mx-auto z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-12 relative inline-block"
        >
          {/* Animated Circle for Score */}
          <div className="w-64 h-64 rounded-full border-4 border-white/5 flex flex-col items-center justify-center glass shadow-2xl relative overflow-hidden group">
            <motion.div 
               initial={{ height: 0 }}
               animate={{ height: `${(score / 10) * 100}%` }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="absolute bottom-0 inset-x-0 bg-gradient-neon opacity-10 -z-1"
            />
            
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-7xl font-black text-gradient"
            >
              {score}
            </motion.span>
            <span className="text-white/40 text-xl font-medium tracking-widest mt-2">OUT OF 10</span>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -top-4 -right-4 p-4 rounded-2xl bg-dark-bg border border-white/10 shadow-neon"
          >
            <LevelIcon className={`w-8 h-8 ${level.color}`} />
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
        >
          <h2 className="text-5xl font-black text-white mb-4">
            Interview Completed!
          </h2>
          <p className="text-2xl text-white/60 mb-8 font-medium">
            Performance Level: <span className={`${level.color} font-bold`}>{level.name}</span>
          </p>
          <p className="text-white/40 max-w-xl mx-auto mb-16 leading-relaxed">
            Great job! You've successfully finished the 10-question assessment for <span className="text-primary-cyan">{language}</span>. Keep practicing to reach the next level.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={handleRetry}
            className="px-10 py-5 bg-gradient-neon rounded-2xl text-white font-bold text-lg shadow-neon hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <RefreshCcw size={20} />
            Retry Interview
          </button>
          <button
            onClick={handleGoHome}
            className="px-10 py-5 glass rounded-2xl text-white font-bold text-lg hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
          >
            <HomeIcon size={20} />
            Back to Home
          </button>
        </motion.div>
      </div>

      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/5 blur-[120px] rounded-full -z-1" />
    </div>
  );
};

export default Result;
