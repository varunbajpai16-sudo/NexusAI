import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowRight,
  Brain,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  FileText,
  Globe2,
  Layers,
  Menu,
  MessageSquare,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { NexusLogo } from '../components/Nexus_Logo';
import { toggleDarkMode } from '../features/Toggle/Toggle_slice';

const GradientText = ({ children }) => (
  <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-pink-400 bg-clip-text text-transparent">
    {children}
  </span>
);

const Glass = ({ children, className = '', active = false }) => {
  const dark = useSelector((s) => s.toggle.darkMode);
  return (
    <div
      className={`rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
        active
          ? 'border-red-500/30 bg-red-500/[0.045] shadow-[0_0_55px_-18px_rgba(244,63,94,.55)]'
          : dark
            ? 'border-white/[0.07] bg-white/[0.03] hover:border-red-500/20 hover:bg-white/[0.045]'
            : 'border-black/[0.07] bg-black/[0.018] hover:border-red-500/20 hover:bg-black/[0.035]'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Button = ({
  children,
  primary = true,
  icon: Icon,
  onClick,
  className = '',
}) => {
  const dark = useSelector((s) => s.toggle.darkMode);
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
        primary
          ? 'bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white shadow-[0_14px_38px_-14px_rgba(244,63,94,.75)] hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-12px_rgba(244,63,94,.85)]'
          : dark
            ? 'border border-white/10 bg-white/[0.04] text-zinc-200 hover:border-red-500/30 hover:bg-white/[0.07]'
            : 'border border-black/10 bg-black/[0.025] text-zinc-800 hover:border-red-500/30 hover:bg-black/[0.05]'
      } ${className}`}
    >
      {children}
      {Icon && (
        <Icon
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </button>
  );
};

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const dark = useSelector((s) => s.toggle.darkMode);
  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-500/30 hover:text-white"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const dark = useSelector((s) => s.toggle.darkMode);
  const [open, setOpen] = useState(false);

  const links = [
    ['Home', '/'],
    ['Agents', '/agents'],
    ['About', '/about'],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl ${
        dark
          ? 'border-white/[0.05] bg-black/75'
          : 'border-black/[0.05] bg-white/80'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-2.5"
        >
          <div
            className={`
                                      relative w-9 h-9 rounded-lg
                                      bg-gradient-to-br ${dark ? 'from-zinc-950 via-black to-red-950/40' : 'from-zinc-100 via-white to-red-100'}
                                      border border-red-500/25
                                      flex items-center justify-center
                                      shadow-[0_0_18px_-6px_rgba(244,63,94,0.6)]
                                      group-hover:border-pink-500/50
                                      group-hover:shadow-[0_0_28px_-5px_rgba(236,72,153,0.7)]
                                      transition-all duration-300
                                    `}
          >
            <NexusLogo size={20} />
          </div>
          <span
            className={`text-xl font-bold ${dark ? 'text-white' : 'text-zinc-950'}`}
          >
            Nexus<span className="text-red-500">AI</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([name, path]) => (
            <button
              key={name}
              onClick={() => navigate(path)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                name === 'Agents'
                  ? dark
                    ? 'bg-white/[0.06] text-white'
                    : 'bg-black/[0.05] text-zinc-950'
                  : dark
                    ? 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                    : 'text-zinc-500 hover:bg-black/[0.04] hover:text-zinc-950'
              }`}
            >
              {name}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => navigate('/login')}
            className={`px-3 text-sm font-semibold ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}
          >
            Login
          </button>
          <ThemeToggle />
          <Button onClick={() => navigate('/register')} icon={ArrowRight}>
            Get Started
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className={`rounded-xl p-2 ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`border-t px-4 pb-5 pt-3 md:hidden ${dark ? 'border-white/5 bg-black/95' : 'border-black/5 bg-white/95'}`}
        >
          {links.map(([name, path]) => (
            <button
              key={name}
              onClick={() => {
                setOpen(false);
                navigate(path);
              }}
              className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium ${
                name === 'Agents'
                  ? 'bg-red-500/10 text-red-500'
                  : dark
                    ? 'text-zinc-300'
                    : 'text-zinc-600'
              }`}
            >
              {name}
            </button>
          ))}
          <div className="mt-3 border-t border-white/5 pt-3">
            <Button
              className="w-full"
              onClick={() => {
                setOpen(false);
                navigate('/register');
              }}
              icon={ArrowRight}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

const agents = [
  {
    id: 'research',
    name: 'Research Agent',
    short: 'Research',
    tagline: 'The Knowledge Archaeologist',
    icon: Search,
    gradient: 'from-red-600 to-red-500',
    description:
      'Dives deep into academic papers, articles, and knowledge bases to extract verified information with precise citations.',
    capabilities: [
      'Academic search',
      'Citation generation',
      'Cross-source verification',
      'Research synthesis',
    ],
    useCases: [
      'Literature review',
      'Fact checking',
      'Citation generation',
      'Trend analysis',
    ],
    stats: [
      ['2.4s', 'avg. speed'],
      ['99.2%', 'accuracy'],
      ['100M+', 'sources'],
    ],
    example:
      'Find peer-reviewed studies on a topic and summarize the key findings with citations.',
  },
  {
    id: 'coding',
    name: 'Coding Agent',
    short: 'Coding',
    tagline: 'The Digital Architect',
    icon: Code2,
    gradient: 'from-pink-600 to-pink-500',
    description:
      'Writes, debugs, reviews, and optimizes code with the mindset of a senior software engineer.',
    capabilities: [
      'Production code',
      'Stack-trace debugging',
      'Architecture',
      'Tests and docs',
    ],
    useCases: ['API development', 'Bug fixing', 'Code review', 'Algorithms'],
    stats: [
      ['1.8s', 'avg. speed'],
      ['98.7%', 'accuracy'],
      ['50+', 'languages'],
    ],
    example:
      'Build a secure API with authentication, rate limiting, database integration and tests.',
  },
  {
    id: 'reasoning',
    name: 'Reasoning Agent',
    short: 'Reasoning',
    tagline: 'The Logic Engine',
    icon: Brain,
    gradient: 'from-rose-600 to-rose-500',
    description:
      'Breaks complex problems into logical steps and evaluates competing possibilities before reaching a conclusion.',
    capabilities: [
      'Multi-step reasoning',
      'Hypothesis testing',
      'Uncertainty analysis',
      'Decision frameworks',
    ],
    useCases: [
      'Strategy',
      'Risk assessment',
      'Decision making',
      'Data interpretation',
    ],
    stats: [
      ['3.1s', 'avg. speed'],
      ['97.5%', 'accuracy'],
      ['12+', 'reasoning steps'],
    ],
    example:
      'Compare two growth strategies and explain the trade-offs, risks, and likely outcomes.',
  },
  {
    id: 'web',
    name: 'Web Agent',
    short: 'Web',
    tagline: 'The Live Explorer',
    icon: Globe2,
    gradient: 'from-red-500 to-rose-500',
    description:
      'Connects Nexus to live web information so answers can reflect current news, data, products and trends.',
    capabilities: [
      'Live browsing',
      'News discovery',
      'Current data',
      'Trend analysis',
    ],
    useCases: [
      'Market research',
      'News monitoring',
      'Competitor tracking',
      'Trend spotting',
    ],
    stats: [
      ['1.2s', 'avg. speed'],
      ['96.8%', 'accuracy'],
      ['10K+', 'sources'],
    ],
    example:
      'Find the latest developments in a technology and compare announcements from major organizations.',
  },
  {
    id: 'pdf',
    name: 'PDF Agent',
    short: 'PDF',
    tagline: 'The Document Whisperer',
    icon: FileText,
    gradient: 'from-pink-500 to-rose-400',
    description:
      'Turns long documents into useful intelligence by extracting summaries, facts, tables and answers.',
    capabilities: [
      'PDF/DOCX parsing',
      'Executive summaries',
      'Table extraction',
      'Document Q&A',
    ],
    useCases: ['Reports', 'Contracts', 'Data extraction', 'Compliance'],
    stats: [
      ['4.5s', 'avg. speed'],
      ['98.1%', 'accuracy'],
      ['500+', 'pages'],
    ],
    example:
      'Upload a long report and extract revenue trends, risks, and important changes into a structured summary.',
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    short: 'Orchestrator',
    tagline: 'The Conductor',
    icon: Cpu,
    gradient: 'from-red-600 to-pink-500',
    description:
      'The central intelligence that decides which specialists should work, manages their collaboration, and synthesizes the result.',
    capabilities: [
      'Task routing',
      'Parallel execution',
      'Result synthesis',
      'Quality control',
    ],
    useCases: [
      'Complex questions',
      'Multi-agent workflows',
      'Conflict resolution',
      'Final synthesis',
    ],
    stats: [
      ['<1s', 'routing'],
      ['99.5%', 'accuracy'],
      ['6', 'agents'],
    ],
    example:
      'Give Nexus a complex task and let the Orchestrator decide which agents should collaborate.',
  },
];

const Hero = () => {
  const dark = useSelector((s) => s.toggle.darkMode);
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[150px]" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-600/8 blur-[120px]" />
        <div
          className={`absolute inset-0 ${
            dark
              ? 'bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)]'
              : 'bg-[linear-gradient(rgba(0,0,0,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.025)_1px,transparent_1px)]'
          } bg-[size:55px_55px]`}
        />
        <div
          className={`absolute inset-0 ${dark ? 'bg-[radial-gradient(circle_at_center,transparent_10%,#000_75%)]' : 'bg-[radial-gradient(circle_at_center,transparent_10%,#fff_75%)]'}`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-red-500">
          <Sparkles size={13} />
          The Nexus Agent Network
        </div>
        <h1
          className={`text-5xl font-black tracking-[-0.045em] sm:text-6xl md:text-7xl ${
            dark ? 'text-white' : 'text-zinc-950'
          }`}
        >
          Meet the minds
          <br />
          <GradientText>behind Nexus.</GradientText>
        </h1>
        <p
          className={`mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg ${
            dark ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          Six specialized agents. Six different strengths. One coordinated
          intelligence built to tackle questions that a single AI would struggle
          to solve alone.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {agents.map((agent, i) => (
            <span
              key={agent.id}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${
                dark
                  ? 'border-white/[0.07] bg-white/[0.03] text-zinc-500'
                  : 'border-black/[0.07] bg-black/[0.02] text-zinc-500'
              }`}
            >
              0{i + 1} · {agent.short}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const AgentShowcase = () => {
  const dark = useSelector((s) => s.toggle.darkMode);
  const [active, setActive] = useState(0);
  const agent = agents[active];
  const Icon = agent.icon;

  return (
    <section className="relative pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-500">
              Explore specialists
            </span>
            <h2
              className={`mt-2 text-2xl font-bold sm:text-3xl ${dark ? 'text-white' : 'text-zinc-950'}`}
            >
              Choose a mind. <GradientText>See what it can do.</GradientText>
            </h2>
          </div>
          <span className="hidden text-xs text-zinc-600 sm:block">01 / 06</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[290px_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible">
            {agents.map((item, i) => {
              const AIcon = item.icon;
              const selected = i === active;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(i)}
                  className={`group flex min-w-[175px] items-center gap-3 rounded-xl border p-3 text-left transition-all lg:w-full ${
                    selected
                      ? 'border-red-500/30 bg-red-500/[0.055] shadow-[0_0_30px_-15px_rgba(244,63,94,.8)]'
                      : dark
                        ? 'border-white/[0.06] bg-white/[0.025] hover:border-white/10'
                        : 'border-black/[0.06] bg-black/[0.02] hover:border-black/10'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white ${selected ? 'shadow-[0_8px_25px_-10px_rgba(244,63,94,.9)]' : ''}`}
                  >
                    <AIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`truncate text-sm font-bold ${selected ? 'text-red-500' : dark ? 'text-zinc-300' : 'text-zinc-700'}`}
                    >
                      {item.name}
                    </div>
                    <div className="truncate text-[10px] text-zinc-600">
                      {item.tagline}
                    </div>
                  </div>
                  <ChevronRight
                    size={15}
                    className={`ml-auto shrink-0 ${selected ? 'text-red-500' : 'text-zinc-700'}`}
                  />
                </button>
              );
            })}
          </div>

          <Glass active className="min-h-[500px] p-5 sm:p-7 md:p-9">
            <div className="flex flex-col gap-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.gradient} text-white shadow-[0_14px_35px_-15px_rgba(244,63,94,.8)]`}
                  >
                    <Icon size={25} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-xl font-bold sm:text-2xl ${dark ? 'text-white' : 'text-zinc-950'}`}
                      >
                        {agent.name}
                      </h3>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                        ONLINE
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500">
                      {agent.tagline}
                    </p>
                  </div>
                </div>
                <div className="hidden rounded-xl border border-white/[0.06] bg-black/10 px-3 py-2 text-right sm:block">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-600">
                    Specialist
                  </div>
                  <div className="font-mono text-sm font-bold text-red-500">
                    0{active + 1}
                  </div>
                </div>
              </div>

              <p
                className={`max-w-3xl text-sm leading-7 sm:text-base ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}
              >
                {agent.description}
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {agent.stats.map(([value, label]) => (
                  <div
                    key={label}
                    className={`rounded-xl border p-3 sm:p-4 ${
                      dark
                        ? 'border-white/[0.06] bg-white/[0.025]'
                        : 'border-black/[0.06] bg-black/[0.018]'
                    }`}
                  >
                    <div
                      className={`text-lg font-bold sm:text-2xl ${dark ? 'text-white' : 'text-zinc-950'}`}
                    >
                      {value}
                    </div>
                    <div className="mt-1 text-[9px] uppercase tracking-widest text-zinc-600 sm:text-[10px]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <div
                    className={`mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}
                  >
                    <Zap size={14} className="text-red-500" /> Capabilities
                  </div>
                  <ul className="space-y-3">
                    {agent.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className={`flex gap-3 text-sm ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-red-500"
                        />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div
                    className={`mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}
                  >
                    <Target size={14} className="text-pink-500" /> Perfect for
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agent.useCases.map((use) => (
                      <span
                        key={use}
                        className={`rounded-lg border px-3 py-1.5 text-xs ${
                          dark
                            ? 'border-white/[0.07] bg-white/[0.025] text-zinc-400'
                            : 'border-black/[0.07] bg-black/[0.02] text-zinc-600'
                        }`}
                      >
                        {use}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`mt-6 rounded-xl border p-4 ${
                      dark
                        ? 'border-white/[0.06] bg-black/20'
                        : 'border-black/[0.06] bg-black/[0.015]'
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                      <MessageSquare size={12} /> Example request
                    </div>
                    <p
                      className={`text-xs italic leading-6 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}
                    >
                      “{agent.example}”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Glass>
        </div>
      </div>
    </section>
  );
};

const Collaboration = () => {
  const dark = useSelector((s) => s.toggle.darkMode);
  const steps = [
    {
      n: '01',
      icon: BrainCircuit,
      title: 'Analyze',
      text: 'The Orchestrator understands the task and selects the right specialists.',
    },
    {
      n: '02',
      icon: Workflow,
      title: 'Collaborate',
      text: 'Agents work in parallel, each solving the part they are best at.',
    },
    {
      n: '03',
      icon: Layers,
      title: 'Synthesize',
      text: 'Results are compared, refined and combined into one response.',
    },
  ];

  return (
    <section
      className={`border-y py-24 sm:py-32 ${dark ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-500">
            Behind the scenes
          </span>
          <h2
            className={`mt-3 text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-zinc-950'}`}
          >
            Six agents. <GradientText>One coordinated answer.</GradientText>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="relative">
                {i < 2 && (
                  <div className="absolute left-[70%] top-9 hidden w-[65%] border-t border-dashed border-red-500/20 md:block" />
                )}
                <Glass className="relative p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06]">
                      <Icon size={21} className="text-red-500" />
                    </div>
                    <span className="font-mono text-xs text-zinc-600">
                      {step.n}
                    </span>
                  </div>
                  <h3
                    className={`mt-6 font-bold ${dark ? 'text-white' : 'text-zinc-950'}`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-6 ${dark ? 'text-zinc-500' : 'text-zinc-600'}`}
                  >
                    {step.text}
                  </p>
                </Glass>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-12 rounded-2xl border p-5 sm:p-6 ${
            dark
              ? 'border-white/[0.06] bg-white/[0.02]'
              : 'border-black/[0.06] bg-black/[0.015]'
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {agents.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <React.Fragment key={agent.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${agent.gradient} text-white`}
                    >
                      <Icon size={15} />
                    </div>
                    <span className="text-[10px] font-medium text-zinc-500 sm:text-xs">
                      {agent.short}
                    </span>
                  </div>
                  {i < agents.length - 1 && (
                    <ArrowRight size={13} className="text-red-500/40" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const BottomCTA = () => {
  const navigate = useNavigate();
  const dark = useSelector((s) => s.toggle.darkMode);

  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[130px]" />
      <div className="relative mx-auto max-w-4xl">
        <Glass
          active
          className="overflow-hidden p-8 text-center sm:p-14 md:p-20"
        >
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 text-white shadow-[0_12px_35px_-12px_rgba(244,63,94,.8)]">
            <Sparkles size={22} />
          </div>
          <h2
            className={`mt-6 text-3xl font-bold tracking-tight sm:text-5xl ${dark ? 'text-white' : 'text-zinc-950'}`}
          >
            Your AI team is
            <br />
            <GradientText>ready to work.</GradientText>
          </h2>
          <p
            className={`mx-auto mt-5 max-w-xl text-sm leading-7 sm:text-base ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}
          >
            Ask one agent directly, or let the Orchestrator assemble the perfect
            team for your problem.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={() => navigate('/chat')}
              icon={ArrowRight}
              className="sm:px-7"
            >
              Start Chatting
            </Button>
            <Button
              primary={false}
              onClick={() => navigate('/documentation')}
              icon={ChevronRight}
              className="sm:px-7"
            >
              View Documentation
            </Button>
          </div>
        </Glass>
      </div>
    </section>
  );
};

const Footer = () => {
  const dark = useSelector((s) => s.toggle.darkMode);
  return (
    <footer
      className={`border-t ${dark ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2.5">
          <div
            className={`
                                      relative w-9 h-9 rounded-lg
                                      bg-gradient-to-br ${dark ? 'from-zinc-950 via-black to-red-950/40' : 'from-zinc-100 via-white to-red-100'}
                                      border border-red-500/25
                                      flex items-center justify-center
                                      shadow-[0_0_18px_-6px_rgba(244,63,94,0.6)]
                                      group-hover:border-pink-500/50
                                      group-hover:shadow-[0_0_28px_-5px_rgba(236,72,153,0.7)]
                                      transition-all duration-300
                                    `}
          >
            <NexusLogo size={20} />
          </div>
          <span
            className={`font-bold ${dark ? 'text-white' : 'text-zinc-950'}`}
          >
            Nexus<span className="text-red-500">AI</span>
          </span>
        </div>
        <div className="flex gap-6 text-xs text-zinc-500">
          <button>Privacy</button>
          <button>Terms</button>
          <button>Contact</button>
        </div>
        <p className="text-xs text-zinc-600">
          © 2026 Nexus AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default function NexusAIAgents() {
  const dark = useSelector((s) => s.toggle.darkMode);

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        dark ? 'bg-black text-white' : 'bg-white text-zinc-950'
      }`}
    >
      <Navbar />
      <main>
        <Hero />
        <AgentShowcase />
        <Collaboration />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}
