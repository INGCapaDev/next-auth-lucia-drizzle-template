import {
  accountStatusEnum,
  accountTypeEnum,
  roleEnum,
} from '@/lib/constants/database';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import {
  dateField,
  dateRequiredField,
  dateWithDefaultField,
  idField,
  updateAtField,
} from './customFields';

const timestamps = {
  createdAt: dateWithDefaultField('created_at'),
  updatedAt: updateAtField(),
};

export const usersTable = sqliteTable('user', {
  id: idField(),
  email: text('email').unique(),
  role: text('role', { enum: roleEnum })
    .notNull()
    .$default(() => 'user'),
  expiresAt: dateField('expires_at'),
  status: text('status', { enum: accountStatusEnum })
    .notNull()
    .$default(() => 'active'),
  emailVerified: dateField('email_verified'),
  ...timestamps,
});

export const accountsTable = sqliteTable('accounts', {
  id: idField(),
  userID: text('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  accountType: text('account_type', { enum: accountTypeEnum }).notNull(),
  googleID: text('google_id').unique(),
  password: text('password'),
  salt: text('salt'),
  ...timestamps,
});

// This is customizable for your needs
export const profilesTable = sqliteTable('profile', {
  id: idField(),
  userID: text('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique()
    .notNull(),
  // Add your fields below here
  name: text('name'),
  lastName: text('last_name'),
  phone: text('phone'),
  house: text('house'),
  adminSWID: text('admin_swid'),
  image: text('image'),
  extras: text('extras', { mode: 'json' }),
  ...timestamps,
});

export const sessionsTable = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
});

const tokenFields = {
  id: idField(),
  tokenExpiresAt: dateRequiredField('token_expires_at'),
};

export const resetTokensTable = sqliteTable('reset_tokens', {
  userID: text('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique()
    .notNull(),
  token: text('token').notNull().unique(),
  ...tokenFields,
});

export const verificationTokensTable = sqliteTable('verification_tokens', {
  userID: text('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique()
    .notNull(),
  token: text('token').notNull().unique(),
  ...tokenFields,
});
