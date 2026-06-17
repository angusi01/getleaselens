import type { NextApiRequest, NextApiResponse } from 'next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import analyzeHandler from '../pages/api/analyze';
import { sha256Hex, timingSafeEqualHex } from '../lib/security';

const originalInternalAnalyzeToken = process.env.INTERNAL_ANALYZE_TOKEN;

function createJsonResponse() {
  const response = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };

  return response as unknown as NextApiResponse & {
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
  };
}

afterEach(() => {
  if (originalInternalAnalyzeToken === undefined) {
    delete process.env.INTERNAL_ANALYZE_TOKEN;
  } else {
    process.env.INTERNAL_ANALYZE_TOKEN = originalInternalAnalyzeToken;
  }
});

describe('security helpers', () => {
  it('hashes tokens with SHA-256 hex', () => {
    expect(sha256Hex('lease-token')).toBe('2c80af130e7c29586a8e40b306691fd9726d60daa488ff3580121f95a823fc38');
  });

  it('compares hashes without accepting different values', () => {
    const expected = sha256Hex('secret');
    expect(timingSafeEqualHex(expected, sha256Hex('secret'))).toBe(true);
    expect(timingSafeEqualHex(expected, sha256Hex('other'))).toBe(false);
  });
});

describe('analyze API authorization', () => {
  it('fails closed when the internal analyze token is not configured', async () => {
    delete process.env.INTERNAL_ANALYZE_TOKEN;
    const response = createJsonResponse();

    await analyzeHandler(
      { method: 'POST', headers: {}, body: { text: 'lease text' } } as NextApiRequest,
      response,
    );

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ error: 'internal_analyze_token_not_configured' });
  });

  it('rejects requests without the expected bearer token', async () => {
    process.env.INTERNAL_ANALYZE_TOKEN = 'expected-token';
    const response = createJsonResponse();

    await analyzeHandler(
      { method: 'POST', headers: {}, body: { text: 'lease text' } } as NextApiRequest,
      response,
    );

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ error: 'unauthorized' });
  });
});
