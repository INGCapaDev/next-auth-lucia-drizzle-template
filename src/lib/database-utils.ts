import { db } from '@/database/db';

export async function createTransactions<T extends typeof db>(
  cb: (trx: T) => void
) {
  await db.transaction(cb as any);
}
