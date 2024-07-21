import { serve } from "@hono/node-server";
import { Database } from "./config/database";
import app from "./app";
import { config } from "./config/env";

const port = config.app.port;

console.log(`Server is running on port ${port}`);

Database.connect();

serve({
  fetch: app.fetch,
  port,
});
