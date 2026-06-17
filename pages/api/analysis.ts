import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { sha256Hex, timingSafeEqualHex } from '../../lib/security';
import { getServiceSupabase } from '../../lib/supabaseClient';

const querySchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  token: z.string().min(20),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_request' });

  const supabase = getServiceSupabase();
  const tokenHash = sha256Hex(parsed.data.token);
  const { data: purchase, error: purchaseError } = await supabase
    .from('purchases')
    .select('analysis_id, access_token_hash, status')
    .eq('email', parsed.data.email)
    .eq('analysis_id', parsed.data.id)
    .single();

  if (purchaseError || !purchase || purchase.status !== 'paid' || !timingSafeEqualHex(purchase.access_token_hash, tokenHash)) {
    return res.status(401).json({ error: 'invalid_token' });
  }

  const { data: analysis, error } = await supabase
    .from('analyses')
    .select('analysis_result')
    .eq('id', parsed.data.id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(analysis.analysis_result);
}
