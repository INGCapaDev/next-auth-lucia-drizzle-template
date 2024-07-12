import {
  RESET_PASSWORD_TTL,
  TOKEN_LENGTH,
  VERIFY_EMAIL_TTL,
} from '@/lib/constants/crypto';
import { generateRandomToken } from '@/lib/utils';
import {
  createResetToken,
  deleteResetToken,
  deleteResetTokensByUserID,
  getResetToken,
} from '../repositories/resetTokensRepository';
import {
  createVerificationToken,
  deleteVerificationToken,
  deleteVerificationTokensByUserID,
  getVerificationToken,
} from '../repositories/verifyTokensRepository';

async function getToken(expiration: number) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  if (!token) throw new Error('Failed to generate token');
  const tokenExpiresAt = new Date(Date.now() + expiration);
  return { token, tokenExpiresAt };
}

export async function createVerificationTokenService(userID: string) {
  const { token, tokenExpiresAt } = await getToken(VERIFY_EMAIL_TTL);
  await deleteVerificationTokensByUserID(userID);
  await createVerificationToken(userID, token, tokenExpiresAt);
  return token;
}

export async function createResetTokenService(userID: string) {
  const { token, tokenExpiresAt } = await getToken(RESET_PASSWORD_TTL);
  await deleteResetTokensByUserID(userID);
  await createResetToken(userID, token, tokenExpiresAt);
  return token;
}

export async function getVerificationTokenService(token: string) {
  return getVerificationToken(token);
}

export async function getResetTokenService(token: string) {
  return getResetToken(token);
}

export async function deleteVerificationTokenService(token: string, trx?: any) {
  return deleteVerificationToken(token, trx);
}

export async function deleteResetTokenService(token: string, trx?: any) {
  return deleteResetToken(token, trx);
}
