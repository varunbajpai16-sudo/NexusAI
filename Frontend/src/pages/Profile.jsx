import React, { useState } from 'react';
import { useNavigate } from 'react-router';
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
  User,
  Zap,
} from 'lucide-react';
import { NexusLogo } from '../components/Nexus_Logo';

const SettingRow = ({
  icon: Icon,
  title,
  description,
  right,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.045] hover:border-white/[0.1] transition-all text-left"
  >
    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
      <Icon size={17} className="text-zinc-400" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-zinc-200">{title}</p>
      <p className="text-xs text-zinc-600 mt-1">{description}</p>
    </div>

    {right || <ChevronRight size={16} className="text-zinc-700 shrink-0" />}
  </button>
);

export default function NexusProfilePage() {
  const navigate = useNavigate();

  const [name, setName] = useState('Varun');
  const [email] = useState('varun@example.com');
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const saveProfile = () => {
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30 selection:text-red-200">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-56 left-[25%] w-[650px] h-[450px] rounded-full bg-red-600/[0.045] blur-[150px]" />
        <div className="absolute -bottom-64 right-[10%] w-[600px] h-[450px] rounded-full bg-pink-600/[0.035] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.018] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 h-16 sm:h-[72px] border-b border-white/[0.06] bg-black/75 backdrop-blur-2xl">
        <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
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

      {/* Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 lg:py-12">
        <div className="mb-7 sm:mb-9">
          <p className="text-[10px] uppercase tracking-[0.22em] text-red-400/70 font-semibold mb-2">
            Account
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Profile & settings
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Manage your Nexus AI identity, preferences and subscription.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_330px] gap-5 lg:gap-6 items-start">
          {/* Main profile */}
          <section className="space-y-5">
            <div className="rounded-3xl border border-white/[0.07] bg-[#090909]/90 backdrop-blur-xl overflow-hidden shadow-[0_30px_90px_-45px_rgba(244,63,94,0.25)]">
              <div className="h-24 sm:h-32 bg-gradient-to-r from-red-950/60 via-black to-pink-950/30 border-b border-white/[0.06] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(239,68,68,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.12),transparent_35%)]" />
              </div>

              <div className="px-4 sm:px-6 pb-6">
                <div className="-mt-10 sm:-mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="flex items-end gap-3 sm:gap-4">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-red-600 to-pink-600 p-[2px] shadow-[0_0_35px_-10px_rgba(244,63,94,0.9)]">
                        <div className="w-full h-full rounded-[22px] bg-[#0a0a0a] flex items-center justify-center">
                          <User size={34} className="text-zinc-300" />
                        </div>
                      </div>
                      <button
                        className="absolute -right-1 -bottom-1 w-8 h-8 rounded-xl bg-[#111] border border-white/[0.1] flex items-center justify-center text-zinc-400 hover:text-white transition"
                        title="Change avatar"
                      >
                        <Edit3 size={13} />
                      </button>
                    </div>

                    <div className="pb-1 min-w-0">
                      <h2 className="text-xl font-semibold text-white truncate">
                        {name}
                      </h2>
                      <p className="text-xs text-zinc-600 mt-1">Nexus AI member</p>
                    </div>
                  </div>

                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="self-start sm:self-auto flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.035] text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.07] transition"
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
                    <label className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 font-semibold">
                      Display name
                    </label>
                    {editing ? (
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full h-11 rounded-xl border border-red-500/20 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-red-500/40"
                      />
                    ) : (
                      <div className="mt-2 h-11 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 flex items-center text-sm text-zinc-300">
                        {name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 font-semibold">
                      Email address
                    </label>
                    <div className="mt-2 h-11 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 flex items-center gap-2 text-sm text-zinc-500">
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
                <h3 className="text-sm font-semibold text-white">Preferences</h3>
              </div>

              <div className="space-y-2.5">
                <SettingRow
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
                        notifications ? 'bg-red-500' : 'bg-white/[0.12]'
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
                  icon={Moon}
                  title="Appearance"
                  description="Nexus is currently using the dark workspace theme."
                  right={
                    <span className="text-[11px] text-zinc-500 px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.025]">
                      {darkMode ? 'Dark' : 'Light'}
                    </span>
                  }
                  onClick={() => setDarkMode(!darkMode)}
                />

                <SettingRow
                  icon={Globe}
                  title="Language"
                  description="Choose the language used across your workspace."
                  right={
                    <span className="text-[11px] text-zinc-500">English</span>
                  }
                />
              </div>
            </div>

            {/* Security */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Shield size={15} className="text-pink-400" />
                <h3 className="text-sm font-semibold text-white">Security</h3>
              </div>

              <div className="space-y-2.5">
                <SettingRow
                  icon={KeyRound}
                  title="Password & authentication"
                  description="Manage your password and sign-in methods."
                />

                <SettingRow
                  icon={Shield}
                  title="Two-factor authentication"
                  description="Add an extra layer of security to your account."
                  right={
                    <span className="text-[10px] text-zinc-600 px-2 py-1 rounded-md border border-white/[0.05]">
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
            <div className="rounded-3xl border border-red-500/15 bg-gradient-to-br from-red-950/25 via-[#0b0b0b] to-pink-950/10 p-5 sm:p-6 shadow-[0_25px_70px_-35px_rgba(244,63,94,0.45)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                    <Zap size={16} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Current plan</p>
                    <p className="text-sm font-semibold text-white">Free</p>
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/15 px-2 py-1 rounded-lg">
                  Active
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600">AI messages</span>
                  <span className="text-zinc-300">72 / 100</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
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
            <div className="rounded-3xl border border-white/[0.07] bg-[#090909]/90 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles size={15} className="text-red-400" />
                <h3 className="text-sm font-semibold text-white">Workspace activity</h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3">
                  <p className="text-[10px] text-zinc-600">Conversations</p>
                  <p className="text-xl font-semibold text-white mt-1">24</p>
                </div>
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3">
                  <p className="text-[10px] text-zinc-600">Agents used</p>
                  <p className="text-xl font-semibold text-white mt-1">86</p>
                </div>
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3">
                  <p className="text-[10px] text-zinc-600">Files analyzed</p>
                  <p className="text-xl font-semibold text-white mt-1">12</p>
                </div>
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3">
                  <p className="text-[10px] text-zinc-600">Days active</p>
                  <p className="text-xl font-semibold text-white mt-1">18</p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#090909]/90 p-4">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition">
                <CreditCard size={16} />
                Billing & invoices
                <ChevronRight size={15} className="ml-auto text-zinc-700" />
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-sm text-red-400 hover:bg-red-500/[0.05] transition">
                <LogOut size={16} />
                Sign out
                <ChevronRight size={15} className="ml-auto text-red-500/40" />
              </button>
            </div>
          </aside>
        </div>

        <p className="text-center text-[10px] text-zinc-700 mt-8 sm:mt-10">
          Nexus AI · Your multi-agent AI workspace
        </p>
      </main>
    </div>
  );
}
