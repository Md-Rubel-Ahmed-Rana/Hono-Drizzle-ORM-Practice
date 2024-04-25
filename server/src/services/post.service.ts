import { eq } from "drizzle-orm";
import { Database } from "../config/database";
import { NewPost } from "../dts/post/post.create.dto";
import { posts } from "../models/post.model";
import { HTTPException } from "hono/http-exception";
import { User } from "../models/user.model";
import { IPost } from "../dts/post/post.get.dto";

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

  async updatePost(postId: string, updatedData: IPost) {
    if (!postId) {
      throw new HTTPException(400, { message: "Post id required" });
    }
    const updatedUserId = await Database.pgClient()
      .update(posts)
      .set({ ...updatedData })
      .where(eq(posts.id, postId))
      .returning();
    return updatedUserId[0];
  }
  async deletePost(postId: string) {
    const deletedUserIds: { id: string }[] = await Database.pgClient()
      .delete(posts)
      .where(eq(posts.id, postId))
      .returning({ id: posts.id });
    return deletedUserIds[0];
  }
}

export const PostService = new Service();
