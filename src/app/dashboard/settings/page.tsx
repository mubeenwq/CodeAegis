"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";
import { ArchitecturePattern, ProgrammingLanguage, UserSettings } from "@/types";

const DEFAULT_SETTINGS: UserSettings = {
  fullName: "Abis Ahmad",
  email: "abis.ahmad@codeaegis.dev",
  role: "Lead Security Architect",
  organization: "CodeAegis Security Labs",
  defaultArchitecture: "Clean",
  defaultLanguage: "Python",
  autoRunML: true,
  emailAlerts: true,
  criticalSlackAlerts: true,
  weeklyDigest: false,
  compactTables: false,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(readStorage<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    writeStorage(STORAGE_KEYS.SETTINGS, settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Settings</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage profile, default analysis preferences, and notifications (persisted in localStorage).
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 self-start"
        >
          <Save className="h-4 w-4" />
          Save Preferences
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          Settings saved to browser localStorage.
        </div>
      )}

      {/* Profile & Account */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white">Profile & Account</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Full Name</label>
            <input
              type="text"
              value={settings.fullName}
              onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Role</label>
            <input
              type="text"
              value={settings.role}
              onChange={(e) => setSettings({ ...settings, role: e.target.value })}
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Organization</label>
            <input
              type="text"
              value={settings.organization}
              onChange={(e) => setSettings({ ...settings, organization: e.target.value })}
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100"
            />
          </div>
        </div>
      </Card>

      {/* Analysis Preferences */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white">Analysis Defaults</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Default Architecture</label>
            <select
              value={settings.defaultArchitecture}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultArchitecture: e.target.value as ArchitecturePattern,
                })
              }
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100"
            >
              <option value="Clean">Clean Architecture</option>
              <option value="MVC">MVC Architecture</option>
              <option value="Layered">Layered Architecture</option>
              <option value="Three-Tier">Three-Tier Architecture</option>
              <option value="Microservices">Microservices Architecture</option>
              <option value="Custom">Custom Architecture</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-slate-300 font-medium">Default Programming Language</label>
            <select
              value={settings.defaultLanguage}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultLanguage: e.target.value as ProgrammingLanguage,
                })
              }
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100"
            >
              <option value="Python">Python</option>
              <option value="TypeScript">TypeScript</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
              <option value="C++">C++</option>
              <option value="C">C</option>
              <option value="PHP">PHP</option>
            </select>
          </div>
        </div>

        <label className="flex items-center justify-between rounded-lg border border-[#22304A] bg-[#090D18] p-3.5 text-xs cursor-pointer">
          <div>
            <p className="font-medium text-white">Enable Simulated ML Risk Assessment by Default</p>
            <p className="text-slate-400">Automatically include ML risk scoring in new analyses</p>
          </div>
          <input
            type="checkbox"
            checked={settings.autoRunML}
            onChange={(e) => setSettings({ ...settings, autoRunML: e.target.checked })}
            className="h-4 w-4 rounded border-[#22304A] text-blue-600"
          />
        </label>
      </Card>

      {/* Notification & Appearance Preferences */}
      <Card className="p-6 space-y-3">
        <h3 className="text-sm font-semibold text-white">Notifications & Appearance</h3>
        {[
          {
            key: "emailAlerts" as const,
            title: "Email Security Alerts",
            desc: "Receive notifications when critical vulnerabilities are detected",
          },
          {
            key: "criticalSlackAlerts" as const,
            title: "Critical Finding Webhook Alerts",
            desc: "Forward critical CWE alerts to team channels (future integration)",
          },
          {
            key: "weeklyDigest" as const,
            title: "Weekly Risk Posture Digest",
            desc: "Summary of requirement coverage and architectural compliance",
          },
          {
            key: "compactTables" as const,
            title: "Compact Table Density",
            desc: "Use tighter row spacing in security findings and requirements tables",
          },
        ].map((item) => (
          <label
            key={item.key}
            className="flex items-center justify-between rounded-lg border border-[#22304A] bg-[#090D18] p-3.5 text-xs cursor-pointer"
          >
            <div>
              <p className="font-medium text-white">{item.title}</p>
              <p className="text-slate-400">{item.desc}</p>
            </div>
            <input
              type="checkbox"
              checked={settings[item.key]}
              onChange={(e) =>
                setSettings({ ...settings, [item.key]: e.target.checked })
              }
              className="h-4 w-4 rounded border-[#22304A] text-blue-600"
            />
          </label>
        ))}
      </Card>
    </form>
  );
}
