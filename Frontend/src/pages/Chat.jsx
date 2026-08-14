import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowUp,
  Brain,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Code2,
  Copy,
  FileCode2,
  FileText,
  Globe,
  Image,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Moon,
  Paperclip,
  Plus,
  RefreshCcw,
  Search,
  Send,
  Settings2,
  Sparkles,
  Square,
  Sun,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Upload,
  User,
  Users,
  X,
  Zap,
  ExternalLink,
  PanelRight,
  PanelLeftClose,
  SlidersHorizontal,
} from 'lucide-react';

import { NexusLogo } from '../components/Nexus_Logo';
import { toggleDarkMode } from '../features/Toggle/Toggle_slice';

/* ─────────────────────────────────────────────────────────────
   THEME
───────────────────────────────────────────────────────────── */

const getTheme = (dark) => ({
  dark,

  pageBg: dark ? 'bg-black' : 'bg-zinc-50',
  pageText: dark ? 'text-white' : 'text-zinc-900',

  sidebarBg: dark ? 'bg-[#050505]' : 'bg-white',
  panelBg: dark ? 'bg-[#070707]/95' : 'bg-white/95',
  dropdownBg: dark ? 'bg-[#0b0b0b]/95' : 'bg-white/95',
  inputBg: dark ? 'bg-[#0a0a0a]' : 'bg-white',
  promptBg: dark ? 'bg-[#090909]' : 'bg-white',
  headerBg: dark ? 'bg-black/70' : 'bg-white/80',

  border: dark ? 'border-white/[0.06]' : 'border-zinc-200',
  borderStrong: dark ? 'border-white/[0.08]' : 'border-zinc-300',
  borderSubtle: dark ? 'border-white/[0.05]' : 'border-zinc-100',

  text: dark ? 'text-white' : 'text-zinc-900',
  text200: dark ? 'text-zinc-200' : 'text-zinc-800',
  text300: dark ? 'text-zinc-300' : 'text-zinc-600',
  text400: dark ? 'text-zinc-400' : 'text-zinc-600',
  text500: dark ? 'text-zinc-500' : 'text-zinc-500',
  text600: dark ? 'text-zinc-600' : 'text-zinc-400',
  text700: dark ? 'text-zinc-700' : 'text-zinc-400',

  surface: dark ? 'bg-white/[0.03]' : 'bg-black/[0.03]',
  surface2: dark ? 'bg-white/[0.025]' : 'bg-black/[0.025]',
  surfaceHover: dark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.04]',
  surfaceHover2: dark ? 'hover:bg-white/[0.05]' : 'hover:bg-black/[0.05]',
  surfaceHover3: dark ? 'hover:bg-white/[0.06]' : 'hover:bg-black/[0.06]',
  surfaceHover7: dark ? 'hover:bg-white/[0.07]' : 'hover:bg-black/[0.07]',

  iconBtnBg: dark ? 'bg-white/[0.03]' : 'bg-black/[0.03]',
  iconBtnBorder: dark ? 'border-white/[0.06]' : 'border-black/[0.08]',
  iconBtnHoverBorder: dark ? 'hover:border-white/10' : 'hover:border-black/15',

  activeItemBg: dark ? 'bg-white/[0.06]' : 'bg-black/[0.05]',
  activeItemBorder: dark ? 'border-white/[0.07]' : 'border-black/[0.08]',

  backdrop: dark ? 'bg-black/60' : 'bg-black/20',
  toggleOff: dark ? 'bg-white/[0.12]' : 'bg-black/[0.14]',
  placeholder: dark ? 'placeholder:text-zinc-600' : 'placeholder:text-zinc-400',

  gridLine: dark
    ? 'bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] opacity-[0.018]'
    : 'bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] opacity-[0.025]',
});

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const agents = [
  {
    id: 'orchestrator',
    name: 'Nexus Orchestrator',
    description: 'Coordinates your AI team',
    icon: Sparkles,
    gradient: 'from-red-600 to-pink-600',
  },
  {
    id: 'research',
    name: 'Research Agent',
    description: 'Research & fact finding',
    icon: Search,
    gradient: 'from-red-600 to-red-500',
  },
  {
    id: 'coding',
    name: 'Coding Agent',
    description: 'Code, debug & review',
    icon: Code2,
    gradient: 'from-pink-600 to-pink-500',
  },
  {
    id: 'reasoning',
    name: 'Reasoning Agent',
    description: 'Complex problem solving',
    icon: Brain,
    gradient: 'from-rose-600 to-rose-500',
  },
  {
    id: 'web',
    name: 'Web Agent',
    description: 'Live web research',
    icon: Globe,
    gradient: 'from-red-500 to-rose-500',
  },
  {
    id: 'pdf',
    name: 'PDF Agent',
    description: 'Analyze documents',
    icon: FileText,
    gradient: 'from-pink-500 to-rose-400',
  },
];

const conversations = [
  {
    id: 1,
    title: 'Build a MERN authentication system',
    time: '2m ago',
  },
  {
    id: 2,
    title: 'Explain LangGraph multi-agent systems',
    time: '1h ago',
  },
  {
    id: 3,
    title: 'Research latest AI agent frameworks',
    time: 'Yesterday',
  },
  {
    id: 4,
    title: 'Optimize MongoDB geo queries',
    time: 'Yesterday',
  },
  {
    id: 5,
    title: 'Create my internship roadmap',
    time: '2 days ago',
  },
];

/* ─────────────────────────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────────────────────────── */

const IconButton = ({
  children,
  className = '',
  title,
  onClick,
  active = false,
  theme,
}) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`
        relative flex items-center justify-center
        w-9 h-9 rounded-xl
        border transition-all duration-200
        ${
          active
            ? 'bg-red-500/10 border-red-500/30 text-red-400'
            : `${theme.iconBtnBg} ${theme.iconBtnBorder} ${theme.text600} hover:${theme.dark ? 'text-white' : 'text-zinc-900'} ${theme.surfaceHover7} ${theme.iconBtnHoverBorder}`
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const GlassButton = ({ children, onClick, className = '', active = false, theme }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2
        rounded-xl border text-xs font-medium
        transition-all duration-200
        ${
          active
            ? 'bg-red-500/10 border-red-500/30 text-red-400'
            : `${theme.iconBtnBg} ${theme.iconBtnBorder} ${theme.text400} hover:${theme.dark ? 'text-white' : 'text-zinc-900'} ${theme.surfaceHover3}`
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────────────────────── */

function Sidebar({
  collapsed,
  setCollapsed,
  activeConversation,
  setActiveConversation,
  setHasStartedChat,
  setSidebarOpen,
  navigate,
  theme,
}) {
  const isRail = collapsed;
  const [accountMenu, setAccountMenu] = useState(false);

  return (
    <aside
      className={`
        h-screen
        ${theme.sidebarBg}
        border-r ${theme.border}
        flex flex-col
        transition-all duration-300
        ${isRail ? 'w-[76px]' : 'w-[260px] sm:w-[280px] lg:w-[285px]'}
        overflow-hidden
      `}
    >
      <div
        className={`h-full flex flex-col ${
          isRail ? 'w-[76px]' : 'w-[260px] sm:w-[280px] lg:w-[285px]'
        }`}
      >
        {/* Logo */}
        <div
          className={`h-[64px] md:h-[72px] flex items-center border-b ${theme.borderSubtle} ${
            isRail ? 'justify-center px-2' : 'justify-between px-4 md:px-5'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              onClick={() => navigate('/')}
              className={`
                hover:cursor-pointer
                shrink-0
                w-9 h-9 rounded-xl
                bg-gradient-to-br ${theme.dark ? 'from-zinc-950 via-black to-red-950/50' : 'from-zinc-100 via-white to-red-100'}
                border border-red-500/25
                flex items-center justify-center
                shadow-[0_0_20px_-5px_rgba(244,63,94,0.5)]
              `}
            >
              <NexusLogo size={25} />
            </div>

            {!isRail && (
              <span className={`text-lg font-bold ${theme.text} tracking-tight truncate`}>
                Nexus<span className="text-red-500">AI</span>
              </span>
            )}
          </div>

          {!isRail && (
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden shrink-0 ${theme.text600} hover:${theme.dark ? 'text-white' : 'text-zinc-900'}`}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* New Chat */}
        <div className={`p-3 md:p-4 ${isRail ? 'flex justify-center' : ''}`}>
          <button
            onClick={() => {
              setActiveConversation(null);
              setHasStartedChat(false);
            }}
            title="New conversation"
            className={`
              flex items-center justify-center gap-2
              rounded-xl
              bg-gradient-to-r from-red-600 to-pink-600
              text-white text-sm font-semibold
              shadow-[0_0_25px_-7px_rgba(220,38,38,0.65)]
              hover:shadow-[0_0_35px_-5px_rgba(220,38,38,0.8)]
              hover:scale-[1.01]
              transition-all
              ${isRail ? 'w-11 h-11' : 'w-full px-4 py-3'}
            `}
          >
            <Plus size={17} />
            {!isRail && 'New conversation'}
          </button>
        </div>

        {/* Navigation */}
        <div className={`mb-4 ${isRail ? 'px-2' : 'px-3'}`}>
          <button
            title="All conversations"
            className={`w-full flex items-center gap-3 py-2.5 rounded-xl ${theme.text400} hover:${theme.dark ? 'text-white' : 'text-zinc-900'} ${theme.surfaceHover} text-sm ${
              isRail ? 'justify-center px-0' : 'px-3'
            }`}
          >
            <MessageSquare size={17} className="shrink-0" />
            {!isRail && 'All conversations'}
          </button>

          <button
            title="Explore agents"
            onClick={() => navigate('/agents')}
            className={`w-full flex items-center gap-3 py-2.5 rounded-xl ${theme.text400} hover:${theme.dark ? 'text-white' : 'text-zinc-900'} ${theme.surfaceHover} text-sm ${
              isRail ? 'justify-center px-0' : 'px-3'
            }`}
          >
            <LayoutDashboard size={17} className="shrink-0" />
            {!isRail && 'Explore agents'}
          </button>
        </div>

        {/* Conversations */}
        {!isRail && (
          <div className="flex-1 overflow-y-auto px-3">
            <div className={`px-3 mb-2 text-[10px] uppercase tracking-[0.18em] ${theme.text700} font-semibold`}>
              Recent
            </div>

            <div className="space-y-1">
              {conversations.map((conversation) => {
                const active = activeConversation === conversation.id;

                return (
                  <button
                    key={conversation.id}
                    onClick={() => setActiveConversation(conversation.id)}
                    className={`
                      group w-full text-left px-3 py-3 rounded-xl
                      transition-all duration-200
                      ${
                        active
                          ? `${theme.activeItemBg} border ${theme.activeItemBorder}`
                          : `border border-transparent ${theme.dark ? 'hover:bg-white/[0.035]' : 'hover:bg-black/[0.035]'}`
                      }
                    `}
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare
                        size={15}
                        className={`mt-0.5 shrink-0 ${
                          active ? 'text-red-400' : theme.text600
                        }`}
                      />

                      <div className="min-w-0">
                        <p
                          className={`text-sm truncate ${
                            active ? theme.text200 : theme.text400
                          }`}
                        >
                          {conversation.title}
                        </p>

                        <p className={`text-[11px] ${theme.text700} mt-1`}>
                          {conversation.time}
                        </p>
                      </div>

                      <MoreHorizontal
                        size={15}
                        className={`ml-auto opacity-0 group-hover:opacity-100 ${theme.text600} shrink-0`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isRail && <div className="flex-1" />}

        {/* Collapse toggle (desktop/tablet only) */}
        <div className={`hidden lg:flex p-3 border-t ${theme.borderSubtle} ${isRail ? 'justify-center' : 'justify-end'}`}>
          <IconButton
            theme={theme}
            title={isRail ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed(!isRail)}
          >
            <PanelLeftClose
              size={16}
              className={`transition-transform ${isRail ? 'rotate-180' : ''}`}
            />
          </IconButton>
        </div>

        {/* User / Account */}
        <div className={`relative p-3 border-t ${theme.borderSubtle} ${isRail ? 'lg:border-t-0' : ''}`}>
          <div
            className={`flex items-center gap-3 p-2 md:p-3 rounded-xl ${theme.surfaceHover} ${
              isRail ? 'justify-center' : ''
            }`}
            title="Varun"
          >
            <button
              onClick={() => navigate('/profile')}
              className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center hover:scale-105 transition"
              title="Profile"
            >
              <User size={17} className="text-white" />
            </button>

            {!isRail && (
              <>
                <button
                  onClick={() => navigate('/profile')}
                  className="min-w-0 flex-1 text-left"
                  title="Profile"
                >
                  <p className={`text-sm ${theme.text} truncate`}>Varun</p>
                  <p className={`text-[11px] ${theme.text600}`}>Free plan</p>
                </button>

                <button
                  onClick={() => setAccountMenu(!accountMenu)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme.text600} hover:${theme.dark ? 'text-white' : 'text-zinc-900'} ${theme.surfaceHover3} transition`}
                  title="Account settings"
                >
                  <Settings2 size={17} />
                </button>
              </>
            )}
          </div>

          {accountMenu && !isRail && (
            <>
              <div
                onClick={() => setAccountMenu(false)}
                className="fixed inset-0 z-40"
              />
              <div className={`absolute bottom-[72px] right-3 left-3 z-50 rounded-2xl border ${theme.borderStrong} ${theme.dropdownBg} backdrop-blur-2xl shadow-2xl p-2`}>
                <button
                  onClick={() => {
                    setAccountMenu(false);
                    navigate('/profile');
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${theme.surfaceHover2} transition`}
                >
                  <User size={16} className={theme.text400} />
                  <div>
                    <p className={`text-xs ${theme.text200}`}>Profile</p>
                    <p className={`text-[10px] ${theme.text600} mt-0.5`}>Manage your account</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setAccountMenu(false);
                    navigate('/settings');
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${theme.surfaceHover2} transition`}
                >
                  <Settings2 size={16} className={theme.text400} />
                  <div>
                    <p className={`text-xs ${theme.text200}`}>Settings</p>
                    <p className={`text-[10px] ${theme.text600} mt-0.5`}>Workspace preferences</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setAccountMenu(false);
                    navigate('/pricing');
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${theme.surfaceHover2} transition`}
                >
                  <Zap size={16} className="text-red-400" />
                  <div>
                    <p className={`text-xs ${theme.text200}`}>Billing & plan</p>
                    <p className={`text-[10px] ${theme.text600} mt-0.5`}>Manage your subscription</p>
                  </div>
                </button>

                <div className={`my-1 border-t ${theme.borderSubtle}`} />

                <button
                  onClick={() => setAccountMenu(false)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-red-500/[0.05] transition"
                >
                  <X size={16} className="text-red-400" />
                  <div>
                    <p className="text-xs text-red-300">Sign out</p>
                    <p className={`text-[10px] ${theme.text600} mt-0.5`}>End this session</p>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOP BAR
───────────────────────────────────────────────────────────── */

function TopBar({
  activeAgent,
  setActiveAgent,
  setSidebarOpen,
  setRightPanel,
  setAiControls,
  theme,
  darkMode,
  onToggleTheme,
}) {
  const [agentMenu, setAgentMenu] = useState(false);

  const current = agents.find((a) => a.id === activeAgent) || agents[0];

  const AgentIcon = current.icon;

  return (
    <header
      className={`
        h-[64px] md:h-[72px] shrink-0
        border-b ${theme.border}
        ${theme.headerBg} backdrop-blur-2xl
        flex items-center justify-between
        px-3 sm:px-4 md:px-6
        relative z-30
      `}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile / tablet menu */}
        <IconButton theme={theme} className="lg:hidden shrink-0" onClick={() => setSidebarOpen(true)}>
          <Menu size={18} />
        </IconButton>

        {/* Agent selector */}
        <div className="relative min-w-0">
          <button
            onClick={() => setAgentMenu(!agentMenu)}
            className={`
              flex items-center gap-2 sm:gap-3
              px-1 sm:px-2 py-1.5 rounded-xl
              ${theme.surfaceHover}
              transition
              min-w-0
            `}
          >
            <div
              className={`
                shrink-0
                w-8 h-8 sm:w-9 sm:h-9 rounded-xl
                bg-gradient-to-br ${current.gradient}
                flex items-center justify-center
                shadow-[0_0_20px_-8px_rgba(244,63,94,0.8)]
              `}
            >
              <AgentIcon size={16} className="text-white sm:hidden" />
              <AgentIcon size={18} className="text-white hidden sm:block" />
            </div>

            <div className="hidden xs:block sm:block text-left min-w-0">
              <p className={`text-sm font-semibold ${theme.text} truncate max-w-[140px] md:max-w-none`}>
                {current.name}
              </p>
              <p className={`text-[11px] ${theme.text600} hidden md:block truncate`}>
                {current.description}
              </p>
            </div>

            <ChevronDown size={16} className={`${theme.text600} ml-1 shrink-0`} />
          </button>

          {agentMenu && (
            <>
              <div
                onClick={() => setAgentMenu(false)}
                className="fixed inset-0 z-40"
              />
              <div
                className={`
                  absolute top-12 sm:top-14 left-0
                  w-[280px] max-w-[88vw]
                  rounded-2xl
                  border ${theme.borderStrong}
                  ${theme.dropdownBg}
                  backdrop-blur-2xl
                  shadow-2xl
                  p-2
                  z-50
                  max-h-[70vh] overflow-y-auto
                `}
              >
                <div className={`px-3 py-2 text-[10px] uppercase tracking-widest ${theme.text600}`}>
                  Select agent
                </div>

                {agents.map((agent) => {
                  const Icon = agent.icon;

                  return (
                    <button
                      key={agent.id}
                      onClick={() => {
                        setActiveAgent(agent.id);
                        setAgentMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl ${theme.surfaceHover2} text-left`}
                    >
                      <div
                        className={`
                          shrink-0
                          w-9 h-9 rounded-lg
                          bg-gradient-to-br ${agent.gradient}
                          flex items-center justify-center
                        `}
                      >
                        <Icon size={16} className="text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${theme.text200} truncate`}>{agent.name}</p>
                        <p className={`text-[11px] ${theme.text600} truncate`}>
                          {agent.description}
                        </p>
                      </div>

                      {activeAgent === agent.id && (
                        <Check size={15} className="text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <div className="hidden xl:flex items-center gap-1 mr-2">
          <GlassButton theme={theme} active>
            <Zap size={13} />
            Fast
          </GlassButton>

          <GlassButton theme={theme}>
            <Brain size={13} />
            Reason
          </GlassButton>
        </div>

        <IconButton
          theme={theme}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={onToggleTheme}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </IconButton>

        <IconButton theme={theme} title="Agent activity" onClick={() => setRightPanel(true)}>
          <PanelRight size={17} />
        </IconButton>

        <IconButton
          theme={theme}
          title="AI Controls"
          onClick={() => setAiControls(true)}
          className="hidden sm:flex"
        >
          <SlidersHorizontal size={17} />
        </IconButton>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   AI CONTROLS PANEL
───────────────────────────────────────────────────────────── */

function AIControlsPanel({ open, setOpen, theme }) {
  const [webEnabled, setWebEnabled] = useState(true);
  const [reasoningEnabled, setReasoningEnabled] = useState(false);
  const [autoAgents, setAutoAgents] = useState(true);

  if (!open) return null;

  const Toggle = ({ enabled, onClick }) => (
    <button
      onClick={onClick}
      className={`w-10 h-6 rounded-full p-1 transition ${
        enabled ? 'bg-red-500' : theme.toggleOff
      }`}
    >
      <span
        className={`block w-4 h-4 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 ${theme.backdrop} backdrop-blur-sm`}
      />

      <aside className={`fixed right-0 top-0 bottom-0 z-50 w-[88vw] max-w-[360px] ${theme.panelBg} backdrop-blur-2xl border-l ${theme.border} shadow-[-20px_0_60px_-30px_rgba(244,63,94,0.45)]`}>
        <div className="h-full flex flex-col">
          <div className={`h-16 px-4 sm:px-5 flex items-center justify-between border-b ${theme.borderSubtle}`}>
            <div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-red-400" />
                <h3 className={`text-sm font-semibold ${theme.text}`}>AI Controls</h3>
              </div>
              <p className={`text-[11px] ${theme.text600} mt-1`}>Customize how Nexus works</p>
            </div>
            <IconButton theme={theme} onClick={() => setOpen(false)}>
              <X size={16} />
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <p className={`text-[10px] uppercase tracking-[0.18em] ${theme.text600} font-semibold mb-2`}>
              Response mode
            </p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <button className="p-3 rounded-xl border border-red-500/25 bg-red-500/10 text-left">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-red-400" />
                  <span className="text-xs font-medium text-red-300">Fast</span>
                </div>
                <p className={`text-[10px] ${theme.text600} mt-1`}>Quick responses</p>
              </button>

              <button
                onClick={() => setReasoningEnabled(!reasoningEnabled)}
                className={`p-3 rounded-xl border text-left transition ${
                  reasoningEnabled
                    ? 'border-pink-500/25 bg-pink-500/10'
                    : `${theme.border} ${theme.surface2} ${theme.surfaceHover2}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <Brain size={14} className={reasoningEnabled ? 'text-pink-400' : theme.text500} />
                  <span className={`text-xs font-medium ${reasoningEnabled ? 'text-pink-300' : theme.text300}`}>
                    Reason
                  </span>
                </div>
                <p className={`text-[10px] ${theme.text600} mt-1`}>Deeper analysis</p>
              </button>
            </div>

            <p className={`text-[10px] uppercase tracking-[0.18em] ${theme.text600} font-semibold mb-2`}>
              Capabilities
            </p>

            <div className="space-y-2.5">
              <div className={`flex items-center gap-3 p-3.5 rounded-2xl border ${theme.border} ${theme.surface2}`}>
                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center">
                  <Globe size={15} className="text-red-400" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme.text200}`}>Web search</p>
                  <p className={`text-[11px] ${theme.text600} mt-1`}>Use live web information</p>
                </div>
                <Toggle enabled={webEnabled} onClick={() => setWebEnabled(!webEnabled)} />
              </div>

              <div className={`flex items-center gap-3 p-3.5 rounded-2xl border ${theme.border} ${theme.surface2}`}>
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/10 flex items-center justify-center">
                  <Brain size={15} className="text-pink-400" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme.text200}`}>Deep reasoning</p>
                  <p className={`text-[11px] ${theme.text600} mt-1`}>Spend more time solving complex tasks</p>
                </div>
                <Toggle enabled={reasoningEnabled} onClick={() => setReasoningEnabled(!reasoningEnabled)} />
              </div>

              <div className={`flex items-center gap-3 p-3.5 rounded-2xl border ${theme.border} ${theme.surface2}`}>
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/10 flex items-center justify-center">
                  <Sparkles size={15} className="text-rose-400" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme.text200}`}>Auto-select agents</p>
                  <p className={`text-[11px] ${theme.text600} mt-1`}>Let Nexus choose the right specialists</p>
                </div>
                <Toggle enabled={autoAgents} onClick={() => setAutoAgents(!autoAgents)} />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-red-500/10 bg-red-500/[0.035] p-4">
              <div className="flex gap-3">
                <Sparkles size={15} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className={`text-xs font-medium ${theme.text300}`}>Nexus orchestration</p>
                  <p className={`text-[11px] leading-5 ${theme.text600} mt-1`}>
                    Nexus can combine Research, Coding, Reasoning, Web and PDF agents automatically based on your request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function AgentPanel({ open, setOpen, theme }) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop (mobile & tablet only) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 ${theme.backdrop} backdrop-blur-sm lg:hidden`}
      />

      <aside
        className={`
          fixed lg:absolute
          right-0 top-0 lg:top-[72px]
          bottom-0 z-40
          w-[86vw] max-w-[330px] sm:w-[330px]
          ${theme.panelBg} backdrop-blur-2xl
          border-l ${theme.border}
          shadow-[-20px_0_50px_-30px_rgba(244,63,94,0.4)]
        `}
      >
        <div className="h-full flex flex-col">
          <div className={`h-16 px-4 sm:px-5 flex items-center justify-between border-b ${theme.borderSubtle}`}>
            <div>
              <h3 className={`text-sm font-semibold ${theme.text}`}>Agent activity</h3>
              <p className={`text-[11px] ${theme.text600}`}>Live orchestration</p>
            </div>

            <IconButton theme={theme} onClick={() => setOpen(false)}>
              <X size={16} />
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="relative">
              <div className="absolute left-[17px] top-5 bottom-5 w-px bg-gradient-to-b from-red-500/50 via-pink-500/20 to-transparent" />

              {[
                {
                  icon: Sparkles,
                  name: 'Orchestrator',
                  text: 'Understanding your request',
                  status: 'Complete',
                },
                {
                  icon: Search,
                  name: 'Research Agent',
                  text: 'Searching relevant sources',
                  status: 'Complete',
                },
                {
                  icon: Code2,
                  name: 'Coding Agent',
                  text: 'Designing implementation',
                  status: 'Working',
                },
                {
                  icon: Brain,
                  name: 'Reasoning Agent',
                  text: 'Validating solution',
                  status: 'Waiting',
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={index} className="relative flex gap-3 pb-7">
                    <div
                      className={`
                        relative z-10
                        w-9 h-9 rounded-xl
                        flex items-center justify-center
                        border shrink-0
                        ${
                          item.status === 'Complete'
                            ? 'bg-red-500/10 border-red-500/20 text-red-400'
                            : item.status === 'Working'
                              ? 'bg-pink-500/10 border-pink-500/20 text-pink-400'
                              : `${theme.surface} ${theme.border} ${theme.text600}`
                        }
                      `}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="pt-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm ${theme.text200}`}>{item.name}</p>

                        {item.status === 'Working' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                        )}
                      </div>

                      <p className={`text-xs ${theme.text600} mt-1`}>{item.text}</p>

                      <span
                        className={`
                          inline-block mt-2 text-[10px]
                          ${
                            item.status === 'Complete'
                              ? 'text-red-400'
                              : item.status === 'Working'
                                ? 'text-pink-400'
                                : theme.text700
                          }
                        `}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className={`rounded-xl border ${theme.borderSubtle} ${theme.surface2} p-3`}>
                <p className={`text-[10px] ${theme.text600}`}>Agents used</p>
                <p className={`text-lg font-semibold ${theme.text} mt-1`}>3</p>
              </div>

              <div className={`rounded-xl border ${theme.borderSubtle} ${theme.surface2} p-3`}>
                <p className={`text-[10px] ${theme.text600}`}>Time</p>
                <p className={`text-lg font-semibold ${theme.text} mt-1`}>2.4s</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────────────────────── */

function EmptyState({ onSend, theme }) {
  const suggestions = [
    {
      icon: Search,
      title: 'Research',
      description: 'Find, compare and summarize information',
    },
    {
      icon: Code2,
      title: 'Build',
      description: 'Write, debug and review your code',
    },
    {
      icon: Brain,
      title: 'Reason',
      description: 'Solve complex problems step by step',
    },
    {
      icon: FileText,
      title: 'Analyze',
      description: 'Extract insights from documents',
    },
  ];

  const [prompt, setPrompt] = useState('');

  const submit = () => {
    if (!prompt.trim()) return;
    onSend(prompt);
    setPrompt('');
  };

  const useSuggestion = (title) => {
    const prompts = {
      Research: 'Research the latest AI agent frameworks and compare them.',
      Build: 'Help me build a MERN authentication system.',
      Reason: 'Explain how multi-agent AI systems work step by step.',
      Analyze: 'Explain how Nexus AI could analyze a PDF and extract insights.',
    };

    setPrompt(prompts[title] || '');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Nexus mark */}
      <div className="flex justify-center mb-5 sm:mb-7">
        <div className="relative">
          <div className="absolute inset-0 rounded-[28px] bg-red-500/20 blur-3xl" />

          <div
            className={`
              relative w-[68px] h-[68px] sm:w-[88px] sm:h-[88px] rounded-[22px] sm:rounded-[28px]
              bg-gradient-to-br ${theme.dark ? 'from-zinc-950 via-black to-red-950/70' : 'from-zinc-100 via-white to-red-100'}
              border border-red-500/30
              flex items-center justify-center
              shadow-[0_0_65px_-12px_rgba(244,63,94,0.9)]
              ring-1 ring-pink-500/10
            `}
          >
            <div className="absolute inset-2 rounded-[16px] sm:rounded-[22px] bg-gradient-to-br from-red-600/20 to-pink-600/10" />

            <NexusLogo size={50} className="relative z-10 text-white hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Nexus branding */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <span className={`text-sm font-semibold tracking-wide ${theme.text300}`}>
          Nexus<span className="text-red-500">AI</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-red-500/70" />
        <span className={`text-[10px] uppercase tracking-[0.2em] ${theme.text600}`}>
          AI Workspace
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-7 sm:mb-9 px-2">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${theme.text} leading-tight`}>
          What can{' '}
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
            Nexus
          </span>{' '}
          help you with?
        </h1>

        <p className={`mt-3 text-sm md:text-base ${theme.text500}`}>
          Your AI team is ready to research, reason, code, browse and analyze.
        </p>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-7">
        {suggestions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => useSuggestion(item.title)}
              className={`
                group text-left p-3 sm:p-4 rounded-2xl
                border ${theme.border}
                ${theme.surface2}
                ${theme.surfaceHover3}
                hover:border-red-500/20
                transition-all duration-300
              `}
            >
              <div
                className="
                  w-8 h-8 sm:w-9 sm:h-9 rounded-xl mb-2.5 sm:mb-3
                  bg-gradient-to-br from-red-500/15 to-pink-500/10
                  border border-red-500/10
                  flex items-center justify-center text-red-400
                  group-hover:scale-105 transition-transform
                "
              >
                <Icon size={16} className="sm:hidden" />
                <Icon size={17} className="hidden sm:block" />
              </div>

              <p className={`text-sm font-medium ${theme.text200}`}>{item.title}</p>

              <p className={`text-[11px] leading-4 ${theme.text600} mt-1 hidden sm:block`}>
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main prompt */}
      <div
        className={`
          rounded-2xl border ${theme.borderStrong}
          ${theme.promptBg}
          shadow-[0_25px_80px_-35px_rgba(244,63,94,0.35)]
          focus-within:border-red-500/30
          transition-all duration-300
        `}
      >
        <textarea
          rows={3}
          value={prompt}
          placeholder="Ask Nexus anything..."
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && prompt.trim()) {
              e.preventDefault();
              submit();
            }
          }}
          className={`
            w-full resize-none bg-transparent outline-none
            px-4 sm:px-5 pt-4 sm:pt-5 text-sm ${theme.text200}
            ${theme.placeholder}
          `}
        />

        <div className="flex items-center justify-between px-2.5 sm:px-3 pb-2.5 sm:pb-3 pt-3 gap-2">
          <div className="flex items-center gap-1 min-w-0 overflow-x-auto">
            <button
              className={`
                shrink-0
                w-8 h-8 rounded-lg flex items-center justify-center
                ${theme.text600} hover:${theme.text300} ${theme.surfaceHover2} transition
              `}
            >
              <Paperclip size={16} />
            </button>

            <button
              className={`
                shrink-0
                flex items-center gap-1.5 px-2.5 h-8 rounded-lg
                text-[11px] ${theme.text600}
                hover:${theme.text300} ${theme.surfaceHover2} transition
              `}
            >
              <Globe size={13} />
              Web
            </button>

            <button
              className={`
                shrink-0
                hidden xs:flex sm:flex items-center gap-1.5 px-2.5 h-8 rounded-lg
                text-[11px] ${theme.text600}
                hover:${theme.text300} ${theme.surfaceHover2} transition
              `}
            >
              <Brain size={13} />
              Reason
            </button>
          </div>

          <button
            onClick={submit}
            disabled={!prompt.trim()}
            className="
              shrink-0
              w-9 h-9 rounded-xl
              bg-gradient-to-r from-red-600 to-pink-600
              flex items-center justify-center text-white
              shadow-[0_0_25px_-8px_rgba(244,63,94,0.8)]
              disabled:opacity-30 disabled:cursor-not-allowed
              hover:scale-105 transition
            "
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 px-2 text-center">
        <Sparkles size={11} className="text-red-500/50 shrink-0" />
        <span className={`text-[10px] ${theme.text700}`}>
          Nexus automatically selects the right agents for your task
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHAT INPUT
───────────────────────────────────────────────────────────── */

function ChatInput({ onSend, theme }) {
  const [message, setMessage] = useState('');
  const [webEnabled, setWebEnabled] = useState(false);
  const [reasoningEnabled, setReasoningEnabled] = useState(false);
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180,
      )}px`;
    }
  };

  const submit = () => {
    if (!message.trim()) return;

    onSend(message, {
      webEnabled,
      reasoningEnabled,
    });

    setMessage('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-5 pt-2">
      <div className="max-w-4xl mx-auto">
        <div
          className={`
            relative rounded-2xl
            border ${theme.borderStrong}
            ${theme.inputBg}
            shadow-[0_20px_60px_-25px_rgba(0,0,0,0.9)]
            focus-within:border-red-500/30
            focus-within:shadow-[0_20px_70px_-25px_rgba(220,38,38,0.18)]
            transition-all
          `}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask Nexus anything..."
            className={`
              w-full resize-none bg-transparent outline-none
              text-sm ${theme.text200}
              ${theme.placeholder}
              px-4 sm:px-5 pt-4 sm:pt-5 pb-14
              max-h-[180px]
            `}
          />

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1">
            <div className="flex items-center gap-0.5 sm:gap-1 min-w-0 overflow-x-auto">
              <IconButton
                theme={theme}
                title="Attach file"
                className="w-8 h-8 border-transparent bg-transparent shrink-0"
              >
                <Paperclip size={16} />
              </IconButton>

              <IconButton
                theme={theme}
                title="Upload image"
                className="w-8 h-8 border-transparent bg-transparent hidden sm:flex shrink-0"
              >
                <Image size={16} />
              </IconButton>

              <button
                onClick={() => setWebEnabled(!webEnabled)}
                className={`
                  shrink-0
                  flex items-center gap-1.5
                  h-8 px-2 sm:px-2.5 rounded-lg text-[11px] border transition
                  ${
                    webEnabled
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : `${theme.text600} border-transparent hover:${theme.text300}`
                  }
                `}
              >
                <Globe size={13} />
                <span className="hidden sm:inline">Web</span>
              </button>

              <button
                onClick={() => setReasoningEnabled(!reasoningEnabled)}
                className={`
                  shrink-0
                  hidden sm:flex items-center gap-1.5
                  h-8 px-2.5 rounded-lg text-[11px] border transition
                  ${
                    reasoningEnabled
                      ? 'bg-pink-500/10 text-pink-400 border-pink-500/20'
                      : `${theme.text600} border-transparent hover:${theme.text300}`
                  }
                `}
              >
                <Brain size={13} />
                Deep Reasoning
              </button>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <IconButton
                theme={theme}
                title="Voice input"
                className="w-8 h-8 border-transparent bg-transparent hidden sm:flex"
              >
                <Mic size={16} />
              </IconButton>

              <button
                onClick={submit}
                disabled={!message.trim()}
                className="
                  w-9 h-9 rounded-xl
                  bg-gradient-to-r from-red-600 to-pink-600
                  flex items-center justify-center text-white
                  shadow-[0_0_20px_-7px_rgba(244,63,94,0.8)]
                  disabled:opacity-30 disabled:cursor-not-allowed
                  hover:scale-105 transition
                "
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3 px-2 text-center">
          <Sparkles size={11} className={theme.text700} />
          <p className={`text-[10px] ${theme.text700}`}>
            Nexus can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHAT MESSAGES
───────────────────────────────────────────────────────────── */

function ChatMessages({ messages, isTyping, theme }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
      <div className="space-y-6 sm:space-y-7">
        {messages.map((message) => {
          if (message.role === 'user') {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-[80%] md:max-w-[70%]">
                  <div
                    className="
                      px-4 py-3 rounded-2xl rounded-br-md
                      bg-gradient-to-r from-red-600 to-pink-600
                      text-sm text-white
                      shadow-[0_10px_30px_-15px_rgba(244,63,94,0.7)]
                      break-words
                    "
                  >
                    {message.content}
                  </div>

                  <p className={`text-[10px] ${theme.text700} text-right mt-2`}>
                    You
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div key={message.id} className="flex gap-2.5 sm:gap-3 md:gap-4">
              <div
                className="
                  shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl
                  bg-gradient-to-br from-red-600/20 to-pink-600/20
                  border border-red-500/20
                  flex items-center justify-center
                  shadow-[0_0_25px_-8px_rgba(244,63,94,0.8)]
                "
              >
                <NexusLogo size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-sm font-semibold ${theme.text200}`}>
                    Nexus AI
                  </span>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/10">
                    AI Team
                  </span>
                </div>

                <div className={`text-sm leading-6 sm:leading-7 ${theme.text400} whitespace-pre-wrap break-words`}>
                  {message.content}
                </div>

                {message.agents && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {message.agents.map((agent) => (
                      <span
                        key={agent}
                        className={`
                          inline-flex items-center gap-1.5
                          px-2.5 py-1 rounded-lg
                          ${theme.surface}
                          border ${theme.border}
                          text-[10px] ${theme.text500}
                        `}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {agent}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 mt-4">
                  <button
                    className={`p-2 rounded-lg ${theme.text700} hover:${theme.text300} ${theme.surfaceHover} transition`}
                    title="Copy"
                  >
                    <Copy size={14} />
                  </button>

                  <button
                    className={`p-2 rounded-lg ${theme.text700} hover:${theme.text300} ${theme.surfaceHover} transition`}
                    title="Good response"
                  >
                    <ThumbsUp size={14} />
                  </button>

                  <button
                    className={`p-2 rounded-lg ${theme.text700} hover:${theme.text300} ${theme.surfaceHover} transition`}
                    title="Bad response"
                  >
                    <ThumbsDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-2.5 sm:gap-3 md:gap-4">
            <div
              className="
                shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl
                bg-gradient-to-br from-red-600/20 to-pink-600/20
                border border-red-500/20
                flex items-center justify-center
              "
            >
              <NexusLogo size={20} />
            </div>
            <div>
              <div className={`text-sm font-semibold ${theme.text200} mb-3`}>
                Nexus AI
              </div>

              <div
                className={`
                  flex items-center gap-1.5 px-4 py-3
                  rounded-2xl ${theme.surface}
                  border ${theme.border}
                `}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHAT PAGE
───────────────────────────────────────────────────────────── */

export default function NexusChatPage() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.toggle.darkMode);
  const theme = getTheme(darkMode);
  const handleToggleTheme = () => dispatch(toggleDarkMode());

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanel, setRightPanel] = useState(false);
  const [aiControls, setAiControls] = useState(false);
  const [activeAgent, setActiveAgent] = useState('orchestrator');
  const [activeConversation, setActiveConversation] = useState(null);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const generateDemoResponse = (userMessage) => {
    const text = userMessage.toLowerCase();

    if (
      text.includes('mern') ||
      text.includes('react') ||
      text.includes('node') ||
      text.includes('javascript')
    ) {
      return {
        content:
          'Absolutely. For a MERN application, I would structure the system into four main layers:\n\n1. React — handles the UI and client-side state.\n2. Node.js + Express — exposes your REST APIs and business logic.\n3. MongoDB — stores application data with Mongoose models.\n4. Authentication — use JWT or an OAuth provider such as Google.\n\nFor a production project, I would also separate controllers, services, routes, middleware, and models so the backend remains maintainable as the application grows.',
        agents: ['Orchestrator', 'Coding Agent', 'Reasoning Agent'],
      };
    }

    if (text.includes('ai') || text.includes('agent') || text.includes('llm')) {
      return {
        content:
          'Nexus can approach this as a multi-agent problem. The Orchestrator first understands your request and then delegates the work to specialized agents.\n\nFor example, a Research Agent can gather information, a Reasoning Agent can analyze it, and a Coding Agent can turn the result into an implementation. Their outputs are then synthesized into a single response.\n\nThis architecture is especially useful when a task requires multiple types of expertise rather than a single model call.',
        agents: ['Orchestrator', 'Research Agent', 'Reasoning Agent'],
      };
    }

    if (
      text.includes('mongodb') ||
      text.includes('database') ||
      text.includes('query')
    ) {
      return {
        content:
          'For MongoDB, I recommend starting by identifying the queries your application performs most frequently. Then design indexes around those access patterns.\n\nFor example, if you frequently search teachers by location, a 2dsphere index on a GeoJSON Point is appropriate. If you frequently filter by subject and class, compound indexes can help.\n\nThe key principle is to optimize for your real query patterns rather than adding indexes everywhere.',
        agents: ['Research Agent', 'Coding Agent', 'Reasoning Agent'],
      };
    }

    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return {
        content:
          "Hello! 👋 I'm Nexus AI.\n\nI'm your multi-agent AI workspace. You can ask me to research a topic, solve a complex problem, write or debug code, analyze documents, or combine several of these capabilities into one task.\n\nWhat would you like to work on?",
        agents: ['Nexus Orchestrator'],
      };
    }

    return {
      content:
        "I've analyzed your request and I'm ready to help.\n\nFor a production version of Nexus, this message would be generated by the selected AI agents. The Orchestrator would determine which specialists are needed, run them in parallel when possible, and synthesize their results into one answer.\n\nFor now, this is a demo response showing how the conversation flow will work once your backend/API is connected.",
      agents: ['Orchestrator', 'Reasoning Agent'],
    };
  };

  const handleSendMessage = (message, options = {}) => {
    if (!message?.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setHasStartedChat(true);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateDemoResponse(message);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: response.content,
          agents: response.agents,
        },
      ]);

      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  return (
    <div
      className={`
        h-screen overflow-hidden ${theme.pageBg} ${theme.pageText}
        selection:bg-red-500/30 selection:text-red-200
        flex
      `}
    >
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="
            absolute top-[-300px] left-[30%]
            w-[700px] h-[500px]
            rounded-full bg-red-600/[0.035]
            blur-[140px]
          "
        />

        <div
          className="
            absolute bottom-[-250px] right-[15%]
            w-[600px] h-[450px]
            rounded-full bg-pink-600/[0.025]
            blur-[140px]
          "
        />

        <div className={`absolute inset-0 ${theme.gridLine} bg-[size:60px_60px]`} />
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          transition-transform duration-300
          ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }
        `}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          navigate={navigate}
          setCollapsed={setSidebarCollapsed}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          setHasStartedChat={(value) => {
            setHasStartedChat(value);

            if (!value) {
              setMessages([]);
              setIsTyping(false);
            }

            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Mobile / tablet overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className={`
            fixed inset-0 z-40
            ${theme.backdrop} backdrop-blur-sm
            lg:hidden
          `}
        />
      )}

      {/* Main */}
      <main className="relative z-10 flex-1 min-w-0 flex flex-col h-screen">
        <TopBar
          activeAgent={activeAgent}
          setActiveAgent={setActiveAgent}
          setSidebarOpen={setSidebarOpen}
          setRightPanel={setRightPanel}
          setAiControls={setAiControls}
          theme={theme}
          darkMode={darkMode}
          onToggleTheme={handleToggleTheme}
        />

        <div className="relative flex-1 min-h-0">
          <div
            className="
              h-full overflow-y-auto
              scrollbar-thin
              scrollbar-thumb-white/10
              scrollbar-track-transparent
            "
          >
            {!hasStartedChat ? (
              <div className="h-full flex items-center justify-center px-4 sm:px-5 py-6 sm:py-8 md:py-10">
                <EmptyState onSend={handleSendMessage} theme={theme} />
              </div>
            ) : (
              <>
                <ChatMessages messages={messages} isTyping={isTyping} theme={theme} />

                <div ref={chatEndRef} />
              </>
            )}
          </div>

          <AgentPanel open={rightPanel} setOpen={setRightPanel} theme={theme} />
          <AIControlsPanel open={aiControls} setOpen={setAiControls} theme={theme} />
        </div>

        {hasStartedChat && <ChatInput onSend={handleSendMessage} theme={theme} />}
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHAT PAGE
───────────────────────────────────────────────────────────── */