import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_URL;
console.log("supabaseUrl: ", supabaseUrl)
if (!supabaseUrl) {
    throw new Error('SUPABASE_URL is not defined')
}

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './supabase/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: supabaseUrl,
    },
});
