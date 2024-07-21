import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";
import { config } from "../config/env";

const dbConfig = config.db;

const connectionString = `${dbConfig.provider}://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

export const pool = new Pool({
  connectionString: connectionString,
});

export const pullDb = drizzle(pool);

export const client = new Client({
  connectionString: connectionString,
});

export const pgClient = () => {
  return drizzle(client);
};
