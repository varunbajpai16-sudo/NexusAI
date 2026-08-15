import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Database,
  Globe,
  KeyRound,
  Lock,
  Moon,
  Palette,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import { NexusLogo } from '../components/Nexus_Logo';
import { toggleDarkMode } from '../features/Toggle/Toggle_slice';

// ─── Theme ────────────────────────────────────────────────────────────

const getTheme = (dark) => ({
  dark,

  pageBg: dark ? 'bg-black' : 'bg-zinc-50',
  pageText: dark ? 'text-white' : 'text-zinc-900',

  headerBg: dark ? 'bg-black/75' : 'bg-white/80',
  chipBg: dark ? 'bg-white/[0.03]' : 'bg-black/[0.03]',
  cardBg: dark ? 'bg-white/[0.02]' : 'bg-black/[0.02]',
  cardBgHover: dark ? 'hover:bg-white/[0.045]' : 'hover:bg-black/[0.04]',
  panelBg: dark ? 'bg-white/[0.02]' : 'bg-black/[0.02]',
  modeChipBg: dark ? 'bg-white/[0.025]' : 'bg-black/[0.025]',
  sidebarGradientBg: dark
    ? 'bg-gradient-to-br from-red-950/25 via-[#0b0b0b] to-pink-950/10'
    : 'bg-gradient-to-br from-red-100/60 via-white to-pink-100/40',
  sidebarInnerBg: dark ? 'bg-black/20' : 'bg-black/[0.03]',
  navPanelBg: dark ? 'bg-[#090909]/90' : 'bg-white/90',
  dangerZoneBg: dark ? 'bg-red-500/[0.02]' : 'bg-red-500/[0.03]',
  toggleOff: dark ? 'bg-white/[0.12]' : 'bg-black/[0.14]',
  selectOptionBg: dark ? 'bg-[#0b0b0b]' : 'bg-white',

  border: dark ? 'border-white/[0.06]' : 'border-zinc-200',
  borderSoft: dark ? 'border-white/[0.07]' : 'border-zinc-200',
  borderHover: dark ? 'hover:border-white/[0.1]' : 'hover:border-zinc-300',
  borderSubtle: dark ? 'border-white/[0.05]' : 'border-zinc-100',

  text: dark ? 'text-white' : 'text-zinc-900',
  text200: dark ? 'text-zinc-200' : 'text-zinc-800',
  text300: dark ? 'text-zinc-300' : 'text-zinc-700',
  text400: dark ? 'text-zinc-400' : 'text-zinc-600',
  text500: dark ? 'text-zinc-500' : 'text-zinc-500',
  text600: dark ? 'text-zinc-600' : 'text-zinc-400',
  text700: dark ? 'text-zinc-700' : 'text-zinc-400',

  hoverText: dark ? 'hover:text-white' : 'hover:text-zinc-900',
  hoverBg: dark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.04]',
  hoverBg7: dark ? 'hover:bg-white/[0.07]' : 'hover:bg-black/[0.07]',

  gridLine: dark
    ? 'bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] opacity-[0.018]'
    : 'bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] opacity-[0.03]',
});

const Toggle = ({ enabled, onChange, theme }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-10 h-6 rounded-full p-1 transition-all ${
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

const SettingCard = ({
  icon: Icon,
  title,
  description,
  children,
  onClick,
  theme,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border ${theme.border} ${theme.cardBg} ${theme.cardBgHover} ${theme.borderHover} transition-all text-left`}
  >
    <div className={`w-10 h-10 shrink-0 rounded-xl ${theme.chipBg} border ${theme.border} flex items-center justify-center`}>
      <Icon size={17} className={theme.text400} />
    </div>

    <div className="flex-1 min-w-0">
      <p className={`text-sm font-medium ${theme.text200}`}>{title}</p>
      <p className={`text-xs ${theme.text600} mt-1 leading-5`}>{description}</p>
    </div>

    {children || <ChevronRight size={16} className={`${theme.text700} shrink-0`} />}
  </button>
);

export default function NexusSettingsPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.toggle.darkMode);
  const theme = getTheme(darkMode);
  const handleToggleTheme = () => dispatch(toggleDarkMode());

  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [webSearch, setWebSearch] = useState(true);
  const [autoAgents, setAutoAgents] = useState(true);
  const [deepReasoning, setDeepReasoning] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const [responseMode, setResponseMode] = useState('Fast');
  const [language, setLanguage] = useState('English');

  return (
    <div className={`min-h-screen ${theme.pageBg} ${theme.pageText} selection:bg-red-500/30 selection:text-red-200`}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-64 left-[22%] w-[700px] h-[480px] rounded-full bg-red-600/[0.045] blur-[160px]" />
        <div className="absolute -bottom-72 right-[8%] w-[650px] h-[500px] rounded-full bg-pink-600/[0.035] blur-[160px]" />
        <div className={`absolute inset-0 ${theme.gridLine} bg-[size:60px_60px]`} />
      </div>

      {/* Header */}
      <header className={`relative z-20 h-16 sm:h-[72px] border-b ${theme.border} ${theme.headerBg} backdrop-blur-2xl`}>
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className={`w-9 h-9 rounded-xl border ${theme.borderSoft} ${theme.chipBg} flex items-center justify-center ${theme.text500} ${theme.hoverText} ${theme.hoverBg7} transition`}
              title="Go back"
            >
              <ArrowLeft size={17} />
            </button>

            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.dark ? 'from-zinc-950 via-black to-red-950/60' : 'from-zinc-100 via-white to-red-100'} border border-red-500/25 flex items-center justify-center shadow-[0_0_22px_-7px_rgba(244,63,94,0.7)]`}>
              <NexusLogo size={24} />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleTheme}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`w-9 h-9 rounded-xl border ${theme.borderSoft} ${theme.chipBg} flex items-center justify-center ${theme.text500} ${theme.hoverText} ${theme.hoverBg7} transition`}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => navigate('/')}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${theme.text500} ${theme.hoverText} ${theme.hoverBg} transition`}
            >
              <Sparkles size={14} />
              Back to workspace
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
        {/* Page heading */}
        <div className="mb-7 sm:mb-9">
          <p className="text-[10px] uppercase tracking-[0.22em] text-red-400/70 font-semibold mb-2">
            Workspace
          </p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/15 flex items-center justify-center">
              <SlidersHorizontal size={19} className="text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Settings
              </h1>
              <p className={`text-sm ${theme.text500} mt-1`}>
                Customize your Nexus AI workspace and experience.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_310px] gap-5 lg:gap-6 items-start">
          {/* Main settings */}
          <div className="space-y-7">
            {/* AI behavior */}
            <section>
              <div className="flex items-center gap-2 px-1 mb-3">
                <Sparkles size={15} className="text-red-400" />
                <h2 className={`text-sm font-semibold ${theme.text}`}>AI behavior</h2>
              </div>

              <div className="space-y-2.5">
                <div className={`rounded-2xl border ${theme.border} ${theme.cardBg} p-4`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center shrink-0">
                      <Zap size={17} className="text-red-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${theme.text200}`}>
                        Default response mode
                      </p>
                      <p className={`text-xs ${theme.text600} mt-1`}>
                        Choose how Nexus balances speed and deeper reasoning.
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {['Fast', 'Reason'].map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setResponseMode(mode)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition ${
                              responseMode === mode
                                ? mode === 'Fast'
                                  ? 'bg-red-500/10 border-red-500/25 text-red-400'
                                  : 'bg-pink-500/10 border-pink-500/25 text-pink-400'
                                : `${theme.modeChipBg} ${theme.border} ${theme.text500} hover:${theme.text300}`
                            }`}
                          >
                            {mode === 'Fast' ? (
                              <span className="flex items-center gap-1.5">
                                <Zap size={12} />
                                Fast
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5">
                                <Sparkles size={12} />
                                Reason
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <SettingCard
                  theme={theme}
                  icon={Globe}
                  title="Web search"
                  description="Allow Nexus to use live web information when answering."
                >
                  <Toggle
                    theme={theme}
                    enabled={webSearch}
                    onChange={() => setWebSearch(!webSearch)}
                  />
                </SettingCard>

                <SettingCard
                  theme={theme}
                  icon={Sparkles}
                  title="Auto-select agents"
                  description="Let the orchestrator choose the best agents for each task."
                >
                  <Toggle
                    theme={theme}
                    enabled={autoAgents}
                    onChange={() => setAutoAgents(!autoAgents)}
                  />
                </SettingCard>

                <SettingCard
                  theme={theme}
                  icon={Zap}
                  title="Deep reasoning"
                  description="Use additional reasoning for complex questions and decisions."
                >
                  <Toggle
                    theme={theme}
                    enabled={deepReasoning}
                    onChange={() => setDeepReasoning(!deepReasoning)}
                  />
                </SettingCard>
              </div>
            </section>

            {/* Chat experience */}
            <section>
              <div className="flex items-center gap-2 px-1 mb-3">
                <Palette size={15} className="text-pink-400" />
                <h2 className={`text-sm font-semibold ${theme.text}`}>Chat experience</h2>
              </div>

              <div className="space-y-2.5">
                <SettingCard
                  theme={theme}
                  icon={darkMode ? Moon : Sun}
                  title="Appearance"
                  description={
                    darkMode
                      ? 'Nexus is using the dark theme.'
                      : 'Nexus is using the light theme.'
                  }
                  onClick={handleToggleTheme}
                >
                  <span className={`flex items-center gap-1.5 text-[11px] ${theme.text400} px-2.5 py-1 rounded-lg border ${theme.border} ${theme.modeChipBg}`}>
                    {darkMode ? <Moon size={12} /> : <Sun size={12} />}
                    {darkMode ? 'Dark' : 'Light'}
                  </span>
                </SettingCard>

                <SettingCard
                  theme={theme}
                  icon={Globe}
                  title="Language"
                  description="Choose the language used throughout the Nexus interface."
                >
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={`bg-transparent text-xs ${theme.text400} outline-none cursor-pointer`}
                  >
                    <option className={theme.selectOptionBg} value="English">English</option>
                    <option className={theme.selectOptionBg} value="Hindi">Hindi</option>
                    <option className={theme.selectOptionBg} value="Spanish">Spanish</option>
                  </select>
                </SettingCard>

                <SettingCard
                  theme={theme}
                  icon={Database}
                  title="Save chat history"
                  description="Keep your conversations available in the recent conversations list."
                >
                  <Toggle
                    theme={theme}
                    enabled={saveHistory}
                    onChange={() => setSaveHistory(!saveHistory)}
                  />
                </SettingCard>

                <SettingCard
                  theme={theme}
                  icon={SlidersHorizontal}
                  title="Compact chat mode"
                  description="Use a denser layout to fit more messages on screen."
                >
                  <Toggle
                    theme={theme}
                    enabled={compactMode}
                    onChange={() => setCompactMode(!compactMode)}
                  />
                </SettingCard>
              </div>
            </section>

            {/* Notifications */}
            <section>
              <div className="flex items-center gap-2 px-1 mb-3">
                <Bell size={15} className="text-rose-400" />
                <h2 className={`text-sm font-semibold ${theme.text}`}>Notifications</h2>
              </div>

              <div className="space-y-2.5">
                <SettingCard
                  theme={theme}
                  icon={Bell}
                  title="Workspace notifications"
                  description="Get notified about important activity in your Nexus workspace."
                >
                  <Toggle
                    theme={theme}
                    enabled={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                </SettingCard>

                <SettingCard
                  theme={theme}
                  icon={Sparkles}
                  title="Product updates"
                  description="Receive occasional updates about new Nexus AI features."
                >
                  <Toggle
                    theme={theme}
                    enabled={emailUpdates}
                    onChange={() => setEmailUpdates(!emailUpdates)}
                  />
                </SettingCard>
              </div>
            </section>

            {/* Security */}
            <section>
              <div className="flex items-center gap-2 px-1 mb-3">
                <Shield size={15} className={theme.text400} />
                <h2 className={`text-sm font-semibold ${theme.text}`}>Security & privacy</h2>
              </div>

              <div className="space-y-2.5">
                <SettingCard
                  theme={theme}
                  icon={Lock}
                  title="Password & authentication"
                  description="Manage your password and available sign-in methods."
                  onClick={() => {}}
                />

                <SettingCard
                  theme={theme}
                  icon={KeyRound}
                  title="Two-factor authentication"
                  description="Add an additional layer of protection to your account."
                  onClick={() => {}}
                >
                  <span className={`text-[10px] ${theme.text600} px-2 py-1 rounded-lg border ${theme.borderSubtle}`}>
                    Not enabled
                  </span>
                </SettingCard>

                <SettingCard
                  theme={theme}
                  icon={User}
                  title="Profile"
                  description="Manage your name, email and account information."
                  onClick={() => navigate('/profile')}
                />
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            {/* Current workspace */}
            <div className={`rounded-3xl border border-red-500/15 ${theme.sidebarGradientBg} p-5 sm:p-6 shadow-[0_25px_70px_-35px_rgba(244,63,94,0.45)]`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center shadow-[0_0_25px_-8px_rgba(244,63,94,0.9)]">
                  <NexusLogo size={22} />
                </div>
                <div>
                  <p className={`text-xs ${theme.text500}`}>Workspace</p>
                  <p className={`text-sm font-semibold ${theme.text}`}>Nexus AI</p>
                </div>
              </div>

              <div className={`mt-5 rounded-2xl border ${theme.border} ${theme.sidebarInnerBg} p-3.5`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${theme.text600}`}>Plan</span>
                  <span className="text-xs font-medium text-red-400">Free</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${theme.text600}`}>Response mode</span>
                  <span className={`text-xs ${theme.text300}`}>{responseMode}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/pricing')}
                className="w-full mt-4 h-10 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-xs font-semibold hover:scale-[1.01] transition shadow-[0_0_25px_-9px_rgba(244,63,94,0.9)]"
              >
                Upgrade plan
              </button>
            </div>

            {/* Quick navigation */}
            <div className={`rounded-3xl border ${theme.borderSoft} ${theme.navPanelBg} p-4`}>
              <p className={`text-[10px] uppercase tracking-[0.18em] ${theme.text600} font-semibold px-2 mb-2`}>
                Account
              </p>

              <button
                onClick={() => navigate('/profile')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${theme.hoverBg} transition`}
              >
                <User size={16} className={theme.text500} />
                <span className={`text-xs ${theme.text300}`}>Profile</span>
                <ChevronRight size={14} className={`ml-auto ${theme.text700}`} />
              </button>

              <button
                onClick={() => navigate('/pricing')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${theme.hoverBg} transition`}
              >
                <Zap size={16} className={theme.text500} />
                <span className={`text-xs ${theme.text300}`}>Billing & plan</span>
                <ChevronRight size={14} className={`ml-auto ${theme.text700}`} />
              </button>
            </div>

            {/* Danger zone */}
            <div className={`rounded-3xl border border-red-500/10 ${theme.dangerZoneBg} p-5`}>
              <div className="flex items-center gap-2">
                <Trash2 size={15} className="text-red-500" />
                <h3 className={`text-sm font-semibold ${theme.text200}`}>Danger zone</h3>
              </div>
              <p className={`text-[11px] leading-5 ${theme.text600} mt-2`}>
                Permanently delete your Nexus account and associated workspace data.
              </p>

              <button className="w-full mt-4 h-9 rounded-xl border border-red-500/15 text-xs font-medium text-red-400 hover:bg-red-500/10 transition">
                Delete account
              </button>
            </div>
          </aside>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          <Check size={11} className="text-red-500/50" />
          <p className={`text-[10px] ${theme.text700}`}>
            Your settings are saved automatically
          </p>
        </div>
      </main>
    </div>
  );
}