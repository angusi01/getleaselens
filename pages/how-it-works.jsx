const steps = [
  ['01', 'Upload PDF', 'Upload a commercial or retail lease PDF before you sign. The file is encrypted during transfer and queued only for the report you requested.'],
  ['02', 'AI scans 12 risk categories', 'The analysis checks rent reviews, outgoings, make-good obligations, guarantees, assignment rights, options, permitted use, insurance, repairs, defaults, dispute terms, and notice windows.'],
  ['03', 'Receive structured report', 'Your report separates key terms, plain-English explanations, risks to discuss with a solicitor, and clauses that look commercially reasonable.'],
  ['04', 'Download and act', 'Download the report, compare sites, and take specific questions to your lawyer, landlord, or agent before committing.'],
];

export default function HowItWorks() {
  return (
    <main className="how-page">
      <section>
        <h1>How GetLeaseLens works</h1>
        <p>Four clear steps from PDF upload to a practical lease review report.</p>
      </section>
      <div className="how-steps">
        {steps.map(([number, title, copy]) => (
          <article key={number}>
            <span>{number}</span>
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
