import { motion } from 'framer-motion';
import { Terminal, Code2, Globe, Database, Server, Cpu, Layers } from 'lucide-react';

const LanguageCard = ({ name, onClick, index = 0 }) => {
  const getIcon = (lang) => {
    const icons = {
      'React': <Code2 className="w-8 h-8 text-blue-400" />,
      'Angular': <Layers className="w-8 h-8 text-red-500" />,
      'Vue': <Globe className="w-8 h-8 text-emerald-400" />,
      'HTML': <Globe className="w-8 h-8 text-orange-500" />,
      'CSS': <Globe className="w-8 h-8 text-blue-400" />,
      'JavaScript': <Terminal className="w-8 h-8 text-yellow-400" />,
      'TypeScript': <Terminal className="w-8 h-8 text-blue-400" />,
      'Node.js': <Server className="w-8 h-8 text-green-500" />,
      'Express': <Database className="w-8 h-8 text-gray-400" />,
      'Python': <Terminal className="w-8 h-8 text-blue-500" />,
      'Django': <Server className="w-8 h-8 text-emerald-600" />,
      'PHP': <Server className="w-8 h-8 text-indigo-400" />,
      'Laravel': <Cpu className="w-8 h-8 text-red-400" />,
      'Java Spring': <Cpu className="w-8 h-8 text-green-600" />,
    };
    return icons[lang] || <Code2 className="w-8 h-8 text-white/50" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        y: -5,
        scale: 1.05,
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderColor: "rgba(37, 99, 235, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`glass border rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-white/10`}
    >
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {getIcon(name)}
      </div>
      <h4 className="text-lg font-bold text-white/90">{name}</h4>
      <div className="w-0 group-hover:w-full h-0.5 bg-primary-blue mt-4 transition-all duration-300 opacity-0 group-hover:opacity-100" />
    </motion.div>
  );
};

export default LanguageCard;
