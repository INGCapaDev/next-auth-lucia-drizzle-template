import { db, TursoDB } from '@/database/db';
import { verificationTokensTable } from '@/database/schema';
import { SelectVerificationToken } from '@/database/types';
import { eq } from 'drizzle-orm';
import { IVerifyTokenRepository } from '.';

export class VerifyTokensRepository implements IVerifyTokenRepository {
  private db: TursoDB = db;
  private schema = verificationTokensTable;

  async createVerificationToken(
    userID: string,
    token: string,
    tokenExpiresAt: Date
  ) {
    const [verificationToken] = await this.db
      .insert(this.schema)
      .values({ userID, token, tokenExpiresAt })
      .returning();
    return verificationToken;
  }

  async getVerificationToken(
    token: string
  ): Promise<SelectVerificationToken | undefined> {
    return await this.db.query.verificationTokensTable.findFirst({
      where: eq(this.schema.token, token),
    });
  }

  async deleteVerificationToken(token: string, trx: TursoDB = this.db) {
    await trx.delete(this.schema).where(eq(this.schema.token, token));
  }

  async deleteTokensByUserID(userID: string) {
    await this.db.delete(this.schema).where(eq(this.schema.userID, userID));
  }
}
