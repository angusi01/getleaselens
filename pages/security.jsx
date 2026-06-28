const securityItems = [
  {
    icon: 'lock',
    title: 'Encrypted in transit and at rest',
    description:
      'Your PDF is encrypted using TLS 1.3 during upload and AES-256 at rest. The same standard used by banks.',
  },
  {
    icon: 'delete',
    title: 'Your PDF is deleted immediately after analysis',
    description:
      'Once your report is generated, your original lease PDF is permanently deleted from our servers. We do not store it.',
  },
  {
    icon: 'shield',
    title: 'Never used to train AI models',
    description:
      'Your lease contents are never used to improve or train any AI model. Your document is yours alone.',
  },
  {
    icon: 'credit_card',
    title: 'Payments handled by Stripe',
    description:
      'We never see or store your payment details. All payments are processed securely by Stripe.',
  },
];

export default function Security() {
  return (
    <>
    <main className="min-h-[calc(100vh-200px)] bg-white px-4 py-24 font-['DM_Sans',sans-serif] text-[#161c22] md:px-10">
      <div className="mx-auto max-w-[850px]">
        <section className="mb-16">
          <h1 className="mb-4 text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-[#161c22] md:text-5xl">
            Security &amp; Privacy
          </h1>
          <p className="m-0 max-w-2xl font-['Inter',sans-serif] text-base leading-6 text-[#464555]">
            Your lease is sensitive. Here is exactly how we handle it.
          </p>
        </section>

        <section className="overflow-hidden rounded-lg border border-[#c7c4d8] bg-white">
          {securityItems.map((item, index) => (
            <article
              key={item.title}
              className={`group flex flex-col items-start gap-6 p-8 transition-colors hover:bg-[#eef4fc4d] md:flex-row ${
                index < securityItems.length - 1 ? 'border-b border-[#e2e8f0]' : ''
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#e2dfff] text-[#3525cd] transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
              </span>
              <div>
                <h2 className="m-0 mb-2 text-xl font-semibold leading-7 tracking-normal text-[#161c22]">
                  {item.title}
                </h2>
                <p className="m-0 font-['Inter',sans-serif] text-sm leading-5 text-[#464555]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <aside className="mt-12 rounded border border-[#c7c4d880] bg-[#eef4fc] p-8 text-center">
          <p className="m-0 font-['Inter',sans-serif] text-sm leading-5 text-[#464555]">
            Questions about security? Contact us at{' '}
            <a
              className="font-medium text-[#4f46e5] hover:underline"
              href="mailto:privacy@getleaselens.com.au"
            >
              privacy@getleaselens.com.au
            </a>
          </p>
        </aside>
      </div>
    </main>
    <SiteFooter />
    </>
  );
}
import { SiteFooter } from '../components/layout/SiteFooter';
