import { useEffect, useState } from "react";

// Sparkline mini-component
const Spark = ({ data, positive = true }: { data: number[]; positive?: boolean }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-8">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        opacity="0.85"
      />
    </svg>
  );
};

interface Param {
  label: string;
  unit: string;
  value: number;
  fmt: (n: number) => string;
  range: [number, number];
  drift: number;
  positive?: boolean;
  note?: string;
}

const SEED: Param[] = [
  { label: "Nostril Index (L:R)", unit: "ratio", value: 1.083, fmt: (n) => n.toFixed(3), range: [1.02, 1.14], drift: 0.004, note: "left-dominant" },
  { label: "Mucosal Viscosity", unit: "cP", value: 47.2, fmt: (n) => n.toFixed(1), range: [40, 55], drift: 0.3, note: "elevated · pollen" },
  { label: "Mean Insertion Depth", unit: "mm", value: 18.4, fmt: (n) => n.toFixed(2), range: [16, 21], drift: 0.08 },
  { label: "Ambient Pollen", unit: "grains/m³", value: 142, fmt: (n) => Math.round(n).toString(), range: [80, 220], drift: 4, note: "Q3 spike" },
  { label: "Finger Preference (Index)", unit: "%", value: 71.4, fmt: (n) => n.toFixed(1), range: [68, 76], drift: 0.4 },
  { label: "Avg. Session Length", unit: "s", value: 3.71, fmt: (n) => n.toFixed(2), range: [3.0, 4.4], drift: 0.05 },
  { label: "Detection Latency", unit: "ms", value: 84, fmt: (n) => Math.round(n).toString(), range: [70, 110], drift: 2, positive: false },
  { label: "Embarrassment Coeff.", unit: "σ", value: 0.318, fmt: (n) => n.toFixed(3), range: [0.2, 0.5], drift: 0.008, positive: false, note: "↓ in private" },
  { label: "Humidity Correlation", unit: "ρ", value: -0.42, fmt: (n) => n.toFixed(2), range: [-0.55, -0.25], drift: 0.01 },
  { label: "Cluster Throughput", unit: "obs/s", value: 312_488, fmt: (n) => Math.round(n).toLocaleString(), range: [280_000, 340_000], drift: 1500 },
  { label: "Model Drift (24h)", unit: "KL", value: 0.0048, fmt: (n) => n.toFixed(4), range: [0.001, 0.01], drift: 0.0003, positive: false },
  { label: "Cohort Coverage", unit: "%", value: 94.7, fmt: (n) => n.toFixed(1), range: [93, 97], drift: 0.1 },
];

function genSpark(seed: number) {
  return Array.from({ length: 24 }, (_, i) =>
    Math.sin((i + seed) * 0.6) * 0.5 + Math.cos((i + seed) * 0.3) * 0.3 + Math.random() * 0.4
  );
}

export const AdvancedTelemetry = () => {
  const [params, setParams] = useState(SEED);
  const [sparks, setSparks] = useState(() => SEED.map((_, i) => genSpark(i)));

  useEffect(() => {
    const id = setInterval(() => {
      setParams((prev) =>
        prev.map((p) => {
          const wobble = (Math.random() - 0.5) * 2 * p.drift;
          let next = p.value + wobble;
          // soft clamp
          if (next < p.range[0]) next = p.range[0] + p.drift;
          if (next > p.range[1]) next = p.range[1] - p.drift;
          return { ...p, value: next };
        })
      );
      setSparks((prev) =>
        prev.map((s) => [...s.slice(1), s[s.length - 1] + (Math.random() - 0.5) * 0.5])
      );
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-md border border-border bg-card shadow-card-elev">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Advanced Parameters · Rhinometric™ v4.2.1
          </div>
          <h3 className="font-mono text-base font-bold mt-0.5">
            Inference Diagnostics
          </h3>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
          <span>RUN ID <span className="text-foreground">#4729-Δ</span></span>
          <span>WINDOW <span className="text-foreground">24h</span></span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
            HEALTHY
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-x divide-y divide-border">
        {params.map((p, i) => (
          <div key={p.label} className="p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground leading-tight">
                {p.label}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground/70 shrink-0">
                {p.unit}
              </span>
            </div>
            <div className="font-mono text-xl font-bold text-foreground tabular-nums">
              {p.fmt(p.value)}
            </div>
            <div className="mt-1 h-8">
              <Spark data={sparks[i]} positive={p.positive !== false} />
            </div>
            {p.note && (
              <div className="font-mono text-[9px] text-muted-foreground/70 mt-0.5 italic">
                {p.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-border px-5 py-2.5 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Δ refresh <span className="text-foreground">1.2s</span></span>
          <span>nodes <span className="text-foreground">214/214</span></span>
          <span>p99 <span className="text-foreground">94ms</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span>schema <span className="text-foreground">v8</span></span>
          <span>region <span className="text-foreground">eu-west-3</span></span>
        </div>
      </div>
    </div>
  );
};
