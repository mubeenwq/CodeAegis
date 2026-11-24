"use client";

import { BrainCircuit, Database, Sparkles } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { mlService } from "@/services/mlService";

export default function MLInsightsPage() {
  const models = mlService.getModels();
  const dataset = mlService.getDatasetOverview();
  const confusion = mlService.getConfusionMatrix();

  const comparisonData = models.map((m) => ({
    name: m.name.replace(" Model", ""),
    Accuracy: m.accuracy,
    Precision: m.precision,
    Recall: m.recall,
    F1: m.f1Score,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">ML Insights</h2>
          <p className="mt-1 text-sm text-slate-400">
            Prototype machine learning architecture, sample model benchmarks, and dataset distribution.
          </p>
        </div>
        <Badge tone="purple" className="self-start px-3 py-1">
          <Sparkles className="h-3.5 w-3.5" />
          Sample / Demo Metrics Only
        </Badge>
      </div>

      <DemoBanner
        title="Model Integration Placeholder"
        message="All accuracy, precision, recall, F1-score, and dataset figures below are sample/demo data for UI preview. Actual Python ML models will be trained and connected in the next phase."
      />

      {/* Model Overview Cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        {models.map((m) => (
          <Card key={m.id} className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{m.name}</h3>
                  <p className="text-[11px] text-slate-400">{m.algorithm}</p>
                </div>
              </div>
              <StatusBadge status={m.status} />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>

            <div className="rounded-lg border border-[#22304A] bg-[#090D18] p-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Dataset</span>
                <span className="text-slate-200 font-medium">{m.datasetName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Training Samples</span>
                <span className="text-cyan-400 font-mono">
                  {m.trainingSamples.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="rounded-lg bg-[#090D18] border border-[#22304A] p-2">
                <p className="text-[10px] text-slate-400">Acc</p>
                <p className="font-semibold text-white">{m.accuracy}%</p>
              </div>
              <div className="rounded-lg bg-[#090D18] border border-[#22304A] p-2">
                <p className="text-[10px] text-slate-400">Prec</p>
                <p className="font-semibold text-cyan-400">{m.precision}%</p>
              </div>
              <div className="rounded-lg bg-[#090D18] border border-[#22304A] p-2">
                <p className="text-[10px] text-slate-400">Rec</p>
                <p className="font-semibold text-blue-400">{m.recall}%</p>
              </div>
              <div className="rounded-lg bg-[#090D18] border border-[#22304A] p-2">
                <p className="text-[10px] text-slate-400">F1</p>
                <p className="font-semibold text-purple-400">{m.f1Score}%</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Training Performance & Confusion Matrix */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-white mb-1">
            Model Performance Comparison (Sample)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Accuracy, Precision, Recall, and F1-Score across prototype models
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#22304A" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D1424",
                    borderColor: "#22304A",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="Accuracy" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Precision" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Recall" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="F1" fill="#22C55E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Confusion Matrix (Sample)</h3>
            <p className="text-xs text-slate-400">
              Predicted vs. Actual risk tiers for prototype evaluation set
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left text-slate-400">Actual \ Pred</th>
                  {confusion.labels.map((l) => (
                    <th key={l} className="p-2 text-slate-300 font-medium">
                      {l}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {confusion.matrix.map((row, rIdx) => (
                  <tr key={confusion.labels[rIdx]} className="border-t border-[#22304A]">
                    <td className="p-2.5 text-left font-medium text-slate-300">
                      {confusion.labels[rIdx]}
                    </td>
                    {row.map((val, cIdx) => {
                      const isDiag = rIdx === cIdx;
                      return (
                        <td key={cIdx} className="p-2">
                          <div
                            className={`rounded-lg py-2 font-mono font-semibold ${
                              isDiag
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "bg-[#090D18] text-slate-400 border border-[#22304A]"
                            }`}
                          >
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Dataset Overview */}
      <Card className="p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Dataset Overview (Sample)</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-300">
              Total: <strong className="text-white">{dataset.totalSamples.toLocaleString()}</strong>
            </span>
            <span className="text-red-400">
              Vulnerable: <strong>{dataset.vulnerableSamples.toLocaleString()}</strong>
            </span>
            <span className="text-emerald-400">
              Safe: <strong>{dataset.safeSamples.toLocaleString()}</strong>
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dataset.categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-lg border border-[#22304A] bg-[#090D18] p-3.5 text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-200">{cat.name}</span>
                <span className="font-mono text-cyan-400">{cat.percentage}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#111B2E] overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${cat.percentage * 3}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                {cat.count.toLocaleString()} labeled samples
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
