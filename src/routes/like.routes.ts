import { Hono } from "hono";
import { LikeController } from "../controllers/like.controller";

const router = new Hono();

router.post("/add", LikeController.likeToAPost);

export const LikeRoutes = router;
