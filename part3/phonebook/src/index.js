import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import "./index.css";

const NOTICE_TIME = 3000;

const Popup = ({ message, error }) => (
  <div className={`popup${error ? " error" : ""}`}>{message}</div>
);

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

const Person = ({ person, onDelete, setError }) => {
  const onClick = async () => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    try {
      await api.delete(person.id).then(() => onDelete());
    } catch (error) {
      setError(
        `Information about ${person.name} doesn't exist on the server (already?).`
      );
    }
  };

  return (
    <p>
      {person.name} {person.number} <button onClick={onClick}>delete</button>
    </p>
  );
};

const List = ({ persons, filter, onDelete, setError }) => (
  <>
    {persons
      .filter((person) => person.name.toLocaleLowerCase().match(filter || ""))
      .map((person, index) => (
        <Person
          key={`${person.name}-${index}`}
          person={person}
          onDelete={onDelete}
          setError={setError}
        />
      ))}
  </>
);

const Form = ({ persons, fetchPersons, setError, setNotice }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const id = persons.findIndex((person) => person.name === newName);
    if (id !== -1) {
      window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );

      await api.update(persons[id].id, newPerson);
      await fetchPersons();
      setNotice(`${newPerson.name} was updated.`);
      return;
    }

    try {
      await api.create(newPerson);
    } catch (error) {
      setError(error.response.data);
      return;
    }

    setNewName("");
    setNewNumber("");

    setNotice(`${newPerson.name} was added.`);
    await fetchPersons();
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
        <p>
          <strong>name:</strong>{" "}
          <input onChange={onNameChange} value={newName} />
        </p>
        <p>
          <strong>number:</strong>{" "}
          <input onChange={onNumberChange} value={newNumber} />
        </p>
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
  const [popup, setPopup] = useState(null);

  const setError = (message) => {
    setPopup({ error: true, message });
    setTimeout(() => {
      setPopup(null);
    }, NOTICE_TIME);
  };

  const setNotice = (message) => {
    setPopup({ error: false, message });
    setTimeout(() => {
      setPopup(null);
    }, NOTICE_TIME);
  };

  const fetchPersons = () => {
    return api.all().then((persons) => {
      setPersons(persons);
    });
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const onDelete = fetchPersons;

  return (
    <div>
      {popup && <Popup message={popup.message} error={popup.error} />}
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new number</h2>
      <Form
        persons={persons}
        fetchPersons={fetchPersons}
        setNotice={setNotice}
        setError={setError}
      />
      <h2>Numbers</h2>
      <List
        persons={persons}
        filter={filter}
        onDelete={onDelete}
        setError={setError}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
