import { db, TursoDB } from '@/database/db';
import { verificationTokensTable } from '@/database/schema';
import { SelectVerificationToken } from '@/database/types';
import { eq } from 'drizzle-orm';

export async function createVerificationToken(
  userID: string,
  token: string,
  tokenExpiresAt: Date
) {
  const [verificationToken] = await db
    .insert(verificationTokensTable)
    .values({ userID, token, tokenExpiresAt })
    .returning();
  return verificationToken;
}

export async function getVerificationToken(
  token: string
): Promise<SelectVerificationToken | undefined> {
  return await db.query.verificationTokensTable.findFirst({
    where: eq(verificationTokensTable.token, token),
  });
}

export async function deleteVerificationToken(
  token: string,
  trx: TursoDB = db
) {
  await trx
    .delete(verificationTokensTable)
    .where(eq(verificationTokensTable.token, token));
}

export async function deleteVerificationTokensByUserID(userID: string) {
  await db
    .delete(verificationTokensTable)
    .where(eq(verificationTokensTable.userID, userID));
}
