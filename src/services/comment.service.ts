import { eq } from "drizzle-orm";
import { pgClient } from "../utils/db.util";
import { Comment } from "../models/comment.model";

class Service {
  async commentToAPost({
    user,
    post,
    text,
  }: {
    user: string;
    post: string;
    text: string;
  }) {
    const result = await pgClient()
      .insert(Comment)
      .values({ user, post, text })
      .returning();
    return result;
  }
  async getAllComments() {
    const data = await pgClient().select().from(Comment);
    return data;
  }

  async getAllCommentForAPost(postId: string) {
    const data = await pgClient()
      .select()
      .from(Comment)
      .where(eq(Comment.post, postId));
    return data;
  }
}

export const CommentService = new Service();
