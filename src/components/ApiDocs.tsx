import { useState } from "react";
import { Check, Copy } from "lucide-react";

const ENDPOINTS = [
  { method: "GET", path: "/api/v1/current", desc: "Live global current-pickers payload" },
  { method: "GET", path: "/api/v1/regional", desc: "Region breakdown and methodology" },
  { method: "GET", path: "/api/v1/status", desc: "Operational health and calibration info" },
  { method: "GET", path: "/api/v1/country/:code", desc: "Single-country detail payload" },
];

const CURL = `curl https://api.nosepick.io/api/v1/current

curl https://api.nosepick.io/api/v1/country/TR`;

const FETCH = `const res = await fetch("/api/v1/current");
const json = await res.json();
console.log(json.current_pickers);`;

const ORDERED = `const codes = ["BD", "SE", "TR"];
const countries = codes
  .map((code) => lookupCountry(code))
  .filter(Boolean);`;

const RESPONSE = `{
  "current_pickers": 1134872419,
  "confidence_interval": "±2.3%",
  "model_version": "rhino-v4.2.1",
  "privacy_epsilon": 0.3,
  "observation_timestamp": "2026-06-23T12:00:00.000Z",
  "frequency_per_day_global_avg": 4,
  "prevalence_rate": 0.91,
  "regional_breakdown": {
    "south_asia": 412883711,
    "east_asia": 218447220,
    "middle_east": 84112905,
    "europe": 102837441,
    "north_america": 53219808,
    "africa": 198471122,
    "latin_america": 64900212
  },
  "un_civilizational_index": 102487,
  "data_sources": [
    { "title": "Jefferson & Thompson, 1995", "url": "https://pubmed.ncbi.nlm.nih.gov/7852253/" }
  ]
}`;

export const ApiDocs = () => {
  const [copied, setCopied] = useState<"curl" | "fetch" | "ordered" | "json" | null>(null);

  const copy = async (text: string, which: typeof copied) => {
    await navigator.clipboard.writeText(text);
    setCopied(which);
    window.setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section id="docs" className="border-t border-border py-20">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ documentation</span>
          <h2 className="font-mono text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
            Practical API docs with copyable examples
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            No auth, no versioning ceremony, no fluff. The site is built to show exactly how to fetch live data,
            how to open one country, and how to keep your own ordered list of countries intact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary/80" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">api.nosepick.io · live routes</span>
            </div>

            <div className="divide-y divide-border">
              {ENDPOINTS.map((endpoint) => (
                <div key={endpoint.path} className="flex items-center gap-3 px-4 py-3 font-mono text-xs hover:bg-muted/30 transition-colors">
                  <span
                    className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold ${
                      endpoint.method === "GET" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <span className="text-foreground">{endpoint.path}</span>
                  <span className="ml-auto text-muted-foreground text-[11px] hidden sm:inline">
                    {endpoint.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <CodeBlock
              title="REQUEST · cURL"
              code={CURL}
              onCopy={() => copy(CURL, "curl")}
              copied={copied === "curl"}
            />
            <CodeBlock
              title="REQUEST · fetch()"
              code={FETCH}
              onCopy={() => copy(FETCH, "fetch")}
              copied={copied === "fetch"}
            />
            <CodeBlock
              title="ORDERED COUNTRIES · site-side array"
              code={ORDERED}
              onCopy={() => copy(ORDERED, "ordered")}
              copied={copied === "ordered"}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 mt-6">
          <div className="border border-border bg-card p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ response</div>
            <h3 className="font-mono text-xl font-bold mt-1">Example JSON payload</h3>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              This is the shape returned by the current endpoint and mirrored by the static fallback.
            </p>
          </div>
          <CodeBlock
            title="RESPONSE · 200 OK"
            code={RESPONSE}
            onCopy={() => copy(RESPONSE, "json")}
            copied={copied === "json"}
          />
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
  <div className="border border-border bg-card overflow-hidden">
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
