import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";

const router = new Hono();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.post("/logout", AuthController.logout);

router.get("/", authenticate, AuthController.auth);

export const AuthRoutes = router;
