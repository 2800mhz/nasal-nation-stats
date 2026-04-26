// Shared deterministic calculation logic for /api/v1/* routes.
// Used both server-side (Vite middleware) and client-side (fetch interceptor for production).

import { COUNTRIES, REGIONAL_COEFF, type Country } from "./countries";

export const CONSTANTS = {
  world_population: 8_100_000_000,
  base_rate: 0.91, // Jefferson & Thompson 1995
  picks_per_day: 4, // Andrade & Srihari 2001
  avg_pick_duration_seconds: 11,
};

export const CONCURRENT_RATE =
  (CONSTANTS.picks_per_day * CONSTANTS.avg_pick_duration_seconds) / 86400; // ~0.000509

export const BASE_CONCURRENT =
  CONSTANTS.world_population * CONSTANTS.base_rate * CONCURRENT_RATE;

// Diurnal sine wave: peaks 09:00 and 21:00 UTC, trough 04:00 UTC.
function diurnalMultiplier(now: Date): number {
  const h = now.getUTCHours() + now.getUTCMinutes() / 60;
  // Two peaks per day (period 12h), shifted so peaks land near 09 / 21 UTC
  const wave = Math.sin(((h - 3) / 12) * Math.PI * 2);
  return 1 + wave * 0.18; // ±18%
}

function noiseMultiplier(now: Date): number {
  return 1 + Math.sin(now.getTime() / 1000) * 0.003; // ±0.3%
}

const REGION_KEY_MAP: Record<string, string> = {
  "South/SE Asia": "south_asia",
  "East Asia": "east_asia",
  "Middle East": "middle_east",
  Europe: "europe",
  "North America": "north_america",
  Africa: "africa",
  "Latin America": "latin_america",
  Oceania: "oceania",
};

export function computeCurrentPickers(now = new Date()): number {
  const base = CONSTANTS.world_population * CONSTANTS.base_rate * CONCURRENT_RATE;
  return base * diurnalMultiplier(now) * noiseMultiplier(now);
}

export function computeRegionalBreakdown(now = new Date()): Record<string, number> {
  // Allocate concurrent pickers across regions weighted by (region_population * regional_coefficient)
  const totalsByRegion: Record<string, number> = {};
  let weightSum = 0;
  for (const c of COUNTRIES) {
    const w = c.population * REGIONAL_COEFF[c.region];
    weightSum += w;
    const key = REGION_KEY_MAP[c.region];
    totalsByRegion[key] = (totalsByRegion[key] ?? 0) + w;
  }
  const total = computeCurrentPickers(now);
  const result: Record<string, number> = {};
  for (const k of Object.keys(totalsByRegion)) {
    result[k] = Math.round((totalsByRegion[k] / weightSum) * total);
  }
  // Drop oceania from the public payload (spec lists 7 regions)
  delete result.oceania;
  return result;
}

export function unCivilizationalIndex(): number {
  return COUNTRIES.reduce((s, c) => s + c.founded, 0);
}

export function peakHourLocalLabel(c: Country): string {
  const off = c.utcOffset >= 0 ? `+${c.utcOffset}` : `${c.utcOffset}`;
  return `09:00 / 21:00 UTC${off}`;
}

export function countryPayload(c: Country, now = new Date()) {
  // Per-country concurrent pickers: same model, scaled by population & region coeff
  const totalGlobal = computeCurrentPickers(now);
  const denom = COUNTRIES.reduce((s, x) => s + x.population * REGIONAL_COEFF[x.region], 0);
  const share = (c.population * REGIONAL_COEFF[c.region]) / denom;
  return {
    code: c.code,
    name: c.name,
    flag: c.flag,
    population: c.population,
    region: c.region,
    regional_coefficient: REGIONAL_COEFF[c.region],
    current_pickers: Math.round(totalGlobal * share),
    peak_hour_local: peakHourLocalLabel(c),
    founded_year: c.founded,
  };
}

export const DATA_SOURCES = [
  {
    title: "Jefferson & Thompson, 1995 — Rhinotillexomania: Psychiatric Disorder or Habit?",
    url: "https://pubmed.ncbi.nlm.nih.gov/7852253/",
  },
  {
    title: "Andrade & Srihari, 2001 — A preliminary survey of rhinotillexomania in an adolescent sample",
    url: "https://pubmed.ncbi.nlm.nih.gov/11465519/",
  },
  {
    title: "Kluijtmans et al., 2023 — Nose picking and SARS-CoV-2 incidence (PLOS ONE)",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0288352",
  },
];

export function currentPayload(now = new Date()) {
  return {
    current_pickers: Math.round(computeCurrentPickers(now)),
    confidence_interval: "±2.3%",
    model_version: "rhino-v4.2.1",
    privacy_epsilon: 0.3,
    observation_timestamp: now.toISOString(),
    frequency_per_day_global_avg: CONSTANTS.picks_per_day,
    prevalence_rate: CONSTANTS.base_rate,
    regional_breakdown: computeRegionalBreakdown(now),
    un_civilizational_index: unCivilizationalIndex(),
    data_sources: DATA_SOURCES,
  };
}

export function regionalPayload(now = new Date()) {
  return {
    observation_timestamp: now.toISOString(),
    regions: computeRegionalBreakdown(now),
    methodology: "weighted by population × regional_coefficient",
  };
}

export function statusPayload(now = new Date()) {
  // Deterministic-ish uptime: anchored to fixed seed
  const services = [
    { name: "Rhino Model v4.2.1", status: "operational", uptime_90d: 99.97 },
    { name: "Differential Privacy Layer (ε=0.3)", status: "operational", uptime_90d: 99.99 },
    { name: "Regional Telemetry Feed", status: "operational", uptime_90d: 99.83 },
    { name: "UN Civilizational Index Calculator", status: "operational", uptime_90d: 100.0 },
    { name: "API Rate Limiter", status: "degraded", uptime_90d: 98.41, note: "free tier throttled" },
    { name: "Webhook Delivery (Pro)", status: "operational", uptime_90d: 99.92 },
  ];
  return {
    overall: "all_systems_nominal",
    model_version: "rhino-v4.2.1",
    last_calibration_timestamp: new Date(now.getTime() - (now.getTime() % 60_000)).toISOString(),
    observation_timestamp: now.toISOString(),
    services,
  };
}

export function findCountry(code: string): Country | undefined {
  const up = code.toUpperCase();
  return COUNTRIES.find((c) => c.code === up);
}
