// Production fallback: intercepts fetch('/api/v1/...') in static deployments
// (where no server middleware is available) and returns identical JSON computed
// in-browser. In dev/preview, the Vite plugin handles real HTTP first, so this
// intercept never fires for actual network responses.
import {
  currentPayload,
  regionalPayload,
  statusPayload,
  countryPayload,
  findCountry,
} from "@/lib/api-logic";

const ROUTE_RE = /^\/api\/v1\/(current|regional|status|country\/[A-Za-z]{2})\/?$/;

function build(url: string): { status: number; body: unknown } {
  const now = new Date();
  if (url.startsWith("/api/v1/current")) return { status: 200, body: currentPayload(now) };
  if (url.startsWith("/api/v1/regional")) return { status: 200, body: regionalPayload(now) };
  if (url.startsWith("/api/v1/status")) return { status: 200, body: statusPayload(now) };
  const m = url.match(/^\/api\/v1\/country\/([A-Za-z]{2})/);
  if (m) {
    const c = findCountry(m[1]);
    if (!c) return { status: 404, body: { error: "country_not_found", code: m[1].toUpperCase() } };
    return { status: 200, body: countryPayload(c, now) };
  }
  return { status: 404, body: { error: "endpoint_not_found", path: url } };
}

let installed = false;

export function installApiFallback() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  const original = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const urlStr =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.pathname + input.search
          : input.url;
    let pathname = urlStr;
    try {
      pathname = new URL(urlStr, window.location.origin).pathname;
    } catch {
      // ignore
    }

    if (!ROUTE_RE.test(pathname)) {
      return original(input as any, init);
    }

    // Try the real network first (dev middleware will answer)
    try {
      const res = await original(input as any, init);
      const ct = res.headers.get("content-type") || "";
      if (res.ok && ct.includes("application/json")) return res;
    } catch {
      // fall through to local
    }

    // Fallback: synthesize the response locally
    const { status, body } = build(pathname);
    return new Response(JSON.stringify(body, null, 2), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  };
}
