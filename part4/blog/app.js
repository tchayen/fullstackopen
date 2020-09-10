const config = require("./utils/config");
const mongoose = require("mongoose");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogs = require("./controllers/blogs");
const users = require("./controllers/users");
const login = require("./controllers/login");

console.log("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

mongoose.set("useCreateIndex", true);

const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(middleware.logger);
app.use("/api/blogs", blogs);
app.use("/api/users", users);
app.use("/api/login", login);
app.use(middleware.errorHandler);

module.exports = app;
