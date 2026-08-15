import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  Edit3,
  Globe,
  KeyRound,
  LogOut,
  Mail,
  Moon,
  Settings2,
  Shield,
  Sparkles,
  Sun,
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
  panelBg: dark ? 'bg-[#090909]/90' : 'bg-white/95',
  bannerBg: dark
    ? 'bg-gradient-to-r from-red-950/60 via-black to-pink-950/30'
    : 'bg-gradient-to-r from-red-100 via-white to-pink-100',
  avatarInnerBg: dark ? 'bg-[#0a0a0a]' : 'bg-zinc-100',
  avatarEditBg: dark ? 'bg-[#111]' : 'bg-white',
  fieldBg: dark ? 'bg-white/[0.02]' : 'bg-black/[0.02]',
  fieldEditingBg: dark ? 'bg-white/[0.03]' : 'bg-white',
  editBtnBg: dark ? 'bg-white/[0.035]' : 'bg-black/[0.03]',
  editBtnHoverBg: dark ? 'hover:bg-white/[0.07]' : 'hover:bg-black/[0.06]',
  sidebarGradientBg: dark
    ? 'bg-gradient-to-br from-red-950/25 via-[#0b0b0b] to-pink-950/10'
    : 'bg-gradient-to-br from-red-100/60 via-white to-pink-100/40',
  statCardBg: dark ? 'bg-white/[0.02]' : 'bg-black/[0.02]',
  progressTrackBg: dark ? 'bg-white/[0.06]' : 'bg-black/[0.08]',
  modeChipBg: dark ? 'bg-white/[0.025]' : 'bg-black/[0.025]',

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
  toggleOff: dark ? 'bg-white/[0.12]' : 'bg-black/[0.14]',

  gridLine: dark
    ? 'bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] opacity-[0.018]'
    : 'bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] opacity-[0.03]',
});

const SettingRow = ({
  icon: Icon,
  title,
  description,
  right,
  onClick,
  theme,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border ${theme.border} ${theme.cardBg} ${theme.cardBgHover} ${theme.borderHover} transition-all text-left`}
  >
    <div className={`shrink-0 w-10 h-10 rounded-xl ${theme.chipBg} border ${theme.border} flex items-center justify-center`}>
      <Icon size={17} className={theme.text400} />
    </div>

    <div className="min-w-0 flex-1">
      <p className={`text-sm font-medium ${theme.text200}`}>{title}</p>
      <p className={`text-xs ${theme.text600} mt-1`}>{description}</p>
    </div>

    {right || <ChevronRight size={16} className={`${theme.text700} shrink-0`} />}
  </button>
);

export default function NexusProfilePage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.toggle.darkMode);
  const theme = getTheme(darkMode);
  const handleToggleTheme = () => dispatch(toggleDarkMode());

  const [name, setName] = useState('Varun');
  const [email] = useState('varun@example.com');
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const saveProfile = () => {
    setEditing(false);
  };

  return (
    <div className={`min-h-screen ${theme.pageBg} ${theme.pageText} selection:bg-red-500/30 selection:text-red-200`}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-56 left-[25%] w-[650px] h-[450px] rounded-full bg-red-600/[0.045] blur-[150px]" />
        <div className="absolute -bottom-64 right-[10%] w-[600px] h-[450px] rounded-full bg-pink-600/[0.035] blur-[150px]" />
        <div className={`absolute inset-0 ${theme.gridLine} bg-[size:60px_60px]`} />
      </div>

      {/* Header */}
      <header className={`relative z-10 h-16 sm:h-[72px] border-b ${theme.border} ${theme.headerBg} backdrop-blur-2xl`}>
        <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
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

      {/* Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 lg:py-12">
        <div className="mb-7 sm:mb-9">
          <p className="text-[10px] uppercase tracking-[0.22em] text-red-400/70 font-semibold mb-2">
            Account
          </p>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme.text}`}>
            Profile & settings
          </h1>
          <p className={`text-sm ${theme.text500} mt-2`}>
            Manage your Nexus AI identity, preferences and subscription.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_330px] gap-5 lg:gap-6 items-start">
          {/* Main profile */}
          <section className="space-y-5">
            <div className={`rounded-3xl border ${theme.borderSoft} ${theme.panelBg} backdrop-blur-xl overflow-hidden shadow-[0_30px_90px_-45px_rgba(244,63,94,0.25)]`}>
              <div className={`h-24 sm:h-32 ${theme.bannerBg} border-b ${theme.border} relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(239,68,68,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.12),transparent_35%)]" />
              </div>

              <div className="px-4 sm:px-6 pb-6">
                <div className="-mt-10 sm:-mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="flex items-end gap-3 sm:gap-4">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-red-600 to-pink-600 p-[2px] shadow-[0_0_35px_-10px_rgba(244,63,94,0.9)]">
                        <div className={`w-full h-full rounded-[22px] ${theme.avatarInnerBg} flex items-center justify-center`}>
                          <User size={34} className={theme.text300} />
                        </div>
                      </div>
                      <button
                        className={`absolute -right-1 -bottom-1 w-8 h-8 rounded-xl ${theme.avatarEditBg} border ${theme.borderSoft} flex items-center justify-center ${theme.text400} ${theme.hoverText} transition`}
                        title="Change avatar"
                      >
                        <Edit3 size={13} />
                      </button>
                    </div>

                    <div className="pb-1 min-w-0">
                      <h2 className={`text-xl font-semibold ${theme.text} truncate`}>
                        {name}
                      </h2>
                      <p className={`text-xs ${theme.text600} mt-1`}>Nexus AI member</p>
                    </div>
                  </div>

                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className={`self-start sm:self-auto flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border ${theme.borderSoft} ${theme.editBtnBg} text-xs font-medium ${theme.text300} ${theme.hoverText} ${theme.editBtnHoverBg} transition`}
                    >
                      <Edit3 size={14} />
                      Edit profile
                    </button>
                  ) : (
                    <button
                      onClick={saveProfile}
                      className="self-start sm:self-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-xs font-semibold shadow-[0_0_25px_-8px_rgba(244,63,94,0.8)] hover:scale-[1.02] transition"
                    >
                      <Check size={14} />
                      Save changes
                    </button>
                  )}
                </div>

                <div className="mt-7 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[10px] uppercase tracking-[0.16em] ${theme.text600} font-semibold`}>
                      Display name
                    </label>
                    {editing ? (
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`mt-2 w-full h-11 rounded-xl border border-red-500/20 ${theme.fieldEditingBg} px-3 text-sm ${theme.text} outline-none focus:border-red-500/40`}
                      />
                    ) : (
                      <div className={`mt-2 h-11 rounded-xl border ${theme.border} ${theme.fieldBg} px-3 flex items-center text-sm ${theme.text300}`}>
                        {name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={`text-[10px] uppercase tracking-[0.16em] ${theme.text600} font-semibold`}>
                      Email address
                    </label>
                    <div className={`mt-2 h-11 rounded-xl border ${theme.border} ${theme.fieldBg} px-3 flex items-center gap-2 text-sm ${theme.text500}`}>
                      <Mail size={14} />
                      <span className="truncate">{email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Settings2 size={15} className="text-red-400" />
                <h3 className={`text-sm font-semibold ${theme.text}`}>Preferences</h3>
              </div>

              <div className="space-y-2.5">
                <SettingRow
                  theme={theme}
                  icon={Bell}
                  title="Notifications"
                  description="Receive updates about conversations and workspace activity."
                  right={
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNotifications(!notifications);
                      }}
                      className={`w-10 h-6 rounded-full p-1 transition ${
                        notifications ? 'bg-red-500' : theme.toggleOff
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  }
                />

                <SettingRow
                  theme={theme}
                  icon={darkMode ? Moon : Sun}
                  title="Appearance"
                  description={
                    darkMode
                      ? 'Nexus is currently using the dark workspace theme.'
                      : 'Nexus is currently using the light workspace theme.'
                  }
                  right={
                    <span className={`flex items-center gap-1.5 text-[11px] ${theme.text500} px-2.5 py-1 rounded-lg border ${theme.border} ${theme.modeChipBg}`}>
                      {darkMode ? <Moon size={12} /> : <Sun size={12} />}
                      {darkMode ? 'Dark' : 'Light'}
                    </span>
                  }
                  onClick={handleToggleTheme}
                />

                <SettingRow
                  theme={theme}
                  icon={Globe}
                  title="Language"
                  description="Choose the language used across your workspace."
                  right={
                    <span className={`text-[11px] ${theme.text500}`}>English</span>
                  }
                />
              </div>
            </div>

            {/* Security */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Shield size={15} className="text-pink-400" />
                <h3 className={`text-sm font-semibold ${theme.text}`}>Security</h3>
              </div>

              <div className="space-y-2.5">
                <SettingRow
                  theme={theme}
                  icon={KeyRound}
                  title="Password & authentication"
                  description="Manage your password and sign-in methods."
                />

                <SettingRow
                  theme={theme}
                  icon={Shield}
                  title="Two-factor authentication"
                  description="Add an extra layer of security to your account."
                  right={
                    <span className={`text-[10px] ${theme.text600} px-2 py-1 rounded-md border ${theme.borderSubtle}`}>
                      Not enabled
                    </span>
                  }
                />
              </div>
            </div>
          </section>

          {/* Right column */}
          <aside className="space-y-5">
            {/* Plan */}
            <div className={`rounded-3xl border border-red-500/15 ${theme.sidebarGradientBg} p-5 sm:p-6 shadow-[0_25px_70px_-35px_rgba(244,63,94,0.45)]`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                    <Zap size={16} className="text-red-400" />
                  </div>
                  <div>
                    <p className={`text-xs ${theme.text500}`}>Current plan</p>
                    <p className={`text-sm font-semibold ${theme.text}`}>Free</p>
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/15 px-2 py-1 rounded-lg">
                  Active
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className={theme.text600}>AI messages</span>
                  <span className={theme.text300}>72 / 100</span>
                </div>
                <div className={`h-1.5 rounded-full ${theme.progressTrackBg} overflow-hidden`}>
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
                </div>
              </div>

              <button
                onClick={() => navigate('/pricing')}
                className="w-full mt-5 h-10 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-xs font-semibold hover:scale-[1.01] transition shadow-[0_0_25px_-9px_rgba(244,63,94,0.9)]"
              >
                Upgrade plan
              </button>
            </div>

            {/* Account stats */}
            <div className={`rounded-3xl border ${theme.borderSoft} ${theme.panelBg} p-5 sm:p-6`}>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles size={15} className="text-red-400" />
                <h3 className={`text-sm font-semibold ${theme.text}`}>Workspace activity</h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className={`rounded-2xl border ${theme.borderSubtle} ${theme.statCardBg} p-3`}>
                  <p className={`text-[10px] ${theme.text600}`}>Conversations</p>
                  <p className={`text-xl font-semibold ${theme.text} mt-1`}>24</p>
                </div>
                <div className={`rounded-2xl border ${theme.borderSubtle} ${theme.statCardBg} p-3`}>
                  <p className={`text-[10px] ${theme.text600}`}>Agents used</p>
                  <p className={`text-xl font-semibold ${theme.text} mt-1`}>86</p>
                </div>
                <div className={`rounded-2xl border ${theme.borderSubtle} ${theme.statCardBg} p-3`}>
                  <p className={`text-[10px] ${theme.text600}`}>Files analyzed</p>
                  <p className={`text-xl font-semibold ${theme.text} mt-1`}>12</p>
                </div>
                <div className={`rounded-2xl border ${theme.borderSubtle} ${theme.statCardBg} p-3`}>
                  <p className={`text-[10px] ${theme.text600}`}>Days active</p>
                  <p className={`text-xl font-semibold ${theme.text} mt-1`}>18</p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className={`rounded-3xl border ${theme.borderSoft} ${theme.panelBg} p-4`}>
              <button className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm ${theme.text400} ${theme.hoverText} ${theme.hoverBg} transition`}>
                <CreditCard size={16} />
                Billing & invoices
                <ChevronRight size={15} className={`ml-auto ${theme.text700}`} />
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-sm text-red-400 hover:bg-red-500/[0.05] transition">
                <LogOut size={16} />
                Sign out
                <ChevronRight size={15} className="ml-auto text-red-500/40" />
              </button>
            </div>
          </aside>
        </div>

        <p className={`text-center text-[10px] ${theme.text700} mt-8 sm:mt-10`}>
          Nexus AI · Your multi-agent AI workspace
        </p>
      </main>
    </div>
  );
}