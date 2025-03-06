import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof setupDb> | undefined;
};

function setupDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const queryClient = postgres(process.env.DATABASE_URL, {
    max: 10, // Set max pool size
    idle_timeout: 20, // Close idle connections after 20 seconds
    connect_timeout: 10, // Connection timeout after 10 seconds
  });

  return drizzle(queryClient);
}

const db = globalForDb.db ?? setupDb();

if (process.env.NODE_ENV !== 'production') {
  globalForDb.db = db;
}

export default db;
