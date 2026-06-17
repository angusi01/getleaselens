export async function sendReportReadyEmail(email: string, resultUrl: string) {
  if (!process.env.BREVO_API_KEY) throw new Error('BREVO_API_KEY is not configured');
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_FROM_EMAIL ?? 'reports@getleaselens.com.au', name: 'GetLeaseLens' },
      to: [{ email }],
      subject: 'Your lease report is ready',
      htmlContent: `<p>Your lease report is ready.</p><p><a href="${resultUrl}">Open your report</a></p>`,
    }),
  });
  if (!response.ok) throw new Error('Brevo email failed');
}
