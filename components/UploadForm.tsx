import { FormEvent, useState } from 'react';
import posthog from 'posthog-js';

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!file) return;
    setStatus('Uploading...');
    const form = new FormData();
    form.append('file', file);
    const upload = await fetch('/api/upload', { method: 'POST', body: form });
    if (!upload.ok) {
      setStatus('Upload failed.');
      return;
    }
    posthog.capture('lease_uploaded', { product: 'getleaselens' });
    const { purchaseId } = await upload.json();
    const checkout = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ purchaseId, mode: 'payment' }),
    });
    const { url } = await checkout.json();
    posthog.capture('checkout_started', { product: 'getleaselens', mode: 'payment' });
    window.location.href = url;
  }

  return (
    <form className="upload-panel" onSubmit={submit}>
      <label>
        Lease PDF
        <input type="file" accept="application/pdf" onChange={(event) => setFile(event.target.files?.[0] ?? null)} required />
      </label>
      <button type="submit">Upload and pay $7</button>
      {status && <p>{status}</p>}
    </form>
  );
}
