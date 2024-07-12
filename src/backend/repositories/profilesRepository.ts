import { db } from '@/database/db';
import { profilesTable } from '@/database/schema';
import { SelectProfile, UpdateProfile } from '@/database/types';
import { eq } from 'drizzle-orm';

export async function createProfile(
  userID: string,
  name?: string,
  image?: string
) {
  const [profile] = await db
    .insert(profilesTable)
    .values({ userID, image, name })
    .onConflictDoNothing()
    .returning();
  return profile;
}

export async function updateProfile(userID: string, data: UpdateProfile) {
  return await db
    .update(profilesTable)
    .set(data)
    .where(eq(profilesTable.userID, userID));
}

export async function getProfile(
  userID: string
): Promise<SelectProfile | undefined> {
  return await db.query.profilesTable.findFirst({
    where: eq(profilesTable.userID, userID),
  });
}
