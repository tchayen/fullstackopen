const app = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

app.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("author", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

app.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

app.post("/", async (request, response) => {
  const user = await User.findById(request.body.author);
  const blog = new Blog({ ...request.body, user: user.id });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();

  console.log("user", user.id, "blog", result.id);

  response.status(201).json(result);
});

app.put("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body);
  const blog = await Blog.findById(request.params.id);
  response.status(200).json(blog);
});

app.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = app;
