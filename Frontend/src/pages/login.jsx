import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { Moon, ShieldCheck, Sun } from 'lucide-react';
import { FaChrome } from 'react-icons/fa';
import { NexusLogo } from '../components/Nexus_Logo';
import { toggleDarkMode } from '../features/Toggle/Toggle_slice';

// ─── Theme ────────────────────────────────────────────────────────────

const getTheme = (dark) => ({
  dark,

  pageBg: dark ? 'bg-black' : 'bg-zinc-50',
  pageText: dark ? 'text-white' : 'text-zinc-900',

  cardBg: dark ? 'bg-white/[0.035]' : 'bg-white',
  socialBg: dark ? 'bg-white/[0.04]' : 'bg-black/[0.03]',
  socialHoverBg: dark ? 'hover:bg-white/[0.07]' : 'hover:bg-black/[0.06]',
  chipBg: dark ? 'bg-white/[0.03]' : 'bg-black/[0.03]',

  border: dark ? 'border-white/[0.08]' : 'border-zinc-200',
  borderSoft: dark ? 'border-white/10' : 'border-zinc-200',

  text500: dark ? 'text-zinc-500' : 'text-zinc-500',
  text600: dark ? 'text-zinc-600' : 'text-zinc-400',

  gridLine: dark
    ? 'bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]'
    : 'bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)]',

  radialMask: dark
    ? 'bg-[radial-gradient(circle_at_center,transparent_20%,black_80%)]'
    : 'bg-[radial-gradient(circle_at_center,transparent_20%,#fafafa_80%)]',
});

const Login = () => {
  const navigate = useNavigate();
  const googlelogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('Google Access Token:', tokenResponse.access_token);
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        const user = await res.json();
        localStorage.setItem(
          'nexus_user',
          JSON.stringify({
            name: user.name,
            email: user.email,
            picture: user.picture,
          }),
        );
        console.log('Google User:', user);
        navigate("/")
      } catch (error) {
        console.error('Failed to get user:', error);
      }
    },

    onError: (error) => {
      console.error('Google Login Error:', error);
    },
  });
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.toggle.darkMode);
  const theme = getTheme(darkMode);

  const handleToggleTheme = () => dispatch(toggleDarkMode());

  // Google authentication handler
  const handleGoogleLogin = () => {
    // Add your Google authentication logic here
    console.log('Continue with Google');
  };

  return (
    <div
      className={`min-h-screen ${theme.pageBg} ${theme.pageText} relative overflow-hidden flex items-center justify-center px-4 py-10`}
    >
      {/* Background */}
      <div className={`absolute inset-0 ${theme.pageBg}`} />

      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />

      <div className="absolute bottom-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full bg-pink-600/8 blur-[140px]" />

      <div
        className={`absolute inset-0 opacity-40 ${theme.gridLine} bg-[size:60px_60px]`}
      />

      <div className={`absolute inset-0 ${theme.radialMask}`} />

      {/* Theme toggle */}
      <button
        onClick={handleToggleTheme}
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`absolute top-6 right-6 z-20 w-10 h-10 rounded-xl border ${theme.borderSoft} ${theme.chipBg} flex items-center justify-center ${theme.text500} transition`}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Main */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2.5 mb-7"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${
                theme.dark
                  ? 'from-zinc-950 via-black to-red-950/50'
                  : 'from-zinc-100 via-white to-red-100'
              } border border-red-500/25 flex items-center justify-center shadow-[0_0_25px_-5px_rgba(244,63,94,0.5)]`}
            >
              <NexusLogo size={28} />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome back</h1>

          <p className={theme.text500}>
            Sign in to continue to your AI workspace
          </p>
        </div>

        {/* Card */}
        <div
          className={`relative rounded-3xl border ${theme.border} ${theme.cardBg} backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_80px_-30px_rgba(220,38,38,0.25)]`}
        >
          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

          {/* Google Login */}
          <button
            type="button"
            onClick={googlelogin}
            className={`w-full h-12 rounded-xl border ${theme.borderSoft} ${theme.socialBg} ${theme.socialHoverBg} transition flex items-center justify-center gap-3 text-sm font-medium hover:border-zinc-300`}
          >
            <FaChrome size={18} />
            Continue with Google
          </button>

          {/* Security message */}
          <div
            className={`flex items-center justify-center gap-2 mt-7 text-xs ${theme.text600}`}
          >
            <ShieldCheck size={14} />
            Secure authentication powered by Google
          </div>
        </div>

        {/* Footer */}
        <p className={`text-center text-xs ${theme.text600} mt-6`}>
          By continuing, you agree to NexusAI's terms and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
