// Vite dev/preview plugin that serves /api/v1/* with real JSON responses.
import type { Plugin, Connect } from "vite";
import {
  currentPayload,
  regionalPayload,
  statusPayload,
  countryPayload,
  findCountry,
} from "../src/lib/api-logic";

function send(res: any, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body, null, 2));
}

const handler: Connect.NextHandleFunction = (req, res, next) => {
  const url = req.url || "";
  if (!url.startsWith("/api/v1/")) return next();
  const now = new Date();

  try {
    if (url.startsWith("/api/v1/current")) return send(res, 200, currentPayload(now));
    if (url.startsWith("/api/v1/regional")) return send(res, 200, regionalPayload(now));
    if (url.startsWith("/api/v1/status")) return send(res, 200, statusPayload(now));

    const m = url.match(/^\/api\/v1\/country\/([A-Za-z]{2})/);
    if (m) {
      const c = findCountry(m[1]);
      if (!c) return send(res, 404, { error: "country_not_found", code: m[1].toUpperCase() });
      return send(res, 200, countryPayload(c, now));
    }

    return send(res, 404, { error: "endpoint_not_found", path: url });
  } catch (e) {
    return send(res, 500, { error: "internal", message: (e as Error).message });
  }
};

export function nosePickApi(): Plugin {
  return {
    name: "nosepick-api",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}
