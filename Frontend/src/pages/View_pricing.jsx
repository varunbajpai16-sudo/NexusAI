import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Brain,
  Globe,
  Code2,
  FileText,
  Shield,
} from "lucide-react";
import { NexusLogo } from "../components/Nexus_Logo";

const plans = [
  {
    name: "Free",
    description: "Explore the power of multi-agent AI",
    monthly: 0,
    yearly: 0,
    popular: false,
    button: "Get Started",
    features: [
      "50 AI messages / month",
      "Access to core AI agents",
      "Research Agent",
      "Coding Agent",
      "Basic reasoning",
      "5 MB file uploads",
      "Community support",
    ],
  },
  {
    name: "Pro",
    description: "For developers, researchers and creators",
    monthly: 19,
    yearly: 15,
    popular: true,
    button: "Start Pro",
    features: [
      "Unlimited AI messages",
      "All specialized AI agents",
      "Advanced web research",
      "Deep reasoning",
      "PDF & document analysis",
      "100 MB file uploads",
      "Priority responses",
      "Conversation history",
    ],
  },
  {
    name: "Enterprise",
    description: "Powerful AI collaboration for teams",
    monthly: 49,
    yearly: 39,
    popular: false,
    button: "Contact Sales",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Advanced agent orchestration",
      "500 MB file uploads",
      "Priority agent execution",
      "Usage analytics",
      "Dedicated support",
      "Custom AI workflows",
    ],
  },
];

const agentCapabilities = [
  {
    icon: Sparkles,
    name: "Orchestrator",
    text: "Coordinates your entire AI team",
  },
  {
    icon: Globe,
    name: "Research",
    text: "Live web research and fact finding",
  },
  {
    icon: Code2,
    name: "Coding",
    text: "Build, debug and review code",
  },
  {
    icon: Brain,
    name: "Reasoning",
    text: "Solve complex problems",
  },
  {
    icon: FileText,
    name: "PDF",
    text: "Analyze documents and reports",
  },
];

export default function Pricing() {
    useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  const navigate = useNavigate();
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">

        <div className="
          absolute top-[-250px] left-1/2 -translate-x-1/2
          w-[800px] h-[600px]
          rounded-full bg-red-600/[0.08]
          blur-[160px]
        " />

        <div className="
          absolute bottom-[-250px] right-[-100px]
          w-[600px] h-[500px]
          rounded-full bg-pink-600/[0.06]
          blur-[150px]
        " />

        <div className="
          absolute inset-0 opacity-[0.018]
          bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          bg-[size:60px_60px]
        " />

        <div className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,black_80%)]
        " />
      </div>

      {/* Navbar */}
      <nav className="
        relative z-20
        h-[72px]
        border-b border-white/[0.06]
        bg-black/60 backdrop-blur-xl
      ">
        <div className="
          max-w-7xl mx-auto px-5
          h-full flex items-center justify-between
        ">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group"
          >
            <div className="
              w-9 h-9 rounded-xl
              bg-gradient-to-br from-zinc-950 via-black to-red-950/50
              border border-red-500/25
              flex items-center justify-center
              shadow-[0_0_20px_-5px_rgba(244,63,94,0.5)]
              group-hover:border-pink-500/40
              transition
            ">
              <NexusLogo size={25} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              flex items-center gap-2
              text-sm text-zinc-500
              hover:text-white transition
            "
          >
            <ArrowLeft size={16} />
            Back to home
          </button>

        </div>
      </nav>

      {/* Main */}
      <main className="relative z-10">

        {/* Header */}
        <section className="pt-20 pb-12 px-5">

          <div className="max-w-4xl mx-auto text-center">

            <div className="
              inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              bg-red-500/10
              border border-red-500/20
              text-red-400
              text-xs font-medium
              uppercase tracking-wider
              mb-6
            ">
              <Zap size={13} />
              Simple pricing
            </div>

            <h1 className="
              text-4xl sm:text-5xl md:text-6xl
              font-bold tracking-tight
              leading-tight
            ">
              Choose the right
              <br />
              <span className="
                bg-gradient-to-r
                from-red-500
                via-pink-500
                to-rose-400
                bg-clip-text
                text-transparent
              ">
                AI power for you.
              </span>
            </h1>

            <p className="
              max-w-2xl mx-auto
              mt-6
              text-zinc-500
              text-base md:text-lg
              leading-relaxed
            ">
              Start free and upgrade when you need more power.
              Get access to a complete team of specialized AI agents
              working together.
            </p>

            {/* Billing Toggle */}
            <div className="flex justify-center mt-9">

              <div className="
                flex items-center
                p-1
                rounded-xl
                bg-white/[0.04]
                border border-white/[0.08]
              ">

                <button
                  onClick={() => setYearly(false)}
                  className={`
                    px-5 py-2.5
                    rounded-lg
                    text-sm font-medium
                    transition
                    ${
                      !yearly
                        ? "bg-white/[0.08] text-white shadow-lg"
                        : "text-zinc-500 hover:text-zinc-300"
                    }
                  `}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setYearly(true)}
                  className={`
                    px-5 py-2.5
                    rounded-lg
                    text-sm font-medium
                    transition
                    ${
                      yearly
                        ? "bg-white/[0.08] text-white shadow-lg"
                        : "text-zinc-500 hover:text-zinc-300"
                    }
                  `}
                >
                  Yearly
                  <span className="ml-2 text-[10px] text-red-400">
                    SAVE 20%
                  </span>
                </button>

              </div>

            </div>

          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-5 pb-24">

          <div className="
            max-w-6xl mx-auto
            grid grid-cols-1 md:grid-cols-3
            gap-5
            items-stretch
          ">

            {plans.map((plan) => (

              <div
                key={plan.name}
                className={`
                  relative
                  rounded-3xl
                  border
                  backdrop-blur-xl
                  p-7
                  flex flex-col
                  transition-all duration-300
                  ${
                    plan.popular
                      ? `
                        border-red-500/40
                        bg-gradient-to-b
                        from-red-500/[0.09]
                        via-pink-500/[0.035]
                        to-white/[0.025]
                        shadow-[0_0_70px_-25px_rgba(244,63,94,0.5)]
                        md:-translate-y-3
                      `
                      : `
                        border-white/[0.07]
                        bg-white/[0.025]
                        hover:border-white/[0.12]
                        hover:bg-white/[0.04]
                      `
                  }
                `}
              >

                {/* Popular */}
                {plan.popular && (
                  <div className="
                    absolute -top-3 left-1/2
                    -translate-x-1/2
                    px-4 py-1.5
                    rounded-full
                    bg-gradient-to-r
                    from-red-600 to-pink-600
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    shadow-[0_0_25px_-5px_rgba(244,63,94,0.8)]
                  ">
                    Most Popular
                  </div>
                )}

                {/* Plan */}
                <div>

                  <div className="flex items-center gap-3 mb-4">

                    <div className={`
                      w-10 h-10 rounded-xl
                      flex items-center justify-center
                      ${
                        plan.popular
                          ? "bg-gradient-to-br from-red-600 to-pink-600"
                          : "bg-white/[0.05] border border-white/[0.07]"
                      }
                    `}>
                      {plan.name === "Free" && (
                        <Sparkles size={18} />
                      )}

                      {plan.name === "Pro" && (
                        <Zap size={18} />
                      )}

                      {plan.name === "Enterprise" && (
                        <Brain size={18} />
                      )}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {plan.name}
                      </h2>

                      <p className="text-xs text-zinc-600">
                        {plan.description}
                      </p>
                    </div>

                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-2">

                    <span className="text-5xl font-bold tracking-tight">
                      ${yearly ? plan.yearly : plan.monthly}
                    </span>

                    <span className="text-sm text-zinc-600 mb-2">
                      / month
                    </span>

                  </div>

                  {plan.name === "Pro" && yearly && (
                    <p className="text-xs text-red-400 mb-5">
                      Billed annually
                    </p>
                  )}

                  {plan.name === "Free" && (
                    <p className="text-xs text-zinc-600 mb-5">
                      No credit card required
                    </p>
                  )}

                  {plan.name === "Enterprise" && (
                    <p className="text-xs text-zinc-600 mb-5">
                      Built for growing teams
                    </p>
                  )}

                  {/* Button */}
                  <button
                    onClick={() =>
                      plan.name === "Enterprise"
                        ? console.log("Contact sales")
                        : navigate("/register")
                    }
                    className={`
                      w-full h-11
                      rounded-xl
                      flex items-center justify-center gap-2
                      text-sm font-semibold
                      transition-all duration-300
                      ${
                        plan.popular
                          ? `
                            bg-gradient-to-r
                            from-red-600 to-pink-600
                            text-white
                            shadow-[0_0_30px_-8px_rgba(244,63,94,0.7)]
                            hover:shadow-[0_0_40px_-5px_rgba(244,63,94,0.8)]
                            hover:scale-[1.01]
                          `
                          : `
                            bg-white/[0.05]
                            border border-white/[0.08]
                            text-zinc-200
                            hover:bg-white/[0.08]
                            hover:border-white/[0.15]
                          `
                      }
                    `}
                  >
                    {plan.button}

                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                </div>

                {/* Divider */}
                <div className="
                  h-px bg-white/[0.06]
                  my-7
                " />

                {/* Features */}
                <div className="flex-1">

                  <p className="
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-zinc-600
                    font-semibold
                    mb-5
                  ">
                    What's included
                  </p>

                  <div className="space-y-3.5">

                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <div className="
                          shrink-0
                          w-5 h-5
                          rounded-full
                          bg-red-500/10
                          border border-red-500/10
                          flex items-center justify-center
                          mt-0.5
                        ">
                          <Check
                            size={11}
                            className="text-red-400"
                          />
                        </div>

                        <span className="text-sm text-zinc-400">
                          {feature}
                        </span>
                      </div>
                    ))}

                  </div>
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* AI Team */}
        <section className="
          relative
          border-t border-white/[0.05]
          py-20 px-5
        ">

          <div className="
            absolute inset-0
            bg-gradient-to-b
            from-red-950/[0.04]
            via-transparent
            to-transparent
            pointer-events-none
          " />

          <div className="relative max-w-5xl mx-auto">

            <div className="text-center mb-12">

              <div className="
                inline-flex items-center gap-2
                text-xs uppercase tracking-wider
                text-red-400
                mb-4
              ">
                <Sparkles size={13} />
                One workspace. Multiple specialists.
              </div>

              <h2 className="
                text-3xl md:text-4xl
                font-bold
              ">
                Your entire{" "}
                <span className="
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  bg-clip-text
                  text-transparent
                ">
                  AI team.
                </span>
              </h2>

              <p className="
                text-zinc-600
                max-w-xl mx-auto
                mt-4
                text-sm md:text-base
              ">
                Nexus automatically chooses the right agents for
                each task and combines their expertise into one answer.
              </p>

            </div>

            <div className="
              grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-5
              gap-3
            ">

              {agentCapabilities.map((agent) => {
                const Icon = agent.icon;

                return (
                  <div
                    key={agent.name}
                    className="
                      rounded-2xl
                      border border-white/[0.06]
                      bg-white/[0.025]
                      p-5
                      hover:border-red-500/20
                      hover:bg-white/[0.04]
                      transition
                    "
                  >

                    <div className="
                      w-9 h-9 rounded-xl
                      bg-gradient-to-br
                      from-red-500/15
                      to-pink-500/10
                      border border-red-500/10
                      flex items-center justify-center
                      text-red-400
                      mb-4
                    ">
                      <Icon size={17} />
                    </div>

                    <h3 className="
                      text-sm font-semibold
                      text-zinc-200
                    ">
                      {agent.name}
                    </h3>

                    <p className="
                      text-[11px]
                      leading-5
                      text-zinc-600
                      mt-1
                    ">
                      {agent.text}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-5 py-24">

          <div className="
            relative
            max-w-4xl mx-auto
            rounded-3xl
            border border-red-500/10
            bg-gradient-to-br
            from-red-500/[0.08]
            via-white/[0.025]
            to-pink-500/[0.04]
            p-10 md:p-16
            text-center
            overflow-hidden
          ">

            <div className="
              absolute top-[-100px] left-1/2
              -translate-x-1/2
              w-[400px] h-[250px]
              rounded-full
              bg-red-500/10
              blur-[100px]
            " />

            <div className="relative">

              <div className="
                mx-auto
                w-12 h-12
                rounded-2xl
                bg-gradient-to-br
                from-red-600
                to-pink-600
                flex items-center justify-center
                shadow-[0_0_35px_-8px_rgba(244,63,94,0.8)]
                mb-6
              ">
                <NexusLogo size={28} />
              </div>

              <h2 className="
                text-3xl md:text-4xl
                font-bold
              ">
                Ready to build with{" "}
                <span className="
                  bg-gradient-to-r
                  from-red-500
                  via-pink-500
                  to-rose-400
                  bg-clip-text
                  text-transparent
                ">
                  Nexus?
                </span>
              </h2>

              <p className="
                max-w-lg mx-auto
                text-zinc-500
                mt-4
                text-sm md:text-base
              ">
                Start free today and experience what a team of
                specialized AI agents can do together.
              </p>

              <button
                onClick={() => navigate("/register")}
                className="
                  mt-8
                  inline-flex items-center gap-2
                  px-7 py-3.5
                  rounded-xl
                  bg-gradient-to-r
                  from-red-600
                  to-pink-600
                  text-sm font-semibold
                  shadow-[0_0_35px_-8px_rgba(244,63,94,0.7)]
                  hover:shadow-[0_0_45px_-5px_rgba(244,63,94,0.8)]
                  hover:scale-[1.02]
                  transition-all
                "
              >
                Get started for free
                <ArrowRight size={16} />
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="
        relative z-10
        border-t border-white/[0.05]
        py-8 px-5
      ">
        <div className="
          max-w-7xl mx-auto
          flex flex-col sm:flex-row
          items-center justify-between
          gap-4
        ">

          <div className="flex items-center gap-2">
            <NexusLogo size={20} />

            <span className="text-sm font-semibold">
              Nexus<span className="text-red-500">AI</span>
            </span>
          </div>

          <p className="text-xs text-zinc-700">
            © 2026 Nexus AI. All rights reserved.
          </p>

          <div className="
            flex items-center gap-2
            text-xs text-zinc-600
          ">
            <Shield size={13} />
            Secure & private
          </div>

        </div>
      </footer>

    </div>
  );
}