"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  FolderKanban,
  Layers,
  ListChecks,
  PlusCircle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
import { SeverityBadge, StatusBadge } from "@/components/ui/Badge";
import { DemoBanner } from "@/components/ui/DemoBanner";
import {
  DonutDistributionChart,
  RiskTrendAreaChart,
  SeverityBarChart,
} from "@/components/charts/DashboardCharts";
import { analysisService } from "@/services/analysisService";
import { projectService } from "@/services/projectService";
import { requirementService } from "@/services/requirementService";
import { securityService } from "@/services/securityService";
import { AnalysisResult, Project, Requirement, SecurityFinding } from "@/types";

export default function DashboardOverviewPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [findings, setFindings] = useState<SecurityFinding[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    setProjects(projectService.getAll());
    setAnalyses(analysisService.getAll());
    setFindings(securityService.getAll());
    setRequirements(requirementService.getAll());
  }, []);

  const totalFindings = findings.length;
  const highRiskIssues = findings.filter(
    (f) => f.severity === "Critical" || f.severity === "High"
  ).length;

  const avgArchCompliance =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + p.architectureCompliance, 0) / projects.length
        )
      : 82;

  const avgReqCoverage =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + p.requirementCoverage, 0) / projects.length
        )
      : 84;

  const severityChartData = [
    {
      name: "Critical",
      count: findings.filter((f) => f.severity === "Critical").length,
      color: "#EF4444",
    },
    {
      name: "High",
      count: findings.filter((f) => f.severity === "High").length,
      color: "#F59E0B",
    },
    {
      name: "Medium",
      count: findings.filter((f) => f.severity === "Medium").length,
      color: "#3B82F6",
    },
    {
      name: "Low",
      count: findings.filter((f) => f.severity === "Low").length,
      color: "#06B6D4",
    },
  ];

  const archComplianceData = [
    { name: "Compliant Components", value: 18, color: "#22C55E" },
    { name: "Violating Components", value: 5, color: "#F59E0B" },
  ];

  const reqCoverageData = [
    {
      name: "Implemented",
      value: requirements.filter((r) => r.status === "Implemented").length || 4,
      color: "#22C55E",
    },
    {
      name: "Partially Implemented",
      value: requirements.filter((r) => r.status === "Partially Implemented").length || 3,
      color: "#F59E0B",
    },
    {
      name: "Missing",
      value: requirements.filter((r) => r.status === "Missing").length || 1,
      color: "#EF4444",
    },
  ];

  const riskTrend = analysisService.getRiskTrend();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Security Overview</h2>
          <p className="mt-1 text-sm text-slate-400">
            Monitor your projects, track vulnerabilities, and maintain architectural compliance.
          </p>
        </div>
        <Link
          href="/dashboard/new-analysis"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shrink-0"
        >
          <PlusCircle className="h-4 w-4" />
          Start New Analysis
        </Link>
      </div>

      <DemoBanner />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          title="Total Projects"
          value={projects.length}
          subtitle="Active monitored repositories"
          icon={FolderKanban}
          accent="blue"
        />
        <StatCard
          title="Total Analyses"
          value={analyses.length}
          subtitle="Completed architecture & security runs"
          icon={Activity}
          accent="cyan"
        />
        <StatCard
          title="Security Findings"
          value={totalFindings}
          subtitle="Across all tracked projects"
          icon={ShieldAlert}
          accent="warning"
        />
        <StatCard
          title="High-Risk Issues"
          value={highRiskIssues}
          subtitle="Critical & High severity vulnerabilities"
          icon={ShieldCheck}
          accent="danger"
        />
        <StatCard
          title="Architecture Compliance"
          value={`${avgArchCompliance}%`}
          subtitle="Average layer boundary adherence"
          icon={Layers}
          accent="purple"
        />
        <StatCard
          title="Requirement Coverage"
          value={`${avgReqCoverage}%`}
          subtitle="Traceable functional & security specs"
          icon={ListChecks}
          accent="success"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Security Findings by Severity</h3>
              <p className="text-xs text-slate-400">Distribution across Critical, High, Medium, and Low</p>
            </div>
          </div>
          <SeverityBarChart data={severityChartData} />
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Risk Trend (Last 30 Days)</h3>
              <p className="text-xs text-slate-400">Aggregate portfolio risk score progression</p>
            </div>
          </div>
          <RiskTrendAreaChart data={riskTrend} />
        </Card>

        <Card className="p-5">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-white">Architecture Compliance</h3>
            <p className="text-xs text-slate-400">Compliant vs. violating architectural components</p>
          </div>
          <div className="grid sm:grid-cols-2 items-center gap-4">
            <DonutDistributionChart data={archComplianceData} />
            <div className="space-y-3 text-xs">
              {archComplianceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-[#090D18] px-3 py-2 border border-[#22304A]">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-white">Requirement Coverage</h3>
            <p className="text-xs text-slate-400">Implementation traceability across registered specs</p>
          </div>
          <div className="grid sm:grid-cols-2 items-center gap-4">
            <DonutDistributionChart data={reqCoverageData} />
            <div className="space-y-2.5 text-xs">
              {reqCoverageData.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-[#090D18] px-3 py-2 border border-[#22304A]">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Analyses Table */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#22304A] px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent Analyses</h3>
            <p className="text-xs text-slate-400">Latest requirement, architecture, and security runs</p>
          </div>
          <Link
            href="/dashboard/projects"
            className="text-xs font-medium text-cyan-400 hover:underline"
          >
            View All Projects
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#22304A] bg-[#0D1424] text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 font-medium">Project Name</th>
                <th className="px-4 py-3 font-medium">Language</th>
                <th className="px-4 py-3 font-medium">Architecture</th>
                <th className="px-4 py-3 font-medium">Analysis Date</th>
                <th className="px-4 py-3 font-medium">Findings</th>
                <th className="px-4 py-3 font-medium">Risk Level</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22304A]">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#16223A]/60 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-100">{proj.name}</td>
                  <td className="px-4 py-3.5 text-slate-300">{proj.language}</td>
                  <td className="px-4 py-3.5 text-slate-300">{proj.architecture}</td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono">{proj.lastAnalysisDate}</td>
                  <td className="px-4 py-3.5 text-slate-200">{proj.findingsCount}</td>
                  <td className="px-4 py-3.5">
                    <SeverityBadge
                      severity={
                        proj.riskScore >= 75
                          ? "Critical"
                          : proj.riskScore >= 55
                          ? "High"
                          : proj.riskScore >= 30
                          ? "Medium"
                          : "Low"
                      }
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={proj.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/dashboard/analysis/${proj.latestAnalysisId}`}
                      className="inline-flex items-center gap-1 rounded-md border border-[#22304A] bg-[#090D18] px-2.5 py-1 text-xs font-medium text-cyan-400 hover:border-cyan-500/50 transition-colors"
                    >
                      View Details
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
