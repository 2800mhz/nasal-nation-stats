import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  buildCountryRows,
  filterCountryRows,
  type CountrySortKey,
} from "@/lib/country-tools";

const REGION_OPTIONS = [
  "all",
  "South/SE Asia",
  "East Asia",
  "Middle East",
  "Europe",
  "North America",
  "Africa",
  "Latin America",
  "Oceania",
] as const;

const SORT_OPTIONS: Array<{ value: CountrySortKey; label: string }> = [
  { value: "pickers_desc", label: "Pickers: high -> low" },
  { value: "pickers_asc", label: "Pickers: low -> high" },
  { value: "name_asc", label: "Name: A -> Z" },
  { value: "population_desc", label: "Population: high -> low" },
  { value: "region_asc", label: "Region" },
  { value: "founded_desc", label: "Founded: recent -> old" },
];

export const CountryTable = () => {
  const [tick, setTick] = useState(0);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<(typeof REGION_OPTIONS)[number]>("all");
  const [sort, setSort] = useState<CountrySortKey>("pickers_desc");
  const [peakOnly, setPeakOnly] = useState(false);
  const [limit, setLimit] = useState(25);

  useEffect(() => {
    const id = window.setInterval(() => setTick((value) => value + 1), 5000);
    return () => window.clearInterval(id);
  }, []);

  const rows = useMemo(() => {
    const now = new Date();
    return filterCountryRows(buildCountryRows(now), {
      search,
      region,
      sort,
      peakOnly,
      limit,
    });
  }, [tick, search, region, sort, peakOnly, limit]);

  const totalRows = useMemo(() => buildCountryRows(new Date()).length, [tick]);

  return (
    <div className="border border-border bg-card">
      <div className="flex flex-col gap-4 px-4 py-4 border-b border-border lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            Sovereign Telemetry · n={totalRows}
          </div>
          <h3 className="font-mono text-base font-bold mt-0.5">Country Explorer</h3>
          <p className="font-mono text-[10px] text-muted-foreground mt-1 max-w-2xl">
            Search, sort, and open the data you want in the order you want. The rows refresh every 5s.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Search
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Bangladesh, TR, Sweden"
              className="bg-background border border-border px-3 py-2 font-mono text-xs text-foreground uppercase tracking-wide focus:outline-none focus:border-primary"
            />
          </label>

          <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Region
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value as (typeof REGION_OPTIONS)[number])}
              className="bg-background border border-border px-3 py-2 font-mono text-xs text-foreground uppercase tracking-wide focus:outline-none focus:border-primary"
            >
              {REGION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All regions" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as CountrySortKey)}
              className="bg-background border border-border px-3 py-2 font-mono text-xs text-foreground uppercase tracking-wide focus:outline-none focus:border-primary"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Limit
            <select
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
              className="bg-background border border-border px-3 py-2 font-mono text-xs text-foreground uppercase tracking-wide focus:outline-none focus:border-primary"
            >
              <option value={10}>10 rows</option>
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
              <option value={0}>All rows</option>
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-border font-mono text-[10px] text-muted-foreground">
        <button
          onClick={() => setPeakOnly((value) => !value)}
          className={`px-2.5 py-1 border transition-colors ${
            peakOnly ? "border-primary text-primary bg-primary/10" : "border-border hover:border-primary hover:text-primary"
          }`}
        >
          {peakOnly ? "Peak only on" : "Peak only off"}
        </button>
        <span>
          showing <span className="text-foreground">{rows.length}</span> country rows
        </span>
        <span>
          updated every <span className="text-foreground">5s</span>
        </span>
      </div>

      <div className="max-h-[560px] overflow-y-auto">
        <table className="w-full font-mono text-xs">
          <thead className="sticky top-0 bg-card border-b border-border">
            <tr className="text-[9px] uppercase tracking-widest text-muted-foreground">
              <th className="text-left px-3 py-2 w-10">#</th>
              <th className="text-left px-3 py-2">Country</th>
              <th className="text-right px-3 py-2">Current Pickers</th>
              <th className="text-right px-3 py-2">% Pop.</th>
              <th className="text-right px-3 py-2 hidden md:table-cell">Peak (Local)</th>
              <th className="text-right px-3 py-2 hidden lg:table-cell">Founded</th>
              <th className="text-right px-3 py-2 hidden xl:table-cell">Region</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.country.code} className="border-b border-border/60 hover:bg-muted/30">
                <td className="px-3 py-1.5 text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-3 py-1.5">
                  <Link to={`/country/${row.country.code}`} className="group inline-flex items-center gap-2">
                    <span>{row.country.flag}</span>
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {row.country.name}
                    </span>
                    {row.isPeak && (
                      <span className="text-[8px] px-1 py-0.5 bg-primary/15 text-primary tracking-wider">
                        PEAK
                      </span>
                    )}
                  </Link>
                  <div className="font-mono text-[9px] text-muted-foreground mt-0.5">{row.country.code}</div>
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-foreground">{row.formattedPickers}</td>
                <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">
                  {row.pct.toFixed(2)}%
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground hidden md:table-cell">
                  {row.peakLabel}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground hidden lg:table-cell">
                  {row.country.founded}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-primary hidden xl:table-cell">
                  {row.country.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-4 py-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] text-muted-foreground">
        <span>
          formula: <span className="text-foreground">pop × 0.142 × t_factor × r_coeff ± 0.3% noise</span>
        </span>
        <span>click any country to open a detail view</span>
      </div>
    </div>
  );
};
