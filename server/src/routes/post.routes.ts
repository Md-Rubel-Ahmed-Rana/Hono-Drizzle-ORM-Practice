import { Hono } from "hono";
import { PostController } from "../controllers/post.controller";

const router = new Hono();

router.post("/create", PostController.createPost);

export const PostRoutes = router;
