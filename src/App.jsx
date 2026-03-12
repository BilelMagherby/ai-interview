import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InterviewProvider } from './context/InterviewContext';
import ThreeCanvas from './components/ThreeCanvas';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TrackSelection from './pages/TrackSelection';
import LanguageSelection from './pages/LanguageSelection';
import Interview from './pages/Interview';
import Result from './pages/Result';

function App() {
  return (
    <InterviewProvider>
      <Router>
        <div className="relative min-h-screen text-white">
          <ThreeCanvas />
          <Navbar />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tracks" element={<TrackSelection />} />
              <Route path="/languages/:track" element={<LanguageSelection />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </div>
        </div>
      </Router>
    </InterviewProvider>
  );
}

export default App;
