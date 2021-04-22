import request from "supertest";
import { app } from "../../../app";

//Succesfull registration
it("Returns 201 after a succesfull registration", async () => {
  return request(app)
    .post("/auth/register")
    .send({
      nick_name: "user",
      email: "test@gmail.com",
      first_name: "User",
      password: "password",
      password2: "password",
    })
    .expect(201);
});

//Invalid registrations
it("Returns 400 with invalid email", async () => {
  return request(app)
    .post("/auth/register")
    .send({
      nick_name: "user",
      email: "testtest.com",
      first_name: "User",
      password: "password",
      password2: "password",
    })
    .expect(400);
});

it("Returns 400 with missing data", async () => {
  await request(app)
    .post("/auth/register")
    .send({
      email: "test@gmail.com",
      first_name: "Bence",
      password: "password",
      password2: "password",
    })
    .expect(400);

  await request(app)
    .post("/auth/register")
    .send({
      nick_name: "user",
      password: "password",
      password2: "password",
    })
    .expect(400);

  return request(app)
    .post("/auth/register")
    .send({
      nick_name: "user",
      email: "test@gmail.com",
      password2: "password",
    })
    .expect(400);
});

it("Returns 400 with not matching password", async () => {
  return request(app)
    .post("/auth/register")
    .send({
      nick_name: "user",
      email: "kaselyakbence3gmail.com",
      first_name: "Bence",
      password: "password",
      password2: "password",
    })
    .expect(400);
});

//Unique username registration
it("Returns error if nick_name or email not unique", async () => {
  await request(app)
    .post("/auth/register")
    .send({
      nick_name: "user",
      email: "test@gmail.com",
      password: "password",
      password2: "password",
    })
    .expect(201);

  await request(app)
    .post("/auth/register")
    .send({
      nick_name: "user2",
      email: "test@gmail.com",
      password: "password",
      password2: "password",
    })
    .expect(400);

  return request(app)
    .post("/auth/register")
    .send({
      nick_name: "user",
      email: "test2@gmail.com",
      password: "password",
      password2: "password",
    })
    .expect(400);
});
