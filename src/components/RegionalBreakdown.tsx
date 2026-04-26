import { useEffect, useState } from "react";

interface Region {
  code: string;
  name: string;
  flag: string;
  pickers: number; // millions
  share: number;
  delta: number;
}

const SEED: Region[] = [
  { code: "CN", name: "China", flag: "🇨🇳", pickers: 198.4, share: 17.4, delta: 0.3 },
  { code: "IN", name: "India", flag: "🇮🇳", pickers: 187.1, share: 16.4, delta: 0.7 },
  { code: "US", name: "United States", flag: "🇺🇸", pickers: 51.2, share: 4.5, delta: -0.1 },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", pickers: 39.8, share: 3.5, delta: 0.2 },
  { code: "BR", name: "Brazil", flag: "🇧🇷", pickers: 34.6, share: 3.0, delta: -0.2 },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", pickers: 33.1, share: 2.9, delta: 0.4 },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", pickers: 31.7, share: 2.8, delta: 0.5 },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", pickers: 24.9, share: 2.2, delta: 0.1 },
  { code: "RU", name: "Russia", flag: "🇷🇺", pickers: 22.3, share: 2.0, delta: -0.3 },
  { code: "JP", name: "Japan", flag: "🇯🇵", pickers: 18.6, share: 1.6, delta: -0.4 },
  { code: "DE", name: "Germany", flag: "🇩🇪", pickers: 14.2, share: 1.3, delta: 0.0 },
  { code: "TR", name: "Türkiye", flag: "🇹🇷", pickers: 12.8, share: 1.1, delta: 0.6 },
];

export const RegionalBreakdown = () => {
  const [rows, setRows] = useState(SEED);

  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((r) => {
          const wobble = (Math.random() - 0.5) * 0.4;
          const newPickers = Math.max(1, +(r.pickers + wobble).toFixed(1));
          const newDelta = +((Math.random() - 0.45) * 1.2).toFixed(1);
          return { ...r, pickers: newPickers, delta: newDelta };
        })
      );
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const max = Math.max(...rows.map((r) => r.pickers));

  return (
    <div className="rounded-md border border-border bg-card shadow-card-elev p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Regional Distribution · LIVE
          </div>
          <h3 className="font-mono text-lg font-bold mt-1">
            Top Pickers <span className="text-primary text-glow">by Country</span>
          </h3>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">millions · n=12</span>
      </div>

      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={r.code} className="grid grid-cols-[24px_18px_1fr_auto_auto_auto] items-center gap-3 font-mono text-xs py-1.5 border-b border-border/50 last:border-0">
            <span className="text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-base leading-none">{r.flag}</span>
            <div className="min-w-0">
              <div className="truncate text-foreground">{r.name}</div>
              <div className="relative h-1 mt-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary/70"
                  style={{ width: `${(r.pickers / max) * 100}%` }}
                />
              </div>
            </div>
            <span className="tabular-nums text-foreground">{r.pickers.toFixed(1)}M</span>
            <span className="tabular-nums text-muted-foreground w-12 text-right">{r.share}%</span>
            <span
              className={`tabular-nums w-14 text-right ${
                r.delta > 0 ? "text-primary" : r.delta < 0 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {r.delta > 0 ? "+" : ""}
              {r.delta}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
