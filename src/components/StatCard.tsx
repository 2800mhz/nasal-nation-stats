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
    <div className="relative border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        {badge && (
          <span className="font-mono text-[9px] px-1.5 py-0.5 border border-primary/40 text-primary bg-primary/5">
            {badge}
          </span>
        )}
      </div>
      <div className="font-mono text-2xl md:text-[26px] font-bold text-foreground tabular-nums leading-tight">
        {value}
      </div>
      <div className="mt-2 flex items-center justify-between">
        {hint && <span className="font-mono text-[10px] text-muted-foreground">{hint}</span>}
        {delta && (
          <span className={`font-mono text-[10px] ${trendColor}`}>
            {arrow} {delta}
          </span>
        )}
      </div>
    </div>
  );
};
