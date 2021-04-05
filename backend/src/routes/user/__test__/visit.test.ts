import request from "supertest";
import { app } from "../../../app";

import { registerExample, logInExample } from "../../../test/helpers";

it("Unauthorized login", async () => {
  const user = await registerExample("");

  return request(app).get(`/users/${user.nick_name}/visit`).send().expect(401);
});

it("Successfull visit login", async () => {
  const user = await registerExample("");
  const user1 = await registerExample("1");

  const jwt = await logInExample(user);

  return request(app)
    .get(`/users/${user1.nick_name}/visit`)
    .auth(jwt, { type: "bearer" })
    .send()
    .expect(200);
});

it("Missing user visited", async () => {
  return request(app).get(`/users/test/visit`).send().expect(401);
});
