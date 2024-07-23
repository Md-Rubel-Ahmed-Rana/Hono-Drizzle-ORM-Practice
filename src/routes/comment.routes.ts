import { Hono } from "hono";
import { CommentController } from "../controllers/comment.controller";

const router = new Hono();

router.get("/", CommentController.getAllComments);

router.get("/by-post/:postId", CommentController.getAllCommentForAPost);

router.post("/", CommentController.commentToAPost);

router.delete("/:id", CommentController.deleteComment);

export const CommentRoutes = router;
