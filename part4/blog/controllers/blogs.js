const app = require("express").Router();
const Blog = require("../models/blog");

app.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

app.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

app.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
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
