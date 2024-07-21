import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";

const router = new Hono();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/", AuthController.auth);

export const AuthRoutes = router;
