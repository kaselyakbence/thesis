import request from "supertest";

import { app } from "../app";

import { User, UserDoc } from "../models/User";
//import { Event } from "../models/Event";

const testpw = "password";

export const registerExample = async (str: string): Promise<UserDoc> => {
  const event = User.build({
    nick_name: `user${str}`,
    email: `test${str}@gmail.com`,
    first_name: "User",
    password: testpw,
  });

  await event.save();

  return event;
};

export const logInExample = async (user: UserDoc): Promise<string> => {
  const { nick_name } = user;

  const res = await request(app)
    .post("/auth/login")
    .send({ nick_name, password: testpw });

  return res.body.jwt_token;
};
