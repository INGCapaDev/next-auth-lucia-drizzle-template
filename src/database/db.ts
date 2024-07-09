import { env } from '@/config/env';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import 'server-only';
import * as schema from './schema';

const turso = createClient({
  url: env.DATABASE_URL,
  authToken: env.DB_AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
export type TursoDB = typeof db;
