import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/honodrizzledb`,
});

class Db {
  async connect() {
    try {
      await client.connect();
      console.log("Successfully connected to database...");
    } catch (error: any) {
      console.log({
        message: "Failed connecting to database...",
        error: error?.message,
      });
    }
  }
  pgClient() {
    const db = drizzle(client);
    return db;
  }
}

export const Database = new Db();
