import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  BookOpen,
  Rocket,
  Brain,
  Code2,
  Globe,
  FileText,
  KeyRound,
  MessageSquare,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  Zap,
  Shield,
  Terminal,
  Layers,
} from "lucide-react";
import { NexusLogo } from "../components/Nexus_Logo";

const sections = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction", icon: BookOpen },
      { id: "quickstart", label: "Quickstart", icon: Rocket },
      { id: "authentication", label: "Authentication", icon: KeyRound },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { id: "agents", label: "AI Agents", icon: Brain },
      { id: "orchestration", label: "Orchestration", icon: Layers },
      { id: "conversations", label: "Conversations", icon: MessageSquare },
    ],
  },
  {
    title: "Agents",
    items: [
      { id: "research", label: "Research Agent", icon: Search },
      { id: "coding", label: "Coding Agent", icon: Code2 },
      { id: "web", label: "Web Agent", icon: Globe },
      { id: "pdf", label: "PDF Agent", icon: FileText },
    ],
  },
  {
    title: "API",
    items: [
      { id: "api-reference", label: "API Reference", icon: Terminal },
    ],
  },
];

const docs = {
  introduction: ["Getting Started", "Introduction"],
  quickstart: ["Getting Started", "Quickstart"],
  authentication: ["Getting Started", "Authentication"],
  agents: ["Core Concepts", "AI Agents"],
  orchestration: ["Core Concepts", "Orchestration"],
  conversations: ["Core Concepts", "Conversations"],
  research: ["Agents", "Research Agent"],
  coding: ["Agents", "Coding Agent"],
  web: ["Agents", "Web Agent"],
  pdf: ["Agents", "PDF Agent"],
  "api-reference": ["API", "API Reference"],
};

function CodeBlock({ children, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080808]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-red-400" />
          <span className="text-[11px] text-zinc-600 uppercase tracking-wider">
            {language}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-300 transition"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto p-5 text-sm leading-7 text-zinc-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <aside
      className={`
        fixed lg:sticky
        top-[72px] left-0
        z-30
        h-[calc(100vh-72px)]
        w-[280px]
        shrink-0
        bg-[#050505]
        border-r border-white/[0.06]
        transition-transform duration-300
        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      <div className="h-full flex flex-col">
        {/* Search only — the duplicate NexusAI header was removed */}
        <div className="p-4 border-b border-white/[0.04]">
          <div
            className="
              flex items-center gap-2
              h-10 px-3
              rounded-xl
              bg-white/[0.025]
              border border-white/[0.07]
              text-zinc-600
              focus-within:border-red-500/20
              transition
            "
          >
            <Search size={15} />

            <input
              placeholder="Search documentation..."
              className="
                min-w-0 flex-1
                bg-transparent
                outline-none
                text-xs text-zinc-300
                placeholder:text-zinc-700
              "
            />

            <span
              className="
                text-[9px]
                px-1.5 py-0.5
                rounded
                border border-white/[0.07]
                text-zinc-700
              "
            >
              /
            </span>
          </div>
        </div>

        {/* Navigation with a subtle dark scrollbar */}
        <div className="docs-sidebar-scroll flex-1 overflow-y-auto px-3 pb-6">
          {sections.map((section) => (
            <div key={section.title} className="mb-7">
              <p
                className="
                  px-3 mb-2
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-zinc-700
                  font-semibold
                "
              >
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActive(item.id);
                        setMobileOpen(false);
                      }}
                      className={`
                        w-full
                        flex items-center gap-3
                        px-3 py-2.5
                        rounded-xl
                        text-left
                        text-sm
                        transition-all
                        ${
                          isActive
                            ? "bg-red-500/10 text-red-400 border border-red-500/15"
                            : "text-zinc-500 border border-transparent hover:text-zinc-200 hover:bg-white/[0.035]"
                        }
                      `}
                    >
                      <Icon size={15} />
                      {item.label}

                      {isActive && (
                        <ChevronRight size={14} className="ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/[0.05]">
          <div className="p-4 rounded-2xl border border-red-500/10 bg-red-500/[0.035]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-red-400" />
              <span className="text-xs font-medium text-zinc-300">
                Need help?
              </span>
            </div>

            <p className="text-[11px] text-zinc-600 leading-5">
              Ask Nexus AI about the documentation directly.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function DocHeader({ eyebrow, title, description }) {
  return (
    <header className="mb-12">
      <div
        className="
          inline-flex items-center gap-2
          px-3 py-1.5
          rounded-full
          bg-red-500/10
          border border-red-500/15
          text-red-400
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.15em]
          mb-5
        "
      >
        <Sparkles size={11} />
        {eyebrow}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
        {title}
      </h1>

      <p className="max-w-2xl mt-5 text-base md:text-lg text-zinc-500 leading-8">
        {description}
      </p>
    </header>
  );
}

function DocSection({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
        {title}
      </h2>

      <div className="text-sm md:text-[15px] leading-7 text-zinc-500 space-y-4">
        {children}
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div
      className="
        p-5 rounded-2xl
        border border-white/[0.06]
        bg-white/[0.025]
        hover:bg-white/[0.04]
        hover:border-red-500/15
        transition-all
      "
    >
      <div
        className="
          w-10 h-10 rounded-xl
          bg-gradient-to-br
          from-red-500/15
          to-pink-500/10
          border border-red-500/10
          flex items-center justify-center
          text-red-400
          mb-4
        "
      >
        <Icon size={18} />
      </div>

      <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>

      <p className="text-xs text-zinc-600 mt-2 leading-5">{text}</p>
    </div>
  );
}

function Step({ number, title, children }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <span
        className="
          shrink-0
          w-9 h-9
          rounded-xl
          bg-red-500/10
          border border-red-500/15
          text-red-400
          flex items-center justify-center
          text-xs font-bold
        "
      >
        {number}
      </span>

      <div>
        <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
        <p className="text-xs text-zinc-600 mt-1 leading-5">{children}</p>
      </div>
    </div>
  );
}

function InfoBox({ children }) {
  return (
    <div className="flex gap-3 p-5 rounded-2xl border border-red-500/15 bg-red-500/[0.04] text-sm text-zinc-500 leading-6">
      <Shield size={17} className="shrink-0 text-red-400 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}

function WorkflowNode({ icon: Icon, title, active, small }) {
  return (
    <div
      className={`
        flex items-center gap-2
        rounded-xl border
        ${small ? "px-3 py-2" : "px-4 py-3"}
        ${
          active
            ? "border-red-500/30 bg-red-500/10"
            : "border-white/[0.06] bg-white/[0.025]"
        }
      `}
    >
      <Icon
        size={small ? 13 : 16}
        className={active ? "text-red-400" : "text-zinc-600"}
      />

      <span
        className={
          small ? "text-[10px] text-zinc-500" : "text-xs text-zinc-300"
        }
      >
        {title}
      </span>
    </div>
  );
}

function UseCase({ text }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <Check size={14} className="text-red-400" />
      <span className="text-xs text-zinc-500">{text}</span>
    </div>
  );
}

function ApiRow({ name, type, required, description }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px_100px_1fr] gap-2 md:gap-4 p-3 rounded-xl bg-white/[0.02]">
      <code className="text-xs text-red-400">{name}</code>

      <span className="text-[11px] text-zinc-700">
        {type}
        {required && <span className="ml-2 text-red-500">required</span>}
      </span>

      <span className="text-xs text-zinc-600">{description}</span>
    </div>
  );
}

function IntroContent({ active }) {
  switch (active) {
    case "introduction":
      return (
        <>
          <DocHeader
            eyebrow="Getting Started"
            title="Introduction"
            description="Nexus AI is a multi-agent AI platform that coordinates specialized agents to solve complex tasks."
          />

          <section id="what-is-nexus"><DocSection title="What is Nexus AI?">
            <p>
              Nexus AI brings multiple specialized AI agents together inside
              one workspace. Instead of asking one model to handle every type
              of task, Nexus can route different parts of a request to the
              agents best suited for the job.
            </p>

            <p>
              The platform is designed around research, coding, reasoning,
              web research and document analysis.
            </p>
          </DocSection></section>

          <div className="grid sm:grid-cols-2 gap-4 my-8">
            <FeatureCard
              icon={Brain}
              title="Specialized agents"
              text="Each agent focuses on a particular capability."
            />

            <FeatureCard
              icon={Layers}
              title="Smart orchestration"
              text="The orchestrator coordinates multiple agents."
            />

            <FeatureCard
              icon={Globe}
              title="Live research"
              text="Use web-enabled workflows when current information matters."
            />

            <FeatureCard
              icon={Zap}
              title="One answer"
              text="Agent outputs are synthesized into a single response."
            />
          </div>

          <section id="how-it-works"><DocSection title="How it works">
            <div className="space-y-4">
              <Step number="01" title="Send a request">
                Describe your question or task naturally.
              </Step>

              <Step number="02" title="Nexus analyzes it">
                The orchestrator determines which capabilities are required.
              </Step>

              <Step number="03" title="Agents collaborate">
                Specialized agents work on the relevant parts of the task.
              </Step>

              <Step number="04" title="Receive the result">
                Nexus combines the outputs into a coherent response.
              </Step>
            </div>
          </DocSection></section>
        </>
      );

    case "quickstart":
      return (
        <>
          <DocHeader
            eyebrow="Getting Started"
            title="Quickstart"
            description="Send your first request to Nexus and let the AI team handle the task."
          />

          <DocSection title="1. Get your API key">
            <p>
              Create a Nexus AI account and generate an API key from your
              dashboard.
            </p>
          </DocSection>

          <DocSection title="2. Make your first request">
            <CodeBlock language="javascript">{`const response = await fetch(
  "https://api.nexus.ai/v1/chat",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      message: "Explain how multi-agent AI works"
    })
  }
);

const data = await response.json();

console.log(data);`}</CodeBlock>
          </DocSection>

          <DocSection title="3. Handle the response">
            <CodeBlock language="json">{`{
  "id": "msg_8f21",
  "answer": "Multi-agent AI systems...",
  "agents": [
    "orchestrator",
    "reasoning"
  ],
  "status": "completed"
}`}</CodeBlock>
          </DocSection>
        </>
      );

    case "authentication":
      return (
        <>
          <DocHeader
            eyebrow="Getting Started"
            title="Authentication"
            description="Authenticate your application securely before making requests to the Nexus API."
          />

          <DocSection title="API keys">
            <p>
              Nexus API requests use bearer authentication. Include your API
              key in the Authorization header of each request.
            </p>

            <CodeBlock language="bash">{`curl https://api.nexus.ai/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</CodeBlock>
          </DocSection>

          <InfoBox>
            Never expose your API key in browser-side code or public
            repositories. Store secrets on your server or in environment
            variables.
          </InfoBox>
        </>
      );

    case "agents":
      return (
        <>
          <DocHeader
            eyebrow="Core Concepts"
            title="AI Agents"
            description="Nexus uses specialized AI agents that focus on different types of tasks."
          />

          <div className="space-y-4">
            <FeatureCard
              icon={Search}
              title="Research Agent"
              text="Finds, compares and synthesizes information."
            />

            <FeatureCard
              icon={Code2}
              title="Coding Agent"
              text="Writes, debugs and reviews software."
            />

            <FeatureCard
              icon={Brain}
              title="Reasoning Agent"
              text="Handles complex multi-step reasoning."
            />

            <FeatureCard
              icon={Globe}
              title="Web Agent"
              text="Works with current web information."
            />

            <FeatureCard
              icon={FileText}
              title="PDF Agent"
              text="Reads and extracts information from documents."
            />
          </div>
        </>
      );

    case "orchestration":
      return (
        <>
          <DocHeader
            eyebrow="Core Concepts"
            title="Orchestration"
            description="The Nexus Orchestrator determines which agents should collaborate on a request."
          />

          <DocSection title="The orchestrator">
            <p>
              The orchestrator acts as the central intelligence layer. It
              analyzes the user's request, selects appropriate agents and
              combines their outputs.
            </p>
          </DocSection>

          <div className="my-8 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <WorkflowNode icon={MessageSquare} title="Your request" />

              <ChevronRight className="hidden md:block text-zinc-700" />

              <WorkflowNode
                icon={Sparkles}
                title="Orchestrator"
                active
              />

              <ChevronRight className="hidden md:block text-zinc-700" />

              <div className="grid grid-cols-2 gap-2">
                <WorkflowNode icon={Search} title="Research" small />
                <WorkflowNode icon={Code2} title="Coding" small />
                <WorkflowNode icon={Brain} title="Reasoning" small />
                <WorkflowNode icon={Globe} title="Web" small />
              </div>
            </div>
          </div>
        </>
      );

    case "conversations":
      return (
        <>
          <DocHeader
            eyebrow="Core Concepts"
            title="Conversations"
            description="Keep context across messages and build continuous AI conversations."
          />

          <DocSection title="Conversation context">
            <p>
              A conversation contains the sequence of messages exchanged
              between the user and Nexus AI. Maintaining this context allows
              follow-up questions to build on earlier messages.
            </p>
          </DocSection>

          <CodeBlock language="javascript">{`const conversation = {
  id: "conv_123",
  messages: [
    {
      role: "user",
      content: "Explain React hooks"
    },
    {
      role: "assistant",
      content: "React hooks..."
    }
  ]
};`}</CodeBlock>
        </>
      );

    case "research":
    case "coding":
    case "web":
    case "pdf":
      return (
        <>
          <DocHeader
            eyebrow={docs[active][0]}
            title={docs[active][1]}
            description={{
              research:
                "Search, compare and synthesize information for research-heavy tasks.",
              coding:
                "Build, debug, optimize and review code with context-aware assistance.",
              web:
                "Access current web information when your task requires live data.",
              pdf:
                "Analyze documents, summarize reports and extract important information.",
            }[active]}
          />

          <DocSection title="Overview">
            <p>
              This specialized agent can be selected by Nexus when a request
              requires its particular capability.
            </p>
          </DocSection>

          <DocSection title="Typical use cases">
            <div className="grid sm:grid-cols-2 gap-3">
              <UseCase text="Analyze complex user requests" />
              <UseCase text="Combine results with other agents" />
              <UseCase text="Produce structured responses" />
              <UseCase text="Support multi-step workflows" />
            </div>
          </DocSection>

          <DocSection title="Example">
            <CodeBlock language="javascript">{`const task = {
  agent: "${active}",
  message: "Analyze this task and provide the best solution."
};

const result = await nexus.agents.run(task);

console.log(result);`}</CodeBlock>
          </DocSection>
        </>
      );

    case "api-reference":
      return (
        <>
          <DocHeader
            eyebrow="API"
            title="API Reference"
            description="Reference for interacting with Nexus AI programmatically."
          />

          <DocSection title="Chat endpoint">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] overflow-hidden mb-6">
              <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
                <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-[10px] font-bold">
                  POST
                </span>

                <code className="text-sm text-zinc-300">/v1/chat</code>
              </div>

              <div className="p-5">
                <p className="text-sm text-zinc-500">
                  Send a message to the Nexus orchestration system.
                </p>

                <div className="mt-5 space-y-3">
                  <ApiRow
                    name="message"
                    type="string"
                    required
                    description="The user's message."
                  />

                  <ApiRow
                    name="conversation_id"
                    type="string"
                    description="Optional conversation identifier."
                  />

                  <ApiRow
                    name="web"
                    type="boolean"
                    description="Enable web research."
                  />

                  <ApiRow
                    name="reasoning"
                    type="boolean"
                    description="Enable deeper reasoning."
                  />
                </div>
              </div>
            </div>
          </DocSection>

          <CodeBlock language="javascript">{`const response = await nexus.chat.create({
  message: "Research the latest AI agent trends",
  web: true,
  reasoning: true
});`}</CodeBlock>
        </>
      );

    default:
      return null;
  }
}

export default function Documentation() {
  const navigate = useNavigate();
  const [active, setActive] = useState("introduction");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [section, page] = docs[active];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="
            absolute top-[-300px] left-[35%]
            w-[700px] h-[500px]
            rounded-full
            bg-red-600/[0.035]
            blur-[150px]
          "
        />

        <div
          className="
            absolute bottom-[-250px] right-[10%]
            w-[600px] h-[450px]
            rounded-full
            bg-pink-600/[0.025]
            blur-[150px]
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.015]
            bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_80%)]" />
      </div>

      {/* Single global navbar */}
      <header
        className="
          fixed top-0 left-0 right-0
          z-50
          h-[72px]
          bg-black/85
          backdrop-blur-2xl
          border-b border-white/[0.06]
        "
      >
        <div className="h-full px-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="
                lg:hidden
                w-9 h-9 rounded-xl
                border border-white/[0.07]
                bg-white/[0.03]
                flex items-center justify-center
                text-zinc-500
              "
            >
              <Menu size={17} />
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3"
            >
              <div
                className="
                  w-9 h-9 rounded-xl
                  bg-gradient-to-br
                  from-zinc-950 via-black to-red-950/50
                  border border-red-500/25
                  flex items-center justify-center
                  shadow-[0_0_20px_-5px_rgba(244,63,94,0.5)]
                "
              >
                <NexusLogo size={25} />
              </div>

              <span className="text-lg font-bold">
                Nexus<span className="text-red-500">AI</span>
              </span>
            </button>

            <div className="w-px h-5 bg-white/[0.08]" />

            <span className="text-sm text-zinc-600">
              Documentation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/chat")}
              className="
                hidden sm:flex
                items-center gap-2
                px-4 py-2 rounded-xl
                text-xs text-zinc-500
                hover:text-white
                hover:bg-white/[0.04]
                transition
              "
            >
              <MessageSquare size={14} />
              Open workspace
            </button>

            <button
              onClick={() => navigate("/")}
              className="
                flex items-center gap-2
                px-3 py-2 rounded-xl
                text-xs text-zinc-600
                hover:text-white
                transition
              "
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex pt-[72px]">
        {/* Documentation sidebar */}
        <Sidebar
          active={active}
          setActive={setActive}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="
              fixed inset-0 z-20
              bg-black/70 backdrop-blur-sm
              lg:hidden
            "
          />
        )}

        {/* Main documentation content */}
        <main className="flex-1 min-w-0 px-5 md:px-10 lg:px-16 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-[11px] text-zinc-700 mb-8">
              <span>Docs</span>
              <ChevronRight size={12} />
              <span>{section}</span>
              <ChevronRight size={12} />
              <span className="text-red-400">{page}</span>
            </div>

            <IntroContent active={active} />

            <div className="mt-16 pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <button className="flex items-center gap-2 text-xs text-zinc-600 hover:text-white transition">
                <ArrowLeft size={14} />
                Previous
              </button>

              <button className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition">
                Next
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </main>

        {/* Right rail */}
        <aside className="hidden xl:block w-[230px] shrink-0 pr-8 pt-16">
          <div className="sticky top-[105px]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-700 font-semibold mb-4">
              On this page
            </p>

            <div className="space-y-3">
              {active === "introduction" && (
                <>
                  <a href="#what-is-nexus" className="block text-xs text-red-400">
                    What is Nexus AI?
                  </a>
                  <a href="#how-it-works" className="block text-xs text-zinc-600 hover:text-zinc-300">
                    How it works
                  </a>
                </>
              )}

              {active === "quickstart" && (
                <>
                  <a href="#api-key" className="block text-xs text-red-400">
                    Get your API key
                  </a>
                  <a href="#first-request" className="block text-xs text-zinc-600 hover:text-zinc-300">
                    First request
                  </a>
                  <a href="#response" className="block text-xs text-zinc-600 hover:text-zinc-300">
                    Response
                  </a>
                </>
              )}

              {active === "agents" && (
                <a href="#available-agents" className="block text-xs text-red-400">
                  Available agents
                </a>
              )}

              {active === "api-reference" && (
                <a href="#chat-endpoint" className="block text-xs text-red-400">
                  Chat endpoint
                </a>
              )}

              {!["introduction", "quickstart", "agents", "api-reference"].includes(active) && (
                <span className="block text-xs text-zinc-600">
                  {page}
                </span>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <a
                href="#"
                className="flex items-center gap-2 text-[11px] text-zinc-600 hover:text-zinc-300"
              >
                <ExternalLink size={12} />
                API status
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Scoped scrollbar CSS */}
      <style>{`
        .docs-sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
        }

        .docs-sidebar-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .docs-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .docs-sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
        }

        .docs-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 63, 94, 0.35);
        }
      `}</style>
    </div>
  );
}
