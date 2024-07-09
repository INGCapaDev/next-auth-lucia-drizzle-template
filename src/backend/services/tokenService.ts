import {
  RESET_PASSWORD_TTL,
  TOKEN_LENGTH,
  VERIFY_EMAIL_TTL,
} from '@/lib/constants/crypto';
import { generateRandomToken } from '@/lib/utils';
import { ResetTokensRepository } from '../repositories/resetTokensRepository';
import { VerifyTokensRepository } from '../repositories/verifyTokensRepository';

export class TokenService {
  private _verifyTokensRepository: VerifyTokensRepository;
  private _resetTokensRepository: ResetTokensRepository;

  constructor(
    verifyTokensRepository: VerifyTokensRepository,
    resetTokensRepository: ResetTokensRepository
  ) {
    this._verifyTokensRepository = verifyTokensRepository;
    this._resetTokensRepository = resetTokensRepository;
  }

  private async getToken(expiration: number) {
    const token = await generateRandomToken(TOKEN_LENGTH);
    if (!token) throw new Error('Failed to generate token');
    const tokenExpiresAt = new Date(Date.now() + expiration);
    return { token, tokenExpiresAt };
  }

  async createVerificationToken(userID: string) {
    const { token, tokenExpiresAt } = await this.getToken(VERIFY_EMAIL_TTL);
    await this._verifyTokensRepository.deleteTokensByUserID(userID);
    await this._verifyTokensRepository.createVerificationToken(
      userID,
      token,
      tokenExpiresAt
    );
    return token;
  }

  async createResetToken(userID: string) {
    const { token, tokenExpiresAt } = await this.getToken(RESET_PASSWORD_TTL);
    await this._resetTokensRepository.deleteTokensByUserID(userID);
    await this._resetTokensRepository.createResetToken(
      userID,
      token,
      tokenExpiresAt
    );
    return token;
  }

  async getVerificationToken(token: string) {
    return this._verifyTokensRepository.getVerificationToken(token);
  }

  async getResetToken(token: string) {
    return this._resetTokensRepository.getResetToken(token);
  }

  async deleteVerificationToken(token: string, trx?: any) {
    return this._verifyTokensRepository.deleteVerificationToken(token, trx);
  }

  async deleteResetToken(token: string, trx?: any) {
    return this._resetTokensRepository.deleteResetToken(token, trx);
  }
}
