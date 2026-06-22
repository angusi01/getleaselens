import { UploadForm } from '../components/UploadForm';
export default function Home() {
    return (<main className="page">
      <section className="hero">
        <div>
          <h1>Understand your lease before you sign it</h1>
          <p>Upload your commercial lease PDF. Get a plain-English summary, red flags, and key terms - in under 2 minutes. $9 per analysis. No account required for single reports.</p>
          <div className="trust-grid">
            <span>Your lease is encrypted in transit (TLS 1.3) and at rest (AES-256)</span>
            <span>Your PDF is deleted from our servers immediately after analysis.</span>
            <span>Your lease contents are never used to train AI models or shared with third parties</span>
          </div>
        </div>
        <UploadForm />
      </section>
      <section className="content-grid">
        <article>
          <h2>How it works</h2>
          <ol>
            <li><strong>Upload your lease</strong> - Drag and drop your commercial lease or retail lease PDF.</li>
            <li><strong>AI analysis</strong> - Our AI checks for common red flags, unfair terms, and key obligations.</li>
            <li><strong>Get your report</strong> - Download it, share it, and take it to your lawyer.</li>
          </ol>
        </article>
        <article>
          <h2>What you'll learn</h2>
          <ul>
            <li>Rent and review method</li>
            <li>Lease term and options</li>
            <li>Outgoings and make good</li>
            <li>Permitted use and guarantees</li>
          </ul>
        </article>
        <article>
          <h2>Who this is for</h2>
          <p>Australian business owners comparing commercial leases before paying for final legal review.</p>
        </article>
        <article>
          <h2>FAQ</h2>
          <p>No. GetLeaseLens is not legal advice. It provides a plain-English summary and highlights potential issues so you know what to ask your solicitor.</p>
        </article>
      </section>
    </main>);
}
