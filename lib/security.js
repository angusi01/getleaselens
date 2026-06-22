import crypto from 'node:crypto';
export function sha256Hex(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}
export function timingSafeEqualHex(expected, actual) {
    if (!expected || expected.length !== actual.length)
        return false;
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(actual, 'hex'));
}
export function generateAccessToken() {
    return crypto.randomUUID();
}
