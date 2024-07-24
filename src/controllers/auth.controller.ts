import { Context } from "hono";
import { AuthService } from "../services/auth.service";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

class Controller {
  async register({ req, json }: Context) {
    const body = await req.json();
    await AuthService.register(body);
    return json({ statusCode: 201, message: "Register successful" }, 201);
  }

  async login(c: Context) {
    const { req, json } = c;
    const body = await req.json();
    const token = await AuthService.login(body);
    setCookie(c, "hono-drizzle", token, {
      secure: true,
      httpOnly: true,
      maxAge: 1000,
      expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
      sameSite: "Lax",
    });
    return json({ statusCode: 200, message: "Login successful" }, 200);
  }

  async logout(c: Context) {
    const { json } = c;
    deleteCookie(c, "hono-drizzle");
    return json({ statusCode: 200, message: "Logout successful" }, 200);
  }

  async auth(c: Context) {
    const { json } = c;
    const token = getCookie(c, "hono-drizzle") as string;
    if (token) {
      const user = await AuthService.auth(token?.split(" ")[1]);
      return json(user, 200);
    } else {
      json({ success: false, message: "Unauthenticated" }, 200);
    }
  }
}

export const AuthController = new Controller();
