import 'dotenv/config'
import {drizzle} from 'drizzle-orm/neon-http';
import {neon} from '@neondatabase/serverless';

if(!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');

const sql = neon(process.env.DATABASE_URL);

// Creates a query function using your Neon connection string. This sql function can execute raw SQL queries.
// When you call neon(process.env.DATABASE_URL), it returns a function that you can use to execute SQL queries.
export const db = drizzle(sql);