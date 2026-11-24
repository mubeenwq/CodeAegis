"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Edit3,
  FileCode2,
  Layers,
  Loader2,
  Play,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { analysisService } from "@/services/analysisService";
import { formatBytes } from "@/lib/utils";
import {
  ArchitecturePattern,
  ProgrammingLanguage,
  ProjectType,
  RequirementPriority,
  WizardRequirementDraft,
  WizardUploadedFile,
} from "@/types";

const LANGUAGES: ProgrammingLanguage[] = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "PHP",
  "C",
  "C++",
  "C#",
];

const PROJECT_TYPES: ProjectType[] = [
  "Web Application",
  "Desktop Application",
  "Mobile Application",
  "API / Backend",
  "Other",
];

const ARCHITECTURES: {
  id: ArchitecturePattern;
  name: string;
  description: string;
  layers: string[];
}[] = [
  {
    id: "MVC",
    name: "MVC Architecture",
    description: "Separates application data (Model), UI (View), and request orchestration (Controller).",
    layers: ["View", "Controller", "Model"],
  },
  {
    id: "Layered",
    name: "Layered Architecture",
    description: "Organizes code into horizontal tiers: Presentation, Business Logic, and Persistence.",
    layers: ["Presentation", "Business", "Persistence"],
  },
  {
    id: "Three-Tier",
    name: "Three-Tier Architecture",
    description: "Client tier, application server tier, and database tier with strict interface contracts.",
    layers: ["Client Tier", "App Server", "Data Tier"],
  },
  {
    id: "Clean",
    name: "Clean Architecture",
    description: "Concentric dependency rule pointing inward toward Domain Entities and Use Cases.",
    layers: ["Entities", "Use Cases", "Adapters", "Infra"],
  },
  {
    id: "Microservices",
    name: "Microservices Architecture",
    description: "Independently deployable bounded-context services communicating over APIs/events.",
    layers: ["API Gateway", "Service A", "Service B"],
  },
  {
    id: "Custom",
    name: "Custom Architecture",
    description: "Define custom module boundaries and dependency constraints for specialized codebases.",
    layers: ["Core", "Modules", "Boundaries"],
  },
];

const STEP_LABELS = [
  "Project Details",
  "Requirements",
  "Source Code",
  "Architecture",
  "Configuration",
  "Review & Start",
];

const SIMULATION_STAGES = [
  "Parsing uploaded source files & AST structure...",
  "Mapping functional requirements to code modules...",
  "Verifying architectural boundary compliance...",
  "Running simulated security & CWE pattern checks...",
  "Computing simulated ML risk scores & recommendations...",
];

export default function NewAnalysisWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 1
  const [projectName, setProjectName] = useState("OrderFlow API");
  const [projectDescription, setProjectDescription] = useState(
    "Payment and order orchestration service with user authentication."
  );
  const [language, setLanguage] = useState<ProgrammingLanguage>("Python");
  const [projectType, setProjectType] = useState<ProjectType>("API / Backend");

  // Step 2
  const [requirements, setRequirements] = useState<WizardRequirementDraft[]>([
    { id: "FR-001", description: "Users should be able to register.", priority: "High" },
    { id: "FR-002", description: "Users should be able to log in.", priority: "Critical" },
    { id: "FR-003", description: "Admin should be able to manage products.", priority: "High" },
    { id: "FR-004", description: "Users should be able to search products.", priority: "Medium" },
  ]);
  const [newReqId, setNewReqId] = useState("FR-005");
  const [newReqDesc, setNewReqDesc] = useState("");
  const [newReqPriority, setNewReqPriority] = useState<RequirementPriority>("Medium");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Step 3
  const [files, setFiles] = useState<WizardUploadedFile[]>([
    {
      id: "demo-f1",
      name: "process_payment.py",
      size: 14820,
      type: "text/x-python",
      status: "Validated",
    },
    {
      id: "demo-f2",
      name: "auth_routes.py",
      size: 9430,
      type: "text/x-python",
      status: "Validated",
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);

  // Step 4
  const [architecture, setArchitecture] = useState<ArchitecturePattern>("Clean");

  // Step 5
  const [engines, setEngines] = useState({
    requirementValidation: true,
    architectureVerification: true,
    securityAnalysis: true,
    mlRiskAssessment: true,
  });

  // Simulation state
  const [running, setRunning] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [stepError, setStepError] = useState("");

  const addOrSaveRequirement = () => {
    if (!newReqId.trim() || !newReqDesc.trim()) return;
    if (editingId) {
      setRequirements((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? { id: newReqId.trim(), description: newReqDesc.trim(), priority: newReqPriority }
            : r
        )
      );
      setEditingId(null);
    } else {
      setRequirements((prev) => [
        ...prev,
        { id: newReqId.trim(), description: newReqDesc.trim(), priority: newReqPriority },
      ]);
    }
    setNewReqId(`FR-${String(requirements.length + 2).padStart(3, "0")}`);
    setNewReqDesc("");
    setNewReqPriority("Medium");
  };

  const handleEditReq = (req: WizardRequirementDraft) => {
    setEditingId(req.id);
    setNewReqId(req.id);
    setNewReqDesc(req.description);
    setNewReqPriority(req.priority);
  };

  const handleDeleteReq = (id: string) => {
    setRequirements((prev) => prev.filter((r) => r.id !== id));
  };

  const handleFilesAdded = (fileList: FileList | null) => {
    if (!fileList) return;
    const added: WizardUploadedFile[] = Array.from(fileList).map((file, idx) => ({
      id: `up-${Date.now()}-${idx}`,
      name: file.name,
      size: file.size,
      type: file.type || "source/code",
      status: "Ready",
    }));
    setFiles((prev) => [...prev, ...added]);
  };

  const toggleAllEngines = (enabled: boolean) => {
    setEngines({
      requirementValidation: enabled,
      architectureVerification: enabled,
      securityAnalysis: enabled,
      mlRiskAssessment: enabled,
    });
  };

  const validateAndNext = () => {
    if (step === 0 && !projectName.trim()) {
      setStepError("Project name is required.");
      return;
    }
    if (step === 2 && files.length === 0) {
      setStepError("Please add at least one source file or ZIP archive.");
      return;
    }
    setStepError("");
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  };

  const handleStartAnalysis = () => {
    setRunning(true);
    setStageIndex(0);

    const interval = setInterval(() => {
      setStageIndex((prev) => {
        if (prev >= SIMULATION_STAGES.length - 1) {
          clearInterval(interval);
          const result = analysisService.createSimulatedAnalysis({
            projectName,
            projectDescription,
            language,
            projectType,
            requirements,
            files,
            architecture,
            engines,
          });
          setTimeout(() => {
            router.push(`/dashboard/analysis/${result.id}`);
          }, 450);
          return prev;
        }
        return prev + 1;
      });
    }, 550);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">New Analysis Wizard</h2>
        <p className="mt-1 text-sm text-slate-400">
          Configure project metadata, functional requirements, source files, and target architecture.
        </p>
      </div>

      <DemoBanner
        title="Simulated Analysis Pipeline"
        message="Files selected here stay in your browser. Clicking Start Analysis generates demonstration results to preview the full CodeAegis workflow."
      />

      {/* Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {STEP_LABELS.map((label, idx) => {
          const active = idx === step;
          const completed = idx < step;
          return (
            <button
              key={label}
              type="button"
              onClick={() => !running && idx <= step && setStep(idx)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs transition-colors ${
                active
                  ? "border-blue-500 bg-blue-500/15 text-white font-semibold"
                  : completed
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-[#22304A] bg-[#111B2E] text-slate-400"
              }`}
            >
              <span className="font-mono text-[11px]">
                {completed ? "✓" : `0${idx + 1}`}
              </span>
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>

      <Card className="p-6">
        {stepError && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
            {stepError}
          </div>
        )}

        {/* STEP 1: PROJECT DETAILS */}
        {step === 0 && (
          <div className="space-y-5 max-w-2xl">
            <h3 className="text-base font-semibold text-white">Step 1: Project Details</h3>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Project Description</label>
              <textarea
                rows={3}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Programming Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage)}
                  className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as ProjectType)}
                  className="w-full rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: REQUIREMENTS */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-white">Step 2: Functional Requirements</h3>
              <p className="text-xs text-slate-400">
                Add functional requirements to validate against your source code implementation.
              </p>
            </div>

            <div className="grid sm:grid-cols-12 gap-3 rounded-lg border border-[#22304A] bg-[#090D18] p-4">
              <input
                type="text"
                value={newReqId}
                onChange={(e) => setNewReqId(e.target.value)}
                placeholder="FR-005"
                className="sm:col-span-2 rounded-lg border border-[#22304A] bg-[#111B2E] px-3 py-2 text-xs text-slate-100 font-mono"
              />
              <input
                type="text"
                value={newReqDesc}
                onChange={(e) => setNewReqDesc(e.target.value)}
                placeholder="Describe functional requirement..."
                className="sm:col-span-6 rounded-lg border border-[#22304A] bg-[#111B2E] px-3 py-2 text-xs text-slate-100"
              />
              <select
                value={newReqPriority}
                onChange={(e) => setNewReqPriority(e.target.value as RequirementPriority)}
                className="sm:col-span-2 rounded-lg border border-[#22304A] bg-[#111B2E] px-3 py-2 text-xs text-slate-100"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button
                type="button"
                onClick={addOrSaveRequirement}
                className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500"
              >
                <Plus className="h-3.5 w-3.5" />
                {editingId ? "Update" : "Add"}
              </button>
            </div>

            <div className="space-y-2">
              {requirements.map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#22304A] bg-[#090D18] px-4 py-3 text-xs"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <Badge tone="cyan" className="font-mono">
                      {req.id}
                    </Badge>
                    <span className="text-slate-200">{req.description}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      tone={
                        req.priority === "Critical"
                          ? "danger"
                          : req.priority === "High"
                          ? "warning"
                          : "blue"
                      }
                    >
                      {req.priority}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => handleEditReq(req)}
                      aria-label={`Edit ${req.id}`}
                      className="rounded p-1.5 text-slate-400 hover:bg-[#111B2E] hover:text-slate-100"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteReq(req.id)}
                      aria-label={`Delete ${req.id}`}
                      className="rounded p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: SOURCE CODE UPLOAD */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-white">Step 3: Source Code Upload</h3>
              <p className="text-xs text-slate-400">
                Supported formats: .zip, .py, .java, .js, .ts, .tsx, .php, .c, .cpp, .cs (Max 50 MB simulated).
              </p>
            </div>

            <label
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFilesAdded(e.dataTransfer.files);
              }}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-[#22304A] bg-[#090D18] hover:border-blue-500/50"
              }`}
            >
              <UploadCloud className="h-10 w-10 text-cyan-400 mb-3" />
              <p className="text-sm font-medium text-white">
                Drag and drop source files or ZIP archive here
              </p>
              <p className="mt-1 text-xs text-slate-400">
                or click to browse local files (frontend simulation only)
              </p>
              <input
                type="file"
                multiple
                onChange={(e) => handleFilesAdded(e.target.files)}
                className="hidden"
              />
            </label>

            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-lg border border-[#22304A] bg-[#090D18] px-4 py-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileCode2 className="h-4 w-4 text-blue-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-100">{file.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {file.type} · {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge tone="success">{file.status}</Badge>
                    <button
                      type="button"
                      onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
                      aria-label={`Remove ${file.name}`}
                      className="rounded p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: ARCHITECTURE SELECTION */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-white">Step 4: Architecture Selection</h3>
              <p className="text-xs text-slate-400">
                Select the intended architectural pattern to verify component boundaries.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ARCHITECTURES.map((arch) => {
                const selected = architecture === arch.id;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => setArchitecture(arch.id)}
                    className={`rounded-xl border p-4 text-left transition-all space-y-3 ${
                      selected
                        ? "border-cyan-400 bg-blue-500/10"
                        : "border-[#22304A] bg-[#090D18] hover:border-blue-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{arch.name}</span>
                      <Layers className={`h-4 w-4 ${selected ? "text-cyan-400" : "text-slate-500"}`} />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{arch.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {arch.layers.map((layer) => (
                        <span
                          key={layer}
                          className="rounded border border-[#22304A] bg-[#111B2E] px-2 py-0.5 text-[10px] font-mono text-slate-300"
                        >
                          {layer}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: ANALYSIS CONFIGURATION */}
        {step === 4 && (
          <div className="space-y-5 max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Step 5: Analysis Configuration</h3>
                <p className="text-xs text-slate-400">
                  Choose which intelligence engines to run in this analysis.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  toggleAllEngines(
                    !(
                      engines.requirementValidation &&
                      engines.architectureVerification &&
                      engines.securityAnalysis &&
                      engines.mlRiskAssessment
                    )
                  )
                }
                className="rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-1.5 text-xs font-medium text-cyan-400 hover:border-cyan-500/50"
              >
                Toggle All Engines
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: "requirementValidation" as const,
                  title: "Requirement Validation Engine",
                  desc: "Verify functional and security requirements against source files.",
                },
                {
                  key: "architectureVerification" as const,
                  title: "Architecture Verification Engine",
                  desc: "Detect layer boundary violations and architectural drift.",
                },
                {
                  key: "securityAnalysis" as const,
                  title: "Security Analysis Engine",
                  desc: "Identify CWE vulnerabilities, insecure patterns, and remediation steps.",
                },
                {
                  key: "mlRiskAssessment" as const,
                  title: "ML Risk Assessment Engine (Simulated)",
                  desc: "Predict module risk scores and prioritize high-risk code blocks.",
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start justify-between gap-4 rounded-xl border border-[#22304A] bg-[#090D18] p-4 cursor-pointer hover:border-blue-500/40"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={engines[item.key]}
                    onChange={(e) =>
                      setEngines((prev) => ({ ...prev, [item.key]: e.target.checked }))
                    }
                    className="mt-1 h-4 w-4 rounded border-[#22304A] bg-[#111B2E] text-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW AND START */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-white">Step 6: Review & Start Analysis</h3>
              <p className="text-xs text-slate-400">
                Confirm your configuration before launching the simulated analysis pipeline.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-4">
                <p className="text-slate-400">Project</p>
                <p className="mt-1 text-sm font-semibold text-white">{projectName}</p>
                <p className="mt-1 text-cyan-400">{language} · {projectType}</p>
              </div>
              <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-4">
                <p className="text-slate-400">Requirements</p>
                <p className="mt-1 text-sm font-semibold text-white">{requirements.length} Specs</p>
                <p className="mt-1 text-slate-400">Traceability enabled</p>
              </div>
              <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-4">
                <p className="text-slate-400">Uploaded Files</p>
                <p className="mt-1 text-sm font-semibold text-white">{files.length} Files</p>
                <p className="mt-1 text-slate-400">Client-side simulation</p>
              </div>
              <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-4">
                <p className="text-slate-400">Architecture</p>
                <p className="mt-1 text-sm font-semibold text-white">{architecture}</p>
                <p className="mt-1 text-purple-400">
                  {Object.values(engines).filter(Boolean).length}/4 Engines active
                </p>
              </div>
            </div>

            {running && (
              <div className="rounded-xl border border-blue-500/30 bg-[#090D18] p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Running Simulated Analysis Pipeline...</span>
                </div>
                <div className="space-y-2">
                  {SIMULATION_STAGES.map((label, idx) => (
                    <div key={label} className="flex items-center gap-2.5 text-xs">
                      {idx < stageIndex ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : idx === stageIndex ? (
                        <Cpu className="h-4 w-4 text-cyan-400 animate-pulse shrink-0" />
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-[#22304A] shrink-0" />
                      )}
                      <span
                        className={
                          idx <= stageIndex ? "text-slate-200" : "text-slate-500"
                        }
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-8 pt-5 border-t border-[#22304A] flex items-center justify-between">
          <button
            type="button"
            disabled={step === 0 || running}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#22304A] bg-[#090D18] px-4 py-2 text-xs font-medium text-slate-300 hover:border-slate-500 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          {step < STEP_LABELS.length - 1 ? (
            <button
              type="button"
              onClick={validateAndNext}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Next Step
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={running}
              onClick={handleStartAnalysis}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
            >
              <Play className="h-3.5 w-3.5" />
              {running ? "Analyzing..." : "Start Analysis"}
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
