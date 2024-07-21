import { sql } from "drizzle-orm";
import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { User } from "./user.model";
import { Post } from "./post.model";

export const Like = pgTable("likes", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .unique(),
  user: uuid("user")
    .notNull()
    .references(() => User.id),
  post: uuid("post")
    .notNull()
    .references(() => Post.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
