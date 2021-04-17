import request from "supertest";
import { app } from "../../../app";

import { registerExample, logInExample } from "../../../test/helpers";

it("Unauthorized login", async () => {
  const user = await registerExample("");

  return request(app)
    .post(`/users/${user.nick_name}/addfriend`)
    .send()
    .expect(401);
});

it("Request successfully sent", async () => {
  const user = await registerExample("");
  const user1 = await registerExample("1");

  const jwt = await logInExample(user);

  return request(app)
    .post(`/users/${user1.nick_name}/addfriend`)
    .auth(jwt, { type: "bearer" })
    .send()
    .expect(201);
});

it("Missing user added", async () => {
  return request(app).post(`/users/test/addfriend`).send().expect(401);
});
