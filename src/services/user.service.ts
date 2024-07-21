import { pgClient } from "../utils/db.util";
import { User } from "../models/user.model";

class Service {
  async getUsers() {
    return await pgClient().select().from(User);
  }
}

export const UserService = new Service();
