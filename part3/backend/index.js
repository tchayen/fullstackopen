const express = require("express");

const app = express();

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

app.get("/api/notes", (request, response) => {
  response.json(db);
});

app.get("/api/notes/:id", (request, response) => {
  const person = db.persons.find(
    (person) => person.id === Number(request.params["id"])
  );

  if (person) {
    response.json(person);
  }

  response.status(404).end();
});

app.get("/api/info", (request, response) => {
  response.send(
    `Phonebook has info for ${
      db.persons.length
    } people\n\n${new Date().toISOString()}`
  );
});

app.listen(3002);
