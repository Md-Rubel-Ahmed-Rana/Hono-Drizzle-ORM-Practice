import { Context } from "hono";
import { CommentService } from "../services/comment.service";

class Controller {
  async commentToAPost({ req, json }: Context) {
    const body = await req.json();
    const data = await CommentService.commentToAPost(body);
    return json(
      { statusCode: 201, message: "Comment added successfully", data: data },
      201
    );
  }
  async getAllComments({ json }: Context) {
    const data = await CommentService.getAllComments();
    return json(
      {
        statusCode: 200,
        message: "Comments fetched successfully",
        comments: data,
      },
      200
    );
  }
  async getAllCommentForAPost({ req, json }: Context) {
    const postId = req.param("postId");
    const data = await CommentService.getAllCommentForAPost(postId);
    return json(
      {
        statusCode: 200,
        message: "Comments fetched for a post successfully",
        comments: data,
      },
      200
    );
  }
}

export const CommentController = new Controller();
