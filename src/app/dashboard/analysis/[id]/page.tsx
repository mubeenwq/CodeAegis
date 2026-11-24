"use client";

import { use, useEffect, useState } from "react";
import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Download,
  FileCode2,
  Layers,
  ListChecks,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
import { Badge, SeverityBadge, StatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { DemoBanner } from "@/components/ui/DemoBanner";
import {
  DonutDistributionChart,
  SeverityBarChart,
} from "@/components/charts/DashboardCharts";
import { analysisService } from "@/services/analysisService";
import { requirementService } from "@/services/requirementService";
import { securityService } from "@/services/securityService";
import { downloadTextFile } from "@/lib/utils";
import { AnalysisResult, Requirement, SecurityFinding } from "@/types";

type TabKey =
  | "overview"
  | "requirements"
  | "architecture"
  | "security"
  | "risk"
  | "recommendations";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "requirements", label: "Requirements" },
  { key: "architecture", label: "Architecture" },
  { key: "security", label: "Security" },
  { key: "risk", label: "Risk Assessment" },
  { key: "recommendations", label: "Recommendations" },
];

export default function AnalysisResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [findings, setFindings] = useState<SecurityFinding[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [selectedFinding, setSelectedFinding] = useState<SecurityFinding | null>(null);
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(null);

  useEffect(() => {
    const res = analysisService.getById(id);
    if (res) {
      setAnalysis(res);
      const reqs = requirementService.getByProject(res.projectId);
      setRequirements(reqs.length > 0 ? reqs : requirementService.getAll().slice(0, 4));
      setFindings(securityService.getByAnalysis(res.id));
    }
  }, [id]);

  if (!analysis) {
    return (
      <Card className="p-8 text-center text-sm text-slate-400">
        Loading analysis details...
      </Card>
    );
  }

  const handleExport = () => {
    const content = [
      `CodeAegis Analysis Report (Prototype Demo)`,
      `Analysis ID: ${analysis.id}`,
      `Project: ${analysis.projectName}`,
      `Date: ${analysis.date}`,
      `Language: ${analysis.language} | Architecture: ${analysis.architecture}`,
      `Overall Risk Score: ${analysis.overallRiskScore}/100 (${analysis.riskLevel})`,
      `Requirement Coverage: ${analysis.requirementCoverage}%`,
      `Architecture Compliance: ${analysis.architectureCompliance}%`,
      `Total Vulnerabilities: ${analysis.totalVulnerabilities}`,
    ].join("\n");
    downloadTextFile(`${analysis.id.toLowerCase()}-report.txt`, content, "text/plain");
  };

  const severityData = [
    { name: "Critical", count: analysis.severityBreakdown.critical, color: "#EF4444" },
    { name: "High", count: analysis.severityBreakdown.high, color: "#F59E0B" },
    { name: "Medium", count: analysis.severityBreakdown.medium, color: "#3B82F6" },
    { name: "Low", count: analysis.severityBreakdown.low, color: "#06B6D4" },
  ];

  const riskDistData = [
    { name: "Low Risk", value: 42, color: "#22C55E" },
    { name: "Medium Risk", value: 35, color: "#F59E0B" },
    { name: "High Risk", value: 23, color: "#EF4444" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="cyan" className="font-mono">
              {analysis.id}
            </Badge>
            <Badge tone="purple">Simulated Demo Results</Badge>
            <span className="text-xs text-slate-400 font-mono">{analysis.date}</span>
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold text-white">
            {analysis.projectName}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Language: <span className="text-slate-200">{analysis.language}</span> · Architecture:{" "}
            <span className="text-slate-200">{analysis.architecture}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-lg border border-[#22304A] bg-[#111B2E] px-4 py-2.5 text-xs font-semibold text-slate-100 hover:border-cyan-500/50 transition-colors self-start"
        >
          <Download className="h-4 w-4 text-cyan-400" />
          Export Report
        </button>
      </div>

      <DemoBanner />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Overall Risk Score"
          value={`${analysis.overallRiskScore}/100`}
          subtitle={`${analysis.riskLevel} Risk`}
          icon={AlertTriangle}
          accent={analysis.overallRiskScore >= 70 ? "danger" : "warning"}
        />
        <StatCard
          title="Total Vulnerabilities"
          value={analysis.totalVulnerabilities}
          subtitle="Detected security issues"
          icon={ShieldAlert}
          accent="warning"
        />
        <StatCard
          title="Requirement Coverage"
          value={`${analysis.requirementCoverage}%`}
          subtitle="Traceable specs"
          icon={ListChecks}
          accent="cyan"
        />
        <StatCard
          title="Arch Compliance"
          value={`${analysis.architectureCompliance}%`}
          subtitle={`${analysis.architecture} pattern`}
          icon={Layers}
          accent="purple"
        />
        <StatCard
          title="Critical Findings"
          value={analysis.criticalFindings}
          subtitle="Immediate action required"
          icon={ShieldAlert}
          accent="danger"
        />
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-[#22304A] gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-white mb-1">
              Security Findings by Severity
            </h3>
            <p className="text-xs text-slate-400 mb-4">Breakdown of detected vulnerabilities</p>
            <SeverityBarChart data={severityData} />
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Risk Distribution</h3>
            <p className="text-xs text-slate-400 mb-2">Module-level risk posture</p>
            <div className="grid sm:grid-cols-2 items-center gap-4">
              <DonutDistributionChart data={riskDistData} />
              <div className="space-y-2.5 text-xs">
                {riskDistData.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2"
                  >
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </span>
                    <span className="font-semibold text-white">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5 lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-3">Analysis Summary</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-4">
                <p className="text-slate-400">Requirement Implementation</p>
                <p className="mt-1 text-lg font-semibold text-cyan-400">
                  {analysis.requirementCoverage}% Verified
                </p>
                <p className="mt-1 text-slate-400">
                  {requirements.filter((r) => r.status === "Missing").length} missing specifications flagged
                </p>
              </div>
              <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-4">
                <p className="text-slate-400">Architecture Adherence</p>
                <p className="mt-1 text-lg font-semibold text-purple-400">
                  {analysis.architectureCompliance}% Compliant
                </p>
                <p className="mt-1 text-slate-400">
                  {analysis.violations.length} layer boundary violations
                </p>
              </div>
              <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-4">
                <p className="text-slate-400">Simulated ML Confidence</p>
                <p className="mt-1 text-lg font-semibold text-emerald-400">
                  {analysis.modelConfidence}%
                </p>
                <p className="mt-1 text-slate-400">Prototype demo confidence score</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: REQUIREMENTS */}
      {activeTab === "requirements" && (
        <Card className="overflow-hidden">
          <div className="border-b border-[#22304A] px-5 py-4">
            <h3 className="text-sm font-semibold text-white">Requirement Traceability Matrix</h3>
            <p className="text-xs text-slate-400">
              Click any requirement to inspect matched functions and line-level evidence.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#22304A] bg-[#0D1424] text-slate-400 uppercase">
                <tr>
                  <th className="px-5 py-3">Req ID</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Matched Files</th>
                  <th className="px-4 py-3">Match Score</th>
                  <th className="px-5 py-3 text-right">Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22304A]">
                {requirements.map((req) => (
                  <tr key={req.id} className="hover:bg-[#16223A]/60">
                    <td className="px-5 py-3.5 font-mono text-cyan-400 font-medium">{req.id}</td>
                    <td className="px-4 py-3.5 text-slate-200 max-w-md">{req.description}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-4 py-3.5 text-slate-400 font-mono">
                      {req.matchedFiles.length > 0 ? req.matchedFiles.join(", ") : "None"}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-white">{req.matchScore}%</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedReq(req)}
                        className="rounded-md border border-[#22304A] bg-[#090D18] px-2.5 py-1 text-cyan-400 hover:border-cyan-500/50"
                      >
                        View Evidence
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: ARCHITECTURE */}
      {activeTab === "architecture" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-5 space-y-3">
              <h3 className="text-sm font-semibold text-white">
                Expected {analysis.architecture} Components
              </h3>
              <div className="space-y-2">
                {analysis.expectedComponents.map((comp) => (
                  <div
                    key={comp}
                    className="flex items-center gap-2 rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 space-y-3">
              <h3 className="text-sm font-semibold text-white">Actual Detected Structure</h3>
              <div className="space-y-2">
                {analysis.detectedComponents.map((comp) => (
                  <div
                    key={comp.name}
                    className="rounded-lg border border-[#22304A] bg-[#090D18] p-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{comp.name}</span>
                      <Badge tone={comp.compliant ? "success" : "warning"}>
                        {comp.compliant ? "Compliant" : "Violation"} · {comp.files} files
                      </Badge>
                    </div>
                    <p className="mt-1 text-slate-400">{comp.notes}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white">Architecture Violations</h3>
            {analysis.violations.length === 0 ? (
              <p className="text-xs text-emerald-400">
                No architectural boundary violations detected in this run.
              </p>
            ) : (
              <div className="space-y-3">
                {analysis.violations.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-xl border border-amber-500/30 bg-[#090D18] p-4 space-y-2 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-cyan-400">
                        {v.file}:{v.line}
                      </span>
                      <SeverityBadge severity={v.severity} />
                    </div>
                    <p className="text-sm font-medium text-white">{v.description}</p>
                    <p className="text-slate-400">
                      <strong className="text-slate-300">Expected Responsibility:</strong>{" "}
                      {v.expectedResponsibility}
                    </p>
                    <p className="text-emerald-400">
                      <strong>Suggested Correction:</strong> {v.suggestedCorrection}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* TAB 4: SECURITY */}
      {activeTab === "security" && (
        <Card className="overflow-hidden">
          <div className="border-b border-[#22304A] px-5 py-4">
            <h3 className="text-sm font-semibold text-white">Detected Security Vulnerabilities</h3>
            <p className="text-xs text-slate-400">
              Select a finding to inspect vulnerable code, secure replacement, and recommended tests.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#22304A] bg-[#0D1424] text-slate-400 uppercase">
                <tr>
                  <th className="px-5 py-3">Finding ID</th>
                  <th className="px-4 py-3">Vulnerability</th>
                  <th className="px-4 py-3">CWE</th>
                  <th className="px-4 py-3">File</th>
                  <th className="px-4 py-3">Line</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22304A]">
                {findings.map((f) => (
                  <tr key={f.id} className="hover:bg-[#16223A]/60">
                    <td className="px-5 py-3.5 font-mono text-cyan-400">{f.id}</td>
                    <td className="px-4 py-3.5 font-medium text-white">{f.title}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-300">{f.cwe}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-400">{f.file}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-300">{f.line}</td>
                    <td className="px-4 py-3.5">
                      <SeverityBadge severity={f.severity} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={f.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedFinding(f)}
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
      )}

      {/* TAB 5: RISK ASSESSMENT */}
      {activeTab === "risk" && (
        <div className="space-y-6">
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-xs text-purple-200 flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-purple-400 shrink-0" />
            <span>
              <strong>Simulated ML Predictions:</strong> Risk scores and classifications below are demonstration outputs until trained ML models are connected in the backend phase.
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white">Risk Contributing Factors</h3>
              <div className="space-y-3">
                {analysis.riskFactors.map((rf) => (
                  <div key={rf.factor} className="rounded-lg border border-[#22304A] bg-[#090D18] p-3.5 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{rf.factor}</span>
                      <Badge tone={rf.severity === "High" ? "danger" : "warning"}>
                        +{rf.impact}% impact
                      </Badge>
                    </div>
                    <p className="text-slate-400">{rf.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white">High-Risk Code Sections</h3>
              <div className="space-y-2.5">
                {analysis.highRiskFiles.map((hr) => (
                  <div key={hr.file} className="flex items-center justify-between rounded-lg border border-[#22304A] bg-[#090D18] px-3.5 py-3 text-xs">
                    <div className="min-w-0">
                      <p className="font-mono text-slate-200 truncate">{hr.file}</p>
                      <p className="text-[11px] text-slate-400">
                        Complexity: {hr.complexity} · Findings: {hr.findings}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-semibold text-white">{hr.riskScore}/100</span>
                      <Badge tone={hr.classification === "High Risk" ? "danger" : "warning"}>
                        {hr.classification}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 6: RECOMMENDATIONS */}
      {activeTab === "recommendations" && (
        <div className="space-y-4">
          {analysis.recommendations.map((rec) => (
            <Card key={rec.id} className="p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-white">{rec.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="cyan" className="font-mono">{rec.relatedFindingId}</Badge>
                  <SeverityBadge severity={rec.priority} />
                </div>
              </div>
              <p className="text-xs text-slate-300">{rec.explanation}</p>
              <div className="grid md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-3">
                  <p className="font-semibold text-emerald-400 mb-1">Suggested Fix</p>
                  <p className="text-slate-300">{rec.suggestedFix}</p>
                </div>
                <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-3">
                  <p className="font-semibold text-blue-400 mb-1">Recommended Security Test</p>
                  <p className="text-slate-300">{rec.securityTest}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Finding Detail Modal */}
      <Modal
        open={Boolean(selectedFinding)}
        onClose={() => setSelectedFinding(null)}
        title={selectedFinding ? `${selectedFinding.id}: ${selectedFinding.title}` : ""}
        subtitle={
          selectedFinding
            ? `${selectedFinding.cwe} · ${selectedFinding.file}:${selectedFinding.line}`
            : ""
        }
        maxWidthClass="max-w-3xl"
      >
        {selectedFinding && (
          <div className="space-y-5 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={selectedFinding.severity} />
              <StatusBadge status={selectedFinding.status} />
              <Badge tone="neutral">{selectedFinding.category}</Badge>
            </div>

            <div className="space-y-1.5">
              <p className="font-semibold text-slate-200">Vulnerability Explanation</p>
              <p className="text-slate-300 leading-relaxed">{selectedFinding.explanation}</p>
            </div>

            <div className="space-y-1.5">
              <p className="font-semibold text-red-400">Why It Is Dangerous</p>
              <p className="text-slate-300 leading-relaxed">{selectedFinding.impact}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <p className="font-semibold text-red-400">Vulnerable Code</p>
                <pre className="rounded-lg border border-red-500/30 bg-[#090D18] p-3 font-mono text-[11px] text-slate-200 overflow-x-auto">
                  {selectedFinding.vulnerableCode}
                </pre>
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold text-emerald-400">Suggested Secure Code</p>
                <pre className="rounded-lg border border-emerald-500/30 bg-[#090D18] p-3 font-mono text-[11px] text-slate-200 overflow-x-auto">
                  {selectedFinding.secureCode}
                </pre>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="font-semibold text-slate-200">Remediation Steps</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                {selectedFinding.remediationSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <p className="font-semibold text-cyan-400">Recommended Security Test Cases</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                {selectedFinding.recommendedTests.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Requirement Evidence Modal */}
      <Modal
        open={Boolean(selectedReq)}
        onClose={() => setSelectedReq(null)}
        title={selectedReq ? `${selectedReq.id}: ${selectedReq.title}` : ""}
        subtitle={selectedReq ? `${selectedReq.category} · Match Score ${selectedReq.matchScore}%` : ""}
      >
        {selectedReq && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-300">{selectedReq.description}</p>
            <div>
              <p className="font-semibold text-slate-200 mb-1">Matched Functions</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedReq.matchedFunctions.length > 0 ? (
                  selectedReq.matchedFunctions.map((fn) => (
                    <Badge key={fn} tone="cyan" className="font-mono">
                      {fn}()
                    </Badge>
                  ))
                ) : (
                  <span className="text-slate-400">No implementing functions detected.</span>
                )}
              </div>
            </div>
            {selectedReq.evidence.map((ev) => (
              <div key={ev.file} className="space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-cyan-400">
                  <FileCode2 className="h-3.5 w-3.5" />
                  <span>
                    {ev.file} (Lines {ev.lineStart}–{ev.lineEnd})
                  </span>
                </div>
                <pre className="rounded-lg border border-[#22304A] bg-[#090D18] p-3 font-mono text-[11px] text-slate-200 overflow-x-auto">
                  {ev.snippet}
                </pre>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
