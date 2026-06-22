import Link from 'next/link';

export function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">GetLeaseLens</Link>
        <nav>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
      {children}
    </>
  );
}
