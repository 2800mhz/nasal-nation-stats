import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function generateSeries() {
  // Diurnal pattern: more picking in the evening / late night, less at dawn
  return HOURS.map((h) => {
    const base = 1.05 + 0.25 * Math.sin(((h - 14) / 24) * Math.PI * 2);
    const noise = (Math.random() - 0.5) * 0.04;
    const value = Math.max(0.6, base + noise);
    return {
      hour: `${String(h).padStart(2, "0")}:00`,
      pickers: +(value * 1_000_000_000 / 1_000_000_000).toFixed(3), // billions
      ci: +(0.04 + Math.random() * 0.02).toFixed(3),
    };
  });
}

export const TrendChart = () => {
  const [data, setData] = useState(generateSeries);

  useEffect(() => {
    const id = setInterval(() => setData(generateSeries()), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-md border border-border bg-card shadow-card-elev p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            24H Global Pick Rate · UTC
          </div>
          <h3 className="font-mono text-lg font-bold mt-1">
            Pickers <span className="text-primary text-glow">(billions)</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-flicker shadow-neon" />
          STREAMING · 1Hz
        </div>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.55} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontFamily: "JetBrains Mono", fontSize: 10 }}
              interval={3}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontFamily: "JetBrains Mono", fontSize: 10 }}
              domain={[0.6, 1.5]}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--popover))",
                border: "1px solid hsl(var(--primary) / 0.4)",
                borderRadius: 4,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                boxShadow: "0 0 24px hsl(var(--primary) / 0.2)",
              }}
              labelStyle={{ color: "hsl(var(--primary))" }}
              formatter={(v: number) => [`${v.toFixed(3)}B`, "Pickers"]}
            />
            <Area
              type="monotone"
              dataKey="pickers"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#g1)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
