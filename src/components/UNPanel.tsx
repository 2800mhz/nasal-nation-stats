import { useEffect, useMemo, useState } from "react";
import { COUNTRIES, pickersFor, fmtInt } from "@/lib/countries";

export const UNPanel = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const sumFounded = COUNTRIES.reduce((s, c) => s + c.founded, 0);
    const avgFounded = sumFounded / COUNTRIES.length;
    const oldest = COUNTRIES.reduce((a, b) => (a.founded < b.founded ? a : b));
    const newest = COUNTRIES.reduce((a, b) => (a.founded > b.founded ? a : b));
    const totalPop = COUNTRIES.reduce((s, c) => s + c.population, 0);
    const totalPickers = COUNTRIES.reduce((s, c) => s + pickersFor(c, now, Math.random()), 0);
    const adjusted = totalPickers * 1.0034;
    return { sumFounded, avgFounded, oldest, newest, totalPop, totalPickers, adjusted };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            UN Aggregate Metrics · Treaty-Compliant
          </div>
          <h3 className="font-mono text-base font-bold mt-0.5">Civilizational Index</h3>
        </div>
        <span className="font-mono text-[9px] text-muted-foreground border border-border px-1.5 py-0.5">
          A/RES/77/318
        </span>
      </div>

      <div className="divide-y divide-border">
        <Row
          label="Σ Member State Founding Years"
          value={stats.sumFounded.toLocaleString("en-US")}
          hint="civilizational index"
          accent
        />
        <Row
          label="Mean Founding Year"
          value={stats.avgFounded.toFixed(1)}
          hint={`across n=${COUNTRIES.length} states`}
        />
        <Row
          label="Oldest Nation"
          value={`${stats.oldest.flag} ${stats.oldest.name}`}
          hint={`est. ${stats.oldest.founded}`}
        />
        <Row
          label="Newest Nation"
          value={`${stats.newest.flag} ${stats.newest.name}`}
          hint={`est. ${stats.newest.founded}`}
        />
        <Row
          label="Σ Combined Population"
          value={fmtInt(stats.totalPop)}
          hint="tracked cohort"
        />
        <Row
          label="Σ Active Pickers (raw)"
          value={fmtInt(stats.totalPickers)}
          hint="pre-treaty estimate"
        />
        <Row
          label="Treaty-Adjusted Estimate"
          value={fmtInt(stats.adjusted)}
          hint="× 1.0034 UN correction factor"
          accent
        />
      </div>

      <div className="border-t border-border px-4 py-2 font-mono text-[9px] text-muted-foreground/80">
        Source: Rhinometric Labs aggregation per UN-DESA 2024 statistical annex.
      </div>
    </div>
  );
};

const Row = ({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) => (
  <div className="flex items-center justify-between gap-3 px-4 py-2.5">
    <div className="min-w-0">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground truncate">
        {label}
      </div>
      {hint && (
        <div className="font-mono text-[9px] text-muted-foreground/70 mt-0.5">{hint}</div>
      )}
    </div>
    <div
      className={`font-mono text-base font-bold tabular-nums shrink-0 ${
        accent ? "text-primary" : "text-foreground"
      }`}
    >
      {value}
    </div>
  </div>
);
