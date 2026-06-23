# Nasal Nation Stats

Live telemetry dashboard and API for tracking the entirely scientific, definitely serious world of nasal picking statistics.

## What you get

- A React + Vite frontend
- A small Vercel-style API surface under `/api/v1`
- Status, current, regional, and country-specific data endpoints

## Getting Started

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Available Scripts

- `npm run dev` - start the local dev server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint
- `npm run test` - run Vitest

## API Routes

- `GET /api/v1/current`
- `GET /api/v1/regional`
- `GET /api/v1/status`
- `GET /api/v1/country/:code`

## Notes

- API responses are returned as JSON.
- The status endpoint is intentionally cache-busted with `Cache-Control: no-store`.
