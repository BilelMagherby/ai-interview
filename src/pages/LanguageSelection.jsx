import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, Database, Layout, Server, Smartphone, Cpu, ShieldCheck } from 'lucide-react';
import LanguageCard from '../components/LanguageCard';
import { useInterview } from '../context/InterviewContext';

const LanguageSelection = () => {
  const { track } = useParams();
  const navigate = useNavigate();
  const { startInterview } = useInterview();

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [difficulty, setDifficulty] = useState('Medium');
  const [step, setStep] = useState('language'); // 'language' or 'difficulty'

  const categories = {
    frontend: {
      title: 'Frontend Ecosystem',
      icon: Layout,
      languages: ['React', 'Angular', 'Vue', 'HTML', 'CSS', 'JavaScript', 'TypeScript']
    },
    backend: {
      title: 'Backend & Systems',
      icon: Server,
      languages: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel', 'Java Spring']
    },
    mobile: {
      title: 'Mobile Development',
      icon: Smartphone,
      languages: ['Swift', 'Kotlin', 'React Native', 'Flutter']
    },
    devops: {
      title: 'DevOps & Infrastructure',
      icon: Cpu,
      languages: ['Docker', 'AWS', 'Terraform', 'Kubernetes']
    },
    data: {
      title: 'Data & Databases',
      icon: Database,
      languages: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis']
    }
  };

  // If track is 'frontend' or 'backend', we show those. 
  // But we want to allow user to pick more categories.
  // For simplicity, let's just make the track influence the initial view, 
  // but we can list all categories if we want.
  
  const currentCategories = track === 'frontend' 
    ? [categories.frontend, categories.mobile] 
    : [categories.backend, categories.devops, categories.data];

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setStep('difficulty');
  };

  const handleStart = () => {
    startInterview(track, selectedLanguage, difficulty);
    navigate(`/interview`);
  };

  const difficulties = [
    { id: 'Easy', desc: 'Fundamental concepts and syntax.', color: 'from-green-500 to-emerald-500' },
    { id: 'Medium', desc: 'Practical problems and logic.', color: 'from-blue-500 to-cyan-500' },
    { id: 'Hard', desc: 'Architecture and optimization.', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center overflow-hidden bg-[#020617]">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => step === 'difficulty' ? setStep('language') : navigate('/tracks')}
        className="absolute top-10 left-10 text-white/50 hover:text-white flex items-center gap-2 group transition-all z-20"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        {step === 'difficulty' ? 'Back to Technologies' : 'Back to Tracks'}
      </motion.button>

      <div className="container mx-auto max-w-6xl z-10">
        <AnimatePresence mode="wait">
          {step === 'language' ? (
            <motion.div
              key="language-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-blue/10 border border-primary-blue/30 text-primary-cyan text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Specialization
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-gradient capitalize">
                Select Technology
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto mb-16">
                Choose the stack you want to be tested on. We have updated our question bank with the latest industry standards.
              </p>

              <div className="space-y-16">
                {currentCategories.map((cat, catIdx) => (
                  <div key={cat.title} className="text-left">
                    <div className="flex items-center gap-3 mb-8 ml-4">
                      <cat.icon className="text-primary-cyan w-6 h-6" />
                      <h3 className="text-2xl font-bold text-white/80">{cat.title}</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
                      {cat.languages.map((lang, index) => (
                        <LanguageCard 
                          key={lang} 
                          name={lang} 
                          index={index}
                          onClick={() => handleSelectLanguage(lang)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="difficulty-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-4xl mx-auto text-center"
            >
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-primary-purple text-sm font-semibold mb-6">
                <ShieldCheck className="w-4 h-4" />
                Challenge Level
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-12 text-white">
                Set Your <span className="text-primary-purple">Difficulty</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {difficulties.map((diff) => (
                  <motion.div
                    key={diff.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDifficulty(diff.id)}
                    className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center group ${
                      difficulty === diff.id 
                        ? 'bg-white/5 border-primary-purple shadow-[0_0_30px_rgba(147,51,234,0.2)]' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${diff.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <span className="text-white font-black text-xl">{diff.id[0]}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">{diff.id}</h3>
                    <p className="text-white/40 group-hover:text-white/60 transition-colors">{diff.desc}</p>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={handleStart}
                className="group relative px-16 py-8 bg-white text-black rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start {selectedLanguage} Interview <Sparkles className="w-6 h-6 animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-primary-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/5 blur-[120px] rounded-full -z-10" />
    </div>
  );
};

export default LanguageSelection;
