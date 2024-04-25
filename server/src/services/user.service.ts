import { User } from "./../models/user.model";
import { UserLoginDto } from "../dts/user/user.login.dto";
import { UserPostDto } from "../dts/user/user.post.dto";
import bcrypt from "bcrypt";
import { sign, verify } from "hono/jwt";
import { Database } from "../config/database";
import { eq } from "drizzle-orm";
import { UserGetDto } from "../dts/user/user.get.dto";
import { HTTPException } from "hono/http-exception";

class Service {
  async createUser(user: UserPostDto) {
    if (!user) {
      throw new HTTPException(400, { message: "User data required" });
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    const newUser = await Database.pgClient()
      .insert(User)
      .values(user)
      .returning();
    return newUser;
  }

  async loginUser({ email, password }: UserLoginDto) {
    const user = await Database.pgClient()
      .select()
      .from(User)
      .where(eq(User.email, email));
    if (user.length <= 0) {
      throw new HTTPException(404, { message: "User not found" });
    }
    const {
      id,
      email: userEmail,
      password: encryptedPassword,
    } = user[0] as UserGetDto;
    const matchPassword = bcrypt.compare(password, encryptedPassword);
    if (!matchPassword) {
      throw new HTTPException(404, { message: "Invalid email or password" });
    }
    const accessToken = await sign(
      { id, email: userEmail },
      process.env.JWT_SECRET as string
    );
    return { accessToken };
  }

  async authUser(token: string) {
    if (!token) {
      throw new HTTPException(400, { message: "Invalid token" });
    }
    const isVerified = await verify(token, process.env.JWT_SECRET as string);
    if (!isVerified) {
      throw new HTTPException(401, { message: "Unauthenticated" });
    }
    const user = await Database.pgClient()
      .select()
      .from(User)
      .where(eq(User.id, isVerified.id));
    if (user.length <= 0) {
      throw new HTTPException(404, { message: "User not found" });
    }

    const { id, name, email, createdAt, updatedAt } = user[0] as UserGetDto;

    return { id, name, email, createdAt, updatedAt };
  }

  async getUsers() {
    return [];
  }
}

export const UserService = new Service();
