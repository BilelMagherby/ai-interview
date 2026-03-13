import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, Zap, BarChart3, ChevronRight, Terminal, Globe, Brain, Sparkles, LayoutGrid, Award, Users, Activity, X, CheckCircle2, Monitor, MessageSquare, LineChart } from 'lucide-react';
import WebDevAnimation from '../components/WebDevAnimation';

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
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-primary-blue/30 overflow-x-hidden">
      <FloatingCubes />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center z-10">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85]"
        >
          Level Up Your<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple animate-gradient-x">Engineering</span><br />
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
            onClick={() => setShowDemo(true)}
            className="group px-12 py-6 rounded-full text-white/70 font-bold text-xl border-2 border-white/10 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-300 flex items-center gap-3"
          >
            How it works
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

      {/* How it Works Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          >
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowDemo(false)}
               className="absolute inset-0 bg-black/98 backdrop-blur-3xl cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-6xl glass-card rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_150px_rgba(37,99,235,0.2)] p-2 md:p-4 overflow-y-auto max-h-[98vh] custom-scrollbar"
            >
              <div className="relative bg-[#050b1a]/90 rounded-[3.5rem] p-10 md:p-20 overflow-hidden">
                {/* Background SVG Neural Path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                  <motion.path
                    d="M 100 250 Q 300 100 500 250 T 900 250"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                  </defs>
                </svg>

                <button 
                  onClick={() => setShowDemo(false)}
                  className="absolute top-10 right-10 z-20 p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110"
                >
                  <X size={28} />
                </button>

                <div className="text-left mb-20 relative z-10">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: 80 }}
                     className="h-1.5 bg-gradient-to-r from-primary-blue to-primary-cyan mb-6 rounded-full"
                   />
                   <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">THE <span className="text-gradient">PROCESS.</span></h2>
                   <p className="text-white/40 text-xl max-w-2xl font-medium">Follow the sequence to unlock your full engineering potential.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full relative z-10">
                  {/* Step 1: Select Track */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, x: -30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/[0.08] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.03] group-hover:text-primary-blue/10 transition-colors">01</div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                        <Monitor size={28} />
                      </div>
                    </div>
                    <h4 className="text-3xl font-bold mb-4">Select Your Arena</h4>
                    <p className="text-white/50 leading-relaxed text-lg">Define your battlefield. Choose Frontend or Backend specialization focused on top-tier engineering roles.</p>
                  </motion.div>

                  {/* Step 2: Pick Tech */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-7 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/[0.08] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.03] group-hover:text-primary-cyan/10 transition-colors">02</div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                        <LayoutGrid size={28} />
                      </div>
                    </div>
                    <h4 className="text-3xl font-bold mb-4">Weaponize Your Stack</h4>
                    <p className="text-white/50 leading-relaxed text-lg">Pick your tools. From React ecosystem to robust Node.js architectures, we test your depth on 15+ modern technologies.</p>
                  </motion.div>

                  {/* Step 3: AI Simulation */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="md:col-span-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 hover:border-primary-blue/30 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.03] group-hover:text-primary-blue/10 transition-colors">03</div>
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                       <div className="flex-1">
                          <div className="w-14 h-14 rounded-2xl bg-primary-blue/20 flex items-center justify-center text-primary-cyan mb-8 border border-primary-blue/20 shadow-neon">
                            <MessageSquare size={28} />
                          </div>
                          <h4 className="text-4xl font-black mb-4 tracking-tight">AI Neural Interview</h4>
                          <p className="text-white/50 leading-relaxed text-lg italic pr-12">"Engage with our recursive AI core. It doesn't just ask questions—it probe your architectural decisions in real-time."</p>
                       </div>
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                         className="shrink-0 p-8 rounded-full bg-primary-blue/5 border border-primary-blue/10"
                       >
                          <Brain className="text-primary-cyan" size={60} />
                       </motion.div>
                    </div>
                  </motion.div>

                  {/* Step 4: Analysis */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="md:col-span-4 bg-gradient-to-br from-primary-blue/40 to-primary-purple/40 border border-primary-blue/30 rounded-[2.5rem] p-10 hover:scale-[1.02] transition-all group relative overflow-hidden shadow-neon"
                  >
                    <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/10">04</div>
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-8">
                      <LineChart size={28} />
                    </div>
                    <h4 className="text-3xl font-bold mb-4">Deep Analytics</h4>
                    <p className="text-white/70 text-sm leading-relaxed mb-10">Receive a comprehensive seniority-level dossier on your logic and code.</p>
                    <button 
                       onClick={() => navigate('/tracks')}
                       className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg hover:bg-primary-cyan transition-all shadow-2xl active:scale-95"
                    >
                      EXECUTE
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
