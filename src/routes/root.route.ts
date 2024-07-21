import { Hono } from "hono";
import { PostRoutes } from "./post.routes";
import { UserRoutes } from "./user.routes";
import { AuthRoutes } from "./auth.routes";
import { LikeRoutes } from "./like.routes";

const router = new Hono();

const routes = [
  {
    path: "user",
    routes: UserRoutes,
  },
  {
    path: "auth",
    routes: AuthRoutes,
  },
  {
    path: "post",
    routes: PostRoutes,
  },
  {
    path: "like",
    routes: LikeRoutes,
  },
];

routes.forEach((route) => router.route(route.path, route.routes));

export const RootRoute = router;
