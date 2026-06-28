import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function Layout({ children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isReport = router.pathname === '/result';
  const pageTitle = {
    '/': 'GetLeaseLens — Instant Commercial Lease Analysis',
    '/result': 'Lease Analysis Report | GetLeaseLens',
    '/how-it-works': 'How It Works | GetLeaseLens',
    '/security': 'Security & Privacy | GetLeaseLens',
  }[router.pathname] || 'GetLeaseLens';

  const links = [
    ['/how-it-works', 'How It Works'],
    ['/security', 'Security'],
    ['/contact', 'Contact'],
  ];

  return (
    <div className="stitch-shell">
      <Head><title>{pageTitle}</title></Head>
      <header className={`${isReport ? 'fixed' : 'sticky'} inset-x-0 top-0 z-50 border-b border-outline-variant/70 bg-white`}>
        <nav className="mx-auto flex h-16 w-full max-w-container-max items-center justify-between px-4 md:px-10 lg:px-6" aria-label="Primary navigation">
          <Link href="/" className="font-display text-headline-md font-semibold text-on-secondary-fixed">
            GetLeaseLens
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {links.map(([href, label]) => {
              const active = router.pathname === href || (router.pathname === '/' && href === '/how-it-works');
              return (
                <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`font-body-lg text-body-lg transition-colors ${active ? 'border-b-2 border-primary-container pb-1 font-semibold text-primary' : 'text-secondary hover:text-primary'}`}>
                  {label}
                </Link>
              );
            })}
            <Link href="/#analyse" className="rounded-full bg-primary-container px-6 py-2 font-body-md text-body-md font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]">
              Analyse Lease
            </Link>
          </div>
          <button type="button" className="!m-0 !bg-transparent !p-2 text-on-surface md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </nav>
        {menuOpen && (
          <nav className="flex flex-col border-t border-outline-variant/50 bg-white px-4 py-3 md:hidden" aria-label="Mobile navigation">
            {links.map(([href, label]) => <Link key={href} href={href} className="py-3 font-body-md text-on-surface" onClick={() => setMenuOpen(false)}>{label}</Link>)}
            <Link href="/#analyse" className="mt-2 rounded-full bg-primary-container px-5 py-3 text-center font-body-md font-semibold text-white" onClick={() => setMenuOpen(false)}>Analyse Lease</Link>
          </nav>
        )}
      </header>
      {children}
    </div>
  );
}
