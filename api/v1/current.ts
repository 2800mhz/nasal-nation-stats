import type { VercelRequest, VercelResponse } from '@vercel/node';
import { currentPayload } from '../_lib/api-logic.js';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(currentPayload(new Date()));
}
