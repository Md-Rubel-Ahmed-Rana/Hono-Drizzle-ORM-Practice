import { desc, eq } from "drizzle-orm";
import { NewPost } from "../dts/post/post.create.dto";
import { HTTPException } from "hono/http-exception";
import { User } from "../models/user.model";
import { IPost } from "../dts/post/post.get.dto";
import { pgClient } from "../utils/db.util";
import { Post } from "../models/post.model";
import { Like } from "../models/like.model";

class Service {
  async createPost(data: NewPost) {
    if (!data) {
      throw new HTTPException(400, { message: "Post data required" });
    }
    const result = await pgClient().insert(Post).values(data).returning();
    return result[0];
  }

  async myPosts(userId: string) {
    if (!userId) {
      throw new HTTPException(400, { message: "User id required" });
    }
    const data = await pgClient()
      .select({ post: Post, user: { id: User.id, name: User.name } })
      .from(Post)
      .where(eq(Post.user, userId))
      .rightJoin(User, eq(User.id, Post.user));

    return data;
  }

  async getAllPosts() {
    const data = await pgClient()
      .select({
        post: Post,
        user: { id: User.id, name: User.name },
      })
      .from(Post)
      .innerJoin(User, eq(User.id, Post.user))
      .orderBy(desc(Post.updatedAt));

    return data;
  }
  async getSinglePost(postId: string) {
    const data = await pgClient()
      .select()
      .from(Post)
      .where(eq(Post.id, postId));
    return data[0];
  }

  async updatePost(postId: string, updatedData: IPost) {
    console.log(updatedData);
    if (!postId) {
      throw new HTTPException(400, { message: "Post id required" });
    }
    const updatedUserId = await pgClient()
      .update(Post)
      .set({ ...updatedData })
      .where(eq(Post.id, postId))
      .returning();
    return updatedUserId[0];
  }
  async deletePost(postId: string) {
    try {
      await pgClient()
        .delete(Like)
        .where(eq(Like.post, postId))
        .returning({ id: Like.id });

      await pgClient()
        .delete(Post)
        .where(eq(Post.id, postId))
        .returning({ id: Post.id });
    } catch (error) {
      throw new HTTPException(500, { message: "Post was not deleted" });
    }
  }
}

export const PostService = new Service();