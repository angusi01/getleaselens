import { NextResponse } from 'next/server';
import { getUploadRatelimit } from './lib/rate-limit';
export const config = {
    matcher: ['/api/upload', '/api/analyze'],
};
export default async function middleware(request) {
    const ratelimit = getUploadRatelimit();
    if (!ratelimit)
        return NextResponse.next();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    if (!success)
        return new Response('Too many requests', { status: 429 });
    return NextResponse.next();
}
