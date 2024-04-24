import { UserService } from "../services/user.service";

class Controller {
  async createUser(c: any) {
    const body = await c.req.json();
    const user = await UserService.createUser(body);
    return c.json(user, 200);
  }
  async loginUser(c: any) {
    const body = await c.req.json();
    const user = await UserService.loginUser(body);
    return c.json(user, 200);
  }
  async authUser(c: any) {
    const token = c.req.header("authorization");
    const user = await UserService.authUser(token.split(" ")[1]);
    return c.json(user, 200);
  }

  async getUsers(c: any) {
    const users = await UserService.getUsers();
    return c.json(users, 200);
  }
}

export const UserController = new Controller();
