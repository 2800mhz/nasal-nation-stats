import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy } from "lucide-react";
import {
  buildCountryRows,
  parseCountrySelection,
} from "@/lib/country-tools";

const PRESETS = [
  { label: "Bangladesh, Sweden, Turkey", value: "BD, SE, TR" },
  { label: "Japan, Korea, China", value: "JP, KR, CN" },
  { label: "United States, Canada, Mexico", value: "US, CA, MX" },
];

const SNIPPET = `const ordered = ["BD", "SE", "TR"]
  .map((code) => lookupCountry(code))
  .filter(Boolean);`;

type CountryRow = ReturnType<typeof buildCountryRows>[number];

export const CountryExplorer = () => {
  const [raw, setRaw] = useState("BD, SE, TR");
  const [copied, setCopied] = useState(false);

  const selected = useMemo(() => parseCountrySelection(raw), [raw]);
  const rows = useMemo<CountryRow[]>(() => {
    const latest = buildCountryRows(new Date());
    return selected
      .map((country) => latest.find((row) => row.country.code === country.code))
      .filter((row): row is CountryRow => Boolean(row));
  }, [selected]);

  const copySnippet = async () => {
    await navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const resolvedCount = selected.length;

  return (
    <section id="countries" className="border border-border bg-card">
      <div className="grid lg:grid-cols-[1.1fr_1.4fr]">
        <div className="border-b lg:border-b-0 lg:border-r border-border p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ ordered set</span>
          <h2 className="font-mono text-2xl md:text-3xl font-extrabold mt-2 leading-tight">
            Choose countries in the exact order you want
          </h2>
          <p className="font-mono text-xs text-muted-foreground mt-3 leading-relaxed">
            Paste a comma-separated list, use presets, or type names directly. The explorer keeps the order intact,
            which is useful when you want Bangladesh, Sweden, Turkey, and any other set exactly as entered.
          </p>

          <label className="block mt-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Country list
            </div>
            <textarea
              value={raw}
              onChange={(event) => setRaw(event.target.value)}
              rows={4}
              className="w-full bg-background border border-border px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary"
              placeholder="BD, SE, TR"
            />
          </label>

          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setRaw(preset.value)}
                className="font-mono text-[10px] uppercase tracking-widest border border-border px-2.5 py-1.5 hover:border-primary hover:text-primary transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-[10px]">
            <div className="border border-border bg-background p-3">
              <div className="uppercase tracking-widest text-muted-foreground">Resolved</div>
              <div className="text-foreground mt-1 text-sm">{selected.length} countries</div>
            </div>
            <div className="border border-border bg-background p-3">
              <div className="uppercase tracking-widest text-muted-foreground">Matches</div>
              <div className="text-foreground mt-1 text-sm">{resolvedCount} resolved countries</div>
            </div>
          </div>

          <div className="mt-5 border border-border bg-background">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Example code</span>
              <button
                onClick={copySnippet}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-3 overflow-x-auto font-mono text-xs leading-relaxed text-foreground/90">
              <code>{SNIPPET}</code>
            </pre>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-end justify-between gap-3 mb-4 flex-wrap">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ ordered preview</div>
              <h3 className="font-mono text-xl font-bold mt-1">Selected countries in order</h3>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground">
              from <span className="text-foreground">{rows.length}</span> matched rows
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="border border-dashed border-border bg-background p-6 text-center font-mono text-xs text-muted-foreground">
              No countries resolved yet. Try codes like <span className="text-foreground">BD, SE, TR</span>.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {rows.map((row) => (
                <Link
                  key={row.country.code}
                  to={`/country/${row.country.code}`}
                  className="border border-border bg-background p-4 hover:border-primary transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {row.country.code}
                      </div>
                      <div className="font-mono text-lg font-bold mt-1 group-hover:text-primary transition-colors">
                        {row.country.flag} {row.country.name}
                      </div>
                    </div>
                    <div className="text-right font-mono text-[10px] text-muted-foreground">
                      <div>{row.country.region}</div>
                      <div>{row.country.founded}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-[10px]">
                    <div className="border border-border p-2">
                      <div className="uppercase tracking-widest text-muted-foreground">Pickers</div>
                      <div className="text-foreground mt-1 text-sm">{row.formattedPickers}</div>
                    </div>
                    <div className="border border-border p-2">
                      <div className="uppercase tracking-widest text-muted-foreground">Peak</div>
                      <div className="text-foreground mt-1 text-sm">{row.peakLabel}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-4 font-mono text-[10px] text-muted-foreground">
            The order is preserved exactly as entered, so you can build site-side lists and walkthroughs without
            worrying about automatic resorting.
          </div>
        </div>
      </div>
    </section>
  );
};
