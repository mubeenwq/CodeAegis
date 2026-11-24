"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  FolderPlus,
  LayoutGrid,
  List,
  Search,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { projectService } from "@/services/projectService";
import {
  ArchitecturePattern,
  ProgrammingLanguage,
  Project,
  ProjectStatus,
  ProjectType,
} from "@/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newLang, setNewLang] = useState<ProgrammingLanguage>("TypeScript");
  const [newArch, setNewArch] = useState<ArchitecturePattern>("Clean");
  const [newType, setNewType] = useState<ProjectType>("Web Application");

  useEffect(() => {
    setProjects(projectService.getAll());
  }, []);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesLang = langFilter === "All" || p.language === langFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesLang && matchesStatus;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const created = projectService.create({
      name: newName.trim(),
      description: newDesc.trim() || "Monitored software project.",
      language: newLang,
      projectType: newType,
      architecture: newArch,
      lastAnalysisDate: new Date().toISOString().slice(0, 10),
      latestAnalysisId: "ANL-2026-084",
      status: "Pending" as ProjectStatus,
      riskScore: 32,
      requirementCoverage: 0,
      architectureCompliance: 100,
      findingsCount: 0,
      filesCount: 0,
    });
    setProjects((prev) => [created, ...prev]);
    setNewName("");
    setNewDesc("");
    setCreateOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const updated = projectService.remove(deleteTarget.id);
    setProjects(updated);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Projects</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage monitored repositories, architecture baselines, and security posture.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors self-start"
        >
          <FolderPlus className="h-4 w-4" />
          Add New Project
        </button>
      </div>

      {/* Filters Toolbar */}
      <Card className="p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name or description..."
            className="w-full rounded-lg border border-[#22304A] bg-[#090D18] pl-9 pr-3 py-2 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            aria-label="Filter by language"
            className="rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-xs text-slate-200"
          >
            <option value="All">All Languages</option>
            <option value="Python">Python</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="C++">C++</option>
            <option value="PHP">PHP</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-xs text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Secure">Secure</option>
            <option value="Attention Needed">Attention Needed</option>
            <option value="Critical">Critical</option>
            <option value="Pending">Pending</option>
          </select>

          <div className="inline-flex rounded-lg border border-[#22304A] bg-[#090D18] p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`rounded-md p-1.5 ${
                viewMode === "grid" ? "bg-[#111B2E] text-cyan-400" : "text-slate-400"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`rounded-md p-1.5 ${
                viewMode === "list" ? "bg-[#111B2E] text-cyan-400" : "text-slate-400"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Grid or List */}
      {viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Card key={p.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-white">{p.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge tone="blue">{p.language}</Badge>
                  <Badge tone="purple">{p.architecture}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-lg border border-[#22304A] bg-[#090D18] p-3 text-center text-xs">
                  <div>
                    <p className="text-[11px] text-slate-400">Risk</p>
                    <p className="font-semibold text-white">{p.riskScore}/100</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">Req Cov</p>
                    <p className="font-semibold text-cyan-400">{p.requirementCoverage}%</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">Findings</p>
                    <p className="font-semibold text-amber-400">{p.findingsCount}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#22304A] text-xs">
                <span className="text-slate-400 font-mono">Last: {p.lastAnalysisDate}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(p)}
                    aria-label={`Delete ${p.name}`}
                    className="rounded-md p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <Link
                    href={`/dashboard/analysis/${p.latestAnalysisId}`}
                    className="inline-flex items-center gap-1 rounded-md border border-[#22304A] bg-[#090D18] px-2.5 py-1 font-medium text-cyan-400 hover:border-cyan-500/50"
                  >
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#22304A] bg-[#0D1424] text-slate-400 uppercase">
                <tr>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-4 py-3">Language</th>
                  <th className="px-4 py-3">Architecture</th>
                  <th className="px-4 py-3">Risk Score</th>
                  <th className="px-4 py-3">Req Coverage</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22304A]">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#16223A]/60">
                    <td className="px-5 py-3.5 font-medium text-white">{p.name}</td>
                    <td className="px-4 py-3.5 text-slate-300">{p.language}</td>
                    <td className="px-4 py-3.5 text-slate-300">{p.architecture}</td>
                    <td className="px-4 py-3.5 font-semibold text-white">{p.riskScore}/100</td>
                    <td className="px-4 py-3.5 text-cyan-400">{p.requirementCoverage}%</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <Link
                        href={`/dashboard/analysis/${p.latestAnalysisId}`}
                        className="inline-flex items-center gap-1 rounded-md border border-[#22304A] bg-[#090D18] px-2.5 py-1 text-cyan-400"
                      >
                        Open
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(p)}
                        className="rounded-md p-1 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create Project Modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add New Project"
        subtitle="Saved in browser localStorage for this prototype"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block font-medium text-slate-300">Project Name</label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. ShieldPay Ledger"
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-slate-300">Description</label>
            <textarea
              rows={2}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Brief project summary..."
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-medium text-slate-300">Language</label>
              <select
                value={newLang}
                onChange={(e) => setNewLang(e.target.value as ProgrammingLanguage)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-2.5 py-2 text-slate-100"
              >
                <option value="Python">Python</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
                <option value="C++">C++</option>
                <option value="PHP">PHP</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-medium text-slate-300">Architecture</label>
              <select
                value={newArch}
                onChange={(e) => setNewArch(e.target.value as ArchitecturePattern)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-2.5 py-2 text-slate-100"
              >
                <option value="Clean">Clean</option>
                <option value="MVC">MVC</option>
                <option value="Layered">Layered</option>
                <option value="Three-Tier">Three-Tier</option>
                <option value="Microservices">Microservices</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-medium text-slate-300">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as ProjectType)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-2.5 py-2 text-slate-100"
              >
                <option value="Web Application">Web App</option>
                <option value="API / Backend">API / Backend</option>
                <option value="Mobile Application">Mobile</option>
                <option value="Desktop Application">Desktop</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="rounded-lg border border-[#22304A] px-4 py-2 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            >
              Create Project
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Project Deletion"
        maxWidthClass="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-300">
            Are you sure you want to delete{" "}
            <strong className="text-white">{deleteTarget?.name}</strong> from your workspace?
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg border border-[#22304A] px-4 py-2 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
            >
              Delete Project
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
