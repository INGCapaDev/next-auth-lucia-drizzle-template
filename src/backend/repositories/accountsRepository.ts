import { TursoDB, db } from '@/database/db';
import { accountsTable } from '@/database/schema';
import { EmailAccount, GoogleAccount } from '@/database/types';

import { and, eq } from 'drizzle-orm';
import { IAccountsRepository } from '.';

export class AccountsRepository implements IAccountsRepository {
  private db: TursoDB = db;
  private schema = accountsTable;

  async createAccount(
    userID: string,
    password: string,
    accountType: EmailAccount,
    salt: string
  ) {
    const [account] = await this.db
      .insert(this.schema)
      .values({
        userID,
        password,
        salt,
        accountType,
      })
      .returning();

    return account;
  }

  async createAccountViaGoogle(
    userID: string,
    googleID: string,
    accountType: GoogleAccount
  ) {
    await this.db
      .insert(this.schema)
      .values({
        userID,
        googleID,
        accountType,
      })
      .execute();
  }

  async getAccountByUserID(userID: string) {
    return await this.db.query.accountsTable.findFirst({
      where: eq(this.schema.userID, userID),
    });
  }

  async getPasswordAccountByUserID(userID: string) {
    return await this.db.query.accountsTable.findFirst({
      where: and(
        eq(this.schema.userID, userID),
        eq(this.schema.accountType, 'email')
      ),
    });
  }

  async getAccountByGoogleID(googleID: string) {
    return await this.db.query.accountsTable.findFirst({
      where: eq(this.schema.googleID, googleID),
    });
  }

  async updatePassword(
    userID: string,
    password: string,
    salt: string,
    trx = this.db
  ) {
    await trx
      .update(this.schema)
      .set({ password, salt })
      .where(
        and(
          eq(this.schema.userID, userID),
          eq(this.schema.accountType, 'email')
        )
      )
      .execute();
  }
}
