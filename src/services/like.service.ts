import { and, eq } from "drizzle-orm";
import { pgClient } from "../utils/db.util";
import { models } from "../models";

class Service {
  async likeToAPost({ user, post }: { user: string; post: string }) {
    const isExist = await pgClient()
      .select()
      .from(models.Like)
      .where(and(eq(models.Like.post, post), eq(models.Like.user, user)));
    if (isExist.length > 0) {
      const result = await pgClient()
        .delete(models.Like)
        .where(eq(models.Like.user, user))
        .returning();
      return result;
    } else {
      const result = await pgClient()
        .insert(models.Like)
        .values({ user, post })
        .returning();
      return result;
    }
  }
  async getAllLikes() {
    const data = await pgClient().select().from(models.Like);
    return data;
  }

  async getAllLikesForAPost(postId: string) {
    const data = await pgClient()
      .select({
        id: models.Like.id,
        user: models.Like.user,
        post: models.Like.post,
      })
      .from(models.Like)
      .where(eq(models.Like.post, postId));
    return data;
  }
}

export const LikeService = new Service();
