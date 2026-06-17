import type { LeaseAnalysis } from '../lib/claude';

export function ResultView({ result }: { result: LeaseAnalysis }) {
  return (
    <section className="result-panel">
      <h1>Lease report</h1>
      <p>{result.summary}</p>
      <h2>Red flags</h2>
      <ul>
        {result.red_flags.map((flag) => (
          <li key={flag}>{flag}</li>
        ))}
      </ul>
    </section>
  );
}
