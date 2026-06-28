import Link from 'next/link';
import { useRouter } from 'next/router';

export function SiteFooter({ className = '' }) {
  const router = useRouter();
  const links = [
    ['/how-it-works', 'How It Works'],
    ['/security', 'Security'],
    ['/privacy', 'Privacy'],
    ['/contact', 'Contact'],
  ];

  return (
    <footer className={`border-t border-outline-variant bg-surface-container-low ${className}`}>
      <div className="mx-auto flex max-w-container-max flex-wrap items-center justify-center gap-x-2 px-6 py-8 text-center font-label-md text-label-md text-on-surface-variant">
        <span>GetLeaseLens © 2026</span><span>|</span>
        {links.map(([href, label]) => (
          <span key={href} className="contents">
            <Link href={href} aria-current={router.pathname === href ? 'page' : undefined} className={router.pathname === href ? 'font-semibold text-primary' : 'transition-colors hover:text-primary'}>{label}</Link>
            <span>|</span>
          </span>
        ))}
        <span>Australian-made.</span>
      </div>
    </footer>
  );
}
