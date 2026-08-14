import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import NexusAIHome from './pages/Home';
import NexusAILogin from './pages/login';
import NexusAIAgents from './pages/Ai_Agents';
import NexusAIChat from './pages/Chat';
import { Routes, Route } from 'react-router-dom';
import NexusAbout from './pages/About';
import Register from './pages/Regestration';
import Pricing from './pages/View_pricing';
import Documentation from './pages/Documentation';
import NexusProfilePage from './pages/Profile';
import NexusSettingsPage from './pages/Setting';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<NexusAIHome />} />
        <Route path="/login" element={<NexusAILogin />} />
        <Route path="/chat" element={<NexusAIChat />} />
        <Route path="/agents" element={<NexusAIAgents />} />
        <Route path="/about" element={<NexusAbout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/profile" element={<NexusProfilePage />} />
        <Route path="/settings" element={<NexusSettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
