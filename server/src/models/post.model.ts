import { sql } from "drizzle-orm";
import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { User } from "./user.model";
export const posts = pgTable("posts", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  user: uuid("user")
    .notNull()
    .references(() => User.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
