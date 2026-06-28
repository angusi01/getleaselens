import Link from 'next/link';
import { SiteFooter } from '../components/layout/SiteFooter';

const steps = [
  {
    number: '01',
    icon: 'upload_file',
    title: 'Upload your lease PDF',
    description:
      'Drag and drop or browse for your commercial or retail lease PDF. Max 15MB. Your file is encrypted in transit using TLS 1.3.',
    detail: (
      <div className="flex flex-wrap gap-2 pt-2">
        {['Commercial', 'Retail', 'Industrial'].map((type) => (
          <span
            key={type}
            className="rounded-sm bg-[#eef4fc] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#464555]"
          >
            {type}
          </span>
        ))}
      </div>
    ),
  },
  {
    number: '02',
    icon: 'neurology',
    title: 'AI analysis runs',
    description:
      'Our system checks the lease against known commercial lease standards. It flags high-risk clauses, unusual terms, and your key obligations. Analysis takes under 2 minutes.',
    detail: (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-[#3525cd]">
        {['Clause Detection', 'Risk Assessment'].map((label) => (
          <span key={label} className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            {label}
          </span>
        ))}
      </div>
    ),
  },
  {
    number: '03',
    icon: 'description',
    title: 'Get your plain-English report',
    description:
      'You receive a structured report covering 6 key areas: Rent & Review, Make Good, Lease Term, Personal Guarantee, Permitted Use, and Outgoings. Download it to share with your lawyer.',
    detail: (
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {['Rent & Review', 'Make Good', 'Lease Term', 'Personal Guarantee'].map((area) => (
          <div key={area} className="flex items-center gap-2 text-xs text-[#464555]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3525cd]" />
            {area}
          </div>
        ))}
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <>
    <main className="min-h-screen bg-[#f6f9ff] pb-24 pt-16 font-['DM_Sans',sans-serif] text-[#161c22]">
      <section className="mx-auto mb-16 max-w-4xl px-4 text-center md:px-10">
        <h1 className="mb-4 text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-[#161c22] md:text-5xl">
          How GetLeaseLens works
        </h1>
        <p className="m-0 font-['Inter',sans-serif] text-base leading-6 text-[#464555]">
          Upload your lease, get your report. No account needed.
        </p>
      </section>

      <section className="mx-auto max-w-[850px] space-y-8 px-4 md:px-10">
        {steps.map((step) => (
          <article
            key={step.number}
            className="group relative flex flex-col items-start gap-8 overflow-hidden rounded-lg border border-[#e2e8f0] bg-white p-8 transition-colors duration-300 hover:border-[#3525cd] md:flex-row md:p-12"
          >
            <span className="shrink-0 text-[5rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_#e2e8f0] transition-colors group-hover:text-[#4f46e51a]">
              {step.number}
            </span>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4f46e5] transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </span>
                <h2 className="m-0 text-2xl font-semibold leading-9 tracking-[-0.01em] text-[#161c22] md:text-[30px]">
                  {step.title}
                </h2>
              </div>
              <p className="m-0 font-['Inter',sans-serif] text-sm leading-5 text-[#464555]">
                {step.description}
              </p>
              {step.detail}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-[850px] px-4 md:px-10">
        <div className="rounded-2xl bg-[#3525cd] p-8 text-center text-white shadow-xl shadow-[#3525cd1a] md:p-12">
          <h2 className="m-0 mb-8 text-2xl font-semibold leading-9 tracking-[-0.01em] text-white md:text-[30px]">
            Ready to understand your lease?
          </h2>
          <Link
            href="/#analyse"
            className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[#4f46e5] px-10 py-4 text-xl font-semibold leading-7 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-90 active:scale-95"
          >
            Analyse Lease
          </Link>
          <p className="mb-0 mt-6 font-['Inter',sans-serif] text-xs font-medium leading-4 tracking-[0.02em] text-[#dad7ff] opacity-90">
            5-pack available for $35. No account required.
          </p>
        </div>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}
