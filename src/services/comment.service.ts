import { eq } from "drizzle-orm";
import { pgClient } from "../utils/db.util";
import { models } from "../models";

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
      .insert(models.Comment)
      .values({ user, post, text })
      .returning();
    return result;
  }
  async getAllComments() {
    const data = await pgClient().select().from(models.Comment);
    return data;
  }

  async getAllCommentForAPost(postId: string) {
    const data = await pgClient()
      .select({
        id: models.Comment.id,
        text: models.Comment.text,
        createdAt: models.Comment.createdAt,
        user: { id: models.User.id, name: models.User.name },
      })
      .from(models.Comment)
      .innerJoin(models.User, eq(models.User.id, models.Comment.user))
      .where(eq(models.Comment.post, postId));
    return data;
  }

  async deleteComment(commentId: string) {
    await pgClient()
      .delete(models.Comment)
      .where(eq(models.Comment.id, commentId));
  }
}

export const CommentService = new Service();
