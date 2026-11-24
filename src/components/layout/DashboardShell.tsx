"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Bell,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  FileBarChart2,
  FolderKanban,
  HelpCircle,
  Layers,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  PlusCircle,
  Search,
  Settings,
  ShieldAlert,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Analysis", href: "/dashboard/new-analysis", icon: PlusCircle },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Requirements", href: "/dashboard/requirements", icon: ListChecks },
  { label: "Architecture", href: "/dashboard/architecture", icon: Layers },
  { label: "Security Findings", href: "/dashboard/findings", icon: ShieldAlert },
  { label: "Risk Assessment", href: "/dashboard/risk", icon: Activity },
  { label: "Reports", href: "/dashboard/reports", icon: FileBarChart2 },
  { label: "ML Insights", href: "/dashboard/ml-insights", icon: BrainCircuit },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Security Overview",
  "/dashboard/new-analysis": "New Analysis Wizard",
  "/dashboard/projects": "Projects Management",
  "/dashboard/requirements": "Requirements Traceability",
  "/dashboard/architecture": "Architecture Verification",
  "/dashboard/findings": "Security Findings",
  "/dashboard/risk": "Risk Assessment",
  "/dashboard/reports": "Reports & Exports",
  "/dashboard/ml-insights": "ML Insights",
  "/dashboard/settings": "Platform Settings",
};

const DEMO_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Critical SQLi detected in FinVault",
    time: "12m ago",
    tone: "text-red-400",
  },
  {
    id: "n2",
    title: "Architecture drift in MediPulse Views",
    time: "1h ago",
    tone: "text-amber-400",
  },
  {
    id: "n3",
    title: "SentinelAuth analysis completed",
    time: "3h ago",
    tone: "text-emerald-400",
  },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const isAnalysisDetail = pathname.startsWith("/dashboard/analysis/");
  const pageTitle = isAnalysisDetail
    ? "Analysis Results"
    : ROUTE_TITLES[pathname] || "Dashboard";

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => ({
      label: segment.replace(/-/g, " "),
      href: "/" + arr.slice(0, index + 1).join("/"),
      isLast: index === arr.length - 1,
    }));

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/dashboard/findings?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#0D1424] border-r border-[#22304A]">
      <div className="flex h-16 items-center justify-between px-5 border-b border-[#22304A]">
        <Logo href="/dashboard" />
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden rounded-lg p-1.5 text-slate-400 hover:bg-[#111B2E] hover:text-slate-100"
          aria-label="Close navigation menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-500/15 text-cyan-300 border border-blue-500/30"
                  : "text-slate-400 hover:bg-[#111B2E] hover:text-slate-100 border border-transparent"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-cyan-400" : "text-slate-400")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#22304A] p-3 space-y-1">
        <Link
          href="/dashboard/settings"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 hover:bg-[#111B2E] transition-colors"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-100">{user.fullName}</p>
            <p className="truncate text-[11px] text-slate-400">{user.role}</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setHelpOpen(true)}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-[#111B2E] hover:text-slate-100 transition-colors"
        >
          <HelpCircle className="h-4 w-4 shrink-0" />
          <span>Help & Documentation</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#090D18] text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-64">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 w-64 max-w-[80vw] h-full">{sidebarContent}</div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-[#22304A] bg-[#090D18]/90 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-[#111B2E] hover:text-slate-100"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 capitalize">
                {breadcrumbs.map((crumb) => (
                  <span key={crumb.href} className="inline-flex items-center gap-1.5">
                    <Link
                      href={crumb.href}
                      className={cn(
                        "hover:text-slate-200 transition-colors",
                        crumb.isLast && "text-cyan-400 font-medium"
                      )}
                    >
                      {crumb.label}
                    </Link>
                    {!crumb.isLast && <ChevronRight className="h-3 w-3 text-slate-600" />}
                  </span>
                ))}
              </div>
              <h1 className="truncate text-sm sm:text-base font-semibold text-slate-100">
                {pageTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <form onSubmit={handleQuickSearch} className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search findings, CWE, files..."
                aria-label="Quick search findings"
                className="w-56 lg:w-64 rounded-lg border border-[#22304A] bg-[#111B2E] pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </form>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((prev) => !prev);
                  setProfileOpen(false);
                }}
                aria-label="Notifications"
                className="relative rounded-lg border border-[#22304A] bg-[#111B2E] p-2 text-slate-300 hover:border-blue-500/50 hover:text-slate-100 transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#22304A] bg-[#0D1424] shadow-xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#22304A]">
                    <span className="text-xs font-semibold text-slate-200">Notifications</span>
                    <span className="text-[11px] text-cyan-400">3 Demo Alerts</span>
                  </div>
                  <div className="space-y-2">
                    {DEMO_NOTIFICATIONS.map((n) => (
                      <div
                        key={n.id}
                        className="rounded-lg bg-[#111B2E] p-2.5 text-xs border border-[#22304A]"
                      >
                        <p className={cn("font-medium", n.tone)}>{n.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 rounded-lg border border-[#22304A] bg-[#111B2E] px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-blue-500/50 transition-colors"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-semibold">
                  {user.fullName
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <span className="hidden sm:inline max-w-[110px] truncate">{user.fullName}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#22304A] bg-[#0D1424] shadow-xl p-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-[#22304A] mb-1">
                    <p className="font-semibold text-slate-100 truncate">{user.fullName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 hover:bg-[#111B2E]"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-[1440px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="CodeAegis Documentation & Prototype Guide"
        subtitle="From Intent to Prevent — Architecture & Security Intelligence"
      >
        <div className="space-y-4 text-sm text-slate-300">
          <div className="rounded-lg border border-[#22304A] bg-[#111B2E] p-4 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <BookOpen className="h-4 w-4" />
              <span>Three Core Pillars</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
              <li>
                <strong>Software Engineering:</strong> Validates functional requirements and checks architectural boundary compliance.
              </li>
              <li>
                <strong>Cybersecurity:</strong> Identifies CWE-mapped vulnerabilities with line-level remediation and security test cases.
              </li>
              <li>
                <strong>Machine Learning:</strong> Predicts module risk scores and classifies vulnerability categories (simulated in this frontend phase).
              </li>
            </ul>
          </div>
          <p className="text-xs text-slate-400">
            This phase is a frontend-only prototype. All projects, requirements, findings, and ML metrics are powered by structured mock data and browser localStorage.
          </p>
        </div>
      </Modal>
    </div>
  );
}
