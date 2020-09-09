import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const url = "http://localhost:3001/persons";

const api = {
  all: async () => {
    const response = await axios.get(url);
    return response.data;
  },
  create: (person) => {
    return axios.post(url, person);
  },
  update: (id, person) => {
    return axios.put(`${url}/${id}`, person);
  },
};

const Filter = ({ setFilter }) => {
  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      filter shown with <input onChange={onFilterChange} />
    </div>
  );
};

const List = ({ persons, filter }) => (
  <>
    {persons
      .filter((person) => person.name.toLocaleLowerCase().match(filter || ""))
      .map((person, index) => (
        <p key={`${person.name}-${index}`}>
          {person.name} {person.phone}
        </p>
      ))}
  </>
);

const Form = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const id = persons.findIndex((person) => person.name === newName);
    if (id !== -1) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = { name: newName, phone: newNumber };

    api.create(newPerson);
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          name: <input onChange={onNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={onNumberChange} value={newNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.all().then((persons) => {
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new number</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <List persons={persons} filter={filter} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
