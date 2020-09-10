const config = require("./utils/config");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const personsRouter = require("./controllers/persons");
const middleware = require("./utils/middleware");
const Person = require("./models/person");

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
app.use("/api/persons", personsRouter);
app.get("/api/info", async (request, response) => {
  const count = await Person.count({});
  response.send(
    `Phonebook has info for ${count} people\n\n${new Date().toISOString()}`
  );
});

app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}.`);
});
