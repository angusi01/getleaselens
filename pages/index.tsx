import { UploadForm } from '../components/UploadForm';

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1>Lease review signals before you sign.</h1>
          <p>Upload a commercial lease PDF, pay once, and get a concise AI-assisted summary with practical red flags.</p>
        </div>
        <UploadForm />
      </section>
    </main>
  );
}
