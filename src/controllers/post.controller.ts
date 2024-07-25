import { HTTPException } from "hono/http-exception";
import { PostService } from "../services/post.service";
import { Context } from "hono";

class Controller {
  async createPost({ req, json }: Context) {
    const body = await req.json();
    const data = await PostService.createPost(body);
    return json(
      { statusCode: 201, message: "Post added successfully", data },
      201
    );
  }
  async myPosts({ req, json }: Context) {
    try {
      const userId = req.param("id");
      const data = await PostService.myPosts(userId);
      return json({ message: "Posts fetched successfully", data });
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error?.message });
    }
  }
  async getAllPosts({ req, json }: Context) {
    try {
      const { page, limit } = req.query();
      const resourceLimit = limit ? Number(limit) : 10;
      const currentPage = page ? Number(page) : 1;
      const data = await PostService.getAllPosts(resourceLimit, currentPage);
      return json({
        statusCode: 200,
        message: "Posts fetched successfully",
        ...data,
      });
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error?.message });
    }
  }
  async getSinglePost({ req, json }: Context) {
    try {
      const postId = req.param("id");
      const data = await PostService.getSinglePost(postId);
      return json({
        statusCode: 200,
        message: "Post fetched successfully",
        post: data,
      });
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error?.message });
    }
  }
  async updatePost({ req, json }: Context) {
    try {
      const postId = req.param("id");
      const body = await req.json();
      const data = await PostService.updatePost(postId, body);
      return json({
        statusCode: 200,
        message: "Post updated successfully",
        data,
      });
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error?.message });
    }
  }
  async deletePost({ req, json }: Context) {
    try {
      const postId = req.param("id");
      await PostService.deletePost(postId);
      return json({
        statusCode: 200,
        message: "Post deleted successfully",
      });
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error?.message });
    }
  }
}

export const PostController = new Controller();
