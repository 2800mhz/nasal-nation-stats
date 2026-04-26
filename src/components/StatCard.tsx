import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  hint?: string;
  trend?: "up" | "down" | "flat";
  delta?: string;
  badge?: string;
}

export const StatCard = ({ label, value, hint, trend, delta, badge }: StatCardProps) => {
  const trendColor =
    trend === "up" ? "text-primary" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "—";

  return (
    <div className="group relative overflow-hidden rounded-md border border-border bg-card shadow-card-elev p-5">
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        {badge && (
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border border-primary/30 text-primary bg-primary/5">
            {badge}
          </span>
        )}
      </div>
      <div className="font-mono text-2xl md:text-3xl font-bold text-foreground tabular-nums">
        {value}
      </div>
      <div className="mt-2 flex items-center justify-between">
        {hint && <span className="font-mono text-[11px] text-muted-foreground">{hint}</span>}
        {delta && (
          <span className={`font-mono text-[11px] ${trendColor}`}>
            {arrow} {delta}
          </span>
        )}
      </div>
    </div>
  );
};
