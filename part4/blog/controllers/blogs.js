const app = require("express").Router();
const Blog = require("../models/Blog");

app.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

app.post("/api/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

app.delete("/api/blogs/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params["id"]);
  response.status(204).end();
});

module.exports = app;
