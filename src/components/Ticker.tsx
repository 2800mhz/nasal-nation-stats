import { useEffect, useState } from "react";

interface Tick {
  code: string;
  label: string;
  value: string;
  delta: string;
  up: boolean;
}

const SEED: Tick[] = [
  { code: "NPI", label: "Global Pick Index", value: "1.134B", delta: "+0.42%", up: true },
  { code: "NSL.L", label: "Nostril Left", value: "52.1%", delta: "+0.08%", up: true },
  { code: "NSL.R", label: "Nostril Right", value: "47.9%", delta: "-0.08%", up: false },
  { code: "POLN", label: "Pollen Vol.", value: "142 g/m³", delta: "+3.1%", up: true },
  { code: "MUC", label: "Mucosal Visc.", value: "47.2 cP", delta: "+0.6%", up: true },
  { code: "EMB", label: "Embarrassment σ", value: "0.318", delta: "-1.2%", up: false },
  { code: "LAT", label: "API Latency", value: "84 ms", delta: "-2 ms", up: true },
  { code: "DRFT", label: "Model Drift", value: "0.0048 KL", delta: "+0.0001", up: false },
  { code: "CVR", label: "Cohort Coverage", value: "94.7%", delta: "+0.1pp", up: true },
];

export const Ticker = () => {
  const [ticks, setTicks] = useState(SEED);

  useEffect(() => {
    const id = setInterval(() => {
      setTicks((prev) =>
        prev.map((t) => ({
          ...t,
          up: Math.random() > 0.45,
        }))
      );
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-y border-border bg-card/60">
      <div className="container">
        <div className="flex items-center gap-6 overflow-x-auto py-2 font-mono text-[11px] scrollbar-none">
          <span className="shrink-0 text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-r border-border pr-4">
            LIVE FEED
          </span>
          {ticks.map((t) => (
            <div key={t.code} className="shrink-0 flex items-center gap-2">
              <span className="text-muted-foreground/70">{t.code}</span>
              <span className="text-foreground tabular-nums">{t.value}</span>
              <span className={`tabular-nums ${t.up ? "text-primary" : "text-destructive"}`}>
                {t.up ? "▲" : "▼"} {t.delta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
