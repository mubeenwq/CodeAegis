"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Layers, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, SeverityBadge } from "@/components/ui/Badge";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { mockAnalyses } from "@/data/mockAnalysis";
import { mockProjects } from "@/data/mockProjects";

export default function ArchitecturePage() {
  const allViolations = mockAnalyses.flatMap((a) =>
    a.violations.map((v) => ({ ...v, projectName: a.projectName, analysisId: a.id }))
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Architecture Verification</h2>
        <p className="mt-1 text-sm text-slate-400">
          Monitor design-pattern adherence and layer boundary violations across your software portfolio.
        </p>
      </div>

      <DemoBanner />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockProjects.map((proj) => (
          <Card key={proj.id} className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-white">{proj.name}</h3>
                <p className="text-xs text-slate-400">{proj.language}</p>
              </div>
              <Badge tone="purple">{proj.architecture}</Badge>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Compliance Score</span>
                <span className="font-semibold text-cyan-400">{proj.architectureCompliance}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#090D18] overflow-hidden">
                <div
                  className="h-full bg-cyan-400"
                  style={{ width: `${proj.architectureCompliance}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#22304A] flex justify-end">
              <Link
                href={`/dashboard/analysis/${proj.latestAnalysisId}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:underline"
              >
                Inspect Architecture
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Recent Layer Boundary Violations</h3>
        </div>
        <div className="space-y-3">
          {allViolations.map((v) => (
            <div
              key={`${v.analysisId}-${v.id}`}
              className="rounded-xl border border-[#22304A] bg-[#090D18] p-4 space-y-2 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-400" />
                  <span className="font-semibold text-white">{v.projectName}</span>
                  <span className="font-mono text-cyan-400">
                    {v.file}:{v.line}
                  </span>
                </div>
                <SeverityBadge severity={v.severity} />
              </div>
              <p className="text-slate-200">{v.description}</p>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>{v.suggestedCorrection}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
