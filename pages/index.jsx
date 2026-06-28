import Link from 'next/link';
import { UploadForm } from '../components/UploadForm';
import { SiteFooter } from '../components/layout/SiteFooter';

const reportAreas = [
  'Rent & Review',
  'Make Good',
  'Lease Term',
  'Personal Guarantee',
  'Permitted Use',
  'Outgoings',
];

const steps = [
  ['01', 'Upload Document', 'Securely drag and drop your commercial or retail lease PDF. Our system handles documents up to 150 pages with enterprise-grade encryption.'],
  ['02', 'AI Processing', 'Our specialized legal analysis engine scans for hidden clauses, unfavorable terms, and critical obligations tailored specifically to Australian commercial law.'],
  ['03', 'Receive Report', 'Download your structured PDF report within 120 seconds. Review red flags, a clear executive summary, and a simplified breakdown of your responsibilities.'],
];

export default function Home() {
  return (
    <main className="bg-white text-on-surface">
      <section id="analyse" className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-16 px-6 py-20 lg:grid-cols-12 lg:py-32">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div>
            <span className="rounded-full bg-surface-container-high px-3 py-1 font-label-md text-label-md tracking-wide text-on-surface-variant">Commercial &amp; Retail Leases</span>
          </div>
          <h1 className="font-display text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-on-surface sm:text-display">
            Understand your lease before you sign it.
          </h1>
          <p className="max-w-[540px] font-body-lg text-body-lg text-on-surface-variant">
            Upload your commercial lease PDF. Get a plain-English summary with red flags and key terms in under 2 minutes. $9 per analysis. No account required.
          </p>
          <div className="mt-4 flex flex-wrap gap-6">
            {[
              ['lock', 'Encrypted'],
              ['delete', 'Deleted after analysis'],
              ['shield', 'Never used to train AI'],
            ].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                <span className="font-label-md text-label-md">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <UploadForm />
        </div>
      </section>

      <section className="border-y border-[#e2e8f0] bg-white py-24">
        <div className="mx-auto max-w-[850px] px-6">
          <h2 className="mb-16 text-center font-headline-lg text-headline-lg text-on-surface">What your report covers</h2>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 border-t border-[#f1f5f9] pt-8 md:grid-cols-2">
            {reportAreas.map((area) => (
              <div key={area} className="flex items-center gap-4 border-b border-[#f1f5f9] py-4">
                <span className="h-2 w-2 rounded-full bg-primary-container" aria-hidden="true" />
                <span className="font-body-lg text-body-lg font-bold">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-24">
        <div className="mx-auto max-w-container-max px-6">
        <h2 className="mb-16 text-center font-headline-lg text-headline-lg text-on-surface">How it works</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map(([number, title, copy]) => (
              <article key={number} className="flex flex-col gap-4">
                <span className="font-display text-[64px] leading-none text-primary-container/20">{number}</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">{title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <div className="h-px w-24 bg-[#e2e8f0]" />
        <div className="max-w-[600px]">
          <h2 className="mb-4 font-headline-lg text-headline-lg text-on-surface">Privacy first, by design.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            We believe your legal data is yours alone. Our infrastructure is built to analyze, report, and purge. No permanent storage, no AI training on your documents, and no marketing emails.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/privacy" className="rounded border border-[#e2e8f0] bg-white px-6 py-3 font-body-md text-body-md font-medium transition-colors hover:bg-surface-bright">Read Privacy Policy</Link>
          <Link href="/result?mock=true&file=sample-commercial-lease.pdf" className="rounded border border-[#e2e8f0] bg-white px-6 py-3 font-body-md text-body-md font-medium transition-colors hover:bg-surface-bright">View Sample Report</Link>
        </div>
      </section>

      <SiteFooter className="bg-white" />
    </main>
  );
}
