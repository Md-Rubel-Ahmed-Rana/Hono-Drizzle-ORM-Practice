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
}

export const LikeController = new Controller();
