import { useEffect, useMemo, useState } from "react";
import { COUNTRIES, pickersFor, peakHourLabel, fmtInt, localHourFor } from "@/lib/countries";

export const CountryTable = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo(() => {
    const now = new Date();
    return COUNTRIES.map((c) => {
      const pickers = pickersFor(c, now, Math.random());
      const pct = (pickers / c.population) * 100;
      const lh = localHourFor(c, now);
      return { c, pickers, pct, lh };
    }).sort((a, b) => b.pickers - a.pickers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            Sovereign Telemetry · n={COUNTRIES.length}
          </div>
          <h3 className="font-mono text-base font-bold mt-0.5">Country Live Pickers</h3>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
          <span>SORT: pickers ▼</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            STREAMING
          </span>
        </div>
      </div>

      <div className="max-h-[520px] overflow-y-auto">
        <table className="w-full font-mono text-xs">
          <thead className="sticky top-0 bg-card border-b border-border">
            <tr className="text-[9px] uppercase tracking-widest text-muted-foreground">
              <th className="text-left px-3 py-2 w-10">#</th>
              <th className="text-left px-3 py-2">Country</th>
              <th className="text-right px-3 py-2">Current Pickers</th>
              <th className="text-right px-3 py-2">% Pop.</th>
              <th className="text-right px-3 py-2 hidden md:table-cell">Peak (Local)</th>
              <th className="text-right px-3 py-2 hidden lg:table-cell">Founded</th>
              <th className="text-right px-3 py-2 hidden lg:table-cell">Index</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const inPeak =
                (r.lh >= 8 && r.lh < 10) ||
                (r.lh >= 13 && r.lh < 15) ||
                (r.lh >= 21 && r.lh < 23);
              return (
                <tr
                  key={r.c.code}
                  className="border-b border-border/60 hover:bg-muted/30"
                >
                  <td className="px-3 py-1.5 text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-1.5">
                    <span className="mr-2">{r.c.flag}</span>
                    <span className="text-foreground">{r.c.name}</span>
                    {inPeak && (
                      <span className="ml-2 text-[8px] px-1 py-0.5 bg-primary/15 text-primary tracking-wider">
                        PEAK
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-foreground">
                    {fmtInt(r.pickers)}
                  </td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">
                    {r.pct.toFixed(2)}%
                  </td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground hidden md:table-cell">
                    {peakHourLabel(r.c)}
                  </td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground hidden lg:table-cell">
                    {r.c.founded}
                  </td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-primary hidden lg:table-cell">
                    {r.c.founded}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-4 py-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>
          formula: <span className="text-foreground">pop × 0.142 × t_factor × r_coeff ± 0.3% noise</span>
        </span>
        <span>updated every 1.0s</span>
      </div>
    </div>
  );
};
