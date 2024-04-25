import { posts } from "../../models/post.model";

export type NewPost = typeof posts.$inferInsert;
