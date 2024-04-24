import { UserLoginDto } from "../dts/user/user.login.dto";
import { UserPostDto } from "../dts/user/user.post.dto";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { Database } from "../config/database";

class Service {
  async createUser(user: UserPostDto) {
    console.log(user);
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    const newUser = await Database.pgClient()
      .insert(User)
      .values(user)
      .returning();
    return newUser;
  }
  async loginUser(user: UserLoginDto) {
    const hashedPassword = await bcrypt.compare(
      user.password,
      "$2b$12$p5UAtDjM.twlBhnnhktKnOzMNnQvSYkj1YFsi8y2DWb3RnTU1NJta"
    );
    return hashedPassword;
  }
  async getUsers() {
    return [];
  }
}

export const UserService = new Service();
