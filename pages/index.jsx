import { useState } from 'react';
import { ChevronDown, Lock, ShieldCheck, Trash2, UserX } from '../components/Icons';
import { UploadForm } from '../components/UploadForm';

const clauses = [
  ['Make good clause', 'High risk', 'Requires full reinstatement at tenant cost.', 'danger'],
  ['Personal guarantee', 'High risk', 'Directors remain liable after assignment.', 'danger'],
  ['Rent review', 'Fair', 'Fixed 3% annual review is clearly stated.', 'success'],
  ['Option term', 'Fair', 'Two 3-year options with written notice window.', 'success'],
  ['Outgoings', 'Review', 'Recoverable expenses need line-item confirmation.', 'danger'],
  ['Permitted use', 'Fair', 'Business use is specific and practical.', 'success'],
];

const faqs = [
  ['Is this legal advice?', 'No. GetLeaseLens provides a structured plain-English report so you know what to ask a qualified solicitor before signing.'],
  ['What happens to my PDF?', 'Your lease is encrypted during upload and deleted after analysis. We do not keep a copy for model training or marketing use.'],
  ['Do I need an account?', 'No. Single reports and 5-packs can be purchased without creating an account.'],
];

function ClauseCard({ clause }) {
  const [title, status, copy, tone] = clause;
  return (
    <article className="clause-card">
      <div>
        <h3>{title}</h3>
        <span className={`status-pill ${tone}`}>{status}</span>
      </div>
      <p>{copy}</p>
    </article>
  );
}

function FaqRow({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <button className={`faq-row ${open ? 'open' : ''}`} type="button" onClick={() => setOpen(!open)}>
      <span>
        <strong>{item[0]}</strong>
        {open && <p>{item[1]}</p>}
      </span>
      <ChevronDown />
    </button>
  );
}

export default function Home() {
  return (
    <main>
      <section id="analyse" className="lease-hero">
        <div className="hero-copy">
          <span className="eyebrow">Commercial lease review</span>
          <h1>Know exactly what you're signing.</h1>
          <p>Upload your commercial lease PDF and get a plain-English risk report covering key obligations, hidden costs, guarantees, options, outgoings, and make-good terms.</p>
          <strong>$9 per report. No account required.</strong>
          <a className="primary-cta" href="#upload">Analyse a Lease</a>
          <small className="delete-note"><ShieldCheck /> PDF deleted after analysis</small>
        </div>
        <div className="mock-report-card" aria-label="Example lease risk report">
          <div>
            <span>Lease risk report</span>
            <strong>4 clauses need review</strong>
          </div>
          {clauses.slice(0, 4).map((clause) => <ClauseCard key={clause[0]} clause={clause} />)}
        </div>
      </section>

      <section className="trust-band">
        {[
          [ShieldCheck, 'TLS 1.3 + AES-256'],
          [Trash2, 'Deleted after analysis'],
          [Lock, 'Never used for AI training'],
          [UserX, 'No account needed'],
        ].map(([Icon, text]) => (
          <div key={text}><Icon /><span>{text}</span></div>
        ))}
      </section>

      <section className="section-shell steps-grid">
        {[
          ['01', 'Upload PDF', 'Add your commercial or retail lease PDF securely.'],
          ['02', 'AI scans 12 risk categories', 'The lease is checked for obligations, fees, notice windows, guarantees, options, and common red flags.'],
          ['03', 'Receive structured report', 'Get a clause-by-clause report with plain-English explanations and practical questions to raise.'],
        ].map((step) => (
          <article key={step[0]}>
            <span>{step[0]}</span>
            <h2>{step[1]}</h2>
            <p>{step[2]}</p>
          </article>
        ))}
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <h2>Sample report</h2>
          <p>Example only.</p>
        </div>
        <div className="sample-grid">{clauses.map((clause) => <ClauseCard key={clause[0]} clause={clause} />)}</div>
      </section>

      <section id="pricing" className="section-shell pricing-grid">
        <article>
          <h2>Single report</h2>
          <strong>$9</strong>
          <p>One commercial lease analysis with PDF report.</p>
        </article>
        <article className="best-value">
          <span>Best value</span>
          <h2>5-pack</h2>
          <strong>$35</strong>
          <p>Five reports for business owners comparing multiple sites.</p>
        </article>
        <p className="pricing-note">No subscription. No account. Pay per report.</p>
      </section>

      <section id="upload" className="section-shell upload-section">
        <UploadForm />
      </section>

      <section className="section-shell faq-list">
        <h2>FAQ</h2>
        {faqs.map((item) => <FaqRow key={item[0]} item={item} />)}
      </section>

      <footer className="marketing-footer">
        <span>© 2026 GetLeaseLens. Not legal advice.</span>
        <nav>
          <LinkText href="/privacy">Privacy</LinkText>
          <LinkText href="/terms">Terms</LinkText>
          <LinkText href="/contact">Contact</LinkText>
        </nav>
      </footer>
    </main>
  );
}

function LinkText({ href, children }) {
  return <a href={href}>{children}</a>;
}
