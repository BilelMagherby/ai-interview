import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Monitor, Server, ArrowLeft } from 'lucide-react';
import TrackCard from '../components/TrackCard';
import { useInterview } from '../context/InterviewContext';

const TrackSelection = () => {
  const navigate = useNavigate();
  const { setTrack } = useInterview();

  const handleSelectTrack = (trackName) => {
    // We don't have setTrack in context yet, let's update context eventually or just navigate
    // Actually, context should probably store the track
    navigate(`/languages/${trackName.toLowerCase()}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-10 left-10 text-white/50 hover:text-white flex items-center gap-2 group transition-all"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </motion.button>

      <div className="container mx-auto max-w-6xl text-center z-10 relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-gradient">
            Choose Your Track
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Select the domain you want to practice. Our AI will tailor the questions specifically for that track.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <TrackCard
            title="Frontend Developer"
            icon={Monitor}
            color="blue"
            onClick={() => handleSelectTrack('Frontend')}
            delay={0.2}
          />
          <TrackCard
            title="Backend Developer"
            icon={Server}
            color="purple"
            onClick={() => handleSelectTrack('Backend')}
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
};

export default TrackSelection;
