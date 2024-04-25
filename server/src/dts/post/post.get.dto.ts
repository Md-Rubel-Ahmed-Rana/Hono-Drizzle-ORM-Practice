import { posts } from "../../models/post.model";

export type IPost = typeof posts.$inferSelect;
