import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getStripe } from '../../lib/stripe';

const schema = z.object({
  purchaseId: z.string().uuid(),
  mode: z.enum(['payment', 'subscription']).default('payment'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_request' });

  const stripe = getStripe();
  const origin = req.headers.origin ?? 'https://getleaselens.com.au';
  const price = parsed.data.mode === 'subscription'
    ? process.env.STRIPE_LEASELENS_SUBSCRIPTION_PRICE_ID
    : process.env.STRIPE_LEASELENS_ONETIME_PRICE_ID;
  if (!price) return res.status(500).json({ error: 'stripe_price_not_configured' });

  const session = await stripe.checkout.sessions.create({
    mode: parsed.data.mode,
    line_items: [{ price, quantity: 1 }],
    client_reference_id: parsed.data.purchaseId,
    success_url: `${origin}/result?pending=1`,
    cancel_url: `${origin}/`,
  });

  return res.status(200).json({ url: session.url });
}
