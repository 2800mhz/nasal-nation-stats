import { useEffect, useState } from "react";

const Spark = ({ data, positive = true }: { data: number[]; positive?: boolean }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-7">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
        strokeWidth="1.25"
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
  classify?: (n: number) => string;
}

const SEED: Param[] = [
  { label: "Nostril Ratio Index (NRI)", unit: "L:R", value: 1.083, fmt: (n) => n.toFixed(3), range: [1.02, 1.14], drift: 0.004, note: "left-dominant" },
  { label: "Mucus Viscosity Coeff.", unit: "cP", value: 47.2, fmt: (n) => n.toFixed(1), range: [40, 55], drift: 0.3, note: "elevated · pollen" },
  { label: "Embarrassment Threshold", unit: "σ", value: 0.318, fmt: (n) => n.toFixed(3), range: [0.2, 0.5], drift: 0.008, positive: false, note: "regional avg" },
  { label: "Thumb Dominance Score", unit: "%", value: 11.4, fmt: (n) => n.toFixed(1), range: [8, 15], drift: 0.2 },
  { label: "Index Finger Preference", unit: "%", value: 71.4, fmt: (n) => n.toFixed(1), range: [68, 76], drift: 0.4, note: "global rate" },
  { label: "Duration Mean", unit: "s", value: 3.71, fmt: (n) => n.toFixed(2), range: [3.0, 4.4], drift: 0.05 },
  {
    label: "Depth Classification",
    unit: "tier",
    value: 2.1,
    fmt: (n) => (n < 1.5 ? "superficial" : n < 2.5 ? "moderate" : "deep"),
    range: [1.0, 3.0],
    drift: 0.05,
  },
  { label: "Humidity Correlation", unit: "ρ", value: -0.42, fmt: (n) => n.toFixed(2), range: [-0.55, -0.25], drift: 0.01, note: "ambient" },
  { label: "Social Inhibition Factor", unit: "idx", value: 0.64, fmt: (n) => n.toFixed(2), range: [0.4, 0.85], drift: 0.015, positive: false },
  { label: "Post-pick Inspection Rate", unit: "%", value: 87.3, fmt: (n) => n.toFixed(1), range: [82, 92], drift: 0.3 },
  { label: "Tissue Availability Index", unit: "TAI", value: 0.52, fmt: (n) => n.toFixed(2), range: [0.3, 0.8], drift: 0.012 },
  { label: "Repeat Likelihood (24h)", unit: "%", value: 78.9, fmt: (n) => n.toFixed(1), range: [72, 86], drift: 0.4, note: "Markov est." },
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
          if (next < p.range[0]) next = p.range[0] + p.drift;
          if (next > p.range[1]) next = p.range[1] - p.drift;
          return { ...p, value: next };
        })
      );
      setSparks((prev) =>
        prev.map((s) => [...s.slice(1), s[s.length - 1] + (Math.random() - 0.5) * 0.5])
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Inference Diagnostics · Rhinometric™ v4.2.1
          </div>
          <h3 className="font-mono text-base font-bold mt-0.5">
            12 Live Parameters · 2.0s refresh
          </h3>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
          <span>RUN <span className="text-foreground">#4729-Δ</span></span>
          <span>WIN <span className="text-foreground">24h</span></span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
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
            <div className="mt-1">
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
          <span>Δ refresh <span className="text-foreground">2.0s</span></span>
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
