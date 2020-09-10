jest.useFakeTimers();

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const initialUsers = [];

// TODO:
// implement tests which:
// - check that invalid users are not created
// - invalid add user operation returns a suitable status code error message

beforeEach(async () => {});

afterAll(() => {
  mongoose.connection.close();
});
