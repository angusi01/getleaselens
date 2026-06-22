import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default function Dashboard({ email, creditBalance }) {
  return (
    <main className="page">
      <section className="dashboard-heading">
        <div>
          <h1>Dashboard</h1>
          <p>{email}</p>
        </div>
        <Link className="button-link" href="/">Analyze a lease</Link>
      </section>
      <section className="stat-grid">
        <article>
          <strong>{creditBalance}</strong>
          <span>Credit balance</span>
        </article>
        <article>
          <strong>$35</strong>
          <span>5-pack price</span>
        </article>
        <article>
          <strong>$9</strong>
          <span>Single report</span>
        </article>
      </section>
      <section className="result-panel">
        <h2>Account-required packs</h2>
        <p>Buy the 5-pack from the upload flow while logged in, then return here to track available credits.</p>
      </section>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const supabase = createPagesServerClient(ctx, { options: { db: { schema: 'getleaselens' } } });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { redirect: { destination: '/login', permanent: false } };

  let creditBalance = 0;
  const { data } = await supabase
    .from('credit_balances')
    .select('balance')
    .eq('user_id', session.user.id)
    .maybeSingle();
  if (data?.balance !== undefined && data?.balance !== null) {
    creditBalance = Number(data.balance);
  }

  return {
    props: {
      initialSession: session,
      email: session.user.email ?? '',
      creditBalance,
    },
  };
}
