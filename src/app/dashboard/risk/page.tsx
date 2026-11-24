"use client";

import { useEffect, useState } from "react";
import { Activity, AlertTriangle, BrainCircuit, Info } from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DemoBanner } from "@/components/ui/DemoBanner";
import {
  DonutDistributionChart,
  RiskTrendAreaChart,
} from "@/components/charts/DashboardCharts";
import { analysisService } from "@/services/analysisService";
import { riskService } from "@/services/riskService";
import { HighRiskFile, RiskFactor } from "@/types";

export default function RiskAssessmentPage() {
  const [avgRisk, setAvgRisk] = useState(54);
  const [highRiskFiles, setHighRiskFiles] = useState<HighRiskFile[]>([]);
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
  const [distribution, setDistribution] = useState<
    { name: string; value: number; color: string }[]
  >([]);

  useEffect(() => {
    const data = riskService.getRiskOverview();
    setAvgRisk(data.averageRiskScore);
    setHighRiskFiles(data.highRiskFiles);
    setRiskFactors(data.riskFactors);
    setDistribution([
      { name: "Low Risk", value: data.distribution[0]?.value ?? 2, color: "#22C55E" },
      { name: "Medium Risk", value: data.distribution[1]?.value ?? 2, color: "#F59E0B" },
      { name: "High Risk", value: data.distribution[2]?.value ?? 2, color: "#EF4444" },
    ]);
  }, []);

  const trend = analysisService.getRiskTrend();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Risk Assessment</h2>
        <p className="mt-1 text-sm text-slate-400">
          Portfolio-wide risk scoring, high-risk module prioritization, and contributing factors.
        </p>
      </div>

      <DemoBanner
        title="Simulated Risk Scoring"
        message="Risk scores shown here are demonstration values. In Phase 2, these scores will be computed by trained ML models combined with static taint metrics."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Average Portfolio Risk"
          value={`${avgRisk}/100`}
          subtitle="Simulated composite score"
          icon={Activity}
          accent="warning"
        />
        <StatCard
          title="High-Risk Files"
          value={highRiskFiles.filter((f) => f.classification === "High Risk").length}
          subtitle="Modules requiring priority review"
          icon={AlertTriangle}
          accent="danger"
        />
        <StatCard
          title="Active Risk Factors"
          value={riskFactors.length}
          subtitle="Complexity & security drivers"
          icon={BrainCircuit}
          accent="purple"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Risk Distribution</h3>
          <p className="text-xs text-slate-400 mb-3">Projects grouped by risk tier</p>
          <div className="grid sm:grid-cols-2 items-center gap-4">
            <DonutDistributionChart data={distribution} />
            <div className="space-y-2.5 text-xs">
              {distribution.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between rounded-lg border border-[#22304A] bg-[#090D18] px-3 py-2"
                >
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                  <span className="font-semibold text-white">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Risk Trend</h3>
          <p className="text-xs text-slate-400 mb-3">Simulated 30-day portfolio risk trajectory</p>
          <RiskTrendAreaChart data={trend} />
        </Card>
      </div>

      {/* Prioritization Table */}
      <Card className="overflow-hidden">
        <div className="border-b border-[#22304A] px-5 py-4">
          <h3 className="text-sm font-semibold text-white">Risk Prioritization Table</h3>
          <p className="text-xs text-slate-400">
            Files ranked by simulated risk score, cyclomatic complexity, and finding density.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#22304A] bg-[#0D1424] text-slate-400 uppercase">
              <tr>
                <th className="px-5 py-3">File Path</th>
                <th className="px-4 py-3">Risk Score</th>
                <th className="px-4 py-3">Cyclomatic Complexity</th>
                <th className="px-4 py-3">Findings</th>
                <th className="px-5 py-3">Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22304A]">
              {highRiskFiles.map((f) => (
                <tr key={f.file} className="hover:bg-[#16223A]/60">
                  <td className="px-5 py-3.5 font-mono text-slate-200">{f.file}</td>
                  <td className="px-4 py-3.5 font-semibold text-white">{f.riskScore}/100</td>
                  <td className="px-4 py-3.5 text-slate-300">{f.complexity}</td>
                  <td className="px-4 py-3.5 text-slate-300">{f.findings}</td>
                  <td className="px-5 py-3.5">
                    <Badge
                      tone={
                        f.classification === "High Risk"
                          ? "danger"
                          : f.classification === "Medium Risk"
                          ? "warning"
                          : "success"
                      }
                    >
                      {f.classification}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Methodology Explanation */}
      <Card className="p-5 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <Info className="h-4 w-4" />
          <h3 className="text-sm font-semibold text-white">How Risk Is Calculated (Planned Architecture)</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          CodeAegis combines three weighted dimensions to compute module risk: (1) Security vulnerability severity &amp; CWE exploitability, (2) Structural complexity metrics (cyclomatic complexity, nesting depth, coupling), and (3) Architectural boundary violations &amp; unverified requirement paths. In this frontend prototype, values are simulated for demonstration.
        </p>
      </Card>
    </div>
  );
}
