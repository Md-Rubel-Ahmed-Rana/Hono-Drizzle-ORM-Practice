import { client } from "../utils/db.util";

class Db {
  async connect() {
    console.log("Connecting to database...");
    try {
      await client.connect();
      console.log("Database connected successfully");
    } catch (error: any) {
      console.log({
        message: "Failed to connect database",
        error: error?.message,
      });
    }
  }
}

export const Database = new Db();
