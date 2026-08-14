import React, { useState } from 'react';
import { useNavigate } from 'react-router';
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
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import { NexusLogo } from '../components/Nexus_Logo';

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-10 h-6 rounded-full p-1 transition-all ${
      enabled ? 'bg-red-500' : 'bg-white/[0.12]'
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
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.045] hover:border-white/[0.1] transition-all text-left"
  >
    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.035] border border-white/[0.06] flex items-center justify-center">
      <Icon size={17} className="text-zinc-400" />
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-zinc-200">{title}</p>
      <p className="text-xs text-zinc-600 mt-1 leading-5">{description}</p>
    </div>

    {children || <ChevronRight size={16} className="text-zinc-700 shrink-0" />}
  </button>
);

export default function NexusSettingsPage() {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30 selection:text-red-200">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-64 left-[22%] w-[700px] h-[480px] rounded-full bg-red-600/[0.045] blur-[160px]" />
        <div className="absolute -bottom-72 right-[8%] w-[650px] h-[500px] rounded-full bg-pink-600/[0.035] blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.018] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 h-16 sm:h-[72px] border-b border-white/[0.06] bg-black/75 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.07] transition"
              title="Go back"
            >
              <ArrowLeft size={17} />
            </button>

            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-950 via-black to-red-950/60 border border-red-500/25 flex items-center justify-center shadow-[0_0_22px_-7px_rgba(244,63,94,0.7)]">
              <NexusLogo size={24} />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-500 hover:text-white hover:bg-white/[0.04] transition"
          >
            <Sparkles size={14} />
            Back to workspace
          </button>
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
              <p className="text-sm text-zinc-500 mt-1">
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
                <h2 className="text-sm font-semibold text-white">AI behavior</h2>
              </div>

              <div className="space-y-2.5">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center shrink-0">
                      <Zap size={17} className="text-red-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200">
                        Default response mode
                      </p>
                      <p className="text-xs text-zinc-600 mt-1">
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
                                : 'bg-white/[0.025] border-white/[0.06] text-zinc-500 hover:text-zinc-300'
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
                  icon={Globe}
                  title="Web search"
                  description="Allow Nexus to use live web information when answering."
                >
                  <Toggle
                    enabled={webSearch}
                    onChange={() => setWebSearch(!webSearch)}
                  />
                </SettingCard>

                <SettingCard
                  icon={Sparkles}
                  title="Auto-select agents"
                  description="Let the orchestrator choose the best agents for each task."
                >
                  <Toggle
                    enabled={autoAgents}
                    onChange={() => setAutoAgents(!autoAgents)}
                  />
                </SettingCard>

                <SettingCard
                  icon={Zap}
                  title="Deep reasoning"
                  description="Use additional reasoning for complex questions and decisions."
                >
                  <Toggle
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
                <h2 className="text-sm font-semibold text-white">Chat experience</h2>
              </div>

              <div className="space-y-2.5">
                <SettingCard
                  icon={Moon}
                  title="Appearance"
                  description="Nexus is currently optimized for the dark theme."
                  onClick={() => {}}
                >
                  <span className="text-[11px] text-zinc-500 px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.025]">
                    Dark
                  </span>
                </SettingCard>

                <SettingCard
                  icon={Globe}
                  title="Language"
                  description="Choose the language used throughout the Nexus interface."
                >
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-transparent text-xs text-zinc-400 outline-none cursor-pointer"
                  >
                    <option className="bg-[#0b0b0b]" value="English">English</option>
                    <option className="bg-[#0b0b0b]" value="Hindi">Hindi</option>
                    <option className="bg-[#0b0b0b]" value="Spanish">Spanish</option>
                  </select>
                </SettingCard>

                <SettingCard
                  icon={Database}
                  title="Save chat history"
                  description="Keep your conversations available in the recent conversations list."
                >
                  <Toggle
                    enabled={saveHistory}
                    onChange={() => setSaveHistory(!saveHistory)}
                  />
                </SettingCard>

                <SettingCard
                  icon={SlidersHorizontal}
                  title="Compact chat mode"
                  description="Use a denser layout to fit more messages on screen."
                >
                  <Toggle
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
                <h2 className="text-sm font-semibold text-white">Notifications</h2>
              </div>

              <div className="space-y-2.5">
                <SettingCard
                  icon={Bell}
                  title="Workspace notifications"
                  description="Get notified about important activity in your Nexus workspace."
                >
                  <Toggle
                    enabled={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                </SettingCard>

                <SettingCard
                  icon={Sparkles}
                  title="Product updates"
                  description="Receive occasional updates about new Nexus AI features."
                >
                  <Toggle
                    enabled={emailUpdates}
                    onChange={() => setEmailUpdates(!emailUpdates)}
                  />
                </SettingCard>
              </div>
            </section>

            {/* Security */}
            <section>
              <div className="flex items-center gap-2 px-1 mb-3">
                <Shield size={15} className="text-zinc-400" />
                <h2 className="text-sm font-semibold text-white">Security & privacy</h2>
              </div>

              <div className="space-y-2.5">
                <SettingCard
                  icon={Lock}
                  title="Password & authentication"
                  description="Manage your password and available sign-in methods."
                  onClick={() => {}}
                />

                <SettingCard
                  icon={KeyRound}
                  title="Two-factor authentication"
                  description="Add an additional layer of protection to your account."
                  onClick={() => {}}
                >
                  <span className="text-[10px] text-zinc-600 px-2 py-1 rounded-lg border border-white/[0.05]">
                    Not enabled
                  </span>
                </SettingCard>

                <SettingCard
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
            <div className="rounded-3xl border border-red-500/15 bg-gradient-to-br from-red-950/25 via-[#0b0b0b] to-pink-950/10 p-5 sm:p-6 shadow-[0_25px_70px_-35px_rgba(244,63,94,0.45)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center shadow-[0_0_25px_-8px_rgba(244,63,94,0.9)]">
                  <NexusLogo size={22} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Workspace</p>
                  <p className="text-sm font-semibold text-white">Nexus AI</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/[0.06] bg-black/20 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-600">Plan</span>
                  <span className="text-xs font-medium text-red-400">Free</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-zinc-600">Response mode</span>
                  <span className="text-xs text-zinc-300">{responseMode}</span>
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
            <div className="rounded-3xl border border-white/[0.07] bg-[#090909]/90 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-semibold px-2 mb-2">
                Account
              </p>

              <button
                onClick={() => navigate('/profile')}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-white/[0.04] transition"
              >
                <User size={16} className="text-zinc-500" />
                <span className="text-xs text-zinc-300">Profile</span>
                <ChevronRight size={14} className="ml-auto text-zinc-700" />
              </button>

              <button
                onClick={() => navigate('/pricing')}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-white/[0.04] transition"
              >
                <Zap size={16} className="text-zinc-500" />
                <span className="text-xs text-zinc-300">Billing & plan</span>
                <ChevronRight size={14} className="ml-auto text-zinc-700" />
              </button>
            </div>

            {/* Danger zone */}
            <div className="rounded-3xl border border-red-500/10 bg-red-500/[0.02] p-5">
              <div className="flex items-center gap-2">
                <Trash2 size={15} className="text-red-500" />
                <h3 className="text-sm font-semibold text-zinc-200">Danger zone</h3>
              </div>
              <p className="text-[11px] leading-5 text-zinc-600 mt-2">
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
          <p className="text-[10px] text-zinc-700">
            Your settings are saved automatically
          </p>
        </div>
      </main>
    </div>
  );
}
