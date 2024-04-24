import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import rootRoutes from "./routes/root.route";
import { Database } from "./config/database";
import dotenv from "dotenv";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

dotenv.config();

const app = new Hono();
const port = 5000;

// middlewares
app.use(cors());
app.use(logger());
app.use(secureHeaders());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1", rootRoutes);

app.notFound((c) => {
  return c.text("Custom 404 Message", 404);
});

console.log(`Server is running on port ${port}`);

Database.connect();

serve({
  fetch: app.fetch,
  port,
});
