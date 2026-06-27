import Link from 'next/link';
import { CheckCircle } from '../components/Icons';

export default function Success() {
  return (
    <main className="return-page">
      <CheckCircle className="success-icon" />
      <h1>Payment confirmed</h1>
      <p>Your report will arrive by email within 2 minutes. Your lease PDF has been permanently deleted.</p>
      <Link href="/">Back to home</Link>
    </main>
  );
}
