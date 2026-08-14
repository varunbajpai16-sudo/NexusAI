import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FaChrome } from 'react-icons/fa';
import { NexusLogo } from "../components/Nexus_Logo";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your login API here
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />

      <div className="absolute bottom-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full bg-pink-600/8 blur-[140px]" />

      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_80%)]" />

      {/* Back Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition"
      >
        <ArrowRight className="rotate-180" size={16} />
        Back to home
      </button>

      {/* Main */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2.5 mb-7"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-zinc-950 via-black to-red-950/50 border border-red-500/25 flex items-center justify-center shadow-[0_0_25px_-5px_rgba(244,63,94,0.5)]">
              <NexusLogo size={28} />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Welcome back
          </h1>

          <p className="text-zinc-500">
            Sign in to continue to your AI workspace
          </p>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_80px_-30px_rgba(220,38,38,0.25)]">

          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

          {/* Google */}
          <button
            type="button"
            className="w-full h-12 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/20 transition flex items-center justify-center gap-3 text-sm font-medium"
          >
            <FaChrome size={18} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span className="text-xs text-zinc-600 uppercase tracking-wider">
              or
            </span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 rounded-xl bg-black/40 border border-white/[0.08] pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-zinc-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-red-400 hover:text-red-300 transition"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full h-12 rounded-xl bg-black/40 border border-white/[0.08] pl-11 pr-12 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group w-full h-12 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_-8px_rgba(220,38,38,0.7)] hover:shadow-[0_0_40px_-5px_rgba(220,38,38,0.8)] transition-all duration-300"
            >
              Sign in
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-zinc-500 mt-7">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-red-400 hover:text-red-300 font-medium transition"
            >
              Create account
            </button>
          </p>
        </div>

        {/* Security */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-zinc-600">
          <ShieldCheck size={14} />
          Your data is securely encrypted
        </div>

      </div>
    </div>
  );
};

export default Login;