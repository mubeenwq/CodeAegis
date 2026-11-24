"use client";

import { useEffect, useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { projectService } from "@/services/projectService";
import { requirementService } from "@/services/requirementService";
import {
  Project,
  Requirement,
  RequirementCategory,
  RequirementPriority,
  RequirementStatus,
} from "@/types";

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Requirement | null>(null);

  const [reqId, setReqId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<RequirementCategory>("Functional");
  const [priority, setPriority] = useState<RequirementPriority>("High");
  const [projectId, setProjectId] = useState("proj-finvault");
  const [status, setStatus] = useState<RequirementStatus>("Implemented");

  useEffect(() => {
    setRequirements(requirementService.getAll());
    setProjects(projectService.getAll());
  }, []);

  const openCreate = () => {
    setEditing(null);
    setReqId(`FR-${String(requirements.length + 10).padStart(3, "0")}`);
    setTitle("");
    setDescription("");
    setCategory("Functional");
    setPriority("High");
    setProjectId(projects[0]?.id || "proj-finvault");
    setStatus("Implemented");
    setModalOpen(true);
  };

  const openEdit = (req: Requirement) => {
    setEditing(req);
    setReqId(req.id);
    setTitle(req.title);
    setDescription(req.description);
    setCategory(req.category);
    setPriority(req.priority);
    setProjectId(req.projectId);
    setStatus(req.status);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const project = projects.find((p) => p.id === projectId);
    const payload: Requirement = {
      id: reqId.trim() || `FR-${Date.now().toString().slice(-3)}`,
      projectId,
      projectName: project?.name || "FinVault Payment Gateway",
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      matchScore: status === "Implemented" ? 92 : status === "Partially Implemented" ? 65 : 15,
      matchedFiles: editing?.matchedFiles ?? [],
      matchedFunctions: editing?.matchedFunctions ?? [],
      evidence: editing?.evidence ?? [],
    };
    const updated = editing
      ? requirementService.update(payload)
      : requirementService.create(payload);
    setRequirements(updated);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setRequirements(requirementService.remove(id));
  };

  const filtered = requirements.filter((r) => {
    const q = search.toLowerCase();
    const matchesQ =
      r.id.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q);
    const matchesCat = categoryFilter === "All" || r.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesQ && matchesCat && matchesStatus;
  });

  const implementedCount = requirements.filter((r) => r.status === "Implemented").length;
  const partialCount = requirements.filter((r) => r.status === "Partially Implemented").length;
  const missingCount = requirements.filter((r) => r.status === "Missing").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Requirements Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Define functional and security specifications and track code implementation coverage.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 self-start"
        >
          <Plus className="h-4 w-4" />
          New Requirement
        </button>
      </div>

      {/* Visual Traceability Summary Bar */}
      <Card className="p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-white">Implementation Traceability Overview</span>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="text-emerald-400">{implementedCount} Implemented</span>
            <span className="text-amber-400">{partialCount} Partial</span>
            <span className="text-red-400">{missingCount} Missing</span>
          </div>
        </div>
        <div className="h-2.5 w-full rounded-full bg-[#090D18] overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full"
            style={{ width: `${(implementedCount / Math.max(1, requirements.length)) * 100}%` }}
          />
          <div
            className="bg-amber-500 h-full"
            style={{ width: `${(partialCount / Math.max(1, requirements.length)) * 100}%` }}
          />
          <div
            className="bg-red-500 h-full"
            style={{ width: `${(missingCount / Math.max(1, requirements.length)) * 100}%` }}
          />
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, title, or description..."
            className="w-full rounded-lg border border-[#22304A] bg-[#090D18] pl-9 pr-3 py-2 text-xs text-slate-100"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-xs text-slate-200"
        >
          <option value="All">All Categories</option>
          <option value="Functional">Functional</option>
          <option value="Non-Functional">Non-Functional</option>
          <option value="Security">Security</option>
          <option value="Performance">Performance</option>
          <option value="Usability">Usability</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-xs text-slate-200"
        >
          <option value="All">All Statuses</option>
          <option value="Implemented">Implemented</option>
          <option value="Partially Implemented">Partially Implemented</option>
          <option value="Missing">Missing</option>
        </select>
      </Card>

      {/* Requirements Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#22304A] bg-[#0D1424] text-slate-400 uppercase">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-4 py-3">Requirement</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22304A]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#16223A]/60">
                  <td className="px-5 py-3.5 font-mono text-cyan-400 font-medium">{r.id}</td>
                  <td className="px-4 py-3.5 max-w-md">
                    <p className="font-semibold text-white">{r.title}</p>
                    <p className="text-slate-400 mt-0.5 line-clamp-1">{r.description}</p>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">{r.projectName}</td>
                  <td className="px-4 py-3.5">
                    <Badge tone="blue">{r.category}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge
                      tone={
                        r.priority === "Critical"
                          ? "danger"
                          : r.priority === "High"
                          ? "warning"
                          : "neutral"
                      }
                    >
                      {r.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-1">
                    <button
                      type="button"
                      onClick={() => openEdit(r)}
                      aria-label={`Edit ${r.id}`}
                      className="rounded p-1.5 text-slate-400 hover:bg-[#090D18] hover:text-cyan-400"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(r.id)}
                      aria-label={`Delete ${r.id}`}
                      className="rounded p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit ${editing.id}` : "Create Requirement"}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-medium text-slate-300">Requirement ID</label>
              <input
                type="text"
                required
                value={reqId}
                onChange={(e) => setReqId(e.target.value)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 font-mono text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-medium text-slate-300">Linked Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-slate-100"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-medium text-slate-300">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-medium text-slate-300">Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-slate-100"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-medium text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RequirementCategory)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-2.5 py-2 text-slate-100"
              >
                <option value="Functional">Functional</option>
                <option value="Non-Functional">Non-Functional</option>
                <option value="Security">Security</option>
                <option value="Performance">Performance</option>
                <option value="Usability">Usability</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-medium text-slate-300">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as RequirementPriority)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-2.5 py-2 text-slate-100"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-medium text-slate-300">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as RequirementStatus)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-2.5 py-2 text-slate-100"
              >
                <option value="Implemented">Implemented</option>
                <option value="Partially Implemented">Partially Implemented</option>
                <option value="Missing">Missing</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-lg border border-[#22304A] px-4 py-2 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            >
              Save Requirement
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
