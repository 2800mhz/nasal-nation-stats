import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { buildCountryRows, countryListFromCodes, lookupCountry } from "@/lib/country-tools";

type CountryPayload = {
  code: string;
  name: string;
  flag: string;
  population: number;
  region: string;
  regional_coefficient: number;
  current_pickers: number;
  peak_hour_local: string;
  founded_year: number;
};

async function fetchCountry(code: string): Promise<CountryPayload> {
  const res = await fetch(`/api/v1/country/${code}`);
  if (!res.ok) {
    throw new Error(`Failed to load country ${code}`);
  }
  return res.json();
}

const CountryCard = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) => (
  <div className="border border-border bg-card p-4">
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    <div className="font-mono text-2xl font-extrabold text-foreground mt-2">{value}</div>
    {hint ? <div className="font-mono text-[10px] text-muted-foreground mt-1">{hint}</div> : null}
  </div>
);

export default function CountryPage() {
  const params = useParams();
  const code = (params.code ?? "TR").toUpperCase();
  const country = lookupCountry(code);

  const { data, error, isLoading } = useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountry(code),
    enabled: Boolean(country),
    refetchInterval: 15_000,
    staleTime: 10_000,
  });

  const related = useMemo(() => {
    if (!country) return [];
    const base = buildCountryRows(new Date())
      .filter((row) => row.country.region === country.region && row.country.code !== country.code)
      .sort((a, b) => b.pickers - a.pickers)
      .slice(0, 4)
      .map((row) => row.country);
    return base;
  }, [country, code]);

  const examples = useMemo(() => {
    if (!country) return [];
    const selectedCodes = [country.code, ...related.map((item) => item.code)].slice(0, 3);
    return countryListFromCodes(selectedCodes);
  }, [country, related]);

  if (!country) {
    return (
      <div className="min-h-screen">
        <MarqueeTicker />
        <Nav />
        <section className="container py-20">
          <div className="max-w-xl mx-auto border border-border bg-card p-8 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ country</div>
            <h1 className="font-mono text-3xl font-extrabold mt-2">Country not found</h1>
            <p className="font-mono text-xs text-muted-foreground mt-3">
              We could not resolve <span className="text-foreground">{code}</span>. Try TR, BD, SE, or US.
            </p>
            <Link
              to="/"
              className="inline-flex mt-6 font-mono text-xs uppercase tracking-widest font-bold px-4 py-2 bg-primary text-primary-foreground"
            >
              Return home
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const selected = examples.length ? examples : country ? [country] : [];
  const latestRows = buildCountryRows(new Date());
  const derived = country
    ? latestRows.find((row) => row.country.code === country.code)
    : undefined;

  return (
    <div className="min-h-screen">
      <MarqueeTicker />
      <Nav />

      <section className="border-b border-border py-14">
        <div className="container max-w-6xl">
          <div className="flex flex-col gap-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ country/{code}</div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-mono text-4xl md:text-5xl font-extrabold leading-none">
                  {country.flag} {country.name}
                </h1>
                <p className="font-mono text-xs text-muted-foreground mt-3 max-w-2xl">
                  Country detail view with live refresh, ordered comparison examples, and API-backed payloads.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/#countries"
                  className="font-mono text-[11px] uppercase tracking-widest font-bold px-3 py-2 border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  Back to explorer
                </Link>
                <a
                  href={`/api/v1/country/${code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] uppercase tracking-widest font-bold px-3 py-2 bg-primary text-primary-foreground"
                >
                  Open JSON
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-6xl py-8">
        {error ? (
          <div className="border border-destructive/40 bg-destructive/5 p-4 font-mono text-xs text-destructive mb-6">
            Failed to load live API payload: {(error as Error).message}
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <CountryCard
            label="Current pickers"
            value={data ? data.current_pickers.toLocaleString("en-US") : derived?.formattedPickers ?? "—"}
            hint="refreshes every 15s"
          />
          <CountryCard
            label="Region"
            value={country.region}
            hint={`regional coeff ${data?.regional_coefficient?.toFixed(2) ?? "—"}`}
          />
          <CountryCard
            label="Peak hour"
            value={data?.peak_hour_local ?? "—"}
            hint="local capital clock"
          />
          <CountryCard
            label="Founded"
            value={String(data?.founded_year ?? country.founded)}
            hint={`population ${country.population.toLocaleString("en-US")}`}
          />
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mt-6">
          <div className="border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ payload</div>
                <h2 className="font-mono text-xl font-bold mt-1">Live JSON response</h2>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                {data ? "live via API" : "loading..."}
              </div>
            </div>
            <pre className="mt-4 bg-background border border-border p-4 overflow-x-auto font-mono text-xs leading-relaxed text-foreground/90">
              <code>{JSON.stringify(data ?? { loading: isLoading }, null, 2)}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <div className="border border-border bg-card p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ ordered set</div>
              <h2 className="font-mono text-xl font-bold mt-1">Comparison chain</h2>
              <p className="font-mono text-xs text-muted-foreground mt-2">
                The same ordered list logic used in the site explorer can be reused here for walkthroughs and
                side-by-side pages.
              </p>
              <div className="mt-4 grid gap-2">
                {selected.map((item, index) => (
                  <Link
                    key={`${item.code}-${index}`}
                    to={`/country/${item.code}`}
                    className="flex items-center justify-between border border-border px-3 py-2 font-mono text-xs hover:border-primary transition-colors"
                  >
                    <span>
                      {String(index + 1).padStart(2, "0")} · {item.flag} {item.name}
                    </span>
                    <span className="text-muted-foreground">{item.code}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-border bg-card p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ related</div>
              <h2 className="font-mono text-xl font-bold mt-1">Similar countries</h2>
              <div className="mt-4 grid gap-2">
                {related.length ? (
                  related.map((item) => (
                    <Link
                      key={item.code}
                      to={`/country/${item.code}`}
                      className="flex items-center justify-between border border-border px-3 py-2 font-mono text-xs hover:border-primary transition-colors"
                    >
                      <span>
                        {item.flag} {item.name}
                      </span>
                      <span className="text-muted-foreground">{item.region}</span>
                    </Link>
                  ))
                ) : (
                  <div className="font-mono text-xs text-muted-foreground">No related countries found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
