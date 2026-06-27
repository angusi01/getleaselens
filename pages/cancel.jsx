import Link from 'next/link';
import { XCircle } from '../components/Icons';

export default function Cancel() {
  return (
    <main className="return-page">
      <XCircle className="cancel-icon" />
      <h1>Payment cancelled</h1>
      <p>No charge was made.</p>
      <Link href="/">Try again</Link>
    </main>
  );
}
