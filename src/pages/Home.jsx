import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, Zap, BarChart3, ChevronRight } from 'lucide-react';
import WebDevAnimation from '../components/WebDevAnimation';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -10, scale: 1.05 }}
    className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group cursor-pointer border border-white/5"
  >
    <div className="w-16 h-16 bg-gradient-neon rounded-2xl flex items-center justify-center mb-6 shadow-neon group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-white w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-blue transition-colors">{title}</h3>
    <p className="text-white/60 leading-relaxed">{desc}</p>
    <div className="mt-8 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center text-primary-cyan text-sm font-semibold">
      Learn more <ChevronRight className="w-4 h-4 ml-1" />
    </div>
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <WebDevAnimation />
          <span className="px-4 py-1.5 rounded-full bg-primary-blue/10 border border-primary-blue/30 text-primary-cyan text-sm font-medium tracking-wide uppercase">
            The Future of Technical Interviews
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-6 leading-tight"
        >
          Practice Your <br />
          <span className="text-gradient">Developer Interview</span> <br />
          Like a Pro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/50 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Prepare for frontend and backend interviews with an AI-powered interactive simulator. Master concepts, boost your confidence, and land your dream job.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={() => navigate('/tracks')}
            className="px-10 py-5 bg-gradient-neon rounded-2xl text-white font-bold text-lg shadow-neon hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Interview <ChevronRight className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <button
            className="px-10 py-5 glass rounded-2xl text-white font-bold text-lg hover:bg-white/10 active:scale-95 transition-all duration-300 border border-white/20"
          >
            Explore Platform
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-32 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={Cpu}
            title="Interview Simulation"
            desc="Practice real-world technical questions tailored to your target tech stack."
            delay={0.8}
          />
          <FeatureCard
            icon={Zap}
            title="AI Feedback"
            desc="Get instant feedback on your answers with explanations and key concepts."
            delay={1.0}
          />
          <FeatureCard
            icon={BarChart3}
            title="Skill Evaluation"
            desc="Receive a detailed performance score and expert-level evaluation labels."
            delay={1.2}
          />
        </div>
      </section>

      {/* Animated Background Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/20 blur-[150px] -z-1" />
    </div>
  );
};

export default Home;
