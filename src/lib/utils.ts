import { clsx, type ClassValue } from 'clsx';
import crypto from 'crypto';
import { twMerge } from 'tailwind-merge';
import { ITERATIONS } from './constants/crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseSQLiteBoolean = (
  value: 0 | 1 | true | false | null | string
) => {
  if (value == 0 || value == false || !value) return false;
  return true;
};

export const parseSQLiteDate = (value: string | Date) => {
  if (typeof value === 'string') return new Date(Number(value));
  return value;
};

export async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      'sha512',
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      }
    );
  });
}

export async function generateRandomToken(length: number) {
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buffer) => {
      if (err !== null) {
        return reject(err);
      }
      resolve(buffer);
    });
  });
  return buffer.toString('hex');
}

export function getDevOnlyErrorMsg(msg: string) {
  return `DEV ONLY ENABLED - ${msg}`;
}
