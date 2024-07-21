import dotenv from "dotenv";
dotenv.config();

export const config = {
  app: {
    env: process.env.NODE_ENV as string,
    port: Number(process.env.PORT) as number,
  },
  db: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    name: process.env.DB_NAME as string,
    provider: process.env.DB_PROVIDER as string,
    port: process.env.DB_PORT as string,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET as string,
    accessTokenExpTime: process.env.JWT_ACCESS_EXP_TIME as string,
  },
};
