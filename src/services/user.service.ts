import { models } from "../models";
import { pgClient } from "../utils/db.util";

class Service {
  async getUsers() {
    return await pgClient().select().from(models.User);
  }
}

export const UserService = new Service();
