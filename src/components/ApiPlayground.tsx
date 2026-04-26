import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type EndpointKey = "current" | "regional" | "country" | "status";

const ENDPOINTS: { key: EndpointKey; label: string; method: "GET" }[] = [
  { key: "current", label: "/api/v1/current", method: "GET" },
  { key: "regional", label: "/api/v1/regional", method: "GET" },
  { key: "country", label: "/api/v1/country/{code}", method: "GET" },
  { key: "status", label: "/api/v1/status", method: "GET" },
];

export const ApiPlayground = () => {
  const [endpoint, setEndpoint] = useState<EndpointKey>("current");
  const [code, setCode] = useState("TR");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [ms, setMs] = useState<number | null>(null);
  const [body, setBody] = useState<string>("");
  const [shown, setShown] = useState<string>("");
  const [url, setUrl] = useState<string>("/api/v1/current");
  const typerRef = useRef<number | null>(null);

  const buildUrl = (k: EndpointKey, c: string) => {
    if (k === "current") return "/api/v1/current";
    if (k === "regional") return "/api/v1/regional";
    if (k === "status") return "/api/v1/status";
    return `/api/v1/country/${(c || "TR").toUpperCase()}`;
  };

  useEffect(() => {
    setUrl(buildUrl(endpoint, code));
  }, [endpoint, code]);

  const send = async () => {
    setLoading(true);
    setBody("");
    setShown("");
    setStatus(null);
    setMs(null);
    if (typerRef.current) window.clearInterval(typerRef.current);

    const target = buildUrl(endpoint, code);
    const t0 = performance.now();
    try {
      const res = await fetch(target);
      const t1 = performance.now();
      const text = await res.text();
      let pretty = text;
      try {
        pretty = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // keep raw
      }
      setStatus(res.status);
      setMs(Math.round(t1 - t0));
      setBody(pretty);

      // Typewriter
      let i = 0;
      const step = Math.max(8, Math.floor(pretty.length / 240));
      typerRef.current = window.setInterval(() => {
        i = Math.min(pretty.length, i + step);
        setShown(pretty.slice(0, i));
        if (i >= pretty.length && typerRef.current) {
          window.clearInterval(typerRef.current);
          typerRef.current = null;
        }
      }, 12);
    } catch (e) {
      setStatus(0);
      setBody(JSON.stringify({ error: "network", message: (e as Error).message }, null, 2));
      setShown(JSON.stringify({ error: "network", message: (e as Error).message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // Auto-fire once on mount so the panel is alive
  useEffect(() => {
    send();
    return () => {
      if (typerRef.current) window.clearInterval(typerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusColor =
    status === null
      ? "text-muted-foreground"
      : status >= 200 && status < 300
        ? "text-primary"
        : status >= 400
          ? "text-destructive"
          : "text-warning";

  return (
    <section id="playground" className="border-t border-border py-20">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ playground</span>
          <h2 className="font-mono text-3xl md:text-4xl font-extrabold mt-3 leading-tight">
            Live API Console
          </h2>
          <p className="text-muted-foreground mt-3 font-mono text-sm">
            Real endpoints, real timestamps, real JSON. Pick a route and fire it.
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-0 border border-border bg-card">
          {/* LEFT: request builder */}
          <div className="border-b lg:border-b-0 lg:border-r border-border p-5 flex flex-col gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Endpoint
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {ENDPOINTS.map((e) => (
                  <button
                    key={e.key}
                    onClick={() => setEndpoint(e.key)}
                    className={`flex items-center gap-2 px-2.5 py-2 font-mono text-xs text-left border transition-colors ${
                      endpoint === e.key
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-primary/15 text-primary">
                      {e.method}
                    </span>
                    <span>{e.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {endpoint === "country" && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Country Code (ISO α-2)
                </div>
                <input
                  value={code}
                  maxLength={2}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full bg-background border border-border px-3 py-2 font-mono text-sm text-foreground uppercase tracking-widest focus:outline-none focus:border-primary"
                  placeholder="TR"
                />
                <div className="mt-1 font-mono text-[10px] text-muted-foreground/70">
                  examples: TR, US, IN, JP, DE, BR
                </div>
              </div>
            )}

            <div className="border-t border-border pt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Request URL
              </div>
              <div className="font-mono text-xs text-foreground bg-background border border-border px-3 py-2 break-all">
                {url}
              </div>
            </div>

            <button
              onClick={send}
              disabled={loading}
              className="font-mono text-xs uppercase tracking-widest font-bold py-3 bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              {loading ? "SENDING…" : "SEND REQUEST"}
            </button>
          </div>

          {/* RIGHT: response */}
          <div className="bg-background flex flex-col min-h-[420px]">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border bg-card font-mono text-[11px]">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-primary/15 text-primary">GET</span>
                <span className="text-foreground truncate">{url}</span>
              </div>
              <div className="flex items-center gap-4 shrink-0 text-muted-foreground">
                <span>
                  STATUS <span className={statusColor}>{status ?? "—"}</span>
                </span>
                <span>
                  TIME <span className="text-foreground">{ms !== null ? `${ms}ms` : "—"}</span>
                </span>
              </div>
            </div>
            <pre className="p-4 font-mono text-xs leading-relaxed text-foreground/90 overflow-auto flex-1">
              <code>{shown || "// awaiting response…"}</code>
              {loading || (shown && shown.length < body.length) ? (
                <span className="text-primary animate-blink">_</span>
              ) : null}
            </pre>
          </div>
        </div>

        <p className="font-mono text-[10px] text-muted-foreground/70 mt-3">
          Backed by Vite middleware in dev / preview · static-site fallback computes identical payloads in-browser.
        </p>
      </div>
    </section>
  );
};
