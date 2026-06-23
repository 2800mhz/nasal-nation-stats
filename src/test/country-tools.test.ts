import { describe, expect, it } from "vitest";
import {
  buildCountryRows,
  filterCountryRows,
  lookupCountry,
  parseCountrySelection,
  sortCountryRows,
} from "@/lib/country-tools";

describe("country tools", () => {
  it("resolves ordered country selections by code and name", () => {
    const selected = parseCountrySelection("BD, Sweden, Turkey");
    expect(selected.map((country) => country.code)).toEqual(["BD", "SE", "TR"]);
  });

  it("looks up common aliases", () => {
    expect(lookupCountry("Turkey")?.code).toBe("TR");
    expect(lookupCountry("TR")?.name).toBeDefined();
  });

  it("filters and sorts country rows", () => {
    const rows = buildCountryRows(new Date("2026-06-23T12:00:00.000Z"));
    const filtered = filterCountryRows(rows, {
      search: "tur",
      region: "Middle East",
      sort: "name_asc",
      limit: 5,
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0]?.country.code).toBe("TR");

    const sorted = sortCountryRows(rows.slice(0, 3), "population_desc");
    expect(sorted[0]?.country.population).toBeGreaterThanOrEqual(sorted[1]?.country.population ?? 0);
  });
});
