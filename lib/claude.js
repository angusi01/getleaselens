import Anthropic from '@anthropic-ai/sdk';
export async function analyzeLease(fileText) {
    if (!process.env.CLAUDE_API_KEY)
        throw new Error('CLAUDE_API_KEY is not configured');
    const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
    const system = `You are an Australian tenancy law expert. Return ONLY valid JSON with this exact shape:
{
  "summary": "2-3 sentence plain-English summary of key lease terms",
  "red_flags": [
    { "severity": "high|medium|low", "title": "Short issue name", "description": "Why this matters to the tenant" }
  ]
}
Focus on rent increases, bond terms, maintenance obligations, break clauses, special conditions, pet policies, and subletting. Limit to five red flags. Do not provide legal advice.`;
    const response = await client.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 1000,
        system,
        messages: [{ role: 'user', content: fileText.substring(0, 8000) }],
    });
    const text = response.content
        .map((part) => (part.type === 'text' ? part.text : ''))
        .join('')
        .trim();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1)
        throw new Error('Claude response did not contain JSON');
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    const severities = new Set(['high', 'medium', 'low']);
    return {
        summary: String(parsed.summary ?? ''),
        red_flags: Array.isArray(parsed.red_flags)
            ? parsed.red_flags.slice(0, 5).map((flag) => ({
                severity: severities.has(flag?.severity) ? flag.severity : 'low',
                title: String(flag?.title ?? 'Lease issue'),
                description: String(flag?.description ?? flag ?? ''),
            }))
            : [],
    };
}
