import dotenv from "dotenv";
dotenv.config();

export const config = {
  app: {
    env: process.env.NODE_ENV as string,
    port: Number(process.env.PORT) as number,
  },
  db: {
    url: process.env.DATABASE_URL as string,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET as string,
    accessTokenExpTime: process.env.JWT_ACCESS_EXP_TIME as string,
  },
};
