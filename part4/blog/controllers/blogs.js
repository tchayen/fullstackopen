const app = require("express").Router();
const Blog = require("../models/Blog");

app.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

app.get("/api/blogs/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

app.post("/api/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

app.put("/api/blogs/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body);
  const blog = await Blog.findById(request.params.id);
  response.status(200).json(blog);
});

app.delete("/api/blogs/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = app;
