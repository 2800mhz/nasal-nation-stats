import { describe, expect, it } from "vitest";
import {
  countryPayload,
  currentPayload,
  findCountry,
  regionalPayload,
  statusPayload,
} from "@/lib/api-logic";

describe("api payloads", () => {
  it("returns the expected current payload shape", () => {
    const payload = currentPayload(new Date("2026-06-23T12:00:00.000Z"));
    expect(payload.current_pickers).toBeGreaterThan(0);
    expect(payload.regional_breakdown).toHaveProperty("europe");
    expect(payload.data_sources.length).toBeGreaterThan(0);
  });

  it("returns country payloads for known countries", () => {
    const country = findCountry("TR");
    expect(country).toBeDefined();

    const payload = countryPayload(country!, new Date("2026-06-23T12:00:00.000Z"));
    expect(payload.code).toBe("TR");
    expect(payload.peak_hour_local).toContain("UTC");
  });

  it("returns status payloads with live services", () => {
    const payload = statusPayload(new Date("2026-06-23T12:00:00.000Z"));
    expect(payload.services).toHaveLength(6);
    expect(payload.overall).toBe("all_systems_nominal");
  });

  it("returns regional payloads", () => {
    const payload = regionalPayload(new Date("2026-06-23T12:00:00.000Z"));
    expect(payload.regions).toHaveProperty("africa");
  });
});
