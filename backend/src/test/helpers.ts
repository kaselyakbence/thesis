import request from "supertest";

import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      registerExample(): void;
    }
  }
}

global.registerExample = async () => {
  await request(app).post("/auth/register").send({
    nick_name: "user",
    email: "test@gmail.com",
    first_name: "User",
    password: "password",
    password2: "password",
  });
};
