import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export const ObservationClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const local = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const utc = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateStr = now.toISOString().slice(0, 10);

  return (
    <div className="border border-border bg-card p-4 grid grid-cols-2 gap-4">
      <div>
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
          Observation Timestamp · Local
        </div>
        <div className="font-mono text-3xl font-extrabold tabular-nums text-foreground">
          {local}<span className="text-primary animate-blink">_</span>
        </div>
        <div className="font-mono text-[10px] text-muted-foreground/80 mt-1">
          {tz} · {dateStr}
        </div>
      </div>
      <div className="border-l border-border pl-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
          UTC · Coordinated
        </div>
        <div className="font-mono text-3xl font-extrabold tabular-nums text-foreground/80">
          {utc}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground/80 mt-1">
          ISO-8601 · Z
        </div>
      </div>
    </div>
  );
};
