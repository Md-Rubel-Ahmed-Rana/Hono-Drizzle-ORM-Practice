import { UserLoginDto } from "../dts/user/user.login.dto";
import { UserPostDto } from "../dts/user/user.post.dto";
import bcrypt from "bcrypt";
import { sign, verify } from "hono/jwt";
import { eq } from "drizzle-orm";
import { UserGetDto } from "../dts/user/user.get.dto";
import { HTTPException } from "hono/http-exception";
import { pgClient } from "../utils/db.util";
import { config } from "../config/env";
import { models } from "../models";

class Service {
  async register(user: UserPostDto) {
    if (!user) {
      throw new HTTPException(400, { message: "User data required" });
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    await pgClient().insert(models.User).values(user).returning();
  }

  async login({ email, password }: UserLoginDto) {
    const user = await pgClient()
      .select()
      .from(models.User)
      .where(eq(models.User.email, email));

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
      config.jwt.accessTokenSecret
    );
    return `Bearer ${accessToken}`;
  }

  async auth(token: string) {
    if (!token) {
      throw new HTTPException(400, { message: "Invalid token" });
    }
    const isVerified = await verify(token, config.jwt.accessTokenSecret);
    if (!isVerified) {
      throw new HTTPException(401, { message: "Unauthenticated" });
    }
    const user = await pgClient()
      .select()
      .from(models.User)
      .where(eq(models.User.id, isVerified.id));
    if (user.length <= 0) {
      throw new HTTPException(404, { message: "User not found" });
    }

    const { id, name, email, createdAt, updatedAt } = user[0] as UserGetDto;

    return { id, name, email, createdAt, updatedAt };
  }
}

export const AuthService = new Service();
