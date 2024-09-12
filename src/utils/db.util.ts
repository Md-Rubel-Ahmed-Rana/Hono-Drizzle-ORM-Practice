import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";
import { config } from "../config/env";

export const pool = new Pool({
  connectionString: config.db.url,
});

export const pullDb = drizzle(pool);

export const client = new Client({
  connectionString: config.db.url,
});

export const pgClient = () => {
  return drizzle(client);
};
