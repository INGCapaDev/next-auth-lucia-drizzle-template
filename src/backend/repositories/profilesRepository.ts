import { TursoDB, db } from '@/database/db';
import { profilesTable } from '@/database/schema';
import { SelectProfile, UpdateProfile } from '@/database/types';
import { eq } from 'drizzle-orm';
import { IProfilesRepository } from '.';

export class ProfilesRepository implements IProfilesRepository {
  private db: TursoDB = db;
  private schema = profilesTable;

  async createProfile(userID: string, name?: string, image?: string) {
    const [profile] = await this.db
      .insert(this.schema)
      .values({ userID, image, name })
      .onConflictDoNothing()
      .returning();
    return profile;
  }
  async updateProfile(userID: string, data: UpdateProfile) {
    return await this.db
      .update(this.schema)
      .set(data)
      .where(eq(this.schema.userID, userID));
  }
  async getProfile(userID: string): Promise<SelectProfile | undefined> {
    return await this.db.query.profilesTable.findFirst({
      where: eq(this.schema.userID, userID),
    });
  }
}
