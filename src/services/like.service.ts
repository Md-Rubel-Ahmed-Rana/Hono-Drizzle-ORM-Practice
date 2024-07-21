import { eq } from "drizzle-orm";
import { Like } from "../models/like.model";
import { pgClient } from "../utils/db.util";

class Service {
  async likeToAPost({ user, post }: { user: string; post: string }) {
    const isExist = await pgClient()
      .select()
      .from(Like)
      .where(eq(Like.user, user));
    if (isExist.length > 0) {
      const result = await pgClient()
        .delete(Like)
        .where(eq(Like.user, user))
        .returning();
      return result;
    } else {
      const result = await pgClient()
        .insert(Like)
        .values({ user, post })
        .returning();
      return result;
    }
  }
  async getAllLikes() {
    const data = await pgClient().select().from(Like);
    return data;
  }

  async getAllLikesForAPost(postId: string) {
    const data = await pgClient()
      .select({ id: Like.id, user: Like.user, post: Like.post })
      .from(Like)
      .where(eq(Like.post, postId));
    return data;
  }
}

export const LikeService = new Service();
