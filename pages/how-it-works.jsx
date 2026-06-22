const steps = [
  {
    icon: '📄',
    title: 'Upload Your Lease',
    copy: 'Upload any residential or commercial lease PDF (max 10MB).',
  },
  {
    icon: '🤖',
    title: 'AI Analysis',
    copy: 'Our system extracts key clauses and identifies risks (this is mocked in demo).',
  },
  {
    icon: '👀',
    title: 'Review Your Report',
    copy: 'Get plain-English translations of complex legal terms.',
  },
  {
    icon: '📥',
    title: 'Download Summary',
    copy: 'Share with your agent, landlord, or legal advisor.',
  },
];

export default function HowItWorks() {
  return (
    <main className="page prose">
      <h1>How It Works</h1>
      <div className="steps-list">
        {steps.map((step, index) => (
          <article key={step.title} className="step-item">
            <span className="step-icon" aria-hidden="true">{step.icon}</span>
            <div>
              <h2>{index + 1}. {step.title}</h2>
              <p>{step.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
