import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Mic, MicOff, Phone, Sparkles, Volume2, Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NexusLogo } from '../components/Nexus_Logo';

export default function NexusVoicePage() {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [connected, setConnected] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Tap the microphone to start');
  const [volume, setVolume] = useState(62);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
      setStatus('Listening...');
    };

    recognition.onresult = (event) => {
      let text = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognition.onerror = () => {
      setListening(false);
      setStatus('Voice input unavailable');
    };

    recognition.onend = () => {
      if (listening) {
        setListening(false);
        setStatus('Tap the microphone to continue');
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleListening = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      setStatus('Your browser does not support voice input');
      return;
    }

    if (listening) {
      recognition.stop();
      setListening(false);
      setStatus('Paused');
    } else {
      try {
        recognition.start();
        setConnected(true);
      } catch {
        setStatus('Microphone is already active');
      }
    }
  };

  const endSession = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setConnected(false);
    setTranscript('');
    setStatus('Tap the microphone to start');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Ambient void */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[520px] h-[520px] rounded-full bg-red-600/[0.08] blur-[140px]" />

        <div className="absolute left-[20%] top-[20%] w-2 h-2 rounded-full
          bg-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.8)]" />

        <div className="absolute right-[18%] top-[32%] w-1.5 h-1.5 rounded-full
          bg-red-400/40 shadow-[0_0_15px_rgba(248,113,113,0.8)]" />

        <div className="absolute inset-0 opacity-[0.025]
          bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          bg-[size:55px_55px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 h-16 md:h-[72px] px-4 md:px-6
        border-b border-white/[0.06] bg-black/60 backdrop-blur-xl
        flex items-center justify-between">

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-3 py-2 rounded-xl
            border border-white/[0.08] bg-white/[0.03]
            hover:bg-white/[0.07] transition"
        >
          <ArrowLeft size={16} />
          <span className="text-xs sm:text-sm">Back to Chat</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br
            from-zinc-950 via-black to-red-950/70 border border-red-500/25
            flex items-center justify-center">
            <NexusLogo size={21} />
          </div>

          <span className="font-semibold tracking-tight">
            Nexus<span className="text-red-500">AI</span>
          </span>

          <span className="hidden sm:block text-[9px] tracking-[0.2em]
            uppercase px-2 py-1 rounded-full bg-pink-500/10
            text-pink-400 border border-pink-500/20">
            Voice
          </span>
        </div>

        <button
          className="w-9 h-9 rounded-xl border border-white/[0.08]
            bg-white/[0.03] flex items-center justify-center
            text-zinc-500 hover:text-white hover:bg-white/[0.07] transition"
          title="Voice settings"
        >
          <Settings2 size={16} />
        </button>
      </header>

      {/* Main */}
      <main className="relative z-10 min-h-[calc(100vh-72px)]
        flex flex-col items-center justify-center px-5 py-8">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={13} className="text-red-400" />
            <span className="text-[10px] uppercase tracking-[0.28em]
              text-zinc-600">
              Nexus Voice
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Talk to{' '}
            <span className="bg-gradient-to-r from-red-500 via-pink-500
              to-rose-400 bg-clip-text text-transparent">
              Nexus
            </span>
          </h1>

          <p className="text-sm text-zinc-500 mt-3">
            Speak naturally. Nexus is listening.
          </p>
        </div>

        {/* Voice Orb */}
        <div className="relative flex items-center justify-center
          w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]">

          {listening && (
            <>
              <div className="absolute inset-3 rounded-full border
                border-red-500/10 animate-ping" />
              <div className="absolute inset-8 rounded-full border
                border-pink-500/10 animate-pulse" />
              <div className="absolute inset-0 rounded-full
                bg-red-500/[0.04] blur-2xl animate-pulse" />
            </>
          )}

          <div className={`absolute inset-[28px] sm:inset-[38px]
            rounded-full border transition-all duration-500
            ${listening
              ? 'border-red-500/40 shadow-[0_0_100px_-15px_rgba(244,63,94,0.95)]'
              : 'border-white/[0.08] shadow-[0_0_70px_-30px_rgba(244,63,94,0.7)]'
            }
            bg-gradient-to-br from-zinc-950 via-black to-red-950/40`}
          />

          {/* Audio rings */}
          <div className="absolute inset-[52px] sm:inset-[68px] rounded-full
            border border-red-500/20" />

          <div className="absolute inset-[67px] sm:inset-[84px] rounded-full
            border border-pink-500/10" />

          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28
            rounded-[30px] bg-gradient-to-br from-red-600/20
            to-pink-600/10 border border-red-500/25
            flex items-center justify-center
            shadow-[0_0_60px_-15px_rgba(244,63,94,0.9)]">

            <NexusLogo size={64} />

          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mt-2 mb-5">
          <span className={`w-2 h-2 rounded-full ${
            listening ? 'bg-red-400 animate-pulse' : 'bg-zinc-700'
          }`} />
          <span className="text-xs text-zinc-500">{status}</span>
        </div>

        {/* Transcript */}
        <div className="w-full max-w-xl min-h-[58px] mb-6 text-center">
          {transcript ? (
            <p className="text-sm sm:text-base text-zinc-300 leading-6">
              “{transcript}”
            </p>
          ) : (
            <p className="text-xs text-zinc-700">
              Your conversation will appear here
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleListening}
            className={`group w-16 h-16 sm:w-[72px] sm:h-[72px]
              rounded-full flex items-center justify-center
              border transition-all duration-300
              ${listening
                ? 'bg-red-500 border-red-400 shadow-[0_0_45px_-8px_rgba(244,63,94,0.9)]'
                : 'bg-white/[0.05] border-white/10 hover:border-red-500/40 hover:bg-red-500/10'
              }`}
            title={listening ? 'Stop listening' : 'Start listening'}
          >
            {listening
              ? <MicOff size={25} />
              : <Mic size={25} className="text-red-400 group-hover:scale-110 transition" />
            }
          </button>

          {connected && (
            <button
              onClick={endSession}
              className="w-12 h-12 rounded-full bg-white/[0.04]
                border border-white/[0.08] text-zinc-500
                hover:bg-red-500/10 hover:text-red-400
                hover:border-red-500/20 transition"
              title="End voice session"
            >
              <Phone size={18} className="mx-auto rotate-[135deg]" />
            </button>
          )}
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mt-8 w-full max-w-xs">
          <Volume2 size={14} className="text-zinc-600 shrink-0" />

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-red-500"
          />

          <span className="text-[10px] text-zinc-700 w-7">
            {volume}%
          </span>
        </div>

        <p className="text-[10px] text-zinc-700 mt-6">
          Nexus AI Voice • Speak naturally and pause when you're done
        </p>
      </main>
    </div>
  );
}
