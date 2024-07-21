import { Post } from "../../models/post.model";

export type NewPost = typeof Post.$inferInsert;
