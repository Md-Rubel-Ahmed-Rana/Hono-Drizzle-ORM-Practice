import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";

const router = new Hono();

router.get("/", UserController.getUsers);

export const UserRoutes = router;
