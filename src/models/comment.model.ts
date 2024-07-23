import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { User } from "./user.model";
import { Post } from "./post.model";

export const Comment = pgTable("comments", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .unique(),
  text: text("text").notNull(),
  user: uuid("user")
    .notNull()
    .references(() => User.id),
  post: uuid("post")
    .notNull()
    .references(() => Post.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
