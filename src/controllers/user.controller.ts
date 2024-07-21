import { Context } from "hono";
import { UserService } from "../services/user.service";

class Controller {
  async getUsers({ json }: Context) {
    const users = await UserService.getUsers();
    return json(users, 200);
  }
}

export const UserController = new Controller();
