import { env } from '@/config/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations/prod',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
});
