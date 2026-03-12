import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, Zap, BarChart3, ChevronRight, Terminal, Globe, Brain, Sparkles, LayoutGrid, Award, Users, Activity } from 'lucide-react';

const StatsTicker = () => {
  const [stats, setStats] = useState({ interviews: 12480, hired: 3520, uptime: 99.9 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        interviews: prev.interviews + Math.floor(Math.random() * 3),
        hired: prev.hired + (Math.random() > 0.8 ? 1 : 0),
        uptime: prev.uptime
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12 border-t border-white/5 opacity-60">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-black text-white">{stats.interviews.toLocaleString()}</div>
        <div className="text-[10px] font-mono tracking-widest text-primary-cyan uppercase">Interviews Conducted</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-black text-white">{stats.hired.toLocaleString()}</div>
        <div className="text-[10px] font-mono tracking-widest text-primary-purple uppercase">Candidates Hired</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-black text-white">{stats.uptime}%</div>
        <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">AI Core Uptime</div>
      </div>
    </div>
  );
};

// Floating 3D Cubes Background Component
const FloatingCubes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            rotateY: [0, 360],
            rotateX: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute hidden md:block"
          style={{
            top: `${10 + i * 15}%`,
            left: `${5 + (i * 25) % 90}%`,
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(4px)',
            borderRadius: '12px',
          }}
        />
      ))}
    </div>
  );
};

// 3D Tilt Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc, delay, color }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="glass-card p-10 rounded-[2.5rem] flex flex-col items-center text-center group cursor-pointer border border-white/10 group-hover:border-white/20 transition-all duration-500"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className={`w-20 h-20 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}
      >
        <Icon className="text-white w-10 h-10" />
      </div>
      
      <h3 
        style={{ transform: "translateZ(30px)" }}
        className="text-3xl font-black mb-4 text-white tracking-tight"
      >
        {title}
      </h3>
      
      <p 
        style={{ transform: "translateZ(20px)" }}
        className="text-white/60 leading-relaxed text-lg"
      >
        {desc}
      </p>
      
      <div 
        style={{ transform: "translateZ(10px)" }}
        className="mt-10 flex items-center text-primary-cyan text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
      >
        Discover technology <ChevronRight className="w-4 h-4 ml-2" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary-blue/20 blur-[60px] rounded-full group-hover:bg-primary-blue/30 transition-all duration-500" />
    </motion.div>
  );
};

// New Process Block Component
const ProcessStep = ({ number, title, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="flex items-center gap-8 group"
  >
    <div className="relative">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl font-black text-white/20 group-hover:text-primary-cyan/40 transition-colors duration-500">
        {number}
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-primary-blue flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
        <Icon className="w-4 h-4 text-white" />
      </div>
    </div>
    <div>
      <h4 className="text-2xl font-bold text-white mb-2">{title}</h4>
      <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-transparent rounded-full group-hover:w-full transition-all duration-700" />
    </div>
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#020617] text-white">
      <FloatingCubes />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 container mx-auto px-4 text-center overflow-hidden">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-[7.5rem] font-black mb-8 leading-[0.9] tracking-tighter"
        >
          Level Up Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple animate-gradient-x">Engineering</span> <br />
          Career.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/50 mb-16 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          The most advanced AI interview simulator. Mock live coding, system design, and behavioral sessions with real-time analysis and expert mentoring.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24"
        >
          <button
            onClick={() => navigate('/tracks')}
            className="group relative px-12 py-6 bg-white text-black rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Evaluation <Sparkles className="w-6 h-6 animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-primary-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <button
            className="group px-12 py-6 rounded-full text-white font-bold text-xl border-2 border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
            </div>
            Watch Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <StatsTicker />
        </motion.div>
      </section>

      {/* How it Works / Steps Section */}
      <section className="container mx-auto px-4 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-black mb-12 tracking-tight"
            >
              Master the interview <br />
              <span className="text-white/40">in 3 simple steps.</span>
            </motion.h2>
            
            <div className="space-y-10">
              <ProcessStep number="01" title="Select Your Stack" icon={Globe} delay={0.1} />
              <ProcessStep number="02" title="AI Live Interview" icon={Brain} delay={0.2} />
              <ProcessStep number="03" title="Detailed Analysis" icon={Terminal} delay={0.3} />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary-blue/20 blur-[100px] rounded-full -z-10" />
            <motion.div
              initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="glass p-8 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse" />
                <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse delay-75" />
                <div className="h-4 w-5/6 bg-white/10 rounded-full animate-pulse delay-150" />
                <div className="pt-8 flex justify-between items-center text-primary-cyan font-mono text-sm">
                  <span>{">"} analyzing behavior...</span>
                  <span className="animate-blink cursor">_</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="container mx-auto px-4 py-32 bg-white/[0.02]">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black mb-4">Why choose AI Interview?</h2>
          <p className="text-white/40 max-w-xl mx-auto">Built by engineers, for engineers. We focus on the details that actually matter in Silicon Valley interviews.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto perspective-1000">
          <FeatureCard
            icon={Cpu}
            color="from-blue-600 to-indigo-600"
            title="Real Environments"
            desc="Practice in a fully functional IDE with terminal access and browser preview."
            delay={0.2}
          />
          <FeatureCard
            icon={Zap}
            color="from-purple-600 to-fuchsia-600"
            title="Instant Analysis"
            desc="Get immediate feedback on code efficiency, edge cases, and design patterns."
            delay={0.4}
          />
          <FeatureCard
            icon={BarChart3}
            color="from-cyan-600 to-blue-600"
            title="Expert Metrics"
            desc="Compare your performance with industry standards and seniority tiers."
            delay={0.6}
          />
        </div>
      </section>

      {/* Footer / CTA Section */}
      <section className="container mx-auto px-4 py-40 text-center">
        <div className="glass p-20 rounded-[4rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/10 blur-[100px] -z-10" />
          <h2 className="text-6xl font-black mb-8 italic">Ready to land your dream job?</h2>
          <button 
            onClick={() => navigate('/tracks')}
            className="group px-16 py-8 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full text-white font-black text-2xl shadow-neon hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all duration-500"
          >
            Get Started Now — It's Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
