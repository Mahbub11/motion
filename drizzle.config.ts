import { defineConfig, type Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('🔴 Cannot find database url');
}

dotenv.config({
    path: ".env",
})

export default defineConfig({
    dialect: "postgresql",
    schema: "./lib/supabase/schema.ts",
    out: "./migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        database: "postgres",
        port: 5432,
        host: "aws-0-ap-south-1.pooler.supabase.com",
        user: process.env.DB_USER,
        password: process.env.PW,
    },
})

