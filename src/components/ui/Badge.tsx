import { cn } from "@/lib/utils";
import { SeverityLevel } from "@/types";

type BadgeTone = "neutral" | "blue" | "cyan" | "purple" | "success" | "warning" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-slate-800/80 text-slate-300 border-slate-700",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/10 text-red-400 border-red-500/30",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: SeverityLevel | string }) {
  const map: Record<string, BadgeTone> = {
    Critical: "danger",
    High: "warning",
    Medium: "blue",
    Low: "cyan",
    Informational: "neutral",
  };
  return <Badge tone={map[severity] ?? "neutral"}>{severity}</Badge>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeTone> = {
    Secure: "success",
    Completed: "success",
    Implemented: "success",
    Fixed: "success",
    "Prototype / Sample Metrics": "purple",
    "Attention Needed": "warning",
    "Partially Implemented": "warning",
    "In Progress": "warning",
    "Awaiting Training": "neutral",
    Critical: "danger",
    Missing: "danger",
    Open: "danger",
    "Accepted Risk": "neutral",
    Pending: "neutral",
  };
  return <Badge tone={map[status] ?? "neutral"}>{status}</Badge>;
}
