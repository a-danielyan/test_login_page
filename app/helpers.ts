import jwt from 'jsonwebtoken';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export interface UserPayload {
    username: string | RequestCookie;
}

export function generateToken(payload: UserPayload): string {
    const secretKey = process.env.MY_SECRET_KEY;
    if (!secretKey) {
        throw new Error('Secret key is not defined.');
    }

    const token = jwt.sign(payload, secretKey, {
        expiresIn: '1h',
    });
    return token;
}