import { useEffect, useState } from 'react';
import { ResultView } from '../components/ResultView';
import type { LeaseAnalysis } from '../lib/claude';

export default function ResultPage() {
  const [result, setResult] = useState<LeaseAnalysis | null>(null);
  const [status, setStatus] = useState('Checking access...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const token = params.get('token');
    if (!email || !token) {
      setStatus(params.get('pending') ? 'Payment received. Check your email for the report link.' : 'Missing report token.');
      return;
    }
    const reportEmail = email;
    const reportToken = token;
    async function load() {
      const verified = await fetch('/api/verify-token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: reportEmail, token: reportToken }),
      });
      if (!verified.ok) {
        setStatus('Report link is invalid or expired.');
        return;
      }
      const { analysisId } = await verified.json();
      const analysis = await fetch(`/api/analysis?id=${analysisId}&email=${encodeURIComponent(reportEmail)}&token=${encodeURIComponent(reportToken)}`);
      if (!analysis.ok) {
        setStatus('Could not load report.');
        return;
      }
      setResult(await analysis.json());
    }
    load().catch(() => setStatus('Could not load report.'));
  }, []);

  return <main className="page">{result ? <ResultView result={result} /> : <p>{status}</p>}</main>;
}
