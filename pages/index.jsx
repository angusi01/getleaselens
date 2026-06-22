import { UploadForm } from '../components/UploadForm';

const faqs = [
  {
    q: 'Is GetLeaseLens legal advice?',
    a: 'No. GetLeaseLens provides a plain-English summary and highlights potential issues so you know what to ask your solicitor. It does not replace legal advice.',
  },
  {
    q: 'What types of leases does it analyse?',
    a: 'Commercial and retail leases. We check for rent review clauses, make good obligations, permitted use, personal guarantees, and more.',
  },
  {
    q: 'How long does the analysis take?',
    a: 'Under 2 minutes for most leases. You get a downloadable report you can take to your lawyer.',
  },
  {
    q: 'Is my lease kept on your servers?',
    a: 'No. Your PDF is deleted immediately after analysis. We never store your lease contents or use them to train AI models.',
  },
  {
    q: 'What is the 5-pack for?',
    a: 'If you are comparing multiple sites or need to review leases for different tenancies, the 5-pack saves you $10 compared to buying individually.',
  },
  {
    q: 'Can I share the report with my solicitor?',
    a: 'Yes. The report is a downloadable PDF designed to be shared. Many users bring it to their first legal consultation to save billable time.',
  },
];

export default function Home() {
  return (
    <main className="page">
      {/* Hero */}
      <section className="hero">
        <div>
          <h1>Understand your lease before you sign it</h1>
          <p>Upload your commercial lease PDF. Get a plain-English summary, red flags, and key terms – in under 2 minutes. $9 per analysis. No account required for single reports.</p>
          <div className="trust-grid">
            <span>Your lease is encrypted in transit (TLS 1.3) and at rest (AES-256)</span>
            <span>Your PDF is deleted from our servers immediately after analysis.</span>
            <span>Your lease contents are never used to train AI models or shared with third parties</span>
          </div>
        </div>
        <UploadForm />
      </section>

      {/* Sample output teaser */}
      <section style={{background:'#f0f4ff', padding:'48px 24px', borderTop:'1px solid rgba(0,0,80,0.08)'}}>
        <div style={{maxWidth:'860px', margin:'0 auto'}}>
          <h2 style={{marginBottom:'8px', fontSize:'1.5rem'}}>What you get for $9</h2>
          <p style={{opacity:0.6, marginBottom:'32px'}}>A structured report covering the clauses that matter most. Here is what a real output looks like:</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px'}}>
            {[
              { label: 'Rent & Review', value: 'CPI + 1% annually. Market review at year 3.', flag: false },
              { label: 'Make Good', value: 'Full strip-out to base building required. Estimated $18k–$35k.', flag: true },
              { label: 'Lease Term', value: '3 + 3 years. Option must be exercised 6 months before expiry.', flag: false },
              { label: 'Personal Guarantee', value: 'Director guarantee with no cap on liability.', flag: true },
              { label: 'Permitted Use', value: 'Restricted to “café and food retail”. Subletting prohibited.', flag: true },
              { label: 'Outgoings', value: 'Tenant pays water, electricity, and proportional building insurance.', flag: false },
            ].map(item => (
              <div key={item.label} style={{background:'#fff', borderRadius:'10px', padding:'16px', borderLeft: item.flag ? '4px solid #e05' : '4px solid #22c55e'}}>
                <p style={{fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.06em', opacity:0.5, marginBottom:'4px'}}>{item.label}</p>
                <p style={{fontSize:'0.9rem', lineHeight:1.5, margin:0}}>{item.value}</p>
                {item.flag && <span style={{display:'inline-block', marginTop:'8px', fontSize:'0.75rem', background:'#ffe4e4', color:'#c00', padding:'2px 8px', borderRadius:'4px'}}>Red flag</span>}
              </div>
            ))}
          </div>
          <p style={{marginTop:'24px', fontSize:'0.85rem', opacity:0.5}}>Example only. Actual output generated from your lease.</p>
        </div>
      </section>

      {/* Content grid */}
      <section className="content-grid">
        <article>
          <h2>How it works</h2>
          <ol>
            <li><strong>Upload your lease</strong> – Drag and drop your commercial lease or retail lease PDF.</li>
            <li><strong>AI analysis</strong> – Our AI checks for common red flags, unfair terms, and key obligations.</li>
            <li><strong>Get your report</strong> – Download it, share it, and take it to your lawyer.</li>
          </ol>
        </article>
        <article>
          <h2>What you’ll learn</h2>
          <ul>
            <li>Rent and review method</li>
            <li>Lease term and options</li>
            <li>Outgoings and make good obligations</li>
            <li>Permitted use and subletting rights</li>
            <li>Personal guarantee exposure</li>
            <li>Fitout and signage rights</li>
          </ul>
        </article>
        <article>
          <h2>Who this is for</h2>
          <p>Australian business owners comparing commercial leases before paying for final legal review.</p>
          <p style={{marginTop:'12px'}}>Use GetLeaseLens to understand your lease yourself first — then walk into your solicitor’s office knowing exactly what to ask. Most users save at least one hour of billable legal time.</p>
        </article>
        <article>
          <h2>Pricing</h2>
          <div style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'8px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'8px'}}>
              <span style={{fontWeight:600}}>Single analysis</span>
              <span style={{fontWeight:700, fontSize:'1.2rem'}}>$9</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', border:'2px solid #1a2a4a', borderRadius:'8px', position:'relative'}}>
              <span style={{fontWeight:600}}>5-pack <span style={{fontSize:'0.8rem', background:'#e8f5e9', color:'#2e7d32', padding:'2px 8px', borderRadius:'4px', marginLeft:'8px'}}>Save $10</span></span>
              <span style={{fontWeight:700, fontSize:'1.2rem'}}>$35</span>
            </div>
          </div>
        </article>
      </section>

      {/* FAQ */}
      <section style={{padding:'64px 24px', maxWidth:'760px', margin:'0 auto'}}>
        <h2 style={{fontSize:'1.8rem', marginBottom:'32px'}}>Frequently asked questions</h2>
        <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
          {faqs.map((faq, i) => (
            <div key={i} style={{borderTop:'1px solid rgba(0,0,0,0.08)', padding:'20px 0'}}>
              <p style={{fontWeight:600, marginBottom:'8px'}}>{faq.q}</p>
              <p style={{opacity:0.7, lineHeight:1.6, margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{borderTop:'1px solid rgba(0,0,0,0.08)', padding:'32px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px', fontSize:'0.85rem', opacity:0.6}}>
        <span>© 2026 GetLeaseLens. Not legal advice.</span>
        <div style={{display:'flex', gap:'24px'}}>
          <a href="/security">Security</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </main>
  );
}
