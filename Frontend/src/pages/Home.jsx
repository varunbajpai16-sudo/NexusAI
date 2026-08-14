import React, { useState, useEffect, useRef } from 'react';
import NexusHomeLoader from '../components/Loading_Page';
import { useNavigate } from 'react-router';
import {
  BrainCircuit,
  Menu,
  X,
  MessageSquare,
  Users,
  Zap,
  Globe,
  FileText,
  Brain,
  Code,
  Search,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Shield,
  Cpu,
} from 'lucide-react';
import { NexusLogo } from '../components/Nexus_Logo';
// ─── Reusable Components ─────────────────────────────────────────────

const GradientText = ({ children, className = '' }) => (
  <span
    className={`bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

const GlowButton = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  icon: Icon,
}) => {
  const base =
    'group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden';
  const styles = {
    primary:
      'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_-5px_rgba(220,38,38,0.7)] hover:scale-[1.02]',
    secondary:
      'bg-white/5 border border-white/10 text-white backdrop-blur-sm hover:bg-white/10 hover:border-red-500/30 hover:shadow-[0_0_30px_-10px_rgba(220,38,38,0.3)]',
    outline:
      'border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_20px_-5px_rgba(220,38,38,0.4)]',
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && (
          <Icon
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        )}
      </span>
    </button>
  );
};

const GlassCard = ({ children, className = '', glow = false }) => (
  <div
    className={`relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 transition-all duration-500 hover:border-red-500/20 hover:bg-white/[0.05] ${glow ? 'shadow-[0_0_40px_-15px_rgba(220,38,38,0.15)]' : ''} ${className}`}
  >
    {children}
  </div>
);

const SectionHeading = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-10 sm:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
    <span className="inline-block px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
      {subtitle}
    </span>
    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight px-2">
      {title}
    </h2>
  </div>
);

// ─── Navbar ──────────────────────────────────────────────────────────

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Agents', href: '/agents' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          >
            <div
              className="
                                            relative w-9 h-9 rounded-lg
                                            bg-gradient-to-br from-zinc-950 via-black to-red-950/40
                                            border border-red-500/25
                                            flex items-center justify-center
                                            shadow-[0_0_18px_-6px_rgba(244,63,94,0.6)]
                                            group-hover:border-pink-500/50
                                            group-hover:shadow-[0_0_28px_-5px_rgba(236,72,153,0.7)]
                                            transition-all duration-300
                                          "
            >
              <NexusLogo size={27} />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                onClick={() => navigate(link.href)}
                className={`px-4 py-2 text-sm font-medium ${link.href === '/' ? 'bg-white/6 text-white' : 'bg-black text-zinc-400'} hover:cursor-pointer hover:text-white transition-colors rounded-lg `}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors hover:cursor-pointer"
            >
              Login
            </a>
            <GlowButton
              onClick={() => navigate('/register')}
              variant="primary"
              icon={ArrowRight}
            >
              Get Started
            </GlowButton>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={22} className="sm:hidden" />
            ) : (
              <Menu size={22} className="sm:hidden" />
            )}
            {isOpen ? (
              <X size={24} className="hidden sm:block" />
            ) : (
              <Menu size={24} className="hidden sm:block" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/5">
          <div className="px-4 py-6 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                onClick={() => {
                  setIsOpen(false);
                  navigate(link.href);
                }}
                className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors hover:cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/5 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
                className="px-4 py-3 text-zinc-300 hover:text-white text-center"
              >
                Login
              </button>
              <GlowButton
                variant="primary"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/register');
                }}
              >
                Get Started
              </GlowButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-24 pb-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[90vw] max-h-[800px] bg-red-600/10 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[70vw] max-w-[500px] h-[70vw] max-h-[500px] bg-pink-600/8 rounded-full blur-[90px] sm:blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm text-zinc-300">
            Multi-Agent AI Platform
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] sm:leading-[1.05] mb-5 sm:mb-6 tracking-tight px-1">
          One Question.
          <br />
          <GradientText>An Entire AI Team.</GradientText>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed px-2">
          Nexus AI orchestrates multiple specialized AI agents — Research,
          Coding, Reasoning, Web, and PDF — working together in real-time to
          deliver comprehensive, accurate answers to your most complex
          questions.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4 sm:px-0">
          <GlowButton
            variant="primary"
            icon={ArrowRight}
            className="w-full sm:w-auto text-base hover:cursor-pointer"
            onClick={() => navigate('/chat')}
          >
            Start Chatting
          </GlowButton>
          <GlowButton
            variant="secondary"
            icon={ChevronRight}
            onClick={() => navigate('/documentation')}
            className="w-full sm:w-auto text-base hover:cursor-pointer"
          >
            View Documentation
          </GlowButton>
        </div>

        {/* Nexus Visualization */}
        <NexusVisualization />
      </div>
    </section>
  );
};

// ─── Nexus Visualization ─────────────────────────────────────────────

const NexusVisualization = () => {
  const agents = [
    { name: 'Research', icon: Search, color: '#ef4444', angle: -72, delay: 0 },
    { name: 'Coding', icon: Code, color: '#f472b6', angle: 0, delay: 0.1 },
    { name: 'Reasoning', icon: Brain, color: '#fb7185', angle: 72, delay: 0.2 },
    { name: 'Web', icon: Globe, color: '#f43f5e', angle: 144, delay: 0.3 },
    { name: 'PDF', icon: FileText, color: '#e11d48', angle: 216, delay: 0.4 },
  ];

  const radius = 140;
  const centerX = 200;
  const centerY = 200;

  return (
    <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-lg mx-auto">
      <div className="relative aspect-square">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 30px rgba(220,38,38,0.2))' }}
        >
          {/* Orbiting rings */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(220,38,38,0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.7}
            fill="none"
            stroke="rgba(244,114,182,0.08)"
            strokeWidth="1"
          />

          {/* Connection lines */}
          {agents.map((agent, i) => {
            const rad = (agent.angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(rad);
            const y = centerY + radius * Math.sin(rad);
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={agent.color}
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="6 4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="20"
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}

          {/* Data particles flowing */}
          {agents.map((agent, i) => {
            const rad = (agent.angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(rad);
            const y = centerY + radius * Math.sin(rad);
            return (
              <circle key={`p-${i}`} r="3" fill={agent.color} opacity="0.8">
                <animateMotion
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={`M${x},${y} L${centerX},${centerY}`}
                />
              </circle>
            );
          })}

          {/* Central Core */}
          <g>
            <circle
              cx={centerX}
              cy={centerY}
              r="45"
              fill="url(#coreGrad)"
              opacity="0.9"
            >
              <animate
                attributeName="r"
                values="45;48;45"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={centerX}
              cy={centerY}
              r="55"
              fill="none"
              stroke="url(#coreGrad)"
              strokeWidth="1"
              opacity="0.4"
            >
              <animate
                attributeName="r"
                values="55;65;55"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <foreignObject
              x={centerX - 20}
              y={centerY - 20}
              width="40"
              height="40"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Cpu size={24} className="text-white" />
              </div>
            </foreignObject>
          </g>

          {/* Agent Nodes */}
          {agents.map((agent, i) => {
            const rad = (agent.angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(rad);
            const y = centerY + radius * Math.sin(rad);
            return (
              <g key={`agent-${i}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="28"
                  fill="rgba(0,0,0,0.8)"
                  stroke={agent.color}
                  strokeWidth="2"
                  opacity="0.9"
                />
                <foreignObject x={x - 12} y={y - 12} width="24" height="24">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ color: agent.color }}
                  >
                    <agent.icon size={16} />
                  </div>
                </foreignObject>
                <text
                  x={x}
                  y={y + 48}
                  textAnchor="middle"
                  fill="#a1a1aa"
                  fontSize="11"
                  fontWeight="600"
                >
                  {agent.name}
                </text>
              </g>
            );
          })}

          <defs>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

// ─── Agents Section ──────────────────────────────────────────────────

const AgentsSection = () => {
  const agents = [
    {
      name: 'Research Agent',
      description:
        'Dives deep into academic papers, articles, and knowledge bases to extract verified information and citations.',
      icon: Search,
      color: 'from-red-600 to-red-500',
      glow: 'shadow-red-500/20',
      features: ['Academic Search', 'Citation Tracking', 'Fact Verification'],
    },
    {
      name: 'Coding Agent',
      description:
        'Writes, debugs, and optimizes code across multiple languages with context-aware suggestions.',
      icon: Code,
      color: 'from-pink-600 to-pink-500',
      glow: 'shadow-pink-500/20',
      features: ['Multi-Language', 'Debug & Optimize', 'Code Review'],
    },
    {
      name: 'Reasoning Agent',
      description:
        'Breaks down complex problems into logical steps, performing multi-step reasoning for nuanced answers.',
      icon: Brain,
      color: 'from-rose-600 to-rose-500',
      glow: 'shadow-rose-500/20',
      features: ['Logical Analysis', 'Step-by-Step', 'Hypothesis Testing'],
    },
    {
      name: 'Web Agent',
      description:
        'Browses the live web in real-time, fetching current data, news, and trends from across the internet.',
      icon: Globe,
      color: 'from-red-500 to-rose-500',
      glow: 'shadow-red-500/20',
      features: ['Live Browsing', 'Real-Time Data', 'Trend Analysis'],
    },
    {
      name: 'PDF Agent',
      description:
        'Reads, summarizes, and extracts insights from PDF documents, reports, and research papers.',
      icon: FileText,
      color: 'from-pink-500 to-rose-400',
      glow: 'shadow-pink-500/20',
      features: ['Document Parsing', 'Smart Summaries', 'Key Extraction'],
    },
    {
      name: 'Orchestrator',
      description:
        'The central intelligence that coordinates all agents, ensuring seamless collaboration and synthesis.',
      icon: Sparkles,
      color: 'from-red-600 to-pink-500',
      glow: 'shadow-red-500/20',
      features: ['Task Routing', 'Result Synthesis', 'Quality Control'],
    },
  ];

  return (
    <section id="agents" className="relative py-16 sm:py-24 md:py-32">
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[300px] sm:h-[400px] bg-red-600/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="AI Team"
          title={
            <>
              Meet Your <GradientText>AI Team</GradientText>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {agents.map((agent, i) => (
            <GlassCard key={i} glow className="group hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg ${agent.glow} group-hover:scale-110 transition-transform duration-300 shrink-0`}
                >
                  <agent.icon size={20} className="text-white sm:hidden" />
                  <agent.icon
                    size={22}
                    className="text-white hidden sm:block"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {agent.features.map((f, j) => (
                  <span
                    key={j}
                    className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-white/5 rounded-lg border border-white/5"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ────────────────────────────────────────────────────

const HowItWorksSection = () => {
  const steps = [
    {
      num: '01',
      title: 'Ask Your Question',
      desc: 'Type any question, upload a document, or share a complex problem. No formatting required — just ask naturally.',
      icon: MessageSquare,
      color: 'red',
    },
    {
      num: '02',
      title: 'Agents Collaborate',
      desc: 'Our orchestrator instantly routes your query to the right AI agents. They research, code, reason, and browse in parallel.',
      icon: Users,
      color: 'pink',
    },
    {
      num: '03',
      title: 'Get a Smart Answer',
      desc: 'All agent outputs are synthesized into one coherent, cited, and actionable response — delivered in seconds.',
      icon: Zap,
      color: 'rose',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black">
        <div className="absolute bottom-0 right-0 w-[80vw] max-w-[500px] h-[80vw] max-h-[500px] bg-pink-600/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Process"
          title={
            <>
              How It <GradientText>Works</GradientText>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-6">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${step.color}-600 to-${step.color}-500 opacity-20 group-hover:opacity-30 transition-opacity blur-xl`}
                />
                <div className="relative w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-500/30 group-hover:bg-white/[0.07] transition-all duration-300">
                  <step.icon
                    size={24}
                    className={`text-${step.color}-400 sm:hidden`}
                  />
                  <step.icon
                    size={28}
                    className={`text-${step.color}-400 hidden sm:block`}
                  />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-sm mx-auto px-4 sm:px-0">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA Section ─────────────────────────────────────────────────────

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[300px] sm:h-[400px] bg-red-600/10 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <GlassCard
          glow
          className="py-12 px-5 sm:py-16 sm:px-8 md:px-16 border-red-500/10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs sm:text-sm font-medium mb-5 sm:mb-6 border border-red-500/20 text-center">
            <Shield size={14} className="shrink-0" />
            <span>Free to start. No credit card required.</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 sm:mb-6 leading-tight">
            Ready to Experience the
            <br />
            <GradientText>Future of AI Collaboration?</GradientText>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 mb-8 sm:mb-10 max-w-xl mx-auto">
            Join thousands of researchers, developers, and innovators who trust
            Nexus AI to solve their toughest challenges.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <GlowButton
              variant="primary"
              icon={ArrowRight}
              className="w-full sm:w-auto text-base px-8 sm:px-10 py-3.5 sm:py-4"
              onClick={() => navigate('/chat')}
            >
              Start Chatting Now
            </GlowButton>
            <GlowButton
              onClick={() => navigate('/pricing')}
              variant="outline"
              className="w-full sm:w-auto text-base px-8 sm:px-10 py-3.5 sm:py-4"
            >
              View Pricing
            </GlowButton>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div
              className="
                    relative w-9 h-9 rounded-lg
                    bg-gradient-to-br from-zinc-950 via-black to-red-950/40
                    border border-red-500/25
                    flex items-center justify-center
                    shadow-[0_0_18px_-6px_rgba(244,63,94,0.6)]
                    group-hover:border-pink-500/50
                    group-hover:shadow-[0_0_28px_-5px_rgba(236,72,153,0.7)]
                    transition-all duration-300
                  "
            >
              <NexusLogo size={20} />
            </div>
            <span className="text-lg font-bold text-white">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 text-sm text-zinc-500 order-3 md:order-2">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Contact
            </a>
          </div>
          <p className="text-sm text-zinc-600 order-2 md:order-3">
            © 2026 Nexus AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ─── Main App ────────────────────────────────────────────────────────

export default function NexusAIHome() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('nexus_loader_shown');
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem('nexus_loader_shown', 'true');
    setLoading(false);
  };
  return (
    <>
      {loading && (
        <NexusHomeLoader duration={5000} onComplete={handleLoaderComplete} />
      )}
      <div className="min-h-screen bg-black text-white selection:bg-red-500/30 selection:text-red-200 overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <AgentsSection />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
