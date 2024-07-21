import { Context } from "hono";
import { LikeService } from "../services/like.service";

class Controller {
  async likeToAPost({ req, json }: Context) {
    const body = await req.json();
    const data = await LikeService.likeToAPost(body);
    return json(
      { statusCode: 201, message: "Like added successfully", data: data },
      201
    );
  }
  async getAllLikes({ json }: Context) {
    const data = await LikeService.getAllLikes();
    return json(
      { statusCode: 200, message: "Likes fetched successfully", likes: data },
      200
    );
  }
  async getAllLikesForAPost({ req, json }: Context) {
    const postId = req.param("postId");
    const data = await LikeService.getAllLikesForAPost(postId);
    return json(
      {
        statusCode: 200,
        message: "Likes fetched for a post successfully",
        likes: data,
      },
      200
    );
  }
}

export const LikeController = new Controller();
