import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Sparkles,
  ArrowLeft,
  Search,
  Code,
  Brain,
  Globe,
  FileText,
  Cpu,
  Zap,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Shield,
  Clock,
  BarChart3,
  Layers,
  Target,
  Workflow,
  CheckCircle2,
  Star,
  Play,
  BrainCircuit,
  Menu,
  X,
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
    'group relative inline-flex items-center justify-center gap-2 px-5 py-3 md:px-7 md:py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden';
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

const GlassCard = ({
  children,
  className = '',
  glow = false,
  active = false,
}) => (
  <div
    className={`relative rounded-2xl border transition-all duration-500 ${active ? 'border-red-500/30 bg-white/[0.06] shadow-[0_0_50px_-15px_rgba(220,38,38,0.25)]' : 'border-white/[0.06] bg-white/[0.03] hover:border-red-500/20 hover:bg-white/[0.05]'} backdrop-blur-xl p-4 sm:p-6 ${glow ? 'shadow-[0_0_40px_-15px_rgba(220,38,38,0.15)]' : ''} ${className}`}
  >
    {children}
  </div>
);

const SectionHeading = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
      {subtitle}
    </span>
    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
      {title}
    </h2>
  </div>
);

// ─── Navbar ──────────────────────────────────────────────────────────

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/', active: false },
    { label: 'Agents', path: '/agents', active: true },
    { label: 'About', path: '/about', active: false },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <a href="/" className="flex items-center gap-2.5 group">
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
            <span className="text-xl font-bold text-white tracking-tight">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${link.active ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Login
            </a>
            <GlowButton onClick={() => navigate('/register')} variant="primary" icon={ArrowRight}>
              Get Started
            </GlowButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-6 pt-2 space-y-2 border-t border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              onClick={() => {
                navigate(link.path);
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-3 rounded-lg text-sm font-medium cursor-pointer ${link.active ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-3 text-center text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5"
            >
              Login
            </a>
            <GlowButton
              onClick={() => {
                navigate('/register');
                setMobileMenuOpen(false);
              }}
              variant="primary"
              icon={ArrowRight}
              className="w-full"
            >
              Get Started
            </GlowButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────

const HeroSection = () => (
  <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-black">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-red-600/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[500px] h-[250px] sm:h-[400px] bg-pink-600/6 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6 tracking-tight">
        Meet the <GradientText>Minds</GradientText>
        <br />
        Behind the Magic
      </h1>
      <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed px-2 sm:px-0">
        Six specialized AI agents, each engineered for a specific domain.
        Together, they form an unstoppable collective intelligence that tackles
        your most complex challenges.
      </p>
    </div>
  </section>
);

// ─── Agent Detail Cards ──────────────────────────────────────────────

const AgentShowcase = () => {
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      id: 'research',
      name: 'Research Agent',
      tagline: 'The Knowledge Archaeologist',
      icon: Search,
      color: 'red',
      gradient: 'from-red-600 to-red-500',
      glow: 'shadow-red-500/30',
      description:
        'Dives deep into academic papers, articles, and knowledge bases to extract verified information with precise citations. Never hallucinates a source.',
      capabilities: [
        'Searches 100M+ academic papers in real-time',
        'Generates APA, MLA, and Chicago citations automatically',
        'Cross-references facts across multiple sources',
        'Extracts key findings from lengthy research papers',
      ],
      stats: { speed: '2.4s', accuracy: '99.2%', sources: '100M+' },
      useCases: [
        'Literature Review',
        'Fact Checking',
        'Citation Generation',
        'Trend Analysis',
      ],
      example:
        '"Find peer-reviewed studies on the effects of intermittent fasting on cognitive function published after 2022, and summarize the key findings with citations."',
    },
    {
      id: 'coding',
      name: 'Coding Agent',
      tagline: 'The Digital Architect',
      icon: Code,
      color: 'pink',
      gradient: 'from-pink-600 to-pink-500',
      glow: 'shadow-pink-500/30',
      description:
        'Writes, debugs, and optimizes code across 50+ languages. From quick scripts to complex system architecture, it thinks like a senior engineer.',
      capabilities: [
        'Writes production-ready code in 50+ languages',
        'Debugs errors with stack trace analysis',
        'Refactors legacy code for modern standards',
        'Generates unit tests and documentation',
      ],
      stats: { speed: '1.8s', accuracy: '98.7%', languages: '50+' },
      useCases: [
        'API Development',
        'Bug Fixing',
        'Code Review',
        'Algorithm Design',
      ],
      example:
        '"Build a Python FastAPI endpoint with JWT authentication, rate limiting, and PostgreSQL integration. Include error handling and OpenAPI docs."',
    },
    {
      id: 'reasoning',
      name: 'Reasoning Agent',
      tagline: 'The Logic Engine',
      icon: Brain,
      color: 'rose',
      gradient: 'from-rose-600 to-rose-500',
      glow: 'shadow-rose-500/30',
      description:
        'Breaks down complex problems into logical steps. Performs multi-step reasoning, hypothesis testing, and nuanced analysis for decisions that matter.',
      capabilities: [
        'Multi-step logical deduction chains',
        'Hypothesis generation and falsification',
        'Probabilistic reasoning under uncertainty',
        'Ethical framework analysis',
      ],
      stats: { speed: '3.1s', accuracy: '97.5%', steps: '12+' },
      useCases: [
        'Strategic Planning',
        'Risk Assessment',
        'Ethical Dilemmas',
        'Data Interpretation',
      ],
      example:
        '"A startup has $500K runway and two growth strategies: aggressive marketing vs. product-led growth. Analyze the trade-offs for a B2B SaaS in the AI space."',
    },
    {
      id: 'web',
      name: 'Web Agent',
      tagline: 'The Live Explorer',
      icon: Globe,
      color: 'red',
      gradient: 'from-red-500 to-rose-500',
      glow: 'shadow-red-500/30',
      description:
        'Browses the live web in real-time. Fetches current data, breaking news, and live trends. Your window to the ever-changing internet.',
      capabilities: [
        'Real-time web browsing and scraping',
        'News aggregation from 10K+ sources',
        'Live price and market data tracking',
        'Social media trend analysis',
      ],
      stats: { speed: '1.2s', accuracy: '96.8%', sources: '10K+' },
      useCases: [
        'Market Research',
        'News Monitoring',
        'Competitor Tracking',
        'Trend Spotting',
      ],
      example:
        '"What are the latest developments in quantum computing from the past 48 hours? Include announcements from IBM, Google, and major research institutions."',
    },
    {
      id: 'pdf',
      name: 'PDF Agent',
      tagline: 'The Document Whisperer',
      icon: FileText,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-400',
      glow: 'shadow-pink-500/30',
      description:
        'Reads, summarizes, and extracts insights from PDFs, Word docs, and scanned reports. Turns walls of text into actionable intelligence.',
      capabilities: [
        'Parses PDF, DOCX, and scanned documents',
        'Generates executive summaries instantly',
        'Extracts tables, charts, and key data points',
        'Answers specific questions about document content',
      ],
      stats: { speed: '4.5s', accuracy: '98.1%', pages: '500+' },
      useCases: [
        'Contract Review',
        'Report Summarization',
        'Data Extraction',
        'Compliance Check',
      ],
      example:
        '"Upload this 200-page annual report and extract: revenue trends, risk factors, and executive compensation changes. Present in a structured table."',
    },
    {
      id: 'orchestrator',
      name: 'Orchestrator',
      tagline: 'The Conductor',
      icon: Cpu,
      color: 'red',
      gradient: 'from-red-600 to-pink-500',
      glow: 'shadow-red-500/30',
      description:
        'The central intelligence that routes tasks, manages agent collaboration, and synthesizes outputs into one coherent, beautiful answer.',
      capabilities: [
        'Intelligent task routing to optimal agents',
        'Parallel agent execution management',
        'Cross-agent result synthesis',
        'Quality assurance and fact consistency',
      ],
      stats: { speed: '<1s', accuracy: '99.5%', agents: '6' },
      useCases: [
        'Task Routing',
        'Result Synthesis',
        'Conflict Resolution',
        'Workflow Optimization',
      ],
      example:
        '"Plan a comprehensive market entry strategy for a fintech startup in Southeast Asia. I need research, competitive analysis, and a go-to-market timeline."',
    },
  ];

  const active = agents[activeAgent];
  const Icon = active.icon;

  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-red-600/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Agent Details"
          title={
            <>
              Explore Each <GradientText>Specialist</GradientText>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          {/* Agent Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2 sm:space-y-3">
            {/* Mobile: Horizontal scrollable pills */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
              {agents.map((agent, i) => {
                const AIcon = agent.icon;
                const isActive = i === activeAgent;
                return (
                  <button
                    key={agent.id}
                    onClick={() => setActiveAgent(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 text-left shrink-0 ${
                      isActive
                        ? 'border-red-500/30 bg-white/[0.06] shadow-[0_0_30px_-10px_rgba(220,38,38,0.2)]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center shrink-0`}
                    >
                      <AIcon size={16} className="text-white" />
                    </div>
                    <span
                      className={`text-sm font-bold ${isActive ? 'text-white' : 'text-zinc-300'} whitespace-nowrap`}
                    >
                      {agent.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Desktop: Vertical list */}
            <div className="hidden lg:block space-y-3">
              {agents.map((agent, i) => {
                const AIcon = agent.icon;
                const isActive = i === activeAgent;
                return (
                  <button
                    key={agent.id}
                    onClick={() => setActiveAgent(i)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${
                      isActive
                        ? 'border-red-500/30 bg-white/[0.06] shadow-[0_0_30px_-10px_rgba(220,38,38,0.2)]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                    >
                      <AIcon size={18} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`text-sm font-bold ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'} transition-colors`}
                      >
                        {agent.name}
                      </h3>
                      <p className="text-xs text-zinc-500 truncate">
                        {agent.tagline}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`ml-auto shrink-0 transition-all ${isActive ? 'text-red-400 translate-x-0' : 'text-zinc-600 -translate-x-1 group-hover:translate-x-0'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Agent Detail Panel */}
          <div className="lg:col-span-8">
            <GlassCard active glow className="h-full">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${active.gradient} flex items-center justify-center shadow-lg ${active.glow}`}
                >
                  <Icon size={24} className="sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {active.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">{active.tagline}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                {active.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                {Object.entries(active.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="text-center p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                  >
                    <div className="text-lg sm:text-xl font-bold text-white mb-1">
                      {value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
                      {key}
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Capabilities */}
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Zap size={14} className="text-red-400" />
                    Capabilities
                  </h4>
                  <ul className="space-y-3">
                    {active.capabilities.map((cap, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-zinc-400"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-red-500/70 shrink-0 mt-0.5"
                        />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target size={14} className="text-pink-400" />
                    Perfect For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.useCases.map((use, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-white/5 rounded-lg border border-white/5"
                      >
                        {use}
                      </span>
                    ))}
                  </div>

                  {/* Example Query */}
                  <div className="mt-6 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <h5 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <MessageSquare size={12} />
                      Example Query
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-400 italic leading-relaxed">
                      {active.example}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Collaboration Diagram ───────────────────────────────────────────

const CollaborationSection = () => (
  <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 bg-black">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[300px] sm:h-[400px] bg-pink-600/5 rounded-full blur-[150px]" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        subtitle="Synergy"
        title={
          <>
            How They <GradientText>Collaborate</GradientText>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {[
          {
            step: '01',
            title: 'Query Analysis',
            desc: 'The Orchestrator instantly deconstructs your question, identifying which agents possess the right expertise.',
            icon: BarChart3,
            color: 'red',
          },
          {
            step: '02',
            title: 'Parallel Execution',
            desc: 'Multiple agents work simultaneously — Research digs deep while Web browses live, and Reasoning plans the structure.',
            icon: Workflow,
            color: 'pink',
          },
          {
            step: '03',
            title: 'Intelligent Synthesis',
            desc: 'The Orchestrator merges all outputs, resolves conflicts, and delivers one coherent, cited, actionable response.',
            icon: Layers,
            color: 'rose',
          },
        ].map((item, i) => (
          <GlassCard key={i} glow className="text-center group">
            <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-6">
              <div
                className={`absolute inset-0 rounded-2xl bg-${item.color}-600/20 blur-xl group-hover:bg-${item.color}-600/30 transition-all`}
              />
              <div className="relative w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <item.icon size={24} className={`sm:w-7 sm:h-7 text-${item.color}-400`} />
              </div>
              <span className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black border border-red-500/30 text-red-400 text-xs font-bold flex items-center justify-center">
                {item.step}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">{item.desc}</p>
          </GlassCard>
        ))}
      </div>

      {/* Live Collaboration Visual */}
      <div className="mt-12 sm:mt-16 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        </div>
        <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {[
            { icon: Search, label: 'Research', color: '#ef4444' },
            { icon: Code, label: 'Coding', color: '#f472b6' },
            { icon: Brain, label: 'Reasoning', color: '#fb7185' },
            { icon: Globe, label: 'Web', color: '#f43f5e' },
            { icon: FileText, label: 'PDF', color: '#e11d48' },
            { icon: Cpu, label: 'Orchestrator', color: '#ec4899' },
          ].map((agent, i) => (
            <div key={i} className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-red-500/30 hover:bg-white/[0.07] transition-all duration-300">
                <agent.icon size={18} className="sm:w-[22px] sm:h-[22px]" style={{ color: agent.color }} />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-zinc-500 text-center">
                {agent.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Performance Stats ───────────────────────────────────────────────

const StatsSection = () => (
  <section className="relative py-16 sm:py-20 border-y border-white/5">
    <div className="absolute inset-0 bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] bg-red-600/5 rounded-full blur-[120px]" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
        {[
          { value: '6', label: 'Specialized Agents', icon: Cpu },
          { value: '<3s', label: 'Avg. Response Time', icon: Clock },
          { value: '99.1%', label: 'Accuracy Rate', icon: Shield },
          { value: '50+', label: 'Languages Supported', icon: Globe },
        ].map((stat, i) => (
          <div key={i} className="group">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 mb-3 sm:mb-4 group-hover:border-red-500/30 transition-colors">
              <stat.icon size={18} className="sm:w-5 sm:h-5 text-red-400" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Testimonials ────────────────────────────────────────────────────

const TestimonialsSection = () => (
  <section className="relative py-16 sm:py-24 md:py-32">
    <div className="absolute inset-0 bg-black">
      <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[250px] sm:h-[400px] bg-red-600/5 rounded-full blur-[150px]" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        subtitle="Reviews"
        title={
          <>
            Trusted by <GradientText>Innovators</GradientText>
          </>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[
          {
            quote:
              'The Research Agent saved me 20 hours on my thesis literature review. The citations were perfect and the synthesis was publication-ready.',
            author: 'Dr. Sarah Chen',
            role: 'PhD Candidate, MIT',
            rating: 5,
          },
          {
            quote:
              'I asked for a full-stack app architecture and got production-quality code with tests, docs, and deployment configs. Unreal.',
            author: 'Marcus Johnson',
            role: 'CTO, TechStart',
            rating: 5,
          },
          {
            quote:
              'The multi-agent collaboration is what sets Nexus apart. It feels like having a research team, developer, and analyst in one chat.',
            author: 'Elena Rodriguez',
            role: 'Product Lead, Fintech Co',
            rating: 5,
          },
        ].map((t, i) => (
          <GlassCard key={i} glow className="group">
            <div className="flex gap-1 mb-3 sm:mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="text-red-400 fill-red-400" />
              ))}
            </div>
            <p className="text-zinc-300 leading-relaxed mb-5 sm:mb-6 text-sm">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                {t.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {t.author}
                </div>
                <div className="text-xs text-zinc-500 truncate">{t.role}</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA Section ─────────────────────────────────────────────────────

const CTASection = ({ navigate }) => (
  <section className="relative py-16 sm:py-24 md:py-32">
    <div className="absolute inset-0 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[250px] sm:h-[400px] bg-red-600/10 rounded-full blur-[150px]" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <GlassCard glow className="py-10 sm:py-16 px-6 sm:px-8 md:px-16 border-red-500/10">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-red-500/20">
          <Play size={14} />
          Start collaborating now
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Your AI Team is
          <br />
          <GradientText>Ready to Work</GradientText>
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 mb-8 sm:mb-10 max-w-xl mx-auto px-2 sm:px-0">
          Pick any agent — or let the Orchestrator choose for you. Your first
          query is free and instant.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <GlowButton
            variant="primary"
            icon={ArrowRight}
            onClick={() => navigate('/chat')}
            className="w-full sm:w-auto text-base px-8 sm:px-10 py-4"
          >
            Start Chatting
          </GlowButton>
          <GlowButton
            onClick={() => navigate('/documentation')}
            variant="outline"
            className="w-full sm:w-auto text-base px-8 sm:px-10 py-4"
          >
            View Documentation
          </GlowButton>
        </div>
      </GlassCard>
    </div>
  </section>
);

// ─── Footer ──────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="relative border-t border-white/5 bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div
            className="
              relative w-9 h-9 rounded-lg
              bg-gradient-to-br from-zinc-950 via-black to-red-950/40
              border border-red-500/25
              flex items-center justify-center
              shadow-[0_0_18px_-6px_rgba(244,63,94,0.6)]
              transition-all duration-300
            "
          >
            <NexusLogo size={20} />
          </div>
          <span className="text-lg font-bold text-white">
            Nexus<span className="text-red-500">AI</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-zinc-500">
          <a href="/" className="hover:text-zinc-300 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Agents
          </a>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Terms
          </a>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 text-center md:text-right">
          © 2026 Nexus AI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// ─── Main App ────────────────────────────────────────────────────────

export default function NexusAIAgents() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30 selection:text-red-200">
      <Navbar />
      <HeroSection />
      <AgentShowcase />
      <CollaborationSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection navigate={navigate} />
      <Footer />
    </div>
  );
}