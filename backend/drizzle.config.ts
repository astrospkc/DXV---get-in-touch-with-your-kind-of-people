import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_URL;
console.log("supabaseUrl: ", supabaseUrl)
if (!supabaseUrl) {
    throw new Error('SUPABASE_URL is not defined')
}

export default defineConfig({
    schema: './src/db/schema/index.ts',
    out: './supabase/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: supabaseUrl,
    },
    verbose: true, //  In verbose mode, Drizzle ORM will provide more detailed output and logging during the migration generation, helps for debuuging
    strict: true //  Drizzle ORM will enforce stricter checks and validations on the schema definitions and generated migrations.

});
