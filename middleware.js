import { NextResponse } from 'next/server';

export const config = {
    matcher: ['/api/upload', '/api/analyze'],
};

export default async function middleware(request) {
    try {
        const { getUploadRatelimit } = await import('./lib/rate-limit');
        const ratelimit = getUploadRatelimit();
        if (!ratelimit) return NextResponse.next();
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
        const { success } = await ratelimit.limit(ip);
        if (!success)
            return new NextResponse('Too many requests', { status: 429 });
    } catch (err) {
        // Rate limiting unavailable - allow request through
        console.warn('Rate limit check failed, allowing request:', err.message);
    }
    return NextResponse.next();
}
