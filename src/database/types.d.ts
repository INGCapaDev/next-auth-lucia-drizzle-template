import { accountTypeEnum } from '@/lib/constants/database';
import {
  accountsTable,
  profilesTable,
  resetTokensTable,
  sessionsTable,
  usersTable,
  verificationTokensTable,
} from './schema';

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;
export type UpdateProfile = Partial<Omit<SelectProfile, 'id' | 'userID'>>;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type UpdateUser = Partial<Omit<SelectUser, 'id'>>;

export type InsertAccount = typeof accountsTable.$inferInsert;
export type SelectAccount = typeof accountsTable.$inferSelect;
export type AccountType = (typeof accountTypeEnum)[number];
export type EmailAccount = (typeof accountTypeEnum)[0];
export type GoogleAccount = (typeof accountTypeEnum)[1];

export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;

export type InsertResetToken = typeof resetTokensTable.$inferInsert;
export type SelectResetToken = typeof resetTokensTable.$inferSelect;

export type InsertVerificationToken =
  typeof verificationTokensTable.$inferInsert;
export type SelectVerificationToken =
  typeof verificationTokensTable.$inferSelect;
