import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  FileCheck2,
  Layers,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  UploadCloud,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";

const PROBLEMS = [
  {
    title: "Code-Only Blind Spots",
    description:
      "Traditional scanners inspect syntax in isolation without understanding what the software was actually intended to do.",
  },
  {
    title: "Zero Requirement Validation",
    description:
      "Conventional tools cannot verify whether critical functional and security requirements are actually implemented in source code.",
  },
  {
    title: "Architectural Drift Ignored",
    description:
      "Business logic leaking into presentation or persistence layers goes undetected until maintenance becomes costly.",
  },
  {
    title: "Manual Triage Overload",
    description:
      "Developers waste hours manually correlating disconnected static alerts without risk prioritization or test guidance.",
  },
];

const PILLARS = [
  {
    title: "Software Engineering",
    icon: Layers,
    accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    points: [
      "Requirement-to-code validation",
      "Functional requirement traceability",
      "Architecture & design-pattern verification",
      "Code quality & structural analysis",
    ],
  },
  {
    title: "Cybersecurity",
    icon: ShieldAlert,
    accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    points: [
      "Vulnerability & CWE pattern analysis",
      "Insecure coding practice detection",
      "Severity classification & impact context",
      "Suggested secure fixes & security tests",
    ],
  },
  {
    title: "Machine Learning",
    icon: BrainCircuit,
    accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    points: [
      "Module-level code risk prediction",
      "Intelligent vulnerability prioritization",
      "Automated risk classification",
      "Model performance & confidence metrics",
    ],
  },
];

const CORE_FEATURES = [
  {
    title: "Requirement Traceability",
    description: "Map FR/NFR specifications directly to implementing files and functions with confidence scores.",
    icon: FileCheck2,
  },
  {
    title: "Architecture Verification",
    description: "Validate MVC, Layered, Three-Tier, Clean, and Microservices boundaries automatically.",
    icon: Layers,
  },
  {
    title: "Vulnerability Detection",
    description: "Detect SQLi, XSS, hardcoded secrets, path traversal, and insecure deserialization with CWE mapping.",
    icon: ShieldAlert,
  },
  {
    title: "ML Risk Prediction",
    description: "Predict high-risk modules using complexity, nesting, and taint-flow indicators.",
    icon: BrainCircuit,
  },
  {
    title: "Actionable Secure Fixes",
    description: "Side-by-side vulnerable vs. secure code snippets with step-by-step remediation guidance.",
    icon: Code2,
  },
  {
    title: "Security Test Recommendations",
    description: "Targeted unit and integration security test cases generated per vulnerability class.",
    icon: Terminal,
  },
  {
    title: "Compliance & Audit Reports",
    description: "Exportable executive summaries, traceability matrices, and architecture compliance audits.",
    icon: Activity,
  },
];

const WORKFLOW_STEPS = [
  { step: "01", title: "Define Requirements", icon: FileCheck2 },
  { step: "02", title: "Upload Code", icon: UploadCloud },
  { step: "03", title: "Select Architecture", icon: Layers },
  { step: "04", title: "Analyze", icon: ShieldCheck },
  { step: "05", title: "Predict Risk", icon: BrainCircuit },
  { step: "06", title: "Generate Report", icon: Activity },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090D18] text-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#22304A] bg-[#090D18]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo href="/" />
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-300">
            <a href="#home" className="hover:text-cyan-400 transition-colors">
              Home
            </a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
              How It Works
            </a>
            <a href="#security" className="hover:text-cyan-400 transition-colors">
              Security
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden border-b border-[#22304A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge tone="cyan" className="px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              Detect the Flaw, Defend the Intent
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              From Intent to Prevent.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Bridge the gap between software requirements, architecture, and secure implementation with intelligent code analysis.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard/new-analysis"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Start Analyzing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border border-[#22304A] bg-[#111B2E] px-5 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-500/50 transition-colors"
              >
                Explore Features
              </a>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#22304A] max-w-lg">
              <div>
                <p className="text-lg font-semibold text-white">3 Pillars</p>
                <p className="text-xs text-slate-400">SE + Cyber + ML</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-cyan-400">CWE Mapped</p>
                <p className="text-xs text-slate-400">Line-Level Fixes</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-purple-400">6 Patterns</p>
                <p className="text-xs text-slate-400">Architecture Checks</p>
              </div>
            </div>
          </div>

          {/* Product Preview Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-[#22304A] bg-[#0D1424] p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#22304A] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    CodeAegis · ANL-2026-084
                  </span>
                </div>
                <Badge tone="purple">Simulated Preview</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-lg border border-[#22304A] bg-[#111B2E] p-3">
                  <p className="text-[11px] text-slate-400">Risk Score</p>
                  <p className="mt-1 text-xl font-bold text-red-400">78/100</p>
                </div>
                <div className="rounded-lg border border-[#22304A] bg-[#111B2E] p-3">
                  <p className="text-[11px] text-slate-400">Req Coverage</p>
                  <p className="mt-1 text-xl font-bold text-cyan-400">84%</p>
                </div>
                <div className="rounded-lg border border-[#22304A] bg-[#111B2E] p-3">
                  <p className="text-[11px] text-slate-400">Arch Compliance</p>
                  <p className="mt-1 text-xl font-bold text-emerald-400">76%</p>
                </div>
              </div>

              <div className="rounded-lg border border-red-500/30 bg-[#111B2E] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-red-400">
                    SEC-101 · SQL Injection (CWE-89)
                  </span>
                  <Badge tone="danger">Critical</Badge>
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  src/usecases/process_payment.py:42
                </p>
                <pre className="rounded bg-[#090D18] p-2.5 text-[11px] font-mono text-slate-300 overflow-x-auto">
                  {`query = f"SELECT * FROM transactions WHERE order_id = '{order_id}'"`}
                </pre>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Suggested Fix: Use parameterized query bindings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 border-b border-[#22304A] bg-[#0D1424]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              The Problem
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Why Traditional Static Analysis Falls Short
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Conventional security tools inspect code in a vacuum—disconnected from your software requirements and architectural design.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROBLEMS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-[#22304A] bg-[#111B2E] p-5 space-y-2"
              >
                <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section (Three Pillars) */}
      <section className="py-16 border-b border-[#22304A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              The CodeAegis Solution
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Three Integrated Intelligence Pillars
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-[#22304A] bg-[#111B2E] p-6 space-y-4"
                >
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border ${pillar.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {pillar.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 border-b border-[#22304A] bg-[#0D1424]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Core Capabilities
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Seven Engines Working in Concert
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-xl border border-[#22304A] bg-[#111B2E] p-5 hover:border-blue-500/40 transition-colors space-y-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-400">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 border-b border-[#22304A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Workflow
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              How CodeAegis Works
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {WORKFLOW_STEPS.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.step}
                  className="rounded-xl border border-[#22304A] bg-[#111B2E] p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400">{w.step}</span>
                    <Icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-white">{w.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 border-b border-[#22304A] bg-[#0D1424]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Lock className="h-4 w-4" />
              Secure by Design
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Prioritized Remediation, Not Alert Fatigue
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              CodeAegis pairs CWE-mapped vulnerability detection with ML-assisted risk scoring, giving developers exact line-level fixes and security test cases they can act on immediately.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#22304A] bg-[#111B2E] p-4 space-y-1.5">
              <p className="text-sm font-semibold text-white">Risk Prioritization</p>
              <p className="text-xs text-slate-400">
                Focus on critical exploit paths instead of low-impact noise.
              </p>
            </div>
            <div className="rounded-xl border border-[#22304A] bg-[#111B2E] p-4 space-y-1.5">
              <p className="text-sm font-semibold text-white">Code Fix Guidance</p>
              <p className="text-xs text-slate-400">
                Inspect vulnerable snippets alongside hardened replacements.
              </p>
            </div>
            <div className="rounded-xl border border-[#22304A] bg-[#111B2E] p-4 space-y-1.5">
              <p className="text-sm font-semibold text-white">Security Test Cases</p>
              <p className="text-xs text-slate-400">
                Verify every fix with concrete regression test recommendations.
              </p>
            </div>
            <div className="rounded-xl border border-[#22304A] bg-[#111B2E] p-4 space-y-1.5">
              <p className="text-sm font-semibold text-white">Intent Verification</p>
              <p className="text-xs text-slate-400">
                Confirm security requirements are actually enforced in code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-b border-[#22304A]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Defend Your Code Before It Becomes a Threat.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Explore the interactive CodeAegis prototype dashboard, run a simulated multi-step analysis, and inspect requirement, architecture, and security findings.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Launch Prototype Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg border border-[#22304A] bg-[#111B2E] px-6 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500/50 transition-colors"
            >
              Create Demo Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1424] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Logo href="/" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              CodeAegis is an AI-powered software security and engineering intelligence platform connecting requirements, architecture, and source code.
            </p>
          </div>
          <div className="space-y-2 text-xs">
            <p className="font-semibold text-slate-200 uppercase tracking-wider">Navigation</p>
            <div className="flex flex-col space-y-1.5 text-slate-400">
              <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
              <Link href="/dashboard/new-analysis" className="hover:text-cyan-400">New Analysis</Link>
              <Link href="/dashboard/ml-insights" className="hover:text-cyan-400">ML Insights</Link>
              <Link href="/login" className="hover:text-cyan-400">Sign In</Link>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <p className="font-semibold text-slate-200 uppercase tracking-wider">Project Team</p>
            <ul className="space-y-1.5 text-slate-400">
              <li>Abis Ahmad (SAP ID: 61589)</li>
              <li>Mubeen Zaman (SAP ID: 61586)</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-10 pt-6 border-t border-[#22304A] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CodeAegis. Frontend Prototype Phase.</p>
          <p>From Intent to Prevent.</p>
        </div>
      </footer>
    </div>
  );
}
