import { db, TursoDB } from '@/database/db';
import { usersTable } from '@/database/schema';
import { UpdateUser } from '@/database/types';
import { eq } from 'drizzle-orm';

export async function getUser(userID: string) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userID),
  });
}

export async function createUser(email: string) {
  const [user] = await db
    .insert(usersTable)
    .values({
      email,
    })
    .returning();
  return user;
}

export async function deleteUser(userID: string) {
  await db.delete(usersTable).where(eq(usersTable.id, userID));
}

export async function getUserByEmail(email: string) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });
}

export async function updateUser(userID: string, updatedUser: UpdateUser) {
  await db.update(usersTable).set(updatedUser).where(eq(usersTable.id, userID));
}

export async function verifyEmail(userID: string, trx: TursoDB = db) {
  await trx
    .update(usersTable)
    .set({ emailVerified: new Date() })
    .where(eq(usersTable.id, userID));
}
