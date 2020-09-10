jest.useFakeTimers();

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

// TODO:
// implement tests which:
// - check that invalid users are not created
// - invalid add user operation returns a suitable status code error message

beforeEach(async () => {
  await User.deleteMany({});
});

describe("creating users", () => {
  test("invalid user won't be created", async () => {
    const request = await api.post("/api/users").send({
      username: "Test123",
      name: "John",
      password: "11",
    });
    expect(request.status).toBe(400);

    // Check that no new user was created.
    const users = await api.get("/api/users");
    expect(users.body).toHaveLength(0);
  });

  test("invalid add user operation returns a suitable status code error message", async () => {
    const request = await api.post("/api/users").send({
      username: "Test123",
      name: "John",
      password: "11",
    });
    expect(request.status).toBe(400);
    expect(request.body).toEqual({ error: "Password is too short" });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
