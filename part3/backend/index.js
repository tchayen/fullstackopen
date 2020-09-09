require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms :body"));

app.get("/api/persons", async (request, response) => {
  const people = await Person.find({});
  response.json(
    people.map((person) => ({
      id: person._id,
      name: person.name,
      number: person.number,
    }))
  );
});

app.get("/api/persons/:id", async (request, response) => {
  const person = await Person.findById(request.params["id"]);

  if (person) {
    response.json({
      id: person._id,
      name: person.name,
      number: person.number,
    });
  }

  response.status(404).end();
});

app.delete("/api/persons/:id", async (request, response) => {
  Person.findByIdAndRemove(request.params["id"])
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (request, response) => {
  const person = request.body;

  if (!person.number) {
    response.status(400).json({ message: "The number is missing" });
  }

  if (!person.name) {
    response.status(400).json({ message: "The name is missing" });
  }

  try {
    const input = new Person(person);
    await input.save();
  } catch (error) {
    response.status(400).json(error.message);
  }

  response.status(200).end();
});

app.put("/api/persons/:id", async (request, response) => {
  await Person.findByIdAndUpdate(request.params.id, request.body);
  response.status(200).end();
});

app.get("/api/info", async (request, response) => {
  const count = await Person.count({});
  response.send(
    `Phonebook has info for ${count} people\n\n${new Date().toISOString()}`
  );
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

// https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 3002);
