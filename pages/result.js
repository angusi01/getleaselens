import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ResultView } from '../components/ResultView';

const mockReport = {
  summary:
    'Rent increase is capped, the break clause is usable after six months with written notice, and structural maintenance sits with the landlord.',
  red_flags: [
    {
      severity: 'medium',
      title: 'Unclear termination notice',
      description: 'No clear termination notice period is specified, which could create ambiguity.',
    },
    {
      severity: 'medium',
      title: 'Market rent review',
      description: 'Rent review is tied to market rates without a clear calculation method.',
    },
  ],
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('Checking access...');

  useEffect(() => {
    if (!router.isReady) return;

    const { email, file, mock, pending, token } = router.query;
    if (mock) {
      setResult({ ...mockReport, fileName: typeof file === 'string' ? file : '' });
      return;
    }
    if (pending) {
      setStatus('Payment received. Check your email for the report link.');
      return;
    }
    if (!token || typeof token !== 'string') {
      setStatus('Missing report token.');
      return;
    }

    async function load() {
      const payload = {
        token,
        ...(typeof email === 'string' && email ? { email } : {}),
      };
      const verified = await fetch('/api/verify-token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!verified.ok) {
        setStatus('Report link is invalid or expired.');
        return;
      }
      const { analysisId } = await verified.json();
      const query = new URLSearchParams({ id: analysisId, token });
      if (typeof email === 'string' && email) query.set('email', email);
      const analysis = await fetch(`/api/analysis?${query.toString()}`);
      if (!analysis.ok) {
        setStatus('Could not load report.');
        return;
      }
      setResult(await analysis.json());
    }

    load().catch(() => setStatus('Could not load report.'));
  }, [router.isReady, router.query]);

  return <main className="page">{result ? <ResultView result={result} /> : <p>{status}</p>}</main>;
}
