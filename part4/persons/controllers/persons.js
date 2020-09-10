const app = require("express").Router();
const Person = require("../models/person");

app.get("/", async (request, response) => {
  const people = await Person.find({});
  response.json(
    people.map((person) => ({
      id: person._id,
      name: person.name,
      number: person.number,
    }))
  );
});

app.get("/:id", async (request, response) => {
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

app.delete("/:id", async (request, response, next) => {
  Person.findByIdAndRemove(request.params["id"])
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/", async (request, response) => {
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

app.put("/:id", async (request, response) => {
  await Person.findByIdAndUpdate(request.params.id, request.body);
  response.status(200).end();
});

module.exports = app;
