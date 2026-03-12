import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Github, Twitter } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isInterview = location.pathname === '/interview';

  if (isInterview) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-gradient-neon rounded-xl flex items-center justify-center shadow-neon group-hover:rotate-12 transition-transform duration-300">
          <Bot size={22} className="text-white" />
        </div>
        <span className="text-xl font-black tracking-tight text-white group-hover:text-primary-blue transition-colors">
          DevInterview <span className="text-primary-cyan">AI</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-8 mr-8 text-sm font-semibold uppercase tracking-wider">
           <Link to="/" className="text-white/60 hover:text-white transition-colors">Platform</Link>
           <Link to="/tracks" className="text-white/60 hover:text-white transition-colors">Practice</Link>
           <Link to="/" className="text-white/60 hover:text-white transition-colors">Pricing</Link>
        </div>
        
        <div className="flex items-center gap-3 border-l border-white/10 pl-8">
          <button className="p-2 text-white/40 hover:text-white transition-colors">
            <Github size={20} />
          </button>
          <button className="p-2 text-white/40 hover:text-white transition-colors">
            <Twitter size={20} />
          </button>
          <button className="ml-4 px-6 py-2.5 bg-white/5 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/10 transition-all active:scale-95">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
