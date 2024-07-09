import { TursoDB, db } from '@/database/db';
import { usersTable } from '@/database/schema';
import { UpdateUser } from '@/database/types';
import { eq } from 'drizzle-orm';
import { IUsersRepository } from '.';

export class UsersRepository implements IUsersRepository {
  private db: TursoDB = db;
  private schema = usersTable;

  async getUser(userID: string) {
    return await this.db.query.usersTable.findFirst({
      where: eq(this.schema.id, userID),
    });
  }

  async createUser(email: string) {
    const [user] = await this.db
      .insert(this.schema)
      .values({
        email,
      })
      .returning();
    return user;
  }

  async deleteUser(userID: string) {
    await this.db.delete(this.schema).where(eq(this.schema.id, userID));
  }

  async getUserByEmail(email: string) {
    return await this.db.query.usersTable.findFirst({
      where: eq(this.schema.email, email),
    });
  }

  async updateUser(userID: string, updatedUser: UpdateUser) {
    await this.db
      .update(this.schema)
      .set(updatedUser)
      .where(eq(this.schema.id, userID));
  }

  async verifyEmail(userID: string, trx: TursoDB = this.db) {
    await trx
      .update(this.schema)
      .set({ emailVerified: new Date() })
      .where(eq(this.schema.id, userID));
  }
}
