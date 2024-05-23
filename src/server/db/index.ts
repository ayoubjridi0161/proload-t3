import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {sql} from '@vercel/postgres'
import * as schema from './schema'
export const db = drizzle(sql ,{schema});


