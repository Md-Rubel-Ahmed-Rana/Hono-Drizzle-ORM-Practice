import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

export const authenticate = async (c: Context, next: Next) => {
  const cookie = getCookie(c, "hono-drizzle");
  if (!cookie) {
    return c.redirect("/login");
  }
  await next();
};
