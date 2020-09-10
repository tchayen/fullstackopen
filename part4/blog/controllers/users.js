const bcrypt = require("bcrypt");
const app = require("express").Router();
const User = require("../models/user");

app.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

app.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  response.json(user);
});

app.post("/", async (request, response) => {
  const saltRounds = 10;
  console.log(request.body);
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds);

  if (request.body.password.length < 3) {
    response.status(400).json({ error: "Password is too short" });
  }

  if (request.body.username.length < 3) {
    response.status(400).json({ error: "Username is too short" });
  }

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  });

  const result = await user.save();
  response.status(201).json(result);
});

// app.put("/:id", async (request, response) => {
//   await User.findByIdAndUpdate(request.params.id, request.body);
//   const user = await User.findById(request.params.id);
//   response.status(200).json(user);
// });

// app.delete("/:id", async (request, response) => {
//   await User.findByIdAndRemove(request.params.id);
//   response.status(204).end();
// });

module.exports = app;
