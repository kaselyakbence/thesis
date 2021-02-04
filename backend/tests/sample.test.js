const app = require("../app");

const supertest = require("supertest");
const request = supertest(app);

it("Reacts to GET request on root", async () => {
  const response = await request.get("/");

  expect(response.status).toBe(200);
});
