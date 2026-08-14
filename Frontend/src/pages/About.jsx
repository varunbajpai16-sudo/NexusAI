import React, { useState } from 'react';
import {
  ArrowRight,
  Brain,
  BrainCircuit,
  Code2,
  Globe,
  Layers3,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { NexusLogo } from '../components/Nexus_Logo';

const agents = [
  [Sparkles, 'Orchestrator', 'Coordinates the right agents for each request.'],
  [Search, 'Research', 'Finds and synthesizes useful information.'],
  [Code2, 'Coding', 'Builds, debugs and reviews code.'],
  [Brain, 'Reasoning', 'Handles complex problems and planning.'],
  [Globe, 'Web', 'Uses current web information when needed.'],
  [Layers3, 'PDF', 'Reads documents and extracts insights.'],
];

const principles = [
  [
    BrainCircuit,
    'One request. Multiple minds.',
    'Nexus breaks complex work into focused tasks and gives each task to the agent best suited for it.',
  ],
  [
    Zap,
    'Built for action.',
    'Move from understanding to execution without manually switching between different AI tools.',
  ],
  [
    ShieldCheck,
    'You stay in control.',
    'Choose the capabilities Nexus can use and keep your workflow transparent.',
  ],
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/agents', label: 'Agents' },
  { href: '/about', label: 'About', active: true },
];

export default function NexusAbout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-red-500/30 selection:text-red-200">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-300px] left-[30%] w-[700px] h-[520px] rounded-full bg-red-600/[0.04] blur-[150px]" />
        <div className="absolute bottom-[-250px] right-[5%] w-[600px] h-[500px] rounded-full bg-pink-600/[0.025] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <nav className="relative z-30 h-[64px] md:h-[72px] border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-5 md:px-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-950 via-black to-red-950/60 border border-red-500/25 flex items-center justify-center shadow-[0_0_25px_-7px_rgba(244,63,94,0.7)]">
              <NexusLogo size={27} />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight truncate">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-500">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <a href="/agents" className="hover:text-white transition">
              Agents
            </a>
            <a href="/about" className="text-white">
              About
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/chat"
              className="hidden xs:flex sm:flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-xs font-semibold shadow-[0_0_25px_-10px_rgba(244,63,94,0.8)] hover:scale-[1.02] transition"
            >
              Try Nexus <ArrowRight size={13} />
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 border-b border-white/[0.06] bg-black/95 backdrop-blur-xl px-4 sm:px-5 py-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm transition ${
                    link.active
                      ? 'text-white bg-white/[0.05]'
                      : 'text-zinc-500 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/chat"
                onClick={() => setMenuOpen(false)}
                className="xs:hidden sm:hidden mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-sm font-semibold"
              >
                Try Nexus <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        <section className="max-w-5xl mx-auto px-4 sm:px-5 md:px-8 pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-24 text-center">
          <div className="flex justify-center mb-6 sm:mb-7">
            <div className="relative">
              <div className="absolute inset-[-30px] rounded-full bg-red-500/10 blur-3xl" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[24px] sm:rounded-[30px] bg-gradient-to-br from-zinc-950 via-[#090909] to-red-950/70 border border-red-500/30 flex items-center justify-center shadow-[0_0_70px_-15px_rgba(244,63,94,0.8)]">
                 <div className="absolute inset-2.5 rounded-[23px] bg-gradient-to-br from-red-600/15 to-pink-600/10" />
                <NexusLogo size={52} className="relative z-10 text-white" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-600">
              About NexusAI
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.1] sm:leading-[1.05] px-1">
            Intelligence should work{' '}
            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
              together.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-5 sm:mt-6 text-sm md:text-base leading-6 sm:leading-7 text-zinc-500 px-2">
            Nexus is a multi-agent AI workspace built to turn a single request
            into coordinated intelligence. Instead of asking one model to do
            everything, Nexus brings specialized agents together around your
            goal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 sm:mt-9 px-2">
            <a
              href="/chat"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-sm font-semibold shadow-[0_0_35px_-12px_rgba(244,63,94,0.8)] hover:scale-[1.02] transition"
            >
              Start with Nexus <ArrowRight size={15} />
            </a>
            <a
              href="/agents"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.025] text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition"
            >
              Explore agents <Layers3 size={15} />
            </a>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-[1fr_1.25fr] gap-4 sm:gap-5">
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7 md:p-9">
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-400">
                The idea
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 tracking-tight">
                One AI shouldn't have to do everything.
              </h2>
              <p className="text-sm leading-6 text-zinc-500 mt-4">
                Research requires different behavior than coding. Coding needs
                different context than document analysis. Complex decisions need
                another layer of reasoning.
              </p>
              <p className="text-sm leading-6 text-zinc-500 mt-4">
                Nexus connects these capabilities into one workspace so you can
                focus on the outcome instead of manually switching between
                tools.
              </p>
              <div className="mt-6 sm:mt-7 flex items-center gap-3">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center text-red-400">
                  <MessageSquare size={17} />
                </div>
                <span className="text-xs text-zinc-400">
                  One conversation. One workspace. A complete AI team.
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.07] bg-[#080808] p-5 sm:p-7 md:p-9 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(244,63,94,0.08),transparent_45%)]" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-700 mb-6 sm:mb-7">
                  How Nexus thinks
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl  bg-gradient-to-br from-red-600/15 to-pink-600/10 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(244,63,94,0.8)]">
                    <NexusLogo size={30} />
                  </div>
                  <div className="w-px h-7 sm:h-8 bg-gradient-to-b from-red-500/50 to-white/10" />
                  <div className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-xs text-red-300 text-center">
                    Nexus Orchestrator
                  </div>
                  <div className="w-px h-7 sm:h-8 bg-gradient-to-b from-red-500/40 to-white/10" />
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {[
                      [Search, 'Research'],
                      [Code2, 'Coding'],
                      [Brain, 'Reasoning'],
                    ].map(([Icon, name]) => (
                      <div
                        key={name}
                        className="p-2 sm:p-3 rounded-xl border border-white/[0.06] bg-white/[0.025] text-center"
                      >
                        <Icon size={16} className="mx-auto text-pink-400" />
                        <p className="text-[9px] sm:text-[10px] text-zinc-500 mt-1.5 sm:mt-2">
                          {name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="w-px h-7 sm:h-8 bg-gradient-to-b from-white/10 to-pink-500/30" />
                  <div className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/[0.06] bg-white/[0.025] text-xs text-zinc-400 text-center">
                    Unified response
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015]">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-16 sm:py-24">
            <div className="max-w-xl mb-10 sm:mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-400">
                Our approach
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-3">
                Designed around the way{' '}
                <span className="text-zinc-500">real work happens.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {principles.map(([Icon, title, description], index) => (
                <div
                  key={title}
                  className="p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-black/30 hover:border-red-500/20 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center text-red-400">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] text-zinc-800">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-200 mt-5 sm:mt-6">
                    {title}
                  </h3>
                  <p className="text-xs leading-5 text-zinc-600 mt-2">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-16 sm:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-400">
                The Nexus team
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-3">
                Specialized by design.
              </h2>
              <p className="text-sm text-zinc-600 mt-3 max-w-xl">
                Each agent has a focused role. Nexus combines them when a task
                needs more than one capability.
              </p>
            </div>
            <a
              href="/agents"
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition shrink-0"
            >
              Explore all agents <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {agents.map(([Icon, name, text]) => (
              <div
                key={name}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-red-500/15 transition"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-red-500/15 to-pink-500/10 border border-red-500/10 flex items-center justify-center text-red-400">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-200">{name}</p>
                  <p className="text-[11px] leading-4 text-zinc-600 mt-1">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-5 md:px-8 pb-16 sm:pb-24">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-500/15 bg-gradient-to-br from-red-500/[0.09] via-white/[0.025] to-pink-500/[0.05] p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute left-1/2 top-[-140px] -translate-x-1/2 w-[450px] h-[300px] rounded-full bg-red-500/[0.08] blur-[100px]" />
            <div className="relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-gradient-to-br from-red-600/15 to-pink-600/10 flex items-center justify-center shadow-[0_0_35px_-10px_rgba(244,63,94,0.8)]">
                <NexusLogo size={24} />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-5 sm:mt-6">
                Stop switching between AI tools.
              </h2>
              <p className="text-sm text-zinc-500 mt-3 max-w-xl mx-auto">
                Bring research, coding, reasoning, web and document intelligence
                into one AI workspace.
              </p>
              <a
                href="/chat"
                className="inline-flex items-center gap-2 mt-6 sm:mt-7 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-sm font-semibold shadow-[0_0_35px_-12px_rgba(244,63,94,0.8)] hover:scale-[1.02] transition"
              >
                Start using Nexus <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="group flex items-center gap-2.5">
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
            <div className="flex items-center gap-6 sm:gap-8 text-sm text-zinc-500">
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
            <p className="text-sm text-zinc-600 text-center">
              © 2026 Nexus AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}