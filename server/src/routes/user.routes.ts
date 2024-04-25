import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";

const router = new Hono();

router.get("/", UserController.getUsers);

router.post("/register", UserController.createUser);

router.post("/login", UserController.loginUser);

router.get("/auth", UserController.authUser);

export const UserRoutes = router;
