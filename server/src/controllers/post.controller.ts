import { HTTPException } from "hono/http-exception";
import { PostService } from "../services/post.service";

class Controller {
  async createPost(c: any) {
    const body = await c.req.json();
    const data = await PostService.createPost(body);
    return c.json({ message: "Post added successfully", data });
  }
  async myPosts(c: any) {
    try {
      const userId = c.req.param("id");
      const data = await PostService.myPosts(userId);
      return c.json({ message: "Posts fetched successfully", data });
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error?.message });
    }
  }
  async updatePost(c: any) {
    try {
      const postId = c.req.param("id");
      const body = await c.req.json();
      const data = await PostService.updatePost(postId, body);
      return c.json({ message: "Post updated successfully", data });
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error?.message });
    }
  }
  async deletePost(c: any) {
    try {
      const postId = c.req.param("id");
      const data = await PostService.deletePost(postId);
      return c.json({ message: "Post deleted successfully", data });
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error?.message });
    }
  }
}

export const PostController = new Controller();
