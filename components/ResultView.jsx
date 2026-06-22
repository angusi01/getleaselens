export function ResultView({ result }) {
    return (<section className="result-panel">
      <h1>Lease report</h1>
      <article className="summary-card">
        <h2>Plain-English summary</h2>
        <p>{result.summary}</p>
      </article>
      <h2>Red flags</h2>
      <div className="accordion-list">
        {result.red_flags.map((flag, index) => (<details key={`${flag.title}-${index}`} className="flag-item" open={index === 0}>
            <summary>
              <span className={`badge ${flag.severity}`}>{flag.severity}</span>
              {flag.title}
            </summary>
            <p>{flag.description}</p>
          </details>))}
        {!result.red_flags.length && <p>No major red flags were detected in the extracted lease text.</p>}
      </div>
    </section>);
}
