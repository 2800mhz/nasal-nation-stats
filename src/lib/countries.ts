// Real population (millions, ~2024) + founding year + region + capital UTC offset
// Founding year = year of modern statehood (commonly cited).

export type RegionKey =
  | "South/SE Asia"
  | "East Asia"
  | "Middle East"
  | "Europe"
  | "North America"
  | "Africa"
  | "Latin America"
  | "Oceania";

export const REGIONAL_COEFF: Record<RegionKey, number> = {
  "South/SE Asia": 1.18,
  "East Asia": 1.09,
  "Middle East": 1.14,
  Europe: 0.94,
  "North America": 0.91,
  Africa: 1.11,
  "Latin America": 1.06,
  Oceania: 0.97,
};

export interface Country {
  code: string;
  name: string;
  flag: string;
  population: number; // absolute
  founded: number;
  region: RegionKey;
  utcOffset: number; // capital, hours
}

// Founding year notes:
// - China: 1949 (PRC); India: 1947; USA: 1776; Turkey: 1923; UK: 1707 (Acts of Union);
// - France: 1792 (First Republic); Germany: 1949 (FRG); Japan: 660 BCE traditional → use 1947 (current constitution)
// We use widely-cited modern statehood years.
export const COUNTRIES: Country[] = [
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

export const BASELINE_RATE = 0.142;

// Peak-hour multiplier based on local hour of capital
function timeFactor(localHour: number): number {
  const peak =
    (localHour >= 8 && localHour < 10) ||
    (localHour >= 13 && localHour < 15) ||
    (localHour >= 21 && localHour < 23);
  const off =
    (localHour >= 2 && localHour < 6); // dead of night
  if (peak) return 1.3;
  if (off) return 0.7;
  return 1.0;
}

export function localHourFor(c: Country, now = new Date()): number {
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const local = new Date(utcMs + c.utcOffset * 3_600_000);
  return local.getHours() + local.getMinutes() / 60;
}

export function pickersFor(c: Country, now = new Date(), noiseSeed = 0): number {
  const base = c.population * BASELINE_RATE;
  const tf = timeFactor(localHourFor(c, now));
  const rc = REGIONAL_COEFF[c.region];
  const det = base * tf * rc;
  // ±0.3% noise
  const noise = 1 + (noiseSeed - 0.5) * 0.006;
  return det * noise;
}

export function peakHourLabel(c: Country): string {
  // Always report first peak window (08-10 local)
  return `08:00–10:00 ${c.utcOffset >= 0 ? "+" : ""}${c.utcOffset}`;
}

export function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}
