import { NextResponse } from 'next/server';

export const config = {
    matcher: ['/api/upload', '/api/analyze'],
};

export default async function middleware(request) {
    // Skip rate limiting if Upstash env vars are not configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return NextResponse.next();
    }

    try {
        const { Ratelimit } = await import('@upstash/ratelimit');
        const { Redis } = await import('@upstash/redis');
        const redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
        const ratelimit = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(5, '1 h'),
        });
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return new NextResponse('Too many requests', { status: 429 });
        }
    } catch (err) {
        console.warn('[rate-limit] skipped:', err.message);
    }

    return NextResponse.next();
}
