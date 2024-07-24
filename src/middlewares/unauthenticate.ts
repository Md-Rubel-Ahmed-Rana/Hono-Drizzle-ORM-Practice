import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

export const unauthenticate = async (c: Context, next: Next) => {
  const cookie = getCookie(c, "hono-drizzle");
  if (cookie) {
    return c.redirect("/");
  }
  await next();
};
