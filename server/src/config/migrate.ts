import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

dotenv.config();

export const pool = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/honodrizzledb`,
});

const db = drizzle(pool);

const migrateDatabase = async () => {
  console.log("Migration started...");
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration completed");
    process.exit(0);
  } catch (error: any) {
    console.log({
      message: "Failed to migrate db",
      error: error?.message,
    });
  }
};

migrateDatabase();
