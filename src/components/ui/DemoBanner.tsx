import { Info } from "lucide-react";

export function DemoBanner({
  title = "Frontend Prototype Mode",
  message = "Displayed metrics, findings, and ML predictions use simulated demonstration data. Backend scanners and trained ML models will be connected in Phase 2.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-xs text-purple-200">
      <Info className="h-4 w-4 shrink-0 text-purple-400 mt-0.5" />
      <div>
        <span className="font-semibold text-purple-300">{title}: </span>
        <span className="text-slate-300">{message}</span>
      </div>
    </div>
  );
}
