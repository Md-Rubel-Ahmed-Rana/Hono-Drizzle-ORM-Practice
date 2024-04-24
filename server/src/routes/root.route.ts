import { Hono } from "hono";
import userRoutes from "./user.routes";

const rootRoutes = new Hono();

rootRoutes.route("/user", userRoutes);

export default rootRoutes;
