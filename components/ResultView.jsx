const severityStyles = {
  high: {
    dot: 'bg-[#ba1a1a]',
    panel: 'border-[#ba1a1a] bg-[#ffdad6]/35 text-[#93000a]',
    icon: 'error',
    label: 'High priority',
  },
  medium: {
    dot: 'bg-[#f59e0b]',
    panel: 'border-[#f59e0b] bg-[rgba(245,158,11,0.08)] text-[#9a5d00]',
    icon: 'warning',
    label: 'Review recommended',
  },
  low: {
    dot: 'bg-[#4f46e5]',
    panel: 'border-[#4f46e5] bg-[#4f46e5]/[0.06] text-[#3525cd]',
    icon: 'info',
    label: 'Worth noting',
  },
};

function MaterialIcon({ children, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined shrink-0 leading-none ${className}`}
    >
      {children}
    </span>
  );
}

export function ResultView({ result }) {
  const report = result ?? {};
  const summary = typeof report.summary === 'string' ? report.summary.trim() : '';
  const flags = Array.isArray(report.red_flags)
    ? report.red_flags.filter((flag) => flag && typeof flag === 'object')
    : [];
  const fileName =
    (typeof report.fileName === 'string' && report.fileName.trim()) ||
    (typeof report.filename === 'string' && report.filename.trim()) ||
    'lease-analysis.pdf';
  const reportName = fileName.replace(/\.pdf$/i, '') + '-report.pdf';
  const analysedAt =
    typeof report.analysedAt === 'string' && report.analysedAt.trim()
      ? report.analysedAt
      : 'Analysis complete';

  const printReport = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-[#f6f9ff] text-[#161c22]">
      <div className="bg-[#4f46e5] px-4 py-3 text-white sm:px-6">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="!m-0 flex items-center gap-2 !text-sm !leading-5 !text-white">
            <MaterialIcon className="text-[18px]">check_circle</MaterialIcon>
            <span>Analysis complete — your report is ready.</span>
          </p>
          <button
            type="button"
            onClick={printReport}
            className="!m-0 inline-flex min-h-0 items-center justify-center gap-2 self-start rounded bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 sm:self-auto"
          >
            <MaterialIcon className="text-[16px]">download</MaterialIcon>
            Download Report
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:gap-12 lg:py-12">
        <div className="min-w-0 flex-1 space-y-8 lg:w-2/3">
          <header>
            <h1 className="!m-0 font-['DM_Sans',sans-serif] !text-3xl !font-semibold !leading-9 !tracking-[-0.01em] !text-[#0f172a]">
              Lease Analysis Report
            </h1>
            <p className="!mb-0 !mt-2 flex flex-wrap items-center gap-2 !text-sm !leading-5 !text-[#464555]">
              <MaterialIcon className="text-[16px]">description</MaterialIcon>
              <span className="break-all">{fileName}</span>
              <span aria-hidden="true">·</span>
              <span>{analysedAt}</span>
              <span aria-hidden="true">·</span>
              <span>
                {flags.length} {flags.length === 1 ? 'issue' : 'issues'} reviewed
              </span>
            </p>
          </header>

          <div className="space-y-6">
            <article className="rounded border border-[#c7c4d8] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
              <div className="flex items-start gap-4">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4f46e5]" />
                <div className="min-w-0 space-y-3">
                  <h2 className="!m-0 font-['DM_Sans',sans-serif] !text-xl !font-semibold !leading-7 !text-[#0f172a]">
                    Plain-English summary
                  </h2>
                  <p className="!m-0 !text-base !leading-6 !text-[#161c22]">
                    {summary || 'No summary was available for this analysis.'}
                  </p>
                </div>
              </div>
            </article>

            {flags.map((flag, index) => {
              const severity = severityStyles[flag.severity] ? flag.severity : 'low';
              const style = severityStyles[severity];
              const title =
                typeof flag.title === 'string' && flag.title.trim()
                  ? flag.title
                  : `Lease issue ${index + 1}`;
              const description =
                typeof flag.description === 'string' && flag.description.trim()
                  ? flag.description
                  : 'No further detail was provided for this issue.';

              return (
                <article
                  key={`${title}-${index}`}
                  className="rounded border border-[#c7c4d8] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300"
                >
                  <div className="flex items-start gap-4">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} />
                    <div className="min-w-0 flex-1 space-y-3">
                      <h2 className="!m-0 font-['DM_Sans',sans-serif] !text-xl !font-semibold !leading-7 !text-[#0f172a]">
                        {title}
                      </h2>
                      <p className="!m-0 !text-base !leading-6 !text-[#161c22]">{description}</p>
                      <div
                        className={`flex items-start gap-3 rounded border-l-4 p-4 ${style.panel}`}
                      >
                        <MaterialIcon className="mt-0.5 text-[20px]">{style.icon}</MaterialIcon>
                        <p className="!m-0 !text-sm !font-medium !leading-5 !text-inherit">
                          {style.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {!flags.length && (
              <article className="rounded border border-[#c7c4d8] bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4f46e5]" />
                  <div className="space-y-2">
                    <h2 className="!m-0 font-['DM_Sans',sans-serif] !text-xl !font-semibold !leading-7 !text-[#0f172a]">
                      No major red flags detected
                    </h2>
                    <p className="!m-0 !text-base !leading-6 !text-[#161c22]">
                      No major red flags were detected in the extracted lease text.
                    </p>
                  </div>
                </div>
              </article>
            )}
          </div>

          <section className="rounded border-2 border-[#4f46e5] bg-[#4f46e5]/[0.05] p-6 sm:p-8">
            <h2 className="!m-0 font-['DM_Sans',sans-serif] !text-xl !font-semibold !leading-7 !text-[#0f172a]">
              Questions to ask your lawyer
            </h2>
            <ul className="!mb-0 !mt-6 space-y-4 !pl-0 !text-base !leading-6 !text-[#161c22]">
              {(flags.length
                ? flags.slice(0, 4).map((flag, index) => {
                    const title =
                      typeof flag.title === 'string' && flag.title.trim()
                        ? flag.title
                        : `issue ${index + 1}`;
                    return `What changes or protections should I request for the ${title.toLowerCase()} clause?`;
                  })
                : [
                    'Are the rent review terms reasonable?',
                    'Are my repair and make-good obligations clearly limited?',
                    'Do any guarantees or special conditions need to be negotiated?',
                  ]
              ).map((question) => (
                <li key={question} className="flex items-start gap-3 !text-[#161c22]">
                  <span className="font-bold text-[#4f46e5]">•</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="w-full lg:w-1/3 lg:max-w-[430px]">
          <div className="sticky top-[100px] rounded-lg border border-[#c7c4d8] bg-white p-6 shadow-sm">
            <h2 className="!m-0 font-['DM_Sans',sans-serif] !text-xl !font-semibold !leading-7 !text-[#0f172a]">
              Your Report
            </h2>

            <div className="mb-8 mt-6 flex items-center gap-4 rounded bg-[#e8eef6] p-4">
              <div className="rounded bg-white p-2 shadow-sm">
                <MaterialIcon className="text-[32px] text-[#4f46e5]">picture_as_pdf</MaterialIcon>
              </div>
              <div className="min-w-0">
                <p className="!m-0 truncate !text-xs !font-medium !leading-4 !text-[#0f172a]">
                  {reportName}
                </p>
                <p className="!m-0 !mt-1 !text-xs !leading-4 !text-[#464555]">PDF report</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={printReport}
                className="!m-0 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4f46e5] px-6 py-4 font-['DM_Sans',sans-serif] text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MaterialIcon>download</MaterialIcon>
                Download PDF
              </button>
              <a
                href="/"
                className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full border border-[#c7c4d8] px-6 py-4 text-center font-['DM_Sans',sans-serif] text-base font-semibold text-[#0f172a] transition-colors hover:bg-[#e8eef6]"
              >
                Analyse another lease
              </a>
            </div>

            <div className="mt-8 border-t border-[#c7c4d8] pt-6 text-center">
              <p className="!m-0 !text-xs !leading-4 !text-[#464555]">
                Your original PDF was deleted from our servers immediately after analysis.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
