import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";

const userRoutes = new Hono();

userRoutes.get("/", UserController.getUsers);

userRoutes.post("/register", UserController.createUser);

userRoutes.post("/login", UserController.loginUser);

export default userRoutes;
