import { app } from "../app";

import request from "supertest";

it("Reacts to GET request on root", async () => {
  return request(app).get("/").expect(200);
});
