import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ResultView } from '../components/ResultView';
import { SiteFooter } from '../components/layout/SiteFooter';

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

  return (
    <main className="min-h-screen bg-surface pt-16 text-on-background">
      {result ? (
        <>
          <ResultView result={result} />
          <SiteFooter className="bg-white" />
        </>
      ) : (
        <section className="mx-auto flex min-h-[60vh] max-w-container-max items-center justify-center px-6 py-20">
          <div className="rounded-xl border border-outline-variant bg-white px-8 py-10 text-center ambient-shadow">
            <span className="material-symbols-outlined mb-4 text-[36px] text-primary-container">hourglass_top</span>
            <p className="font-body-lg text-body-lg text-on-surface-variant" aria-live="polite">{status}</p>
          </div>
        </section>
      )}
    </main>
  );
}
