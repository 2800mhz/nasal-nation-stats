import { useState } from "react";
import { Check, Copy } from "lucide-react";

const ENDPOINTS = [
  { method: "GET", path: "/v1/current", desc: "Real-time global pick count" },
  { method: "GET", path: "/v1/regional", desc: "Breakdown by country / continent" },
  { method: "GET", path: "/v1/trend?window=24h", desc: "Time-series with confidence interval" },
  { method: "POST", path: "/v1/forecast", desc: "Predictive model · next 6h" },
  { method: "GET", path: "/v1/demographics", desc: "Age, occupation, posture (Pro)" },
];

const CURL = `curl -X GET https://api.nosepick.io/v1/current \\
  -H "Authorization: Bearer np_live_sk_••••••••••••" \\
  -H "Accept: application/json"`;

const RESPONSE = `{
  "timestamp": "2025-04-26T14:23:18.441Z",
  "global": {
    "active_pickers": 1134872419,
    "confidence_interval": 0.973,
    "margin_of_error": "±2.3%",
    "model_version": "rhino-v4.2.1"
  },
  "rate_per_second": {
    "starts": 312488,
    "ends": 309117
  },
  "metadata": {
    "data_sources": 47,
    "last_recalibration": "2025-04-26T14:00:00Z",
    "peer_reviewed": true
  }
}`;

export const ApiDocs = () => {
  const [copied, setCopied] = useState<"curl" | "json" | null>(null);
  const copy = (text: string, which: "curl" | "json") => {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section id="docs" className="border-t border-border py-20">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ documentation</span>
          <h2 className="font-mono text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
            One endpoint. <span className="text-primary text-glow">A billion fingers.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl">
            REST + WebSocket. 99.997% uptime. Sub-200ms responses from 14 edge regions.
            Built on a proprietary <span className="font-mono text-foreground">Rhinometric™</span> inference layer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Endpoint list */}
          <div className="rounded-md border border-border bg-card shadow-card-elev overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary/80" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">api.nosepick.io · v1</span>
            </div>
            <div className="divide-y divide-border">
              {ENDPOINTS.map((e) => (
                <div key={e.path} className="flex items-center gap-3 px-4 py-3 font-mono text-xs hover:bg-muted/30 transition-colors">
                  <span
                    className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold ${
                      e.method === "GET" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"
                    }`}
                  >
                    {e.method}
                  </span>
                  <span className="text-foreground">{e.path}</span>
                  <span className="ml-auto text-muted-foreground text-[11px] hidden sm:inline">{e.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* cURL + response */}
          <div className="space-y-6">
            <CodeBlock title="REQUEST · cURL" code={CURL} onCopy={() => copy(CURL, "curl")} copied={copied === "curl"} />
            <CodeBlock title="RESPONSE · 200 OK" code={RESPONSE} onCopy={() => copy(RESPONSE, "json")} copied={copied === "json"} />
          </div>
        </div>
      </div>
    </section>
  );
};

const CodeBlock = ({
  title,
  code,
  onCopy,
  copied,
}: {
  title: string;
  code: string;
  onCopy: () => void;
  copied: boolean;
}) => (
  <div className="rounded-md border border-border bg-card shadow-card-elev overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{title}</span>
      <button
        onClick={onCopy}
        className="font-mono text-[10px] flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
    <pre className="p-4 font-mono text-xs leading-relaxed text-foreground/90 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);
