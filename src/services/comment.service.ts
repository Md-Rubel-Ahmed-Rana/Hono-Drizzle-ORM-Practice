import { eq } from "drizzle-orm";
import { pgClient } from "../utils/db.util";
import { Comment } from "../models/comment.model";
import { User } from "../models/user.model";

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
      .select({
        id: Comment.id,
        text: Comment.text,
        createdAt: Comment.createdAt,
        user: { id: User.id, name: User.name },
      })
      .from(Comment)
      .innerJoin(User, eq(User.id, Comment.user))
      .where(eq(Comment.post, postId));
    return data;
  }

  async deleteComment(commentId: string) {
    await pgClient().delete(Comment).where(eq(Comment.id, commentId));
  }
}

export const CommentService = new Service();
