import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>404 — Page not found</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link className="button-link" href="/">Go home</Link>
      </section>
    </main>
  );
}
