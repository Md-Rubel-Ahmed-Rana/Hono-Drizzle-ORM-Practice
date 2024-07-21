import { Post } from "../../models/post.model";

export type IPost = typeof Post.$inferSelect;
