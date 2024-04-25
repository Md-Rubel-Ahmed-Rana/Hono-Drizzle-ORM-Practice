import { Database } from "../config/database";
import { NewPost } from "../dts/post/post.create.dto";
import { posts } from "../models/post.model";

class Service {
  async createPost(data: NewPost) {
    const result = await Database.pgClient()
      .insert(posts)
      .values(data)
      .returning();
    return result[0];
  }
}

export const PostService = new Service();
