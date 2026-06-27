import { z } from 'zod';
import { sha256Hex, timingSafeEqualHex } from '../../lib/security';
import { getServiceSupabase } from '../../lib/supabaseClient';
const querySchema = z.object({
    id: z.string().uuid(),
    email: z.string().email().optional(),
    token: z.string().min(20),
});
export default async function handler(req, res) {
    if (req.method !== 'GET')
        return res.status(405).json({ error: 'method_not_allowed' });
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success)
        return res.status(400).json({ error: 'invalid_request' });
    const supabase = getServiceSupabase();
    const tokenHash = sha256Hex(parsed.data.token);
    let purchaseQuery = supabase
        .from('purchases')
        .select('analysis_id, access_token_hash, status')
        .eq('analysis_id', parsed.data.id)
        .limit(10);
    if (parsed.data.email)
        purchaseQuery = purchaseQuery.eq('email', parsed.data.email);
    const { data: purchases, error: purchaseError } = await purchaseQuery;
    const purchase = purchases?.find((row) => ['paid', 'complete'].includes(row.status) && timingSafeEqualHex(row.access_token_hash, tokenHash));
    if (purchaseError || !purchase) {
        return res.status(401).json({ error: 'invalid_token' });
    }
    const { data: analysis, error } = await supabase
        .from('analyses')
        .select('analysis_result')
        .eq('id', parsed.data.id)
        .single();
    if (error)
        return res.status(500).json({ error: error.message });
    return res.status(200).json(analysis.analysis_result);
}
