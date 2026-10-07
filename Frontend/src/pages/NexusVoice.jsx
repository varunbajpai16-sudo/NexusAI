import React, { useEffect, useRef, useState } from 'react';
import { Sun,Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import {

  ArrowLeft,

  Mic,

  MicOff,

  Volume2,

  VolumeX,

  Sparkles,

  BrainCircuit,

  Settings2,

  Phone,

  Square,
  Waves,
} from 'lucide-react';



import { toggleDarkMode } from '../features/Toggle/Toggle_slice';

import { NexusLogo } from '../components/Nexus_Logo';



// ─────────────────────────────────────────────────────────────

// Gradient Text

// ─────────────────────────────────────────────────────────────



const GradientText = ({ children, className = '' }) => (

  <span

    className={`bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 bg-clip-text text-transparent ${className}`}

  >

    {children}

  </span>

);



// ─────────────────────────────────────────────────────────────

// Theme Toggle

// ─────────────────────────────────────────────────────────────


const ThemeToggle = ({ className = '' }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.toggle.darkMode);
  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      aria-label="Toggle light/dark mode"
      className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border hover:cursor-pointer ${
        darkMode
          ? 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:border-red-500/30'
          : 'bg-black/[0.03] border-black/10 text-zinc-600 hover:text-zinc-900 hover:border-red-500/30'
      } ${className}`}
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};



// ─────────────────────────────────────────────────────────────

// Audio Waveform

// ─────────────────────────────────────────────────────────────



const AudioWaveform = ({ active }) => {

  const bars = Array.from({ length: 34 });



  return (

    <div className="flex items-center justify-center gap-[3px] h-12">

      {bars.map((_, i) => (

        <div

          key={i}

          className={`w-[3px] rounded-full transition-all ${

            active

              ? 'bg-gradient-to-t from-red-600 via-pink-500 to-rose-300'

              : 'bg-zinc-500/30'

          }`}

          style={{

            height: active

              ? `${10 + Math.abs(Math.sin(i * 0.8)) * 28}px`

              : '5px',

            animation: active

              ? `voiceWave ${0.7 + (i % 5) * 0.12}s ease-in-out ${

                  (i % 4) * 0.08

                }s infinite alternate`

              : 'none',

          }}

        />

      ))}

    </div>

  );

};



// ─────────────────────────────────────────────────────────────

// Central Voice Core

// ─────────────────────────────────────────────────────────────



const VoiceCore = ({ listening, speaking }) => {

  const darkMode = useSelector((state) => state.toggle.darkMode);



  return (

    <div className="relative w-[330px] h-[330px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">



      {/* Ambient Glow */}

      <div

        className={`absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full blur-[80px] transition-all duration-1000 ${

          listening

            ? 'bg-red-500/35 scale-125'

            : speaking

              ? 'bg-pink-500/30 scale-110'

              : 'bg-red-600/15'

        }`}

      />



      {/* Outer rotating ring */}

      <div

        className={`absolute inset-4 rounded-full border border-dashed transition-all duration-1000 ${

          listening

            ? 'border-red-500/50 animate-spin-slow'

            : 'border-red-500/15'

        }`}

      />



      {/* Second orbit */}

      <div

        className={`absolute inset-12 rounded-full border transition-all duration-700 ${

          speaking

            ? 'border-pink-500/50 scale-105'

            : 'border-pink-500/10'

        }`}

      />



      {/* Audio ripple rings */}

      <div

        className={`absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-red-500/20 ${

          listening ? 'animate-voice-ripple' : ''

        }`}

      />



      <div

        className={`absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-pink-500/10 ${

          listening ? 'animate-voice-ripple-delayed' : ''

        }`}

      />



      {/* Small orbit dots */}

      <div className="absolute inset-0 animate-spin-slow">

        <span className="absolute top-5 left-1/2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]" />

        <span className="absolute bottom-9 right-12 w-1.5 h-1.5 rounded-full bg-pink-400" />

      </div>



      {/* Main Core */}

      <div

        className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center transition-all duration-700 ${

          listening

            ? 'scale-110'

            : speaking

              ? 'scale-105'

              : 'scale-100'

        }`}

      >

        {/* Core outer glow */}

        <div

          className={`absolute inset-0 rounded-full blur-2xl ${

            listening

              ? 'bg-red-500/50'

              : speaking

                ? 'bg-pink-500/40'

                : 'bg-red-500/20'

          }`}

        />



        {/* Core */}

        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-red-600 via-rose-500 to-pink-600 shadow-[inset_0_0_40px_rgba(255,255,255,0.15),0_0_50px_rgba(239,68,68,0.4)] overflow-hidden">



          {/* Moving light */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.4),transparent_25%)]" />



          {/* Inner wave */}

          <div

            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/20 ${

              listening ? 'animate-ping' : ''

            }`}

          />



          <div className="relative z-10 w-full h-full flex items-center justify-center">

            <BrainCircuit

              size={52}

              strokeWidth={1.5}

              className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"

            />

          </div>

        </div>

      </div>



      {/* Status */}

      <div

        className={`absolute -bottom-2 px-4 py-1.5 rounded-full border backdrop-blur-xl text-xs font-medium ${

          darkMode

            ? 'bg-black/70 border-white/10 text-zinc-300'

            : 'bg-white/80 border-black/10 text-zinc-600'

        }`}

      >

        <span className="flex items-center gap-2">

          <span

            className={`w-1.5 h-1.5 rounded-full ${

              listening

                ? 'bg-red-500 animate-pulse'

                : speaking

                  ? 'bg-pink-500 animate-pulse'

                  : 'bg-zinc-400'

            }`}

          />

          {listening

            ? 'Listening'

            : speaking

              ? 'Nexus is speaking'

              : 'Ready'}

        </span>

      </div>

    </div>

  );

};



// ─────────────────────────────────────────────────────────────

// Voice Agent Page

// ─────────────────────────────────────────────────────────────



export default function VoiceAgent() {

  const navigate = useNavigate();

  const darkMode = useSelector((state) => state.toggle.darkMode);



  const [listening, setListening] = useState(false);

  const [speaking, setSpeaking] = useState(false);

  const [muted, setMuted] = useState(false);

  const [connected, setConnected] = useState(true);



  const [transcript, setTranscript] = useState(

    'Hello! I’m Nexus. What would you like to work on?'

  );



  const [userText, setUserText] = useState('');



  const recognitionRef = useRef(null);



  // ───────────────────────────────────────────────

  // Speech Recognition

  // ───────────────────────────────────────────────



  const startListening = () => {

    if (listening) {

      stopListening();

      return;

    }



    const SpeechRecognition =

      window.SpeechRecognition || window.webkitSpeechRecognition;



    if (!SpeechRecognition) {

      setTranscript(

        'Voice recognition is not supported in this browser. Try Chrome or Edge.'

      );

      return;

    }



    const recognition = new SpeechRecognition();



    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang = 'en-US';



    recognition.onstart = () => {

      setListening(true);

      setSpeaking(false);

      setTranscript('Listening...');

    };



    recognition.onresult = (event) => {

      const result = event.results[event.results.length - 1];

      const text = result[0].transcript;



      setTranscript(text);



      if (result.isFinal) {

        setUserText(text);



        // Demo response.

        setTimeout(() => {

          setListening(false);

          setSpeaking(true);



          const response =

            "I understand. Give me a moment and I'll help you work through that.";



          setTranscript(response);



          if (!muted && 'speechSynthesis' in window) {

            const utterance = new SpeechSynthesisUtterance(response);

            utterance.rate = 0.95;

            utterance.pitch = 1;



            utterance.onend = () => {

              setSpeaking(false);

            };



            window.speechSynthesis.cancel();

            window.speechSynthesis.speak(utterance);

          } else {

            setTimeout(() => setSpeaking(false), 2500);

          }

        }, 600);

      }

    };



    recognition.onerror = () => {

      setListening(false);

      setTranscript('I couldn’t hear that. Please try again.');

    };



    recognition.onend = () => {

      setListening(false);

    };



    recognitionRef.current = recognition;

    recognition.start();

  };



  const stopListening = () => {

    recognitionRef.current?.stop();

    setListening(false);

  };



  const endSession = () => {

    stopListening();



    if ('speechSynthesis' in window) {

      window.speechSynthesis.cancel();

    }



    setSpeaking(false);

    setConnected(false);

    setTranscript('Voice session ended.');

  };



  // ───────────────────────────────────────────────

  // Cleanup

  // ───────────────────────────────────────────────



  useEffect(() => {

    return () => {

      recognitionRef.current?.stop();



      if ('speechSynthesis' in window) {

        window.speechSynthesis.cancel();

      }

    };

  }, []);



  return (

    <div

      className={`min-h-screen overflow-hidden transition-colors duration-500 ${

        darkMode

          ? 'bg-black text-white'

          : 'bg-white text-zinc-900'

      }`}

    >



      {/* ───────────────────────────────────────────

          Background

      ─────────────────────────────────────────── */}



      <div className="fixed inset-0 pointer-events-none">



        <div

          className={`absolute inset-0 ${

            darkMode ? 'bg-black' : 'bg-white'

          }`}

        />



        {/* Red ambient glow */}

        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-red-600/[0.07] blur-[140px]" />



        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-pink-600/[0.04] blur-[130px]" />



        {/* Grid */}

        <div

          className={`absolute inset-0 opacity-60 ${

            darkMode

              ? 'bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]'

              : 'bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)]'

          } bg-[size:50px_50px]`}

        />



        {/* Vignette */}

        <div

          className={`absolute inset-0 ${

            darkMode

              ? 'bg-[radial-gradient(circle_at_center,transparent_20%,black_85%)]'

              : 'bg-[radial-gradient(circle_at_center,transparent_20%,white_85%)]'

          }`}

        />

      </div>



      {/* ───────────────────────────────────────────

          Navbar

      ─────────────────────────────────────────── */}



      <header

        className={`relative z-50 h-16 sm:h-[72px] border-b ${

          darkMode

            ? 'border-white/5 bg-black/40'

            : 'border-black/5 bg-white/50'

        } backdrop-blur-xl`}

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">



          <div className="flex items-center gap-4">



            <button

              onClick={() => navigate('/')}

              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${

                darkMode

                  ? 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'

                  : 'border-black/10 bg-black/[0.03] text-zinc-500 hover:text-zinc-900'

              }`}

            >

              <ArrowLeft size={18} />

            </button>



            <div className="flex items-center gap-2.5">

              <div

                className={`w-9 h-9 rounded-lg flex items-center justify-center border border-red-500/25 ${

                  darkMode

                    ? 'bg-gradient-to-br from-zinc-950 via-black to-red-950/40'

                    : 'bg-gradient-to-br from-zinc-100 via-white to-red-100'

                }`}

              >

                <NexusLogo size={20} />

              </div>



              <span

                className={`font-bold text-lg ${

                  darkMode ? 'text-white' : 'text-zinc-900'

                }`}

              >

                Nexus<span className="text-red-500">AI</span>

              </span>

            </div>



          </div>



          <div className="flex items-center gap-2 sm:gap-3">



            <div

              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${

                darkMode

                  ? 'border-white/10 bg-white/5 text-zinc-400'

                  : 'border-black/10 bg-black/[0.03] text-zinc-500'

              }`}

            >

              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />

              Voice Engine Online

            </div>



            <ThemeToggle />



            <button

              className={`w-10 h-10 rounded-xl border flex items-center justify-center ${

                darkMode

                  ? 'border-white/10 bg-white/5 text-zinc-400'

                  : 'border-black/10 bg-black/[0.03] text-zinc-500'

              }`}

            >

              <Settings2 size={18} />

            </button>



          </div>

        </div>

      </header>



      {/* ───────────────────────────────────────────

          Main

      ─────────────────────────────────────────── */}



      <main className="relative z-10 min-h-[calc(100vh-72px)] flex flex-col">



        {/* Top title */}



        <div className="text-center pt-8 sm:pt-12 px-4">



          <div

            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-4 ${

              darkMode

                ? 'bg-white/5 border-white/10 text-zinc-400'

                : 'bg-black/[0.03] border-black/10 text-zinc-500'

            }`}

          >

            <Sparkles size={13} className="text-red-500" />

            Nexus Voice Intelligence

          </div>



          <h1

            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${

              darkMode ? 'text-white' : 'text-zinc-900'

            }`}

          >

            Talk to your <GradientText>AI Team.</GradientText>

          </h1>



          <p

            className={`mt-3 text-sm sm:text-base ${

              darkMode ? 'text-zinc-500' : 'text-zinc-500'

            }`}

          >

            Speak naturally. Nexus listens, reasons and responds in real-time.

          </p>

        </div>



        {/* ─────────────────────────────────────────

            Voice Core

        ───────────────────────────────────────── */}



        <div className="flex-1 flex flex-col items-center justify-center px-4">



          <VoiceCore

            listening={listening}

            speaking={speaking}

          />



          {/* Transcript */}



          <div className="mt-8 sm:mt-10 w-full max-w-2xl text-center">



            <div

              className={`min-h-[64px] flex items-center justify-center px-5 ${

                darkMode ? 'text-zinc-200' : 'text-zinc-700'

              }`}

            >

              <p

                className={`text-base sm:text-lg leading-relaxed transition-all ${

                  listening || speaking

                    ? 'opacity-100'

                    : 'opacity-80'

                }`}

              >

                {transcript}

              </p>

            </div>



            <div className="mt-3">

              <AudioWaveform active={listening || speaking} />

            </div>



          </div>



          {/* ───────────────────────────────────────

              Controls

          ─────────────────────────────────────── */}



          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4">



            {/* Speaker */}



            <button

              onClick={() => setMuted(!muted)}

              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${

                darkMode

                  ? 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'

                  : 'border-black/10 bg-black/[0.03] text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.06]'

              }`}

            >

              {muted ? (

                <VolumeX size={19} />

              ) : (

                <Volume2 size={19} />

              )}

            </button>



            {/* Main Mic */}



            <button

              onClick={startListening}

              disabled={!connected}

              className={`relative w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-300 ${

                !connected

                  ? 'bg-zinc-500/20 text-zinc-500 cursor-not-allowed'

                  : listening

                    ? 'bg-red-600 text-white shadow-[0_0_45px_rgba(239,68,68,0.55)] scale-105'

                    : 'bg-gradient-to-br from-red-600 to-pink-600 text-white shadow-[0_0_35px_rgba(239,68,68,0.35)] hover:scale-105 hover:shadow-[0_0_50px_rgba(239,68,68,0.5)]'

              }`}

            >

              {listening ? (

                <MicOff size={27} />

              ) : (

                <Mic size={27} />

              )}



              {listening && (

                <span className="absolute inset-[-8px] rounded-full border border-red-500/30 animate-ping" />

              )}

            </button>



            {/* End */}



            <button

              onClick={endSession}

              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${

                darkMode

                  ? 'border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10'

                  : 'border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10'

              }`}

            >

              <Square size={17} fill="currentColor" />

            </button>



          </div>



          <p

            className={`mt-4 text-xs ${

              darkMode ? 'text-zinc-600' : 'text-zinc-400'

            }`}

          >

            {connected

              ? 'Press the microphone and start speaking'

              : 'Session ended — start a new conversation'}

          </p>



        </div>
        {/* ─────────────────────────────────────────
            Premium Footer
        ───────────────────────────────────────── */}

        <footer
          className={`relative z-20 mt-10 border-t ${
            darkMode
              ? 'border-white/[0.06] bg-black/40'
              : 'border-black/[0.06] bg-white/60'
          } backdrop-blur-xl`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-7 sm:py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

                {/* Brand */}
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div
                    className={`relative w-10 h-10 rounded-xl flex items-center justify-center border border-red-500/20 ${
                      darkMode
                        ? 'bg-gradient-to-br from-zinc-950 via-black to-red-950/50'
                        : 'bg-gradient-to-br from-zinc-100 via-white to-red-100'
                    } shadow-[0_0_25px_-8px_rgba(239,68,68,0.5)]`}
                  >
                    <NexusLogo size={21} />
                    <span
                      className={`absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 ${
                        darkMode ? 'border-black' : 'border-white'
                      } shadow-[0_0_8px_rgba(34,197,94,0.7)]`}
                    />
                  </div>

                  <div>
                    <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      Nexus<span className="text-red-500">AI</span>
                    </h3>
                    <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Intelligent voice interface
                    </p>
                  </div>
                </div>

                {/* Engine Status */}
                <div className="flex justify-center">
                  <div
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/[0.025] border-white/[0.07] hover:border-red-500/20'
                        : 'bg-black/[0.02] border-black/[0.07] hover:border-red-500/20'
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-6 h-6 rounded-full bg-emerald-500/10 animate-ping" />
                      <span className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                          Voice Engine
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                          darkMode
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-emerald-500/10 text-emerald-600'
                        }`}>
                          ONLINE
                        </span>
                      </div>
                      <span className={`text-[10px] mt-0.5 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        Real-time neural audio processing
                      </span>
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="flex items-center justify-center md:justify-end gap-1 sm:gap-2">
                  {[
                    { icon: Mic, label: 'Voice' },
                    { icon: BrainCircuit, label: 'Reasoning' },
                    { icon: Waves, label: 'Live Audio' },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg transition-colors ${
                          darkMode
                            ? 'text-zinc-600 hover:text-zinc-300 hover:bg-white/5'
                            : 'text-zinc-400 hover:text-zinc-700 hover:bg-black/[0.04]'
                        }`}
                      >
                        <Icon size={13} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`my-6 h-px ${darkMode ? 'bg-white/[0.05]' : 'bg-black/[0.05]'}`} />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className={`text-[11px] ${darkMode ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  © 2026 Nexus AI. Built for intelligent conversations.
                </p>

                <div className="flex items-center gap-5">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'Chat', path: '/chat' },
                    { label: 'Agents', path: '/agents' },
                  ].map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => navigate(link.path)}
                      className={`text-[11px] transition-colors ${
                        darkMode
                          ? 'text-zinc-600 hover:text-zinc-300'
                          : 'text-zinc-400 hover:text-zinc-700'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}

                  <span className={`hidden sm:block w-px h-3 ${darkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                  <span className={`text-[10px] ${darkMode ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    v1.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>




      </main>

      <style>{`
        @keyframes voiceWave {
          0% {
            transform: scaleY(0.35);
            opacity: 0.45;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes voiceRipple {
          0% {
            transform: scale(0.85);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.55);
            opacity: 0;
          }
          100% {
            transform: scale(1.55);
            opacity: 0;
          }
        }

        @keyframes voiceRippleDelayed {
          0% {
            transform: scale(0.85);
            opacity: 0.5;
          }
          70% {
            transform: scale(1.8);
            opacity: 0;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-voice-ripple {
          animation: voiceRipple 2.2s ease-out infinite;
        }

        .animate-voice-ripple-delayed {
          animation: voiceRippleDelayed 2.2s ease-out 0.8s infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
