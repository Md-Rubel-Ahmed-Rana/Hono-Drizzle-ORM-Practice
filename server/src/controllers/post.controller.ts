import { PostService } from "../services/post.service";

class Controller {
  async createPost(c: any) {
    const body = await c.req.json();
    const data = await PostService.createPost(body);
    return c.json({ message: "Post added successfully", data });
  }
}

export const PostController = new Controller();
