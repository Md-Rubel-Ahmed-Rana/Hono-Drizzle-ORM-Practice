import { desc, eq } from "drizzle-orm";
import { NewPost } from "../dts/post/post.create.dto";
import { HTTPException } from "hono/http-exception";
import { User } from "../models/user.model";
import { IPost } from "../dts/post/post.get.dto";
import { pgClient } from "../utils/db.util";
import { Post } from "../models/post.model";
import { Like } from "../models/like.model";
import { Comment } from "../models/comment.model";
import { CommentService } from "./comment.service";

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

    const comments = await CommentService.getAllComments();
    console.log(comments);
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
      // delete all the likes if this post
      await pgClient()
        .delete(Like)
        .where(eq(Like.post, postId))
        .returning({ id: Like.id });

      // delete all the comments if this post
      await pgClient().delete(Comment).where(eq(Comment.post, postId));

      // finally, delete the post
      await pgClient()
        .delete(Post)
        .where(eq(Post.id, postId))
        .returning({ id: Post.id });
    } catch (error: any) {
      throw new HTTPException(500, {
        message: error?.message,
      });
    }
  }
}

export const PostService = new Service();
