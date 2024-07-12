import { db, TursoDB } from '@/database/db';
import { resetTokensTable } from '@/database/schema';
import { SelectResetToken } from '@/database/types';
import { eq } from 'drizzle-orm';

export async function createResetToken(
  userID: string,
  token: string,
  tokenExpiresAt: Date
) {
  const [resetToken] = await db
    .insert(resetTokensTable)
    .values({ userID, token, tokenExpiresAt })
    .returning();
  return resetToken;
}

export async function getResetToken(
  token: string
): Promise<SelectResetToken | undefined> {
  return await db.query.resetTokensTable.findFirst({
    where: eq(resetTokensTable.token, token),
  });
}

export async function deleteResetToken(token: string, trx: TursoDB = db) {
  await trx.delete(resetTokensTable).where(eq(resetTokensTable.token, token));
}

export async function deleteResetTokensByUserID(userID: string) {
  await db.delete(resetTokensTable).where(eq(resetTokensTable.userID, userID));
}
