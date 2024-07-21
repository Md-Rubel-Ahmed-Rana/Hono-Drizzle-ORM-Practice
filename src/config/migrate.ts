import { migrate } from "drizzle-orm/node-postgres/migrator";
import { pullDb } from "../utils/db.util";

const migrateDatabase = async () => {
  console.log("Migration started...");
  try {
    await migrate(pullDb, { migrationsFolder: "drizzle" });
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
