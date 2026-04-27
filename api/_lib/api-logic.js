const COUNTRIES = [
  { code: "CN", name: "China", flag: "🇨🇳", population: 1_410_000_000, founded: 1949, region: "East Asia", utcOffset: 8 },
  { code: "IN", name: "India", flag: "🇮🇳", population: 1_428_000_000, founded: 1947, region: "South/SE Asia", utcOffset: 5.5 },
  { code: "US", name: "United States", flag: "🇺🇸", population: 334_900_000, founded: 1776, region: "North America", utcOffset: -5 },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", population: 277_500_000, founded: 1945, region: "South/SE Asia", utcOffset: 7 },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", population: 240_500_000, founded: 1947, region: "South/SE Asia", utcOffset: 5 },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", population: 223_800_000, founded: 1960, region: "Africa", utcOffset: 1 },
  { code: "BR", name: "Brazil", flag: "🇧🇷", population: 216_400_000, founded: 1822, region: "Latin America", utcOffset: -3 },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", population: 172_900_000, founded: 1971, region: "South/SE Asia", utcOffset: 6 },
  { code: "RU", name: "Russia", flag: "🇷🇺", population: 144_400_000, founded: 1991, region: "Europe", utcOffset: 3 },
  { code: "MX", name: "Mexico", flag: "🇲🇽", population: 128_500_000, founded: 1810, region: "Latin America", utcOffset: -6 },
  { code: "JP", name: "Japan", flag: "🇯🇵", population: 124_500_000, founded: 1947, region: "East Asia", utcOffset: 9 },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹", population: 126_500_000, founded: 1995, region: "Africa", utcOffset: 3 },
  { code: "PH", name: "Philippines", flag: "🇵🇭", population: 117_300_000, founded: 1946, region: "South/SE Asia", utcOffset: 8 },
  { code: "EG", name: "Egypt", flag: "🇪🇬", population: 112_700_000, founded: 1953, region: "Middle East", utcOffset: 2 },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", population: 98_900_000, founded: 1945, region: "South/SE Asia", utcOffset: 7 },
  { code: "CD", name: "DR Congo", flag: "🇨🇩", population: 102_300_000, founded: 1960, region: "Africa", utcOffset: 1 },
  { code: "IR", name: "Iran", flag: "🇮🇷", population: 89_200_000, founded: 1979, region: "Middle East", utcOffset: 3.5 },
  { code: "TR", name: "Türkiye", flag: "🇹🇷", population: 85_300_000, founded: 1923, region: "Middle East", utcOffset: 3 },
  { code: "DE", name: "Germany", flag: "🇩🇪", population: 84_500_000, founded: 1949, region: "Europe", utcOffset: 1 },
  { code: "TH", name: "Thailand", flag: "🇹🇭", population: 71_800_000, founded: 1932, region: "South/SE Asia", utcOffset: 7 },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", population: 67_700_000, founded: 1707, region: "Europe", utcOffset: 0 },
  { code: "FR", name: "France", flag: "🇫🇷", population: 64_800_000, founded: 1792, region: "Europe", utcOffset: 1 },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", population: 67_400_000, founded: 1961, region: "Africa", utcOffset: 3 },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", population: 60_400_000, founded: 1910, region: "Africa", utcOffset: 2 },
  { code: "IT", name: "Italy", flag: "🇮🇹", population: 58_900_000, founded: 1861, region: "Europe", utcOffset: 1 },
  { code: "KE", name: "Kenya", flag: "🇰🇪", population: 55_100_000, founded: 1963, region: "Africa", utcOffset: 3 },
  { code: "MM", name: "Myanmar", flag: "🇲🇲", population: 54_600_000, founded: 1948, region: "South/SE Asia", utcOffset: 6.5 },
  { code: "CO", name: "Colombia", flag: "🇨🇴", population: 52_100_000, founded: 1810, region: "Latin America", utcOffset: -5 },
  { code: "KR", name: "South Korea", flag: "🇰🇷", population: 51_700_000, founded: 1948, region: "East Asia", utcOffset: 9 },
  { code: "ES", name: "Spain", flag: "🇪🇸", population: 47_500_000, founded: 1812, region: "Europe", utcOffset: 1 },
  { code: "UG", name: "Uganda", flag: "🇺🇬", population: 48_600_000, founded: 1962, region: "Africa", utcOffset: 3 },
  { code: "AR", name: "Argentina", flag: "🇦🇷", population: 45_800_000, founded: 1816, region: "Latin America", utcOffset: -3 },
  { code: "DZ", name: "Algeria", flag: "🇩🇿", population: 45_600_000, founded: 1962, region: "Africa", utcOffset: 1 },
  { code: "SD", name: "Sudan", flag: "🇸🇩", population: 48_100_000, founded: 1956, region: "Africa", utcOffset: 2 },
  { code: "IQ", name: "Iraq", flag: "🇮🇶", population: 45_500_000, founded: 1932, region: "Middle East", utcOffset: 3 },
  { code: "AF", name: "Afghanistan", flag: "🇦🇫", population: 42_200_000, founded: 1919, region: "South/SE Asia", utcOffset: 4.5 },
  { code: "PL", name: "Poland", flag: "🇵🇱", population: 36_800_000, founded: 1918, region: "Europe", utcOffset: 1 },
  { code: "CA", name: "Canada", flag: "🇨🇦", population: 40_100_000, founded: 1867, region: "North America", utcOffset: -5 },
  { code: "MA", name: "Morocco", flag: "🇲🇦", population: 37_800_000, founded: 1956, region: "Africa", utcOffset: 1 },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", population: 36_900_000, founded: 1932, region: "Middle East", utcOffset: 3 },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿", population: 35_600_000, founded: 1991, region: "South/SE Asia", utcOffset: 5 },
  { code: "PE", name: "Peru", flag: "🇵🇪", population: 34_400_000, founded: 1821, region: "Latin America", utcOffset: -5 },
  { code: "AO", name: "Angola", flag: "🇦🇴", population: 36_700_000, founded: 1975, region: "Africa", utcOffset: 1 },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", population: 34_300_000, founded: 1957, region: "South/SE Asia", utcOffset: 8 },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿", population: 33_900_000, founded: 1975, region: "Africa", utcOffset: 2 },
  { code: "GH", name: "Ghana", flag: "🇬🇭", population: 34_100_000, founded: 1957, region: "Africa", utcOffset: 0 },
  { code: "YE", name: "Yemen", flag: "🇾🇪", population: 34_400_000, founded: 1990, region: "Middle East", utcOffset: 3 },
  { code: "NP", name: "Nepal", flag: "🇳🇵", population: 30_500_000, founded: 1768, region: "South/SE Asia", utcOffset: 5.75 },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", population: 28_800_000, founded: 1811, region: "Latin America", utcOffset: -4 },
  { code: "AU", name: "Australia", flag: "🇦🇺", population: 26_600_000, founded: 1901, region: "Oceania", utcOffset: 10 },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", population: 17_900_000, founded: 1815, region: "Europe", utcOffset: 1 },
  { code: "AE", name: "UAE", flag: "🇦🇪", population: 9_900_000, founded: 1971, region: "Middle East", utcOffset: 4 },
  { code: "SE", name: "Sweden", flag: "🇸🇪", population: 10_600_000, founded: 1523, region: "Europe", utcOffset: 1 },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", population: 8_800_000, founded: 1291, region: "Europe", utcOffset: 1 },
  { code: "IL", name: "Israel", flag: "🇮🇱", population: 9_800_000, founded: 1948, region: "Middle East", utcOffset: 2 },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", population: 5_200_000, founded: 1907, region: "Oceania", utcOffset: 12 },
];

const REGIONAL_COEFF = {
  "South/SE Asia": 1.18,
  "East Asia": 1.09,
  "Middle East": 1.14,
  Europe: 0.94,
  "North America": 0.91,
  Africa: 1.11,
  "Latin America": 1.06,
  Oceania: 0.97,
};

const REGION_KEY_MAP = {
  "South/SE Asia": "south_asia",
  "East Asia": "east_asia",
  "Middle East": "middle_east",
  Europe: "europe",
  "North America": "north_america",
  Africa: "africa",
  "Latin America": "latin_america",
  Oceania: "oceania",
};

const CONSTANTS = {
  world_population: 8_100_000_000,
  base_rate: 0.91,
  picks_per_day: 4,
  avg_pick_duration_seconds: 11,
};

const CONCURRENT_RATE = (CONSTANTS.picks_per_day * CONSTANTS.avg_pick_duration_seconds) / 86400;

function diurnalMultiplier(now) {
  const h = now.getUTCHours() + now.getUTCMinutes() / 60;
  return 1 + Math.sin(((h - 3) / 12) * Math.PI * 2) * 0.18;
}

function noiseMultiplier(now) {
  return 1 + Math.sin(now.getTime() / 1000) * 0.003;
}

function computeCurrentPickers(now = new Date()) {
  return CONSTANTS.world_population * CONSTANTS.base_rate * CONCURRENT_RATE * diurnalMultiplier(now) * noiseMultiplier(now);
}

function computeRegionalBreakdown(now = new Date()) {
  const totalsByRegion = {};
  let weightSum = 0;
  for (const c of COUNTRIES) {
    const w = c.population * REGIONAL_COEFF[c.region];
    weightSum += w;
    const key = REGION_KEY_MAP[c.region];
    totalsByRegion[key] = (totalsByRegion[key] ?? 0) + w;
  }
  const total = computeCurrentPickers(now);
  const result = {};
  for (const k of Object.keys(totalsByRegion)) {
    result[k] = Math.round((totalsByRegion[k] / weightSum) * total);
  }
  delete result.oceania;
  return result;
}

function unCivilizationalIndex() {
  return COUNTRIES.reduce((sum, country) => sum + country.founded, 0);
}

function peakHourLocalLabel(country) {
  const offset = country.utcOffset >= 0 ? `+${country.utcOffset}` : `${country.utcOffset}`;
  return `09:00 / 21:00 UTC${offset}`;
}

const DATA_SOURCES = [
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

function countryPayload(country, now = new Date()) {
  const totalGlobal = computeCurrentPickers(now);
  const denom = COUNTRIES.reduce((sum, c) => sum + c.population * REGIONAL_COEFF[c.region], 0);
  const share = (country.population * REGIONAL_COEFF[country.region]) / denom;
  return {
    code: country.code,
    name: country.name,
    flag: country.flag,
    population: country.population,
    region: country.region,
    regional_coefficient: REGIONAL_COEFF[country.region],
    current_pickers: Math.round(totalGlobal * share),
    peak_hour_local: peakHourLocalLabel(country),
    founded_year: country.founded,
  };
}

function currentPayload(now = new Date()) {
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

function regionalPayload(now = new Date()) {
  return {
    observation_timestamp: now.toISOString(),
    regions: computeRegionalBreakdown(now),
    methodology: "weighted by population × regional_coefficient",
  };
}

function statusPayload(now = new Date()) {
  return {
    overall: "all_systems_nominal",
    model_version: "rhino-v4.2.1",
    last_calibration_timestamp: new Date(now.getTime() - (now.getTime() % 60_000)).toISOString(),
    observation_timestamp: now.toISOString(),
    services: [
      { name: "Rhino Model v4.2.1", status: "operational", uptime_90d: 99.97 },
      { name: "Differential Privacy Layer (ε=0.3)", status: "operational", uptime_90d: 99.99 },
      { name: "Regional Telemetry Feed", status: "operational", uptime_90d: 99.83 },
      { name: "UN Civilizational Index Calculator", status: "operational", uptime_90d: 100.0 },
      { name: "API Rate Limiter", status: "degraded", uptime_90d: 98.41, note: "free tier throttled" },
      { name: "Webhook Delivery (Pro)", status: "operational", uptime_90d: 99.92 },
    ],
  };
}

function findCountry(code) {
  return COUNTRIES.find((country) => country.code === String(code).toUpperCase());
}

export { countryPayload, currentPayload, findCountry, regionalPayload, statusPayload };
