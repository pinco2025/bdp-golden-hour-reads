import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  return res.json({ status: 'OK', message: 'Serverless API is running' })
}


