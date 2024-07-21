import { eq } from "drizzle-orm";
import { Like } from "../models/like.model";
import { pgClient } from "../utils/db.util";
import { HTTPException } from "hono/http-exception";

class Service {
  async likeToAPost({ user, post }: { user: string; post: string }) {
    const isExist = await pgClient()
      .select()
      .from(Like)
      .where(eq(Like.post, post));
    if (isExist.length > 0) {
      throw new HTTPException(409, {
        message: "You already liked to this post",
      });
    } else {
      const result = await pgClient()
        .insert(Like)
        .values({ user, post })
        .returning();
      return result;
    }
  }
}

export const LikeService = new Service();
