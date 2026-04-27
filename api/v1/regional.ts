import type { VercelRequest, VercelResponse } from '@vercel/node';
import { regionalPayload } from '../../src/lib/api-logic';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(regionalPayload(new Date()));
}
