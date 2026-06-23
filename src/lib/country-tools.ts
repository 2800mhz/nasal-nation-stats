import { COUNTRIES, fmtInt, localHourFor, peakHourLabel, pickersFor, type Country } from "@/lib/countries";

export type CountrySortKey =
  | "pickers_desc"
  | "pickers_asc"
  | "name_asc"
  | "population_desc"
  | "region_asc"
  | "founded_desc";

export interface CountryRow {
  country: Country;
  pickers: number;
  pct: number;
  localHour: number;
  isPeak: boolean;
  peakLabel: string;
  formattedPickers: string;
}

const REGION_ORDER = [
  "South/SE Asia",
  "East Asia",
  "Middle East",
  "Europe",
  "North America",
  "Africa",
  "Latin America",
  "Oceania",
] as const;

const REGION_WEIGHT: Record<string, number> = Object.fromEntries(
  REGION_ORDER.map((region, index) => [region, index]),
);

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function localSeed(country: Country, now: Date) {
  const stamp = Math.floor(now.getTime() / 60_000);
  const codeSeed = country.code.charCodeAt(0) * 31 + country.code.charCodeAt(1) * 17;
  return ((codeSeed + stamp) % 1000) / 1000;
}

function isPeakHour(hour: number) {
  return (hour >= 8 && hour < 10) || (hour >= 13 && hour < 15) || (hour >= 21 && hour < 23);
}

function aliasEntries() {
  return COUNTRIES.flatMap((country) => {
    const normalizedName = normalize(country.name);
    const extraAliases: Record<string, string[]> = {
      TR: ["turkey", "turkiye", "tuerkiye"],
      US: ["usa", "u s a", "united states of america", "america"],
      GB: ["uk", "u k", "great britain", "britain"],
      KR: ["south korea", "korea"],
      AE: ["uae", "united arab emirates"],
      NZ: ["new zealand"],
      CD: ["drc", "dr congo", "democratic republic of congo"],
    };
    const aliases = extraAliases[country.code] ?? [];
    return [
      { key: country.code.toLowerCase(), country, tokens: 1 },
      { key: normalizedName, country, tokens: normalizedName.split(" ").length },
      ...aliases.map((alias) => ({ key: normalize(alias), country, tokens: normalize(alias).split(" ").length })),
    ];
  });
}

const ALIAS_ENTRIES = aliasEntries();
const ALIAS_MAP = new Map(ALIAS_ENTRIES.map((entry) => [entry.key, entry.country]));
const MAX_ALIAS_TOKENS = Math.max(...ALIAS_ENTRIES.map((entry) => entry.tokens));

export function lookupCountry(query: string): Country | undefined {
  const cleaned = normalize(query);
  if (!cleaned) return undefined;
  return ALIAS_MAP.get(cleaned) ?? COUNTRIES.find((country) => country.code.toLowerCase() === cleaned);
}

export function parseCountrySelection(input: string): Country[] {
  const cleaned = normalize(input);
  if (!cleaned) return [];

  const tokens = cleaned.match(/\S+/g) ?? [];
  const results: Country[] = [];
  const seen = new Set<string>();

  let i = 0;
  while (i < tokens.length) {
    let match: Country | undefined;
    let consumed = 0;

    for (let len = Math.min(MAX_ALIAS_TOKENS, tokens.length - i); len >= 1; len -= 1) {
      const phrase = tokens.slice(i, i + len).join(" ");
      match = lookupCountry(phrase);
      if (match) {
        consumed = len;
        break;
      }
    }

    if (match) {
      if (!seen.has(match.code)) {
        results.push(match);
        seen.add(match.code);
      }
      i += consumed;
      continue;
    }

    i += 1;
  }

  return results;
}

export function buildCountryRows(now = new Date()): CountryRow[] {
  return COUNTRIES.map((country) => {
    const pickers = pickersFor(country, now, localSeed(country, now));
    const localHour = localHourFor(country, now);
    return {
      country,
      pickers,
      pct: (pickers / country.population) * 100,
      localHour,
      isPeak: isPeakHour(localHour),
      peakLabel: peakHourLabel(country),
      formattedPickers: fmtInt(pickers),
    };
  });
}

export function sortCountryRows(rows: CountryRow[], sort: CountrySortKey) {
  const sorted = [...rows];
  switch (sort) {
    case "pickers_asc":
      return sorted.sort((a, b) => a.pickers - b.pickers || a.country.name.localeCompare(b.country.name));
    case "name_asc":
      return sorted.sort((a, b) => a.country.name.localeCompare(b.country.name));
    case "population_desc":
      return sorted.sort((a, b) => b.country.population - a.country.population || a.country.name.localeCompare(b.country.name));
    case "region_asc":
      return sorted.sort(
        (a, b) =>
          (REGION_WEIGHT[a.country.region] ?? 999) - (REGION_WEIGHT[b.country.region] ?? 999) ||
          a.country.name.localeCompare(b.country.name),
      );
    case "founded_desc":
      return sorted.sort((a, b) => b.country.founded - a.country.founded || a.country.name.localeCompare(b.country.name));
    case "pickers_desc":
    default:
      return sorted.sort((a, b) => b.pickers - a.pickers || a.country.name.localeCompare(b.country.name));
  }
}

export function filterCountryRows(
  rows: CountryRow[],
  opts: {
    search?: string;
    region?: string;
    peakOnly?: boolean;
    limit?: number;
    sort?: CountrySortKey;
  } = {},
) {
  const search = normalize(opts.search ?? "");
  const region = opts.region ?? "all";

  let result = rows.filter((row) => {
    if (region !== "all" && row.country.region !== region) return false;
    if (opts.peakOnly && !row.isPeak) return false;
    if (!search) return true;
    const haystack = normalize(`${row.country.code} ${row.country.name} ${row.country.region}`);
    return haystack.includes(search);
  });

  result = sortCountryRows(result, opts.sort ?? "pickers_desc");

  if (typeof opts.limit === "number" && opts.limit > 0) {
    result = result.slice(0, opts.limit);
  }

  return result;
}

export function countryListFromCodes(rawCodes: string[]) {
  return rawCodes
    .map((code) => lookupCountry(code))
    .filter((country): country is Country => Boolean(country));
}
