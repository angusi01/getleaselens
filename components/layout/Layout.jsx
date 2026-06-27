import Link from 'next/link';

export function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">GetLeaseLens</Link>
        <nav>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/security">Security</Link>
          <a href="/#pricing">Pricing</a>
          <a className="nav-cta" href="/#analyse">Analyse a Lease</a>
        </nav>
      </header>
      {children}
    </>
  );
}
