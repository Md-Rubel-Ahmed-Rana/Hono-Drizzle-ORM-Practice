import { Hono } from "hono";
import { LikeController } from "../controllers/like.controller";

const router = new Hono();

router.get("/", LikeController.getAllLikes);

router.get("/by-post/:postId", LikeController.getAllLikesForAPost);

router.post("/", LikeController.likeToAPost);

export const LikeRoutes = router;
