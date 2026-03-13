import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { Trophy, RefreshCcw, Home as HomeIcon, Star, Award, Zap, Clock, MessageSquare, Target, LineChart, ShieldCheck, UserCheck, Search, Download } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';

const MetricCard = ({ icon: Icon, title, value, unit, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.03] transition-colors"
  >
    <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 text-${color}-400`} />
    </div>
    <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase mb-1">{title}</span>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-black text-white">{value}</span>
      <span className="text-white/30 text-xs font-medium">{unit}</span>
    </div>
  </motion.div>
);

const Result = () => {
  const { score, resetInterview, language, isInterviewStarted, metrics, difficulty, track } = useInterview();
  const navigate = useNavigate();
  const [assessmentId] = useState(() => `AI-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  useEffect(() => {
    if (!isInterviewStarted) {
      navigate('/');
      return;
    }

    if (score >= 7) {
      const end = Date.now() + 3 * 1000;
      const colors = ['#2563eb', '#9333ea', '#06b6d4'];
      (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      }());
    }
  }, [score, isInterviewStarted, navigate]);

  const hiringConf = useMemo(() => {
    const base = (score / 10) * 60;
    const speedBonus = Math.max(0, 20 - (metrics.avgResponseTime / 2));
    const depthBonus = Math.min(20, metrics.answerDepth / 20);
    return Math.min(100, Math.round(base + speedBonus + depthBonus));
  }, [score, metrics]);

  const assessmentStatus = useMemo(() => {
    if (hiringConf >= 85) return { label: 'Top 1% Candidate', color: 'text-emerald-400', badge: 'Elite' };
    if (hiringConf >= 70) return { label: 'Strong Fit', color: 'text-primary-cyan', badge: 'Professional' };
    if (hiringConf >= 50) return { label: 'Qualified', color: 'text-primary-blue', badge: 'Junior' };
    return { label: 'In Review', color: 'text-white/40', badge: 'Apprentice' };
  }, [hiringConf]);

  const handleRetry = () => { resetInterview(); navigate('/tracks'); };
  const handleGoHome = () => { resetInterview(); navigate('/'); };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 bg-[#020617] text-white overflow-x-hidden neural-grid">
      <div className="container max-w-6xl mx-auto z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                OFFICIAL ASSESSMENT REPORT
              </div>
              <div className="px-3 py-1 rounded-md bg-primary-blue/10 border border-primary-blue/30 text-[10px] font-mono text-primary-cyan">
                #{assessmentId}
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
              Interview <span className="text-gradient">Portfolio.</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
             <button className="px-6 py-3 glass rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-all">
               <Download size={16} /> Export PDF
             </button>
             <button className="px-6 py-3 bg-white text-black rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl">
               <Search size={16} /> Detailed Log
             </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Visual: Hiring Confidence */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 glass p-10 rounded-[3.5rem] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-neon opacity-50" />
            <div className="relative mb-8">
              <svg className="w-56 h-56 rotate-[-90deg]">
                <circle cx="112" cy="112" r="100" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <motion.circle 
                  cx="112" cy="112" r="100" fill="transparent" stroke="url(#neonGradient)" strokeWidth="12"
                  strokeDasharray="628"
                  initial={{ strokeDashoffset: 628 }}
                  animate={{ strokeDashoffset: 628 - (628 * hiringConf) / 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-white">{hiringConf}%</span>
                <span className="text-[10px] font-mono text-white/30 tracking-[0.3em]">CONFIDENCE</span>
              </div>
            </div>
            <div className={`text-xl font-bold mb-2 ${assessmentStatus.color}`}>{assessmentStatus.label}</div>
            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-white/60">
              Rank: {assessmentStatus.badge}
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard icon={Target} title="Raw Score" value={score} unit="/10" color="blue" delay={0.1} />
              <MetricCard icon={Clock} title="Speed" value={metrics.avgResponseTime} unit="s/avg" color="cyan" delay={0.2} />
              <MetricCard icon={MessageSquare} title="Depth" value={metrics.answerDepth} unit="chars" color="purple" delay={0.3} />
              <MetricCard icon={Zap} title="Consistency" value={metrics.consistency} unit="%" color="amber" delay={0.4} />
            </div>

            {/* AI Recommendation Panel */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="text-primary-cyan w-5 h-5" />
                <h3 className="font-bold text-lg">Hiring Manager Note</h3>
              </div>
              <div className="flex-1 space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-white/60 italic leading-relaxed">
                  "Candidate demonstrates {score >= 8 ? 'exceptional' : 'solid'} platform knowledge in <span className="text-white font-bold">{language}</span>. 
                  Technical depth is {metrics.answerDepth > 100 ? 'impressive' : 'standard'} with an average recall time of {metrics.avgResponseTime}s. 
                  Recommend for {difficulty} level {track === 'frontend' ? 'UI/UX' : 'Infrastructure'} roles."
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black">AI</div>
                   <div>
                     <div className="text-xs font-bold">Auto-Recruiter V4</div>
                     <div className="text-[10px] text-white/30">Verified Analysis</div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={handleRetry}
            className="group relative px-12 py-6 bg-white text-black rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              Retake Assessment
            </span>
            <div className="absolute inset-0 bg-primary-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <button
            onClick={handleGoHome}
            className="px-12 py-6 glass rounded-full text-white font-black text-lg hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-white/10"
          >
            <HomeIcon size={20} />
            Global Dashboard
          </button>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-primary-blue/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-primary-purple/5 blur-[150px] rounded-full -z-10" />
    </div>
  );
};

export default Result;
