import { analyzeLease } from '../../lib/claude';
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'method_not_allowed' });
    if (!process.env.INTERNAL_ANALYZE_TOKEN)
        return res.status(500).json({ error: 'internal_analyze_token_not_configured' });
    if (req.headers.authorization !== `Bearer ${process.env.INTERNAL_ANALYZE_TOKEN}`) {
        return res.status(401).json({ error: 'unauthorized' });
    }
    const text = typeof req.body?.text === 'string' ? req.body.text : '';
    if (!text)
        return res.status(400).json({ error: 'missing_text' });
    const result = await analyzeLease(text);
    return res.status(200).json(result);
}
