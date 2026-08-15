import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { FaChrome } from 'react-icons/fa';
import { NexusLogo } from "../components/Nexus_Logo";
import { toggleDarkMode } from "../features/Toggle/Toggle_slice";

// ─── Theme ────────────────────────────────────────────────────────────

const getTheme = (dark) => ({
  dark,

  pageBg: dark ? "bg-black" : "bg-zinc-50",
  pageText: dark ? "text-white" : "text-zinc-900",

  cardBg: dark ? "bg-white/[0.035]" : "bg-white",
  inputBg: dark ? "bg-black/40" : "bg-black/[0.03]",
  socialBg: dark ? "bg-white/[0.04]" : "bg-black/[0.03]",
  socialHoverBg: dark ? "hover:bg-white/[0.07]" : "hover:bg-black/[0.06]",
  chipBg: dark ? "bg-white/[0.03]" : "bg-black/[0.03]",

  border: dark ? "border-white/[0.08]" : "border-zinc-200",
  borderSoft: dark ? "border-white/10" : "border-zinc-200",
  borderInput: dark ? "border-white/[0.08]" : "border-zinc-300",
  dividerLine: dark ? "bg-white/[0.08]" : "bg-zinc-200",

  text: dark ? "text-white" : "text-zinc-900",
  text300: dark ? "text-zinc-300" : "text-zinc-700",
  text500: dark ? "text-zinc-500" : "text-zinc-500",
  text600: dark ? "text-zinc-600" : "text-zinc-400",
  text700: dark ? "text-zinc-700" : "text-zinc-400",

  placeholder: dark ? "placeholder:text-zinc-700" : "placeholder:text-zinc-400",

  gridLine: dark
    ? "bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]"
    : "bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)]",

  radialMask: dark
    ? "bg-[radial-gradient(circle_at_center,transparent_20%,black_80%)]"
    : "bg-[radial-gradient(circle_at_center,transparent_20%,#fafafa_80%)]",
});

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.toggle.darkMode);
  const theme = getTheme(darkMode);
  const handleToggleTheme = () => dispatch(toggleDarkMode());

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Add your registration API here
    console.log(form);
  };

  return (
    <div className={`min-h-screen ${theme.pageBg} ${theme.pageText} relative overflow-hidden flex items-center justify-center px-4 py-10`}>

      {/* Background */}
      <div className={`absolute inset-0 ${theme.pageBg}`} />

      <div className="absolute top-[-220px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-red-600/10 blur-[160px]" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[150px]" />

      <div className={`absolute inset-0 opacity-40 ${theme.gridLine} bg-[size:60px_60px]`} />

      <div className={`absolute inset-0 ${theme.radialMask}`} />

      {/* Theme toggle */}
      <button
        onClick={handleToggleTheme}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className={`absolute top-6 right-6 z-20 w-10 h-10 rounded-xl border ${theme.borderSoft} ${theme.chipBg} flex items-center justify-center ${theme.text500} hover:${theme.dark ? 'text-white' : 'text-zinc-900'} transition`}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className={`absolute top-6 left-6 z-20 flex items-center gap-2 text-sm ${theme.text500} hover:${theme.dark ? 'text-white' : 'text-zinc-900'} transition`}
      >
        <ArrowRight className="rotate-180" size={16} />
        Back to home
      </button>

      {/* Container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-7">

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${theme.dark ? 'from-zinc-950 via-black to-red-950/50' : 'from-zinc-100 via-white to-red-100'} border border-red-500/25 flex items-center justify-center shadow-[0_0_25px_-5px_rgba(244,63,94,0.5)]`}>
              <NexusLogo size={28} />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Create your account
          </h1>

          <p className={theme.text500}>
            Start solving complex problems with your AI team
          </p>
        </div>

        {/* Card */}
        <div className={`relative rounded-3xl border ${theme.border} ${theme.cardBg} backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_80px_-30px_rgba(220,38,38,0.25)]`}>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

          {/* Google */}
          <button
            type="button"
            className={`w-full h-12 rounded-xl border ${theme.borderSoft} ${theme.socialBg} ${theme.socialHoverBg} hover:${theme.dark ? 'border-white/20' : 'border-zinc-300'} transition flex items-center justify-center gap-3 text-sm font-medium`}
          >
            <FaChrome size={18} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className={`h-px flex-1 ${theme.dividerLine}`} />

            <span className={`text-xs ${theme.text600} uppercase tracking-wider`}>
              or
            </span>

            <div className={`h-px flex-1 ${theme.dividerLine}`} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className={`block text-sm font-medium ${theme.text300} mb-2`}>
                Full name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text600}`}
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={`w-full h-12 rounded-xl ${theme.inputBg} border ${theme.borderInput} pl-11 pr-4 text-sm ${theme.text} ${theme.placeholder} outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium ${theme.text300} mb-2`}>
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text600}`}
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={`w-full h-12 rounded-xl ${theme.inputBg} border ${theme.borderInput} pl-11 pr-4 text-sm ${theme.text} ${theme.placeholder} outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium ${theme.text300} mb-2`}>
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text600}`}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className={`w-full h-12 rounded-xl ${theme.inputBg} border ${theme.borderInput} pl-11 pr-12 text-sm ${theme.text} ${theme.placeholder} outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.text600} hover:${theme.text300}`}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block text-sm font-medium ${theme.text300} mb-2`}>
                Confirm password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text600}`}
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className={`w-full h-12 rounded-xl ${theme.inputBg} border ${theme.borderInput} pl-11 pr-12 text-sm ${theme.text} ${theme.placeholder} outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.text600} hover:${theme.text300}`}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 pt-1 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 accent-red-500"
              />

              <span className={`text-xs leading-relaxed ${theme.text500}`}>
                I agree to the{" "}
                <span className={`${theme.text300} hover:${theme.dark ? 'text-white' : 'text-zinc-900'}`}>
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className={`${theme.text300} hover:${theme.dark ? 'text-white' : 'text-zinc-900'}`}>
                  Privacy Policy
                </span>
              </span>
            </label>

            {/* Button */}
            <button
              type="submit"
              className="group w-full h-12 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_-8px_rgba(220,38,38,0.7)] hover:shadow-[0_0_40px_-5px_rgba(220,38,38,0.8)] transition-all duration-300 mt-2"
            >
              Create account
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Login */}
          <p className={`text-center text-sm ${theme.text500} mt-6`}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-red-400 hover:text-red-300 font-medium transition"
            >
              Sign in
            </button>
          </p>
        </div>

        <div className={`flex items-center justify-center gap-2 mt-5 text-xs ${theme.text600}`}>
          <ShieldCheck size={14} />
          Secure authentication powered by Nexus AI
        </div>
      </div>
    </div>
  );
};

export default Register;