import request from "supertest";
import { app } from "../../../app";

import { registerExample } from "../../../test/helpers";

//Succesfull log in
it("Logs in succesfully", async () => {
  await registerExample();

  return request(app)
    .post("/auth/login")
    .send({ nick_name: "user", password: "password" })
    .expect(200);
});

//Unsuccesfull log ins
it("Invalid nickname", async () => {
  await registerExample();

  return request(app)
    .post("/auth/login")
    .send({ nick_name: "u", password: "password" })
    .expect(400);
});

it("Incorrect nickname", async () => {
  await registerExample();

  return request(app)
    .post("/auth/login")
    .send({ nick_name: "abcd", password: "password" })
    .expect(403);
});

it("Incorrect password", async () => {
  await registerExample();

  return request(app)
    .post("/auth/login")
    .send({ nick_name: "user", password: "pwd" })
    .expect(403);
});
