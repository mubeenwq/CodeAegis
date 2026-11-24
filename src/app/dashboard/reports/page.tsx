"use client";

import { useState } from "react";
import { Download, Eye, FileSpreadsheet, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { reportService } from "@/services/reportService";
import { ReportItem } from "@/types";

export default function ReportsPage() {
  const reports = reportService.getAll();
  const [typeFilter, setTypeFilter] = useState("All");
  const [preview, setPreview] = useState<ReportItem | null>(null);

  const filtered = reports.filter(
    (r) => typeFilter === "All" || r.type === typeFilter
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Reports</h2>
        <p className="mt-1 text-sm text-slate-400">
          Preview and export analysis, security, architecture compliance, and traceability reports.
        </p>
      </div>

      <DemoBanner
        title="Demonstration Exports"
        message="PDF/Text and CSV downloads are generated client-side from prototype demonstration data."
      />

      <Card className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "Analysis Report",
            "Project Report",
            "Security Report",
            "Architecture Compliance",
            "Requirement Traceability",
          ].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                typeFilter === type
                  ? "bg-blue-600 text-white"
                  : "border border-[#22304A] bg-[#090D18] text-slate-300 hover:border-blue-500/40"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <Card key={r.id} className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone="cyan" className="font-mono">{r.id}</Badge>
                  <Badge tone="purple">{r.type}</Badge>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-white">{r.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {r.projectName} · Generated {r.generatedAt}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#22304A] text-xs">
              <span className="text-slate-400">
                Risk: <strong className="text-white">{r.riskScore}/100</strong> · Findings:{" "}
                <strong className="text-amber-400">{r.findingsCount}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreview(r)}
                  className="inline-flex items-center gap-1 rounded-md border border-[#22304A] bg-[#090D18] px-2.5 py-1.5 text-slate-200 hover:border-cyan-500/50"
                >
                  <Eye className="h-3.5 w-3.5 text-cyan-400" />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => reportService.exportDemoReportText(r)}
                  className="inline-flex items-center gap-1 rounded-md border border-[#22304A] bg-[#090D18] px-2.5 py-1.5 text-slate-200 hover:border-blue-500/50"
                >
                  <FileText className="h-3.5 w-3.5 text-blue-400" />
                  Report
                </button>
                <button
                  type="button"
                  onClick={() => reportService.exportCsv(r)}
                  className="inline-flex items-center gap-1 rounded-md border border-[#22304A] bg-[#090D18] px-2.5 py-1.5 text-slate-200 hover:border-emerald-500/50"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
                  CSV
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview ? preview.title : ""}
        subtitle={preview ? `${preview.id} · ${preview.type}` : ""}
      >
        {preview && (
          <div className="space-y-4 text-xs">
            <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-4 space-y-2">
              <p className="text-slate-400">
                Project: <strong className="text-white">{preview.projectName}</strong>
              </p>
              <p className="text-slate-400">
                Analysis Reference: <strong className="font-mono text-cyan-400">{preview.analysisId}</strong>
              </p>
              <p className="text-slate-400">
                Simulated Risk Score: <strong className="text-white">{preview.riskScore}/100</strong>
              </p>
              <p className="text-slate-400">
                Total Findings Included: <strong className="text-amber-400">{preview.findingsCount}</strong>
              </p>
            </div>
            <p className="text-slate-300 leading-relaxed">
              This executive summary packages requirement traceability, architectural boundary compliance, CWE-mapped vulnerability remediation steps, and simulated ML risk prioritization into a team-ready deliverable.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => reportService.exportCsv(preview)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#22304A] px-3 py-2 text-slate-200"
              >
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => reportService.exportDemoReportText(preview)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
              >
                <Download className="h-3.5 w-3.5" />
                Download Demo Report
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
