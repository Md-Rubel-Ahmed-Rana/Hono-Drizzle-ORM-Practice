import { Context } from "hono";
import { AuthService } from "../services/auth.service";

class Controller {
  async register({ req, json }: Context) {
    const body = await req.json();
    await AuthService.register(body);
    return json({ statusCode: 201, message: "Register successful" }, 201);
  }

  async login({ req, json }: Context) {
    const body = await req.json();
    const token = await AuthService.login(body);
    return json(
      { statusCode: 200, message: "Login successful", data: token },
      200
    );
  }
  async auth({ req, json }: Context) {
    const token = req.header("authorization") || "";
    const user = await AuthService.auth(token?.split(" ")[1]);
    return json(user, 200);
  }
}

export const AuthController = new Controller();
