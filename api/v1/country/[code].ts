import type { VercelRequest, VercelResponse } from '@vercel/node';
import { countryPayload, findCountry } from '../../../src/lib/api-logic';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;
  const country = findCountry(String(code));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  if (!country) {
    return res.status(404).json({ error: 'country_not_found', code });
  }
  res.status(200).json(countryPayload(country, new Date()));
}
