import { db } from '@/database/db';
import { accountsTable } from '@/database/schema';
import { EmailAccount, GoogleAccount } from '@/database/types';

import { and, eq } from 'drizzle-orm';

export async function createAccount(
  userID: string,
  password: string,
  accountType: EmailAccount,
  salt: string
) {
  const [account] = await db
    .insert(accountsTable)
    .values({
      userID,
      password,
      salt,
      accountType,
    })
    .returning();

  return account;
}

export async function createAccountViaGoogle(
  userID: string,
  googleID: string,
  accountType: GoogleAccount
) {
  await db
    .insert(accountsTable)
    .values({
      userID,
      googleID,
      accountType,
    })
    .execute();
}

export async function getAccountByUserID(userID: string) {
  return await db.query.accountsTable.findFirst({
    where: eq(accountsTable.userID, userID),
  });
}

export async function getPasswordAccountByUserID(userID: string) {
  return await db.query.accountsTable.findFirst({
    where: and(
      eq(accountsTable.userID, userID),
      eq(accountsTable.accountType, 'email')
    ),
  });
}

export async function getAccountByGoogleID(googleID: string) {
  return await db.query.accountsTable.findFirst({
    where: eq(accountsTable.googleID, googleID),
  });
}

export async function updatePassword(
  userID: string,
  password: string,
  salt: string,
  trx = db
) {
  await trx
    .update(accountsTable)
    .set({ password, salt })
    .where(
      and(
        eq(accountsTable.userID, userID),
        eq(accountsTable.accountType, 'email')
      )
    )
    .execute();
}
