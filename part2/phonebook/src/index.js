import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";

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

const Person = ({ person, onDelete }) => {
  const onClick = () => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    api.delete(person.id).then(() => onDelete());
  };

  return (
    <p>
      {person.name} {person.number} <button onClick={onClick}>delete</button>
    </p>
  );
};

const List = ({ persons, filter, onDelete }) => (
  <>
    {persons
      .filter((person) => person.name.toLocaleLowerCase().match(filter || ""))
      .map((person, index) => (
        <Person
          key={`${person.name}-${index}`}
          person={person}
          onDelete={onDelete}
        />
      ))}
  </>
);

const Form = ({ persons, fetchPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const id = persons.findIndex((person) => person.name === newName);
    if (id !== -1) {
      window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );

      api.update(persons[id].id, newPerson).then(fetchPersons);
      return;
    }

    api.create(newPerson).then(fetchPersons);
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

  const fetchPersons = () => {
    api.all().then((persons) => {
      setPersons(persons);
    });
  };

  useEffect(fetchPersons, []);

  const onDelete = fetchPersons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new number</h2>
      <Form persons={persons} fetchPersons={fetchPersons} />
      <h2>Numbers</h2>
      <List persons={persons} filter={filter} onDelete={onDelete} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
