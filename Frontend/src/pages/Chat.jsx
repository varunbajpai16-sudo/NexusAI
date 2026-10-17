import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';

import {

  ArrowUp,

  Brain,


  Check,

  ChevronDown,

  ChevronRight,

  Clipboard,

  Code2,
  Eye,
  Play,
  Download,
  X,

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
  ShieldCheck,

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

  Zap,

  ExternalLink,

  PanelRight,

  PanelLeftClose,

  SlidersHorizontal,

} from 'lucide-react';



import { NexusLogo } from '../components/Nexus_Logo';

import { toggleDarkMode } from '../features/Toggle/Toggle_slice';
import chatService from '../services/ChatApi.service';
import {
  clearActiveConversation,
  setActiveConversation as setReduxActiveConversation,
} from '../features/Messages/conversation.slice';
import {
  clearMessages,
} from '../features/Messages/message.slice';



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

  conversations,

  setActiveConversation,

  onDeleteConversation,

  setHasStartedChat,

  setSidebarOpen,

  navigate,

  theme,
  user,

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

          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 scrollbar-thin scrollbar-thumb-black scrollbar-track-black">

            <div className={`px-3 mb-2 text-[10px] uppercase tracking-[0.18em] ${theme.text700} font-semibold`}>

              Recent

            </div>



            <div className="space-y-1">

              {conversations.map((conversation) => {

                const active = activeConversation === conversation._id;



                return (
                  <div
                    key={conversation._id}
                    className={`group flex items-center gap-1 rounded-xl transition-all ${
                      active
                        ? `${theme.activeItemBg} border ${theme.activeItemBorder}`
                        : `border border-transparent ${theme.dark ? 'hover:bg-white/[0.035]' : 'hover:bg-black/[0.035]'}`
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveConversation(conversation._id)}
                      className="flex-1 min-w-0 text-left px-3 py-3"
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <MessageSquare
                          size={15}
                          className={`mt-0.5 shrink-0 ${active ? 'text-red-400' : theme.text600}`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm truncate ${active ? theme.text200 : theme.text400}`}>
                            {conversation.title || 'New conversation'}
                          </p>
                          <p className={`text-[11px] ${theme.text700} mt-1`}>
                            {conversation.updatedAt ? new Date(conversation.updatedAt).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      title="Delete conversation"
                      aria-label={`Delete ${conversation.title || 'conversation'}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteConversation(conversation._id);
                      }}
                      className={`mr-2 p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition ${
                        theme.dark ? '' : 'hover:bg-red-50'
                      }`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
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
            title={user?.name || user?.email || 'Account'}
          >
            <button
              onClick={() => navigate('/profile')}
              className="shrink-0 w-9 h-9 rounded-full overflow-hidden border border-red-500/25 bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center hover:scale-105 transition"
              title="Profile"
              aria-label="Open profile"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || 'User'}
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || 'User'
                    )}&background=27272a&color=ffffff`;
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={17} className="text-white" />
              )}
            </button>

            {!isRail && (
              <>
                <button
                  onClick={() => navigate('/profile')}
                  className="min-w-0 flex-1 text-left"
                  title="Profile"
                >
                  <p className={`text-sm ${theme.text} truncate`}>
                    {user?.name || 'User'}
                  </p>
                  <p className={`text-[11px] ${theme.text600} truncate`}>
                    {user?.email || 'Free plan'}
                  </p>
                </button>

                <button
                  onClick={() => setAccountMenu(!accountMenu)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme.text600} hover:${theme.dark ? 'text-white' : 'text-zinc-900'} ${theme.surfaceHover3} transition`}
                  title="Account settings"
                  aria-label="Account settings"
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



        <IconButton theme={theme} title="Code workspace" onClick={() => setRightPanel(true)}>

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



function CodeWorkspacePanel({ open, setOpen, theme, messages }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [manualCode, setManualCode] = useState('');
  const [runVersion, setRunVersion] = useState(0);
  const [copied, setCopied] = useState(false);

  const codeBlocks = React.useMemo(() => {
    const latest = [...(messages || [])].reverse().find((message) => message.role !== 'user' && message.content);
    if (!latest) return [];
    const content = typeof latest.content === 'string' ? latest.content : JSON.stringify(latest.content, null, 2);
    const matches = [...content.matchAll(/```([^\n`]*)\n?([\s\S]*?)```/g)];
    return matches.map((match, index) => ({
      id: `${latest._id || latest.id || 'latest'}-${index}`,
      language: (match[1] || 'text').trim().toLowerCase().split(/\s+/)[0] || 'text',
      code: match[2].replace(/^\n/, '').trimEnd(),
    }));
  }, [messages]);

  const selected = codeBlocks[selectedBlock] || codeBlocks[0];
  const code = manualCode !== '' ? manualCode : (selected?.code || '');
  const language = (selected?.language || 'text').toLowerCase();
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const previewMode = ['html', 'htm', 'svg', 'markdown', 'md', 'json', 'jsonc', 'mermaid', 'jsx', 'tsx', 'react', 'javascript', 'js', 'mjs', 'cjs', 'css'].includes(language) ? language : 'source';

  const previewDocument = React.useMemo(() => {
    const safeCode = code;
    const shell = (title, body, extra = '') => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>*,*:before,*:after{box-sizing:border-box}body{margin:0;padding:24px;font:14px/1.65 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;color:#e4e4e7;background:#09090b}a{color:#fb7185}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#18181b;border:1px solid #27272a;padding:16px;border-radius:12px;color:#e4e4e7}code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}h1,h2,h3{line-height:1.25}img,svg,video{max-width:100%}.muted{color:#a1a1aa;font-size:12px;margin-bottom:16px}</style>${extra}</head><body>${body}</body></html>`;
    if (['html', 'htm'].includes(language)) return safeCode;
    if (language === 'svg') return shell('SVG preview', `<div style="display:grid;place-items:center;min-height:70vh">${safeCode}</div>`);
    if (['json', 'jsonc'].includes(language)) {
      let formatted = safeCode;
      try { formatted = JSON.stringify(JSON.parse(safeCode), null, 2); } catch (_) {}
      return shell('JSON preview', `<div class="muted">JSON data preview · formatted when valid</div><pre><code>${escapeHtml(formatted)}</code></pre>`);
    }
    if (['markdown', 'md'].includes(language)) {
      const html = escapeHtml(safeCode)
        .replace(/^### (.*)$/gm, '<h3>$1</h3>').replace(/^## (.*)$/gm, '<h2>$1</h2>').replace(/^# (.*)$/gm, '<h1>$1</h1>')
        .replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>').replace(/^[-*] (.*)$/gm, '<li>$1</li>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
      return shell('Markdown preview', `<main><p>${html}</p></main>`);
    }
    if (language === 'mermaid') return shell('Diagram preview', `<div class="muted">Mermaid diagram · rendered by Mermaid</div><pre class="mermaid">${escapeHtml(safeCode)}</pre>`, '<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"><\/script><script>mermaid.initialize({startOnLoad:true,theme:"dark",securityLevel:"strict"});<\/script>');
    if (['jsx', 'tsx', 'react'].includes(language)) {
      return shell('React preview', '<div id="root"></div><div id="error" style="color:#fda4af"></div>', `<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script><script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script><script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script><script type="text/babel" data-presets="react,typescript">${safeCode.replace(/<\/script/gi, '<\\/script')}<\/script><script type="text/babel" data-presets="react,typescript">try{if(typeof App!=='undefined')ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));else if(typeof defaultExport!=='undefined')ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(defaultExport));else document.getElementById('error').textContent='Define an App component (or defaultExport) to render a preview.'}catch(e){document.getElementById('error').textContent=e.message}<\/script>`);
    }
    if (['css'].includes(language)) return shell('CSS preview', `<div class="muted">CSS preview · styles applied to sample components</div><h1 class="sample-title">Your CSS styling preview</h1><button class="sample-button">Sample button</button><div class="sample-card">A sample card to inspect typography, colors, borders and spacing.</div>`, `<style>${safeCode}\n.sample-card{padding:20px;margin-top:16px;border:1px solid #52525b;border-radius:14px}.sample-button{padding:10px 16px;border-radius:10px;border:1px solid #71717a;background:#27272a;color:inherit}</style>`);
    if (['javascript', 'js', 'mjs', 'cjs'].includes(language)) return shell('JavaScript preview', `<div class="muted">JavaScript sandbox · console output appears below</div><pre id="output">Running…</pre>`, `<script>const out=document.getElementById('output');const logs=[];const fmt=v=>{try{return typeof v==='string'?v:JSON.stringify(v,null,2)}catch(e){return String(v)}};console.log=(...a)=>logs.push(a.map(fmt).join(' '));console.error=(...a)=>logs.push('ERROR: '+a.map(fmt).join(' '));try{${safeCode.replace(/<\/script/gi, '<\\/script')}out.textContent=logs.join('\\n')||'Script executed. No console output.'}catch(e){out.textContent=e.stack||e.message}</script>`);
    return shell('Source preview', `<div class="muted">Preview is not available for <strong>${escapeHtml(language.toUpperCase())}</strong> in a browser sandbox. Your code is still available to edit, copy and download.</div><pre style="white-space:pre-wrap;overflow-wrap:anywhere"><code>${escapeHtml(safeCode)}</code></pre>`);
  }, [code, language, runVersion]);

  useEffect(() => { setManualCode(''); setSelectedBlock(0); }, [messages]);
  if (!open) return null;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (_) { setCopied(false); }
  };
  const downloadCode = () => {
    const extensionMap = { javascript: 'js', jsx: 'jsx', typescript: 'ts', tsx: 'tsx', html: 'html', htm: 'html', css: 'css', json: 'json', markdown: 'md', md: 'md', python: 'py', py: 'py', java: 'java', cpp: 'cpp', c: 'c', csharp: 'cs', 'c#': 'cs', go: 'go', rust: 'rs', sql: 'sql', bash: 'sh', shell: 'sh', yaml: 'yml', yml: 'yml', xml: 'xml', svg: 'svg', mermaid: 'mmd' };
    const extension = extensionMap[language] || language.replace(/[^a-z0-9]/g, '') || 'txt';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `nexus-code-${selectedBlock + 1}.${extension}`; link.click(); URL.revokeObjectURL(url);
  };

  return (
    <>
      <button aria-label="Close code workspace" onClick={() => setOpen(false)} className={`fixed inset-0 z-30 ${theme.dark ? 'bg-black/20' : 'bg-black/10'}`} />
      <aside className={`fixed right-0 top-0 bottom-0 z-40 w-full sm:w-[70vw] lg:w-1/2 max-w-none ${theme.panelBg} backdrop-blur-2xl border-l ${theme.border} rounded-l-2xl shadow-[-24px_0_80px_-35px_rgba(244,63,94,0.32)] overflow-hidden flex flex-col`}>
        <div className={`px-4 sm:px-5 py-4 flex items-center justify-between border-b ${theme.borderSubtle} shrink-0`}>
          <div className="flex items-center gap-3 min-w-0"><div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 via-red-500/10 to-violet-500/20 border border-rose-400/20 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-950/20"><Code2 size={19}/></div><div className="min-w-0"><h3 className={`text-sm font-semibold tracking-tight ${theme.text}`}>Code Studio</h3><p className={`text-[11px] ${theme.text600}`}>Edit, inspect and preview generated code</p></div></div>
          <button onClick={() => setOpen(false)} className={`w-9 h-9 rounded-xl border ${theme.border} ${theme.surfaceHover} flex items-center justify-center ${theme.text400}`} aria-label="Close"><X size={17}/></button>
        </div>
        <div className={`px-4 py-3 border-b ${theme.borderSubtle} flex flex-wrap items-center justify-between gap-3`}>
          <div className={`flex gap-1 p-1 rounded-xl border ${theme.border} ${theme.surface2}`}><button onClick={() => setActiveTab('code')} className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition ${activeTab === 'code' ? 'bg-gradient-to-r from-rose-500/15 to-violet-500/15 text-rose-400 shadow-sm' : theme.text500}`}><Code2 size={14}/> Editor</button><button onClick={() => setActiveTab('preview')} className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition ${activeTab === 'preview' ? 'bg-gradient-to-r from-rose-500/15 to-violet-500/15 text-rose-400 shadow-sm' : theme.text500}`}><Eye size={14}/> Preview</button></div>
          <div className="flex items-center gap-2"><button onClick={copyCode} disabled={!code} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.surfaceHover} ${theme.text400} text-xs font-medium flex items-center gap-2 disabled:opacity-40`}><Copy size={13}/>{copied ? 'Copied' : 'Copy'}</button><button onClick={downloadCode} disabled={!code} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.surfaceHover} ${theme.text400} text-xs font-medium flex items-center gap-2 disabled:opacity-40`}><Download size={13}/> Export</button><button onClick={() => setRunVersion((value) => value + 1)} className="px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-violet-600 hover:brightness-110 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-rose-950/25"><Play size={13}/> Refresh preview</button></div>
        </div>
        {codeBlocks.length > 0 && <div className={`px-4 py-2.5 border-b ${theme.borderSubtle} flex gap-2 overflow-x-auto`}>{codeBlocks.map((block, index) => <button key={block.id} onClick={() => { setSelectedBlock(index); setManualCode(''); }} className={`shrink-0 px-3 py-2 rounded-xl text-[11px] border transition ${selectedBlock === index ? 'border-rose-500/35 bg-rose-500/10 text-rose-400' : `${theme.border} ${theme.text500} ${theme.surfaceHover}`}`}>{block.language} <span className="opacity-50">/ {String(index + 1).padStart(2, '0')}</span></button>)}</div>}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4">
          {activeTab === 'code' ? (codeBlocks.length ? <div className={`h-full rounded-2xl border ${theme.border} overflow-hidden flex flex-col bg-[#09090b] shadow-inner`}><div className="h-11 px-4 border-b border-white/[0.07] flex items-center justify-between text-[11px] text-zinc-500"><div className="flex items-center gap-2"><span className="flex gap-1"><i className="w-2 h-2 rounded-full bg-rose-400"/><i className="w-2 h-2 rounded-full bg-amber-400"/><i className="w-2 h-2 rounded-full bg-emerald-400"/></span><span className="ml-2">{selected?.language || 'source'}</span></div><span>{code.split('\n').length} lines · {code.length} chars</span></div><textarea spellCheck={false} value={code} onChange={(event) => setManualCode(event.target.value)} className="flex-1 min-h-0 w-full resize-none bg-transparent p-5 font-mono text-[13px] sm:text-sm leading-7 text-zinc-200 outline-none selection:bg-rose-500/30" aria-label="Generated code editor" /></div> : <div className={`h-full rounded-2xl border ${theme.border} ${theme.surface2} flex flex-col items-center justify-center text-center p-8`}><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/15 to-violet-500/15 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4"><Code2 size={25}/></div><p className={`text-sm font-semibold ${theme.text}`}>Your workspace is ready</p><p className={`text-xs ${theme.text500} mt-2 max-w-xs leading-5`}>Ask Nexus to generate code in a fenced code block and it will appear here. Multiple blocks and languages are supported.</p></div>) : <div className={`h-full rounded-2xl overflow-hidden border ${theme.border} ${theme.dark ? 'bg-[#09090b]' : 'bg-white'} shadow-inner`}><iframe key={runVersion} title="Generated code preview" sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={previewDocument} className="w-full h-full" /></div>}
        </div>
        <div className={`px-4 py-3 border-t ${theme.borderSubtle} flex flex-wrap items-center justify-between gap-2 text-[10px] ${theme.text600}`}><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/> Language detected: <strong className={theme.text400}>{language.toUpperCase()}</strong></span><span>Live preview supports HTML, SVG, CSS, JS, React/JSX, Markdown, JSON and Mermaid. Native languages are shown as source unless a runtime is configured.</span></div>
      </aside>
<style>{`
  * { scrollbar-color: #000000 #080808; scrollbar-width: thin; }
  *::-webkit-scrollbar { width: 8px; height: 8px; }
  *::-webkit-scrollbar-track { background: #080808; }
  *::-webkit-scrollbar-thumb { background: #000000; border-radius: 9999px; border: 1px solid #080808; }
  *::-webkit-scrollbar-thumb:hover { background: #171717; }
`}</style>

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



function ChatInput({ onSend, theme, activeAgent, setActiveAgent }) {

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

          {!message.trim() && (
            <div className="px-3 sm:px-4 pt-3 pb-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={12} className="text-rose-400" />
                <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${theme.text500}`}>
                  Choose your agent
                </span>
                <span className={`text-[10px] ${theme.text700}`}>· or let Nexus decide</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pb-1 overflow-hidden">
                {agents.map((agent) => {
                  const AgentIcon = agent.icon;
                  const selected = activeAgent === agent.id;
                  return (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => setActiveAgent(agent.id)}
                      title={agent.description}
                      aria-pressed={selected}
                      className={`group min-w-0 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all duration-200 ${
                        selected
                          ? 'border-rose-500/40 bg-gradient-to-r from-rose-500/15 to-pink-500/10 text-rose-300 shadow-[0_0_24px_-14px_rgba(244,63,94,0.8)]'
                          : `${theme.border} ${theme.surface2} ${theme.text500} hover:border-rose-500/25 hover:text-rose-300`
                      }`}
                    >
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${agent.gradient} ${selected ? 'text-white' : 'text-white/90'} shadow-sm`}>
                        <AgentIcon size={14} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[11px] font-semibold whitespace-nowrap">{agent.name}</span>
                        <span className={`text-[9px] whitespace-nowrap ${selected ? 'text-rose-300/70' : theme.text700}`}>
                          {agent.description}
                        </span>
                      </span>
                      {selected && <Check size={12} className="ml-1 text-rose-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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

              px-4 sm:px-5 pt-3 sm:pt-4 pb-14

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




/* Render common Markdown formatting in AI responses without an extra dependency. */
function renderInlineMarkdown(text, theme, keyPrefix = 'inline') {
  const pattern = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*\n]+\*|_[^_\n]+_|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
  const parts = String(text).split(pattern);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (/^(\*\*.*\*\*|__.*__)$/.test(part)) {
      return <strong key={key} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (/^(`[^`]+`)$/.test(part)) {
      return <code key={key} className="px-1.5 py-0.5 rounded-md bg-black/10 dark:bg-white/10 font-mono text-[0.92em]">{part.slice(1, -1)}</code>;
    }
    if (/^(\*[^*\n]+\*|_[^_\n]+_)$/.test(part)) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link) {
      return <a key={key} href={link[2]} target="_blank" rel="noreferrer" className="text-red-400 underline underline-offset-2 break-all">{link[1]}</a>;
    }
    return part;
  });
}

function FormattedMessage({ content, theme }) {
  const source = String(content || '').replace(/\r\n?/g, '\n').trim();
  if (!source) return null;

  const lines = source.split('\n');
  const blocks = [];
  let paragraph = [];
  let listItems = [];
  let listType = null;
  let codeLines = [];
  let inCode = false;
  let codeLanguage = '';
  let blockIndex = 0;
  let skipUntilLine = -1;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        <p key={`p-${blockIndex++}`} className="my-3 first:mt-0 last:mb-0 whitespace-pre-wrap">
          {paragraph.map((line, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              {renderInlineMarkdown(line, theme, `p-${blockIndex}-${index}`)}
            </React.Fragment>
          ))}
        </p>
      );
      paragraph = [];
    }
  };

  const flushList = () => {
    if (!listItems.length) return;
    const ListTag = listType === 'ol' ? 'ol' : 'ul';
    blocks.push(
      <ListTag
        key={`list-${blockIndex++}`}
        className={`my-3 space-y-1.5 pl-6 ${listType === 'ol' ? 'list-decimal' : 'list-disc'}`}
      >
        {listItems.map((item, index) => (
          <li key={index} className="pl-1">
            {renderInlineMarkdown(item, theme, `li-${blockIndex}-${index}`)}
          </li>
        ))}
      </ListTag>
    );
    listItems = [];
    listType = null;
  };

  const flushCode = () => {
    const codeText = codeLines.join('\n');
    blocks.push(
      <div key={`code-${blockIndex++}`} className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#111113]">
        {codeLanguage && (
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[11px] text-zinc-400">
            <span className="uppercase tracking-wide">{codeLanguage || 'code'}</span>
            <button
              type="button"
              onClick={async () => {
                try { await navigator.clipboard.writeText(codeText); } catch (error) { console.error('Could not copy code:', error); }
              }}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-zinc-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Copy code block"
            >
              <Copy size={12} /> Copy
            </button>
          </div>
        )}
        <pre className="overflow-x-auto p-4 text-[12px] sm:text-[13px] leading-6 text-zinc-100">
          <code>{codeText}</code>
        </pre>
      </div>
    );
    codeLines = [];
    codeLanguage = '';
  };

  lines.forEach((line, lineIndex) => {
    if (lineIndex <= skipUntilLine) return;

    // Render Markdown tables as real tables instead of exposing pipe characters.
    const nextLine = lines[lineIndex + 1] || '';
    const isTableRow = /^\s*\|?.+\|.+\|?\s*$/.test(line);
    const isTableDivider = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(nextLine);
    if (isTableRow && isTableDivider) {
      flushParagraph();
      flushList();
      const parseCells = (row) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
      const headers = parseCells(line);
      const rows = [];
      let end = lineIndex + 2;
      while (end < lines.length && lines[end].includes('|') && lines[end].trim()) {
        rows.push(parseCells(lines[end]));
        end += 1;
      }
      skipUntilLine = end - 1;
      blocks.push(
        <div key={`table-${blockIndex++}`} className="my-4 w-full overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.06]"><tr>{headers.map((cell, index) => <th key={index} className="border-b border-white/10 px-4 py-3 font-semibold">{renderInlineMarkdown(cell, theme, `th-${lineIndex}-${index}`)}</th>)}</tr></thead>
            <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className="odd:bg-white/[0.015] hover:bg-white/[0.035]">{headers.map((_, cellIndex) => <td key={cellIndex} className="border-b border-white/[0.06] px-4 py-3 align-top">{renderInlineMarkdown(row[cellIndex] || '', theme, `td-${lineIndex}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      return;
    }

    const fence = line.match(/^\s*```([\w#+.-]*)\s*$/);
    if (fence) {
      if (!inCode) {
        flushParagraph();
        flushList();
        inCode = true;
        codeLanguage = fence[1];
      } else {
        flushCode();
        inCode = false;
      }
      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    if (/^\s*(---+|\*\*\*+|___+)\s*$/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push(<hr key={`hr-${blockIndex++}`} className="my-5 border-white/15" />);
      return;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const classes = {
        1: 'text-xl sm:text-2xl font-bold mt-6 mb-3',
        2: 'text-lg sm:text-xl font-bold mt-5 mb-3',
        3: 'text-base sm:text-lg font-semibold mt-4 mb-2',
        4: 'text-base font-semibold mt-4 mb-2',
        5: 'text-sm font-semibold mt-3 mb-2',
        6: 'text-sm font-semibold mt-3 mb-2',
      };
      const HeadingTag = `h${level}`;
      blocks.push(
        <HeadingTag key={`heading-${blockIndex++}`} className={`${classes[level]} ${theme.text200}`}>
          {renderInlineMarkdown(heading[2], theme, `heading-${blockIndex}`)}
        </HeadingTag>
      );
      return;
    }

    const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextType = ordered ? 'ol' : 'ul';
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((unordered || ordered)[1]);
      return;
    }

    const quote = line.match(/^\s*>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      flushList();
      blocks.push(
        <blockquote key={`quote-${blockIndex++}`} className={`my-3 border-l-2 border-red-500/60 pl-4 italic ${theme.text300}`}>
          {renderInlineMarkdown(quote[1], theme, `quote-${blockIndex}`)}
        </blockquote>
      );
      return;
    }

    flushList();
    paragraph.push(line);
  });

  if (inCode) flushCode();
  flushParagraph();
  flushList();

  return <div className="min-w-0 break-words">{blocks}</div>;
}

function ChatMessages({ messages, isTyping, theme }) {

  return (

    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-7 sm:py-9">

      <div className="space-y-6 sm:space-y-7">

        {messages.map((message) => {

          if (message.role === 'user') {

            return (

              <div key={message._id || message.id} className="flex justify-end mb-7">

                <div className="max-w-[85%] sm:max-w-[80%] md:max-w-[70%]">

                  <div

                    className="

                      px-4 py-3.5 rounded-3xl

                      ${theme.dark ? 'bg-[#252525] border border-white/[0.04]' : 'bg-zinc-100 border border-zinc-200/70'}

                      text-sm ${theme.dark ? 'text-zinc-100' : 'text-zinc-900'}

                      break-words whitespace-pre-wrap

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

            <div key={message._id || message.id} className="flex gap-3 sm:gap-4 md:gap-5 mb-8">

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



                  <span className={`text-[10px] ${theme.text600}`}>

                    · Response

                  </span>

                </div>



                <div className={`text-[14px] sm:text-[15px] leading-7 ${theme.dark ? "text-zinc-200" : "text-zinc-700"} break-words max-w-none`}>

                  <FormattedMessage content={message.content} theme={theme} />

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

  const user = useSelector((state) => state.auth?.user ?? null);

  const theme = getTheme(darkMode);

  const handleToggleTheme = () => dispatch(toggleDarkMode());



  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [rightPanel, setRightPanel] = useState(false);

  const [aiControls, setAiControls] = useState(false);

  const [activeAgent, setActiveAgent] = useState('orchestrator');

  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [dialog, setDialog] = useState(null);

  const conversations = useSelector(
    (state) => state.conversation?.conversations ?? []
  );
  const reduxActiveConversation = useSelector(
    (state) => state.conversation?.activeConversation ?? null
  );
  // The slice may store either the conversation object or its MongoDB ID.
  const activeConversation =
    typeof reduxActiveConversation === 'string'
      ? reduxActiveConversation
      : reduxActiveConversation?._id ?? null;
  const messages = useSelector((state) => state.message?.messages ?? []);



  const navigate = useNavigate();

  const chatEndRef = useRef(null);

  // Validate the locally stored session whenever the chat page opens.
  // Supports either a direct user object or { user, expiry/expiresAt }.
  useEffect(() => {
    const checkLocalSession = () => {
      let storedValue;

      try {
        storedValue = localStorage.getItem('user');
        if (!storedValue) {
          setDialog({ type: 'session', title: 'Your session has ended', message: 'For your security, please sign in again to continue using Nexus AI.' });
          return;
        }

        const parsed = JSON.parse(storedValue);
        const storedUser = parsed?.user ?? parsed;
        const expiryValue =
          parsed?.expiry ??
          parsed?.expiresAt ??
          parsed?.expires ??
          storedUser?.expiry ??
          storedUser?.expiresAt ??
          storedUser?.expires ??
          localStorage.getItem('userExpiry') ??
          localStorage.getItem('sessionExpiry') ??
          localStorage.getItem('expiresAt');

        // If the login flow stores an explicit expiry, enforce it.
        // If it doesn't, initialize a 24-hour timer from the existing
        // login timestamp when available.
        const loginTime =
          parsed?.loginAt ??
          parsed?.loginTime ??
          storedUser?.loginAt ??
          storedUser?.loginTime ??
          localStorage.getItem('loginAt') ??
          localStorage.getItem('loginTime');

        let expiresAt = expiryValue ? new Date(expiryValue).getTime() : NaN;

        if (!Number.isFinite(expiresAt) && loginTime) {
          const loginTimestamp = new Date(loginTime).getTime();
          if (Number.isFinite(loginTimestamp)) {
            expiresAt = loginTimestamp + 24 * 60 * 60 * 1000;
          }
        }

        if (!storedUser || typeof storedUser !== 'object' ||
            !(storedUser.googleId || storedUser.userId || storedUser._id || storedUser.email)) {
          localStorage.removeItem('user');
          setDialog({ type: 'session', title: 'Your session has ended', message: 'For your security, please sign in again to continue using Nexus AI.' });
          return;
        }

        if (Number.isFinite(expiresAt) && Date.now() >= expiresAt) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userExpiry');
          localStorage.removeItem('sessionExpiry');
          localStorage.removeItem('expiresAt');
          localStorage.removeItem('loginAt');
          localStorage.removeItem('loginTime');

          setDialog({ type: 'session', title: 'Session expired', message: 'Your 24-hour session has expired. Sign in again to pick up where you left off.' });
        }
      } catch (error) {
        localStorage.removeItem('user');
        setDialog({ type: 'session', title: 'Session unavailable', message: 'Your saved sign-in details could not be verified. Please sign in again.' });
      }
    };

    checkLocalSession();
  }, [navigate]);



  const handleDeleteConversation = async (conversationId) => {
    const conversation = conversations.find((item) => item._id === conversationId);
    setDialog({
      type: 'delete',
      conversationId,
      title: conversation?.title || 'Untitled conversation',
      message: 'This conversation and its messages will be permanently deleted. This action cannot be undone.',
    });
  };

  const confirmDeleteConversation = async () => {
    const conversationId = dialog?.conversationId;
    if (!conversationId) return;

    try {
      await chatService.deleteConversation(dispatch, conversationId);
      setDialog(null);
      if (activeConversation === conversationId) {
        dispatch(clearActiveConversation());
        dispatch(clearMessages());
        setHasStartedChat(false);
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      setDialog({ type: 'error', title: 'Could not delete conversation', message: error.response?.data?.message || 'Something went wrong. Please try again.' });
    }
  };

  const handleConversationSelection = async (conversationId) => {
    setSidebarOpen(false);

    if (!conversationId) {
      dispatch(clearActiveConversation());
      dispatch(clearMessages());
      setHasStartedChat(false);
      setIsTyping(false);
      return;
    }

    dispatch(setReduxActiveConversation(conversationId));
    setHasStartedChat(true);
    setIsTyping(false);

    try {
      await chatService.getMessages(dispatch, conversationId);
    } catch (error) {
      console.error('Failed to load conversation messages:', error);
    }
  };

  useEffect(() => {
    chatService.getConversations(dispatch).catch((error) => {
      console.error('Failed to load conversations:', error);
    });
  }, [dispatch]);

  const handleSendMessage = async (message, options = {}) => {
    const content = message?.trim();
    if (!content || isTyping) return;

    // Open Code Studio automatically for programming-related prompts.
    // Keep this heuristic broad enough to catch code generation, debugging,
    // framework questions, algorithms, and common developer tooling.
    const codingPromptPattern = /\b(code|coding|program(?:ming)?|developer|debug(?:ging)?|bug|error|exception|stack trace|syntax|compiler|compile|function|class|method|variable|algorithm|data structure|leetcode|dsa|react|jsx|tsx|javascript|typescript|node(?:\.js)?|express|mern|mongodb|mongoose|html|css|tailwind|frontend|front-end|backend|back-end|api|endpoint|rest api|graphql|sql|database|python|java|c\+\+|\bc\b|rust|golang|php|ruby|bash|shell script|terminal|command line|npm|npx|vite|git|github|docker|redis|redux|component|hook|state management|json|yaml|xml|regex|recursion|loop|array|string|linked list|tree traversal|binary search|dynamic programming|sql query|unit test|testing|refactor|repository|pull request|code review|code studio)\b/i;
    if (codingPromptPattern.test(content)) {
      setRightPanel(true);
    }

    setHasStartedChat(true);
    setIsTyping(true);

    let conversationId = activeConversation;

    try {
      // Create a conversation with the first message as its title.
      if (!conversationId) {
        // Use the first user message as the conversation title.
        // Keep the stored title short enough for the sidebar.
        const conversationTitle = content.slice(0, 100).trim();
        const conversation = await chatService.createConversation(
          dispatch,
          conversationTitle
        );
        conversationId = conversation._id;

        // Keep subsequent messages in this conversation instead of creating
        // a new conversation for every message.
        dispatch(setReduxActiveConversation(conversationId));
      }

      // The Agent API runs LangGraph and saves both the user and assistant
      // messages through the Chat Service. The frontend only updates Redux.
      await chatService.askAgent(dispatch, {
        conversationId,
        message: content,
        options,
      });
    } catch (error) {
      console.error('Failed to process agent message:', error);

      // Reload persisted messages if the agent saved a message before failing.
      if (conversationId) {
        try {
          await chatService.getMessages(dispatch, conversationId);
        } catch (reloadError) {
          console.error('Failed to reload conversation messages:', reloadError);
        }
      }
    } finally {
      setIsTyping(false);
    }
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

      {dialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="nexus-dialog-title">
          <button type="button" aria-label="Close dialog" onClick={() => dialog.type === 'session' ? (localStorage.removeItem('user'), localStorage.removeItem('token'), localStorage.removeItem('accessToken'), navigate('/login', { replace: true })) : setDialog(null)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <div className={`relative w-full max-w-md overflow-hidden rounded-3xl border ${theme.dark ? 'border-white/10 bg-[#0b0b0e]' : 'border-zinc-200 bg-white'} shadow-[0_30px_100px_-25px_rgba(0,0,0,0.8)]`}>
            <div className="h-1 w-full bg-gradient-to-r from-red-600 via-pink-500 to-rose-400" />
            <div className="p-6 sm:p-7">
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${dialog.type === 'delete' ? 'border-red-500/25 bg-red-500/10 text-red-400' : 'border-pink-500/25 bg-gradient-to-br from-red-500/15 to-pink-500/15 text-pink-400'}`}>
                {dialog.type === 'delete' ? <Trash2 size={24} /> : dialog.type === 'error' ? <X size={24} /> : <ShieldCheck size={24} />}
              </div>
              <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${dialog.type === 'delete' ? 'text-red-400' : 'text-pink-400'}`}>Nexus AI · {dialog.type === 'delete' ? 'Confirmation' : dialog.type === 'session' ? 'Security notice' : 'Something went wrong'}</p>
              <h2 id="nexus-dialog-title" className={`text-xl sm:text-2xl font-semibold tracking-tight ${theme.text}`}>{dialog.type === 'delete' ? 'Delete this conversation?' : dialog.title}</h2>
              {dialog.type === 'delete' && <p className={`mt-3 rounded-xl border px-3 py-2 text-sm ${theme.dark ? 'border-white/10 bg-white/[0.03] text-zinc-200' : 'border-zinc-200 bg-zinc-50 text-zinc-800'} break-words`}>{dialog.title}</p>}
              <p className={`mt-3 text-sm leading-6 ${theme.text400}`}>{dialog.message}</p>
              <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                {dialog.type !== 'session' && <button type="button" onClick={() => setDialog(null)} className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${theme.dark ? 'border-white/10 text-zinc-300 hover:bg-white/[0.05]' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-100'}`}>Cancel</button>}
                <button type="button" onClick={() => { if (dialog.type === 'delete') confirmDeleteConversation(); else if (dialog.type === 'session') { localStorage.removeItem('user'); localStorage.removeItem('token'); localStorage.removeItem('accessToken'); localStorage.removeItem('userExpiry'); localStorage.removeItem('sessionExpiry'); localStorage.removeItem('expiresAt'); localStorage.removeItem('loginAt'); localStorage.removeItem('loginTime'); navigate('/login', { replace: true }); } else setDialog(null); }} className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 ${dialog.type === 'delete' ? 'bg-gradient-to-r from-red-600 to-rose-600 shadow-red-950/30' : 'bg-gradient-to-r from-red-600 to-pink-600 shadow-red-950/30'}`}>{dialog.type === 'delete' ? 'Delete permanently' : dialog.type === 'session' ? 'Go to login' : 'Got it'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

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

          conversations={conversations}

          setActiveConversation={handleConversationSelection}

          onDeleteConversation={handleDeleteConversation}

          setSidebarOpen={setSidebarOpen}

          theme={theme}
          user={user}

          setHasStartedChat={(value) => {

            setHasStartedChat(value);



            if (!value) {
              dispatch(clearActiveConversation());
              dispatch(clearMessages());
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

              scrollbar-thumb-black

              scrollbar-track-black

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



          <CodeWorkspacePanel open={rightPanel} setOpen={setRightPanel} theme={theme} messages={messages} />

          <AIControlsPanel open={aiControls} setOpen={setAiControls} theme={theme} />

        </div>



        {hasStartedChat && <ChatInput onSend={handleSendMessage} theme={theme} activeAgent={activeAgent} setActiveAgent={setActiveAgent} />}

      </main>

    </div>

  );

}


