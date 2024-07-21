import { Hono } from "hono";
import { PostController } from "../controllers/post.controller";

const router = new Hono();

router.post("/", PostController.createPost);

router.get("/", PostController.getAllPosts);

router.get("/:id", PostController.getSinglePost);

router.get("/me/:id", PostController.myPosts);

router.patch("/:id", PostController.updatePost);

router.delete("/:id", PostController.deletePost);

export const PostRoutes = router;
