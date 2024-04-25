import { eq } from "drizzle-orm";
import { Database } from "../config/database";
import { NewPost } from "../dts/post/post.create.dto";
import { posts } from "../models/post.model";
import { HTTPException } from "hono/http-exception";
import { User } from "../models/user.model";

class Service {
  async createPost(data: NewPost) {
    if (!data) {
      throw new HTTPException(400, { message: "Post data required" });
    }
    const result = await Database.pgClient()
      .insert(posts)
      .values(data)
      .returning();
    return result[0];
  }

  async myPosts(userId: string) {
    if (!userId) {
      throw new HTTPException(400, { message: "User id required" });
    }
    const data = await Database.pgClient()
      .select({ post: posts, user: { id: User.id, name: User.name } })
      .from(posts)
      .where(eq(posts.user, userId))
      .rightJoin(User, eq(User.id, posts.user));

    return data;
  }
}

export const PostService = new Service();
