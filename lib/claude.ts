import Anthropic from '@anthropic-ai/sdk';

export type LeaseAnalysis = {
  summary: string;
  red_flags: string[];
};

export async function analyzeLease(fileText: string): Promise<LeaseAnalysis> {
  if (!process.env.CLAUDE_API_KEY) throw new Error('CLAUDE_API_KEY is not configured');
  const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
  const prompt = [
    'Return strict JSON with keys summary and red_flags.',
    'Summarise the lease in plain English for an Australian small business tenant.',
    'Flag unusual payment, renewal, assignment, make-good, personal guarantee, termination, insurance, and rent review clauses.',
    'Do not provide legal advice. Use concise language.',
    fileText.substring(0, 4000),
  ].join('\n\n');

  const response = await client.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('')
    .trim();
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) throw new Error('Claude response did not contain JSON');
  const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as LeaseAnalysis;
  return {
    summary: String(parsed.summary ?? ''),
    red_flags: Array.isArray(parsed.red_flags) ? parsed.red_flags.map(String) : [],
  };
}
