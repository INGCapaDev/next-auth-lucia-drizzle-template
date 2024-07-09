import crypto from 'crypto';

const ALGORITHM = 'base64';
const BYTES = 128;
export const ITERATIONS = 10000;
export const getSalt = () => crypto.randomBytes(BYTES).toString(ALGORITHM);

export const TOKEN_LENGTH = 32 as const;
export const RESET_PASSWORD_TTL = 1000 * 60 * 15; // 15 minutes
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days
