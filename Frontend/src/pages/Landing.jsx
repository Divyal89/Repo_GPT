import { Link } from "react-router-dom";
import { Button } from "../components/common/BaseComponents";
import { Navbar } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";
import { Code, Zap, GitBranch, Search, Brain, Rocket } from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Brain,
      title: "Understand Your Codebase",
      description:
        "Get AI-powered insights into your project architecture and code structure.",
    },
    {
      icon: Zap,
      title: "Ask Questions About Your Code",
      description:
        "Natural language queries about any part of your repository.",
    },
    {
      icon: GitBranch,
      title: "Source-Aware Answers",
      description:
        "Every answer includes references to the exact files and line numbers.",
    },
    {
      icon: Search,
      title: "Explore Project Architecture",
      description:
        "Visualize and understand your project structure seamlessly.",
    },
    {
      icon: Code,
      title: "Search Your Codebase",
      description: "Fast semantic search across your entire repository.",
    },
    {
      icon: Rocket,
      title: "Developer-Focused AI",
      description:
        "Built by developers, for developers. Understand technical details.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Repository",
      description: "Link your GitHub repository",
    },
    {
      number: "02",
      title: "Index Codebase",
      description: "RepoGPT analyzes and indexes your code",
    },
    {
      number: "03",
      title: "Ask Questions",
      description: "Query your codebase in natural language",
    },
    {
      number: "04",
      title: "Get AI Answers",
      description: "Receive source-aware AI responses",
    },
  ];

  const tech = [
    "React",
    "Node.js",
    "MongoDB",
    "Python",
    "LangChain",
    "RAG",
    "LLM",
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center rounded-none border border-pink-400/40 bg-black/80 px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-[0.28em] text-pink-400 shadow-[0_0_16px_rgba(236,72,153,0.25)]">
              [ ai code intelligence ]
            </div>
            <h1 className="mb-6 text-5xl font-black leading-tight text-pink-400 md:text-6xl font-sans tracking-wider drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              UNDERSTAND ANY CODEBASE
            </h1>
            <p className="mb-8 max-w-xl text-lg text-pink-300 font-sans">
              Connect your repository and chat with an AI that understands your
              project's architecture, files, and code.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Button variant="secondary" size="lg">
                View Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="h-[420px] overflow-hidden rounded-none border border-pink-400/30 bg-black/95 p-6 shadow-[0_0_0_1px_rgba(236,72,153,0.3),0_0_32px_rgba(236,72,153,0.15),0_0_60px_rgba(236,72,153,0.08)]">
              <div className="mb-6 flex items-center gap-2 font-sans text-xs text-pink-400">
                <span className="text-pink-500">$ _</span>
              </div>
              <div className="space-y-4 rounded-none border border-pink-400/20 bg-black/80 p-5 font-sans text-sm">
                <div className="text-pink-400">root@repogpt:/codebase#</div>
                <div
                  className="h-1.5 w-3/4 rounded-none bg-gradient-to-r from-pink-400 to-transparent"
                  style={{ textShadow: "0 0 10px rgba(236,72,153,0.8)" }}
                ></div>
                <div className="text-pink-300 text-xs">
                  indexed 1,250 files...
                </div>
                <div className="mt-6 space-y-3 text-xs text-pink-400">
                  <div>» scanning: /src/components</div>
                  <div className="text-pink-500">
                    » analyzing dependencies...
                  </div>
                  <div>» building knowledge graph</div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 -z-10 rounded-none bg-green-900/10 blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="bg-black/80 py-20 border-y border-green-400/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-green-400 font-mono tracking-wider drop-shadow-[0_0_16px_rgba(0,255,0,0.3)]">
              POWERFUL FEATURES
            </h2>
            <p className="text-xl text-green-300 font-mono">
              Everything you need to understand your codebase
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-none border border-green-400/25 bg-black/75 p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-green-300/40 hover:shadow-[0_0_22px_rgba(0,255,0,0.14),0_20px_45px_rgba(0,255,0,0.1)]"
              >
                <div className="mb-4 inline-flex rounded-none bg-black/80 p-3 text-green-400 ring-1 ring-green-400/20 shadow-[0_0_16px_rgba(0,255,0,0.12)] font-mono">
                  <feature.icon size={28} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-green-400 font-mono tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-green-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-green-400 font-mono tracking-wider drop-shadow-[0_0_16px_rgba(0,255,0,0.3)]">
              HOW IT WORKS
            </h2>
            <p className="text-xl text-green-300 font-mono">
              Four-step process
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-none border border-green-400/25 bg-black/75 p-6 text-center shadow-soft font-mono"
              >
                <div className="mb-4 text-4xl font-black text-green-400 drop-shadow-[0_0_16px_rgba(0,255,0,0.4)]">
                  [{step.number}]
                </div>
                <h3 className="mb-2 text-lg font-semibold text-green-400 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-green-300 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="bg-black/60 py-20 border-y border-green-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-green-400 font-mono tracking-wider drop-shadow-[0_0_12px_rgba(0,255,0,0.3)]">
              [ BUILT WITH TECHNOLOGY ]
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 font-mono">
            {tech.map((t, idx) => (
              <div
                key={idx}
                className="rounded-none border border-green-400/25 bg-black/80 px-5 py-2.5 text-xs font-bold text-green-400 shadow-[0_0_12px_rgba(0,255,0,0.08)]"
              >
                &gt; {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl rounded-none border border-green-400/30 bg-black/95 px-6 py-16 text-center shadow-[0_0_0_1px_rgba(0,255,0,0.4),0_0_35px_rgba(0,255,0,0.12),0_0_60px_rgba(0,255,0,0.08)] font-mono">
          <h2 className="mb-6 text-4xl font-bold text-green-400 tracking-wider drop-shadow-[0_0_16px_rgba(0,255,0,0.3)]">
            BEGIN ANALYSIS
          </h2>
          <p className="mb-8 text-lg text-green-300">
            Connect your first repository and experience AI-powered code
            analysis in minutes.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg">
              INITIATE
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
