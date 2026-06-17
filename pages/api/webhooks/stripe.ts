import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'node:stream/consumers';
import { analyzeLease } from '../../../lib/claude';
import { sendReportReadyEmail } from '../../../lib/email';
import { generateAccessToken, sha256Hex } from '../../../lib/security';
import { getStripe } from '../../../lib/stripe';
import { getServiceSupabase } from '../../../lib/supabaseClient';
import { reserveMonthlyUsage } from '../../../lib/usage';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const stripe = getStripe();
  const signature = req.headers['stripe-signature'];
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(400).send('missing signature');

  const rawBody = await buffer(req);
  const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  if (event.type !== 'checkout.session.completed') return res.status(200).json({ received: true });

  const session = event.data.object;
  const purchaseId = session.client_reference_id;
  const email = session.customer_details?.email;
  if (!purchaseId || !email) return res.status(200).json({ ignored: true });

  const supabase = getServiceSupabase();
  const { data: purchase, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('id', purchaseId)
    .single();
  if (error || !purchase || purchase.status !== 'pending') return res.status(200).json({ idempotent: true });

  const { data: cached } = await supabase
    .from('analyses')
    .select('id')
    .eq('file_hash', purchase.file_hash)
    .maybeSingle();

  let analysisId = cached?.id;
  if (!analysisId) {
    const reserved = await reserveMonthlyUsage(0.02);
    if (!reserved) {
      await supabase.from('purchases').update({ status: 'error', error_message: 'monthly_cost_cap_exceeded' }).eq('id', purchaseId);
      return res.status(200).json({ capped: true });
    }

    const { data: signed } = await supabase.storage.from('lease-uploads').createSignedUrl(`${purchaseId}.pdf`, 60);
    const analysis = await analyzeLease(`Uploaded lease PDF URL for internal review: ${signed?.signedUrl ?? purchase.file_hash}`);
    const { data: inserted, error: insertError } = await supabase
      .from('analyses')
      .insert({ file_hash: purchase.file_hash, analysis_result: analysis })
      .select('id')
      .single();
    if (insertError) throw insertError;
    analysisId = inserted.id;
  }

  const token = generateAccessToken();
  await supabase
    .from('purchases')
    .update({
      status: 'paid',
      email,
      analysis_id: analysisId,
      access_token_hash: sha256Hex(token),
    })
    .eq('id', purchaseId);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getleaselens.com.au';
  const resultUrl = `${baseUrl}/result?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
  await sendReportReadyEmail(email, resultUrl);
  return res.status(200).json({ ok: true });
}
