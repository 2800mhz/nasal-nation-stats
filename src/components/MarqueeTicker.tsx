import { useEffect, useState } from "react";
import { COUNTRIES, pickersFor, fmtInt } from "@/lib/countries";

const ALERTS = [
  "BREAKING — Peak nostril activity detected in Southeast Asia (NPI +4.2σ above 7d MA)",
  "ADVISORY — Pollen index 142 g/m³ over Western Europe; mucosal viscosity rising",
  "MODEL — rhino-v4.2.1 hot-patched · drift coefficient stabilized at 0.0048 KL",
  "REGIONAL — South Asia surpasses 410M concurrent observations · cohort coverage 94.7%",
  "BULLETIN — UN Treaty-adjusted estimate revised upward by 1.0034× correction factor",
  "TELEMETRY — Edge node eu-west-3 returned to nominal · p99 latency 84ms",
  "RESEARCH — Stanford HCI confirms Rhinometric™ inference reproducible at n=14B",
  "MARKET — Embarrassment σ falling globally · social inhibition index at 6-month low",
  "ALERT — Tokyo metropolitan area enters peak window (21:00 JST)",
  "INTEL — North America off-peak trough · expected recovery 13:00 EST",
  "COMPLIANCE — Differential privacy budget ε=0.3 maintained across all 47 streams",
  "FORECAST — Next 6h projection: +2.1% global pickers, weighted by humidity correlation",
];

function buildItems(now: Date): string[] {
  const total = COUNTRIES.reduce((s, c) => s + pickersFor(c, now, Math.random()), 0);
  const top3 = [...COUNTRIES]
    .map((c) => ({ c, v: pickersFor(c, now, 0.5) }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 3);

  const stats = [
    `GLOBAL ▲ ${fmtInt(total)} active pickers · CI ±2.3% · 97.3% conf.`,
    `MODEL rhino-v4.2.1 · ε=0.3 · 47 streams · last recal ${now.toISOString().slice(11, 19)} UTC`,
    ...top3.map(
      (t) => `${t.c.flag} ${t.c.name.toUpperCase()} ${fmtInt(t.v)} (${((t.v / t.c.population) * 100).toFixed(2)}% pop.)`
    ),
    ...ALERTS,
  ];
  return stats;
}

export const MarqueeTicker = () => {
  const [items, setItems] = useState<string[]>(() => buildItems(new Date()));

  useEffect(() => {
    const id = setInterval(() => setItems(buildItems(new Date())), 8000);
    return () => clearInterval(id);
  }, []);

  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <div className="w-full border-b border-border bg-card/60 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 z-10 px-3 flex items-center bg-primary text-primary-foreground font-mono text-[10px] font-bold tracking-widest uppercase">
        ◉ WIRE
      </div>
      <div className="flex animate-ticker whitespace-nowrap py-2 pl-20 font-mono text-[11px]">
        {loop.map((t, i) => (
          <span key={i} className="inline-flex items-center px-6">
            <span className="text-primary mr-2">▌</span>
            <span className="text-foreground/90">{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
