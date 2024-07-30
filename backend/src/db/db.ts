// This code snippet is setting up a connection to a PostgreSQL database using Drizzle ORM and the postgres-js driver.

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
config({ path: '.env' });
const client = postgres(process.env.SUPABASE_URL!);
console.log("url: ", process.env.SUPABASE_URL);
export const db = drizzle(client);