import { desc, eq, sql } from "drizzle-orm";
import { NewPost } from "../dts/post/post.create.dto";
import { HTTPException } from "hono/http-exception";
import { IPost } from "../dts/post/post.get.dto";
import { pgClient } from "../utils/db.util";
import { models } from "../models";

class Service {
  async createPost(data: NewPost) {
    if (!data) {
      throw new HTTPException(400, { message: "Post data required" });
    }
    const result = await pgClient()
      .insert(models.Post)
      .values(data)
      .returning();
    return result[0];
  }

  async myPosts(userId: string) {
    if (!userId) {
      throw new HTTPException(400, { message: "User id required" });
    }
    const data = await pgClient()
      .select({
        post: models.Post,
        user: { id: models.User.id, name: models.User.name },
      })
      .from(models.Post)
      .where(eq(models.Post.user, userId))
      .rightJoin(models.User, eq(models.User.id, models.Post.user));

    return data;
  }

  async getAllPosts(limit: number, page: number) {
    const skip = (page - 1) * limit;

    const data = await pgClient()
      .select({
        post: models.Post,
        user: {
          id: models.User.id,
          name: models.User.name,
        },
        likes: sql`(
          SELECT COUNT(*) 
          FROM likes 
          WHERE likes.post = posts.id
        )`.as("likes"),
        comments: sql`(
          SELECT COUNT(*) 
          FROM comments 
          WHERE comments.post = posts.id
        )`.as("comments"),
      })
      .from(models.Post)
      .innerJoin(models.User, eq(models.User.id, models.Post.user))
      .orderBy(desc(models.Post.updatedAt))
      .offset(skip)
      .limit(limit);

    const totalCountResult = await pgClient()
      .select({
        count: sql`COUNT(*)`.as("total"),
      })
      .from(models.Post);
    const total = Number(totalCountResult[0].count);

    return { total, limit, page, posts: data };
  }

  async getSinglePost(postId: string) {
    const data = await pgClient()
      .select()
      .from(models.Post)
      .where(eq(models.Post.id, postId));
    return data[0];
  }

  async updatePost(postId: string, updatedData: IPost) {
    if (!postId) {
      throw new HTTPException(400, { message: "Post id required" });
    }
    const updatedUserId = await pgClient()
      .update(models.Post)
      .set({ ...updatedData })
      .where(eq(models.Post.id, postId))
      .returning();
    return updatedUserId[0];
  }

  async deletePost(postId: string) {
    try {
      // delete all the likes if this post
      await pgClient()
        .delete(models.Like)
        .where(eq(models.Like.post, postId))
        .returning({ id: models.Like.id });

      // delete all the comments if this post
      await pgClient()
        .delete(models.Comment)
        .where(eq(models.Comment.post, postId));

      // finally, delete the post
      await pgClient()
        .delete(models.Post)
        .where(eq(models.Post.id, postId))
        .returning({ id: models.Post.id });
    } catch (error: any) {
      throw new HTTPException(500, {
        message: error?.message,
      });
    }
  }
}

export const PostService = new Service();
