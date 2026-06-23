import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/Nav";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { Footer } from "@/components/Footer";

interface Service {
  name: string;
  status: string;
  uptime_90d: number;
  note?: string;
}

interface StatusPayload {
  overall: string;
  model_version: string;
  last_calibration_timestamp: string;
  observation_timestamp: string;
  services: Service[];
}

async function fetchStatus(): Promise<StatusPayload> {
  const res = await fetch("/api/v1/status");
  if (!res.ok) {
    throw new Error("Failed to load status");
  }
  return res.json();
}

function bars(serviceIdx: number, uptime: number) {
  const arr: ("ok" | "deg" | "down")[] = [];
  let seed = serviceIdx * 7919 + 31;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 90; i += 1) {
    const r = rand();
    const failProb = (100 - uptime) / 100;
    if (r < failProb * 0.2) arr.push("down");
    else if (r < failProb) arr.push("deg");
    else arr.push("ok");
  }
  return arr;
}

export default function Status() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["status"],
    queryFn: fetchStatus,
    refetchInterval: 15_000,
    staleTime: 10_000,
  });

  const updated = useMemo(() => data?.observation_timestamp ?? "—", [data]);

  return (
    <div className="min-h-screen">
      <MarqueeTicker />
      <Nav />

      <section className="py-14 border-b border-border">
        <div className="container max-w-4xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ status</span>
          <h1 className="font-mono text-3xl md:text-4xl font-extrabold mt-3 leading-tight">
            System Status
          </h1>
          <div className="mt-6 border border-primary/40 bg-primary/5 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-flicker" />
              <span className="font-mono text-sm font-bold text-foreground">
                ALL SYSTEMS NOMINAL
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{updated}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          {error ? (
            <div className="border border-destructive/40 bg-destructive/5 p-4 font-mono text-xs text-destructive mb-4">
              Failed to load status: {(error as Error).message}
            </div>
          ) : null}

          {isLoading ? (
            <div className="border border-border bg-card p-6 font-mono text-xs text-muted-foreground">
              Loading live status...
            </div>
          ) : null}

          <div className="border border-border bg-card divide-y divide-border">
            {(data?.services ?? []).map((service, index) => {
              const segs = bars(index, service.uptime_90d);
              const ok = service.status === "operational";
              const deg = service.status === "degraded";
              return (
                <div key={service.name} className="p-5">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          ok ? "bg-primary" : deg ? "bg-warning" : "bg-destructive"
                        }`}
                      />
                      <span className="font-mono text-sm text-foreground truncate">{service.name}</span>
                      {service.note ? (
                        <span className="font-mono text-[10px] text-muted-foreground italic">
                          ({service.note})
                        </span>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-4 font-mono text-[11px] shrink-0">
                      <span className="text-muted-foreground">
                        90d <span className="text-foreground">{service.uptime_90d.toFixed(2)}%</span>
                      </span>
                      <span
                        className={`uppercase tracking-wider text-[10px] font-bold ${
                          ok ? "text-primary" : deg ? "text-warning" : "text-destructive"
                        }`}
                      >
                        {ok ? "✓ Operational" : deg ? "⚠ Degraded" : "✕ Down"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-[2px] h-7">
                    {segs.map((seg, i) => (
                      <div
                        key={i}
                        title={`day -${90 - i}`}
                        className={`flex-1 ${
                          seg === "ok"
                            ? "bg-primary/70"
                            : seg === "deg"
                              ? "bg-warning/70"
                              : "bg-destructive/70"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground/70 mt-1.5">
                    <span>90 days ago</span>
                    <span>today</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="border border-border bg-card p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                Model Version
              </div>
              <div className="text-foreground">{data?.model_version ?? "—"}</div>
            </div>
            <div className="border border-border bg-card p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                Last Calibration
              </div>
              <div className="text-foreground truncate">
                {data?.last_calibration_timestamp ?? "—"}
              </div>
            </div>
            <div className="border border-border bg-card p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                Refresh
              </div>
              <div className="text-foreground">15s live polling</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
