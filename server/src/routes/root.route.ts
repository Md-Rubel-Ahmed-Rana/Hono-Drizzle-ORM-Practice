import { Hono } from "hono";
import { PostRoutes } from "./post.routes";
import { UserRoutes } from "./user.routes";

const router = new Hono();

router.route("/user", UserRoutes);

router.route("/post", PostRoutes);

export const RootRoute = router;
