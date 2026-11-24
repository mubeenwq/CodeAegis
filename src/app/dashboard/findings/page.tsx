"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Search, ShieldAlert } from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
import { Badge, SeverityBadge, StatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { securityService } from "@/services/securityService";
import { FindingStatus, SecurityFinding } from "@/types";

export default function SecurityFindingsPage() {
  const [findings, setFindings] = useState<SecurityFinding[]>([]);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<SecurityFinding | null>(null);

  useEffect(() => {
    setFindings(securityService.getAll());
  }, []);

  const projectNames = Array.from(new Set(findings.map((f) => f.projectName)));

  const filtered = findings.filter((f) => {
    const q = search.toLowerCase();
    const matchesQ =
      f.id.toLowerCase().includes(q) ||
      f.title.toLowerCase().includes(q) ||
      f.cwe.toLowerCase().includes(q) ||
      f.file.toLowerCase().includes(q);
    const matchesSev = severityFilter === "All" || f.severity === severityFilter;
    const matchesProj = projectFilter === "All" || f.projectName === projectFilter;
    const matchesStat = statusFilter === "All" || f.status === statusFilter;
    return matchesQ && matchesSev && matchesProj && matchesStat;
  });

  const handleStatusChange = (id: string, nextStatus: FindingStatus) => {
    const updated = securityService.updateStatus(id, nextStatus);
    setFindings(updated);
    if (selected?.id === id) {
      setSelected({ ...selected, status: nextStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Security Findings</h2>
        <p className="mt-1 text-sm text-slate-400">
          Centralized CWE-mapped vulnerability tracker across all analyzed projects.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Findings" value={findings.length} icon={ShieldAlert} accent="blue" />
        <StatCard
          title="Critical Findings"
          value={findings.filter((f) => f.severity === "Critical").length}
          icon={ShieldAlert}
          accent="danger"
        />
        <StatCard
          title="High-Risk Findings"
          value={findings.filter((f) => f.severity === "High").length}
          icon={ShieldAlert}
          accent="warning"
        />
        <StatCard
          title="Fixed Findings"
          value={findings.filter((f) => f.status === "Fixed").length}
          icon={CheckCircle2}
          accent="success"
        />
      </div>

      {/* Filters */}
      <Card className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search CWE, file, title..."
            className="w-full rounded-lg border border-[#22304A] bg-[#090D18] pl-9 pr-3 py-2 text-xs text-slate-100"
          />
        </div>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-xs text-slate-200"
        >
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-xs text-slate-200"
        >
          <option value="All">All Projects</option>
          {projectNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-xs text-slate-200"
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Fixed">Fixed</option>
          <option value="Accepted Risk">Accepted Risk</option>
        </select>
      </Card>

      {/* Findings Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#22304A] bg-[#0D1424] text-slate-400 uppercase">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-4 py-3">Vulnerability</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">CWE</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22304A]">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-[#16223A]/60">
                  <td className="px-5 py-3.5 font-mono text-cyan-400">{f.id}</td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-white">{f.title}</p>
                    <p className="font-mono text-[11px] text-slate-400">
                      {f.file}:{f.line}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">{f.projectName}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-300">{f.cwe}</td>
                  <td className="px-4 py-3.5">
                    <SeverityBadge severity={f.severity} />
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={f.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelected(f)}
                      className="rounded-md border border-[#22304A] bg-[#090D18] px-2.5 py-1 text-cyan-400 hover:border-cyan-500/50"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.id}: ${selected.title}` : ""}
        subtitle={selected ? `${selected.projectName} · ${selected.cwe} · ${selected.file}:${selected.line}` : ""}
        maxWidthClass="max-w-3xl"
      >
        {selected && (
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SeverityBadge severity={selected.severity} />
                <Badge tone="neutral">{selected.category}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Update Status:</span>
                <select
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected.id, e.target.value as FindingStatus)}
                  className="rounded-lg border border-[#22304A] bg-[#090D18] px-2.5 py-1 text-slate-100"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Accepted Risk">Accepted Risk</option>
                </select>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">{selected.explanation}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-red-400 mb-1">Vulnerable Code</p>
                <pre className="rounded-lg border border-red-500/30 bg-[#090D18] p-3 font-mono text-[11px] text-slate-200 overflow-x-auto">
                  {selected.vulnerableCode}
                </pre>
              </div>
              <div>
                <p className="font-semibold text-emerald-400 mb-1">Suggested Secure Code</p>
                <pre className="rounded-lg border border-emerald-500/30 bg-[#090D18] p-3 font-mono text-[11px] text-slate-200 overflow-x-auto">
                  {selected.secureCode}
                </pre>
              </div>
            </div>

            <div>
              <p className="font-semibold text-cyan-400 mb-1">Recommended Security Tests</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                {selected.recommendedTests.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
