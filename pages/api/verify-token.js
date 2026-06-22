import { z } from 'zod';
import { sha256Hex, timingSafeEqualHex } from '../../lib/security';
import { getServiceSupabase } from '../../lib/supabaseClient';
const schema = z.object({ email: z.string().email(), token: z.string().min(20) });
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'method_not_allowed' });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: 'invalid_request' });
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
        .from('purchases')
        .select('id, analysis_id, access_token_hash, status')
        .eq('email', parsed.data.email)
        .order('created_at', { ascending: false });
    if (error)
        return res.status(500).json({ error: error.message });
    const tokenHash = sha256Hex(parsed.data.token);
    const purchase = data.find((row) => row.status === 'paid' && timingSafeEqualHex(row.access_token_hash, tokenHash));
    if (!purchase?.analysis_id)
        return res.status(401).json({ error: 'invalid_token' });
    return res.status(200).json({ analysisId: purchase.analysis_id, purchaseId: purchase.id });
}
