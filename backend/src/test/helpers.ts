import request from "supertest";

import { app } from "../app";

export const registerExample = async () => {
  await request(app).post("/auth/register").send({
    nick_name: "user",
    email: "test@gmail.com",
    first_name: "User",
    password: "password",
    password2: "password",
  });
};
