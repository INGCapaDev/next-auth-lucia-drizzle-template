import { db, TursoDB } from '@/database/db';
import { resetTokensTable } from '@/database/schema';
import { SelectResetToken } from '@/database/types';
import { eq } from 'drizzle-orm';
import { IResetTokenRepository } from '.';

export class ResetTokensRepository implements IResetTokenRepository {
  private db: TursoDB = db;
  private schema = resetTokensTable;

  async createResetToken(userID: string, token: string, tokenExpiresAt: Date) {
    const [resetToken] = await this.db
      .insert(this.schema)
      .values({ userID, token, tokenExpiresAt })
      .returning();
    return resetToken;
  }

  async getResetToken(token: string): Promise<SelectResetToken | undefined> {
    return await this.db.query.resetTokensTable.findFirst({
      where: eq(this.schema.token, token),
    });
  }

  async deleteResetToken(token: string, trx: TursoDB = this.db) {
    await trx.delete(this.schema).where(eq(this.schema.token, token));
  }

  async deleteTokensByUserID(userID: string) {
    await this.db.delete(this.schema).where(eq(this.schema.userID, userID));
  }
}
