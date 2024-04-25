import { Hono } from "hono";
import { PostController } from "../controllers/post.controller";

const router = new Hono();

router.post("/create", PostController.createPost);

router.get("/my-posts/:id", PostController.myPosts);

router.patch("/update/:id", PostController.updatePost);

router.delete("/delete/:id", PostController.deletePost);

export const PostRoutes = router;
