import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import LanguageCard from '../components/LanguageCard';
import { useInterview } from '../context/InterviewContext';

const LanguageSelection = () => {
  const { track } = useParams();
  const navigate = useNavigate();
  const { startInterview } = useInterview();

  const frontendLanguages = [
    'React', 'Angular', 'Vue', 'HTML', 'CSS', 'JavaScript', 'TypeScript'
  ];

  const backendLanguages = [
    'Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel', 'Java Spring'
  ];

  const languages = track === 'frontend' ? frontendLanguages : backendLanguages;

  const handleSelectLanguage = (lang) => {
    startInterview(track, lang);
    navigate(`/interview`);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center overflow-hidden">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/tracks')}
        className="absolute top-10 left-10 text-white/50 hover:text-white flex items-center gap-2 group transition-all"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Tracks
      </motion.button>

      <div className="container mx-auto max-w-5xl z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-blue/10 border border-primary-blue/30 text-primary-cyan text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Selection Phase
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gradient capitalize">
            {track} Technologies
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
             Which language or framework are you focusing on today? Pick one to start your 10-question assessment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-10">
          {languages.map((lang, index) => (
            <LanguageCard 
              key={lang} 
              name={lang} 
              index={index}
              onClick={() => handleSelectLanguage(lang)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
