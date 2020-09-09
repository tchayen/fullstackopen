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

const db = {
  persons: [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1,
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2,
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3,
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4,
    },
  ],
};

app.get("/api/persons", async (request, response) => {
  const people = await Person.find({});
  response.json(people);
});

app.get("/api/persons/:id", (request, response) => {
  const person = db.persons.find(
    (person) => person.id === Number(request.params["id"])
  );

  if (person) {
    response.json(person);
  }

  response.status(404).end();
});

app.delete("/api/persons/:id", async (request, response) => {
  Person.findByIdAndRemove(request.params["id"])
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));

  // response.status(404).end();
});

app.post("/api/persons", async (request, response) => {
  const person = request.body;

  if (!person.number) {
    response.status(400).json({ message: "The number is missing" });
  }

  if (!person.name) {
    response.status(400).json({ message: "The name is missing" });
  }

  // if (db.persons.find((existing) => existing.name === person.name)) {
  //   response
  //     .status(400)
  //     .json({ message: "Person with given name already exists" });
  // }

  const input = new Person(person);
  await input.save();
  // db.persons.push({ ...person, id: Math.random() * Number.MAX_SAFE_INTEGER });
  response.status(200).end();
});

app.get("/api/info", (request, response) => {
  response.send(
    `Phonebook has info for ${
      db.persons.length
    } people\n\n${new Date().toISOString()}`
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
