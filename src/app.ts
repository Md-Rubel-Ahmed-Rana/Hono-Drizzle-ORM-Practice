import { Hono } from "hono";
import { cors } from "hono/cors";
import dotenv from "dotenv";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { RootRoute } from "./routes/root.route";
import { generateNotFoundHtml, ViewRoutes } from "./views";

dotenv.config();

const app = new Hono();

// middlewares
app.use(cors());
app.use(logger());
app.use(secureHeaders());

// views routes exposed
app.route("/", ViewRoutes);

// api routes exposed
app.route("/api/v1", RootRoute);

app.notFound(generateNotFoundHtml);

export default app;
