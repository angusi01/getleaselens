import { z } from 'zod';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { getStripe } from '../../lib/stripe';
const schema = z.object({
    purchaseId: z.string().uuid(),
    product: z.enum(['single', 'five_pack']).default('single'),
});
const priceEnvByProduct = {
    single: 'STRIPE_SINGLE_PRICE_ID',
    five_pack: 'STRIPE_FIVE_PACK_PRICE_ID',
};
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: { code: 'METHOD_NOT_ALLOWED', message: 'Method not allowed.' } });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: { code: 'INVALID_REQUEST', message: 'Invalid checkout request.' } });
    if (parsed.data.product === 'five_pack') {
        const supabase = createPagesServerClient({ req, res }, { options: { db: { schema: 'getleaselens' } } });
        const { data: { session } } = await supabase.auth.getSession();
        if (!session)
            return res.status(401).json({ error: { code: 'ACCOUNT_REQUIRED', message: 'Create an account or log in to buy the 5-pack.' } });
    }
    const stripe = getStripe();
    const origin = req.headers.origin ?? 'https://getleaselens.com.au';
    const price = process.env[priceEnvByProduct[parsed.data.product]];
    if (!price)
        return res.status(500).json({ error: { code: 'STRIPE_PRICE_NOT_CONFIGURED', message: 'Stripe price is not configured.' } });
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ price, quantity: 1 }],
        client_reference_id: parsed.data.purchaseId,
        metadata: { product: parsed.data.product },
        success_url: `${origin}/confirmation`,
        cancel_url: `${origin}/`,
    });
    return res.status(200).json({ data: { url: session.url } });
}
